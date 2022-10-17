import moment from 'moment';
import {Get} from '@axios/AxiosInterceptorFunction';
import {URL} from '@config/apiUrl';
import {getVehicles} from '@store/common/commonSlice';

export function stringTrim(value, index = 2) {
  if (value !== undefined) {
    const parts = value && value.split(',');
    const firstTwo = parts.slice(0, index);
    const result = firstTwo.join(',');
    return result;
  }
}

export function timeFormatSchedule(value) {
  let formatted = moment(value).calendar({
    sameDay: '[Today], hh:mm A',
    nextDay: '[Tomorrow], hh:mm A',
    nextWeek: 'Do MMM, hh:mm A',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'Do MMM, hh:mm A',
  });

  return formatted;
}

export const calculateDelta = points => {
  let minX, maxX, minY, maxY;
  (point => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  points.map(point => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = maxX - minX + 0.12;
  const deltaY = maxY - minY + 0.12;

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX,
    longitudeDelta: deltaY,
  };
};
export const initalViewMap = (lat, long, accuracy) => {
  console.log('object', lat, long, accuracy);
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
  const latDelta = accuracy / oneDegreeOfLatitudeInMeters;
  const longDelta =
    accuracy / (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

  return {
    latitude: lat,
    longitude: long,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    accuracy: accuracy,
  };
};

export const getTrucks = async props => {
  const {actionCall, authToken, user} = props;
  const getVehiclesApi = URL('services');
  const response = await Get(getVehiclesApi, authToken);
  let services = response?.data?.data;

  if (response?.data !== undefined) {
    await actionCall(getVehicles(services));
  }
};

export const getUserCards = async props => {
  const {actionCall, authToken, user} = props;
  const getCardsURL = URL('users/payment-methods');
  const response = await Get(getCardsURL, authToken);
  let cards = response?.data?.data;

  if (response?.data !== undefined) {
    await actionCall(getUserCards(cards));
  }
};

export default {
  stringTrim,
  timeFormatSchedule,
  calculateDelta,
};
