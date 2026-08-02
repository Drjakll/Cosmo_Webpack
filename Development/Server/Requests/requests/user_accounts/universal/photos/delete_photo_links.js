let request = function({sql}) {

    this.req_path = "/delete_photos";
    this.req_type = "post";
    this.callbacks = [
        "central_auth",
        "delete_photo_links",
        "delete_photo_files"
    ];
    
    this.req = async (req, res, next) => { 
        
        let { photos } = req.body;
        const {user_id} = req.auth;

        if(Object.keys(photos || {}).length === 0 || !user_id){
            res.json({message: "No photos to delete"});
            return;
        }

        let ids = [];

        for(let i in photos){

            let {id} = photos[i];

            ids.push(id);
        }
        
        if(photos.length === 0){
            res.json({message:"No photo data has been deleted"});
            return;
        }
     
        let query = `delete from Photo_Links where user_id = ? and id in (?)`;
        
        try {

            let [result] = await sql.query(query, [user_id, ids]);

            if(!result.affectedRows){

                return res.json({message: "Invalid credentials"});

            }
            
            //Should call delete_photo_files.js
            next();

        } catch(err){

            console.log(query, err);
        }

    };
};

export default request;

