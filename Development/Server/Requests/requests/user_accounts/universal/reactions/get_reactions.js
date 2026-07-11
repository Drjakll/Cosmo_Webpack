let request = function({sql}) {

    this.req_path = "/get_reactions";
    this.req_type = "post";
    this.callbacks = ["get_reactions"];
    
    
    this.req = async (req, res) => { 
        
        let {targets, target_id_type} = req.body;

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
                        r.*,
                        ua.first_name as first_name,
                        ua.last_name as last_name,
                        pl.link as profile_picture_link
                    from 
                        Reactions as r

                    join
                        User_Accounts as ua
                    on
                        r.user_id = ua.id

                    left join
                        Photo_Links as pl
                    on
                        pl.profile_id = ua.id and pl.is_a_cover = 1

                    where 
                        r.${target_id_type} in (?)
                    `;
        try {

            let [results] = await sql.query(query, [data]);

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

