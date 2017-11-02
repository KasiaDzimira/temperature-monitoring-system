const SensorDataFetcher = require('./sensor-data-fetcher');

class DataFetcher {
    constructor(config) {
        this.config = config;
        this.fetchers = [];
        this.fetchers.push(new SensorDataFetcher());
    }

    fetch(sensor) {
        return this.fetchers.find(fetcher => fetcher.supports(sensor))
            .fetch(sensor);
    }
}

module.exports = DataFetcher;
