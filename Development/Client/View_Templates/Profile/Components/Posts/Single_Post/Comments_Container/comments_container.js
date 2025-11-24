import React, { Component, createRef } from 'react';
import './comments_container.less';

class Comments_Container extends Component {

    postBodyRef = createRef();

    constructor(props){
        super(props);

        let {post} = this.props;

        this.state = {
            post
        };
    }

    componentDidMount(){

        this.postBodyRef.current?.innerHTML = this.state.post.body;
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);

        this.postBodyRef.current?.innerHTML = this.props.post?.body;
    }

    render(){

        let {post} = this.state;

        let {title, date_created} = post || {};

        return (
            <div id="comments-container">

                <div id="post-wrapper">

                    <div id="post-inner-wrapper">

                        <div id="post-title">

                            <pre>{title}</pre> 

                        </div>

                        <div id="post-body">

                            <pre ref={this.postBodyRef}>

                            </pre>

                        </div>

                        <div id="post-date-created">

                            {this.props.generate_beautiful_date(date_created)}

                        </div>

                    </div>
                    
                </div>

                <div id="comments-section-wrapper">

                    <div id="comments-section-title">
                        Comments
                    </div>

                    <div id="comments-section-inner-wrapper">

                    </div>

                    <div id="comment-input-wrapper">


                    </div>

                </div>
                

            </div>
        );
    }   
}

export default Comments_Container;