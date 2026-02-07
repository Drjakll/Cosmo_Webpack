let request = function() {
    
    
    this.req = async (req, res) => { 
        
        let {id, user_id, album_info} = req.body;
        
        if(!id || !user_id){
            res.json({message: "Invalid id or user id", failed: true});
            return;
        }
        
        let query = `update Photo_Albums set ? where user_id = ? and id = ?`
        
        try {

            await this.sql.query(query, [album_info, user_id, id]);

            res.json({message: "Successfully updated Photo Album", failed: false});

        }catch(err){

            console.log(err);
            
            res.json({message: "Error updating Photo Album", failed: true});
        }
        
    };
};

export default request;

