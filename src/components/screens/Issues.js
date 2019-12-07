import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { IssuesCard, NoDataCard } from "../elements/Cards"; 
import { setRepoIssues } from '../../actions';
import api from "../../api";

class Issues extends Component {

  state = {
    loading: false,
    page: 1,
    error: null,
    refreshing: false,
    reqStatus: true,  // if data run out 
    endRefresh: true, // control to wait response
  }

  componentDidMount(){
    this.getIssues()
  }

  getIssues = () => {
    api
      .getOneRepoIssues(this.props.selectedRepo.name, this.state.page)
      .then((res) => {
        console.log("Issues", res)

        if (!res.length) { 
          this.setState({
            reqStatus: false,
            loading: false,
            refreshing: false,
            endRefresh: true
          })
        }
        else {
          const data = this.state.page === 1 ? res : [...this.props.selectedRepoIssues, ...res]
          this.props.setRepoIssues(data)
          this.setState({
            loading: false,
            refreshing: false,
            endRefresh: true
          });
        }
      })
      .catch(error => {
        console.log(error)
      });

  }

  handleLoadMore = () => {
    if (this.state.reqStatus && this.state.endRefresh && this.props.selectedRepoIssues.length >= 30)
      this.setState(
        {
          page: this.state.page + 1,
          endRefresh: false
        },
        () => {
          this.getIssues();
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
        this.getIssues();
      }
    );
  };

  renderSearch = () => {
    return <SearchInp search={this.state.search} updateSearch={this.updateSearch} />
  };


  renderFooter = () => {
    if (!this.state.loading) return null;
    return <ActIndicator />
  };

  clickRepo = (item) => {
    console.log(item)
  }

  render() {
    return (
      <View style={{ flex: 1, paddingBottom: 20 }}>
        {
          this.props.selectedRepoIssues.length ?
            <FlatList
              data={this.props.selectedRepoIssues}
              renderItem={({ item }) => (
                <IssuesCard item={item} onPress={() => this.clickRepo(item)} />
              )}
              keyExtractor={item => item.id.toString()}
              ListFooterComponent={this.renderFooter}
              onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.5}
              extraData={this.props.selectedRepoIssues}
            />
            : <NoDataCard />
        }
      </View>
    );
  }
}

const mapStateToProps = ({ ReposResponse }) => {
  const { selectedRepoIssues, selectedRepo } = ReposResponse;
  return {
    selectedRepoIssues: selectedRepoIssues,
    selectedRepo: selectedRepo
  };
};

export default connect(mapStateToProps, {setRepoIssues})(Issues);   