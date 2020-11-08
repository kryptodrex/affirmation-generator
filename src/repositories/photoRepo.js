import api from './repository.js';
const resource = '/api/v1';

export default {
    getPhotos(search, size) {
        return api.get(`${resource}/photos?search=${search}&size=${size}`);
    },

    getPhotoById(id, size) {
        return api.get(`${resource}/photos/${id}?size=${size}`);
    }

};