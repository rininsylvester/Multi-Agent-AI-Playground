// ExpertCard.jsx
// Card component for displaying an AI Expert
// Props: name, description, icon, onClick
import React from "react";
import styles from "./ExpertCard.module.css";

const ExpertCard = ({ name, description, icon, onClick }) => (
  <div className={styles.card} onClick={onClick} tabIndex={0} role="button">
    <div className={styles.icon}>{icon}</div>
    <div className={styles.name}>{name}</div>
    <div className={styles.desc}>{description}</div>
  </div>
);

export default ExpertCard;
