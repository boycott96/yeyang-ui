import axios from "axios";

export function register(data) {
    return axios.post("/api/auth/register", data);
}

// 检查是否唯一
export function checkUnique(params) {
    return axios.get('/api/auth/check/unique', { params });
}

// 验证验证码
export function verify(data) {
    return axios.post('/api/auth/verify', data);
}

// 重新发送验证码
export function resend(params) {
    return axios.get('/api/auth/resend', { params });
}

// 登录
export function login(data) {
    return axios.post('/api/auth/login', data);
}

// 获取登录用户信息
export function getUserInfo() {
    return axios.get('/api/auth/user/info');
}

// 退出登录
export function logout() {
    return axios.delete('/api/auth/logout');
} 