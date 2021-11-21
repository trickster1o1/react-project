import React ,{useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import Header from './Header';
function ProductDetail(props) {
    const [data,setData] = useState([]);
    const [cmnt,setCmnt] = useState("");
    const [comment,setComment] = useState([]);
    let user = JSON.parse(localStorage.getItem('user-info'));
    useEffect(async ()=>{
        let result = await fetch("http://127.0.0.1:8000/api/showProduct/"+props.match.params.id);
        let comment = await fetch("http://127.0.0.1:8000/api/showComment/"+props.match.params.id);
        result = await result.json();
        comment = await comment.json();
        setData(result);
        setComment(comment);

    },[]);

    async function postCmnt() {
        let name = user.name;
        let id = user.id;
        let prodId = data.id;
        let userData = {name,id,prodId,cmnt};

        let postResult = await fetch("http://127.0.0.1:8000/api/comment", {
            method:'POST',
            body:JSON.stringify(userData),
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        });

        postResult = await postResult.json();

        if(postResult.msg === 'Success') {
             window.location.reload();
        } else {
            alert(postResult.msg);
        }
    } 
   async function cmntDelete(id) {
        let res = await fetch("http://127.0.0.1:8000/api/delCmnt/"+id,{
            method:'DELETE'
        })
        res = await res.json();
        window.location.reload();

    }
    return(
        <>
        <Header />
        <div className="container" style={{"paddingTop":"2em","paddingBottom":"17.2em"}}>
            <Row md={2}>
                <Col style={{"textAlign":"center"}}>
                    <img src={"http://127.0.0.1:8000/"+data.file_path} style={{"width":"100%"}} /> <br />
                    <span style={{"float":"left"}}><b>Name: {data.name}</b></span><br />
                    <span style={{"float":"left"}}><b>Price: Rs.{data.price}</b></span>
                    
                </Col>
                <Col>
                    <div>
                        <p>
                            {data.description}
                        </p>
                    </div>
                    <div>
                        <ul>
                        {
                            comment.map((cmn)=>
                            <li className="cmnt"><span style={{'fontWeight':'Bold'}} className="cmntHead">{cmn.user_name}
                            { 
                                user && user.name === cmn.user_name
                                ? <span className="cmntDel" onClick = {()=>cmntDelete(cmn.id)}>X</span> : null
                                
                           } 
                            </span><br />
                                {cmn.cmnt}
                            </li>
                            )
                        }
                        </ul>
                        <span style={{'fontWeight':'bold'}}>Comment</span><br />
                        <textarea style={{'height':'7em','width':'40em'}} onChange = {(e)=>setCmnt(e.target.value)} >
                        </textarea><br />
                        <button className="btn btn-secondary" style={{'float':'right'}} onClick={postCmnt}>Post</button>
                    </div>
                </Col>
            </Row>
        </div>
        </>
    );
}

export default withRouter(ProductDetail);