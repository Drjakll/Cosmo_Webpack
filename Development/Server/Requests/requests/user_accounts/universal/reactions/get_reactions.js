let request = function({sql}) {

    this.req_path = null;
    this.req_type = null;
    this.callbacks = [];
    
    //This is a pure middleware, it should not be directly called by the frontend
    //It's used when retrieving a lots of reactions from a list of comments or a list of anything
    this.req = async (req, res) => { 
        
        let {targets, target_id_type} = req.body;

        let data = [];

        if(!targets){
            return res.status(400).json({message: "Missing targets", results: {reactions: [], targets}});
        }

        for(let target of targets){

            let {id} = target;

            data.push(id);
        }

        if(!data.length){
            res.status(200).json({message: "No data to retrrieve", results: {reactions: [], targets}})
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

            res.status(200).json({message: "Successfully rertrieved some results", results: final_results, failed: false});

        } catch(err){

            console.log(query, err);

            res.status(500).json({message: `Error retrieving comments`, results: [], failed: true});
        }
                
    };
};

export default request;

