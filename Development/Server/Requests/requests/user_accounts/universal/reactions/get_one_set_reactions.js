let request = function(sql, s3, PutObjectCommand) {

    this.req_path = "/get_one_set_reactions/:target_id/:target_id_type";
    this.req_type = "get";
    this.callbacks = ["get_one_set_reactions"];
    
    
    this.req = async (req, res) => { 
        
        let {target_id, target_id_type} = req.params;

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

            res.json({message: "Successfully rertrieved some reactions", results, failed: false});

        } catch(err){

            console.log(query, err);

            res.json({message: `Error retrieving reactions`, results: [], failed: true});
        }
                
    };
};

export default request;

