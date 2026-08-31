let request = function ({sql}) {

    this.req_path = null;
    this.req_type = null;
    this.callbacks = [];

    let Get_Account_Privacy = async (id)=>{

        let [result] = await sql.query(`select privacy from User_Accounts where id = ?`, [id]);

        return result.length ? result[0].privacy : null;
    }

    //This middleware is to check to see whether the target user privacy is public, mutual, or private then determine whether
    //to allow the visitor to go on with viewing the profile or not

    this.req = async (req, res, next) => {

        let { target_id } = req.body;
        let {user_id} = req.auth;

        if(!target_id){
            res.status(400).json({message: "Missing target id"});
        }

        let target_privacy = await Get_Account_Privacy(target_id);

        if(!target_privacy){
            res.status(400).json({message: "No account found", blocked: true});
        }

        let query = "";

        let data = [target_id, user_id];

        let msg = "";

        if(target_privacy === "mutual"){

            query = `
                select distinct
                    c.status as status
                from 
                    Connections as c
                left join
                    Connections as d
                on
                    d.followed_id = ?
                left join
                    Connections as e
                on
                    e.followed_id = d.follower_id
                where
                    (c.followed_id = ? and e.follower_id = c.followed_id and e.status = 'accepted') 
                    or 
                    (d.follower_id = c.followed_id and d.status = 'accepted');
            `;

            msg = "Missing mutual following connection";

        } else if (target_privacy === "private") {

            query = `
                select 
                    c.status as status
                from
                    Connections as c
                where
                    c.followed_id = ? and c.follower_id = ? and c.status = 'accepted';
            `

            msg = "You need to request to follow this user to view their profile";

        } else {

            next();

            return;

        }

        try {

            let [results] = await sql.query(query, data);

            if(results.length){
                next();
            } else {
                return res.status(400).json({message: msg, blocked: true})
            }

        } catch(err){

            console.log(err);

            return res.status(500).json({message: "Server error", blocked: true});
        }   

    };
}

export default request;