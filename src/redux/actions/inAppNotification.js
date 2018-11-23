import socketIOClient from 'socket.io-client';
import {
  FETCH_NOTIFICATION_REQUEST,
  FETCH_NOTIFICATION_SUCCESS,
  FETCH_NOTIFICATION_FAILURE,
  UPDATE_NOTIFICATION_BEGINS,
  UPDATE_NOTIFICATION_FAILURE,
  UPDATE_NOTIFICATION_SUCCESS,
  REALTIME_NOTIFICATION_BEGINS,
  REALTIME_NOTIFICATION_SUCCESS
} from '../constants/notifications';

import apiRequest from '../../services/apiRequest';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

export const getNotification = () => (dispatch) => {
  dispatch({
    type: FETCH_NOTIFICATION_REQUEST,
    loading: true
  });
  return apiRequest
    .getNotification()
    .then((res) => {
      dispatch({
        type: FETCH_NOTIFICATION_SUCCESS,
        payload: {
          response: res.data,
          loading: false
        }
      });
    })
    .catch((err) => {
      dispatch({
        type: FETCH_NOTIFICATION_FAILURE,
        payload: {
          response: err,
          loading: false
        }
      });
    });
};
export const updateNotification = notificationId => (dispatch) => {
  dispatch({
    type: UPDATE_NOTIFICATION_BEGINS,
    loading: true
  });

  return apiRequest
    .updateNotification(notificationId)
    .then((res) => {
      dispatch({
        type: UPDATE_NOTIFICATION_SUCCESS,
        payload: {
          response: res,
          loading: false
        }
      });
      return res;
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_NOTIFICATION_FAILURE,
        payload: {
          response: err,
          loading: false
        }
      });
      return err;
    });
};

export const listenForNotification = userId => (dispatch) => {
  dispatch({
    type: REALTIME_NOTIFICATION_BEGINS
  });
  const socket = socketIOClient(ENDPOINT);
  socket.on(`notification-${userId}`, data => dispatch({
    type: REALTIME_NOTIFICATION_SUCCESS,
    data
  }));
};
