let request = function() {
    
    this.req = async (req, res, next) => { 
        
        let {target_id, target_type} = req.body;

        let requirements = [target_id, target_type];
        
        let query = `select * from Photo_Links where target_id = ? and target_type = ?`;
        
        try {

            let [results] = await this.sql.query(query, requirements);

            req.body.results = results;
            req.body.message = "Successfully retrieved photo links";
            
            req.body.photos = results; //In case delete_photo_links is the next middleware
            
            next();

        } catch(err){

            console.log(query, err);

            res.json({result: [], message: "Error retrieving photo links"});

        }

    };
};

export default request;

