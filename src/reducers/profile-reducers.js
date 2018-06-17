import moment from 'moment'
var dateFormat = require('dateformat');

function profileReducer(state = {}, action = {}) {
    switch (action.type) {
        case 'FIREBASE_DATA_RECEIVED':
            return {
                data: action.data
            };
        case 'FIREBASE_SENSORS_DATA_RECEIVED':
            return {
                sensors: action.sensors
            };
        case 'FIREBASE_USER_SENSORS_DATA_RECEIVED':
            if (!action.userSensors) {
                return { userSensors: 0 }
            }

            return {
                userSensors: action.userSensors
            };
        case 'CHART_SENSORS_DATA_RECEIVED':
            let items = [];

            Object.keys(action.sensors).map(key => {
                let sensorData = action.sensors[key];
                let preparedData = [];

                Object.keys(sensorData).map(key => {
                    let date = new Date(parseInt(key, 10));
                    preparedData.push({name: dateFormat(date, 'HH:MM'), temperature: sensorData[key].value});
                });

                items.push({sensorId: key, temperatures: preparedData});
            });

            return {
                sensors: items
            };
        default:
            return state;
    }
}

export default profileReducer;