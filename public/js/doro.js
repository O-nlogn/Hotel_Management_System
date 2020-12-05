function goPopup() {
    var pop = window.open(
        '/jusoPopup',
        'pop',
        'width=570,height=420, scrollbars=yes, resizable=yes'
    );
}

function jusoCallBack(
    roadFullAddr,
    roadAddrPart1,
    addrDetail,
    roadAddrPart2,
    engAddr,
    jibunAddr,
    zipNo,
    admCd,
    rnMgtSn,
    bdMgtSn,
    detBdNmList,
    bdNm,
    bdKdcd,
    siNm,
    sggNm,
    emdNm,
    liNm,
    rn,
    udrtYn,
    buldMnnm,
    buldSlno,
    mtYn,
    lnbrMnnm,
    lnbrSlno,
    emdNo
) {
    $('#road').val(roadAddrPart1);
    $('#detail').val(addrDetail);

}
