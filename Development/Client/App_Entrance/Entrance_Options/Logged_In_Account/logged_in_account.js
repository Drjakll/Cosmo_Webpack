import React, {Component} from 'react';
import Screen from './Screen/screen.js';
import Upper_Bar from './Upper_Bar/upper_bar.js';
import './logged_in_account.less';


class Logged_In_Account extends Component {
    
    Button_Data = [
        "Empty",
        "Explore",
        "Profile",
        "Connections",
        "News",
        "Empty"
    ];
    
    constructor(props){
        
        super(props);

        this.state = {
            Columns: [
                {screen: "Empty", is_main: false, id: "Empty"},
                { screen: "Explore", is_main: false, id: "Explore" },
                { screen: "Profile", is_main: true, id: "Profile" },
                { screen: "Connections", is_main: false, id: "Connections" },
                { screen: "News", is_main: false, id: "News" },
                { screen: "Empty", is_main: false, id: "Empty" }
            ],
            account_data: this.props.account_data
        };
    }

    componentDidMount() {

        this.RotateScreen(2);
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState({account_data: this.props.account_data});
    }
    
    //This function is to change the main screen. Also changes the left and right screen.
    RotateScreen = async (focus) => {

        let { Columns, Orders } = this.state;

        for (let i in Columns) {

            Columns[i].is_main = false;
        }

        Columns[focus].is_main = true;


        await this.setState({
            Columns: Columns,
            Orders: Orders
        });

        document.querySelector(`#${this.Button_Data[focus]}`).scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
        });

    }
    
    render(){
        
        let main_options = <div id="logged-in-option-buttons">

            {this.Button_Data.map((value, index) => {

                return value === "Empty" ? <></> :
                    <div className="logged-in-option-button"
                        key={index}
                        onClick={(e) => {
                            this.RotateScreen(index);
                        }}>

                        {value}

                    </div>;

            })}

        </div>;
                            
        
        return (
            <div id="logged-in-account">

                <div id="upper-bar-wrapper">

                    <Upper_Bar/>

                </div>

                <div id="logged-in-columns-wrapper" >

                    {this.state.Columns.map((info, index) => {

                        return <div className={`logged-in-column ${info.is_main ? "main" : ""}`} id={info.id} key={index}>

                            <div className="screen-wrapper">

                                <Screen account_data={this.state.account_data} screen_type={info.screen} />

                            </div>

                            {info.is_main ? main_options : <></>}

                        </div>;

                    })}

                </div>

            </div>
        );
    }
}

export default Logged_In_Account;