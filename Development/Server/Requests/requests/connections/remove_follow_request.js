let request = function (sql, s3, PutObjectCommand) {

    this.req_path = "/remove_follow_request";
    this.req_type = "post";
    this.callbacks = ["remove_follow_request"];

    this.req = async (req, res)=>{

        let { from_id, to_id } = req.body;

        let data = [from_id, to_id];

        let query = `
            delete from Connections where follower_id = ? and followed_id = ?;
        `;

        try {

            this.sql.query(query, data);

            res.json({message:"Successfully removed follow request"});

        } catch(err){

            console.log(err);

            res.json({message: "Error removing follow request"});
        }

    };
};

export default request;