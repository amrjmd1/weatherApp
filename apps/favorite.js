import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    AsyncStorage,
    FlatList,
    SafeAreaView,
    PermissionsAndroid,
    Platform, TouchableOpacity, StatusBar, NetInfo
} from 'react-native';
import Master from "../master";
import {FavoritePlaces} from '../components/favoritePlaces'
import {AddToVavorite} from "../components/addToVavorite";
import Moment from 'moment';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {NoCon} from "../components/noCon";


let today = new Date();
today = Moment(today).format('D MMM Y');


export default class Favorite extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            places: [],
            placesDetails: [],
            longLat: [],
            images: {
                '11d': require('../image/lightning.png'),
                '09d': require('../image/winter.png'),
                '10d': require('../image/raining.png'),
                '13d': require('../image/winter.png'),
                '50d': require('../image/sand.png'),
                '01d': require('../image/sun.png'),
                '01n': require('../image/moon.png'),
                '02d': require('../image/weather.png'),
                '02n': require('../image/cloudy-night.png'),
                '04d': require('../image/cloudy.png'),
                '04n': require('../image/cloudy.png'),
                '03d': require('../image/lightning.png'),
                '03n': require('../image/lightning.png')
            },
            isConnected: true,
            needConnect: false
        }
        
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        this._getDataFirstTime();

    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);


    }


    handleConnectivityChange = isConnected => {
        this.setState({isConnected});
    }


    _getDataFirstTime = () => {
        this.setState({
            isLoading: false,
            places: [],
            placesDetails: [],
            longLat: [],
        });
        AsyncStorage.getItem('Places').then((value) => {
            if (value !== null) {
                value.split("_my_cuter").map((P, index) => {
                    this._getDataPlacesName(P, index);
                })
            } else {
                if (this.state.isConnected) {
                    this._getDataPlaces();
                }
                else {
                    this.setState({
                        needConnect: true
                    })
                }
            }
        });
    }


    _getDataPlaces = () => {

        if (this.state.places.length === 0) {
            let CanDo = true;
            if (Platform.OS === 'android') {
                CanDo = this._checkLocation()
            }
            if (CanDo) {
                this.watchId = navigator.geolocation.watchPosition(
                    (position) => {
                        //Master.ApiLink('location', '(' + position.coords.latitude + ', ' + position.coords.longitude + ')')
                        fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&cnt=10&appid=6dfc0d0d69d6d9813b2441bebefa0c70').then((res) => {
                            return res.json()
                        }).then((resJson) => {
                            let pos = JSON.stringify({city: resJson.name, country: resJson.sys.country});
                            AsyncStorage.setItem('Places', pos);
                            this._getDataPlacesName(pos, 0);
                        }).catch((er) => {
                            this.setState({error: er.message, isLoading: true});
                        })

                    },
                    (error) => {
                        this.setState({error: error.message, isLoading: true});
                    },
                    {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000, distanceFilter: 10},
                )
            } else {

                this.setState({
                    isLoading: true
                })
            }
        }

    }

    async _checkLocation() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true
            } else {
                return false
            }
        } catch (err) {
            console.warn(err)
        }
    }


    _getDataPlacesName = (cityData, index) => {

        let cityObj = JSON.parse(cityData);
        this.setState({
            places: this.state.places.concat(cityObj),
        });
        let namePlace = 'Place_' + cityObj.city.replace(' ', '_');

        AsyncStorage.getItem(namePlace).then((getCity) => {

            if (getCity !== null) {
                let data = JSON.parse(getCity);

                this.setState({
                    longLat: this.state.longLat.concat({long: data.longLat.lon, lat: data.longLat.lat})
                });


                let lastDay = new Date(data.list[data.list.length - 1].list.dt_txt.split(' ')[0]);


                if (!(new Date(today) <= lastDay) && this.state.isConnected) {
                    this._getCityDataFromApi(cityObj.country, cityObj.city, namePlace, index);
                }

                else {

                    data.list.map((day) => {
                        day = day.list;
                        let newDay = new Date(day.dt_txt.split(' ')[0]);
                        newDay = Moment(newDay).format('D MMM Y');

                        if (newDay === today) {
                            this.setState({
                                placesDetails: this.state.placesDetails.concat(day),
                            });
                        }


                    });
                }


            } else {

                this._getCityDataFromApi(cityObj.country, cityObj.city, namePlace, index);
            }
        }).then(() => {

            if (this.state.placesDetails.length === this.state.places.length) {
                // console.warn(this.state.placesDetails)
                this.setState({
                    isLoading: true
                })
            }
        });
    }

    _getCityDataFromApi = async (country, city, namePlace, index) => {
        if (this.state.isConnected) {
            let dataState = this.state.placesDetails;
            //Master.ApiLink('item', '(' + country + ',' + city + ')')


            fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + city + "," + country + "&appid=6dfc0d0d69d6d9813b2441bebefa0c70&units=metric").then((res) => {
                return res.json()
            }).then((resJson) => {

                let data = {longLat: resJson.city.coord, list: resJson.list},
                    newData = [], addToday = false;


                this.setState({
                    longLat: this.state.longLat.concat({long: data.longLat.lon, lat: data.longLat.lat})
                });


                data.list.map((day, i) => {
                    let newDay = new Date(day.dt_txt.split(' ')[0]);
                    newDay = Moment(newDay).format('D MMM Y');
                    if (newDay === today && !addToday) {
                        addToday = true;
                        newData.push({longLat: data.longLat[i], list: day});
                        dataState[index] = day;
                        this.setState({
                            placesDetails: dataState
                        });
                    } else {
                        let isDayFound = false;

                        for (let i = 0; i < newData.length; i++) {
                            let newD = new Date(newData[i].list.dt_txt.split(' ')[0]);
                            newD = Moment(newD).format('D MMM Y');

                            if (newD === newDay) {
                                isDayFound = true
                            }
                        }

                        if (!isDayFound && newDay !== today) {
                            newData.push({longLat: data.longLat[i], list: day});
                        }

                    }


                });

                data.list = newData;
                AsyncStorage.setItem(namePlace, JSON.stringify(data));

            }).then(() => {
                let allDone = 0;
                this.state.placesDetails.map((I) => {
                    if (I.date)
                        allDone++
                });
                if (this.state.placesDetails.length === this.state.places.length && allDone === this.state.placesDetails.length) {
                    this.setState({
                        isLoading: true
                    })
                }
            })
        } else this.setState({
            needConnect: true,
        })
    }


    render() {
        return (
            <View
                style={styles.container
                }>
                <StatusBar barStyle='dark-content'/>
                <SafeAreaView>
                    <View style={styles.titleBox
                    }>
                        <Text style={styles.title}>
                            favorite</Text>
                        {
                            this.state.isConnected ?
                                <TouchableOpacity
                                    onPress={() => {
                                        this._getDataFirstTime()
                                    }
                                    }>
                                    <FontAwesome5
                                        name={'redo-alt'}
                                        color={'#666'}
                                        size={20}
                                    />
                                </TouchableOpacity>
                                :
                                <FontAwesome5
                                    name={'wifi'}
                                    color={'red'}
                                    size={20}
                                />
                        }
                    </View>
                </SafeAreaView>
                {
                    this.state.needConnect ?
                        <NoCon/>
                        :
                        this.state.isLoading ?
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                bounces={false}
                                data={this.state.places.concat({isAdd: true})}
                                numColumns={2}
                                keyExtractor={({key}, index) =>
                                    index.toString()
                                }
                                renderItem={({item, index}) =>
                                    (
                                        item.isAdd ?
                                            <AddToVavorite
                                                showMore={() => {
                                                    this.props.navigation.navigate('Search', {
                                                        images: this.state.images
                                                    });
                                                }
                                                }
                                            />
                                            :
                                            <FavoritePlaces
                                                sizeImg={60}
                                                imgSource={this.state.images[this.state.placesDetails[index].weather[0].icon]}
                                                code={this.state.placesDetails[index].weather[0].icon}
                                                text={this.state.placesDetails[index].weather[0].description}
                                                city={item.city}
                                                low={parseInt(this.state.placesDetails[index].main.temp_min)}
                                                high={parseInt(this.state.placesDetails[index].main.temp_max)}
                                                showMore={() => {
                                                    this.props.navigation.navigate('Week', {
                                                        city: item.city,
                                                        country: item.country,
                                                        longLat: this.state.longLat[index],
                                                        images: this.state.images,
                                                        icon: this.state.placesDetails[index].weather[0].icon
                                                    });
                                                }
                                                }
                                            />
                                    )
                                }
                            />
                            :
                            <ActivityIndicator size={'large'}/>
                }
            </View>
        );
    }
}
const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            backgroundColor: '#F5FCFF',

        },
        title: {
            fontSize: 20,
            color: '#666',
            fontWeight: '800'
        }, titleBox: {
            padding: 10,
            borderBottomColor: '#ecf0f1',
            borderBottomWidth: 1,
            marginBottom: 10,
            width: '90%',
            marginLeft: '5%',
            justifyContent: 'space-between',
            flexDirection: 'row'
        }
    });
