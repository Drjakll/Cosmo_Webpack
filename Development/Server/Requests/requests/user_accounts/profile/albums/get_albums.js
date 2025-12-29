let request = function() {
    
    this.req = async (req, res) => { 
        
        let {id} = req.body;

        let requirements = [id];
        
        let query = `select 
                        pa.*,
                        pl.link as album_cover_link,
                        pl.id as album_cover_id
                    from 
                        Photo_Albums as pa 
                    left join
                        Photo_Links as pl
                    on
                        pl.target_id = pa.id and target_type = 'album' and is_a_cover = true
                    where 
                        pa.user_id = ? order by created_on desc`;

        try {

            let [results] = await this.sql.query(query, requirements);

            res.json({results, message: `Successfully retrieved ${results.length} albums`});

        } catch(err){

            console.log(query, err);

            res.json({results: null, message: "Error retrieving albums"});
        }
                
    };
};

export default request;

