let request = function(sql, s3, PutObjectCommand) {

    this.req_path = "/delete_post";
    this.req_type = "post";
    this.callbacks = ["delete_post",
                        "delete_photo_files"
                    ];
    
    this.req = async (req, res, next) => { 
        
        //created_on parameter isn't needed here but will need it when deleting the feed
        let {id, user_id, created_on} = req.body;
        
        //Query to select all the photo links belong to the post before it gets automatically deleted
        let query = `select * from Photo_Links where post_id = ?`; 
        
        try {

            const [photos] = await this.sql.query(query, [id, user_id]);

            query = `delete from Post_Data where id = ? and user_id = ?`;

            await this.sql.query(query, [id]);

            req.body.photos = photos;

            //On to deleting the files with delete_photo_files.js
            next();

        } catch(err){

            console.log(err, query);
            res.json({message: "Error deleting post..."});
        }

    };
};

export default request;
