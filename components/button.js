import React, {Component} from 'react';
import {TouchableOpacity, Text, AppRegistry, StyleSheet} from 'react-native';

export class ButtonRounded extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.btn}
                              onPress={this.props.press}>
                <Text style={{color: '#fff'}}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: 'rgba(255,255,255,.4)',
        borderRadius: 10,
        height: 20,
        paddingHorizontal: 10,
        justifyContent: 'center',

    }
});


AppRegistry.registerComponent('ButtonRounded', () => ButtonRounded);