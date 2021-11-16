export const initialState = {
  posts: {
    data: [
      {
        id: 1,
        title: 'New skateboard!',
        text: 'Lorem ipsum dolom mites',
        created: '2021-11-16',
        updated: '2021-11-16',
        email: 'johnDoe@example.com',
        status: 'published',
        image: 'https://images.pexels.com/photos/165236/pexels-photo-165236.jpeg?cs=srgb&dl=pexels-khoa-hu%E1%BB%B3nh-165236.jpg&fm=jpg',
        price: '250PLN',
        phone: '111333222',
        location: 'Poland',
      },
      {
        id: 2,
        title: 'Get this lamp!',
        text: 'Lorem ipsum dolom mites',
        created: '2021-11-14',
        updated: '2021-11-15',
        email: 'johnDoe@example.com',
        status: 'draft',
        image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?cs=srgb&dl=pexels-eneida-nieves-1112598.jpg&fm=jpg',
        price: '120PLN',
        phone: '111333555',
        location: 'Poland',
      }],
    loading: {
      active: false,
      error: false,
    },
    users: [
      {
        id: 1,
        name: 'admin',
        logged: false,
        email: 'admin@example.com',
      },
      {
        id: 2,
        name: 'user',
        logged: false,
        email: 'adamdoe@example.com',
      }],
  },
};
