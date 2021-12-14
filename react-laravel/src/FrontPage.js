import Header from './Header'
function FrontPage(){
    let user = JSON.parse(localStorage.getItem('user-info'));
    return(
        <>
        <Header />
        <div className="container" style={{minHeight:'88.7vh','background':'brown'}}>
            <div style={{'display':'flex','justifyContent':'space-around','height':'70vh'}}>
                <div style={{'background':'blue','width':'100%','marginTop':'1em','padding':'.5em','height':'100%'}}>
                    <div style={{'display':'flex','color':'white','flexDirection':'column','alignItems':'center','height':'100%'}}>
                        <div>
                            IMG <br />
                            <span style={{'fontWeight':'bold'}}>{user && user.name ? user.name : "error404"}</span>
                        </div>
                    </div>
                </div>
                <div style={{background:'green','width':'100%','marginTop':'1em','padding':'.5em','height':'100%'}}>
                    <div style={{'color':'white','height':'100%'}}>
                        <div style={{'display':'flex','width':'45%','flexBasis':'100%'}}>
                            <div style={{'borderRight':'1px solid rgba(0,0,0,0.2)','flexGrow':'1'}} align='center'>Follow<br /> 100</div>
                            <div style={{'flexGrow':'1'}} align="center">Following<br /> 100</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default FrontPage