let generate_query = (table_name, requirements, data_to_get) => {
    
    let get_types_of_data = (types) => {
        
        if(types === '*' || types.length === 0){
            return types;
        }
        
        let sub_query = '';
        
        for(let type of types){
            sub_query += `${type},`;
        }
        
        sub_query = sub_query.substring(0, sub_query.length - 1);
        
        return sub_query;
    };
    
    let generate_json_search = (column_name, obj, conjunc = undefined) => {
        
        let sub_query = ``;
        
        for(let i in obj){

            switch(conjunc){
                case "json_contains_path":
                    sub_query += ` json_contains_path(${column_name}, 'one', '$."${i}"') and`
                    break;

                default:
                    sub_query += ` json_search(${column_name}, 'one', '%${obj[i]}%', null, '$[*]."${i}"') is not null and`;
                    break;
            }
        }   
        
        return sub_query.slice(0, -4);
    };
    
    let query = `select ${get_types_of_data(data_to_get)} from ${table_name}`;
    
    if(Object.keys(requirements).length > 0){
        //Only add "where" clause if there is any requirement
        query += ` where`;
    }

    let counter = 0;
    
    for(let i in requirements){
        
        let {key, value, type, conjunc, logical} = requirements[i];

        //Sometimes logical might not exists, so default is " and".
        query += `${counter > 0 && type !== "group_start" && type !== "group_end" ? (` ${logical}` || " and" ) : "" }`
        
        switch(type){
            case "string":
                query += ` ${key} ${conjunc} '${conjunc === "like" ? `%${value}%` : value}'`;
                break;
                
            case "number":
                query += ` ${key} ${conjunc} ${value}`;
                break;
                
            case "range":
                query += ` ${key} ${conjunc} ${value}`;
                break;
                
            case 'json':
                
                if(Object.keys(value).length === 0){
                    continue;
                }
                
                query += ` ${generate_json_search(key, value, conjunc)}`;
                break;

            case 'group_start':
                query += " (";
                break;

            case 'group_end':
                query += ") ";
                break;
            
        }

        if(type !== "group_start" && type !== "group_end"){
            counter++;
        }
    }

    return query;
    
};

export default generate_query;