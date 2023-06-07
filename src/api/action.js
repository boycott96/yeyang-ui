import axios from "axios";

export function urlInfo(params) {
    return axios.get('/api/action/url/info', { params });
}
