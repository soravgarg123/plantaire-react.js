export const SET_FORM_DATE = "SET_FORM_DATE";
export const SET_C_TAB_INDEX = "SET_C_TAB_INDEX";


export function setformData(data) {
  return (dispatch, getState) => {
    dispatch({ type: SET_FORM_DATE, data });
  }
}
export function setTabIndex(index){
  return (dispatch, getState) => {
    dispatch({ type: SET_C_TAB_INDEX, index });
  }
}