import {
  TOGGLE_LOADING,
  SET_USER_INFO,
  SET_USER_DETAILS,
  SET_SIGNEDUP_FLAG,
  UNSET_SIGNEDUP_FLAG,
  SET_LOGGED_IN,
  EDITING_EXPENSE,
  HANDLE_EXPENSE_FORM_CHANGE,
  SET_DEFAULT_EXPENSE_FORM_VALUES,
  SET_USERS_LIST,
  SET_DEFAULT_USER_FORM_VALUES,
  HANDLE_USER_FORM_CHANGE,
  EDITING_USER,
  ADMIN_SET_USER_EXPENSES,
  DONE_VIEWING_USER_EXPENSES,
  RESET_FILTERS,
  HANDLE_FILTER_CHANGE
} from '../actions';


const initialState = {
  userDetails: { username: '' },
  filters: {
    from: '',
    to: '',
    min: '',
    max: ''
  },
  isLoading: false,
  isLoggedIn: false,
  isEditing: false,
  expenseFormValues: {
    date: '',
    time: '',
    amount: 0,
    description: '',
    _id: ''
  },
  usersList: [],
  userFormValues: {
    username: '',
    password: '',
    userType: 'User',
    _id: ''
  },
  selectedUser: null
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
      return Object.assign({}, state, { expenseFormValues: action.expenseFormValues, isEditing: true });

    case SET_DEFAULT_EXPENSE_FORM_VALUES:
      return Object.assign({}, state, {
        isEditing: false,
        expenseFormValues: {
          date: '',
          time: '',
          amount: 0,
          description: '',
          _id: ''
        }
      });

    case HANDLE_EXPENSE_FORM_CHANGE:
      const expenseCopy = { expenseFormValues: { ...state.expenseFormValues } };
      expenseCopy.expenseFormValues[action.name] = action.value;
      return Object.assign({}, state, expenseCopy);

    case SET_DEFAULT_USER_FORM_VALUES:
      return Object.assign({}, state, {
        isEditing: false,
        userFormValues: {
          username: '',
          password: '',
          userType: 'User',
          _id: ''
        }
      });

    case EDITING_USER: {
      return Object.assign({}, state, {
        userFormValues: action.userFormValues,
        isEditing: true
      })
    }

    case HANDLE_USER_FORM_CHANGE:
      const userCopy = { userFormValues: { ...state.userFormValues } };
      userCopy.userFormValues[action.name] = action.value;
      return Object.assign({}, state, userCopy);

    case SET_USERS_LIST:
      return Object.assign({}, state, { usersList: action.usersList });

    case ADMIN_SET_USER_EXPENSES:
      return Object.assign({}, state, { selectedUser: action.selectedUser });

    case DONE_VIEWING_USER_EXPENSES:
      return Object.assign({}, state, { selectedUser: null });

    case RESET_FILTERS:
      return Object.assign({}, state, {
        filters: {
          from: '',
          to: '',
          min: '',
          max: ''
        }
      });

    case HANDLE_FILTER_CHANGE:
      const filtersCopy = {filters: {...state.filters}};
      filtersCopy.filters[action.field] = action.value;
      return Object.assign({}, state, filtersCopy);

    default: return state;
  }
}

export default reducer;