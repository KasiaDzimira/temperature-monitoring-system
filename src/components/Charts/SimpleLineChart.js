import React, { PureComponent } from 'react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import PropTypes from 'prop-types'
import * as Server from '../../server'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProfileActions from '../../actions/profile-actions'
import { CylinderSpinLoader } from 'react-css-loaders'
import DatePicker from 'react-datepicker'
import moment from 'moment'

class SimpleLineChart extends PureComponent {
    constructor() {
        super();

        this.state = {
            startDate: moment()
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        Server.getUserSensorsData((newData) => {
            this.props.actions.receivedChartSensorsData(newData, this.state.startDate);
        }, this.props.userSensors);
    }

    handleChange(date) {
        this.setState({
            startDate: date,
        });
    }

    renderCharts(sensorData) {
        let place = '';

        Object.keys(this.props.userSensors).map(key => {
            if (key === sensorData.sensorId) {
                place = this.props.userSensors[key].place
            }
        });

        if (sensorData.temperatures.length > 0) {
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

        return (
            <div className={'single-chart'}>
                <div className={'chart-place'}>{ place }</div>
                <div className={'empty-data_chart'}>
                    You don't have any temperature data in this day
                </div>
            </div>
        )
    }

    render() {
        if (!this.props.sensors) {
            return <CylinderSpinLoader/>
        }

        return (
            <div>
                <div className={'date-picker'}>
                    <div className={'date-picker__info'}>
                        Select date:
                    </div>
                    <DatePicker
                        selected={this.state.startDate}
                        onSelect={this.handleChange}
                        dateFormat={'YYYY-MM-DD'}
                    />
                </div>
                {Object.keys(this.props.sensors).map(key => {
                    return this.renderCharts(this.props.sensors[key]);
                })}
            </div>
        );
    }
}

SimpleLineChart.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        sensors: state.profile.sensors,
        data: state.profile.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ProfileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleLineChart);