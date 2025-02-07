import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const body = req.json();
    const response = await fetch('https://interview-test-5hkw.onrender.com/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    return Response.json({ data })}

export async function GET() {
    const response = await fetch('https://interview-test-5hkw.onrender.com/products',{headers: {
        'Content-Type': 'application/json',
    },});
    return Response.json({ response })
}