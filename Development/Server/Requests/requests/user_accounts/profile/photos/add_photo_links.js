let request = function() {
    
    
    this.req = (req, res) => { 
        
        let {links, target_type, target_id} = req.body;

        let time_uploaded = Date.now();

        let to_be_inserted = [];

        for(let link of links){

            to_be_inserted.push({link, target_type, target_id, time_uploaded});

        }

        let query = `insert into Photo_Links(link, target_type, target_id, time_stamp) values ?`;

        try {

            this.sql(query, [to_be_inserted]);

        } catch (err){

            console.log(err, query);

        }

        res.end();
        
    }
};

export default request;

