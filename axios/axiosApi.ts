import axios from "axios";

const postUserApi = axios.create({
  baseURL: "https://pqxqvp7z-5000.asse.devtunnels.ms/user",
});
const getUserApi = axios.create({
  baseURL: "https://pqxqvp7z-5000.asse.devtunnels.ms/checkEmail/",
});


// server backend
// https://pqxqvp7z-5000.asse.devtunnels.ms/avatars
const avatarApi = axios.create({
  baseURL: "https://api.npoint.io/4ab77a751b3b98fa0127",
});



// dummy data npint
// https://pqxqvp7z-5000.asse.devtunnels.ms/questions backend
const questionsApi = axios.create({
  baseURL: "https://api.npoint.io/942b0a161f9febd36309",
});

export { postUserApi, getUserApi, avatarApi, questionsApi };
