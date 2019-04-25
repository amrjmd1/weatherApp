const Master = {
    ApiLink: function (data, place) {
        return ('https://weather-ydn-yql.media.yahoo.com/v1/public/yql?q=select '
            + data + ' from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + place
            + '") and u="c"&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys');
    },
    weatherColors: {
        '11d': {
            fColor: 'rgb(72, 52, 212)',
            sColor: 'rgb(48, 51, 107)',
        },
        '09d': {
            fColor: 'rgba(52, 152, 219,1.0)',
            sColor: 'rgba(41, 128, 185,1.0)',
        },
        '10d': {
            fColor: 'rgba(52, 152, 219,1.0)',
            sColor: 'rgba(41, 128, 185,1.0)',
        },
        '13d': {
            fColor: 'rgba(52, 152, 219,1.0)',
            sColor: 'rgba(41, 128, 185,1.0)',
        },
        '50d': {
            fColor: 'rgba(241, 196, 15,1.0)',
            sColor: 'rgba(243, 156, 18,1.0)',
        },
        '01d': {
            fColor: 'rgb(48, 51, 107)',
            sColor: 'rgb(19, 15, 64)',
        },
        '01n': {
            fColor: '#686de0',
            sColor: '#4834d4'
        },
        '02d': {
            fColor: '#17c0eb',
            sColor: '#00a8ff',
        },
        '02n': {
            fColor: '#686de0',
            sColor: '#4834d4'
        },
        '04d': {
            fColor: '#34ace0',
            sColor: '#227093'
        },
        '04n': {
            fColor: '#95afc0',
            sColor: '#535c68'
        },
        '03d': {
            fColor: '#17c0eb',
            sColor: '#00a8ff',
        },
        '03n': {
            fColor: 'rgb(48, 51, 107)',
            sColor: 'rgb(19, 15, 64)'
        }

    }
    ,
    WetherState: [{
        //0
        text: 'tornado',
        fColor: 'rgb(255, 190, 118)',
        sColor: 'rgb(240, 147, 43)',
    }, {//1
        text: 'tropical storm',
        fColor: 'rgba(236, 240, 241,.8)',
        sColor: 'rgb(149, 165, 166)',
    }, {//2
        text: 'hurricane',
        fColor: 'rgba(236, 240, 241,.8)',
        sColor: 'rgb(149, 165, 166)',
    }, {//3
        text: 'thunderstorms',
        fColor: 'rgb(72, 52, 212)',
        sColor: 'rgb(48, 51, 107)',
    }, {//4
        text: 'thunderstorms',
        fColor: 'rgb(72, 52, 212)',
        sColor: 'rgb(48, 51, 107)',
    }, {//5
        text: 'rain and snow',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//6
        text: 'rain and sleet',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//7
        text: 'snow and sleet',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//8
        text: 'freezing drizzle',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//9
        text: 'drizzle',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//10
        text: 'freezing rain',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//11
        text: 'showers',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//12
        text: 'showers',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//13
        text: 'snow flurries',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//14
        text: 'snow showers',
        fColor: 'rgb(48, 51, 107)',
        sColor: 'rgb(19, 15, 64)',
    }, {//15
        text: 'blowing snow',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//16
        text: 'snow',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//17
        text: 'hail',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//18
        text: 'sleet',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//19
        text: 'dust',
        fColor: 'rgb(255, 190, 118)',
        sColor: 'rgb(240, 147, 43)',
    }, {//20
        text: 'foggy',
        fColor: 'rgb(255, 190, 118)',
        sColor: 'rgb(240, 147, 43)',
    }, {//21
        text: 'haze',
        fColor: 'rgba(241, 196, 15,1.0)',
        sColor: 'rgba(243, 156, 18,1.0)',
    }, {//22
        text: 'smoky',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//23
        text: 'blustery',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//24
        text: 'windy',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//25
        text: 'cold',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//26
        text: 'cloudy',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//27
        text: 'mostly cloudy',
        fColor: 'rgb(48, 51, 107)',
        sColor: 'rgb(19, 15, 64)',
    }, {//28
        text: 'mostly cloudy',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//29
        text: 'partly cloudy',
        fColor: 'rgb(48, 51, 107)',
        sColor: 'rgb(19, 15, 64)',
    }, {//30
        text: 'partly cloudy',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//31
        text: 'clear',
        fColor: 'rgb(48, 51, 107)',
        sColor: 'rgb(19, 15, 64)',
    }, {//32
        text: 'sunny',
        fColor: 'rgba(241, 196, 15,1.0)',
        sColor: 'rgba(243, 156, 18,1.0)',
    }, {//33
        text: 'fair',
        fColor: 'rgb(48, 51, 107)',
        sColor: 'rgb(19, 15, 64)',

    }, {//34
        text: 'Mostly Sunny',
        fColor: '#17c0eb',
        sColor: '#00a8ff',
    }, {//35
        text: 'rain and hail',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//36
        text: 'hot',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//37
        text: 'isolated thunderstorms',
        fColor: 'rgb(72, 52, 212)',
        sColor: 'rgb(48, 51, 107)',
    }, {//38
        text: 'scattered thunderstorms',
        fColor: 'rgb(72, 52, 212)',
        sColor: 'rgb(48, 51, 107)',
    }, {//39
        text: 'scattered thunderstorms',
        fColor: 'rgb(72, 52, 212)',
        sColor: 'rgb(48, 51, 107)',
    }, {//40
        text: 'scattered showers',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//41
        text: 'heavy snow',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//42
        text: 'scattered snow showers',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//43
        text: 'heavy snow',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//44
        text: 'partly cloudy',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//45
        text: 'thundershowers',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//46
        text: 'snow showers',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }, {//47
        text: 'isolated thundershowers',
        fColor: 'rgba(52, 152, 219,1.0)',
        sColor: 'rgba(41, 128, 185,1.0)',
    }

    ]
}


export default Master

//Master.ApiLink('item.forecast', 'Palstine, Gaza')
//    fColor: 'rgba(241, 196, 15,1.0)',
//    sColor: 'rgba(243, 156, 18,1.0)',
//    fColor: 'rgba(52, 152, 219,1.0)',
//    sColor: 'rgba(41, 128, 185,1.0)',
/*
Code	Description
0	tornado
1	tropical storm
2	hurricane
3	severe thunderstorms
4	thunderstorms
5	mixed rain and snow
6	mixed rain and sleet
7	mixed snow and sleet
8	freezing drizzle
9	drizzle
10	freezing rain
11	showers
12	showers
13	snow flurries
14	light snow showers
15	blowing snow
16	snow
17	hail
18	sleet
19	dust
20	foggy
21	haze
22	smoky
23	blustery
24	windy
25	cold
26	cloudy
27	mostly cloudy (night)
28	mostly cloudy (day)
29	partly cloudy (night)
30	partly cloudy (day)
31	clear (night)
32	sunny
33	fair (night)
34	fair (day)
35	mixed rain and hail
36	hot
37	isolated thunderstorms
38	scattered thunderstorms
39	scattered thunderstorms
40	scattered showers
41	heavy snow
42	scattered snow showers
43	heavy snow
44	partly cloudy
45	thundershowers
46	snow showers
47	isolated thundershowers
3200	not available
*/