import React,{useEffect,useState} from 'react'
import {List,Avatar,Row,Col,Button,Descriptions} from 'antd';
import {API_KEY,IMAGE_BASE_URL,API_URL,IMAGE_SIZE,POSTER_SIZE} from '../../Config';
import GridCard from '../../GridCard';
import JumboImage from '../../jumboImage';
import Favorite from '../../Favorite';

const DetailPage = (props) => {
    const [movie,setMovie] = useState([]);
    const [cast,setCast] = useState([]);
    const movieId = props.match.params.movieId;
    useEffect(() => {
        const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        fetchMovieInfo(endpoint);
    })
    const fetchMovieInfo = (path) => {
        fetch(path)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setMovie(res);
                let endpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
                fetch(endpoint)
                    .then(res => res.json())
                    .then(res => {
                        setCast(res.cast);
                    }) 
            })
    }
    return (
        <div>
            {movie &&
                <JumboImage 
                image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${movie.backdrop_path}`} 
                title={movie.original_title} 
                text={movie.overview}
                /> 
                    
            }
            <Favorite userFrom={localStorage.getItem('userId')} movieId={movieId} movieInfo={movie}/>
            <div style={{display: 'flex',alignItem: 'center',justifyContent: 'center'}}>
                <Descriptions title="Movie Info" bordered>
                    <Descriptions.Item label="Title">{movie.original_title}</Descriptions.Item>
                    <Descriptions.Item label="release_date">{movie.release_date}</Descriptions.Item>
                    <Descriptions.Item label="revenue">{movie.revenue}</Descriptions.Item>
                    <Descriptions.Item label="runtime">{movie.runtime}</Descriptions.Item>
                    <Descriptions.Item label="vote_average" span={2}>
                    {movie.vote_average}
                    </Descriptions.Item>
                    <Descriptions.Item label="vote_count">{movie.vote_count}</Descriptions.Item>
                    <Descriptions.Item label="status">{movie.status}</Descriptions.Item>
                    <Descriptions.Item label="popularity">{movie.popularity}</Descriptions.Item>
                </Descriptions>
            </div>
            <Row gutter={[16,16]}>
                {cast && cast.map((cast,index) => (
                    <React.Fragment key={index}>
                        { cast.profile_path && 
                            <GridCard 
                            actor image={`${IMAGE_BASE_URL}w500${cast.profile_path}`}
                            name ={cast.characterName}
                            />
                        }
                        
                    </React.Fragment>
                ))}
            </Row>
        </div>
    )
}

export default DetailPage
