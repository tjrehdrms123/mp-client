import React, { useState } from "react";
import { pagePostAPI } from "../api/api";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { setLocalStorageAuthorizationToken } from "../utils/interceptor";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

function Writer() {
  setLocalStorageAuthorizationToken();
  const { kakao } = window;
  const { objectId } = useParams();
  const [strogeObjectId, setStrogeObjectId] = useState(
    localStorage.getItem("objectId")
  );
  const [title, setTitle] = useState();
  const [address, setAddress] = useState();
  const [description, setDescription] = useState();
  const [writer, setWriter] = useState();
  const [lat, setLat] = useState(37.566812940227386);
  const [lng, setLng] = useState(126.9786522620371);
  const [makerImg, setMakerImg] = useState();
  const [myLocation, setMyLocation] = useState(false);
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
    if (!title) {
      alert("제목을 입력해주세요");
    }
    if (!description) {
      alert("설명을 입력해주세요");
    }
    if (!writer) {
      alert("작성자를 입력해주세요");
    }
    if (!makerImg) {
      alert("이미지를 등록해주세요");
    }
    const pageData = {
      title: title,
      description: description,
      writer: writer,
      lat: lat,
      lng: lng,
      auth_id: objectId,
      markerimg: makerImg,
    };
    console.log(pageData);
    const writeData = await pagePostAPI(pageData);
    console.log("writeData: ", writeData);
    const { status, data } = writeData;
    if (status === 200) {
      alert(`${data.message}`);
      window.location.href = `/map/${objectId}`;
    }
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
    setMyLocation(true);
  };
  if (objectId === "undefined" || objectId != strogeObjectId) {
    window.location.href = `/writer/${strogeObjectId}`;
  }
  useEffect(() => {
    kakao.maps.load(() => {
      const container = document.querySelector(".kakao-map");
      const options = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3,
      };
      const geocoder = new kakao.maps.services.Geocoder();
      const map = new kakao.maps.Map(container, options);
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(lat, lng),
      });
      if (address) {
        geocoder.addressSearch(address, function (result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
          }
        });
      }
      kakao.maps.event.addListener(map, "center_changed", function () {
        var latlng = map.getCenter();
        setLat(latlng.getLat());
        setLng(latlng.getLng());

        marker.setPosition(latlng);
      });
      if (myLocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function (position) {
          const lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도

          const locPosition = new kakao.maps.LatLng(lat, lon);

          // 마커와 인포윈도우를 표시합니다
          map.setCenter(locPosition);
          marker.setPosition(locPosition);
        });
        setMyLocation(false);
      }
    });
  }, [address, myLocation]);
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
          className="form-control"
          id="formFile"
          onChange={(e) => {
            onChangeImgEvent(e);
          }}
        />
        <br />
        <div className="map-box">
          <div className="kakao-map"></div>
        </div>
        <div className="write-event-btn-box">
          <div type="button" className="write-event-btn" onClick={handleClick}>
            지도 검색하기
          </div>
          <div
            type="button"
            className="write-event-btn"
            onClick={handleMyLocationClick}
          >
            내 위치로
          </div>
        </div>
        <input
          type="hidden"
          value={lat}
          className="lat btn-file form-control"
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
        <div className="btn btn-lg btn-login btn-block">
          <Link to={`/map/${objectId}`}>돌아가기</Link>
        </div>
      </div>
    </>
  );
}

export default Writer;
