import axios from 'axios';

const BACKEND_URL = 'https://userinfo-5bc27-default-rtdb.firebaseio.com/';

export async function addUser(userData) {
  console.log('entered addUser function');
  const response = await axios.post(BACKEND_URL + '/users.json', userData);
  console.log('addUser response: ' + response);
  console.log('addUser response.data: ' + response.data.name);
  const id = response.data.name;
  console.log('addUser id: ' + id);
  return id;
}
