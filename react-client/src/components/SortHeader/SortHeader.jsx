import React, { Component } from 'react';

const SortHeader = props => {
  return (
    <div className="header-container">
      <button onClick={() => props.toggleDropdowns(props.category)}>
        {props.category}
      </button>

      {props.isDropdownHidden ? null :

        <div className="dropdown-menu">
          <div className="dropdown-menu-header">
            <span className="dropdown-menu-title">{props.category}</span>
          </div>

          {props.dropdownRows.map((dropdownData, index) => {
            return (
              <div
                key={index}
                className="dropdown-row"
                onClick={ () => props.handleRowClick(dropdownData) }
              >
                {dropdownData}
              </div>
            );
          })}
          
        </div>          
      }
      
    </div>
  );
}

export default SortHeader;
