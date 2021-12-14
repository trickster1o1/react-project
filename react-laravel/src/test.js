import Header from './Header';
import { useState } from 'react';
function Test() {
    const [num,setNum] = useState('');
    const [thm,setThm] = useState(false);
    const [follow,setFollow] = useState(false);
    return(
        <>
            <Header />
            <div class="container-fluid">
                <div style={{'padding':'1em'}}>
                <input type="text" onChange={(e)=>setNum(e.target.value)} /> <br/>
                <button style={{'margin':'.5em 0'}} onClick={()=> setThm(!thm)}>Theme Changer</button>
                <div style = {{background: thm ? 'blue' : 'green', color:'white', 'padding':'1em'}}>
                    The thing you typed is {num ? num : "nothing yet"}
                </div>

                <button className={follow ? 'btn btn-danger' : 'btn btn-primary'} style={{marginTop:".5em",width:'7.5em'}} onClick={()=>setFollow(!follow)}>Follow</button>
                </div>
            </div>
            
        </>
    )
}

export default Test;