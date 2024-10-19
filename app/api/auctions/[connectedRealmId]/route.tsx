// app/api/auctions/[connectedRealmId]/route.ts
import { getAuctions } from '@/lib/getAuctions';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { connectedRealmId: string } }) {
  const connectedRealmId = parseInt(params.connectedRealmId, 10);

  if (isNaN(connectedRealmId)) {
    return NextResponse.json({ error: 'Invalid connectedRealmId' }, { status: 400 });
  }

  try {
    const auctions = await getAuctions(connectedRealmId);
    return NextResponse.json(auctions, { status: 200 });
  } catch (error) {
    console.error(`Error fetching auctions for connected realm ID ${connectedRealmId}`, error);
    return NextResponse.json({ error: 'Failed to fetch auctions' }, { status: 500 });
  }
}
