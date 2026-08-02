import React, {Component} from 'react';
import Albums from './Album/albums.js';
import './layer_3.less';

class Layer_3 extends Component {

    constructor(props){

        super(props);

        let {owner_user_account, visitor_user_account, change_display, return_previous_display} = props;

        this.General_Props = {
            owner_user_account,
            visitor_user_account,
            change_display,
            return_previous_display
        };

        this.Render_List = {
            "Album": {
                component: Albums,
                classname: 'layer_3-album-wrapper',
                props: {}
            }
        };

        this.state = {
            owner_user_account,
            visitor_user_account,
            general_props: this.General_Props,
            render_list: this.Render_List
        }

    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        let {owner_user_account, visitor_user_account, change_display, return_previous_display} = this.props;

        this.General_Props = {owner_user_account, visitor_user_account, change_display, return_previous_display}

        this.setState({
            owner_user_account,
            visitor_user_account,
            general_props: this.General_Props
        });
    }

    render(){

        let {render_list, general_props} = this.state;

        return <div id="layer_3-wrapper">

            {Object.keys(render_list).map((name, index)=>{

                let {component: Com, props, classname} = render_list[name];

                return <div className={`layer_3-component-wrapper ${classname}`} key={index}>

                    <Com {...general_props} {...props} />

                </div>

            })}
            
        </div>;
    }
}

export default Layer_3;