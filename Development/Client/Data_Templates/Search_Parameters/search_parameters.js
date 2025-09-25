import Choice from './Choice/choice.js';
import Date from './Date/date.js';
import Json from './Json/json.js';
import Text from './Text/text.js';

export default {
    first_name: Text,
    last_name: Text,
    date_of_birth: Date,
    location_of_birth: Json,
    gender: Choice,
    current_location: Json,
    marital_status: Choice,
    hobbies: Json, 
    professions: Json,
    schools: Json
};