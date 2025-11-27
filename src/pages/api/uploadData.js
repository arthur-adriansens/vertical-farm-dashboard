import { sql } from "../../lib/neon";

export const POST = async ({ request, redirect }) => {
    const body = await request.json();
    if (Object.keys(body).length !== 4) return new Response("Missing values!", { status: 422 });

    body["voltage"] = Number(body["voltage"].replace(" V", ""));
    body["bus_voltage"] = Number(body["bus_voltage"].replace(" V", ""));
    body["current"] = Number(body["current"].replace(" mA", ""));
    body["power"] = Number(body["power"].replace(" W", ""));

    // Database insertion
    try {
        const [data] =
            await sql`INSERT INTO powerdata (voltage, bus_voltage, current, power) VALUES (${body["voltage"]}, ${body["bus_voltage"]}, ${body["current"]}, ${body["power"]}) RETURNING *`; // Safe from SQL injection

        if (Object.keys(data)?.length == 0) throw new Error("Nothing was inserted!");
    } catch (error) {
        console.log(error);
        return new Response("Database error!", { status: 400 });
    }

    return new Response("Successfully added.", { status: 201 });
};
