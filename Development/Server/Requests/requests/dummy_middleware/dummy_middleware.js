//A dummy middleware that just returns the results passed to it

function request() {
    
    this.req = (req, res) => {
        
        let {results, message} = req.body;

        res.json({message: message || "", results});
        res.end();
    };
};

export default request;