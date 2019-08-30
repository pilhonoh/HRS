package com.skt.hrs.cmmn.contants;

/**
 * 화면에 표시되는 상태 정의
 * @author P149365
 * @see 행정표준용어기준으로 명명
 * @see https://www.data.go.kr/information/PDS_0000000000000299/recsroom.do
 * 
 *
 */
public enum ResveViewStatus {
	RESVE_POSBL,	//예약가능
	RESVE_COMPT,	//예약완료
	RESVE_IMPRTY,	//예약불가
	WAIT_POSBL,		//대기가능
	WAIT,			//대기중
	RESVE_CANCL,	//예약취소
	WAIT_CANCL,		//대기취소
	COMPT			//완료
}
