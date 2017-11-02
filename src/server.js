const config = require('./config/firebase.config');
const DataFetcher = require('./services/data-fetcher');

const dataFetcher = new DataFetcher(config);
const firebase = require('firebase');

firebase.initializeApp(config);

export default function pushData(ref, item) {
    const itemsRef = firebase.database().ref(ref);

    itemsRef.push(item);
}