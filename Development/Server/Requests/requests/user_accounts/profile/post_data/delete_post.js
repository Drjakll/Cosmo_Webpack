let request = function({sql}) {

    this.req_path = "/delete_post";
    this.req_type = "post";
    this.callbacks = [
                        "central_auth",
                        "delete_post",
                        "delete_photo_files"
                    ];
    
    this.req = async (req, res, next) => { 
        
        let {id} = req.body;

        id = parseInt(id, 10);

        if(isNaN(id) || id <= 0){
            res.status(400).json({message: "Post id is invalid"});
            return;
        }

        const {user_id} = req.auth;

        let con = await sql.get_connection();
        
        try {

            await con.beginTransaction();

            let query = `select id from Post_Data where id = ? and user_id = ? for update`; 

            const [result] = await con.query(query, [id, user_id]);

            if(result.length === 0){
                await con.rollback();

                res.status(404).json({message: "Post not found or you are not the owner of this post"});
                return;
            }


            query = `select * from Photo_Links where post_id = ?`;

            const [photos] = await con.query(query, [id]);



            query = `delete from Post_Data where id = ? and user_id = ?`;

            await con.query(query, [id, user_id]);

            req.body.photos = photos;

            await con.commit();

            //On to deleting the files with delete_photo_files.js
            next();

        } catch(err){

            await con.rollback();

            console.log(err, query);
            res.status(500).json({message: "Error deleting post..."});

        } finally {

            con.release();

        }

    };
};

export default request;
