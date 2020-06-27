import { covidTracking } from "../../apis";
import Promise from "bluebird";
import moment from "moment";

export const getData = query => {
  return async (dispatch, getState) => {
    let responses;
    try {
      responses = await Promise.all([
        covidTracking.get("states/daily").then(res => {
          return res.data;
        }),
        covidTracking.get("us/daily").then(res => {
          return res.data;
        })
      ]);
    } catch (e) {
      console.log(e);
      return;
    }

    let mappedData = {};

    for (let set of responses) {
      for (let row of set) {
        if (row.state === undefined) {
          row.state = "USA";
        }
        let d = row.date.toString();
        row.dateObj = new Date(
          `${d.substr(0, 4)}-${d.substr(4, 2)}-${d.substr(6, 2)}`
        );
        row.date = moment.utc(row.dateObj).format("  M-D  ");
        delete row.hash;
        delete row.dateChecked;
        delete row.pending;
        delete row.states;
        delete row.dataQualityGrade;
        delete row.checkTimeEt;
        delete row.dateModified;
        delete row.fips;
        delete row.grade;
        delete row.commercialScore;
        delete row.score;
        delete row.total;
        delete row.negative;
        delete row.negativeIncrease;
        delete row.negativeScore;
        delete row.negativeTestsViral;
        delete row.posNeg;
        delete row.negativeRegularScore;
        delete row.lastUpdateEt;
        delete row.positiveScore;
        delete row.positiveCasesViral;
        delete row.positiveTestsViral;
        delete row.totalTestsViral;
        delete row.hospitalized;
        delete row.lastModified;
        //row.date = `${d.substr(4, 2)}-${d.substr(6, 2)}-${d.substr(0, 4)}`;
        if (mappedData[row.state] === undefined) {
          mappedData[row.state] = [];
        }
        row.active = row.positive - row.recovered - row.death;
        row.percentActive = Math.round((row.active / row.positive) * 1000) / 10;
        row.percentActiveInHospital =
          Math.round((row.hospitalizedCurrently / row.active) * 1000) / 10;
        row.percentTestingPos =
          Math.round((row.positive / row.totalTestResults) * 1000) / 10;
        row.percentTestingPosInc =
          Math.round(
            (row.positiveIncrease / row.totalTestResultsIncrease) * 1000
          ) / 10;
        row.percentOnVent =
          Math.round(
            (row.onVentilatorCurrently / row.hospitalizedCurrently) * 1000
          ) / 10;
        row.percentInIcu =
          Math.round((row.inIcuCurrently / row.hospitalizedCurrently) * 1000) /
          10;
        row.percentIcuOnVent =
          Math.round((row.onVentilatorCurrently / row.inIcuCurrently) * 1000) /
          10;
        row.percentIcuOnVent =
          row.percentIcuOnVent > 100 ? 0 : row.percentIcuOnVent;
        mappedData[row.state].push(row);
      }
    }

    for (let key of Object.keys(mappedData)) {
      mappedData[key].sort((prev, next) => {
        return prev.dateObj - next.dateObj;
      });
    }

    dispatch({
      type: "GETDATA",
      payload: {
        covidData: mappedData
        //rawData: responses.flat()
      }
    });

    dispatch(loadStates(Object.keys(mappedData)));
  };
};

export const loadStates = stateList => {
  return {
    type: "LOAD_STATES",
    payload: {
      states: stateList.sort()
    }
  };
};

export const updateState = name => {
  return {
    type: "UPDATE_STATE",
    payload: {
      state: name
    }
  };
};

export const updateLabel = name => {
  return {
    type: "UPDATE_LABEL",
    payload: {
      label: name
    }
  };
};
