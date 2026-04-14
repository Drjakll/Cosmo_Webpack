let request = function() {
    
    this.req = async (req, res, next) => { 
        
        //created_on parameter isn't needed here but will need it when deleting the feed
        let {id, user_id, created_on} = req.body;
        
        let query = `delete from Post_Data where id = ? and user_id = ?`;
        
        try {

            await this.sql.query(query, [id, user_id]);

            //Query to select all the photo links belong to the post
            query = `select * from Photo_Links where target_id = ? and target_type = ?`;

            const [rows] = await this.sql.query(query, [id, "post"]);

            req.body.photos = rows;

            //These are parameters for deleting the feed
            req.body.target_type = "post";
            req.body.target_id = id;
            

            //For deleting comments within the post
            req.body.requirements = [[id], ["post"]];

            //On to erasing the post photo links, photo files, comments, reactions and feeds from the data base
            next();

        } catch(err){

            console.log(err, query);
            res.json({message: "Error deleting post..."});
        }

    };
};

export default request;
