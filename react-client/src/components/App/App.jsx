import React, { Component } from 'react';

import Issue from '../Issue/Issue.jsx';

import './app-style.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderedIssues: []
    }
  }

  fetchIssues() {
    fetch('https://api.github.com/repos/facebook/react/issues')
    .then(res => res.json())
    .then(data => {
      this.setState({
        renderedIssues: data
      });
    })
    .catch(err => {
      console.error(err);
    });

  }

  componentDidMount() {
    this.fetchIssues();
  }

  render() {
    return (
      <div>
        <h2>GitHub Issues</h2>

        <div className="issue-container">
          Header
          <div className="headers-list">
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
