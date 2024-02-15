import React from 'react';
import { Card } from 'react-bootstrap';

const Image = (props) => {
    return ( 
        <Card style={{ width: '30rem' }} className='mx-auto mb-2'>
        <Card.Img variant="top" src={props.picture}/>
        <Card.Body>
            <Card.Title>Classified as: {props.classification}</Card.Title>
        </Card.Body>
        <Card.Body></Card.Body>
        </Card>
     );
}
 
export default Image;