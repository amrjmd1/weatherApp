import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    SafeAreaView,
    ActivityIndicator,
    FlatList,
    StatusBar, NetInfo,

} from 'react-native';
import {DayCard} from "../components/dayCard";
import Moment from 'moment';
import RadialGradient from 'react-native-radial-gradient';
import Master from "../master";
import {ButtonRounded} from "../components/button";
import {ShowCase} from "../components/showCase";

export default class Weekly extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: null,
            isLoading: false,
            activeDay: 0,
            today: null,
            isConnected: true,

        }


        AsyncStorage.getItem('Place_' + this.props.navigation.state.params.city.replace(' ', '_')).then((value) => {
            this.setState({
                data: JSON.parse(value).list,
            })
        }).then(() => {
            let today = new Date();
            today = Moment(today).format('D MMM Y');


            this.state.data.map((D, i) => {
                let tod = new Date(D.list.dt_txt.split(' ')[0]);
                tod = Moment(tod).format('D MMM Y');
                if (tod === today) {
                    this.setState({
                        activeDay: i,
                        today: i,
                        isLoading: true
                    })
                }

            })


        })


    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);

    }


    handleConnectivityChange = isConnected => {
        this.setState({isConnected});
    }

    _getDay(day, strDay) {
        let _day = new Date(day.split(' ')[0]);
        if (strDay)
            _day = Moment(_day).format('ddd');
        else
            _day = Moment(_day).format('dddd DD MMM Y');
        return _day

    }

    render() {
        if (!this.state.isLoading)
            return (
                <View style={[styles.container, {justifyContent: 'center'}]}>
                    <ActivityIndicator/>
                </View>
            );
        return (
            <RadialGradient
                colors={[
                    Master.weatherColors[this.state.data[this.state.activeDay].list.weather[0].icon].fColor,
                    Master.weatherColors[this.state.data[this.state.activeDay].list.weather[0].icon].sColor
                ]}
                stops={[0.2, 0.4, 0.3, 0.75]}
                center={[100, 0]}
                radius={1220}
                style={styles.container}
            >
                <StatusBar barStyle="light-content"/>
                <View style={styles.boxDet}>
                    <SafeAreaView>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                            <ButtonRounded title={'favorite'} press={() => this.props.navigation.navigate('Favorite')}/>
                            {this.state.isConnected ?
                                <ButtonRounded title={'today'} press={() => this.props.navigation.navigate('Today', {
                                    city: this.props.navigation.state.params.city,
                                    country: this.props.navigation.state.params.country,
                                    longLat: this.props.navigation.state.params.longLat,
                                    colors: {
                                        //    fColor: Master.WetherState[this.state.data[this.state.today].code].fColor,
                                        fColor: Master.weatherColors[this.props.navigation.state.params.icon].fColor,
                                        //  sColor: Master.WetherState[this.state.data[this.state.today].code].sColor
                                        sColor: Master.weatherColors[this.props.navigation.state.params.icon].sColor
                                    },
                                    today: this._getDay(this.state.data[this.state.activeDay].list.dt_txt),
                                    //src: this.props.navigation.state.params.images[this.state.data[this.state.activeDay].code],
                                    src: this.props.navigation.state.params.images[this.props.navigation.state.params.icon],
                                    textCase: this.state.data[this.state.activeDay].list.weather[0].description,
                                    high: parseInt(this.state.data[this.state.activeDay].list.main.temp_max),
                                    low: parseInt(this.state.data[this.state.activeDay].list.main.temp_min)
                                })}/>
                                : null}
                        </View>

                    </SafeAreaView>
                    <View style={{marginTop: 10}}>
                        <Text
                            style={[styles.colorW]}>{this.props.navigation.state.params.city + ' - ' + this.props.navigation.state.params.country}</Text>
                        <Text
                            style={[styles.colorW, {fontWeight: '700'}]}>{this._getDay(this.state.data[this.state.activeDay].list.dt_txt)}</Text>
                    </View>


                </View>

                <ShowCase
                    src={this.props.navigation.state.params.images[this.state.data[this.state.activeDay].list.weather[0].icon]}
                    textCase={this.state.data[this.state.activeDay].list.weather[0].description}
                    high={parseInt(this.state.data[this.state.activeDay].list.main.temp_max)}
                    low={parseInt(this.state.data[this.state.activeDay].list.main.temp_min)}
                    sizeImg={160}
                />

                <View style={styles.boxList}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={this.state.data}
                        bounces={false}
                        keyExtractor={({key}, index) => index.toString()}
                        renderItem={({item, index}) =>
                            <DayCard
                                day={this._getDay(item.list.dt_txt, true)}
                                text={item.list.weather[0].description}
                                high={parseInt(item.list.main.temp_max)}
                                low={parseInt(item.list.main.temp_min)}
                                src={this.props.navigation.state.params.images[item.list.weather[0].icon]}
                                press={() => {
                                    this.setState({
                                        activeDay: index
                                    })
                                }}
                            />
                        }
                    />
                    <SafeAreaView/>
                </View>
            </RadialGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    colorW: {color: '#FFF'},
    boxDet: {
        paddingLeft: 15,
        paddingRight: 15,

    },
    boxList: {
        minHeight: 120,
    }
});
