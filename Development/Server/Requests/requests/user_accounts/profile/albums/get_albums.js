let request = function() {
    
    this.req = async (req, res) => { 
        
        let {id:user_id} = req.params;

        let requirements = [user_id];
        
        let query = `select 
                        pa.*,
                        pl.link as album_cover_link,
                        pl.id as album_cover_id,
                        pc.photo_count as photo_count
                    from 
                        Photo_Albums as pa 

                    left join
                        Photo_Links as pl
                    on
                        pl.target_id = pa.id and target_type = 'album' and is_a_cover = true
                    
                    left join
                        (select 
                            target_id,
                            count(target_id) as photo_count
                        from
                            Photo_Links
                        where 
                            target_type = 'album'
                        group by
                            target_id
                        ) as pc
                    on
                        pc.target_id = pa.id
                    
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

