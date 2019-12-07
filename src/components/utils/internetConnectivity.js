import React, { PureComponent } from "react";
import { View, Text} from "react-native"; 
import NetInfo from "@react-native-community/netinfo";
import config from "../../config";

function CheckInternet() {
  return (
    <View style={config.styles.internetConnectivityStyle.offlineContainer}>
      <Text style={config.styles.internetConnectivityStyle.offlineText}>
        No Internet Connection!
      </Text>
    </View>
  );
}

class InternetConnectivity extends PureComponent {
  state = {
    isConnected: true
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this._handleConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this._handleConnectivityChange
    );
  }

  _handleConnectivityChange = isConnected => {
    this.setState({ isConnected });
  };

  render() {
    if (!this.state.isConnected) {
      return <CheckInternet />;
    }
    return null;
  }
}

export default InternetConnectivity;
