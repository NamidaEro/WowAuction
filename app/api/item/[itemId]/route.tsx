// app/api/item/[itemId]/route.ts
import { getItemInfo } from '@/lib/getItemInfo';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { itemId: string } }) {
  const itemId = parseInt(params.itemId, 10);

  if (isNaN(itemId)) {
    return NextResponse.json({ error: 'Invalid itemId' }, { status: 400 });
  }

  try {
    const item = await getItemInfo(itemId);
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.error('Error fetching item', error);
    return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
  }
}
