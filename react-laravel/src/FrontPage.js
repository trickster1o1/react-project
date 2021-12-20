import Header from './Header';
import { useEffect, useState } from 'react';
function FrontPage(){
    let user = JSON.parse(localStorage.getItem('user-info'));
    const [data,setData] = useState([]);
    useEffect(async ()=>{
        await fetch('http://127.0.0.1:8000/api/userData/'+user.username+'/'+user.username)
        .then((res)=>res.json())
        .then((r)=>setData(r))
        .catch((error)=>console.log(error.message));
    },[])

    return(
        <>
        <Header />
        <div className="container" style={{minHeight:'88.7vh'}}>
            <div style={{'display':'flex','justifyContent':'space-around'}}>
                <div style={{'width':'100%','marginTop':'1em','padding':'.5em','height':'100%'}}>
                    <div style={{'display':'flex','flexDirection':'column','alignItems':'center'}}>
                        <div>
                            <div style={{'borderRadius':'100%','overflow':'hidden','height':'7em','width':'7em'}}>
                                <img src='http://127.0.0.1:8000/products/pp.jpg' alt='error404' style={{'height':'100%','width':'atuo'}} />
                            </div>
                            <span style={{'fontWeight':'bold','display':'block','paddingTop':'.5em'}}>{user && user.name ? user.name : "error404"}</span>
                        </div>
                    </div>
                </div>
                <div style={{'width':'100%','marginTop':'1em','padding':'.5em'}}>
                    <div>
                        <div>
                            <button className="btn btn-secondary" style={{'width':'50%'}}>Edit profile</button>
                        </div>
                        <div style={{'paddingTop':'1em','display':'flex','width':'45%','flexBasis':'100%'}}>
                            <div style={{'borderRight':'1px solid rgba(0,0,0,0.2)','flexGrow':'1'}} align='center'><span style={{'fontWeight':'bold'}}>Followers</span><br /> {data && data.follower ? data.follower : "0"}</div>
                            <div style={{'flexGrow':'1'}} align="center"><span style={{'fontWeight':'bold'}}>Following</span><br /> {data && data.follows ? data.follows : "0"}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{'padding':'1em','display':'flex','flexDirection':'column','alignItems':'center'}}>
                <div>Items Bought</div>
                <div>Items Bought</div>
                <div>reviews</div>
                
            </div>
        </div>
        </>
    )
}

export default FrontPage