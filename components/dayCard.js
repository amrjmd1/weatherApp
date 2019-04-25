import React, {Component} from 'react';
import {TouchableOpacity, View, Text, AppRegistry, StyleSheet, Image} from 'react-native';

export class DayCard extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.press}
                style={styles.card}>
                <View style={styles.cardCh}>
                    <Text style={[styles.colorText, {fontWeight: '800'}]}>{this.props.day.toUpperCase()}</Text>
                    <Text style={styles.colorText}>{this.props.text}</Text>
                    <Image source={this.props.src} style={{width: 40, height: 40, tintColor: '#f3f3f3'}}/>
                    <View>
                        <Text style={styles.colorText}><Text
                            style={{fontSize: 20}}>{this.props.high}</Text>/{this.props.low}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        width: 120,
        minHeight: 120,
        paddingVertical: 5
    }, cardCh: {
        height: 120,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 5
    },
    colorText: {
        color: '#f3f3f3',

    }
});


AppRegistry.registerComponent('DayCard', () => DayCard);