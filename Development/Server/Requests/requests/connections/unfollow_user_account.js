let request = function () {

    this.req = async (req, res)=>{

        let { from_id, to_id } = req.body;

        let query = `
            delete from Connections where follower_id=${from_id} and followed_id=${to_id};
        `;

        this.sql.query(query, (err, result) => {

            if(err){

                console.log(query, err.sqlMessage);
                res.json({message: "Error unfollowing user account"});
                
            } else {
                res.json({message: "Successfully unfollowed user account!"});
            }

            res.end();
        });

    };
};

export default request;