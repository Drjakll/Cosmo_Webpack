let request = function ({sql}) {

    this.req_path = "/get_request_status/:from_id/:to_id";
    this.req_type = "get";
    this.callbacks = ["get_request_status"];


    this.req = async (req, res) => {

        let { from_id, to_id } = req.params;

        let data = [from_id, to_id];

        let query = `
            select status from Connections where follower_id = ? and followed_id = ?;
        `;

        try {

            let [result] = await sql.query(query, data);

            if(result.length > 0){

                res.json({message: "Successfully retrieved request status", success: 1, status: result[0].status});

            } else {

                res.json({message: "No follow request found", success: 1, status: null});
            }

        } catch(err){

            console.log(err);

            res.json({message: "Error retrieving request status", success: 0, status: null});
        }   

    };
}

export default request;