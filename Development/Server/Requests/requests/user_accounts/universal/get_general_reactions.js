let request = function(sql, s3, PutObjectCommand) {

    this.req_path = "/get_general_reactions";
    this.req_type = "post";
    this.callbacks = ["get_general_reactions"];
    
    
    this.req = async (req, res) => { 
        
        let {targets, target_type} = req.body;

        let data = [];

        for(let target of targets){

            let {id} = target;

            data.push(id);
        }

        if(!data.length){
            res.json({message: "No data to retrrieve", results: {reactions: [], targets}})
            return;
        }

        let query = `select 
                        gr.*,
                        ua.first_name as first_name,
                        ua.last_name as last_name,
                        pl.link as profile_picture_link
                    from 
                        General_Reactions as gr

                    join
                        User_Accounts as ua
                    on
                        gr.user_id = ua.id

                    left join
                        Photo_Links as pl
                    on
                        pl.target_id = ua.id and pl.target_type = 'profile' and pl.is_a_cover = 1

                    where 
                        gr.target_id in (?) and
                        gr.target_type = ?
                    `;
        try {

            let [results] = await this.sql.query(query, [data, target_type]);

            let final_results = {
                reactions: results,
                targets
            };

            res.json({message: "Successfully rertrieved some results", results: final_results, failed: false});

        } catch(err){

            console.log(query, err);

            res.json({message: `Error retrieving comments`, results: [], failed: true});
        }
                
    };
};

export default request;

