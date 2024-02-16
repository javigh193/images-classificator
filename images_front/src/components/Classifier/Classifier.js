import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './Classifier.css';
import { Alert, Button, Spinner, Image } from 'react-bootstrap';
import axios from 'axios';

//el clasificador es el componente encargado de recibir las imagenes del usuario
//y enviarlas al backend para que realice la clasificación y las guarde
class Classifier extends Component {
    state = {
        //las imagenes cargadas para ser clasificadas
        files: [],
        //el componente está preparando algún elemento para renderizarlo
        isLoading: false,
        //se cargó una imagen recientemente
        recentImage: null,
    }

    //evento al soltar una imagen en la zona habilitada para ello
    onDrop = (files) => {
        this.setState({
            files: [],
            isLoading: true,
            recentImage: null,
        })
        this.loadImage(files)
    }

    //incluye la imagen en el estado del componente
    loadImage = (files) => {
        this.setState({
            files,
            isLoading: false
            })
    }

    //cuando se está esperando por algún elemento se activa un spinner para
    //que el usuario tenga una referencia visual
    activateSpinner = () => {
        this.setState({
            files: [],
            isLoading:true
        })
    }

    deactivateSpinner = () => {
        this.setState({isLoading:false})
    }

    //función asociada al botón de guardar imagen
    //envía la imagen al backend para que la clasifique y la guarde en la base de datos
    //axios permite trabajar de manera análoga a fetch, pero de manera más eficiente con 
    //el compromiso de trabajar en json
    sendImageHandler = () => {
        this.activateSpinner()
        let formData = new FormData()
        formData.append('picture', this.state.files[0], this.state.files[0].name)
        axios.post('http://127.0.0.1:8000/api/images/', formData, {
            headers: {
                'accept': 'application/json',
                'content-type': 'multipart/form-data'
            }
        })
        .then(resp => {
            //solicitud de la imagen ya clasificada
            this.getImageClass(resp)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    //una vez la imagen ha sido clasificada, se la solicitamos al backend
    getImageClass = (obj) => {
        axios.get(`http://127.0.0.1:8000/api/images/${obj.data.id}/`, {
            headers: {
                'accept': 'application/json',
                'content-type': 'multipart/form-data'
            }
        })
        .then(resp => {
            //la imagen pasa a ser la guardada recientemente, se muestra
            this.setState({ recentImage: resp })
        })
        .catch((err) => {
            console.error(err)
        })
        this.deactivateSpinner()
    }

    //La información mostrada depende del estado del flujo de procesamiento de imágenes
    //los botones solo aparecen cuando se dan las condiciones para poder ejecutar las funciones
    //asociadas a los mismos, se emplean spinners para indicar que hay procesos en curso.
    //Solo se muestra una imagen al mismo tiempo, la última en ser clasificada en esta sesión.
    render() { 
        let files = this.state.files.map(file => (
            <p key={file.name}>
                {file.name} - {file.size} bytes
            </p>
        ));
        return (
            <Dropzone onDrop={this.onDrop} className='App'>
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
                        <Button variant='info' size='lg' className='mt-3' onClick={this.sendImageHandler}>Save Image</Button>
                    }
                    {this.state.isLoading &&
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    }
                    {this.state.recentImage &&
                    <>
                        <Alert variant='primary'>
                            {this.state.recentImage.data.classified}
                        </Alert>
                        <Image className='justify-content-center'
                            src={this.state.recentImage.data.picture}
                            height='200'
                            rounded
                        />
                    </>
                    }
                </section>
                )}
            </Dropzone>
        );
    }
}
 
export default Classifier;