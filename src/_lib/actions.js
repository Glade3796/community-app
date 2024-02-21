"use server";

import { db } from "@/_lib/db";
import { revalidatePath } from "next/cache";
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
//* create post action
export async function createPost(formData) {
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
  const show_address = formData.get("show_address");
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
      `INSERT INTO posts (user_id, post_type, title, content, quantity, frequency, date, available, closed, show_address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
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
        show_address,
      ]
    );
    // console.log("res", response.rows[0].id);
    post_id = response.rows[0].id;

    //error handling
  } catch (error) {
    console.error("Error creating post:", error);
  } finally {
    redirect(`/post/${post_id}`);
  }
}

//* edit account action
export async function editAccountSubmit(formData) {
  const updated_at = Date.now() / 1000;
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
  const id = formData.get("id");
  //console log data (server side)
  try {
    console.log("submit edit", formData);
    // create the account
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
//* edit post action
export async function editPost(formData) {
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
  const show_address = formData.get("show_address");
  const id = formData.get("id");
  //console log data (server side)
  try {
    console.log(
      "Editing post: --> \n user:",
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
      `UPDATE posts SET user_id=$1, post_type=$2, title=$3, content=$4, quantity=$5, frequency=$6, date=$7, available=$8, closed=$9, show_address=$10 WHERE id=$11`,
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
        show_address,
        id,
      ]
    );
    // console.log("res", response.rows[0].id);

    //error handling
  } catch (error) {
    console.error("Error creating post:", error);
  } finally {
    redirect(`/post/${id}`);
  }
}
