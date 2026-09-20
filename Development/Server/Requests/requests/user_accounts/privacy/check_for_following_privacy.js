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
            return res.status(400).json({message: "Missing target id"});
        }

        if(target_id === user_id){
            next();
            return;
        }

        let target_privacy = await Get_Account_Privacy(target_id);

        if(!target_privacy){
            return res.status(400).json({message: "No account found", blocked: true});
        }

        let query = "";

        let data = [];

        let msg = "";

        if(target_privacy === "mutual"){

            data = [user_id, target_id, user_id];

            query = `
                select 
                    *
                from
                    Connections as d
                left join
                    Connections as e
                on
					e.follower_id = ?
				and 
					e.status = 'accepted'
				and
					d.follower_id = e.followed_id 
				and 
					d.status = 'accepted'
                    
                where
                    d.followed_id = ?
                and
					d.status = 'accepted'
				and
					(e.followed_id is not null 
						or
					d.follower_id = ?)
                ;
            `;

            msg = "Missing mutual following";

        } else if (target_privacy === "private") {

            data = [target_id, user_id];

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