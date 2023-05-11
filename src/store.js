import { createStore } from "redux";

const initialState = {
  counter: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCHDATA":
      return { ...state, counter: action.payload };
    default:
      return state;
  }
}

export const store = createStore(reducer);
