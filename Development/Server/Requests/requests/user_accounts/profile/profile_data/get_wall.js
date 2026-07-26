let request = function ({sql}) {

    this.req_path = "/get_user_wall/:user_id";
    this.req_type = "get";
    this.callbacks = ["get_wall"];
    
    this.req = async (req, res)=>{

        let {user_id} = req.params;

        user_id = parseInt(user_id);

        if(isNaN(user_id)){
            return res.json({message: "No user id is given", wall: null});
        }

        let data = [user_id]

        let query = `select * from Walls where user_id = ?`;

        try {

            let [results] = await sql.query(query, data);

            if(!results.length){
                return res.json({message: "No wall found", wall: null});
            }

            res.json({message: "Found the wall", wall: results[0]});

        }catch(err){

            console.log(err);

            res.json({message: "Error while searching the wall", wall: null});
        }


    };

};

export default request;