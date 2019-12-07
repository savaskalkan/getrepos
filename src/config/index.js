import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const generalBgColor = '#50d2c2'

export default {
  generalBgColor: generalBgColor,
  baseUrl: "https://api.github.com/",

  errorText: {
    noConnection:
      "Bir hata oluştu. Lütfen internete bağlı olduğunuza emin olun."
  },

  styles: {
    RepoCard: {
      titleStyle: {
        alignSelf: 'flex-start',
        margin: 10
      },
      footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
      },
      footerText: {
        fontSize: 12,
        fontStyle: 'italic',
      },
      contentText: {
        fontSize: 14,
        marginTop:10,
      },
      icoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    },

    internetConnectivityStyle: {
      offlineContainer: {
        backgroundColor: "#b52424",
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      },

      offlineText: { color: "#fff" }
    },

    sbCover: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    sbContainer: {
      backgroundColor: 'transparent',
      borderColor: 'lightgray',
      flex: 1
    },
    actIndicator: {
      paddingVertical: 20,
      borderTopWidth: 1,
      borderColor: "#CED0CE"
    },
    noDataCard: {
      margin: 10, height: 50,
      borderWidth: 2,
      borderColor: 'lightgray',
      justifyContent: 'center',
      alignItems: 'center'
    },
    ndText: {
      color: "gray",
      fontWeight: 'bold',
      fontStyle: 'italic'
    }

  },



};
