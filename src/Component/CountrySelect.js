import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCountry } from '../Features/User/CountrySlice';
const CountrySelect = () => {
  const {country_list:country} = useSelector((state) => state.country)
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
    const dispatch = useDispatch();
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://country-state-city-dajz.onrender.com/api/v1/Countries');
        const countriesData = response.data.Countries.map((country) => ({
          name:country.name,
          id:country.id
        }));  
        setCountries(countriesData);
        
      } catch (error) {
        console.error('Error fetching countries:', error);
        return [];
      }
    };

    fetchCountries();
  }, [dispatch]);

  const handleCountryChange = (selectedOptions) => {
    setSelectedCountries(selectedOptions); 
    dispatch(setCountry(selectedOptions))
  };

  return (
    <Select
      isMulti
      options={countries.map((country) => ({ value: country.id, label: country.name }))}
      value={selectedCountries}
      onChange={handleCountryChange}
      placeholder="Select countries..."
    />
  );
};

export default CountrySelect;
