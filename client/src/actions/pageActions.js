import axios from "axios";

import { GET_PAGES, GET_PAGE, PAGE_LOADING } from "./types";

//Get all pages
export const getPages = () => dispatch => {
  dispatch(setPageLoading());
  axios
    .get("/")
    .then(res =>
      dispatch({
        type: GET_PAGES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PAGES,
        payload: null
      })
    );
};

export const getPage = slug => dispatch => {
  dispatch(setPageLoading());
  axios
    .get(`/${slug}`)
    .then(res =>
      dispatch({
        type: GET_PAGE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PAGE,
        payload: null
      })
    );
};

//set loading state
export const setPageLoading = () => {
  return {
    type: PAGE_LOADING
  };
};
