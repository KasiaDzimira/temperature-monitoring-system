import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const SensorDropdown = ({ className, sensors, callback }) => {
    let items = [];

    for (var sensor in sensors) {
        items.push({ value: sensor, label: sensor })
    }

    if (items.length > 0) {
        return (
            <Select
                name={'sensor-form'}
                options={items}
                className={ className }
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