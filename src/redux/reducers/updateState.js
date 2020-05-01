export default (state = { state: "" }, action) => {
  switch (action.type) {
    case "UPDATE_STATE":
      return Object.assign({}, state, action.payload);
    case "UPDATE_LABEL":
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};
