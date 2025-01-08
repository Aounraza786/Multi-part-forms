export async function POST(req) {
  const body = await req.json();
  console.log("Form Data:", body);

  return new Response(
    JSON.stringify({ message: "Form submitted successfully" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
