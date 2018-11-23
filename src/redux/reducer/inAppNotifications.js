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

const initialState = {
  errors: {},
  message: '',
  notifications: [],
  newMessageFromSocket: false
};
const notificationReducer = (state = initialState, action) => {
  // const {}
  switch (action.type) {
    case FETCH_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload.response
      };
    case UPDATE_NOTIFICATION_BEGINS:
      return {
        ...state,
        loading: true
      };
    case FETCH_NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        ...action.payload.response
      };
    case UPDATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload.response,
        newMessageFromSocket: false
      };
    case UPDATE_NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.payload.message
      };
    case REALTIME_NOTIFICATION_BEGINS:
      return {
        ...state,
        newMessageFromSocket: true
      };
    case REALTIME_NOTIFICATION_SUCCESS:
      return {
        ...state,
        newMessageFromSocket: true
      };
    default:
      return state;
  }
};
export default notificationReducer;
