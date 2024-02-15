import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './Classifier.css';
import { Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

class Classifier extends Component {
    state = {
        files: [],
        isLoading: false,
    }

    // componentDidMount() {
    //     this.getImages()
    // } 
    // getImages = () => {
    //     axios.get('http://127.0.0.1:8000/api/images/', {
    //         headers: {
    //             'accept': 'application/json'
    //         }
    //     })
    //     .then(resp => {
    //         console.log(resp)
    //     })
    //     .catch((err) => {
    //         console.error(err)
    //     })
    // }

    onDrop = (files) => {
        this.setState({
            isLoading: true,
        })
        this.loadImage(files)
    }

    loadImage = (files) => {
        setTimeout(() => {
            this.setState({
                files,
                isLoading: false
            }, () => {
                console.log(this.state.files)
            })
        }, 1000);

    }

    sendImageHandler = () => {
        let formData = new FormData()
        formData.append('picture', this.state.files[0], this.state.files[0].name)
        axios.post('http://127.0.0.1:8000/api/images/', formData, {
            headers: {
                'accept': 'application/json',
                'content-type': 'multipart/form-data'
            }
        })
        .then(resp => {
            console.log(resp)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    render() { 
        const files = this.state.files.map(file => (
            <li key={file.name}>
                {file.name} - {file.size} bytes
            </li>
        ));
        return (
            <Dropzone onDrop={this.onDrop} >
                {({isDragActive, getRootProps, getInputProps}) => (
                <section className="container">
                    <div {...getRootProps({className: 'dropzone back'})}>
                        <input {...getInputProps()} />
                        <p className='text-muted'>{isDragActive ? "Drop some images" : "Drag 'n' drop some files here, or click to select files"}</p>
                    </div>
                    <aside>
                        {files}
                    </aside>
                    {this.state.files.length > 0 &&
                        <Button variant='info' size='lg' className='mt-3' onClick={this.sendImageHandler}>Select Image</Button>
                    }
                    {this.state.isLoading &&
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    }
                </section>
                )}
            </Dropzone>
        );
    }
}
 
export default Classifier;