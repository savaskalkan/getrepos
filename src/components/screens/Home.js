

import React, { Component } from 'react';
import config from "../../config";
import api from "../../api";
import { View, Text, FlatList } from "react-native";
import { connect } from 'react-redux';
import { setRepo, setRepos } from '../../actions';

import { RepoCard, NoDataCard } from "../elements/Cards";
import { SearchInp } from "../elements/Inputs";
import ActIndicator from "../elements/ActIndicator";

class Home extends Component {

  state = {
    loading: false,
    page: 1,
    error: null,
    refreshing: false,
    reqStatus: true,  // if data run out 
    endRefresh: true, // control to wait response
    search: '',
  }

  componentDidMount() {
    this.getReposData()
  }

  getReposData = () => {
    const { page } = this.state;
    this.setState({ loading: true });
    api
      .getReposwithPage(page)
      .then(res => {
        console.log("respo", res)

        if (!res.length) {
          console.log("req false")
          this.setState({
            loading: false,
            refreshing: false,
            endRefresh: true,
            reqStatus: false,
          })
        }
        else {
          const data = this.state.page === 1 ? res : [...this.props.repos, ...res]
          this.props.setRepos(data)

          this.setState({
            loading: false,
            refreshing: false,
            endRefresh: true
          });
        }

      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }


  getReposSearchData = () => {
    const { search } = this.state;
    this.setState({ loading: true });
    api
      .getReposwithName(search)
      .then((res) => {
        console.log("Response", res)
        if (res.message == "Not Found") {
          this.setState({
            data: [],
            loading: false
          })
        }
        else
          this.setState({
            data: [res],
            loading: false
          });

      })
      .catch(error => {
        this.setState({ error, loading: false });
      });

  }


  handleLoadMore = () => {
    console.log("reqStatus", this.state.reqStatus)
    if (this.state.reqStatus && this.state.endRefresh && this.props.repos.length >= 30)
      this.setState(
        {
          page: this.state.page + 1,
          endRefresh: false
        },
        () => {
          this.getReposData();
        }
      );
  };



  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
        reqStatus: true,
      },
      () => {
        this.getReposData();
      }
    );
  };

  renderSearch = () => {
    return <SearchInp search={this.state.search} updateSearch={this.updateSearch} />
  };


  renderFooter = () => {
    console.log("ac", this.state.loading)
    if (!this.state.loading) return null;
    return <ActIndicator />
  };




  updateSearch = (text) => {
    this.setState({
      search: text
    }, () => {
      // min 3 character to search
      if (text.length > 2)
        this.getReposSearchData()
      else if (!text)
        this.getReposData()
    })
  }


  // async function sample to wait set state and then write console
  clickRepo = async (item) => {
    console.log("selectedRepo before", this.props.selectedRepo)
    await this.props.setRepo(item)
    console.log("selectedRepo after", this.props.selectedRepo)
    this.props.navigation.navigate("Details")
  }
  ////

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderSearch()}
        {
          this.props.repos.length ?
            <FlatList
              data={this.props.repos}
              renderItem={({ item }) => (
                <RepoCard item={item} onPress={() => this.clickRepo(item)} />
              )}
              keyExtractor={item => item.name}
              ListFooterComponent={this.renderFooter}
              onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.5}
              extraData={this.props.repos}
            />
            : <NoDataCard />
        }
      </View>
    );
  }
}


const mapStateToProps = ({ ReposResponse }) => {
  const { selectedRepo, repos } = ReposResponse;
  return {
    selectedRepo: selectedRepo,
    repos: repos
  };
};

export default connect(mapStateToProps, { setRepo, setRepos })(Home); 