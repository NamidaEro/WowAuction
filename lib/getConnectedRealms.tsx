// lib/getConnectedRealms.ts
import axios from 'axios';
import { getToken } from './getToken';

interface ConnectedRealm {
  href: string;
}

interface ConnectedRealmsIndexResponse {
  connected_realms: ConnectedRealm[];
}

export async function getConnectedRealms(): Promise<ConnectedRealmsIndexResponse> {
  const apiBaseUrl = process.env.API_BASE_URL!;
  const token = await getToken();

  const region = 'kr'; // 또는 필요에 따라 다른 지역
  const namespace = 'dynamic-kr'; // 연결된 서버는 동적이므로 'dynamic' 사용
  const locale = 'ko_KR'; // 로컬라이즈 정보

  try {
    const response = await axios.get<ConnectedRealmsIndexResponse>(
      `${apiBaseUrl}/data/wow/connected-realm/index`,
      {
        params: {
          namespace,
          locale,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch connected realms', error);
    throw new Error('Failed to fetch connected realms');
  }
}

// https://kr.api.blizzard.com/data/wow/connected-realm/205?namespace=dynamic-kr 아즈샤라
// https://kr.api.blizzard.com/data/wow/connected-realm/210?namespace=dynamic-kr
// Realm Name: 듀로탄 (ID: 210)
// Realm Name: 불타는 군단 (ID: 201)
// Realm Name: 스톰레이지 (ID: 2111)
// https://kr.api.blizzard.com/data/wow/connected-realm/214?namespace=dynamic-kr 윈드러너
// Realm Name: 윈드러너 (ID: 214)
// Realm Name: 알렉스트라자 (ID: 258)
// Realm Name: 렉사르 (ID: 2106)
// Realm Name: 데스윙 (ID: 2108)
// Realm Name: 와일드해머 (ID: 2079)
// https://kr.api.blizzard.com/data/wow/connected-realm/2116?namespace=dynamic-kr 줄진
// Realm Name: 줄진 (ID: 2116)
// Realm Name: 굴단 (ID: 215)
// Realm Name: 말퓨리온 (ID: 264)
// Realm Name: 달라란 (ID: 207)
// Realm Name: 노르간논 (ID: 211)
// Realm Name: 가로나 (ID: 212)
// Realm Name: 헬스크림 (ID: 293)
// Realm Name: 하이잘 (ID: 2107)
// Realm Name: 세나리우스 (ID: 2110)
