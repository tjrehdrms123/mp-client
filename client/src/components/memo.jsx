import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import { pageGetAllAPI } from "../api/api";
import { setLocalStorageAuthorizationToken } from "../utils/interceptor";

function Memo() {
  const [mapData, setMapData] = useState();
  const pageGetAllData = async () => {
    setLocalStorageAuthorizationToken(); // axios전 token 인터셉터 셋팅
    const getPageData = await pageGetAllAPI();
    const { data, status } = getPageData;
    setMapData(data);
  }
  useEffect(()=>{
    pageGetAllData();
  },[]);
  return (
    <>
    <div className="background">
    <Map
        center={{ lat: 37.566812940227386, lng: 126.9786522620371 }}
        style={{ width: "80%", height: "360px", display: "block", margin: "0 auto"}}
        level={9}
    >
        <MarkerClusterer
            averageCenter={true}
            minLevel={5}
        >
        </MarkerClusterer>
        {
            mapData&&mapData.map((items) => {
                return <MapMarker
                position={{
                    lat: items.lat,
                    lng: items.lng
                }}
                image={{
                    src:items.markerimg.url,
                    size:{width:60,height:60}
                }}
              />
            })
        }
    </Map>
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