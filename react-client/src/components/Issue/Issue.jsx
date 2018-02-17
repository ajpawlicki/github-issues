import React, { Component } from 'react';

import './issue-style.css';

export default (props) => {
  const { number, user, state, title, assignee, labels, created_at, html_url, comments } = props.issue;
  const date = new Date(created_at).toDateString();

  return (
    <div className="issue-container">
      <div className="issue-content-col">
        <div className="issue-title-container">
          <span className="issue-title">
            <a href={html_url} target="_blank">{title}</a>
          </span>

          {labels.map((label, index) => {
            return (
              <span key={index} style={{ backgroundColor: '#' + label.color }} className="issue-label">
                {label.name}
              </span>
            );
          })}

        </div>

        <div className="issue-description">
          <span>
            {`#${number} ${state}ed on ${date} by ${user.login} with ${comments} comment${comments === 1 ? '' : 's'}`}
          </span>
        </div>
      </div>

      <div className="issue-thumbnail-col">
        { assignee ? <img src={assignee.avatar_url} alt="" height="20" width="20"/> : null }
      </div>
    </div>
  );
};
