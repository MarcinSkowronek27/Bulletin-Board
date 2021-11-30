import Axios from 'axios';

/* selectors */
export const getAll = ({ posts }) => posts.data;
export const getOnePost = ({ posts }) => posts.onePost;

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const GET_ONE_POST = createActionName('GET_ONE_POST');
const ADD_POST = createActionName('ADD_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const fetchOnePost = payload => ({ payload, type: GET_ONE_POST });
export const addPost = payload => ({ payload, type: ADD_POST });

/* thunk creators */
export const fetchPublished = () => {

  return (dispatch, getState) => {
    const { posts } = getState();
    // console.log(getState());
    if (posts.data.length === 0 && posts.loading.active === false) {
      dispatch(fetchStarted());
      Axios
        .get('http://localhost:8000/api/posts')
        .then(res => {
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    }
  };
};

export const fetchPostById = (id) => {

  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then(res => {
        dispatch(fetchOnePost(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const addPostRequest = (post) => {

  const newPost = { ...post};

  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get('http://localhost:8000/api/posts/add', newPost)
      .then(res => {
        dispatch(addPost(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case GET_ONE_POST: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        onePost: action.payload,
      };
    }
    case ADD_POST: {
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
      };
    }
    default:
      return statePart;
  }
};
