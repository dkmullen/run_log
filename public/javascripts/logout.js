/*jshint esversion: 6 */

let logOut = () => {
  $.ajax({
    type: 'DELETE',
    url: '/users/me/token',
    headers: { 'x-auth': localStorage.getItem('token') },
    success: () => { localStorage.removeItem('token'); },
    error: (req, status, error) => {
      console.log(error);
    }
  });
  window.location.href = '/signin';
};
