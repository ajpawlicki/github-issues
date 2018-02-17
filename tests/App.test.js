import React from 'react';
import App from '../react-client/src/components/App/App.jsx';

describe('Testing App component logic', () => {

  describe('getUniqueObjectsFromArray', () => {
    it('Returns an array', () => {
      const app = new App();
      expect( Array.isArray(app.getUniqueObjectsFromArray([])) ).toBeTruthy();
    });
    
    it('Includes two objects with different ids', () => {
      const app = new App();

      const objects = [{id: 1}, {id: 2}];
      const filteredObjects = app.getUniqueObjectsFromArray(objects);
      
      const expected = [{id: 1}, {id: 2}];

      expect(filteredObjects.length).toBe(2);
      expect(filteredObjects).toEqual(expected);
    });

    it('Does not include two objects with the same id', () => {
      const app = new App();

      const objects = [{id: 1}, {id: 1}];
      const filteredObjects = app.getUniqueObjectsFromArray(objects);
      
      const expected = [{id: 1}];

      expect(filteredObjects.length).toBe(1);
      expect(filteredObjects).toEqual(expected);
    });

    it('Correctly gets all unique objects from a longer list', () => {
      const app = new App();

      const objects = [{id: 1}, {id: 1}, {id: 2}, {id: 1}, {id: 3}, {id: 2}];
      const filteredObjects = app.getUniqueObjectsFromArray(objects);
      
      const expected = [{id: 1}, {id: 2}, {id: 3}];

      expect(filteredObjects.length).toBe(3);
      expect(filteredObjects).toEqual(expected);
    });
  });

  describe('filterIssuesByAuthor', () => {
    it('Includes issues matching a given author id', () => {
      const app = new App();

      const issues = [ { user: { id: 1 } } ];
      const expected = [ { user: { id: 1 } } ];

      expect(app.filterIssuesByAuthor(issues, 1)).toEqual(expected);
    });

    it('Does not includes issues that do not match a given author id', () => {
      const app = new App();

      const issues = [ { user: { id: 1 } } ];

      expect(app.filterIssuesByAuthor(issues, 5)).toEqual([]);
    });
  });

  describe('filterIssuesByLabel', () => {
    it('Includes issues matching a given label id', () => {
      const app = new App();

      const issues = [ { labels: [{ id: 1 }] } ];
      const expected = [ { labels: [{ id: 1 }] } ];

      expect(app.filterIssuesByLabel(issues, 1)).toEqual(expected);
    });

    it('Includes issues with a label that matches a given label id and a label that does not match that same label id', () => {
      const app = new App();

      const issues = [ { labels: [{ id: 1 }, { id: 10 }] } ];
      const expected = [ { labels: [{ id: 1 }, { id: 10 }] } ];

      expect(app.filterIssuesByLabel(issues, 1)).toEqual(expected);
    });

    it('Does not includes issues that do not match a given label id', () => {
      const app = new App();

      const issues = [ {labels: [{ id: 1 }]} ];

      expect(app.filterIssuesByLabel(issues, 5)).toEqual([]);
    });

    it('Does not includes issues with multiple labels that do not match a given label id', () => {
      const app = new App();

      const issues = [ {labels: [{ id: 1 }, { id: 10 }, { id: 100 }]} ];

      expect(app.filterIssuesByLabel(issues, 5)).toEqual([]);
    });
  });

  describe('toggleDropdowns', () => {
    it('Switches all categories to true given an input of null', () => {
      const app = new App();
      const { state } = app;

      state.dropdownCategories.Authors = false;
      state.dropdownCategories.Labels = false;

      app.toggleDropdowns(null);

      expect(state.dropdownCategories.Authors).toBeTruthy();
      expect(state.dropdownCategories.Labels).toBeTruthy();
    });

    it('Toggles input category from true to false and switches all other categories to true', () => {
      const app = new App();
      const { state } = app;

      app.toggleDropdowns('Authors');

      expect(state.dropdownCategories.Authors).toBeFalsy();
      expect(state.dropdownCategories.Labels).toBeTruthy();
    });

    it('Toggles input category from false to true and switches all other categories to true', () => {
      const app = new App();
      const { state } = app;

      state.dropdownCategories.Labels = false;

      app.toggleDropdowns('Labels');

      expect(state.dropdownCategories.Authors).toBeTruthy();
      expect(state.dropdownCategories.Labels).toBeTruthy();
    });
  });
});
