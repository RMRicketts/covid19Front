export default (state = { states: [] }, action) => {
  switch (action.type) {
    case "LOAD_STATES":
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};
