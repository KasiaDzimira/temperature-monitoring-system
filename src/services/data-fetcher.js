const SensorDataFetcher = require('./sensor-data-fetcher');
const UserDataFetcher = require('./user-data-fetcher');

class DataFetcher {
    constructor(config) {
        this.config = config;
        this.fetchers = [];
        this.fetchers.push(new SensorDataFetcher());
        this.fetchers.push(new UserDataFetcher());
    }

    fetch(ref, object) {
        return this.fetchers.find(fetcher => fetcher.supports(ref))
            .fetch(object);
    }

    getFetcherByName(name) {
        return this.fetchers.find(fetcher => fetcher.supports(name));
    }
}

module.exports = DataFetcher;
