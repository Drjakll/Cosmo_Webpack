import React, { Component, createRef } from 'react';
import Profile_Thumbnail from './Profile_Thumbnail/profile_thumbnail.js';
import  Context from '@context/context.js';
import './connections_template.less';

class Connections_Temnplate extends Component {

    constructor(props) {

        super(props);

        let { owner_user_account, visitor_user_account, connection_list } = this.props.properties;

        Connections_Temnplate.contextType = Context;

        this.state = {
            owner_user_account,
            visitor_user_account,
            connection_list
        };
    }

    componentDidMount(){

    }

    async componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        await this.setState(this.props.properties);

    }

    render() {

        const { Drag_Scroll } = this.context;
        
        let drag_scroll = new Drag_Scroll();

        const Editor = this.state.connections_editor;

        let listRef = createRef();

        return <div id="connections-template-wrapper">
            
            <div id="connections-label">

                {Editor ? 
                <div id="connections-editor-wrapper">
                    <Editor Profile_Thumbnail={Profile_Thumbnail} account_data={this.state.owner_user_account} connection_list={this.state.connection_list}/>
                </div> : 
                <></>}

                <label><u>Connections ({Object.keys(this.state.connection_list || {}).length})</u></label>

            </div>
            
            <div id="connections-list"
                    ref={listRef}

                    onMouseDown={(e) => {
                        drag_scroll.init_drag(e, listRef.current);
                    }}

                    onMouseLeave={(e) => {
                        drag_scroll.disable_drag(e, listRef.current);
                    }}

                    onMouseUp={(e) => {
                        drag_scroll.disable_drag(e, listRef.current);
                    }}

                    onMouseMove={(e) => {
                        drag_scroll.move_drag(e, listRef.current);
                    }}
            >

                {Object.keys(this.state.connection_list || {}).map((key, index)=>{

                    let data = this.state.connection_list[key];

                    return <div key={index} className="profile-thumbnail-wrapper">

                        <Profile_Thumbnail connection_profile={data} owner_user_account={this.state.owner_user_account} visitor_user_account={this.state.visitor_user_account}/>
                        
                    </div>;

                })}

            </div>

        </div>;
    }
}


export default Connections_Temnplate;