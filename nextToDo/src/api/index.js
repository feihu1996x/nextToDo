import axios from 'axios';
import config from '../config';

const instance = axios.create();

instance.interceptors.request.use(
    config => {
        config.headers["Content-Type"] = "application/json";
        config.headers["Access-Token"] = localStorage.getItem("accessToken");
        return config
    }
);

export const GetHelp = () => {
    return instance.get(config.BASE_API_URL + '/')
};

export const SignUp = body => {
    return instance.post(config.BASE_API_URL + '/user', body)
};

export const SignIn = body => {
    return instance.put(config.BASE_API_URL + '/user', body)
};

export const GetTodo = () => {
    return instance.get(config.BASE_API_URL + '/todo')
};

export const PostTodo = (body) => {
    return instance.post(config.BASE_API_URL + '/todo', body)
};

export const DeleteTodo = (todoId) => {
    return instance.delete(config.BASE_API_URL + `/todo/${todoId}`)
};

export const PatchTodo = (todoId, body) => {
    return instance.patch(config.BASE_API_URL + `/todo/${todoId}`, body)
};