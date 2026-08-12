let request = function({sql}) {
    
    
    this.req_path = "/update_album";
    this.req_type = "patch";
    this.callbacks = ["central_auth","update_album"];

    this.req = async (req, res) => { 
        
        let {id, album_info} = req.body;

        const {user_id} = req.auth;
        
        if(!id || !user_id){
            res.status(400).json({message: "Invalid id or user id", failed: true});
            return;
        }
        
        let query = `update Photo_Albums set ? where id = ? and user_id = ?`
        
        try {

            await sql.query(query, [album_info, id, user_id]);

            res.status(200).json({message: "Successfully updated Photo Album", failed: false});

        }catch(err){

            console.log(err);
            
            res.status(500).json({message: "Error updating Photo Album", failed: true});
        }
        
    };
};

export default request;

