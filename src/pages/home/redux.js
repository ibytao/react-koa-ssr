import axios from 'axios'

export const REQUEST_HOME = 'REQUEST_HOME';
export const RECEIVE_HOME = 'RECEIVE_HOME';

  const INITIAL_STATE = {
    name: '',
    nativeName: '',
    flag: '',
    capital: '',
    region: '',
    population: '',
    languages: [],
    isFetching: false,
    lastUpdate: Date.now()
  }

  export const Home =(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case REQUEST_HOME: {
        return { ...state, isFetching: true }
      }
      case RECEIVE_HOME: {
        return { ...state, isFetching: false, ...action.payload }
      }
      default: return state
    }
  }

  export const fetchHome = () => async dispatch => {
    try {
      dispatch({ type: REQUEST_HOME });
      const res = await axios.get(`https://restcountries.eu/rest/v2/all`);
      dispatch({ type: RECEIVE_HOME, payload: res.data });
    } catch(e) {
      console.log(e);
      dispatch({ type: RECEIVE_HOME, payload: [] });
    }
  };