// lib/getAchievements.ts
import axios from 'axios';
import { getToken } from './getToken';

interface Achievement {
  id: number;
  name: string;
}

interface AchievementsIndexResponse {
  achievements: Achievement[];
}

export async function getAchievements(): Promise<AchievementsIndexResponse> {
  const apiBaseUrl = process.env.API_BASE_URL!;
  const token = await getToken();
  
  const region = 'kr'; // 또는 필요에 따라 다른 지역
  const namespace = 'static-kr'; // 고정된 데이터
  const locale = 'ko_KR'; // 로컬라이즈 정보

  try {
    const response = await axios.get<AchievementsIndexResponse>(
      `${apiBaseUrl}/data/wow/achievement/index`,
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
    console.error('Failed to fetch achievements', error);
    throw new Error('Failed to fetch achievements');
  }
}
