// app/api/battle-api/route.ts
import { getToken } from '@/lib/getToken';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const token = await getToken();
    const apiResponse = await axios.get(`${process.env.API_BASE_URL}/data/wow/achievement/index`);

    return NextResponse.json(apiResponse.data, { status: 200 });
  } catch (error) {
    console.error('Error fetching API data', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
