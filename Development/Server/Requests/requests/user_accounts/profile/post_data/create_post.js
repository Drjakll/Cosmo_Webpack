let request = function() {
    
    this.req = async (req, res) => { 
        
        let {user_id, body, title} = req.body;

        let created_on = Date.now();

        let data = [title, body, user_id, created_on, created_on];
        
        let query = `insert into Post_Data(title, body, user_id, created_on, last_edited) values (?,?,?,?,?)`;
        
        try {

            let [result] = await this.sql.query(query, data);

            let post_obj = {id: result.insertId, title, body, user_id, created_on, last_edited: created_on};

            res.json({message: "Successfully added new post", result: post_obj});

        } catch(err){

            console.log(err);

            res.json({ message: "Error adding new post", result: null }); 
        }

    };
};

export default request;
