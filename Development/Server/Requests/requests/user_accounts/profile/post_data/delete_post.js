let request = function() {
    
    this.req = async (req, res, next) => { 
        
        let {id, user_id} = req.body;
        
        let query = `delete from Post_Data where id = ${id} and user_id = ${user_id}`;
        
        try {

            await this.sql.query(query);

            //Query to select all the photo links belong to the post
            query = `select * from Photo_Links where target_id = ${id} and target_type = 'post'`;

            const [rows] = await this.sql(query);

            res.body.photos = rows;

            //On to erasing the post photo links in the data base
            next();

        } catch(err){

            console.log(err, query);
        }

    };
};

export default request;
