import axios from "axios";

export function addFolder(data) {
    return axios.post('/api/bookmark/folder/add', data);
}

export function listFolder() {
    return axios.get('/api/bookmark/folder/list');
}

export function editFolder(data) {
    return axios.put('/api/bookmark/folder/update', data);
}

export function deleteFolder(id) {
    return axios.delete('/api/bookmark/folder/delete/' + id);
}

export function selectFolder(params) {
    return axios.get('/api/bookmark/select/folder', { params });
}