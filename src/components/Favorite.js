import React,{useEffect,useState,useSelector} from 'react';
import axios from 'axios';
import { Button,Progress } from 'antd'
const Favorite = (props) => {
    const [favoriteNumber,setfavoriteNumber] = useState(0);
    const [favorited,setfavorited] = useState(false);
    const variable ={
        userFrom: props.userFrom,
        movieId : props.movieId,
        movieTitle: props.movieInfo.original_title,
        moviePost: props.movieInfo.backdrop_path,
        movieRunTime : props.movieInfo.runtime
    }
    useEffect(() => {
        
        axios.post('https://movieappfasal.herokuapp.com/api/favorite/favoriteNumber', variable)
            .then(res => {
                setfavoriteNumber(res.data.subscribeNumber);
            })
        axios.post('https://movieappfasal.herokuapp.com/api/favorite/favorited', variable)
            .then(res => {
                setfavorited(res.data.subscribed)
            })
    },[])
    const onClickWatch = () => {

        if(favorited){
            axios.post('https://movieappfasal.herokuapp.com/api/favorite/removeFromFavorite', variable)
                .then(res => {
                    setfavoriteNumber(favoriteNumber-1);
                    setfavorited(!favorited);
                })
        } else {
            axios.post('https://movieappfasal.herokuapp.com/api/favorite/addToFavorite', variable)
                .then(res => {
                    setfavoriteNumber(favoriteNumber+1);
                    setfavorited(!favorited);
                })
        }
    }
    return (
        <div style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
            <Button onClick={onClickWatch}style={{postion: 'relative', width: '400px',margin: '20px',borderRadius: '30px'}}>
                {
                    favorited ? "Remove from Watchlist" : "Add to Watchlist"
                }
            </Button>
            <Progress type="circle" percent={favoriteNumber} format={percent => `${favoriteNumber} people`} />
            <h4>Have added it to their watchlist</h4>

        </div>
    )
}

export default Favorite;
