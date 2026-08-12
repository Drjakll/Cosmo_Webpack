let request = function({sql}) {

    this.req_path = "/add_album";
    this.req_type = "post";
    this.callbacks = ["central_auth","add_album"];
    
    this.req = async (req, res) => { 
        
        let {title} = req.body;

        const {user_id} = req.auth;

        if(!title || isNaN(parseInt(user_id))){
            res.status(400).json({message: "Missing required fields!", failed: true});
            return;
        }
        
        let created_on = Date.now();

        let data = [
            {
                title,
                user_id,
                created_on
            }
        ];

        let query = `insert into Photo_Albums set ?`
        
        try {

            await sql.query(query, data);

            res.status(200).json({message: "Successfully created an album!", failed: false});

        }catch(err){

            console.log(query, err);

            res.status(500).json({message: "Failed to created the album!", failed: true});
        }
    };
};

export default request;

