import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from 'react-navigation-stack'
import {
  Home,
  RepoDetail,
  Pulls,
  Issues
} from "../components/screens";


const RootStack = createMaterialTopTabNavigator(
  {
    RepoDetail: { screen: RepoDetail },
    Pulls: { screen: Pulls },
    Issues: { screen: Issues },
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: "orange"
      },

      indicatorStyle: {
        backgroundColor: "#fff"
      },
      labelStyle: {
        color: "#fff"
      }
    }
  },
  {
    initialRouteName: "RepoDetail"
  }
);


const CaseStack = createStackNavigator({

  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: "Repos",
      headerStyle: {
        backgroundColor: "brown"
      },
      headerTitleStyle: {
        color: "white"
      },
      headerTintColor: "#fff",
    })
  },
  Details: {
    screen: RootStack,
    navigationOptions: ({ navigation }) => ({
      title: "Details",
      headerStyle: {
        backgroundColor: "orange"
      },
      headerTitleStyle: {
        color: "white"
      },
      headerTintColor: "#fff",
    })
  }
},
  {
    initialRouteName: "Home",
  }

);

const TabContainer = createAppContainer(CaseStack);

export default TabContainer;
