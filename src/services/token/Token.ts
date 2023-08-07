import jwtDecode from "jwt-decode";

//local storage is not using anymore for authentication 
// const setAccessToken = (value) => {
//   localStorage.setItem("AccessToken", value);
// };

// const getAccessToken = () => {
//   return localStorage.getItem("AccessToken");
// };

// const removeAccessToken = () => {
//   console.log('removed access token');
//   // localStorage.removeItem("AccessToken");
// }

const getAuth = (token :string) => {

  try {
    const user = jwtDecode(token);
    // console.log("user :", user);
    return user;
  } catch (err) {
    return null;
  }
}

export default {
  getAuth
};
