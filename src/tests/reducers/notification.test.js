import {
  FETCH_NOTIFICATION_REQUEST,
  FETCH_NOTIFICATION_SUCCESS,
  FETCH_NOTIFICATION_FAILURE,
  UPDATE_NOTIFICATION_BEGINS,
  UPDATE_NOTIFICATION_FAILURE,
  UPDATE_NOTIFICATION_SUCCESS,
  REALTIME_NOTIFICATION_BEGINS,
  REALTIME_NOTIFICATION_SUCCESS
} from '../../redux/constants/notifications';
import notificationReducer from '../../redux/reducer/inAppNotifications';

describe('notificationReducer', () => {
  const initialState = {
    errors: {},
    message: '',
    notifications: [],
    newMessageFromSocket: false,

  };
  it('should return the initial state', () => {
    expect(notificationReducer(undefined, {})).toEqual(initialState);
  });
  it('should handles FETCH_NOTIFICATION_REQUEST', () => {
    const action = {
      type: FETCH_NOTIFICATION_REQUEST,
    };
    expect(notificationReducer(initialState, action)).toEqual({
      errors: {},
      message: '',
      loading: true,
      notifications: [],
      newMessageFromSocket: false,

    });
  });
  it('should handles FETCH_NOTIFICATION_SUCCESS', () => {
    const action = {
      type: FETCH_NOTIFICATION_SUCCESS,
      payload: {
        response: ''
      }
    };
    expect(notificationReducer(initialState, action)).toEqual({
      errors: {},
      message: '',
      loading: false,
      notifications: [],
      newMessageFromSocket: false,

    });
  });
  it('should handles FETCH_NOTIFICATION_FAILURE', () => {
    const action = {
      type: FETCH_NOTIFICATION_FAILURE,
      payload: {
        response: ''
      }
    };
    expect(notificationReducer(initialState, action)).toEqual({
      errors: {},
      message: '',
      loading: false,
      notifications: [],
      newMessageFromSocket: false,

    });
  });
  it('should handles PDATE_NOTIFICATION_BEGINS', () => {
    const action = {
      type: UPDATE_NOTIFICATION_BEGINS,
    };
    expect(notificationReducer(initialState, action)).toEqual({
      errors: {},
      message: '',
      loading: true,
      newMessageFromSocket: false,
      notifications: []
    });
  });
  it('should handles UPDATE_NOTIFICATION_SUCCESS', () => {
    const action = {
      type: UPDATE_NOTIFICATION_SUCCESS,
      payload: {
        response: ''
      }
    };
    expect(notificationReducer(initialState, action)).toEqual({
      errors: {},
      message: '',
      loading: false,
      newMessageFromSocket: false,
      notifications: []
    });
  });
  it('should handles UPDATE_NOTIFICATION_FAILURE,', () => {
    const action = {
      type: UPDATE_NOTIFICATION_FAILURE,
      payload: {
        response: ''
      }
    };
    expect(notificationReducer(initialState, action)).toEqual({
      errors: {},
      loading: false,
      newMessageFromSocket: false,
      notifications: [],
      message: undefined
    });
  });
  it('should handles REALTIME_NOTIFICATION_BEGINS', () => {
    const action = {
      type: REALTIME_NOTIFICATION_BEGINS,
      payload: {
        response: ''
      }
    };
    expect(notificationReducer(initialState, action)).toEqual({
      errors: {},
      newMessageFromSocket: true,
      notifications: [],
      message: ''
    });
  });
  it('should handles REALTIME_NOTIFICATION_SUCCESS', () => {
    const action = {
      type: REALTIME_NOTIFICATION_SUCCESS,
      payload: {
        response: ''
      }
    };
    expect(notificationReducer(initialState, action)).toEqual({
      errors: {},
      newMessageFromSocket: true,
      notifications: [],
      message: ''
    });
  });
});
