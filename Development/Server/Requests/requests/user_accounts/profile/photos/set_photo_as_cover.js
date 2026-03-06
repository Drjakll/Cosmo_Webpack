let request = function() {

    
    this.req = async (req, res) => { 
        
        let { last_cover_id, photo_cover_id} = req.body;

        if(!last_cover_id <= 0 || !photo_cover_id <= 0){
            res.json({message: null});
            return;
        }

        let query = `
            update Photo_Links 
            set 
                is_a_cover = 
                    case id
                        when ${last_cover_id} then false
                        when ${photo_cover_id} then true
                    end
            where id in (${last_cover_id},${photo_cover_id})
        `;
        
        try {

            await this.sql.query(query);

            res.json({message: "Successfully updated cover photo"});

        } catch(err){

            console.log(err, query);

            res.json({message: null});
        }

    };
};

export default request;

