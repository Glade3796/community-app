export async function GET() {
  try {
    const res = await db.query(`SELECT * FROM tags`);
    const tagData = await res.json();
    return new Response(JSON.stringify(tagData));
  } catch (error) {
    console.error("Error fetching tags:", error);
  }
}
