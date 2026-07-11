let request = function ({sql}) {

    this.req_path = "/update_follow_request";
    this.req_type = "patch";
    this.callbacks = ["update_follow_request"];

    this.req = async (req, res)=>{

        let { follower_id, followed_id, status } = req.body;

        let data = [status, follower_id, followed_id];

        let query = `
            update
                Connections
            set
                status = ?
            where
                follower_id = ? 
                and followed_id = ?;
        `;

        try {

            await sql.query(query, data);

            res.json({message: "Successfully updated connection request!"});

        } catch(err){

            console.log(query, err);

            res.json({message: "Error updating connection request!"});

        }
    };
};

export default request;