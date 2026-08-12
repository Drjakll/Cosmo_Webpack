let request = function({sql}) {

    this.req_path = "/get_single_album";
    this.req_type = "post";
    this.callbacks = ["get_single_album"];
    
    this.req = async (req, res, next) => { 
        
        let {album_id} = req.body;

        let requirements = [album_id];
        
        let query = `select 
                        pa.*,
                        pl.link as album_cover_link,
                        count(pl2.id) as photo_count
                    from 
                        Photo_Albums as pa 

                    left join
                        Photo_Links as pl
                    on
                        pl.album_id = pa.id and is_a_cover = true

                    left join
                        Photo_Links as pl2
                    on
                        pl2.album_id = pa.id
                
                    where 
                        pa.id = ?
                    group by
                        pl2.album_id
                    `;
                

        try {

            let [result] = await sql.query(query, requirements);

            if(result.length === 0){
                res.status(404).json({message: "No such album exists", photos: [], album_info: {}});
                return;
            }

            req.body.album_info = result[0];
            req.body.target_id = album_id;
            req.body.target_id_type = "album_id";

            //Next should be get_photo_links.js
            next();

        } catch(err){

            console.log(query, err);

            res.status(500).json({results: null, message: "Error retrieving albums"});
        }
                
    };
};

export default request;

