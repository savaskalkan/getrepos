import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { setRepoIssues, setRepoPulls } from '../../actions';
import { RepoDetailCard } from "../elements/Cards";
import { ScrollView } from 'react-native-gesture-handler';

class RepoDetail extends Component {  
  render() {
    return (
      <View>
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          <RepoDetailCard item={this.props.selectedRepo} />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ ReposResponse }) => {
  const { selectedRepo, selectedRepoIssues, selectedRepoPulls } = ReposResponse;
  return {
    selectedRepo: selectedRepo,
    selectedRepoIssues: selectedRepoIssues,
    selectedRepoPulls: selectedRepoPulls
  };
};

export default connect(mapStateToProps, { setRepoIssues, setRepoPulls })(RepoDetail);  