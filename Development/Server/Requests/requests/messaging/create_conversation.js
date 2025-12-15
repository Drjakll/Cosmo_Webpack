function request() {

    this.req = async (req,res)=>{

        let {initiator_email, oppose_email} = req.body;

        let query = `insert into Conversations(chat_type) values('group')`

        let now = Date.now();

        await this.sql.query(query, async (err, result)=>{

            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "Error creating a conversation", room_tag: null});
                res.end();
                return;
            }

            let values = [
                [initiator_email, result.insertId, now],
                [oppose_email, result.insertId, now]
            ];

            let q = `insert into Conversation_Participants(user_email, conversation_id, time_joined) values ?`;

            await this.sql.query(q, [values], (err_i, results)=>{

                if(err_i){
                    console.log(q, err_i.sqlMessage);
                }

            });

            res.json({message: "Successfully created the conversation", room_tag: result.insertId});


        });
    }
};

export default request;