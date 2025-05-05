import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import Score from '@/app/models/Score';

export async function POST(request: Request) {
  try {
    console.log('Connecting to MongoDB...', process.env.MONGODB_URI);
    await connectDB();
    console.log('Connected to MongoDB successfully');
    
    const body = await request.json();
    console.log('Received request body:', body);

    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json(
        { error: 'Invalid name provided' },
        { status: 400 }
      );
    }

    if (typeof body.score !== 'number' || body.score < 0) {
      return NextResponse.json(
        { error: 'Invalid score provided' },
        { status: 400 }
      );
    }

    const { name, score } = body;
    console.log('Creating new score record:', { name, score });
    
    const newScore = await Score.create({
      name,
      score
    });
    console.log('Score saved successfully:', newScore);

    return NextResponse.json(newScore, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/scores:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'Failed to save score', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('Connected to MongoDB successfully');
    
    const scores = await Score.find({})
      .sort({ score: -1 });
    
    console.log('Retrieved scores:', scores);
    return NextResponse.json(scores);
  } catch (error) {
    console.error('Error in GET /api/scores:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'Failed to fetch scores', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 