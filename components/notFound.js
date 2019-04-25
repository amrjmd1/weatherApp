import React, {Component} from 'react';
import {TouchableOpacity, View, Text, AppRegistry, StyleSheet, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export class NotFound extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FontAwesome5 name={'map-marked-alt'} color={'#ddd'} size={50}/>
                <Text style={styles.text}><Text style={{fontWeight: '700'}}>Opss!</Text> {this.props.city} not
                    found</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 20
    }, text: {
        color: '#999',
        marginTop: 10,
        fontSize: 18
    }
});


AppRegistry.registerComponent('NotFound', () => NotFound);