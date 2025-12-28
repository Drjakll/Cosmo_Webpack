import Choice from './Choice/choice.js';
import Date from './Date/date.js';
import Json from './Json/json.js';
import Text from './Text/text.js';

export default {
    first_name: Text,
    last_name: Text,
    date_of_birth: Date,
    gender: Choice,
    marital_status: Choice,
    locations: Json,
    hobbies: Json, 
    professions: Json,
    schools: Json
};