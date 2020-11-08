import AffirmationRepo from './affirmationRepo';
import PhotoRepo from './photoRepo';

const repositories = {
    'affirm': AffirmationRepo,
    'photo': PhotoRepo
}
export default {
    get: name => repositories[name]
};