let generate_query = (table_name, requirements, data_to_get) => {
    
    let get_types_of_data = (types) => {
        
        if(types === '*'){
            return types;
        }
        
        let sub_query = '';
        
        for(let type of types){
            sub_query += `${type},`;
        }
        
        sub_query = sub_query.substr(0, -1);
        
        return sub_query;
    };
    
    let generate_json_search = (column_name, obj) => {
        
        let sub_query = ``;
        
        for(let i in obj){
            sub_query += ` json_search(${column_name}, 'all', '%${obj[i]}%, null, '$[*]."${i}"') and`;
        }   
        
        return sub_query.substr(0,-4);
    };
    
    let query = `select ${get_types_of_data(data_to_get)} from ${table_name}`;
    
    if(requirements.length > 0){
        //Only add "where" clause if there is any requirement
        query += ` where `;
    }
    
    for(let req of requirements){
        
        let key = req.key;
        let type = req.type;
        let value = req.value;
        let conjuc = req.conjunc;
        
        switch(type){
            case "string":
                query += `${key} ${conjuc} '${value} and`;
                break;
                
            case "number":
                query += `${key} ${conjuc} ${value} and`;
                break;
                
            case "range":
                query += `${key} ${conjuc} ${value} and`;
                break;
                
            case 'json':
                
                if(Object.keys(value).length === 0){
                    continue;
                }
                
                query += `${generate_json_search(key, value)} and`;
                break;
            
        }
    }
    
    //If no requirement(s) is set, then don't subtract " and" at the end of the query
    query = requirements.length > 0 ? query.substr(0, -4) : query;
    
    return query;
    
};

export default generate_query;