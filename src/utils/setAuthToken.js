import axios from 'axios';

const setAuthToken = token => {
  console.log("In setAuthToken")
  if (token) {
    console.log("Setting_token")
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    console.log("Deleting Token")
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
