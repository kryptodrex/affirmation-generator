import api from './repository.js';
const resource = '/api/v1';

export default {
    getAffirmation(token) {
        if (token != ""){
            return api.get(`${resource}/affirmation?reloadToken=${token}`)
        } else {
            return api.get(`${resource}/affirmation`);
        }
    },

    getEntity(text) {
        if (text != ""){
            return api.post(`${resource}/analyze-entities`, {
                "text": text
            })
        } else {
            return "Need text to process!";
        }
    }

};