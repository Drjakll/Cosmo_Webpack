import React, {Component, createRef} from 'react';
import Context from '@context/context.js';
import './profile_info_data.less';

class Profile_Info_Data extends Component {

    constructor(props) {

        super(props);

        Profile_Info_Data.contextType = Context;

        let {owner_user_account} = this.props;

        this.state = {
            owner_user_account,
            info_templates: {},
            editors: {}
        };
    }

    async componentDidMount(){

        //Account_Info_Data_Template is located at the Data_Templates folder
        let {Account_Info_Data_Template} = this.context.Account_Data_Templates;

        let info_templates = await Account_Info_Data_Template(null);

        this.setState({info_templates});
        
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props === prevProps) {
            return;
        }

        this.setState(this.props);
        
    }
    
    render(){
        
        const { Drag_Scroll } = this.context;
        
        let drag_scroll = new Drag_Scroll();
        
        let infoWrapperRef = createRef();
        
        let {refresh_account_data, change_main_display } = this.props;

        let {owner_user_account, editors} = this.state;
        
        return (
            <div id="profile-info-data">

                <div id="profile-data-label-wrapper">

                    <label>
                        <u>Details</u>
                    </label>

                </div>

                {/*this is just a gap for decoration*/}
                <div id="gap">

                    <div id="left"></div>

                    <div id="right">


                    </div>

                </div>

                <div id="info-wrapper"

                    ref={infoWrapperRef}

                    onMouseDown={(e) => {
                        drag_scroll.init_drag(e, infoWrapperRef.current);
                    }}

                    onMouseLeave={(e) => {
                        drag_scroll.disable_drag(e, infoWrapperRef.current);
                    }}

                    onMouseUp={(e) => {
                        drag_scroll.disable_drag(e, infoWrapperRef.current);
                    }}

                    onMouseMove={(e) => {
                        drag_scroll.move_drag(e, infoWrapperRef.current);
                    }}
                >

                    {Object.keys(this.state.info_templates).map((key, index) => {

                        const template = this.state.info_templates[key];

                        const Com = template.component;
                        let value = owner_user_account[key];
                        let { label, options } = template;
                        let editor = editors[key] || null;

                        return <div className="individual-info-wrapper" key={index}>

                            <div id="info-label">

                                {label}

                            </div>

                            <div id="info-value">

                                <Com variable_name={key}
                                    value={value}
                                    label={label}
                                    Editor={editor}
                                    owner_user_account={owner_user_account}
                                    refresh_account_data={refresh_account_data}
                                    options={options}
                                    change_main_display={change_main_display}
                                />

                            </div>

                        </div>;

                    })}

                </div>

            </div>
        );
    }
}

export default Profile_Info_Data;