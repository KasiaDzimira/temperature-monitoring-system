class SensorDataFetcher {
    fetch(object) {
        return this.transform(object);
    }

    supports(object) {
        return ('sensors' === object);
    }

    transform(response) {
        let data = {};

        data.id = response.id;
        data.name = response.name;
        data.type = response.type;
        data.userId = response.userId;
        data.maxValue = response.maxValue;

        return data;
    }
}

module.exports = SensorDataFetcher;