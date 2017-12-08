export function receivedFirebaseUsersData(users) {
    return (dispatch) => {
        dispatch({
            type: 'FIREBASE_USERS_DATA_RECEIVED',
            users: users
        });
    };
}

export function receivedFirebaseSensorsData(sensors) {
    return (dispatch) => {
        dispatch({
            type: 'FIREBASE_SENSORS_DATA_RECEIVED',
            sensors: sensors
        });
    };
}

export function receivedChartSensorsData(sensors, startDate) {
    return (dispatch) => {
        dispatch({
            type: 'CHART_SENSORS_DATA_RECEIVED',
            sensors: sensors,
            startDate: startDate
        });
    };
}

export function receivedFirebaseUserSensorsData(userSensors) {
    return (dispatch) => {
        dispatch({
            type: 'FIREBASE_USER_SENSORS_DATA_RECEIVED',
            userSensors: userSensors.sensors
        })
    }
}