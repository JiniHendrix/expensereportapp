import {
  TOGGLE_LOADING,
  SET_USER_INFO,
  SET_USER_DETAILS
} from '../actions';

const initialState = {
  userDetails: {
    username: 'jinihendrix'
  },
  filter: 'NONE',
  isLoading: false
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOADING:
      return Object.assign({}, state, {isLoading: !state.isLoading});

    case SET_USER_DETAILS:
      return Object.assign({}, state, {userDetails: action.userDetails});

    default: return state;
  }
}

export default reducer;