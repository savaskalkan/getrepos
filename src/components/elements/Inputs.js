import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { SearchBar } from "react-native-elements";
import config from "../../config";


export class SearchInp extends Component {
    render() {
        const { search, updateSearch } = this.props
        return (
            <View style={config.styles.sbCover}>
                <SearchBar
                    value={search}
                    onChangeText={updateSearch}
                    placeholder="Search.."
                    lightTheme={true}
                    containerStyle={config.styles.sbContainer}
                    inputContainerStyle={{ backgroundColor: 'transparent' }}
                />
            </View>
        )
    }
}