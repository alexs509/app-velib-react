import React from 'react';
import { StyleSheet, Text, View, Button, Animated, Image, Easing, SafeAreaView, ScrollView } from 'react-native';
import AllVelib from './AllVelib';

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
                toValue: 50,
                duration: 2000
            }
        ).start(() => this.spin())
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 10]
        })
        return (
            <React.Fragment>
                <SafeAreaView style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        <View style={{  backgroundColor: "#FCFCFC" }}>
                            <Animated.Image
                                style={{
                                    width: 100,
                                    height: 100,
                                    transform: [{ translateX: spin }]
                                }}
                                source={{ uri: 'https://www.icone-png.com/png/10/10388.png' }}
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
    scrollView: {
        marginHorizontal: 2,
    }
});