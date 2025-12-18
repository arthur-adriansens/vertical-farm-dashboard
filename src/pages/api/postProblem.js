import { sql } from "../../lib/neon";

export const POST = async ({ request, redirect }) => {
    const form = await request.formData();

    const { name, category, discription } = Object.fromEntries(form.entries());
    if (!name || !category || !discription) {
        return new Response("Er is iets <span style='color: red'>fout</span> verlopen. Zorg dat <b>alle velden</b> ingevuld zijn!", { status: 422 });
    }

    // Database insertion
    try {
        await sql`INSERT INTO issues (name, category, discription) VALUES (${name}, ${category}, ${discription})`; // Safe from SQL injection
    } catch (error) {
        return new Response("Er is iets <span style='color: red'>fout</span> verlopen met de database.", { status: 500 });
    }

    return new Response("Bedankt om dit probleem <span style='color: green'>succesvol</span> te melden!", { status: 201 });
};
