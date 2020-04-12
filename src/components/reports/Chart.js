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
//import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";

/*const useStyles = makeStyles(theme => ({
  paperxl: {
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "82vh"
  }
}));*/

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
    const { x, y, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-18)"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}

export default function Chart(props) {
  //const classes = useStyles();
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
            right: 16,
            bottom: 0,
            left: 24
          }}
        >
          <XAxis dataKey="date" height={60} tick={<CustomizedAxisTick />} />
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: "middle" }}>
              Rise in Covid
            </Label>
          </YAxis>
          <Tooltip />
          {props.keys.map((key, i) => {
            return (
              <Line
                type="monotone"
                key={key}
                dataKey={key}
                stroke={colors[i % colors.length]}
                dot={false}
                label={<CustomizedLabel />}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
