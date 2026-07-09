let request = function (sql, s3, PutObjectCommand) {

    this.req_path = "/unfollow_user_account";
    this.req_type = "post";
    this.callbacks = ["unfollow_user_account"];

    this.req = async (req, res)=>{

        let { followed_id, follower_id } = req.body;

        let now = Date.now();

        let data = [follower_id, followed_id];

        let query = `
            update Connections set status = 'rejected' , timestamp = ${now} where follower_id = ? and followed_id = ?;
        `;

        try {

            await this.sql.query(query, data);

            res.json({message: "Successfully unfollowed user"});

        } catch(err){

            console.log(err);

            res.json({message: "Error following user"});

        }

    };
};

export default request;