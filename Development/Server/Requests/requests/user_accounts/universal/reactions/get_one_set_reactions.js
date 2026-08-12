let request = function({sql}) {

    this.req_path = "/get_one_set_reactions/:target_id/:target_id_type";
    this.req_type = "get";
    this.callbacks = ["get_one_set_reactions"];
    
    //If frontend needs only one set of reactions, i.e. A post's reactions
    this.req = async (req, res) => { 
        
        let {target_id, target_id_type} = req.params;

        if(!target_id){

            return res.status(400).json({message: "Missing target id", results: [], failed: true});
        }

        if(!target_id_type){

            return res.status(400).json({message: "Missing target id type", results: [], failed: true});
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
                        r.${target_id_type} = ?
                    `;
        try {

            let [results] = await sql.query(query, [target_id]);

            res.status(200).json({message: "Successfully rertrieved some reactions", results, failed: false});

        } catch(err){

            console.log(query, err);

            res.status(500).json({message: `Error retrieving reactions`, results: [], failed: true});
        }
                
    };
};

export default request;

