let request = function () {

    this.req = async (req, res)=>{

        let { from_id, to_id } = req.body;

        let data = {from_id, to_id};

        let query = `
            delete from Connections where follower_id = ? and followed_id = ?;
        `;

        try {

            await this.sql.query(query, data);

            res.json({message: "Successfully unfollowed user"});

        } catch(err){

            console.log(err);

            res.json({message: "Error following user"});

        }

    };
};

export default request;