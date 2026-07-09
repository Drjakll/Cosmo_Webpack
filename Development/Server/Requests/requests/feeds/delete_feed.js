let request = function(sql, s3, PutObjectCommand){

    this.req_path = "/delete_feed";
    this.req_type = "post";
    this.callbacks = ["delete_feed"];

    this.req = async (req, res)=>{

        let {user_id, target_id, target_id_type, created_on} = req.body;

        let values = [
            user_id,
            target_id,
            created_on
        ];

        let query = `delete from Feeds where user_id = ? and ${target_id_type} = ? and created_on = ?`;

        try {

            let result = await this.sql.query(query, values);

            res.json({message: `Successfully deleted ${result.affectedRows} feeds`});

        }catch(err){

            console.log(query, err);

            res.json({message:"Error deleting feeds"});
        }

    };

};

export default request;