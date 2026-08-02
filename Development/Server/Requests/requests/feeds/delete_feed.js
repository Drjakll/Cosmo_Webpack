let request = function({sql}){

    this.req_path = null;
    this.req_type = null;
    this.callbacks = [];

    this.req = async (req, res)=>{

        let {user_id, target_id, target_id_type, created_on} = req.body;

        let values = [
            user_id,
            target_id,
            created_on
        ];

        let query = `delete from Feeds where user_id = ? and ${target_id_type} = ? and created_on = ?`;

        try {

            let result = await sql.query(query, values);

            res.json({message: `Successfully deleted ${result.affectedRows} feeds`});

        }catch(err){

            console.log(query, err);

            res.json({message:"Error deleting feeds"});
        }

    };

};

export default request;