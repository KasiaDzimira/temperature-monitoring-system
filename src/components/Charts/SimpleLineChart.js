import React, { Component } from 'react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import PropTypes from 'prop-types'
import * as Server from '../../server'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProfileActions from '../../actions/profile-actions'
import { CylinderSpinLoader } from 'react-css-loaders'

class SimpleLineChart extends Component {
    componentDidMount() {
        Server.getUserSensorsData((newData) => {
            this.props.actions.receivedChartSensorsData(newData, this.props.date);
        }, this.props.userSensors);
    }

    renderCharts(sensorData) {
        let place = '';

        Object.keys(this.props.userSensors).map(key => {
            if (key === sensorData.sensorId) {
                place = this.props.userSensors[key].place
            }
        });

        return (
            <div className={'single-chart'}>
                <div className={'chart-place'}>{ place }</div>
                <LineChart width={600} height={300} data={sensorData.temperatures}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Line type="monotone" dataKey="temperature" stroke="#8884d8" dot={false}/>
                </LineChart>
            </div>
        )
    }

    render() {
        if (!this.props.sensors) {
            return <CylinderSpinLoader/>
        }

        return Object.keys(this.props.sensors).map(key => {
            return this.renderCharts(this.props.sensors[key]);
        });
    }
}

SimpleLineChart.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        sensors: state.profile.sensors
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ProfileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleLineChart);