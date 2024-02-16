import './ImageList.css';
import React, { Component } from 'react';
import axios from 'axios';
import Image from './Image';
import { Button, Spinner } from 'react-bootstrap';

//se obtienen las imagenes guardadas en la base de datos, se muestran las más recientes,
//pudiendo mostrarse más a petición del usuario
class ImageList extends Component {
    state = {
        //las imagenes obtenidas del backend 
        images: [],
        //inicialmente, solo se ven las 3 últimas clasificadas
        visible: 3,
        //se está esperando por la carga de algún elemento
        isLoading: true,
        //se está esperando por la carga de nuevas imágenes
        loadingMore: false,
     } 

    //una vez el componente se monta, se solicitan las imágenes     
    componentDidMount() {
        this.getImages()
    } 

    //se piden las imagenes al backend
    getImages = () => {
        axios.get('http://127.0.0.1:8000/api/images/', {
            headers: {
                'accept': 'application/json'
            }
        })
        .then(resp => {
            this.setState({
                //se guardan en el estado las imagenes enviadas por el backend
                images: resp.data,
                //se indica que ya se tienen las imagenes para renderizarlas
                isLoading: false,
            })
        })
        .catch((err) => {
            console.error(err)
        })
    }

    //función asociada a un botón para poder ampliar de 2 en 2 las imagenes que se muestran
    handleVisible = () => {
        let visible = this.state.visible
        let new_visible = visible + 2
        this.setState({
            //se indica que se están cargando nuevas imágenes
            loadingMore: true,
            visible: new_visible,
        })
        //aquí se debería comprobar que las imágenes están listas para ser mostradas
        this.setState({
            loadingMore: false,
        })
    }

    //Se muestra la cantidad de imágenes controlada por la variable de estado visible.
    //Se pasa la información mediante props al componente Image.
    //Se emplean spinners para indicar al usuario que hay procesos en marcha. 
    //Cuando no hay procesos en marcha se muestra al usuario un botón para poder solicitar más
    //imágenes, si es que aún quedan imagenes por mostrar.
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