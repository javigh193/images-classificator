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
        this.getImages()
    } 

    getImages = () => {
        axios.get('http://127.0.0.1:8000/api/images/', {
            headers: {
                'accept': 'application/json'
            }
        })
        .then(resp => {
            this.setState({
                images: resp.data,
                isLoading: false,
            })
        })
        .catch((err) => {
            console.error(err)
        })
    }

    handleVisible = () => {
        let visible = this.state.visible
        let new_visible = visible + 2
        this.setState({
            loadingMore: true,
            visible: new_visible,
        })
        // Aquí se debería comprobar que las imágenes están listas para ser mostradas
        this.setState({
            loadingMore: false,
        })
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