import React, { useState } from "react";
import { pagePostAPI } from "../api/api";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function Writer() {
  const { kakao } = window;
  const { objectId } = useParams();
  const [title, setTitle] = useState();
  const [address, setAddress] = useState();
  const [description, setDescription] = useState();
  const [writer, setWriter] = useState();
  const [lat, setLat] = useState(37.566812940227386);
  const [lng, setLng] = useState(126.9786522620371);
  const [makerImg, setMakerImg] = useState();
  const onChangeTitleEvent = (e) => setTitle(e.target.value);
  const onChangeDescriptionEvent = (e) => setDescription(e.target.value);
  const onChangeWriterEvent = (e) => setWriter(e.target.value);
  const onChangeImgEvent = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setMakerImg(base64);
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const onSubmit = async () => {
    const pageData = {
      title: title,
      description: description,
      writer: writer,
      lat: lat,
      lng: lng,
      auth_id: objectId,
      markerimg: makerImg,
    };
    const writeData = await pagePostAPI(pageData);
    console.log("writeData: ", writeData);
    const { status, data } = writeData;
  };
  const open = useDaumPostcodePopup(
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
      setAddress(fullAddress);
    }
  };
  const handleClick = () => {
    open({ onComplete: handleComplete });
  };
  const handleMyLocationClick = () => {
    const container = document.querySelector(".kakao-map");
    const options = {
      center: new kakao.maps.LatLng(37.566812940227386, 126.9786522620371),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(37.563109, 126.89143),
    });

    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        const locPosition = new kakao.maps.LatLng(lat, lon);

        // 마커와 인포윈도우를 표시합니다
        map.setCenter(locPosition);
        marker.setPosition(locPosition);
      });
    }
  };
  useEffect(() => {
    kakao.maps.load(() => {
      const container = document.querySelector(".kakao-map");
      const options = {
        center: new kakao.maps.LatLng(37.566812940227386, 126.9786522620371),
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);
      var geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow = new kakao.maps.InfoWindow({
            content:
              '<div style="width:150px;text-align:center;padding:6px 0;">' +
              address +
              "</div>",
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      });
    });
  }, [address]);
  useEffect(() => {
    kakao.maps.load(() => {
      const container = document.querySelector(".kakao-map");
      const options = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);
      kakao.maps.event.addListener(map, "idle", function () {
        var marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(lat, lng),
        });
        var latlng = map.getCenter();
        setLat(latlng.getLat());
        setLng(latlng.getLng());

        marker.setPosition(latlng);
      });
    });
  }, []);
  return (
    <>
      <div className="form-signin">
        <h2 className="form-signin-heading">추억 남기기</h2>
        <input
          type="text"
          onChange={onChangeTitleEvent}
          value={title}
          className="title form-control"
          name="title"
          placeholder="제목"
          required
          autoFocus
        />
        <input
          type="text"
          onChange={onChangeDescriptionEvent}
          value={description}
          className="description form-control"
          name="description"
          placeholder="설명"
          required
        />
        <input
          type="text"
          onChange={onChangeWriterEvent}
          value={writer}
          className="writer form-control"
          name="writer"
          placeholder="글쓴이"
          required
        />
        <br />
        <input
          type="file"
          onChange={(e) => {
            onChangeImgEvent(e);
          }}
        />
        <br />
        <div
          className="kakao-map"
          style={{ width: "300px", height: "300px" }}
        ></div>
        <button type="button" onClick={handleClick}>
          지도 검색하기
        </button>
        <button type="button" onClick={handleMyLocationClick}>
          내 위치로 이동하기
        </button>
        <input
          type="hidden"
          value={lat}
          className="lat form-control"
          name="lat"
          placeholder="lat"
          required
        />
        <input
          type="hidden"
          value={lng}
          className="lng form-control"
          name="lng"
          placeholder="lng"
          required
        />
        <br />
        <div
          type="submit"
          onClick={onSubmit}
          className="btn btn-lg btn-login btn-block"
        >
          추억 남기기
        </div>
      </div>
    </>
  );
}

export default Writer;
