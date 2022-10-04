import { pageGetAllAPI } from "../api/api";
import { setLocalStorageAuthorizationToken } from "./interceptor";

const { kakao } = window;

export default async function settingKakaoMap() {
    setLocalStorageAuthorizationToken();
    const map = new kakao.maps.Map(document.getElementById('map'), { // 지도를 표시할 div
        center : new kakao.maps.LatLng(37.566812940227386, 126.9786522620371), // 지도의 중심좌표 
        level : 9 // 지도의 확대 레벨 
    });
    
    const clusterer = new kakao.maps.MarkerClusterer({
        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
        minLevel: 5 // 클러스터 할 최소 지도 레벨 
    })
    const getPageData = await pageGetAllAPI();
    const { data, status } = getPageData;
    const markers = Object.values(data).map((items) => {
        return new kakao.maps.Marker({
            position : new kakao.maps.LatLng(items.lat, items.lng), 
            image: new kakao.maps.MarkerImage(items.markerimg.url, new kakao.maps.Size(60, 60), 
            {offset: new kakao.maps.Point(12, 34)})
        });
    })
    clusterer.addMarkers(markers);
}