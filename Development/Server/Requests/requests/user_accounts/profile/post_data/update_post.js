let request = function() {
    
    this.req = (req, res) => { 
        
        let {user_id, id, title, body} = req.body;
   
        post_details.last_edited = Date.now();
        
        let query = `update Post_Data set title = ?, body = ? where id = ? and user_id = ?`;

        let data = [title, body, id, user_id];
        
        this.sql.query(query, data, (err, result)=>{
            
            if(err){

                console.log(err.sqlMessage);
                res.json({message: "Error editing post"});

            } else if (result.affectedRows === 0){

                res.json({message: "No post found"});

            } else {

                res.json({message: "Post updated!"});
            }
            
        });

    };
};

export default request;
