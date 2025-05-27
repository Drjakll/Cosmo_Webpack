import React, {Component} from 'react';
import './posts.less';

class Posts extends Component {
    
    constructor(props){
        
        super(props);

        Posts.contextType = window.Context;


    }
    
    
    render() {

        let { Calendar } = this.context;
        
        return (
            <div id="posts">
                
                <div id="top">
                
                    <div id="calendar-wrapper">
                        
                        <div id="date-display-clickable">
                            May 27, 2025
                        </div>
                        
                        <div id="calendar-popup">
                        
                            <Calendar year={2025} 
                                    month={5} 
                                    date={27} 
                                    callback_left={(e) => { }} 
                                    callback_right={(e) => { }} 
                                    date_properties={[
                                            {date: 27,
                                             style: {border: "darkorange solid 3px", 
                                                     color: "black",
                                                     borderRadius: "50px",
                                                     padding: "5px"
                                                    },
                                             callback: ()=>{alert("Hi!!");},
                                             popup: <div
                                                style={
                                                    {
                                                        position: "absolute",
                                                        bottom: "100%",
                                                        width: "100px",
                                                        height: "50px",
                                                        backgroundColor: "black",
                                                        color: "white"
                                                    }
                                                }
                                             >Stupid!</div>
                                            }
                                        ]} 
                                    />
                        
                        </div>
                    </div>   
                    
                </div>
            </div>
        );
    }
}

export default Posts;