export const TOGGLE_LOADING = 'TOGGLE_LOADING';
export const SET_USER_DETAILS = 'SET_USER_DETAILS';
export const SET_SIGNEDUP_FLAG = 'SET_SIGNEDUP_FLAG';
export const UNSET_SIGNEDUP_FLAG = 'UNSET_SIGNEDUP_FLAG';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const EDITING_EXPENSE = 'EDITING_EXPENSE';
export const HANDLE_EXPENSE_FORM_CHANGE = 'HANDLE_EXPENSE_FORM_CHANGE';
export const SET_DEFAULT_EXPENSE_FORM_VALUES = 'SET_DEFAULT_EXPENSE_FORM_VALUES';
export const SET_USERS_LIST = 'SET_USERS_LIST';
export const SET_DEFAULT_USER_FORM_VALUES = 'SET_DEFAULT_USER_FORM_VALUES';
export const HANDLE_USER_FORM_CHANGE = 'HANDLE_USER_FORM_CHANGE';
export const EDITING_USER = 'EDITING_USER';
export const ADMIN_SET_USER_EXPENSES = 'ADMIN_SET_USER_EXPENSES';
export const DONE_VIEWING_USER_EXPENSES = 'DONE_VIEWING_USER_EXPENSES';
export const APPLY_FILTERS = 'APPLY_FILTERS';
export const HANDLE_FILTER_CHANGE = 'HANDLE_FILTER_CHANGE';
export const RESET_FILTERS = 'RESET_FILTERS';
export const VIEW_WEEKLY = 'VIEW_WEEKLY';
export const VIEW_NORMAL = 'VIEW_NORMAL';

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
    expenseFormValues: {
      _id,
      amount,
      description,
      date,
      time
    }
  }
}

export const editingUser = ({_id, username, password, userType}) => {
  return {
    type: EDITING_USER,
    userFormValues: {
      _id,
      username,
      password,
      userType
    }
  }
}

export const setDefaultExpense = () => {
  return {
    type: SET_DEFAULT_EXPENSE_FORM_VALUES
  }
}

export const handleExpenseFormChange = (name, value) => {
  return {
    type: HANDLE_EXPENSE_FORM_CHANGE,
    name,
    value
  }
}

export const setDefaultUserFormValues = () => {
  return {
    type: SET_DEFAULT_USER_FORM_VALUES
  }
}

export const handleUserFormChange = (name, value) => {
  return {
    type: HANDLE_USER_FORM_CHANGE,
    name,
    value
  }
}

export const setUsersList = usersList => {
  return {
    type: SET_USERS_LIST,
    usersList
  }
}

export const adminSetUserExpenses = selectedUser => {
  return {
    type: ADMIN_SET_USER_EXPENSES,
    selectedUser
  }
}

export const doneViewingUser = () => {
  return {
    type: DONE_VIEWING_USER_EXPENSES
  }
}

export const resetFilters = () => {
  return {
    type: RESET_FILTERS
  }
}

export const handleFilterChange = (field, value) => {
  return {
    type: HANDLE_FILTER_CHANGE,
    field,
    value
  }
}

export const applyFilters = filters => {
  return {
    type: APPLY_FILTERS,
    filters
  }
}

export const viewWeekly = () => {
  return {
    type: VIEW_WEEKLY
  }
}

export const viewNormal = () => {
  return {
    type: VIEW_NORMAL
  }
}