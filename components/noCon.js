import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    AppRegistry
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export class NoCon extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FontAwesome5 name={'wifi'} color={'#ccc'} size={100}/>
                <Text style={styles.text}><Text style={styles.textBold}>Opss!</Text> we need internet connection to get
                    data</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 20
    },
    text: {
        color: '#999',
        marginTop: 15
    },
    textBold: {
        fontWeight: '700'
    }
});

AppRegistry.registerComponent('NoCon', () => NoCon);