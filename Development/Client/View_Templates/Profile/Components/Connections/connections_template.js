import React, { Component, createRef } from 'react';
import Profile_Thumbnail from './Profile_Thumbnail/profile_thumbnail.js';
import './connections_template.less';

class Connections_Temnplate extends Component {

    constructor(props) {

        super(props);

        let { account_data } = this.props.properties;

        Connections_Temnplate.contextType = window.Context;

        this.state = {
            account_data: account_data,
            connection_list: []
        };
    }

    componentDidMount(){

        this.Get_Connection_List(this.state.account_data);

    }

    async componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        await this.setState(this.props.properties);

        this.Get_Connection_List(this.state.account_data);

    }

    Get_Connection_List = async (account_data)=>{

        if(!account_data){
            return;
        }

        let {email} = account_data;

        let { get_all_connections } = this.context.Request_URLs;

        let data = await (await fetch(
            get_all_connections, {
                method: "POST",
                body: JSON.stringify({email}),
                headers: {
                    'Content-Type': "application/json"
                }
            }
        )).json();

        if(data){

            let {result} = data;

            this.setState({connection_list: result});

        }
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
                    <Editor Profile_Thumbnail={Profile_Thumbnail} account_data={this.state.account_data} />
                </div> : 
                <></>}

                <label>Connections</label>

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

                {this.state.connection_list.map((data, index)=>{

                    return <div key={index} className="profile-thumbnail-wrapper"><Profile_Thumbnail connection_profile={data} current_user_account_data={this.state.account_data} /></div>;

                })}

            </div>

        </div>;
    }
}


export default Connections_Temnplate;