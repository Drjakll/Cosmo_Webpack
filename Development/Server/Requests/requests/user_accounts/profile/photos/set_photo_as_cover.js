let request = function() {

    
    this.req = async (req, res) => { 
        
        let { photo_id, target_id, target_type } = req.body;

        let query = `update Photo_Links set is_a_cover = false where target_type = '${target_type}' and target_id = ${target_id} and is_a_cover = true`;

        let query2 = `update Photo_Links set is_a_cover = true where target_type = '${target_type}' and target_id = ${target_id} and id = ${photo_id}`;

        try {

            await this.sql(query);

            await this.sql(query2);

        } catch(err){

            console.log(err, query);
        }

        res.end();
    };
};

export default request;

