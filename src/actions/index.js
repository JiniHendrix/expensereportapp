export const TOGGLE_LOADING = 'TOGGLE_LOADING';
export const SET_USER_DETAILS = 'SET_USER_DETAILS';




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