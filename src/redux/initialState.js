export const initialState = {
  posts: {
    data:[],
    loading: {
      active: false,
      error: false,
    },
    onePost: {},
  },
  users:
  //  [
  // {
  //   id: 1,
  //   name: 'admin',
  //   logged: true,
  //   email: 'admin@example.com',
  // },
  {
    id: 2,
    name: 'user',
    logged: false,
    email: 'johndoe@example.com',
  },
  // ],
};
