import React,{useEffect,useState} from 'react'
import './WatchlistPage.css';
import { Button } from 'antd';
import axios from 'axios';
const WatchlistPage = () => {
    const vairables = {
        userFrom: localStorage.getItem('userId')
    }
    const [favoritedMovie,setfavoritedMovie] = useState([]);
    useEffect(() => {
        fectchWatchlist();
    },[])
    const fectchWatchlist = () => {
        axios.post('api/favorite/getFavoritedMovie', vairables)
            .then(res => {
                if(res.data.success){
                    setfavoritedMovie(res.data.favorites);
                } else {
                    alert('Failed to get watchlist movies');
                }
            })
    }
    const handleRemove = (movieId) => {
        const load = {
            movieId: movieId,
            userId: localStorage.getItem('userId')
        }
        axios.post('api/favorite/removeFromFavorite', load)
                .then(res => {
                    if(res.data.success){
                        fectchWatchlist();
                    } else{
                        alert('Failed to remove from Watchlist');
                    }
                })
    }
    const renderTableBody = favoritedMovie.map((movie,index) => {
        return <tr>
            <td>{movie.movieTitle}</td>
            <td>{movie.movieRunTime}</td>
            <td><Button onClick={()=>handleRemove(movie.movieId)}>Remove from watchlist</Button></td>
        </tr>
    })
    return (
        <div style={{width: '85%',margin: '3rem auto'}}>
            <h2 style={{color: '#00d7e1'}}>Movies added to Watchlist</h2>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <th>Remove from watchlist</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody}
                </tbody>
            </table>
        </div>
    )
}

export default WatchlistPage;
