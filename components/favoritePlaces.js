import React, {Component} from 'react';
import {TouchableOpacity, View, Text, AppRegistry, StyleSheet, Image} from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import Master from "../master";

export class FavoritePlaces extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: Master.weatherColors[this.props.code],
        }
        
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.showMore}
                style={styles.card}>
                <View style={[styles.BSh, {shadowColor: this.state.data.fColor}]}>
                    <View style={styles.cardCh}>
                        <RadialGradient
                            colors={[this.state.data.fColor, this.state.data.sColor]}
                            stops={[0.1, 0.4, 0.3, 0.75]}
                            center={[100, 20]}
                            radius={200}
                            style={styles.gradientBox}
                        >
                            <View style={styles.imgBox}>
                                <Image source={this.props.imgSource}
                                       style={{width: 40, height: 40, tintColor: '#fff'}}/>
                                <Text numberOfLines={1}
                                      style={{color: '#fff', paddingTop: 3}}>{this.props.text}</Text>
                            </View>
                            <View style={styles.footer}>
                                <Text style={[styles.text, {fontSize: 28}]}>{this.props.high}<Text
                                    style={{fontSize: 12}}>/{this.props.low}</Text></Text>
                                <View style={{
                                    position: 'absolute',
                                    top: 0, left: 40
                                }}>
                                    <Text style={styles.subText}>C</Text>
                                </View>
                                <Text numberOfLines={1} style={[styles.text]}>{this.props.city}</Text>
                            </View>
                        </RadialGradient>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        padding: 15,
        width: '50%',
    }, BSh: {
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 10,
        shadowOpacity: 1,
    },
    cardCh: {
        borderRadius: 8,
        height: 125,
        overflow: 'hidden'
    }, gradientBox: {
        padding: 8,
        justifyContent: 'space-between',
        height: 125,
    },
    text: {color: '#fff', fontWeight: '700'},
    imgBox: {
        alignItems: 'flex-end'
    },
    footer: {},
    subText: {
        fontWeight: '400',
        fontSize: 15,
        color: '#fff'
    }
})

AppRegistry.registerComponent('FavoritePlaces', () => FavoritePlaces);