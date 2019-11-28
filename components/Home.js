import React from 'react';
import { StyleSheet, Text, View, Button, Animated, Image, Easing, SafeAreaView, ScrollView } from 'react-native';
import AllVelib from './AllVelib';
import Constants from 'expo-constants';


export default class Home extends React.Component {
    constructor() {
        super();
        this.spinValue = new Animated.Value(0)
    }

    componentDidMount() {
        this.spin()
    }

    spin() {
        this.spinValue.setValue(0)
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear
            }
        ).start(() => this.spin())
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        return (
            <React.Fragment>
                <SafeAreaView style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "slategrey" }}>
                            <Animated.Image
                                style={{
                                    width: 227,
                                    height: 200,
                                    transform: [{ rotate: spin }]
                                }}
                                source={{ uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png' }}
                            />
                        </View>
                        <View>
                            <AllVelib navigation={this.props.navigation} />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    scrollView: {
        marginHorizontal: 2,
    }
});