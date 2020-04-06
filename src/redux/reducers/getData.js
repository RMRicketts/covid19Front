export default (state = { data: [] }, action) => {
  switch (action.type) {
    case "GETDATA":
      return action.payload;
    default:
      return state;
  }
};
