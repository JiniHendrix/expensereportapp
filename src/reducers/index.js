import {TOGGLE_LOADING} from '../actions';

const initialState = {
  user: {
    username: 'jinihendrix'
  },
  filter: 'NONE',
  isLoading: false
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOADING:
      return Object.assign({}, state, {isLoading: !state.isLoading});

    default: return state;
  }
}

export default reducer;