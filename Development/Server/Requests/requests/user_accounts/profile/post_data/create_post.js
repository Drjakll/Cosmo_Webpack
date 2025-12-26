let request = function() {
    
    this.req = (req, res) => { 
        
        let {user_id, body, title} = req.body;

        let created_on = Date.now();

        let data = [
            {created_on, user_id, body, title, last_edited: time_stamp}
        ]
        
        let query = `insert into Post_Data(title, body, user_id, created_on, last_edited) values ?`;
        
        this.sql.query(query, [data], (err, result)=>{
            
            if (err) {

                console.log(query, err.sqlMessage);
                res.json({ message: "Error adding new post" });            

            } else {

                res.json({message: "Successfully added new post"});
                
            }

            
        });

    };
};

export default request;
