import PopUp from '@components/common/PopUp';
import axios from 'axios';
import toast from '../components/utils/Toast';

/**
 * @description Sends a Get request to api
 * @param {String} route
 * @example "/api/route"
 * @returns Promise<any>
 */

let Get = async (route, token, showAlert = true) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axios.get(route, options);
    return response;
  } catch (error) {
    let networkError = error.message === 'Network Error';
    if (showAlert == true) {
      if (networkError === true) {
        toast.show({
          title: 'Please Check Your Network Connection',
          message: error?.message,
          type: 'danger',
        });
      } else {
        toast.show({
          title: 'Oops!',
          message: error?.response?.data?.message,
          type: 'danger',
        });
      }
    }
  }
};

/**
 * @description Sends a post request to api
 * @param {String} route
 * @example "/api/route"
 * @param {Object} data
 * @example {foo:bar}
 * @returns Promise<any>
 */

let Post = async (route, data, headers, showAlert = true) => {
  try {
    return await axios.post(route, data, headers);
  } catch (error) {
    let networkError = error.message === 'Network Error';
    if (showAlert == true) {
      if (networkError === true) {
        toast.show({
          title: 'Please Check Your Network Connection',
          message: error?.message,
          type: 'danger',
        });
      } else {
        // console.log('ERRPR', error?.response.data.message?.error[0]);
        PopUp({
          heading: error?.response?.data?.message?.error[0],
          bottomOffset: 0.7,
          visibilityTime: 2000,
          position: 'top',
          textColor: 'white',
          bgColor: 'red',
        });
        // toast.show({
        //   title: 'Oops!',
        //   message: error?.response?.data?.message?.error[0],
        //   type: 'danger',
        // });
      }
    }
    return undefined;
  }
};

/**
 * @description Sends a post request to api
 * @param {String} route
 * @example "/api/route"
 * @param {Object} data
 * @example {foo:bar}
 * @returns Promise<any>
 */
let Patch = async (route, data, headers, showAlert = true) => {
  try {
    return await axios.patch(route, data, headers);
  } catch (error) {
    let networkError = error.message === 'Network Error';
    if (showAlert == true) {
      if (networkError === true) {
        toast.show({
          title: 'Please Check Your Network Connection',
          message: error?.message,
          type: 'danger',
        });
      } else {
        toast.show({
          title: 'Oops!',
          message: error?.response?.data?.message?.error[0],
          type: 'danger',
        });
      }
    }
  }
};

export {Post, Get, Patch};
