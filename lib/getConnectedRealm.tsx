// lib/getConnectedRealm.ts
import axios from 'axios';
import { getToken } from './getToken';

interface ConnectedRealmResponse {
  id: number;
  realms: Array<{ name: string; id: number; }>;
}

export async function getConnectedRealm(connectedRealmId: number): Promise<ConnectedRealmResponse> {
  const apiBaseUrl = process.env.API_BASE_URL!;
  const token = await getToken();

  const region = 'kr'; // 또는 필요에 따라 다른 지역
  const namespace = 'dynamic-kr'; // 연결된 서버는 동적이므로 'dynamic' 사용
  const locale = 'ko_KR'; // 로컬라이즈 정보

  try {
    const response = await axios.get<ConnectedRealmResponse>(
      `${apiBaseUrl}/data/wow/connected-realm/${connectedRealmId}`,
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
    console.error(`Failed to fetch connected realm with ID ${connectedRealmId}`, error);
    throw new Error('Failed to fetch connected realm');
  }
}
