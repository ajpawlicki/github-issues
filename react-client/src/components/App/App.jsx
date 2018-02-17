import React, { Component } from 'react';

import Issue from '../Issue/Issue.jsx';
import CategoryHeader from '../CategoryHeader/CategoryHeader.jsx';
import SortHeader from '../SortHeader/SortHeader.jsx';

import './app-style.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.issues = [];
    
    this.state = {
      renderedIssues: [],
      dropdownCategories: {
        Authors: true,
        Labels: true,
        Sort: true
      },
      sortingOptions: ['created_at', 'comments', 'modified_at'],
      errorRetrievingData: false,
      loadingData: false,
    }

    this.toggleDropdowns = this.toggleDropdowns.bind(this);
  }

  fetchIssues() {
    this.setState({ errorRetrievingData: false, loadingData: true });

    fetch('https://api.github.com/repos/facebook/react/issues')
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        this.issues = data;
      } else {
        this.setState({ errorRetrievingData: true });
      }
      
      this.setState({
        renderedIssues: this.issues,
        loadingData: false
      });
    })
    .catch(err => {
      console.error(err);

      this.setState({
        errorRetrievingData: true,
        loadingData: false
      });
    });

  }

  componentDidMount() {
    this.fetchIssues();
  }

  getUniqueAuthors(issues) {
    const users = issues.map(issue => issue.user);

    return this.getUniqueObjectsFromArray(users);
  }

  getUniqueLabels(issues) {
    const labels = issues.reduce((labels, issue) => {
      return labels.concat(issue.labels);
    }, []);

    return this.getUniqueObjectsFromArray(labels);
  }

  getUniqueObjectsFromArray(array) {
    const uniqueObjects = array.reduce((hash, obj) => {
      if (!hash.has(obj.id)) {
        hash.set(obj.id, obj);
      }

      return hash;
    }, new Map());

    return Array.from(uniqueObjects.values());
  }

  filterIssuesByAuthor(issues, authorId) {
    return issues.filter(issue => issue.user.id === authorId);
  }

  filterIssuesByLabel(issues, labelId) {
    return issues.filter(issue => {
      for (let label of issue.labels) {
        if (label.id === labelId) return true;
      }

      return false;
    });
  }

  handleLabelClick(labelId) {
    this.toggleDropdowns(null);

    this.setState({
      renderedIssues: this.filterIssuesByLabel(this.issues, labelId)
    });
  }

  handleAuthorClick(authorId) {
    this.toggleDropdowns(null);

    this.setState({
      renderedIssues: this.filterIssuesByAuthor(this.issues, authorId)
    });
  }

  handleRemoveFilters() {
    this.toggleDropdowns(null);

    this.setState({
      renderedIssues: this.issues
    });
  }

  toggleDropdowns(categoryName) {
    const categories = this.state.dropdownCategories;
    
    for (let category in categories) {
      if (categoryName === category) {
        categories[category] =  !categories[category];
      } else {
        categories[category] = true;
      }
    }

    this.setState({ dropdownCategories: categories });
  }

  handleSortIssues(sortingOption) {
    this.toggleDropdowns(null);

    let cb = x => x;
    
    if (sortingOption.indexOf('_at') !== -1) cb = x => new Date(x);
    
    const sortedIssues = this.issues.slice().sort((a,b) => {
      return cb(b[sortingOption]) - cb(a[sortingOption]);
    });

    this.setState({ renderedIssues: sortedIssues });
  }

  render() {
    return (
      <div>
        <h2>GitHub Issues</h2>

        <div className="headers-container">
          <span className="headers-title">Headers</span>

          <div className="headers-list">
            <CategoryHeader
              category="Authors"
              dropdownRows={this.getUniqueAuthors(this.issues)}
              isDropdownHidden={this.state.dropdownCategories.Authors}
              handleRowClick={this.handleAuthorClick.bind(this)}
              toggleDropdowns={this.toggleDropdowns} />

            <CategoryHeader
              category="Labels"
              dropdownRows={this.getUniqueLabels(this.issues)}
              isDropdownHidden={this.state.dropdownCategories.Labels}
              handleRowClick={this.handleLabelClick.bind(this)}
              toggleDropdowns={this.toggleDropdowns} />

            <SortHeader
              category="Sort"
              dropdownRows={this.state.sortingOptions}
              isDropdownHidden={this.state.dropdownCategories.Sort}
              handleRowClick={this.handleSortIssues.bind(this)}
              toggleDropdowns={this.toggleDropdowns} />
            
            <button onClick={this.handleRemoveFilters.bind(this)}>
              Remove Filters
            </button>
          </div>
        </div>

        <div className="issues-list">
        
        {this.state.loadingData ? <div className="alert">Loading...</div> : null}
        {this.state.errorRetrievingData ? <div className="alert">There was an error!</div> : null}

          {this.state.renderedIssues.map((issue, index) => {
            return (
              <Issue
                key={index}
                issue={issue} />
            );
          })}
        </div>

      </div>
    )
  }
}

export default App;
