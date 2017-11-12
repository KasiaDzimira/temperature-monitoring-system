const config = require('./config/firebase.config');
const DataFetcher = require('./services/data-fetcher');

const dataFetcher = new DataFetcher(config);
const firebase = require('firebase');

firebase.initializeApp(config);

    export function pushData(ref, item) {
        const itemsRef = firebase.database().ref(ref);

        itemsRef.child(item.id).set(item);
    }

    export function fetchData(objectName) {
        const itemsRef = firebase.database().ref().child(objectName);
        itemsRef.on('value', snapshot => { dataFetcher.fetch(objectName, snapshot) });
    }

    export function getFetcher(name) {
        return dataFetcher.getFetcherByName(name);
    }