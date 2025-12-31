let request = function() {
    
    this.req = async (req, res, next) => { 
        
        let { photos } = req.body;

        if(Object.keys(photos || {}).length === 0){
            res.end();
            return;
        }

        let ids = [], target_ids = [], target_types = [];

        for(let i in photos){

            let {id, target_id, target_type} = photos[i];

            ids.push(id);
            target_ids.push(target_id);
            target_types.push(target_type);
        }
        
        if(photos.length === 0){
            res.json({message:"No photo data has been deleted"});
            return;
        }
     
        let query = `delete from Photo_Links where id in (?) and target_id in (?) and target_type in (?)`;
        
        try {

            await this.sql.query(query, [ids, target_ids, target_types]);

            //Setup for deleting comments next

            let comment_target_ids = [];
            let comment_target_types = [];

            for(let id of ids){
                comment_target_ids.push(id);
                comment_target_types.push("photo");
            }

            req.body.requirements = [comment_target_ids, comment_target_types];
            
            //Should call delete multiple comments
            next();

        } catch(err){

            console.log(query, err);
        }

    };
};

export default request;

