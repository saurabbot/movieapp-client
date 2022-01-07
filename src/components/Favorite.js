import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { Button } from 'antd'
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
        
        axios.post('api/favorite/favoriteNumber', variable)
            .then(res => {
                if(res.data.sucess){
                    setfavoriteNumber(res.data.subscribeNumber);
                } else{
                    alert('Failed to get favorite Number')
                }
            })
        axios.post('api/favorite/favorited', variable)
            .then(res => {
                if(res.data.success){
                    setfavorited(res.data.subscribed)
                } else {
                    alert('Failed to get Favorite info');
                }
            })
    },[])
    const onClickWatch = () => {
        if(favorited){
            axios.post('api/favorite/removeFromFavorite', variable)
                .then(res => {
                    if(res.data.success){
                        setfavoriteNumber(favoriteNumber-1);
                        setfavorited(!favorited);
                    } else{
                        alert('Failed to remove from Watchlist');
                    }
                })
        } else {
            axios.post('api/favorite/addToFavorite', variable)
                .then(res => {
                    if(res.data.success){
                        setfavoriteNumber(favoriteNumber+1);
                        setfavorited(!favorited);
                    } else{
                        alert('Failed to add to Watchlist');
                    }
                })
        }
    }
    return (
        <div style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
            <Button onClicl={onClickWatch}style={{postion: 'relative', width: '400px',margin: '20px',borderRadius: '30px'}}>{favorited ? "remove from watchlist" : "Add to watchlist  "}{favoriteNumber} people have added it to watchlist</Button>
        </div>
    )
}

export default Favorite;
