import { useEffect, useState } from 'react';
import Header from './Header';
function ApiTest() {
    let [srchKey, setSrchKey] = useState('');
    let [dicData, setDicData] = useState([]);
    let [marvelData, setMarvelData] = useState([]);
    let [movieData, setMovieData] = useState([]);
    // useEffect(async ()=>{
        
    //     await fetch('http://www.omdbapi.com/?apikey=88be7f67&t=blade')
    //     .then((response)=>response = response.json()).then((res)=>console.log(res));
        
    // } ,[])
    
    async function showDic() {
        // let res = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+srchKey);
        // res = await res.json();
        // setDicData(res[0]);
            
            await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+srchKey)
            .then((response) => response.json())
            .then((res) => {
                setDicData(res[0]);
            });
    }

    function triggerSrch(e) {
        if(e.key === 'Enter') {
            showDic();
        }
    }

    async function showMarvel() {
        await fetch('https://gateway.marvel.com:443/v1/public/characters?name='+srchKey+'&apikey=101ba341ca52b7d6d3b97f27e997ceb6')
        .then((response)=>response = response.json())
        .then((res)=>{
            setMarvelData(res.data.results[0]);
        })
        .catch((error)=>{
            setMarvelData(error);
        });
    }

    function triggerMS(e) {
        if(e.key === 'Enter') {
            showMarvel();
        }
    }

    async function findMovie() {
        await fetch('http://www.omdbapi.com/?apikey=88be7f67&t='+srchKey)
        .then((response)=>response = response.json())
        .then((res) => {
            setMovieData(res);
        });
    }

    function triggerMov(e) {
        if(e.key === 'Enter') {
            findMovie();
        }
    }

    return(
        <>
            <Header />
            <div className = 'container' style={{'paddingBottom':'1.5em','paddingTop':'2em'}}>
                <h1 align="center">Dictionary</h1>
                <div style={{'padding':'1em','display':'flex','justifyContent':'center','width':'100%','minHeight':'10em','alignItems':'center'}}>
                <input type="text" onChange={(e)=>setSrchKey(e.target.value)} onKeyPress={(e)=>triggerSrch(e)} placeholder="Search in Dictionary" style={{'width':'20em','padding':'.4em','borderRadius':'5px','outline':'none','border':'1px black solid','marginRight':'.5em'}} />
                <button className="btn btn-primary" onClick={showDic}>Search</button>
                </div>
                <div style={{'display':'flex','flexDirection':'column','alignItems':'center'}}>
                {
                    dicData && dicData.word ?
                    <div align="left" style={{'fontSize':'15pt'}}>
                    <span style = {{'display':'block','fontWeight':'bold','fontSize':'20pt'}} align='center' >{dicData.word.toUpperCase()}
                    <br />

                    <audio controls autoPlay={true}>
                        <source src={dicData.phonetics[0].audio} type="audio/ogg" />
                        <source src={dicData.phonetics[0].audio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    
                    </span>
                    <span style={{'fontWeight':'bold'}}>Meaning:</span> {dicData.meanings[0].definitions[0].definition} <br />
                    <span style={{'fontWeight':'bold'}}>Example:</span> {dicData.meanings[0].definitions[0].example} <br />
                    
                    </div>
                    :  <b>Nothing to show</b>
                }
                </div>

                <div style={{'paddingTop':'4em'}}>

                <h1 align="center">Marvel Dictionary</h1>
                <div style={{'padding':'1em','display':'flex','justifyContent':'center','width':'100%','minHeight':'10em','alignItems':'center'}}>
                    <input type="text" onChange={(e)=>setSrchKey(e.target.value)} onKeyPress={(e)=>triggerMS(e)}  placeholder="Search in Dictionary" style={{'width':'20em','padding':'.4em','borderRadius':'5px','outline':'none','border':'1px black solid','marginRight':'.5em'}} />
                    <button className="btn btn-primary" onClick={showMarvel}>Search</button>
                </div>
                <div>
                    {
                        marvelData && marvelData.message ? "No such charavter in the comic" :  marvelData && marvelData.name ?
                        <div>
                            <span style={{'fontWeight':'bold','fontSize':'20pt'}}>{marvelData.name}</span>
                            <p>
                                {marvelData.description}
                            </p>
                            <div>
                                <b>Series</b>
                                <ul>
                                    {

                                        marvelData.series.items.map((item) => 
                                            <li>{item.name}</li>
                                        )

                                    }
                                </ul>
                            </div>
                        </div> : <div align='center'><b>Nothing to show</b></div>
                    }
                </div>
                </div>


            <div style={{'paddingTop':'4em'}}>

                <h1 align="center">Movies Search</h1>
                <div style={{'padding':'1em','display':'flex','justifyContent':'center','width':'100%','minHeight':'10em','alignItems':'center'}}>
                    <input type="text" onChange={(e)=>setSrchKey(e.target.value)} onKeyDown={(e)=>triggerMov(e)} placeholder="Search for movies" style={{'width':'20em','padding':'.4em','borderRadius':'5px','outline':'none','border':'1px black solid','marginRight':'.5em'}} />
                    <button className="btn btn-primary" onClick={findMovie}>Search</button>
                </div>
                {
                    movieData && movieData.Title ?
                    
                    <div >
                        <div style={{'display':'flex','alignItems':'flex-start'}}>
                            <div>
                            <img src={movieData.Poster} alt="error404" style={{'maxHeight':'30vh','padding':'1em'}} />
                            <span style={{'fontWeight':'bold','fontSize':'20pt','display':'block','paddingLeft':'.5em'}}>{movieData.Title}</span>
                            </div>
                            <div style={{'paddingTop':'1em'}}>
                                <b>Actors: </b>{movieData.Actors}<br />
                                <b>Country: </b>{movieData.Country}<br />
                                <b>Director: </b>{movieData.Director}<br />
                                <b>Genre: </b>{movieData.Genre}<br />
                                <b>Language: </b>{movieData.Language}<br />
                                <b>Run Time: </b>{movieData.Runtime}<br />
                                <b>Released: </b>{movieData.Released}<br />

                                {
                                    movieData.Ratings.map((rating) => 
                                        <span style={{'display':'inline-block','border':'2px solid rgba(0,0,0,0.4)','padding':'.5em'}} align="center"><span style={{'borderBottom':'1px solid black','fontWeight':'bold'}}>{rating.Source}</span><br />{rating.Value}</span>
                                    )
                                }
                            </div>
                        </div>        
                        <p style={{'paddingLeft':'1em'}}>
                           {movieData.Plot}
                        </p>
                    </div> 
                    
                    : <div align='center'><b>Nothing to show</b></div>
                    
                }

            </div>

            </div>
        </>
    );
}
export default ApiTest;