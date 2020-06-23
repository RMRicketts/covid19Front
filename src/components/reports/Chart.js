import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import Title from "./Title";

class CustomizedLabel extends React.PureComponent {
  render() {
    const { x, y, stroke, value } = this.props;

    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {value}
      </text>
    );
  }
}

class CustomizedAxisTick extends React.PureComponent {
  render() {
    const { x, y, payload, rotate, oo } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={oo}
          dx={10}
          textAnchor="end"
          fill="#666"
          transform={`rotate(-${rotate})`}
        >
          {payload.value}
        </text>
      </g>
    );
  }
}

export default function Chart(props) {
  const colors = [
    "#845EC2",
    "#D65DB1",
    "#FF6F91",
    "#FF9671",
    "#FFC75F",
    "#F9F871"
  ];

  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <ResponsiveContainer>
        <LineChart
          data={props.data}
          margin={{
            top: 16,
            right: 10,
            bottom: 1,
            left: 0
          }}
        >
          <XAxis
            dataKey="date"
            height={60}
            tick={<CustomizedAxisTick rotate={18} oo={16} />}
          />
          <YAxis tick={<CustomizedAxisTick rotate={45} oo={0} />} />
          <Tooltip />
          {props.keys.map((key, i) => {
            return (
              <Line
                type="monotone"
                key={key}
                dataKey={key}
                stroke={colors[i % colors.length]}
                dot={false}
                //label={<CustomizedLabel />}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
