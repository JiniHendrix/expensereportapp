export const TOGGLE_LOADING = 'TOGGLE_LOADING';
export const SET_USER_DETAILS = 'SET_USER_DETAILS';
export const SET_SIGNEDUP_FLAG = 'SET_SIGNEDUP_FLAG';
export const UNSET_SIGNEDUP_FLAG = 'UNSET_SIGNEDUP_FLAG';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const EDITING_EXPENSE = 'EDITING_EXPENSE';
export const FINISH_EDITING_EXPENSE = 'FINISH_EDITING_EXPENSE';
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

export const editExpense = ({_id, amount, description, dateTime}) {
  return {
    type: EDITING_EXPENSE,
    editExpenseDetails: {
      _id,
      amount,
      description,
      dateTime
    }
  }
}

export const finishEditingExpense = () => {
  return {
    type: FINISH_EDITING_EXPENSE
  }
}