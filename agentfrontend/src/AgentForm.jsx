import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SearchResultsList } from './components/SearchResultsList';
import { useNavigate } from 'react-router-dom';

function AgentForm() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('');
  const [showLocality, setShowLocality] = useState(false);
  const [cityResults, setCityResults] = useState([]);
  const [localityResults, setLocalityResults] = useState([]);
  const [formData, setFormData] = useState({
    city: '',
    locality: '',
    propertyType: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const fetchCity = (value) => {
    fetch("http://localhost:3030/location")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.city &&
            user.city.toLowerCase().includes(value.toLowerCase())
          );
        });

        setCityResults(results); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchLocalities = (city, localityInput) => {
    fetch(`http://localhost:3030/localities?city=${city}`)
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((locality) => {
          return (
            localityInput &&
            locality &&
            locality.name &&
            locality.name.toLowerCase().includes(localityInput.toLowerCase())
          );
        });

        setLocalityResults(results);
      })
      .catch((error) => {
        console.error('Error fetching localities:', error);
      });
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    fetchCity(city);
    fetchLocalities(city, '');
    setShowLocality(city !== '');
    setFormData({ ...formData, city });
  };

  const handleLocalityChange = (e) => {
    const localityInput = e.target.value;
    setSelectedLocality(localityInput);
    fetchLocalities(selectedCity, localityInput);
    setFormData({ ...formData, locality: localityInput });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData);
    const queryParams = new URLSearchParams({
      city: formData.city,
      locality: encodeURIComponent(formData.locality),
      rent: formData.propertyType === 'rent' ? 1 : 0,
      newProperty: formData.propertyType === 'newProperty' ? 1 : 0,
      resale: formData.propertyType === 'resale' ? 1 : 0
    }).toString();
    navigate(`/agentlist?${queryParams}`);
  };

  return (
    <>
      <h2 className="text-center my-4">Find An Agent</h2>
      <div className="container mt-5">
        <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
          <div className="form-group d-flex">
            <div className="flex-fill">
              <label htmlFor="city">City *</label>
              <input type="text" className="form-control" placeholder="Search city" value={selectedCity} onChange={handleCityChange} />
              <SearchResultsList results={cityResults} setSelectedCity={setSelectedCity} setFormData={setFormData} formData={formData} fetchLocalities={fetchLocalities} clearCityResults={() => setCityResults([])} />
            </div>
            {showLocality && (
              <div className="flex-fill ml-3">
                <label htmlFor="locality">Locality *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search locality"
                  value={selectedLocality}
                  onChange={handleLocalityChange}
                />
                <SearchResultsList results={localityResults} setSelectedLocality={setSelectedLocality} setFormData={setFormData} formData={formData} clearLocalityResults={() => setLocalityResults([])} />
              </div>
            )}
          </div>
          <div className="form-group mb-4">
            <label className="form-label">Property Type:</label>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="rent"
                name="propertyType"
                value="rent"
                checked={formData.propertyType === 'rent'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="rent">Rent</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="newProperty"
                name="propertyType"
                value="newProperty"
                checked={formData.propertyType === 'newProperty'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="newProperty">New Property</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="resale"
                name="propertyType"
                value="resale"
                checked={formData.propertyType === 'resale'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="resale">Resale</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </>
  );
}

export default AgentForm;
