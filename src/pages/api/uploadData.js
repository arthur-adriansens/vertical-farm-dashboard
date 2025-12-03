import { sql } from "../../lib/neon";

export const POST = async ({ request, redirect }) => {
    const body = await request.json();
    if (Object.keys(body).length !== 4) return new Response("Missing values!", { status: 422 });

    const numbersBody = Object.fromEntries(Object.entries(body).map(([k, v]) => [k, Number(String(v).split(" ")[0])]));

    console.log(numbersBody);
    // Database insertion
    try {
        const [data] =
            await sql`INSERT INTO powerdata (voltage, bus_voltage, current, power) VALUES (${numbersBody["voltage"]}, ${numbersBody["bus_voltage"]}, ${numbersBody["current"]}, ${numbersBody["power"]}) RETURNING *`; // Safe from SQL injection

        if (Object.keys(data)?.length == 0) throw new Error("Nothing was inserted!");
    } catch (error) {
        console.log(error);
        return new Response("Database error!", { status: 400 });
    }

    return new Response("Successfully added.", { status: 201 });
};
