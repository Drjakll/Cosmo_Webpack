import React, {Component} from 'react';


class Posts extends Component {
    
    constructor(props){
        
        super(props);

        Posts.contextType = window.Context;


    }
    
    
    render() {

        let { Calendar } = this.context;
        
        return (
            <div id="posts">
                    
                <Calendar year={2025} month={4} date={26} callback_left={(e) => { }} callback_right={(e) => { }} date_callbacks={[]} />
                    
            </div>
        );
    }
}

export default Posts;