import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'AAXOL Node.js Web Server',
    environment: process.env.NODE_ENV || 'development',
  });
}
