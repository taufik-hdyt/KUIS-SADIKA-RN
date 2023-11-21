import axios from "axios";

const postUserApi = axios.create({
  baseURL: "https://pqxqvp7z-5000.asse.devtunnels.ms/user",
});
const getUserApi = axios.create({
  baseURL: "https://pqxqvp7z-5000.asse.devtunnels.ms/checkEmail/",
});


// const avatarApi = axios.create({
//   baseURL: "https://pqxqvp7z-5000.asse.devtunnels.ms/avatars",
// });
const avatarApi = axios.create({
  baseURL: "https://pqxqvp7z-5000.asse.devtunnels.ms/avatars",
});

const questionsApi = axios.create({
  baseURL: "http://127.0.0.1/api/questions",
});

export { postUserApi, getUserApi, avatarApi, questionsApi };
