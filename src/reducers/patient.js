import INIT_STATE from '../data/patient.json';
import { SET_FORM_DATE, SET_C_TAB_INDEX } from '../actions/patient';

const setFormData = (state, action) => {
  let c_tab_key = INIT_STATE.tabs[state.c_tab];
if(c_tab_key == 'shell'){
  state[c_tab_key].formData = action.data;
  state['shell1'].formData = action.data;
}else if(c_tab_key == 'addons') {
  state[c_tab_key].formData = action.data;
  state['addons1'].formData = action.data;
}else if(c_tab_key == 'covers') {
  state[c_tab_key].formData = action.data;
  state['covers1'].formData = action.data;
}else if(c_tab_key == 'rigidity') {
  state[c_tab_key].formData = action.data;
  state['rigidity1'].formData = action.data;
}else{
  state[c_tab_key].formData = action.data;
}
    return { ...state };
}

export default function patient(state = INIT_STATE, action) {
  switch (action.type) {
    case SET_FORM_DATE:
      return setFormData(state, action);
    case SET_C_TAB_INDEX:
      return { ...state, c_tab: action.index }
    default:
      return state;

  }
}