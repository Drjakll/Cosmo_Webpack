function request() {
    
    this.req = (req, res) => {
        
        let {results} = req.body;

        res.json({results});
        res.end();
    };
};

export default request;