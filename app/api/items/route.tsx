// app/api/items/route.ts
import { getItemsInfo } from '@/lib/getItemsInfo';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { itemIds } = await req.json();

    if (!Array.isArray(itemIds) || itemIds.some(isNaN)) {
      return NextResponse.json({ error: 'Invalid itemIds' }, { status: 400 });
    }

    const items = await getItemsInfo(itemIds);
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error('Error fetching items', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}
