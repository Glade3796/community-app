"use server";

import { db } from "@/_lib/db";
import { redirect } from "next/navigation";

//create account action
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

export async function createServicePost(formData) {
  // destructure the form data
  const user_id = formData.get("user_id");
  const post_type = formData.get("post_type");
  const title = formData.get("title");
  const content = formData.get("content");
  const quantity = formData.get("quantity");
  const frequency = formData.get("frequency");
  const date = formData.get("date");
  const available = formData.get("available");
  const closed = formData.get("closed");
  //console log data (server side)
  let post_id = null;
  try {
    console.log(
      "Creating post: --> \n user:",
      user_id,
      "| post_type:",
      post_type,
      "|\n title:",
      title,
      "|\n content:",
      content,
      "| quantity:",
      quantity,
      "| frequency:",
      frequency,
      "| date:",
      date,
      "|\n available:",
      available,
      "| closed:",
      closed,
      "---> to the database."
    );
    // create the post
    const response = await db.query(
      `INSERT INTO posts (user_id, post_type, title, content, quantity, frequency, date, available, closed) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
      [
        user_id,
        post_type,
        title,
        content,
        quantity,
        frequency,
        date,
        available,
        closed,
      ]
    );
    // console.log("res", response.rows[0].id);
    post_id = response.rows[0].id;

    //error handling
  } catch (error) {
    console.error("Error creating post:", error);
  } finally {
    redirect(`/service/${post_id}`);
  }
}
