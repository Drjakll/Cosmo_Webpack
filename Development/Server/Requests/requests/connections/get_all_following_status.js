let request = function ({sql}) {

    this.req_path = "/get_all_following_status";
    this.req_type = "get";
    this.callbacks = ["central_auth","get_all_following_status"];


    this.req = async (req, res) => {

        let {user_id} = req.auth;

        let data = [user_id];

        let query = `
            select 
                *
            from
                Connections
            where 
                follower_id = ?
        `;

        try {

            let [results] = await sql.query(query, data);

            if(results.length > 0){

                res.status(200).json({message: "Successfully retrieved following status", following_status: results});

            } else {

                res.status(200).json({message: "No following status found", following_status: null});
            }

        } catch(err){

            console.log(err);

            res.status(500).json({message: "Error retrieving following status", following_status: null});
        }   

    };
}

export default request;