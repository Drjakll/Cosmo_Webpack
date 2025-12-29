let request = function() {
    
    this.req = async (req, res) => { 
        
        let {title, user_id} = req.body;
        
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

            await this.sql.query(query, data);

            res.json({message: "Successfully created an album!", failed: false});

        }catch(err){

            console.log(query, err);

            res.json({message: "Failed to created the album!", failed: true});
        }
    };
};

export default request;

