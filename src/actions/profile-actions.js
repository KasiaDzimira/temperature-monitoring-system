export function receivedFirebaseData(firebaseData) {
    return (dispatch) => {
        dispatch({
            type: 'FIREBASE_DATA_RECEIVED',
            firebaseData: firebaseData
        });
    };
}