let generate_query = (table_name, data, requirements)=>{
    
    let query = `update ${table_name} set `;
    
    for(let key in data){

        query += `${key} = `;

        switch(typeof data[key]){
            case "string":
                query += `'${data[key].replace(/\\/g, "\\\\").replace(/\'/g, "\\'").replace(/\"/g, '\\"')}',`;
                break;
            case "number":
                query += `${data[key]},`;
                break;

        }

    }
    
    query = query.slice(0, -1) + " where ";
    
    for(let key in requirements){
        
        query += `${key} `;
        
        switch(typeof requirements[key]){
            case "string":
                query += `= '${requirements[key].replace(/\\/g, "\\\\").replace(/\'/g, "\\'").replace(/\"/g, '\\"')}'`;
                break;
            case "number":
                query += `= ${requirements[key]}`;
                break;
        }
        
        query += " and "
        
    }
    
    query = query.slice(0, -5);
    
    return query;
    
};

export default generate_query;


