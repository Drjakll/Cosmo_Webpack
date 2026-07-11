let request = function({sql}) {
    
    this.req_path = "/get_albums/:id";
    this.req_type = "get";
    this.callbacks = ["get_albums"];

    this.req = async (req, res) => { 
        
        let {id:user_id} = req.params;

        let requirements = [user_id];
        
        let query = `select 
                        pa.*,
                        coalesce(pl.link, '') as album_cover_link,
                        coalesce(pl.id, '') as album_cover_id,
                        (
                            select 
                                count(*)
                            from
                                Photo_Links p
                            where 
                                p.album_id = pa.id
                        ) as photo_count
                    from 
                        Photo_Albums as pa 

                    left join
                        Photo_Links as pl
                    on
                        pl.album_id = pa.id and is_a_cover = 1
                    
                    where 
                        pa.user_id = ? order by created_on desc`;

        try {

            let [results] = await sql.query(query, requirements);

            res.json({results, message: `Successfully retrieved ${results.length} albums`});

        } catch(err){

            console.log(query, err);

            res.json({results: null, message: "Error retrieving albums"});
        }
                
    };
};

export default request;

