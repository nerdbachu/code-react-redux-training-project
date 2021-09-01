import * as types from "../actions/actionTypes";
import initialState from "./initalState";

export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;

    case types.CREATE_AUTHOR_SUCCESS:
      return [...state, { ...action.author }];

    case types.UPDATE_AUTHOR_SUCCESS:
      return state.map((author) =>
        author.id === action.author.id ? action.author : author
      );

    default:
      return state;
  }
}
