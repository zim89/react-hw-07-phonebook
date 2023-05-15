import React from 'react';
import './Filter.scss';
import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className="filter">
      <label className="filter__label" htmlFor="filter">
        Find contact by name
      </label>
      <input
        className="filter__input"
        id="filter"
        type="text"
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filter;
