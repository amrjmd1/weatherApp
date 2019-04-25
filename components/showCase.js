import React, {Component} from 'react';
import {View, Text, AppRegistry, StyleSheet, Image} from 'react-native';

export class ShowCase extends Component {
    render() {
        return (
            <View style={{alignItems: 'center', paddingLeft: 15, paddingRight: 15}}>
                <Image
                    resizeMode={'contain'}
                    source={this.props.src}
                    style={{tintColor: '#fff', height: this.props.sizeImg, marginTop: 20}}/>
                <Text
                    style={[styles.colorW, {
                        fontSize: 20,
                        paddingTop: 10
                    }]}>{this.props.textCase}</Text>

                <View style={styles.boxHL}>
                    <View style={styles.boxHLinside}>
                        <Text style={styles.textTitle}>high</Text>
                        <View style={styles.makeTop}>
                            <Text
                                style={[styles.colorW, styles.bigN]}>{this.props.high}</Text>
                            <Text
                                style={[styles.colorW, styles.bigC]}>C</Text>
                        </View>
                    </View>
                    <View style={styles.boxHLinside}>
                        <Text style={styles.textTitle}>low</Text>
                        <View style={styles.makeTop}>
                            <Text
                                style={[styles.colorW, styles.bigN]}>{this.props.low}</Text>
                            <Text
                                style={[styles.colorW, styles.bigC]}>C</Text>
                        </View>
                    </View>
                </View>
            </View>
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

    }, boxHL: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: 20,
        borderTopColor: '#F5FCFF',
        borderTopWidth: .5,

    },
    boxHLinside: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    }, textTitle: {
        fontSize: 18,
        color: '#fafafa',
        textAlign: 'left',
        width: '100%'
    }, makeTop: {alignItems: 'flex-start', flexDirection: 'row',},
    bigN: {fontSize: 50, fontWeight: '600'},
    bigC: {
        fontSize: 20,
        fontWeight: '600'
    },
    colorW: {color: '#fff'}
});


AppRegistry.registerComponent('ShowCase', () => ShowCase);