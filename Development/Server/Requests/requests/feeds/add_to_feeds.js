let request = function({sql}){

    this.req_path = null;
    this.req_type = null;
    this.callbacks = [];

    const valid_target_id_types = ["post_id", "user_id", "album_updates_id"]

    this.req = async (req, res)=>{

        let {target_id, target_id_type, result} = req.body;

        const {user_id} = req.auth;

        target_id = parseInt(target_id, 10);

        if(!target_id || 
            isNaN(target_id) ||
             target_id <= 0 || 
             !target_id_type || 
             typeof target_id_type !== "string" || 
             !valid_target_id_types.includes(target_id_type) ||
             created_on <= 0){

            res.status(400).json({message: "Invalid required fields"});
            return;
        }

        let created_on = Date.now();

        let values = [
            user_id,
            target_id,
            target_id_type,
            target_id,
            created_on
        ];

        let query = `insert into Feeds(user_id, ${target_id_type}, target_id_type, target_id, created_on) values(?,?,?,?,?)`;

        try {

            await sql.query(query, values);

            res.status(200).json({message: "Successfully added to feeds", result});

        }catch(err){

            console.log(query, err);

            res.status(500).json({message:"Error adding to feeds", result: null});
        }

    };

};

export default request;