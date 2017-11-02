var fetch = require('node-fetch');

class SensorDataFetcher {
    fetch(sensor) {
        return fetch(sensor.id)
            .then((response) => response.text())
            .then((body) => this.transform(JSON.parse(body)));
    }

    supports(object) {
        return ('sensor' == object.modelName);
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