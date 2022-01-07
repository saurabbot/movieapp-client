import React from 'react'
import {Col} from 'antd';
const GridCard = (props) => {
        if(props.actor){
            return (
                <Col  lg={6} md={8} xs={24} style={{padding: '30px'}}>
                    <div style={{ position: 'relative' }}>
                            <img style={{borderRadius: '60px', width: '100%', height: '320px' }} alt='img' src={props.image} />
                            <h4>{props.name}</h4>
                    </div>
                </Col>
            )
        } else {
            return (
                <Col  lg={6} md={8} xs={24} style={{padding: '30px'}}>
                    <div style={{ position: 'relative' }}>
                        <a href={`/movie/${props.movieId}`} >
                            <img style={{borderRadius: '60px', width: '100%', height: '320px' }} alt='img' src={props.image} />
                            <h5 style={{position: 'absolute'}}>{props.movieName}</h5>
                        </a>
                        
                    </div>
                </Col>
            ) 
        }
}

export default GridCard;