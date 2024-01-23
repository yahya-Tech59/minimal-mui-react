// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'https://spiky-crater-dep2vxlep8.ploi.online',
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   },
// });

// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response) {
//       console.error('Response error:', error.response.status, error.response.data);
//     } else if (error.request) {
//       console.error('Request error:', error.request);
//     } else {
//       console.error('Error:', error.message);
//     }

//     return Promise.reject(error);
//   }
// );

// export default instance;
