import React, { Component } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Card, Icon } from "react-native-elements";
import config from "../../config";


export class RepoCard extends Component {
    render() {
        const { item, onPress } = this.props
        return (
            <TouchableOpacity onPress={onPress}>
                <Card
                    title={item.name}
                    titleStyle={config.styles.RepoCard.titleStyle}
                >
                    <Text>{item.description}</Text>
                    <View style={config.styles.RepoCard.footer}>
                        <Text style={config.styles.RepoCard.footerText}>{item.language}</Text>
                        <View style={config.styles.RepoCard.icoContainer}>
                            <Icon type="FontAwesome5" name="star" />
                            <Text style={config.styles.RepoCard.footerText}>{item.forks}</Text>
                        </View>
                        <View style={config.styles.RepoCard.icoContainer}>
                            <Icon type="FontAwesome5" name="warning" />
                            <Text style={config.styles.RepoCard.footerText}>{item.open_issues_count}</Text>
                        </View>

                    </View>
                </Card>
            </TouchableOpacity>
        )
    }
}


export class RepoDetailCard extends Component {
    render() {
        const { item } = this.props
        return (
            <Card
                title={item.name}
                titleStyle={config.styles.RepoCard.titleStyle}
                image={{ uri: item.owner.avatar_url }}
            >
                <View>
                    <Text style={[config.styles.RepoCard.contentText, { margin: 15, fontSize: 10, textAlign: 'right' }]}>Created at: {item.created_at}</Text>
                    <Text style={config.styles.RepoCard.contentText}>Langugae: {item.language}</Text>
                    <Text style={config.styles.RepoCard.contentText}>{item.description}</Text>
                    <Text style={config.styles.RepoCard.contentText}>Size: {item.size}</Text>
                    <Text style={config.styles.RepoCard.contentText}>Watchers: {item.watchers}</Text>
                    <Text style={config.styles.RepoCard.contentText}>Forks: {item.forks}</Text>
                    <Text style={config.styles.RepoCard.contentText}>Issues: {item.open_issues_count}</Text>
                    <Text style={[config.styles.RepoCard.contentText, { color: "orange" }]}
                        onPress={() => Linking.openURL(item.homepage)}>
                        Go to Website
                        </Text>
                </View>
            </Card>
        )
    }
}


export class NoDataCard extends Component {
    render() {
        return (
            <View style={config.styles.noDataCard}>
                <Text style={config.styles.ndText}>No data..!</Text>
            </View>
        )
    }
}

export class IssuesCard extends Component {
    render() {
        const { item, onPress } = this.props
        return (
            <TouchableOpacity onPress={onPress}>
                <Card
                    title={item.title}
                    titleStyle={config.styles.RepoCard.titleStyle}
                    image={{ uri: item.user.avatar_url }}
                >
                    <Text style={[config.styles.RepoCard.contentText, { margin: 15, fontSize: 10, textAlign: 'right' }]}>{item.updated_at}</Text>
                    <Text>{item.body}</Text>
                </Card>
            </TouchableOpacity>
        )
    }
}