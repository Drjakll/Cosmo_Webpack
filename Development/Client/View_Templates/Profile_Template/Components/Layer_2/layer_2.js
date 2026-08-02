import React, {Component} from 'react';
import Posts from './Posts/posts.js';
import Wall from './Wall/wall.js';
import './layer_2.less';

class Layer_2 extends Component {

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
            "Wall": {
                component: Wall,
                props: {},
                classname: "layer_2-wall-wrapper"
            },
            "Posts": {
                component: Posts,
                props: {},
                classname: "layer_2-post-wrapper"
            }
        }

        this.state = {
            owner_user_account,
            visitor_user_account,
            general_props: this.General_Props,
            render_list: this.Render_List,
            selected_tab: "Wall"
        };

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

    Select_Component = (selected_tab)=>{

        this.setState({selected_tab});
    }

    render(){

        let {render_list, general_props, selected_tab} = this.state;

        return <div id="layer_2-wrapper">

            <div id="layer_2-component-tabs">

                {Object.keys(render_list).map((tab_name, index)=>{

                    return <div key={index}
                                className={`layer_2-comp-tab ${selected_tab === tab_name ? "selected-layer_2-tab" : ""}`}
                                onClick={(e)=>{ this.Select_Component(tab_name); }}>

                            {tab_name}

                        </div>;

                })}

            </div>

            <div id="layer_2-inner-wrapper">

                {Object.keys(render_list).map((name, index)=>{

                    let {component: Com, props, classname} = render_list[name];

                    return <div className={`layer_2-component-wrapper ${classname} ${selected_tab === name && "selected-layer-2-comp"}`} 
                                key={index}>

                        <Com {...general_props} {...props} />

                    </div>;

                })}

            </div>
            
        </div>;
    }
}

export default Layer_2;