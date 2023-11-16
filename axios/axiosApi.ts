import axios from "axios";

const UserApi = axios.create({
  baseURL: "http://127.0.0.1/api/something",
});

const avatarApi = axios.create({
  baseURL: "http://192.168.18.87:3000/avatars",
});

const questionsApi = axios.create({
  baseURL: "http://127.0.0.1/api/questions",
});

export { UserApi, avatarApi, questionsApi };
