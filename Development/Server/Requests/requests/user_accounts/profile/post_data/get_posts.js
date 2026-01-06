let request = function() {
    
    this.req = async (req, res) => { 
        
        let {user_id, date_interval} = req.body;
        
        let query = `select * from Post_Data where user_id = ${user_id} 
                                               and created_on >= ${date_interval.start}
                                               and created_on <= ${date_interval.end}
                                               order by created_on asc`;

        
        try{
            let [results] = await this.sql.query(query);

            res.json({message: `Successfully retrieved ${results.length} posts`, posts: results})

        } catch(err){

            console.log(err);

            res.json({message: "Error retrieving post(s)", posts: []});
        }

    };
};

export default request;
