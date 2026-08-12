let request = function({sql}) {

    this.req_path = "/set_photo_as_cover";
    this.req_type = "post";
    this.callbacks = ["central_auth","set_photo_as_cover"];    
    
    const Possible_Target_ID_Type = ["album_id","post_id","profile_id"];

    this.req = async (req, res) => { 
        
        //Frontend can use either last_cover_id or specifically give either "profile_id","album_id" or "post_id" 
        //within the given user_id
        let { last_cover_id, photo_cover_id} = req.body;

        if(!photo_cover_id || photo_cover_id === last_cover_id){
            res.status(400).json({message: "Profile picture did not change"});
            return;
        }

        last_cover_id = !last_cover_id ? 0 : parseInt(last_cover_id)

        let data = [last_cover_id, photo_cover_id, last_cover_id, photo_cover_id];

        let query = `
            update 
                Photo_Links 
            set 
                is_a_cover = 
                    case id
                        when ? then false
                        when ? then true
                    end
            where id in (?,?)
        `;
        
        try {

            await sql.query(query , data);

            res.status(200).json({message: "Successfully updated cover photo"});

        } catch(err){

            console.log(err, query);

            res.status(500).json({message: null});
        }

    };
};

export default request;

