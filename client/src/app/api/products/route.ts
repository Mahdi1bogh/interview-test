import { NextApiRequest } from 'next';

export async function POST(req: NextApiRequest) {
    const { name, description, price, supply } = req.body;
    const response = await fetch('http://localhost:5005/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, price, supply }),
    });
    const data = await response.json();
    return Response.json({ data })}
export async function GET() {
    const response = await fetch('http://localhost:5005/products');
    const data = await response.json();
    return Response.json({ data })
}