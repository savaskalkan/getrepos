import { SET_REPOS, SET_REPO, SET_REPO_ISSUES, SET_REPO_PULLS } from './types'; 

export const setRepo = (item) => (dispatch) => {
    dispatch({
        type: SET_REPO,
        payload: item
    });
    
}; 

export const setRepos = (item) => (dispatch) => {
    dispatch({
        type: SET_REPOS,
        payload: item
    });
    
}; 

export const setRepoIssues = (item) => (dispatch) => {
    dispatch({
        type: SET_REPO_ISSUES,
        payload: item
    });
    
}; 

export const setRepoPulls = (item) => (dispatch) => {
    dispatch({
        type: SET_REPO_PULLS,
        payload: item
    });
    
}; 