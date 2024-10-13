export async function GET(req: Request) {
    const res = req.body;
    console.log(res);
    return Response.json(res)
}

export async function POST(req: Request) {
  const res = req.json();

  console.log(res);

  return Response.json(res);
}
