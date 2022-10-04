import React from 'react'
import { useEffect } from 'react'
import settingKakaoMap from '../utils/map';

function Memo() {
  useEffect(()=> {
    settingKakaoMap();
  },[]);
  return (
    <>
    <div className="background">
        <div id="map"></div>
        <div className="container bootstrap snippets bootdeys">
            <div className="row">
                <div className="col-md-4 col-sm-6 content-card">
                    <div className="card-big-shadow">
                        <div className="card card-just-text" data-background="color" data-color="blue" data-radius="none">
                            <div className="content">
                                <h6 className="category">Best cards</h6>
                                <h4 className="title"><a href="/">Blue Card</a></h4>
                                <p className="description">What all of these have in common is that they're pulling information out of the app or the service and making it relevant to the moment. </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4 col-sm-6 content-card">
                    <div className="card-big-shadow">
                        <div className="card card-just-text" data-background="color" data-color="green" data-radius="none">
                            <div className="content">
                                <h6 className="category">Best cards</h6>
                                <h4 className="title"><a href="/">Green Card</a></h4>
                                <p className="description">What all of these have in common is that they're pulling information out of the app or the service and making it relevant to the moment. </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4 col-sm-6 content-card">
                    <div className="card-big-shadow">
                        <div className="card card-just-text" data-background="color" data-color="yellow" data-radius="none">
                            <div className="content">
                                <h6 className="category">Best cards</h6>
                                <h4 className="title"><a href="/">Yellow Card</a></h4>
                                <p className="description">What all of these have in common is that they're pulling information out of the app or the service and making it relevant to the moment. </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4 col-sm-6 content-card">
                    <div className="card-big-shadow">
                        <div className="card card-just-text" data-background="color" data-color="brown" data-radius="none">
                            <div className="content">
                                <h6 className="category">Best cards</h6>
                                <h4 className="title"><a href="/">Brown Card</a></h4>
                                <p className="description">What all of these have in common is that they're pulling information out of the app or the service and making it relevant to the moment. </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4 col-sm-6 content-card">
                    <div className="card-big-shadow">
                        <div className="card card-just-text" data-background="color" data-color="purple" data-radius="none">
                            <div className="content">
                                <h6 className="category">Best cards</h6>
                                <h4 className="title"><a href="/">Purple Card</a></h4>
                                <p className="description">What all of these have in common is that they're pulling information out of the app or the service and making it relevant to the moment. </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4 col-sm-6 content-card">
                    <div className="card-big-shadow">
                        <div className="card card-just-text" data-background="color" data-color="orange" data-radius="none">
                            <div className="content">
                                <h6 className="category">Best cards</h6>
                                <h4 className="title"><a href="/">Orange Card</a></h4>
                                <p className="description">What all of these have in common is that they're pulling information out of the app or the service and making it relevant to the moment. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>   
    </div> 
    </>
  )
}

export default Memo