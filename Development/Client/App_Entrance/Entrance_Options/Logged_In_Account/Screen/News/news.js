import React, {Component} from 'react';
import Context from '@context/context.js';
import Post_News from './News_Types/Post_News/post_news.js';
import './news.less';

class News extends Component {

    static contextType = Context;

    Last_Render_Callback = [];
    
    constructor(props){
        
        super(props);

        let {connection_list, owner_user_account} = props;

        this.state = {
            connection_list,
            owner_user_account,
            news_updates: [],
            news_types: {},
            render_callback: this.Render_Main_Display
        };
    }

    async componentDidMount(){

        await this.setState({
            news_updates: await this.Get_User_News_Updates(this.state.connection_list),
        });
    }

    async componentDidUpdate(prevProps, prevState){

        if(prevProps === this.props){
            return;
        }

        let stateObj = {};

        for(let i in this.props){
            stateObj[i] = this.props[i];
        }
        
        stateObj.news_updates = await this.Get_User_News_Updates(this.props.connection_list);
        
        this.setState(stateObj);

    }

    Get_User_News_Updates = async (connection_list) => {

        if(!connection_list){
            return [];
        }

        let {get_user_news_updates} = this.context.Request_URLs;

        let body = {
            connection_list
        };

        let data = await(await fetch(get_user_news_updates,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': "application/json"
                }
            }
        )).json();

        if(data){

            let {results} = data;

            for(let i in results){

                results[i].news_data = await JSON.parse(results[i].news_data) || {};

            }

            return results;
        }

        return [];
    }

    Render_Main_Display = () => {

        let {news_updates} = this.state;

        return <div id="news">

            <div id="news-updates-headline">

                News Updates

            </div>

            <div id="news-updates">

                {news_updates?.map((data, index)=>{

                    let {news_type, news_data, time_created} = data;

                    return (<div className="news-update-section">

                        {this.News_Types[news_type]({news_data})}

                    </div>);

                })}

            </div>
            
        </div>;

    }

    Change_Display = (render_callback) => {

        this.Last_Render_Callback.push(this.state.render_callback);
        
        this.setState({render_callback});
    }

    Render_With_Go_Back_Button = () => {

        let {render_callback} = this.state;

        let Go_Back = (e) => {

            if(this.Last_Render_Callback.length === 0){
                return;
            }

            let last_callback = this.Last_Render_Callback.pop();

            this.setState({render_callback: last_callback});

        }   

        return <div id="contents">

            <div id="go-back-button" onClick={Go_Back}>

                Back

            </div>

            {render_callback()}

        </div>;

    }

    News_Types = {
        "post": ({news_data})=>{

            let {owner_user_account} = this.state;

            let {owner_email} = news_data;

            return <Post_News 
                owner_user_account={{email: owner_email}} 
                visitor_user_account={owner_user_account} 
                post={news_data}
                change_display={this.Change_Display}
            />;
        },
        "album_updates": ()=>{
            
        }
    }
    
    render(){

        let {render_callback} = this.state;
        
        return (
            <div id="display-wrapper">

                {render_callback === this.Render_Main_Display ? render_callback() : this.Render_With_Go_Back_Button()}

            </div>
        );
    }
}

export default News;