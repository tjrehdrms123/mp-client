import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { pageGetAPI, pageGetAllAPI } from "../api/api";
import { setLocalStorageAuthorizationToken } from "../utils/interceptor";
import pin from "../images/pin.png";
import sample from "../images/background.jpg";
import { Link, useParams } from "react-router-dom";
import Adfit from "./adfit";

function Mainmap() {
  setLocalStorageAuthorizationToken();
  const { objectId } = useParams();
  const [strogeObjectId, setStrogeObjectId] = useState();
  const [mapData, setMapData] = useState();
  const [pinData, setPinData] = useState([
    "여기를 클릭하면 사용 법이 나와요",
    "지도에 있는 사진을 클릭하면 제목이 바껴요! 제목을 클릭하면 등록된 세부 내용을 볼 수 있어요",
    false,
  ]); // 인포윈도우 Open 여부를 저장하는 state 입니다.
  const [showDetail, setShowDetail] = useState(false);
  const pageGetAllData = async () => {
    setLocalStorageAuthorizationToken(); // axios전 token 인터셉터 셋팅
    if (objectId) {
      const getPageData = await pageGetAPI(objectId);
      const { data, status } = getPageData;
      setMapData(data);
    } else {
      const getPageAllData = await pageGetAllAPI();
      const { data, status } = getPageAllData;
      setMapData(data);
    }
  };
  const detailEvent = () => {
    showDetail ? setShowDetail(false) : setShowDetail(true);
  };
  const copyLinkEvent = () => {
    let url = "";
    let textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    url = window.document.location.href;
    textarea.value = url;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("추억지도 주소가 복사되었습니다.");
  };
  useEffect(() => {
    setStrogeObjectId(localStorage.getItem("objectId")); // 세션 토큰 확인
    pageGetAllData();
  }, [objectId]);
  return (
    <>
      <div className="background">
        <div className="mapbox">
          <Map
            center={{ lat: 37.566812940227386, lng: 126.9786522620371 }}
            style={{ width: "100%", height: "100%" }}
            level={9}
          >
            <MarkerClusterer averageCenter={true} minLevel={5}>
              {mapData &&
                mapData.map((items) => {
                  return (
                    <MapMarker
                      clickable={true} // 마커를 클릭했을 때 지도의 클릭
                      onClick={() =>
                        setPinData([
                          items.title,
                          items.description,
                          items.markerimg.url,
                          items.writer,
                        ])
                      }
                      position={{
                        lat: items.lat,
                        lng: items.lng,
                      }}
                      image={{
                        src: items.markerimg.url,
                        size: { width: 60, height: 60 },
                      }}
                    />
                  );
                })}
            </MarkerClusterer>
          </Map>
          <div className={showDetail ? "toolbox on" : "toolbox"}>
            <div className="title" onClick={detailEvent}>
              <img src={pin} alt="" className="pin" />
              {pinData[0] && pinData[0]}
            </div>
            <div className={showDetail ? "detail on" : "detail"}>
              <img
                src={pinData[2] ? pinData[2] && pinData[2] : sample}
                alt=""
                className="detail_img"
              />
              {pinData[1] && pinData[1]}
              <br />
              글쓴이:{pinData[3] && pinData[3]}
            </div>
            <div className="link_box">
              {window.document.location.pathname === "/map" &&
              strogeObjectId ? (
                <div className="write_btn">
                  <Link to={`/map/${strogeObjectId}`}>내 추억 보기</Link>
                </div>
              ) : (
                ""
              )}
              {window.document.location.pathname != "/map" &&
              strogeObjectId ? (
                <div className="write_btn">
                  <Link to={"/map"}>전체 추억 보기</Link>
                </div>
              ) : (
                ""
              )}
              {
                objectId ? (
                  <div className="write_btn">
                  <Link to={`/writer/${objectId}`}>추억 남기기</Link>
                </div>
                ) : (
                  <div>
                  </div>
                )
              }                
              {strogeObjectId ? (
                <div className="write_btn" onClick={copyLinkEvent}>
                  <Link to={`/map/${strogeObjectId}`}>내 지도 공유</Link>
                </div>
              ) : (
                <div className="write_btn">
                  <Link to={"/"}>회원가입</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mainmap;
