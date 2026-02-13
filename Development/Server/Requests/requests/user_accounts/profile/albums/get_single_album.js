let request = function() {
    
    this.req = async (req, res, next) => { 
        
        let {album_id} = req.body;

        let requirements = [album_id];
        
        let query = `select 
                        pa.*,
                        pl.link as album_cover_link,
                        count(pl2.target_id) as photo_count
                    from 
                        Photo_Albums as pa 

                    left join
                        Photo_Links as pl
                    on
                        pl.target_id = pa.id and pl.target_type = 'album' and is_a_cover = true

                    left join
                        Photo_Links as pl2
                    on
                        pl2.target_id = pa.id and pl2.target_type = 'album'
                
                    where 
                        pa.id = ?
                    group by
                        pl2.target_id
                    `;
                

        try {

            let [result] = await this.sql.query(query, requirements);

            if(result.length === 0){
                res.json({message: "No such album exists", photos: [], album_info: {}});
                return;
            }

            req.body.album_info = result[0];
            req.body.target_id = album_id;
            req.body.target_type = "album";

            //Next should be get_photo_links.js
            next();

        } catch(err){

            console.log(query, err);

            res.json({results: null, message: "Error retrieving albums"});
        }
                
    };
};

export default request;

