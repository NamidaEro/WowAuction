// app/api/connected-realm/[connectedRealmId]/route.ts
import { getConnectedRealm } from '@/lib/getConnectedRealm';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { connectedRealmId: string } }) {
  const connectedRealmId = parseInt(params.connectedRealmId, 10);

  if (isNaN(connectedRealmId)) {
    return NextResponse.json({ error: 'Invalid connectedRealmId' }, { status: 400 });
  }

  try {
    const connectedRealm = await getConnectedRealm(connectedRealmId);
    return NextResponse.json(connectedRealm, { status: 200 });
  } catch (error) {
    console.error('Error fetching connected realm', error);
    return NextResponse.json({ error: 'Failed to fetch connected realm' }, { status: 500 });
  }
}
