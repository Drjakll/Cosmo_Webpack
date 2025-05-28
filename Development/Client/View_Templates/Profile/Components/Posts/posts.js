import React, { Component } from 'react';
import Single_Post from './Single_Post/single_post.js';
import './posts.less';

class Posts extends Component {
    
    constructor(props){
        
        super(props);

        Posts.contextType = window.Context;

        this.state = {

        };
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
                                date_properties={[]}
                            />

                        </div>

                    </div>

                </div>

                <div id="bottom">

                    

                </div>

            </div>
        );
    }
}

export default Posts;