let request = function () {

    this.req = async (req, res)=>{

        let { follower_id, followed_id, status } = req.body;

        let data = [status, follower_id, followed_id];

        let query = `
            update
                Connections
            set
                status = ?
            where
                follower_id = ? 
                and followed_id = ?;
        `;

        try {

            await this.sql.query(query, data);

            res.json({message: "Successfully updated connection request!"});

        } catch(err){

            console.log(query, err);

            res.json({message: "Error updating connection request!"});

        }
    };
};

export default request;