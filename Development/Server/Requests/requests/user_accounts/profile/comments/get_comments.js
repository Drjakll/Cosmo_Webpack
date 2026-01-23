let request = function() {
    
    
    this.req = async (req, res, next) => { 
        
        let {target_id, target_type, offset_timestamp, limit, greater_or_less, asc_desc, reply_to_ids, emojis, comments} = req.body;

        let data = [
            target_id,
            target_type,
            offset_timestamp
        ];

        if(reply_to_ids){
            console.log(reply_to_ids);
            reply_to_ids = reply_to_ids.split(","); 
            data.push(reply_to_ids);
        }

        let query = `select 
                        c.*,
                        pl.link as profile_picture_link,
                        ua.first_name as first_name,
                        ua.last_name as last_name
                    from 
                        Comments as c

                    join
                        User_Accounts as ua
                    on
                        c.user_id = ua.id

                    left join
                        Photo_Links as pl
                    on
                        pl.target_id = ua.id and pl.target_type = 'profile' and pl.is_a_cover = 1

                    where 
                        c.target_id = ? and
                        c.target_type = ? and
                        c.time_stamp ${greater_or_less} ?
                        ${reply_to_ids ? "and c.reply_to_id  in (?)" : "and c.reply_to_id is null"}
                    order by time_stamp ${asc_desc}
                    limit ${limit ?? 25}
                    `;
        try {

            let [results] = await this.sql.query(query, data);

            //If these 3 items exists, that means this function was previously called and now it comes back with retrieving only the replies. Now we can return all the items
            if(reply_to_ids && emojis && comments){
                
                let all_results = {
                    comments,
                    emojis,
                    replies: results
                };

                return res.json({message: "Successfully retrieved comments", results: all_results});
            }

            
            req.body.comments = results;

            //Otherwise next move onto getting the reactions for each comment.
            next();

        } catch(err){

            console.log(query, err);

            res.json({message: `Error retrieving comments`, results: []});
        }
                
    };
};

export default request;

