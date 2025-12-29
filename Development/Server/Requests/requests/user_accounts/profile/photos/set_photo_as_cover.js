let request = function() {

    
    this.req = async (req, res) => { 
        
        let { last_cover_id, photo_cover_id} = req.body;

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

        } catch(err){

            console.log(err, query);
        }

        res.end();
    };
};

export default request;

