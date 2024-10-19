// app/api/achievements/route.ts
import { getAchievements } from '@/lib/getAchievements';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const achievements = await getAchievements();
    return NextResponse.json(achievements, { status: 200 });
  } catch (error) {
    console.error('Error fetching achievements', error);
    return NextResponse.json({ error: 'Failed to fetch achievements' }, { status: 500 });
  }
}
