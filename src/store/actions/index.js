import { createAction } from "redux-actions";
import axios from "axios";

const fetchNewsByPageApi = async page => {
  const res = await axios.get(`https://api.hnpwa.com/v0/news/${page}.json`);
  return { news: res.data, page };
};

const fetchFeedByIdApi = async id => {
  const res = await axios.get(`https://api.hnpwa.com/v0/item/${id}.json`);
  return res.data;
};

export const fetchNewsByPage = createAction("FETCH_NEWS", fetchNewsByPageApi);

export const fetchFeedById = createAction("FETCH_FEED", fetchFeedByIdApi);
