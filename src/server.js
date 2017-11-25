const config = require('./config/firebase.config');
const firebase = require('firebase');

firebase.initializeApp(config);

const auth = firebase.auth();

    export function setOnUpdateCallback(callback, ref) {
        firebase.database().ref(ref).on('value', (data) => {
            callback(data.val());
        });
    }

    export function getObjectById(callback, ref, objectId) {
        firebase.database().ref(ref).child(objectId).on('value', (data) => {
            callback(data.val().sensors);
        })
    }

    export function pushData(ref, item) {
        const itemsRef = firebase.database().ref(ref);

        itemsRef.push(item);
    }

    export function addSensorToUser(sensor, user) {
        const itemRef = firebase.database().ref('users');

        itemRef.child(user).child('sensors').child(sensor.value).set(true);
    }

    export function createUser(user) {
        const promise = auth.createUserWithEmailAndPassword(user.email, user.password);

        promise
            .catch(e => console.log(e.message))
            .then(pushUserData(user));
    }

    export function logIn(email, password) {
        const promise = auth.signInWithEmailAndPassword(email, password);

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
                            window.location = '/profile';
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
            email: user.email,
            password: user.password,
            role: user.userRole,
            sensors: user.sensors
        };

        pushData('users', data);
        console.log('User has been created');
    }
