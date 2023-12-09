// StateSelect.js
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCountry } from '../Features/User/CountrySlice'; // Assuming you have a CountrySlice
import { setState } from '../Features/User/CountrySlice';
const StateSelect = () => {
  const { country_list: countries } = useSelector((state) => state.country);
  const [selectedStates, setSelectedStates] = useState([]);
  const [states, setStates] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStates = async () => {
        // countries.map((country) => {console.log(country.value)})
      try {
        if(countries.length > 0){
            const countryIds = countries.map((country) =>country.value).join(',')
            // console.log(countryIds);
            const response = await axios.get(`https://country-state-city-dajz.onrender.com/api/v1/State`,{
                params:{
                    country_id:countryIds
                }
            });
            // console.log(response.data);
            const statesData = response.data.uniqueStates.map((state) => ({
            value: state.id,
            label: state.name,
            }));
            // setSelectedStates(statesData);
            setStates(statesData);
        }
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, [dispatch, countries]);

  const handleStateChange = (selectedOptions) => {
    setSelectedStates(selectedOptions);
    dispatch(setState(selectedOptions))
  };
//   console.log(selectedStates);
  return (

    <Select
      isMulti
      options={states} 
      value={selectedStates}
      onChange={handleStateChange}
      placeholder="Select states..."
    />
  );
};

export default StateSelect;
