import * as actionTypes from './actionTypes'
import axios from '../../axios'
export const data = (data) => {
    return{
        type: actionTypes.data,
        data:data
    };
};

export const getDataFromAPI = async (combined_name,is_yesterday_data) => {
    console.log(is_yesterday_data)    
    var today_data_array = []
    var yesterday_data_array = []
    var today_data = await axios.get('https://api.pushshift.io/reddit/comment/search/?q='+combined_name +'&after=24h&size=1000')

    console.log(today_data)
    console.log(today_data['status'])
    while (today_data['status'] != 200){
        console.log("while today")
        today_data = await axios.get('https://api.pushshift.io/reddit/comment/search/?q='+combined_name +'&after=24h&size=1000')
        console.log(today_data['status'])
    }

    console.log("res = " ,today_data['data']['data'])
    for (let i = 0 ; i < today_data['data']['data'].length ; i++){
        today_data_array.push(today_data['data']['data'][i])
    }
    console.log("today_data_array = " , today_data_array)
    var current_Date = new Date()

    while (today_data['data']['data'].length == 100){
        var get_time = new Date((today_data['data']['data'][today_data['data']['data'].length-1]['created_utc'])*1000) 
        console.log(current_Date)
        console.log(get_time)
        var miliseconds = current_Date - get_time
        console.log("miliseconds = " , miliseconds)
        var hour = Math.floor((miliseconds / (1000 * 60 * 60)) % 24);
        console.log("hour = " , hour)
        today_data = await axios.get('https://api.pushshift.io/reddit/comment/search/?q='+combined_name +'&after='+ hour + 'h&size=1000')
        console.log(today_data['status'])
        while (today_data['status'] != 200){
            console.log("while today")
            today_data = await axios.get('https://api.pushshift.io/reddit/comment/search/?q='+combined_name +'&after='+ hour + 'h&size=1000')
            console.log(today_data['status'])
        }
        console.log("Total Records = " , today_data['data']['data'].length)
        for (let i = 0 ; i < today_data['data']['data'].length ; i++){
            today_data_array.push(today_data['data']['data'][i])
        }
    }

    console.log("today_data_array = " , today_data_array)
    if(is_yesterday_data){
        console.log("is yes")
        var yesterday_data = await axios.get('https://api.pushshift.io/reddit/comment/search/?q='+combined_name +'&after=48h&before=24h&size=1000')
        console.log(yesterday_data)
        console.log(yesterday_data['status'])
        while (yesterday_data['status'] != 200){
            console.log("while yesterday_data")
            yesterday_data = await axios.get('https://api.pushshift.io/reddit/comment/search/?q='+combined_name +'&after=48h&before=24h&size=1000')
            console.log(yesterday_data['status'])
        }
        console.log("res = " ,yesterday_data['data']['data'])

        for (let i = 0 ; i < yesterday_data['data']['data'].length ; i++){
            yesterday_data_array.push(yesterday_data['data']['data'][i])
        }
        console.log("yesterday_data_array = " , yesterday_data_array)
        var previous_Date = current_Date;
        previous_Date.setDate(previous_Date.getDate() - 2);
        console.log("previous_Date = " ,previous_Date)

        while (yesterday_data['data']['data'].length == 100){
            var get_time = new Date((yesterday_data['data']['data'][yesterday_data['data']['data'].length-1]['created_utc'])*1000) 
            var miliseconds = get_time - previous_Date
            console.log("miliseconds = " , miliseconds)
            var hour = Math.floor((miliseconds / (1000 * 60 * 60)) % 24);
            console.log("hour = " , hour)
            hour = parseInt(hour) + 1
            console.log("hour 1 = " , hour)
            hour =  48 - hour
            console.log("hour 2 = " , hour)
            yesterday_data = await axios.get('https://api.pushshift.io/reddit/comment/search/?q='+combined_name +'&after=' + hour + 'h&before=24h&size=1000')
            console.log(yesterday_data['status'])
            while (yesterday_data['status'] != 200){
                console.log("while yesterday_data")
                yesterday_data = await axios.get('https://api.pushshift.io/reddit/comment/search/?q='+combined_name +'&after=' + hour + 'h&before=24h&size=1000')
                console.log(yesterday_data['status'])
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