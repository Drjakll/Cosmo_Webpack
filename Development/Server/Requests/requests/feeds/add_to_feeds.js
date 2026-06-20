let request = function(){

    this.req_path = "/add_to_feeds";
    this.req_type = "post";
    this.callbacks = ["add_to_feeds"];

    this.req = async (req, res)=>{

        let {user_id, target_id, target_type, created_on, result} = req.body;

        let values = [
            user_id,
            target_id,
            target_type,
            created_on
        ];

        let query = `insert into Feeds(user_id, target_id, target_type, created_on) values(?,?,?,?)`;

        try {

            await this.sql.query(query, values);

            res.json({message: "Successfully added to feeds", result: result ?? null});

        }catch(err){

            console.log(query, err);

            res.json({message:"Error adding to feeds", result: null});
        }

    };

};

export default request;