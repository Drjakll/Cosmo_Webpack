//A dummy middleware that just returns the results passed to it

function request(sql, s3, PutObjectCommand) {

    this.req_path = "/dummy_middleware";
    this.req_type = "post";
    this.callbacks = ["dummy_middleware"];
    
    this.req = (req, res) => {
        
        let {results, message} = req.body;

        res.json({message: message || "", results: results || []});
        res.end();
    };
};

export default request;