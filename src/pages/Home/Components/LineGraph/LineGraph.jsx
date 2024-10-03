import React, { PureComponent } from 'react';
import {
 LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';


export default class LineGraph extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/synchronized-line-charts-37rhmf';

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ width: '100%' }}>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={500}
            height={200}
            data={this.props.data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: 'Poppins', fill: '#333' }}/>
            <YAxis className="y-axis-custom" tick={{ fontSize: 14, fontFamily: 'Poppins', fill: '#333' }}/>  
            <Tooltip />
            <Area type="monotone" dataKey="pv" stroke={this.props.strokeColor || "#AFF500"} fill={this.props.fillColor || "#DAFF7D"}  />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}


