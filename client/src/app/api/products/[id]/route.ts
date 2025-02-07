// purchase 
export async function POST(req: Request, { params }: { params: { id: string } }) {
    const response = await fetch(`http://localhost:5005/products/${params.id}/purchase`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    })
    const data = await response.json()
    return Response.json({ data })}