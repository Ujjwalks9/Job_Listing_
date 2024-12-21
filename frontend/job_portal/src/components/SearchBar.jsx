import React from "react";
import "../App.css";

function Search() {
  return (
    <div className="search-container">
      <div className="searchbox">
      <input
        type="text"
        placeholder="Search by job title"
        className="search-input"
      />
      <button className="search-button">🔍</button>
      </div>
      <div className="filter-container">
        {["Job type", "Workplace", "Country or timezone", "Seniority", "Pay", "Travel"].map((filter, index) => (
          <button key={index} className="filter-button">
            {filter} 
          </button>
        ))}
      </div>
    </div>
  );
}

export default Search;
