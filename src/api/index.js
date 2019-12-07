import config from "../config"; 

export default {
    getReposwithPage: function (page) {
        return fetch(
            config.baseUrl + "users/reactjs/repos?page=" + page
        )
            .then(response => response.json())
            .catch(e => e);
    },

    getReposwithName: function (name) {
        return fetch(
            config.baseUrl + "repos/reactjs/" + name
        )
            .then(response => response.json())
            .catch(e => e);
    },

    getOneRepoIssues: function (name, page) {
        return fetch(
            config.baseUrl + "repos/reactjs/" + name + "/issues?page=" +  page
        )
            .then(response => response.json())
            .catch(e => e);
    },

    getOneRepoPulls: function (name,page) {
        return fetch(
            config.baseUrl + "repos/reactjs/" + name + "/pulls?page=" +  page
        )
            .then(response => response.json())
            .catch(e => e);
    },

     
 
};
