import axios from 'axios';
import { getToken } from './getToken';

interface Commodity {
  id: number;
  price: number;
  quantity: number;
}

interface CommoditiesResponse {
  commodities: Commodity[];
  _links?: { self: { href: string } };
}

export async function getCommodities(): Promise<CommoditiesResponse> {
  const apiBaseUrl = process.env.API_BASE_URL;
  if (!apiBaseUrl) {
    throw new Error('API_BASE_URL is not defined in the environment variables');
  }

  const token = await getToken();

  const region = process.env.REGION || 'kr';
  const namespace = `dynamic-${region}`;
  const locale = process.env.LOCALE || 'ko_KR';

  try {
    const url = new URL('/data/wow/auctions/commodities', apiBaseUrl);
    url.searchParams.append('namespace', namespace);
    url.searchParams.append('locale', locale);

    const response = await axios.get<CommoditiesResponse>(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch commodities:', {
      message: error.message,
      response: error.response?.data,
    });
    throw new Error(`Failed to fetch commodities: ${error.message}`);
  }
}
