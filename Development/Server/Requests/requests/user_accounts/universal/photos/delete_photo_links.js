let request = function({sql}) {

    this.req_path = "/delete_photos";
    this.req_type = "post";
    this.callbacks = ["delete_photo_links",
        "delete_photo_files"
    ];
    
    this.req = async (req, res, next) => { 
        
        let { photos } = req.body;

        if(Object.keys(photos || {}).length === 0){
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
     
        let query = `delete from Photo_Links where id in (?)`;
        
        try {

            await sql.query(query, [ids]);
            
            //Should call delete_photo_files.js
            next();

        } catch(err){

            console.log(query, err);
        }

    };
};

export default request;

