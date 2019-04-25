import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    ScrollView,
    Dimensions,
    Platform, Image
} from 'react-native';
import Moment from 'moment';
import RadialGradient from 'react-native-radial-gradient';
import {HourlyCard} from "../components/hourlyCard";
import {ButtonRounded} from '../components/button'
import {ShowCase} from "../components/showCase";

let {height} = Dimensions.get('window');
export default class Today extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            hourly: [],
            today: null
        }


    }

//https://api.openweathermap.org/data/2.5/forecast?appid=6dfc0d0d69d6d9813b2441bebefa0c70&units=metric&lat=37.785834&lon=-122.406417
    componentDidMount() {
        let today = new Date();
        today = Moment(today).format('Y-M-D');
        this.setState({
            today: today
        })
        let lon = this.props.navigation.state.params.longLat.long;
        let lat = this.props.navigation.state.params.longLat.lat;

        fetch('https://api.openweathermap.org/data/2.5/forecast?appid=6dfc0d0d69d6d9813b2441bebefa0c70&units=metric&lat=' + lat + '&lon=' + lon).then((res) => {
            return res.json()
        }).then((resJson) => {
            resJson.list.map((Obj) => {
                this.setState({
                    hourly: this.state.hourly.concat(Obj),
                })
            })
        }).then(() => {
            this.setState({
                isLoading: true
            })
        })
    }

    _convertTime24to12(h) {
        let suffix = " AM";
        if (h >= 12) {
            suffix = " PM";
            h = h - 12;
        }
        if (h === 0) {
            h = 12;
        }
        return h + suffix
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <SafeAreaView style={{
                    position: 'absolute',
                    left: 5,
                    zIndex: 1
                }}>
                    <ButtonRounded title={'Back'} press={() => this.props.navigation.navigate('Week')}/>
                </SafeAreaView>
                <ScrollView
                    bounces={false}
                    pagingEnabled={true}
                    showsVerticalScrollIndicator={false}
                >
                    <RadialGradient
                        colors={[this.props.navigation.state.params.colors.fColor, this.props.navigation.state.params.colors.sColor]}
                        stops={[0.2, 0.4, 0.5, 0.75]}
                        center={[100, 0]}
                        radius={2000}
                        style={[styles.container]}
                    >
                        <StatusBar barStyle="light-content"/>

                        <View style={{height}}>
                            <SafeAreaView/>
                            <View style={{flex: 1, justifyContent: 'space-between'}}>
                                <View style={{flex: 1, marginTop: 20}}>
                                    <View>
                                        <Text
                                            style={[styles.colorW]}>{this.props.navigation.state.params.city + ' - ' + this.props.navigation.state.params.country}</Text>
                                        <Text
                                            style={[styles.colorW, {fontWeight: '700'}]}>{this.props.navigation.state.params.today}</Text>
                                    </View>

                                </View>
                                <View style={{flex: 7}}>
                                    <ShowCase
                                        src={this.props.navigation.state.params.src}
                                        textCase={this.props.navigation.state.params.textCase}
                                        high={this.props.navigation.state.params.high}
                                        low={this.props.navigation.state.params.low}
                                        sizeImg={120}
                                    />
                                </View>
                                <View style={{flex: 2,}}>


                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View style={styles.boxState}>
                                            <Image source={require('../image/wind.png')} style={styles.detState}/>
                                            {this.state.isLoading ?
                                                <Text
                                                    style={[styles.colorW, styles.textState]}>{this.state.hourly[0].wind.speed}</Text> :
                                                <ActivityIndicator color={'#fff'}/>}
                                        </View>
                                        <View style={styles.boxState}>
                                            <Image source={require('../image/rain.png')} style={styles.detState}/>
                                            {this.state.isLoading ?
                                                <Text style={[styles.colorW, styles.textState]}>{
                                                    this.state.hourly[0].rain > 0 ? Math.round(this.state.hourly[0].rain['3h'] * 1000) / 1000 : 0
                                                }</Text> :
                                                <ActivityIndicator color={'#fff'}/>}
                                        </View>
                                        <View style={styles.boxState}>
                                            <Image source={require('../image/cloudy.png')} style={styles.detState}/>
                                            {this.state.isLoading ?
                                                <Text
                                                    style={[styles.colorW, styles.textState]}>{this.state.hourly[0].clouds.all}</Text> :
                                                <ActivityIndicator color={'#fff'}/>}
                                        </View>
                                    </View>


                                </View>
                            </View>
                        </View>

                        <View style={{
                            height,
                            justifyContent: 'flex-start',
                            paddingTop: Platform.OS === "ios" && height > 800 ? 65 : 40,
                        }}>

                            <Text style={[styles.colorW, {fontWeight: '700'}]}>Forecast hourly</Text>
                            {this.state.isLoading ?
                                <FlatList
                                    data={this.state.hourly.slice(0, 8)}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={({key}, index) => index.toString()}
                                    renderItem={({item}) =>
                                        // item.dt_txt.split(' ')[0] !== this.state.today.toString() ?
                                        <HourlyCard
                                            wind={item.wind.speed}
                                            rain={item.rain > 0 ? Math.round(item.rain['3h'] * 1000) / 1000 : 0}
                                            cloud={item.clouds.all}
                                            time={
                                                this._convertTime24to12(parseInt(item.dt_txt.split(' ')[1].split(':')[0]))
                                            }
                                            weather={item.weather[0].description}
                                        />
                                    }
                                /> :
                                <ActivityIndicator size={'large'} color={'#fff'}/>
                            }
                        </View>

                    </RadialGradient>
                </ScrollView>
            </View>
        )
    }
}

const
    styles = StyleSheet.create({
        container: {
            height: height * 2,
            alignItems: 'stretch',
            paddingHorizontal: 5


        }, colorW: {color: '#FFF'},
        boxState: {justifyContent: 'center', alignItems: 'center', flex: 1},
        detState: {width: 40, height: 40, tintColor: '#fff'},
        textState: {
            fontWeight: '700',
            fontSize: 15,
            marginTop: 5
        }
    });

