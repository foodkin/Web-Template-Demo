import { readFileSync, existsSync } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(
      process.cwd(),
      'templates',
      `template-${params.id}`,
      'index.html'
    );

    if (!existsSync(filePath)) {
      return new NextResponse('Template not found', { status: 404 });
    }

    const html = readFileSync(filePath, 'utf-8');
    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch {
    return new NextResponse('Error loading template', { status: 500 });
  }
}
