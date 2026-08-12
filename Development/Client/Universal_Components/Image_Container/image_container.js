import React, {Component} from 'react';
import Request_URLs from '@request_urls';
import './image_container.less';
import { Grid } from 'react-window';

const column_count = 5;

class Image_Container extends Component {

    constructor(props){

        super(props);

        let {images, columns} = props;

        this.columnCount = columns || column_count;

        this.state = {
            images,
            grid_height: 0,
            grid_width: 0
        };
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        let {images} = this.props;

        this.setState({
            images
        });

    }

    Generate_Images = ({columnIndex, rowIndex, style, photos, columnCount}) => {

        const index = rowIndex * columnCount + columnIndex;

        let photo = photos[index];

        const {link, custom_frame} = photo || {};

        return link ? 
        
            <div className="image-wrapper" style={{...style}}>
    
                {custom_frame ? 

                    custom_frame({photo, index}) 
                    
                    : 

                    this.Uploading_Progress_Frame({photo, index})
                }

            </div> 
            
            :

            "";

    }

    Uploading_Progress_Frame = ({photo, index})=>{

        const {aws_s3_url} = Request_URLs;
        
        let {completed, link} = photo;

        const full_url = `${aws_s3_url}${link}`;

        return <div id="picture-wrapper" key={index}>

            <div id="uploading-progress">
                
                <div id="progress-display">

                    <div id="percentage" style={{width: `${completed > 10 ? completed : 20}%`}} >

                        {`${completed}%`}

                    </div>

                </div>

            </div>

        </div>;
    }

    render(){

        let {images} = this.state;

        return <div id="image-container-wrapper" >

            <Grid
                cellComponent={this.Generate_Images}
                cellProps={{
                    photos: images,
                    columnCount: this.columnCount
                }}
                columnCount={this.columnCount}
                columnWidth={`${100/this.columnCount}%`}
                rowCount={Math.ceil(images.length / this.columnCount)}
                rowHeight={200}
                style={{
                    height: "100%",
                    width: "100%"
                }}
            />

        </div>;

    }
}

export default Image_Container;