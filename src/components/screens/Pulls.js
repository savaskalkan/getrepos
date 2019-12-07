import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { IssuesCard, NoDataCard } from "../elements/Cards"; 
import { setRepoPulls } from '../../actions';
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
      .getOneRepoPulls(this.props.selectedRepo.name, this.state.page)
      .then((res) => {
        console.log("Pulls", res)

        if (!res.length) { 
          this.setState({
            reqStatus: false,
            loading: false,
            refreshing: false,
            endRefresh: true
          })
        }
        else {
          const data = this.state.page === 1 ? res : [...this.props.selectedRepoPulls, ...res]
          this.props.setRepoPulls(data)
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
    if (this.state.reqStatus && this.state.endRefresh && this.props.selectedRepoPulls.length >= 30)
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
          this.props.selectedRepoPulls.length ?
            <FlatList
              data={this.props.selectedRepoPulls}
              renderItem={({ item }) => (
                <IssuesCard item={item} onPress={() => this.clickRepo(item)} />
              )}
              keyExtractor={item => item.id.toString()}
              ListFooterComponent={this.renderFooter}
              onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.5}
              extraData={this.props.selectedRepoPulls}
            />
            : <NoDataCard />
        }
      </View>
    );
  }
}

const mapStateToProps = ({ ReposResponse }) => {
  const { selectedRepoPulls, selectedRepo } = ReposResponse;
  return {
    selectedRepoPulls: selectedRepoPulls,
    selectedRepo: selectedRepo
  };
};

export default connect(mapStateToProps, {setRepoPulls})(Issues);   