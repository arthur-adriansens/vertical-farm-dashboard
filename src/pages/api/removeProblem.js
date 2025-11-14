import { sql } from "../../lib/neon";

export const POST = async ({ request }) => {
    const body = await request.json();

    if (!body?.id) {
        return new Response("Er is iets <span style='color: red'>fout</span> verlopen.", { status: 422 });
    }

    // Database insertion
    await sql`DELETE FROM issues WHERE id=${body?.id}`; // Safe from SQL injection

    return new Response("Bedankt om dit probleem <span style='color: green'>succesvol</span> op te lossen!", { status: 200 });
};
