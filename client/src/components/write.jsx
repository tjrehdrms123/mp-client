import React, { useState } from "react";
import { pagePostAPI } from "../api/api";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import DaumPostcode from "react-daum-postcode";
import { useParams } from "react-router-dom";

function Writer() {
  const [visible, setVisible] = useState(false); // 우편번호 컴포넌트의 노출여부 상태
  const { objectId } = useParams();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [writer, setWriter] = useState();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [makerImg, setMakerImg] = useState();
  const [writeInfo, setWriteInfo] = useState();
  const onChangeTitleEvent = (e) => setTitle(e.target.value);
  const onChangeDescriptionEvent = (e) => setDescription(e.target.value);
  const onChangeWriterEvent = (e) => setWriter(e.target.value);
  const onChangeLatEvent = (e) => setLat(e.target.value);
  const onChangeLngEvent = (e) => setLng(e.target.value);
  const onChangeMakerImgEvent = (e) => setMakerImg(e.target.value);
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
    // post code
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
    }
    setWriteInfo({ ...writeInfo, address: fullAddress });
    setVisible(false);
  };
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
        {visible ? (
          <div>
            <button title="닫기" onClick={() => setVisible(false)}>
              닫기
            </button>
            <DaumPostcode
              // onComplete={handleComplete}
              // style={addressStyle}
              height={700}
            />
          </div>
        ) : null}

        <div
          placeholder="주소를 검색해주세요"
          onClick={() => setVisible(true)}
          defaultValue={writeInfo.address}
        ></div>
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
