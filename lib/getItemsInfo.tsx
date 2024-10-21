// lib/getItems.ts
import axios from 'axios';
import { getToken } from './getToken';

interface Item {
  id: number;
  name: string;
  quality: { name: string };
  level: number;
}

export async function getItemsInfo(itemIds: number[]): Promise<Item[]> {
  const apiBaseUrl = process.env.API_BASE_URL!;
  const token = await getToken();

  const region = 'us'; // 또는 필요에 따라 다른 지역
  const namespace = 'static-us'; // 아이템 데이터는 고정된 값이므로 'static' 사용
  const locale = 'en_US'; // 로컬라이즈 정보

  try {
    // 각각의 itemId에 대해 API 호출을 Promise.all로 병렬 처리
    const itemPromises = itemIds.map((itemId) =>
      axios.get<Item>(
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
      )
    );

    // 모든 API 호출이 완료될 때까지 기다리고, 결과 배열을 반환
    const responses = await Promise.all(itemPromises);
    return responses.map((response) => response.data);
  } catch (error) {
    console.error(`Failed to fetch items`, error);
    throw new Error('Failed to fetch items');
  }
}
