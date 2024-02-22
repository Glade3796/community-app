"use server";

import { db } from "@/_lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//create account action
export async function createAccountSubmit(formData) {
  // destructure the form data
  const {
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
  } = Object.fromEntries(formData.entries());
  //console log data (server side)
  try {
    console.log("Adding user: -->" + full_name + " to the database.");
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
  } catch (error) {
    console.error("Error creating account:", error);
    if (error.code === "23505") {
      throw new Error("Profile already linked to clerk account.");
    }
  }
}

//* edit account action
export async function editAccountSubmit(formData) {
    const updated_at = Date.now() / 1000;
    // destructure the form data
    const {
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
      id,
    } = Object.fromEntries(formData.entries());
    try {
      console.log("submit edit", formData);
      const response = await db.query(
        `UPDATE users SET username=$1, full_name=$2, organisation_name=$3, biography=$4, email=$5, phone_number=$6, address_number=$7, address_street=$8, address_city=$9, address_postcode=$10 WHERE id=$11 RETURNING *`,
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
          id,
        ]
      );
      const res = response.rows[0];
      if (res.length === 0) {
        throw new Error("No user found");
      }
      console.log("updated user account:", res);
      //error handling
    } catch (error) {
      console.error("Error updating account:", error);
    } finally {
      revalidatePath("/account/profile");
      redirect("/account/profile");
    }
  }