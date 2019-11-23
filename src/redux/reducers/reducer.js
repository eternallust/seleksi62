import * as types from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  searchResult: '',
  getBussinessData: '',
  detailData: '',
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${types.SEARCHDATA}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    case `${types.SEARCHDATA}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        getBussinessData: action.payload.data,
      };
    case `${types.SEARCHDATA}_REJECTED`:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    case `${types.BUSSINESSDATA}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    case `${types.BUSSINESSDATA}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        getBussinessData: action.payload.data,
      };
    case `${types.BUSSINESSDATA}_REJECTED`:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    case `${types.DETAILDATA}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    case `${types.DETAILDATA}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        detailData: action.payload.data,
      };
    case `${types.DETAILDATA}_REJECTED`:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
