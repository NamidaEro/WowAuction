// app/api/connected-realms/route.ts
import { getConnectedRealms } from '@/lib/getConnectedRealms';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const connectedRealms = await getConnectedRealms();
    return NextResponse.json(connectedRealms, { status: 200 });
  } catch (error) {
    console.error('Error fetching connected realms', error);
    return NextResponse.json({ error: 'Failed to fetch connected realms' }, { status: 500 });
  }
}
