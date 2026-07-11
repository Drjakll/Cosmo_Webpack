let request = function({sql}) {

    this.req_path = "/set_photo_as_cover";
    this.req_type = "post";
    this.callbacks = ["set_photo_as_cover"];    
    
    this.req = async (req, res) => { 
        
        //last_cover_id is the last photo_id that was used for cover
        let { last_cover_id, photo_cover_id} = req.body;

        if(photo_cover_id <= 0 || photo_cover_id === last_cover_id){
            res.json({message: null});
            return;
        }

        last_cover_id = last_cover_id === "" ? 0 : parseInt(last_cover_id)

        let data = [last_cover_id, photo_cover_id, last_cover_id, photo_cover_id];

        let query = `
            update Photo_Links 
            set 
                is_a_cover = 
                    case id
                        when ? then false
                        when ? then true
                    end
            where id in (?,?)
        `;
        
        try {

            await sql.query(query, data);

            res.json({message: "Successfully updated cover photo"});

        } catch(err){

            console.log(err, query);

            res.json({message: null});
        }

    };
};

export default request;

