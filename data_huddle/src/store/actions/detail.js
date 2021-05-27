import * as actionTypes from './actionTypes'
import axios from '../../axios'
import moment from 'moment';
export const data = (data) => {
    return{
        type: actionTypes.data,
        data:data
    };
};

export const getFiveDayDataFromAPI = async (combined_name,today_data_length) => {
    var error = false
    var data_array = []
    var five_day_data_array = []
    five_day_data_array.push(today_data_length)
    for (let i = 2; i <= 5 ; i++){
        var utc_time_1 = moment().subtract(i, 'days').unix() 
        var utc_time_2 = moment().subtract(i-1, 'days').unix() 
        error = false
        data_array = []
        var data = await axios.get('https://api.pushshift.io/reddit/comment/search/?q='+combined_name +'&after='+utc_time_1+'&before='+utc_time_2+'&size=1000')
        .catch(err => {
            console.log("error = " , err)
            error = true
        })
        if (error ==true){
            return ["error"]
        }
        console.log("res = " ,data['data']['data'])
        for (let i = 0 ; i < data['data']['data'].length ; i++){
            data_array.push(data['data']['data'][i])
        }
        while (data['data']['data'].length == 100){
            var get_time = data['data']['data'][data['data']['data'].length-1]['created_utc']
            data = await axios.get('https://api.pushshift.io/reddit/comment/search/?q='+combined_name +'&after=' + get_time + '&before='+utc_time_2+'&size=1000')
            .catch(err => {
                console.log("error = " , err)
                error = true
            })
            if (error ==true){
                return ["error"]
            }
            console.log("Total Records data = " , data['data']['data'].length)
            for (let i = 0 ; i < data['data']['data'].length ; i++){
                data_array.push(data['data']['data'][i])
            }

        }
        five_day_data_array.push(data_array.length)
    }
    return five_day_data_array
}

export const getDataFromAPI = async (combined_name,is_yesterday_data) => {
    console.log(is_yesterday_data)    
    var today_data_array = []
    var yesterday_data_array = []
    console.log(moment.utc().unix());
    console.log(moment().subtract(1, 'days').unix());
    var utc_time_today = moment().subtract(1, 'days').unix() 
    var error = false
    var today_data = await axios.get('https://api.pushshift.io/reddit/comment/search/?q='+combined_name +'&after='+utc_time_today+'&size=1000')
    .catch(err => {
        console.log("error = " , err)
        error = true
    })
    if (error ==true){
        return ["error"]
    }
    console.log("res = " ,today_data['data']['data'])

    for (let i = 0 ; i < today_data['data']['data'].length ; i++){
        today_data_array.push(today_data['data']['data'][i])
    }
    console.log("today_data_array = " , today_data_array)

    while (today_data['data']['data'].length == 100){
        var get_time = today_data['data']['data'][today_data['data']['data'].length-1]['created_utc']
        today_data = await axios.get('https://api.pushshift.io/reddit/comment/search/?q='+combined_name +'&after='+ get_time + '&size=1000')
        .catch(err => {
            console.log("error = " , err)
            error = true
        })
        if (error ==true){
            return ["error"]
        }       
        console.log("Total Records = " , today_data['data']['data'].length)
        for (let i = 0 ; i < today_data['data']['data'].length ; i++){
            today_data_array.push(today_data['data']['data'][i])
        }
    }

    console.log("today_data_array = " , today_data_array)
    if(is_yesterday_data){
        console.log("is yes")
        var utc_time_yesterday = moment().subtract(2, 'days').unix() 
        var yesterday_data = await axios.get('https://api.pushshift.io/reddit/comment/search/?q='+combined_name +'&after='+utc_time_yesterday+'&before='+utc_time_today+'&size=1000')
        .catch(err => {
            console.log("error = " , err)
            error = true
        })
        if (error ==true){
            return ["error"]
        }
        console.log("res = " ,yesterday_data['data']['data'])

        for (let i = 0 ; i < yesterday_data['data']['data'].length ; i++){
            yesterday_data_array.push(yesterday_data['data']['data'][i])
        }
        console.log("yesterday_data_array = " , yesterday_data_array)
        while (yesterday_data['data']['data'].length == 100){
            var get_time = yesterday_data['data']['data'][yesterday_data['data']['data'].length-1]['created_utc']
            yesterday_data = await axios.get('https://api.pushshift.io/reddit/comment/search/?q='+combined_name +'&after=' + get_time + '&before='+utc_time_today+'&size=1000')
            .catch(err => {
                console.log("error = " , err)
                error = true
            })
            if (error ==true){
                return ["error"]
            }
            console.log("Total Records yesterday_data = " , yesterday_data['data']['data'].length)
            for (let i = 0 ; i < yesterday_data['data']['data'].length ; i++){
                yesterday_data_array.push(yesterday_data['data']['data'][i])
            }

        }
        console.log("yesterday_data_array = " , yesterday_data_array)
        return [today_data_array,yesterday_data_array]
    }
    return today_data_array
}