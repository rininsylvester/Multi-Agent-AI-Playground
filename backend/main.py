"""
main.py
This is the entry point for the FastAPI backend.
It exposes endpoints, handles routing, and integrates with OpenAI's API.
"""

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI  # --- OpenAI v1.x import style ---
import os
from agent_prompts import AGENT_PROMPTS
from dotenv import load_dotenv

# Load environment variables from .env file (for OpenAI API key)
load_dotenv()

# --- Initialize OpenAI client ---
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai_client = OpenAI(api_key=OPENAI_API_KEY)

# Create FastAPI app
app = FastAPI(title="Multi-Agent AI Playground Backend")

# Allow CORS for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AskAgentRequest(BaseModel):
    agent: str  # Agent name (e.g., 'finance', 'gaming', 'programming')
    question: str  # User's question

@app.post("/ask_agent")
async def ask_agent(request: AskAgentRequest):
    """
    Endpoint to ask an agent a question.
    Receives: JSON with 'agent' and 'question'.
    Returns: Agent's response (from OpenAI API)
    """
    agent = request.agent.lower()
    question = request.question

    # Get the base prompt for the agent
    base_prompt = AGENT_PROMPTS.get(agent)
    if not base_prompt:
        return {"error": f"Unknown agent: {agent}"}

    # Combine base prompt and user question
    system_message = {"role": "system", "content": base_prompt}
    user_message = {"role": "user", "content": question}
    messages = [system_message, user_message]

    try:
        # --- OpenAI v1.x: Use the new chat completion interface ---
        response = openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=512,
            temperature=0.7,
        )
        agent_reply = response.choices[0].message.content
        return {"answer": agent_reply}
    except Exception as e:
        return {"error": str(e)}

# Health check endpoint (optional)
@app.get("/")
def root():
    """Simple health check endpoint."""
    return {"status": "ok"}
