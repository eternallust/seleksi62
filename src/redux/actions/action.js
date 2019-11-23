import * as types from './../types';
import axios from 'axios';

export const getData = token => ({
  type: types.BUSSINESSDATA,
  payload: axios.get(
    'https://api.yelp.com/v3/businesses/search?location=new%20york&term=',
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  ),
});

export const searchData = (token, input) => ({
  type: types.SEARCHDATA,
  payload: axios.get(
    `https://api.yelp.com/v3/businesses/search?location=new%20york&term=${input}`,
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  ),
});

export const detailData = (token, businessId) => ({
  type: types.DETAILDATA,
  payload: axios.get(`https://api.yelp.com/v3/businesses/${businessId}`, {
    headers: {Authorization: `Bearer ${token}`},
  }),
});
