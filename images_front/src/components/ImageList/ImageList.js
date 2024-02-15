import './ImageList.css';
import React, { Component } from 'react';
import axios from 'axios';
import Image from './Image';
import { Button, Spinner } from 'react-bootstrap';

class ImageList extends Component {
    state = { 
        images: [],
        visible: 3,
        isLoading: true,
        loadingMore: false,
     } 

    componentDidMount() {
        setTimeout(this.getImages, 1500)
    } 

    getImages = () => {
        axios.get('http://127.0.0.1:8000/api/images/', {
            headers: {
                'accept': 'application/json'
            }
        })
        .then(resp => {
            this.setState({images: resp.data})
            console.log(resp)
        })
        .catch((err) => {
            console.error(err)
        })
        this.setState({isLoading: false})
    }

    handleVisible = () => {
        let visible = this.state.visible
        let new_visible = visible + 2
        this.setState({loadingMore: true})
        setTimeout(() => {
            this.setState({
                visible: new_visible,
                loadingMore: false,
            })
        }, 300);
    }

    render() {
        let images = this.state.images.slice(0, this.state.visible).map(img => {
            return <Image key={img.id} picture={img.picture} classification={img.classified} />
        }) 
        return (
            <div className='wrapper'>
                {this.state.isLoading ?
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                :
                <>  
                    {this.state.images.length === 0 ?
                        <h1>No images classified</h1>
                    :
                    <>
                        {images}
                        {this.state.loadingMore ?
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        :
                        <>
                            {this.state.images.length > this.state.visible ?
                            <Button variant='primary' size='lg' onClick={this.handleVisible}>Load More</Button>
                            :
                            <p>There are no more images to load</p>
                            }
                        </>
                        }
                    </>
                    }
                </>
                }
            </div>
        );
    }
}
 
export default ImageList;