import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function GET() {
  try {
    // Uncomment this line to use a database
    // const data = await db.select().from(advocates);

    const data = advocateData;

    if (data?.length === 0) return Response.json({ data: [] });
    return Response.json({ data });
  } catch (error) {
    return Response.error();
  }
}
