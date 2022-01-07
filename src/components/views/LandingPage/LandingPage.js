import React,{useEffect,useState}from 'react'
import {API_KEY,IMAGE_BASE_URL,API_URL,IMAGE_SIZE,POSTER_SIZE} from '../../Config';
import JumboImage from '../../jumboImage';
import GridCard from '../../GridCard';
import {Typography,Row,Button,Input} from 'antd';
const {Title} = Typography;

function LandingPage() {
    const [movie,setMovies] = useState([]);
    const [curPage,setCurPage] = useState([]);
    const [keyword,setKeyword] = useState([]);
    const [searchQuery, updateSearchQuery] = useState([]);
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint);
    },[])
    const fetchMovies = (path) => {
        fetch(path)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setMovies([...movie,...res.results]);
                setCurPage(res.page);
            })
    }
    const fetchMoviesForSearch = (path) => {
        fetch(path)
            .then(res => res.json())
            .then(res => {
                setMovies(res.results);
                setCurPage(res.page);
            })
    }
    const handleClick = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${curPage+1}`;
        fetchMovies(endpoint);
    }
    const handleSearch = () => {
        const endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=1`;
        fetchMoviesForSearch(endpoint);
    }
    const onTextChange = (event) => {
        updateSearchQuery(event.target.value);
    }
    return (
        <>
            {movie[0] && 
                <JumboImage image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${movie[0].backdrop_path}`} title={movie[0].original_title} text={movie[0].overview}/>
            }
            <div style={{width: '100%',margin: 0}}>
                    <div style={{width: '85%',margin: 'lrem auto'}}>
                        <div style={{display: 'flex',alignItems: 'center',justifyContent: 'space-between'}}>
                            <Title level ={2}>Movies By Latest</Title>
                            <div className="searchBar">
                                <Input style={{width: '480px',height: '30px',borderRadius: '20px',margin: '20px'}}placeholder='search a movie' value={searchQuery} onChange={onTextChange}/>
                                <Button onClick={handleSearch} style={{fontWeight: '400',borderRadius: '10px'}}>Search</Button>
                                
                            </div>
                        </div>
                        <hr />
                        <div style={{display: 'flex',justifyContent: 'space-between'}}>
                            <div>
                            {movie && movie.map((movie, index) => (
                                <React.Fragment key={index}>
                                    {movie.original_title && 
                                        <GridCard
                                        image={movie.poster_path ?
                                            `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                            : null}
                                        movieId={movie.id}
                                        movieName={movie.original_title}
                                    />
                                    }
                                    
                                </React.Fragment>
                            ))}
                            </div>
                        </div>
                        
                        <br />
                        <div style={{display: 'flex',justifyContent: 'center'}}>
                            <Button
                            onClick={handleClick}>
                                Load More
                            </Button>
                            
                        </div>

                    </div>
                </div>
        </>
    )
}

export default LandingPage
