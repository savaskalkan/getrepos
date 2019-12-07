import { SET_REPO, SET_REPO_ISSUES, SET_REPO_PULLS, SET_REPOS } from '../actions/types';

const INITIAL_STATE = {
  repos: [],
  selectedRepo: {},
  selectedRepoIssues: [],
  selectedRepoPulls: [],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_REPO:
      return { ...state, selectedRepo: action.payload };
    case SET_REPOS:
      return { ...state, repos: action.payload };
    case SET_REPO_ISSUES:
      return { ...state, selectedRepoIssues: action.payload };
    case SET_REPO_PULLS:
      return { ...state, selectedRepoPulls: action.payload };
    default:
      return state;

  }
};