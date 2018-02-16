import React, { Component } from 'react';

import './category-header-style.css';

class CategoryHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDropdownHidden: true,
    }
  }

  toggleDropdownMenu() {
    this.setState({
      isDropdownHidden: !this.state.isDropdownHidden
    });
  }

  handleRowClick(id) {
    this.props.handleRowClick(id);
    this.toggleDropdownMenu();
  }

  render() {
    return (
      <div className="header-container">
        <button onClick={this.toggleDropdownMenu.bind(this)}>
          {this.props.category}
        </button>

        {this.state.isDropdownHidden ? null :

          <div className="dropdown-menu">
            <div className="dropdown-menu-header">
              <span className="dropdown-menu-title">Filter by {this.props.category}</span>
            </div>

            {this.props.dropdownRows.map((dropdownData, index) => {
              return (
                <div
                  key={index}
                  className="dropdown-row"
                  onClick={ () => this.handleRowClick(dropdownData.id) }
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
}

export default CategoryHeader;
