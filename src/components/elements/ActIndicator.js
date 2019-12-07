import React, { Component } from "react";
import { View, ActivityIndicator} from "react-native";
import config from "../../config";


export default class ActIndicator extends Component {
    render() { 
        return (
            <View
                style={config.styles.actIndicator}
            >
                <ActivityIndicator animating size="large" />
            </View>
        )
    }
}