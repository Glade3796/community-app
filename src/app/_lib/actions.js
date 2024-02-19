"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function createAccountSubmit(formData) {
  // destructure the form data
  const username = formData.get("username");
  const full_name = formData.get("fullname");
  const organisation_name = formData.get("organisation");
  const biography = formData.get("biography");
  const email = formData.get("email");
  const phone_number = formData.get("phone_number");
  const address_number = formData.get("address_number");
  const address_street = formData.get("address_street");
  const address_city = formData.get("address_city");
  const address_postcode = formData.get("address_postcode");
  const clerk_auth_id = formData.get("clerk_auth_id");
  //console log data (server side)
  try {
    console.log(
      "Adding... --> user:",
      username,
      "| name:",
      full_name,
      "| organisation:",
      organisation_name,
      "| biography:",
      biography,
      "| email:",
      email,
      "| phone:",
      phone_number,
      "| address:",
      address_number,
      address_street,
      address_city,
      address_postcode,
      "| clerk_auth_id:",
      clerk_auth_id,
      "---> to the database."
    );
    // create the account
    const response = await db.query(
      `INSERT INTO users (username, full_name, organisation_name, biography, email, phone_number, address_number, address_street, address_city, address_postcode, clerk_auth_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        username,
        full_name,
        organisation_name,
        biography,
        email,
        phone_number,
        address_number,
        address_street,
        address_city,
        address_postcode,
        clerk_auth_id,
      ]
    );

    redirect("/dashboard");
    //error handling
  } catch (error) {
    console.error("Error creating account:", error);
    if (error.code === "23505") {
      throw new Error("Profile already linked to clerk account.");
    }
  }
}
