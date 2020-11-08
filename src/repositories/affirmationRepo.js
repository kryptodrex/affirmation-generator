import api from './repository.js';
const resource = '/api/v1';

export default {
    getAffirmation(token) {
        if (token != ""){
            return api.get(`${resource}/affirmation?reloadToken=${token}`)
        } else {
            return api.get(`${resource}/affirmation`);
        }
    }

};