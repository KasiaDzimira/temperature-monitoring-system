const init = {
    users: []
};

function profileReducer(state = init, action = {}) {
    switch (action.type) {
        case 'FIREBASE_DATA_RECEIVED':
            return {
                firebaseData: action.firebaseData
            };
        default:
            return state;
    }
}

export default profileReducer;