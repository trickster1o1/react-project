import { useEffect, useState } from 'react';
import Header from './Header';
function ApiTest() {
    let [srchKey, setSrchKey] = useState('');
    let [dicData, setDicData] = useState([]);
    // useEffect(async ()=>{
    //     let res = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/hello")
    //     res = await res.json();
    //     console.log(res[0].word);
    // } ,[])
    
    async function showDic() {
        let res = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+srchKey);
        res = await res.json();
        setDicData(res[0]);
        console.log(dicData);
    }

    function triggerSrch(e) {
        if(e.key === 'Enter') {
            showDic();
        }
    }

    return(
        <>
            <Header />
            <div className = 'container' style={{'paddingBottom':'34em','paddingTop':'2em'}}>
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

                    <audio controls autoPlay="true">
                        <source src={dicData.phonetics[0].audio} type="audio/ogg" />
                        <source src={dicData.phonetics[0].audio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    
                    </span>
                    <span style={{'fontWeight':'bold'}}>Meaning:</span> {dicData.meanings[0].definitions[0].definition} <br />
                    <span style={{'fontWeight':'bold'}}>Example:</span> {dicData.meanings[0].definitions[0].example} <br />
                    
                    </div>
                    : <b>The word doesn't exist</b>
                }
                </div>
            </div>
        </>
    );
}
export default ApiTest;