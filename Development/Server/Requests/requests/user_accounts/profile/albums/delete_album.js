let request = function({sql}) {
    
    this.req_path = "/delete_album";
    this.req_type = "post";
    this.callbacks = [
        "central_auth",
        "delete_album",
        "delete_photo_files"
    ];
    
    this.req = async (req, res, next) => { 
        
        let {id} = req.body;
        const {user_id} = req.auth;
        
        if(!id){
            console.log("Album id is null or invalid");
            res.end();
            return;
        }

        let query = `select * from Photo_Links where album_id = ? and user_id = ?`
        
        try {

            let [photos] = await sql.query(query, [id, user_id]);

            query = `delete from Photo_Albums where id = ? and user_id = ?`;

            await sql.query(query, [id, user_id]);

            req.body.photos = photos;

            //delete_photo_files.js
            next();

        } catch(err){

            console.log(err, query);

            res.json({message: "Album failed to delete!"});

        }

        
                
    };
};

export default request;

