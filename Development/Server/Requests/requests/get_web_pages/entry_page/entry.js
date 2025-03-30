import fs from 'fs';



function request() {
    
    this.req = (req, res) => {
        
        try {
            
            const entry_page = fs.readFileSync(`${__dirname}/entry.html`, 'utf8');
            
            res.send(entry_page);
            
        }
        catch(err){
            
            console.log(err);
        }
        
        res.end();
    };
};

export default request;