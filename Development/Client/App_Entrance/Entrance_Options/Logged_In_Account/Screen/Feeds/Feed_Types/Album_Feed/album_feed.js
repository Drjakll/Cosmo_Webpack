import React, {Component} from 'react';
import Context from '@context/context.js';
import './album_feed.less';

class Album_Feed extends Component {

    static contextType = Context;

    constructor(props){

        super(props);

        let {owner_user_account} = props;

        this.state = {
            owner_user_account,
            photos_data: [],
            album_info: {}
        };
    }

    async componentDidMount(){

        let {feed_id} = this.props;

        this.Get_Album_Update_Info(feed_id);
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
    }

    Get_Album_Update_Info = async (feed_id)=>{

        let {get_album_update_logs} = this.context.Request_URLs;

        let body = {id: feed_id};

        let data = await(await fetch(
            get_album_update_logs,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type':'application/json'
                }
            }
        )).json();

        if(!data){
            return;
        }

        let {photos, album_info} = data;

        this.setState({
            photos_data: photos,
            album_info
        });
    }

    render(){

        return (
            <div id="album-feed">

                

            </div>
        )
    }
}

export default Album_Feed;