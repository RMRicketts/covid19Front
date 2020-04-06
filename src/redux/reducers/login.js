export default (state = { accessToken: "" }, action) => {
  switch (action.type) {
    case "GETDATA":
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};
