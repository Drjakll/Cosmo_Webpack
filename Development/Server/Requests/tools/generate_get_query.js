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
        
        return sub_query.substring(0, sub_query.length - 4);
    };
    
    let query = `select ${get_types_of_data(data_to_get)} from ${table_name}`;
    
    if(Object.keys(requirements).length > 0){
        //Only add "where" clause if there is any requirement
        query += ` where`;
    }
    
    for(let i in requirements){
        
        let {key, value, type, conjunc} = requirements[i];
        
        switch(type){
            case "string":
                query += ` ${key} ${conjunc} '${conjunc === "like" ? `%${value}%` : value}' and`;
                break;
                
            case "number":
                query += ` ${key} ${conjunc} ${value} and`;
                break;
                
            case "range":
                query += ` ${key} ${conjunc} ${value} and`;
                break;
                
            case 'json':
                
                if(Object.keys(value).length === 0){
                    continue;
                }
                
                query += ` ${generate_json_search(key, value, conjunc)} and`;
                break;
            
        }
    }
    
    //If no requirement(s) is set, then don't subtract " and" at the end of the query
    query = Object.keys(requirements).length > 0 ? query.substring(0, query.length - 4) : query;

    return query;
    
};

export default generate_query;