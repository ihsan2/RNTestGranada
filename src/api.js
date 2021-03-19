import axios from 'axios';

const base_url = 'https://dummyapi.io/data/api/';
const app_id = '60546d528a2ec147432cef72';

// API DummyAPI.io
export const API = () => {
  let requestHeaders = {
    accept: 'application/json',
    'app-id': app_id,
  };

  const request = axios.create({
    baseURL: base_url,
    timeout: 5000,
    headers: requestHeaders,
  });

  return {
    request,
  };
};

// API Daerah Indonesia
export const APILocation = () => {
  let requestHeaders = {
    accept: 'application/json',
  };

  const request = axios.create({
    baseURL: 'https://dev.farizdotid.com/api/daerahindonesia/',
    timeout: 5000,
    headers: requestHeaders,
  });

  return {
    request,
  };
};

// API RajaOngkir
// export const APICode = () => {
//   let requestHeaders = {
//     accept: 'application/json',
//     key: '9b9d8d6fe969f19429e4d29b4291c985',
//   };

//   const request = axios.create({
//     baseURL: 'https://api.rajaongkir.com/starter/',
//     timeout: 5000,
//     headers: requestHeaders,
//   });

//   return {
//     request,
//   };
// };
