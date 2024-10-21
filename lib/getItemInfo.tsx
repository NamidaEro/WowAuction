// lib/getItem.ts
import axios from 'axios';
import { getToken } from './getToken';

interface Item {
  id: number;
  name: string;
  quality: { name: string };
  level: number;
}

export async function getItemInfo(itemId: number): Promise<Item> {
  const apiBaseUrl = process.env.API_BASE_URL!;
  const token = await getToken();

  const region = 'kr'; // 또는 필요에 따라 다른 지역
  const namespace = 'static-kr'; // 아이템 데이터는 고정된 값이므로 'static' 사용
  const locale = 'ko_KR'; // 로컬라이즈 정보

  try {
    const response = await axios.get<Item>(
      `${apiBaseUrl}/data/wow/item/${itemId}`,
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
    console.error(`Failed to fetch item with ID ${itemId}`, error);
    throw new Error('Failed to fetch item');
  }
}
