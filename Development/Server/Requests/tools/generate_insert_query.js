let generate_query = (table_name, data)=>{

    let query = `insert into ${table_name} (`;
    
    for(let i in data){
        
        if(data[i] === null){
            continue;
        }
        
        query += `${i},`;
        
    }
    
    query = query.slice(0, -1) + ") values(";
    
    for(let i in data){
        
        if(data[i] === null){
            continue;
        }
        
        switch(typeof data[i]){
            case "string":
                query += `'${data[i].replace(/\\/g, "\\\\").replace(/\'/g, "\\'").replace(/\"/g, '\\"')}',`;
                break;
            case "number":
                query += `${data[i]},`;
                break;
            case 'object':
                query += `'${JSON.stringify(data[i]).replace(/\\/g, "\\\\").replace(/\'/g, "\\'")}',`
                break;
        }
    }
    
    query = query.slice(0, -1) + ")";
    
    return query;
    
};

export default generate_query;

