let request = function() {
    
    
    this.req = (req, res) => { 
        
        let post_info = req.body;

        let {id} = post_info;
 
        
        let query = `select 
                pc.*,
                ua.first_name,
                ua.last_name,
                ua.profile_picture_link 
            from 
                Post_Comments as pc
            join
                User_Accounts as ua
            on
                pc.email = ua.email
            where 
                pc.belongs_to_post_id = ${id}`;
        
        this.sql.query(query, (err, result)=>{
           
            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "Error retrieving comments", post_comments: []});
            } else {
                res.json({message: `Successfully retrieved ${result.length} comments`, post_comments: result});
            }
            
            res.end();
            
        });
                
    };
};

export default request;

