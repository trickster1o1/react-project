import { withRouter } from "react-router";
import { useEffect,useState } from "react";
import { useHistory } from "react-router-dom";
import Header from './Header';
function Profile(props) {
    let history = new useHistory();
    let [data,setData] = useState([]);
    let [follow,setFollow] = useState(false);
    useEffect(async ()=>{
        let user = JSON.parse(localStorage.getItem('user-info'));
        if(user.username === props.match.params.username) {
            history.push('/home');
        } else {
            await fetch('http://127.0.0.1:8000/api/userData/'+props.match.params.username+'/'+user.id)
            .then((res)=>res=res.json())
            .then((r)=>{
                setData(r.user[0]);
                if(r.following === 'true') {
                    setFollow(true);
                }
            }).catch((error)=>console.log(error));
        }
    },[])

    async function followUser() {
        let follower = JSON.parse(localStorage.getItem('user-info'));
        follower = follower.id;
        let following = data.id;
        let udta = {follower , following};
        if(!follow) {
            await fetch('http://127.0.0.1:8000/api/followUser', {
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
                body: JSON.stringify(udta)
            }).then((res)=>res=res.json())
            .then((r)=>console.log(r))
            .catch((error)=>console.log(error));
        }else {
            await fetch('http://127.0.0.1:8000/api/unFollow/'+props.match.params.username+'/'+JSON.parse(localStorage.getItem('user-info')).id,{
                method:'DELETE'
            }).then((res)=>res=res.json())
            .then((r)=>console.log(r))
            .catch((error)=>console.log(error));


        }

        setFollow(!follow);
    }
    
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
                            <span style={{'fontWeight':'bold','display':'block','paddingTop':'.5em'}}>{data && data.id ? data.name : "noone"}</span>
                        </div>
                    </div>
                </div>
                <div style={{'width':'100%','marginTop':'1em','padding':'.5em'}}>
                    <div>
                        <div>
                            {
                                !follow ? <button className='btn btn-danger' style={{'width':'50%'}} onClick={followUser}>Follow</button>
                                : <button className='btn btn-secondary' style={{'width':'50%'}} onClick={followUser}>Following</button>
                            }
                        </div>
                        <div style={{'paddingTop':'1em','display':'flex','width':'45%','flexBasis':'100%'}}>
                            <div style={{'borderRight':'1px solid rgba(0,0,0,0.2)','flexGrow':'1'}} align='center'><span style={{'fontWeight':'bold'}}>Follow</span><br /> 100</div>
                            <div style={{'flexGrow':'1'}} align="center"><span style={{'fontWeight':'bold'}}>Following</span><br /> 100</div>
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

export default withRouter(Profile);