let request = function (sql, s3, PutObjectCommand) {

    this.req_path = "/remove_follower";
    this.req_type = "post";
    this.callbacks = ["remove_follower"];

    this.req = async (req, res)=>{

        let { follower_id, followed_id} = req.body;

        let now = Date.now();

        let data = [follower_id, followed_id];

        let query = `
            update Connections set status = 'rejected' , timestamp = ${now} where follower_id = ? and followed_id = ?;
        `;

        try {

            this.sql.query(query, data);

            res.json({message:"Successfully removed follower"});

        } catch(err){

            console.log(err);

            res.json({message: "Error removing follower"});
        }

    };
};

export default request;