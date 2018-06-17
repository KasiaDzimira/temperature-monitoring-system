import moment from 'moment'
import axios from 'axios'

const config = require('./config/firebase.config');
const firebase = require('firebase');

firebase.initializeApp(config);

const auth = firebase.auth();

    export function setOnUpdateCallback(callback, ref) {
        firebase.database().ref(ref).on('value', (data) => {
            callback(data.val());
        });
    }
    
    export function getAllSensorsData() {
        firebase.database().ref('sensors').on('value', (data) => {
            var count = 0;

            Object.keys(data.val()).map(key => {
                count += Object.keys(data.val()[key]).length;
            });

            console.log(count, 'All');
        });
    }

    export function getObjectById(callback, ref, objectId) {
        firebase.database().ref(ref).child(objectId).on('value', (data) => {
            callback(data.val());
        });
    }

    export function getUserSensorsData(callback, sensorIds) {
        console.log('start');

        firebase.database().ref('sensors').on('value', data => {
            var values = [];

            Object.keys(sensorIds).map(key => {
                firebase.database().ref('sensors').child(key).orderByKey().startAt(moment('2017-12-09').startOf('day').valueOf().toString()).endAt(moment('2017-12-09').endOf('day').valueOf().toString()).on('value', data => {
                    values[key] = data.val()
                })
            });

            console.log(values);

            callback(values);
        })
    }

    export function pushData(ref, item) {
        const itemsRef = firebase.database().ref(ref);

        itemsRef.push(item);
    }

    export function addSensorToUser(sensorId, sensorData, user) {
        const itemRef = firebase.database().ref('users');

        itemRef.child(user).child('sensors').child(sensorId).set(sensorData);
    }

    export function removeUserSensor(sensorId, userId) {
        firebase.database().ref('users').child(userId).child('sensors').child(sensorId).remove();
    }

    export function remove(ref, objectId) {
        firebase.database().ref(ref).child(objectId).remove();
    }

    export function createUser(user) {
        const promise = auth.createUserWithEmailAndPassword(user.email.toLowerCase(), user.password);

        promise
            .catch(e => console.log(e.message))
            .then(pushUserData(user));
    }

    export function updateUser(userId, data) {
        firebase.database().ref('users').child(userId).update(data);
    }

    export function updateAlert(alertId, data) {
        firebase.database().ref('alerts').child(alertId).update(data);
    }

    export function logIn(email, password) {
        const promise = auth.signInWithEmailAndPassword(email.toLowerCase(), password);

        promise.catch(e => console.log(e.message));

        auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                window.localStorage.setItem('loggedUser', firebaseUser.email);

                const users = firebase.database().ref('users');

                users.orderByChild('email').equalTo(firebaseUser.email).once('value', (snapshot) => {
                    var user = snapshot.val();

                    Object.keys(user).map((key, value) => {
                        if (user[key].role === 'ROLE_ADMIN') {
                            window.location = '/admin-profile';
                        } else {
                            window.location = '/profile/' + key;
                        }
                    });
                });
            }

            console.log('Not logged in');
        })
    }

    export function logOut() {
        auth.signOut();

        window.location = '/';
    }

    function pushUserData(user) {
        let data = {
            email: user.email.toLowerCase(),
            phone: user.phone,
            password: user.password,
            role: user.userRole,
            sensors: user.sensors
        };

        pushData('users', data);
        console.log('User has been created');
    }
