let request = function({sql}) {
    
    
    this.req_path = "/update_album";
    this.req_type = "patch";
    this.callbacks = ["update_album"];

    this.req = async (req, res) => { 
        
        let {id, album_info} = req.body;
        
        if(!id){
            res.json({message: "Invalid id or user id", failed: true});
            return;
        }
        
        let query = `update Photo_Albums set ? where id = ?`
        
        try {

            await sql.query(query, [album_info, id]);

            res.json({message: "Successfully updated Photo Album", failed: false});

        }catch(err){

            console.log(err);
            
            res.json({message: "Error updating Photo Album", failed: true});
        }
        
    };
};

export default request;

