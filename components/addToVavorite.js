import React, {Component} from 'react';
import {TouchableOpacity, View, Text, AppRegistry, StyleSheet} from 'react-native';

export class AddToVavorite extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.showMore}
                style={styles.card}>
                <View style={styles.cardCh}>
                    <Text style={{color: 'rgba(52, 152, 219,.6)', fontSize: 50}}>+</Text>
                </View>

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        padding: 15,
        width: '50%',
        height: 125,
        marginBottom: 30
    }, cardCh: {
        backgroundColor: '#fff',
        borderRadius: 8,
        height: 125,
        shadowOffset: {width: 0, height: .1},
        shadowColor: 'rgba(52, 152, 219,.6)',
        shadowOpacity: 1.0,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

AppRegistry.registerComponent('AddToVavorite', () => AddToVavorite);