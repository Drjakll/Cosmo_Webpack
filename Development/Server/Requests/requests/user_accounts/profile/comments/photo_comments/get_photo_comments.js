let request = function() {
    
    
    this.req = (req, res) => { 
        
        let photo_info = req.body;

        let {id} = photo_info;
 
        
        let query = `select 
                        pc.*,
                        ua.first_name,
                        ua.last_name,
                        ua.profile_picture_link 
                    from 
                        Photo_Comments as pc
                    join
                        User_Accounts as ua
                    on
                        pc.email = ua.email
                    where 
                        pc.belongs_to_photo_id = ${id}`;
        
        this.sql.query(query, (err, result)=>{
           
            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "Error retrieving comments", photo_comments: []});
            } else {
                res.json({message: `Successfully retrieved ${result.length} comments`, photo_comments: result});
            }
            
            res.end();
            
        });
                
    };
};

export default request;

