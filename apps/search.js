import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    ActivityIndicator, Modal, TouchableHighlight, AsyncStorage, StatusBar, NetInfo
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {NotFound} from "../components/notFound";
import {ShowCase} from "../components/showCase";
import Master from "../master";
import {NoCon} from "../components/noCon";
import Moment from "moment/moment";

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            dataSourc: [],
            notFound: false,
            getData: false,
            modalVisible: false,
            moreData: null,
            isFound: false,
            lodaing: false,
            isConnected: true,
            newLocation: null

        }


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

//city:search-results/city:item,city:search-results/city:item/city:country,city:search-results/city:item/city:urban_area/ua:identifying-city
    _goSearch(city) {
        if (city.trim()) {
            this.setState({
                dataSourc: [],
                notFound: false,
                getData: true
            });
            console.warn(city)
            fetch('https://api.internal.teleport.org/api/cities/?search=' + city + '&embed=city:search-results/city:item,city&limit=10&droplinks=true')
                .then((res) => res.json()).then((resJson) => {
                    let dataRes = resJson._embedded['city:search-results'],
                        cusData = [];
                    dataRes.map((c) => {
                        cusData.push({
                            'name': c['_embedded']['city:item'].full_name,
                            'latlon': c['_embedded']['city:item'].location.latlon
                        })
                    });


                    if (resJson.count > 0) {

                        this.setState({
                            dataSourc: cusData,
                            notFound: false, getData: false
                        });

                    }
                    else
                        this.setState({
                            dataSourc: [],
                            notFound: true, getData: false

                        })


                }
            ).catch((er) => {
                this.setState({
                    dataSourc: [],
                    notFound: true, getData: false

                })
            })
        }
    }

    _getData(lat, lon) {
        this.setState({lodaing: false});
        let Places = null;
        AsyncStorage.getItem('Places').then((value) => {
            if (value !== null) {
                Places = value;
            }
        });

        fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&cnt=10&appid=6dfc0d0d69d6d9813b2441bebefa0c70&units=metric').then((res) => res.json()).then((resJson) => {
            let location = JSON.stringify({city: resJson.name, country: resJson.sys.country});
            this.setState({
                moreData: resJson,
                lodaing: true,
                newLocation: location
            });
            if (Places) {
                let isFound = false;
                Places.split('_my_cuter').map((city) => {
                        if (city === location)
                            isFound = true
                    }
                );
                this.setState({isFound});
            }

        });


    }

    _favorite() {

        let location = this.state.newLocation;
        let Places = null;
        let newPlaces = [];
        let hasMore = false;
        AsyncStorage.getItem('Places').then((value) => {
            if (value !== null) {
                Places = value;

            } else {
                // console.warn('add first Time', Places);
                AsyncStorage.setItem('Places', location);
            }
        }).then(() => {
            if (Places) {
                if (this.state.isFound) {
                    hasMore = true;
                    Places.split('_my_cuter').map((city) => {
                            if (city.toString() !== location) {
                                newPlaces.push(city);
                            }
                        }
                    );
                } else {
                    //console.warn('not found and add it', Places);
                    AsyncStorage.setItem('Places', Places + '_my_cuter' + location);
                }
            }
            this.setState({isFound: !this.state.isFound})
        }).then(() => {
            if (newPlaces.length === 0 && hasMore) {
                console.warn('remove all');
                AsyncStorage.clear();
            } else if (hasMore) {
                AsyncStorage.setItem('Places', newPlaces.join('_my_cuter'));
            }
        });

    }

    _getDay() {
        let _day = new Date();
        _day = Moment(_day).format('dddd DD MMM Y');
        return _day.toString()
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='dark-content'/>
                <SafeAreaView>
                    <View style={styles.titleBox}>
                        <TextInput style={styles.title} autoCapitalize={'none'} placeholder={'city ...'}
                                   onChangeText={(text) => {
                                       this.setState({
                                           city: text,
                                           dataSourc: [],
                                           notFound: false,
                                           newLocation: null
                                       })
                                   }}
                                   returnKeyType={'search'}
                                   onSubmitEditing={(text) => {
                                       this.state.isConnected ? this._goSearch(text.nativeEvent.text) : null
                                   }}
                        />

                        {this.state.isConnected ?
                            <TouchableOpacity style={styles.btnSearch} onPress={() => {
                                this._goSearch(this.state.city)
                            }}>
                                <FontAwesome5 name="search" color="#fff"/>
                            </TouchableOpacity> :
                            <FontAwesome5 name={'wifi'} color={'red'} size={20}/>
                        }

                    </View>
                </SafeAreaView>

                {this.state.getData ? <ActivityIndicator color={'#123'} size={'large'}/> : null}
                {this.state.notFound ? <NotFound city={this.state.city}/> : null}
                {this.state.isConnected ?
                    this.state.dataSourc ?
                        <FlatList
                            style={{paddingVertical: 5}}
                            data={this.state.dataSourc}
                            keyExtractor={({id}, index) => index.toString()}
                            renderItem={({item}) =>
                                <TouchableOpacity
                                    style={[styles.boxSearch, styles.BSh]}
                                    onPress={() => {
                                        this._getData(item.latlon.latitude, item.latlon.longitude);
                                        this.setState({
                                            modalVisible: true
                                        })
                                    }}
                                >
                                    <Text style={styles.title}>{item.name}</Text>
                                </TouchableOpacity>
                            }
                        /> :
                        null


                    : <NoCon/>}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={{flex: 1}}>
                        <SafeAreaView/>
                        <View style={[styles.modal, styles.BSh]}>
                            <TouchableHighlight underlayColor={'rgba(45, 52, 54,.5)'}
                                                style={[styles.btn, styles.btnClose]}
                                                onPress={() => {
                                                    this.setState({modalVisible: false});
                                                }}>
                                <FontAwesome5 name={'angle-down'} color={'rgba(45, 52, 54,1.0)'} size={20}/>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor={'rgba(241, 196, 15,.5)'}
                                                style={[styles.btn, styles.btnFav]}
                                                onPress={() => {
                                                    this._favorite()
                                                }}>
                                {this.state.isFound ?
                                    <FontAwesome5 name={'star'} solid color={'rgba(241, 196, 15,1.0)'} size={20}/> :
                                    <FontAwesome5 name={'star'} light color={'rgba(241, 196, 15,1.0)'} size={20}/>
                                }
                            </TouchableHighlight>


                            <View style={{justifyContent: 'flex-start', width: '100%'}}>
                                {this.state.lodaing ?
                                    <View>
                                        <Text
                                            style={[styles.colorW]}>{this.state.moreData.name + ' - ' + this.state.moreData.sys.country}</Text>
                                        <Text
                                            style={[styles.colorW, {fontWeight: '700'}]}>{this._getDay()}</Text>
                                    </View>
                                    : null
                                }
                            </View>
                            {this.state.lodaing ?
                                <ShowCase
                                    src={this.props.navigation.state.params.images[this.state.moreData.weather[0].icon]}
                                    high={parseInt(this.state.moreData.main.temp_max)}
                                    low={parseInt(this.state.moreData.main.temp_min)}
                                    textCase={this.state.moreData.weather[0].description}
                                    sizeImg={160}
                                /> :
                                <ActivityIndicator size={'large'} color={'#fff'}/>
                            }
                            <View>
                                <SafeAreaView/>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#f5f5f5'
    }, title: {
        fontSize: 20,
        color: '#666',
        fontWeight: '800',
        flex: 9,
        paddingHorizontal: 5
    }, titleBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomColor: '#ecf0f1',
        borderBottomWidth: 1,
        marginBottom: 10,
        width: '90%',
        marginLeft: '5%'
    }, boxSearch: {
        width: '90%',
        marginHorizontal: '5%',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginBottom: 8
    }, btnSearch:
        {
            flex: 1,
            backgroundColor: '#ccc',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
        },
    btn: {
        width: 30, height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        position: 'absolute',
        borderWidth: .3,
    },
    btnFav: {
        backgroundColor: 'rgba(241, 196, 15,.2)',
        borderColor: 'rrgba(241, 196, 15,1)',
        right: 10,
        top: 50
    },
    btnClose: {
        backgroundColor: 'rgba(45, 52, 54,.2)',
        borderColor: 'rgba(45, 52, 54,1)',
        right: 10,
        top: 10
    }, BSh: {
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 2,
        shadowOpacity: .5,
        shadowColor: '#999',
    }, modal: {
        backgroundColor: '#999',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    }, colorW: {color: '#FFF'},
});