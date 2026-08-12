import fs from 'fs';



function request({sql}) {

    this.req_path = "/";
    this.req_type = "get";
    this.callbacks = ["entry"];
    
    this.req = (req, res) => {
        
        try {
            
            const entry_page = fs.readFileSync(`${__dirname}/entry.html`, 'utf8');
            
            res.status(200).send(entry_page);
            
        }
        catch(err){
            
            console.log(err);

            res.status(500).send("Server Error");
        }

    };
};

export default request;