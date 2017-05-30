export const TOGGLE_LOADING = 'TOGGLE_LOADING';
export const SET_USER_DETAILS = 'SET_USER_DETAILS';
export const SET_SIGNEDUP_FLAG = 'SET_SIGNEDUP_FLAG';
export const UNSET_SIGNEDUP_FLAG = 'UNSET_SIGNEDUP_FLAG';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const EDITING_EXPENSE = 'EDITING_EXPENSE';
export const HANDLE_CHANGE = 'HANDLE_CHANGE';
export const SET_DEFAULT_EXPENSE_FORM_VALUES = 'SET_DEFAULT_EXPENSE';
export const SET_USERS_LIST = 'SET_USERS_LIST';

export const toggleLoading = () => {
  return {
    type: TOGGLE_LOADING
  }
}

export const setUserDetails = (userDetails) => {
  return {
    type: SET_USER_DETAILS,
    userDetails
  }
}

export const setSignedUpFlag = () => {
  return {
    type: SET_SIGNEDUP_FLAG
  }
}

export const unsetSignedUpFlag = () => {
  return {
    type: UNSET_SIGNEDUP_FLAG
  }
}

export const setLoggedIn = () => {
  return {
    type: SET_LOGGED_IN
  }
}

export const editExpense = ({_id, amount, description, date, time}) => {
  return {
    type: EDITING_EXPENSE,
    expenseDetails: {
      _id,
      amount,
      description,
      date,
      time
    }
  }
}

export const finishEditingExpense = () => {
  return {
    type: FINISH_EDITING_EXPENSE
  }
}

export const setDefaultExpense = () => {
  return {
    type: SET_DEFAULT_EXPENSE_FORM_VALUES
  }
}

export const handleChange = (name, value) => {
  return {
    type: HANDLE_CHANGE,
    name,
    value
  }
}

export const setUsersList = (usersList) => {
  return {
    type: SET_USERS_LIST,
    usersList
  }
}