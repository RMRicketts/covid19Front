import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import Title from "./Title";

class CustomizedAxisTick extends React.PureComponent {
  render() {
    const { x, y, payload, rotate, oo, ox } = this.props;

    let val = payload.value;
    
    if (typeof val === "number" && val > 1000000) {
      val = Math.floor(val / 100000)/10 + "M";
    }

    if (typeof val === "number" && val > 1000) {
      val = Math.floor(val / 1000) + "K";
    }

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={oo}
          dx={ox}
          textAnchor="end"
          fill="#666"
          transform={`rotate(-${rotate})`}
        >
          {val}
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
            tick={<CustomizedAxisTick rotate={0} oo={16} ox={10} />}
          />
          <YAxis tick={<CustomizedAxisTick rotate={0} oo={0} ox={0} />} />
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
