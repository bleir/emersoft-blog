import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';

export async function GET(request: Request, response: Response) {
	const fileContents = await fs.readFile('data/blog.json', 'utf8');
	return NextResponse.json(fileContents);
}
