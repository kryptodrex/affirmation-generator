import api from './repository.js';
const resource = '/api/v1';

export default {
    getPhotos(search, size) {
        var response = api.get(`${resource}/photos?search=${search}&size=${size}`);
        console.log(response);
        return JSON.parse(response);
    },

    getPhotoById(id) {
        var response = api.get(`${resource}/photos/${id}?size=${size}`);
        console.log(response);
        return JSON.parse(response);
    }

};