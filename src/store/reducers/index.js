import { handleActions } from "redux-actions";

const initialState = {
  news: [],
  page: 1,
  nextPage: 2,
  prevPage: 1,
  currentFeed: {},
  isLoading: null,
  error: null
};

const newsReducer = handleActions(
  {
    FETCH_NEWS: (state, { isLoading, payload, error }) => {
      if (isLoading || error) {
        return {
          ...state,
          isLoading,
          error
        };
      }
      return {
        ...state,
        news: payload.news,
        page: payload.page,
        nextPage: payload.page + 1,
        prevPage: payload.page > 1 ? payload.page - 1 : 1,
        isLoading,
        error
      };
    },
    FETCH_FEED: (state, { isLoading, payload, error }) => {
      if (isLoading || error) {
        return {
          ...state,
          isLoading,
          error
        };
      }
      return {
        ...state,
        isLoading,
        currentFeed: payload,
        error
      };
    }
  },
  initialState
);

export default (state, action) => newsReducer(state, action);
