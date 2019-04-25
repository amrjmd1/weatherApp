import React, {Component} from 'react';
import {View, Text, AppRegistry, StyleSheet, Image} from 'react-native';

export class HourlyCard extends Component {
    render() {
        return (
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.title}>{this.props.weather}</Text>
                    <Text style={styles.title}>{this.props.time}</Text>
                </View>
                <View style={styles.bodyCard}>
                    <View style={styles.boxState}>
                        <Image source={require('../image/wind.png')} style={styles.detState}/>

                        <Text style={styles.textState}>{this.props.wind}</Text>
                    </View>
                    <View style={styles.boxState}>
                        <Image source={require('../image/rain.png')} style={styles.detState}/>
                        <Text style={styles.textState}>{this.props.rain}</Text>

                    </View>
                    <View style={styles.boxState}>
                        <Image source={require('../image/cloudy.png')} style={styles.detState}/>
                        <Text style={styles.textState}>{this.props.cloud}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(250,250,250,.3)',
        margin: 5,
        borderRadius: 8,
        padding: 8
    },
    header: {
        borderBottomColor: '#eee',
        borderBottomWidth: .2,
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {color: '#333', fontWeight: '600'},
    colorText: {color: '#222'},
    bodyCard: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }, boxState: {justifyContent: 'center', alignItems: 'center', flex: 1},
    detState: {width: 30, height: 30, tintColor: '#fff'},
    textState: {
        fontWeight: '700',
        fontSize: 15,
        marginTop: 5,
        color: '#fff'
    }
});


AppRegistry.registerComponent('HourlyCard', () => HourlyCard);