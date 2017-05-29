import {
  TOGGLE_LOADING,
  SET_USER_INFO,
  SET_USER_DETAILS,
  SET_SIGNEDUP_FLAG,
  UNSET_SIGNEDUP_FLAG,
  SET_LOGGED_IN,
  EDITING_EXPENSE,
  HANDLE_CHANGE,
  SET_DEFAULT_EXPENSE
} from '../actions';


const initialState = {
  userDetails: { username: '' },
  filter: 'NONE',
  isLoading: false,
  isLoggedIn: false,
  isEditing: false,
  expenseDetails: {
    date: '',
    time: '',
    amount: 0,
    description: '',
    _id: ''
  }
}




const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOADING:
      return Object.assign({}, state, { isLoading: !state.isLoading });

    case SET_USER_DETAILS:
      return Object.assign({}, state, { userDetails: action.userDetails });

    case SET_SIGNEDUP_FLAG:
      return Object.assign({}, state, { signedUp: true });

    case UNSET_SIGNEDUP_FLAG:
      return Object.assign({}, state, { signedUp: false });

    case SET_LOGGED_IN:
      return Object.assign({}, state, { isLoggedIn: true });

    case EDITING_EXPENSE:
      return Object.assign({}, state, { expenseDetails: action.expenseDetails, isEditing: true });

    case SET_DEFAULT_EXPENSE:
      return Object.assign({}, state, {
        isEditing: false,
        expenseDetails: {
          date: '',
          time: '',
          amount: 0,
          description: '',
          _id: ''
        }
      });

    case HANDLE_CHANGE:
      const expenseCopy = { expenseDetails: { ...state.expenseDetails } };
      expenseCopy.expenseDetails[action.name] = action.value;
      return Object.assign({}, state, expenseCopy);

    default: return state;
  }
}

export default reducer;