import React, { BaseHTMLAttributes } from 'react';
import {Line} from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';

import CardDbService from '../../services/CardDbService';

const defaultDataset = {
    label: 'Balance History',
    fill: false,
    lineTension: 0.1,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'rgba(75,192,192,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: [65, 59, 80, 81, 56, 55, 40]
}

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: []
};

class BalanceHistoryChart extends React.Component{
    render() {
        const { balanceHistory } = this.props;
        const labels = balanceHistory.map( b => b.timestamp);
        const data = balanceHistory.map( b => b.balance);
        return (
        <div>
            <Typography gutterBottom variant="headline" component="h3">
                Balance history
            </Typography>
            <Line data={{labels, datasets: [ {...defaultDataset, data}]}} />
        </div>
        );
    }
}

export default BalanceHistoryChart;
