import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const SensorDropdown = ({ sensors, selectedValue, callback }) => {
    let items = [];

    for (var sensor in sensors) {
        items.push({ value: sensor, label: sensor })
    }

    if (items.length > 0) {
        return (
            <Select
                name={'sensor-form'}
                options={items}
                value={ selectedValue }
                className={ 'sensor-select' }
                placeholder={'Select sensor'}
                onChange={(e) => callback(e)}
            />
        )
    } else {
        return null;
    }
};

SensorDropdown.propTypes = {
    sensors: PropTypes.objectOf(PropTypes.object.isRequired),
    callback: PropTypes.func.isRequired
};

export default SensorDropdown