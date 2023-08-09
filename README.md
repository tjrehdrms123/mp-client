# 추억지도(2022.10.24 ~ 2022.11.07)
> 한 해를 기억하며 다양한 추억을 기록해 친구들과 공유하며 자랑 할 수 있습니다


<br/>

# 🌿 사용 스택
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  - kakao-maps-sdk
  - daum-postcode

# 📚 아키텍쳐
## Folder Architecture

```
📂 src
├── 📂 api        # API 통신을 위한 파일이 있습니다.
├── 📂 components
├── 📂 css        # 커스텀 CSS가 있습니다.
├── 📂 images     
├── 📂 utils      # Bearer Token 셋팅을 위한 Axios interceptor파일이 있습니다.
└── app.ts
```

## Adfit 인증

![Adfit](./readme_img/adfit.PNG)
![Adfit수익](./readme_img/adfit_cash.PNG)

## 프로젝트 리뷰
<details>
<summary>코드 리뷰</summary>
<div markdown="1">   
  <ul>
    <li><b>Component</b> : 컴포넌트의 하위 컴포넌트로 쪼개서 작업했으면 좋았을꺼 같다. 특히 `mainmap.jsx`파일의 지도 부분과 하단 박스부분이 있다.</li>
    <li><b>base64 IMG</b> : 이미지 전송을 base64포맷으로 했을때 프론트에서 처리하는 방법을 배웠다. `write.jsx`파일의 convertBase64 함수로 작성했다.</li>
    <li><b>Bearer Token : </b>API를 호출할때 `interceptor.js`에 axios에 header설정을 통해 Bearer토큰을 셋팅하는 방법을 배웠다.</li>
    <li><b>adfit : </b>adfit(광고)을 적용하면서 수익화 하는 법에 대한 개념을 익혔다</li>
    <li>지도에 사용자가 작성한 글을 띄워주는 작업을 하면서, 카카오 맵 API, 다음 Postcode를 이용해 활용하는 법을 배웠다.</li>
  </ul>
</div>
</details>
