import { GET_PAGES, PAGE_LOADING, GET_PAGE } from "../actions/types";

const initialState = {
  pages: [],
  page: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PAGE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PAGES:
      return {
        ...state,
        pages: action.payload,
        loading: false
      };
    case GET_PAGE:
      return {
        ...state,
        page: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
