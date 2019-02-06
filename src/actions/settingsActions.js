import {
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION
} from './types';

const handleStorage = setting => {
  // Get settings from localStorage
  const settings = JSON.parse(localStorage.getItem('settings'));

  //Toggle
  settings[setting] = !settings[setting];

  // Set back to local Storage

  localStorage.setItem('settings', JSON.stringify(settings));
  // Call function
  return settings[setting];
};

export const setDisableBalanceOnAdd = () => {
  return {
    type: DISABLE_BALANCE_ON_ADD,
    payload: handleStorage('disableBalanceOnAdd')
  };
};
export const setDisableBalanceOnEdit = () => {
  return {
    type: DISABLE_BALANCE_ON_EDIT,
    payload: handleStorage('disableBalanceOnEdit')
  };
};

export const setAllowRegistration = () => {
  return {
    type: ALLOW_REGISTRATION,
    payload: handleStorage('allowRegistration')
  };
};
