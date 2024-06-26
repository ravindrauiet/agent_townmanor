import React from 'react';
import './TopAgents.css';

const TopAgents = ({ agents }) => {
  return (
    <div className="top-agents">
      <h3>Top Transacting Agents</h3>
      <ul>
        {agents.map((agent, index) => (
          <li key={index} className={`rank-${index + 1}`}>
            <span className="index">{index + 1}.</span> {agent.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopAgents;
