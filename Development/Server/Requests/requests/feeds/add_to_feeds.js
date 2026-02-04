let request = function(){

    this.req = async (req, res)=>{

        let {user_id, target_id, target_type, created_on} = req.body;

        let values = [
            user_id,
            target_id,
            target_type,
            created_on
        ];

        let query = `insert into Feeds(user_id, target_id, target_type, created_on) values(?,?,?,?)`;

        try {

            await this.sql.query(query, values);

            res.json({message: "Successfully added to feeds"});

        }catch(err){

            console.log(query, err);

            res.json({message:"Error adding to feeds"});
        }

    };

};

export default request;