// lib/getAuctions.ts
import axios from 'axios';
import { getToken } from './getToken';

interface Auction {
  id: number;
  item: { id: number };
  bid: number;
  buyout: number;
  quantity: number;
}

interface AuctionsResponse {
  auctions: Auction[];
}

export async function getAuctions(connectedRealmId: number): Promise<AuctionsResponse> {
  const apiBaseUrl = process.env.API_BASE_URL!;
  const token = await getToken();

  const region = 'kr'; // 또는 필요에 따라 다른 지역
  const namespace = 'dynamic-kr'; // 경매 데이터는 동적이므로 'dynamic' 사용
  const locale = 'ko_KR'; // 로컬라이즈 정보

  try {
    const response = await axios.get<AuctionsResponse>(
      `${apiBaseUrl}/data/wow/connected-realm/${connectedRealmId}/auctions`,
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
    console.error(`Failed to fetch auctions for connected realm ID ${connectedRealmId}`, error);
    throw new Error('Failed to fetch auctions');
  }
}
