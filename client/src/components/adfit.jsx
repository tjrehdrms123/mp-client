import React, { useEffect } from 'react'

function Adfit() {
    useEffect(()=>{
    // 01
    let ins = document.createElement('ins');
    let scr = document.createElement('script');
    ins.className = 'kakao_ad_area';
    ins.style = "display:none; width:100%;";
    scr.async = 'true';
    scr.type = "text/javascript";
    scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    ins.setAttribute('data-ad-width', '320');
    ins.setAttribute('data-ad-height', '50');
    ins.setAttribute('data-ad-unit', 'DAN-ZJ61KUWftJDuIbV2');
    document.querySelector('.adfit').appendChild(ins);
    document.querySelector('.adfit').appendChild(scr);
    // 02
    let ins2 = document.createElement('ins');
    ins2.className = 'kakao_ad_area';
    ins2.style = "display:none; width:100%;";
    ins2.setAttribute('data-ad-width', '320');
    ins2.setAttribute('data-ad-height', '50');
    ins2.setAttribute('data-ad-unit', 'DAN-SewzcctIQndgvl8y');
    document.querySelector('.adfit2').appendChild(ins2);
    // 03
    let ins3 = document.createElement('ins');
    ins3.className = 'kakao_ad_area';
    ins3.style = "display:none; width:100%;";
    ins3.setAttribute('data-ad-width', '320');
    ins3.setAttribute('data-ad-height', '50');
    ins3.setAttribute('data-ad-unit', 'DAN-u15apogjDUDwi5a8');
    document.querySelector('.adfit3').appendChild(ins3);
    // 04
    let ins4 = document.createElement('ins');
    ins4.className = 'kakao_ad_area';
    ins4.style = "display:none; width:100%;";
    ins4.setAttribute('data-ad-width', '320');
    ins4.setAttribute('data-ad-height', '50');
    ins4.setAttribute('data-ad-unit', 'DAN-85OAp1EeMoxSVJ3f');

    document.querySelector('.adfit4').appendChild(ins4);
    },[]);
  return (
    <>
        <div className="adfit"></div>
        <div className="adfit2"></div>
        <div className="adfit3"></div>
        <div className="adfit4"></div>
    </>
  )
}

export default Adfit