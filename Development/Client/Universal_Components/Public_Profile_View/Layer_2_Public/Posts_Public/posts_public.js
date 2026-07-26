import React from 'react';
import Posts from '@posts';
import './posts_public.less';

class Posts_Public extends Posts {

    constructor(props){

        super(props);
        
    }

    render(){

        return <div id="posts-public-wrapper">

            {super.render()}

        </div>

    }
}

export default Posts_Public;