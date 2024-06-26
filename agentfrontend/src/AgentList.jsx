import React, { useEffect, useState } from 'react';
import './AgentList.css';
import AgentCard from './AgentCard';
import TopAgents from './TopAgents';

function AgentList() {
  const [agents, setAgents] = useState([]);
  const [topAgents, setTopAgents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3030/')
      .then(response => response.json())
      .then(data => setAgents(data))
      .catch(error => console.error('Error fetching agents:', error));
  }, []);
  useEffect(() => {
    fetch('http://localhost:3030/topagents')
      .then(response => response.json())
      .then(data => setTopAgents(data))
      .catch(error => console.error('Error fetching agents:', error));
  }, []);

  return (
    <div className="app">
      <div className="agent-list">
        {agents.map((agent, index) => (
          <AgentCard key={index} agent={agent} />
        ))}
      </div>
      <TopAgents agents={topAgents} />
    </div>
  );
}

export default AgentList;
