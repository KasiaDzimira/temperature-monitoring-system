function profileReducer(state = {}, action = {}) {
    switch (action.type) {
        case 'FIREBASE_USERS_DATA_RECEIVED':
            return {
                users: action.users
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
        default:
            return state;
    }
}

export default profileReducer;