// app/api/auctions/[connectedRealmId]/route.ts
import { getCommodities } from '@/lib/getCommodities';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const auctions = await getCommodities();
    return NextResponse.json(auctions, { status: 200 });
  } catch (error) {
    console.error(`Error fetching getCommodities`);
    return NextResponse.json({ error: 'Failed to fetch auctions' }, { status: 500 });
  }
}
