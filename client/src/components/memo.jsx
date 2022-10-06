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
    <div className="mapbox">      
      <Map
          center={{ lat: 37.566812940227386, lng: 126.9786522620371 }}
          style={{ width: "100%", height: "100%"}}
          level={9}
      >
          <MarkerClusterer
              averageCenter={true}
              minLevel={5}
          >        
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
          </MarkerClusterer>
      </Map>
      <div className="toolbox">
        <button type="button">
          <span class="glyphicon glyphicon-camera" aria-hidden="true"></span>
        </button>
      </div>
    </div>
        {/* <div className="container bootstrap snippets bootdeys">
          <div className="row"> 
            {
              mapData&&mapData.map((items) => {return <div className="col-md-4 col-sm-6 content-card">
                      <div className="card-big-shadow">
                          <div className="card card-just-text" data-background="color" data-color="blue" data-radius="none">
                              <div className="content">
                                  <h6 className="category">{items.writer}</h6>
                                  <h4 className="title"><a href={items.objectId}>{items.title}</a></h4>
                                  <p className="description">{items.description}</p>
                              </div>
                          </div>
                      </div>
                  </div>
              })
            }
          </div>
        </div>    */}
    </div> 
    </>
  )
}

export default Memo