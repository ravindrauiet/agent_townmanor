import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './AgentList.css';
import AgentCard from './AgentCard';
import TopAgents from './TopAgents';

function AgentList() {
  const [agents, setAgents] = useState([]);
  const [topAgents, setTopAgents] = useState([]);
  const location = useLocation();

  // Utility function to parse query parameters
  const getQueryParams = (queryString) => {
    return new URLSearchParams(queryString);
  };

  useEffect(() => {
    const params = getQueryParams(location.search);
    const city = params.get('city');
    const locality = params.get('locality');
    const rent = params.get('rent');
    const newProperty = params.get('newProperty');
    const resale = params.get('resale');
    
    // Encode the locality parameter
    const encodedLocality = encodeURIComponent(locality);
    // console.log(`http://localhost:3030/agents?city=${city}&sector=${encodedLocality}&rent=${rent}&newProperty=${newProperty}&resale=${resale}`);

    fetch(`http://localhost:3030/agents?city=${city}&sector=${encodedLocality}&rent=${rent}&newProperty=${newProperty}&resale=${resale}`)
      .then(response => response.json())
      .then(data => setAgents(data))
      .catch(error => console.error('Error fetching agents:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3030/topagents')
      .then(response => response.json())
      .then(data => setTopAgents(data))
      .catch(error => console.error('Error fetching top agents:', error));
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
