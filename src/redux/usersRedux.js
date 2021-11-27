/* selectors */
export const getAllUsers = ({ users }) => users;

/* action name creator */
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const SET_USER_STATUS = createActionName('SET_USER_STATUS');

/* action creators */
export const setUserStatus = payload => ({ payload, type: SET_USER_STATUS });

/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case SET_USER_STATUS: {
      return {
        ...statePart,
        logged: action.payload,
      };
    }
    default:
      return statePart;
  }
};
