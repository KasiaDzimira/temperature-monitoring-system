import React from 'react'

const config = require('./config/firebase.config');
const DataFetcher = require('./services/data-fetcher');

const dataFetcher = new DataFetcher(config);
const firebase = require('firebase');

firebase.initializeApp(config);

const auth = firebase.auth();

    export function init() {
        firebase.initializeApp(config);
    }

    export function setOnUpdateCallback(callback, ref) {
        firebase.database().ref(ref).on('value', (data) => {
            callback(data.val());
        });
    }

    export function pushData(ref, item) {
        const itemsRef = firebase.database().ref(ref);

        itemsRef.push(item);
    }

    export function fetchData(objectName) {
        const itemsRef = firebase.database().ref().child(objectName);

        itemsRef.on('value', snapshot => { dataFetcher.fetch(objectName, snapshot) } );
    }

    export function getFetcher(name) {
        return dataFetcher.getFetcherByName(name);
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
                window.location = '/profile';
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
