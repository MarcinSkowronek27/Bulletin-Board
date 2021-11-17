/* selectors */
export const getAllUsers = ({ users }) => users;

/* action name creator */
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const GET_USER_STATUS = createActionName('GET_USER_STATUS');

/* action creators */
export const getUserStatus = payload => ({ payload, type: GET_USER_STATUS });

/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case GET_USER_STATUS: {
      return {
        ...statePart,
        logged: action.payload,
      };
    }
    default:
      return statePart;
  }
};
