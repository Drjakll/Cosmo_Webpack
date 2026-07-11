import Choice from './Choice/choice.js';
import Date from './Date/date.js';
import Json from './Json/json.js';
import Text from './Text/text.js';

export default {
    first_name: {component: Text},
    last_name: {component: Text},
    date_of_birth: {component: Date},
    gender: {component: Choice},
    marital_status: {component: Choice},
    User_Locations: {component: Json},
    User_Hobbies: {component: Json}, 
    User_Professions: {component: Json},
    User_Schools: {component: Json}
};