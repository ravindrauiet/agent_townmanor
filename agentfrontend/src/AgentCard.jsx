import React from 'react';
import './AgentCard.css';
import { useNavigate } from 'react-router-dom';
  
function AgentCard({ agent }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/agent/${agent.id}`);
  };

  console.log(agent)
  return (
    <div className="agent-card" onClick={handleClick}>
      <img src={`http://localhost:3030/images/` + agent.imageUrl} alt={agent.name} className="agent-image"/>
      <h2>{agent.name}</h2>
      <p>{agent.city} - {agent.sector}</p>
      <p>Experience: {agent.experience} years</p>
      <p>Listings: {agent.listings}</p>
      {/* <p>Languages: {Array.isArray(agent.languages) ? agent.languages.join(', ') : ''}</p> */}
      <p>Languages: {agent.languages}</p>
      <p>Verified Transactions: {agent.transactions}</p>
      <button className="button">WhatsApp</button>
      <button className="button-app">Book an Appointment</button>
    </div>
  );
}

export default AgentCard;
