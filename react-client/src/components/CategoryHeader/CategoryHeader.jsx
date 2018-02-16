import React, { Component } from 'react';

import './category-header-style.css';

const CategoryHeader = props => {
  return (
    <div className="header-container">
      <button onClick={() => props.toggleDropdowns(props.category)}>
        {props.category}
      </button>

      {props.isDropdownHidden ? null :

        <div className="dropdown-menu">
          <div className="dropdown-menu-header">
            <span className="dropdown-menu-title">Filter by {props.category}</span>
          </div>

          {props.dropdownRows.map((dropdownData, index) => {
            return (
              <div
                key={index}
                className="dropdown-row"
                onClick={ () => props.handleRowClick(dropdownData.id) }
              >
                {dropdownData.id}
              </div>
            );
          })}
        </div>          
      }
      
    </div>
  );
}

export default CategoryHeader;
