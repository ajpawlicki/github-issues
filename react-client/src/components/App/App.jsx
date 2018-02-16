import React, { Component } from 'react';

import Issue from '../Issue/Issue.jsx';
import CategoryHeader from '../CategoryHeader/CategoryHeader.jsx';

import './app-style.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.issues = [];
    
    this.state = {
      renderedIssues: []
    }
  }

  fetchIssues() {
    fetch('https://api.github.com/repos/facebook/react/issues')
    .then(res => res.json())
    .then(data => {
      this.issues = data;
      
      this.setState({
        renderedIssues: this.issues
      });
    })
    .catch(err => {
      console.error(err);
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
    this.setState({
      renderedIssues: this.filterIssuesByLabel(this.issues, labelId)
    });
  }

  handleAuthorClick(authorId) {
    this.setState({
      renderedIssues: this.filterIssuesByAuthor(this.issues, authorId)
    });
  }

  handleRemoveFilters() {
    this.setState({
      renderedIssues: this.issues
    });
  }

  render() {
    return (
      <div>
        <h2>GitHub Issues</h2>

        <div className="headers-container">
          Header
          <div className="headers-list">
            <CategoryHeader
              category="Authors"
              dropdownRows={this.getUniqueAuthors(this.issues)}
              handleRowClick={this.handleAuthorClick.bind(this)} />

            <CategoryHeader
              category="Labels"
              dropdownRows={this.getUniqueLabels(this.issues)}
              handleRowClick={this.handleLabelClick.bind(this)} />
            
            <button onClick={this.handleRemoveFilters.bind(this)}>
              Remove Filters
            </button>
          </div>
        </div>

        <div className="issues-list">
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
