//create account form, consider moving to component and forcing user to create an account if no profile exists for them

import { createAccountSubmit } from "@/app/_lib/actions";
import { SubmitBtn } from "@/components/Buttons";
import { auth } from "@clerk/nextjs";

export default async function CreateAccountPage() {
  // get the clerk user id
  const clerk_auth_id = auth().userId;

  return (
    <div>
      <h1>Create Account</h1>
      <form className="grid grid-cols-2 gap-2" action={createAccountSubmit}>
        {/* user info */}
        <h3 className="col-span-2 text-lg">User info:</h3>
        <label htmlFor="username">Username:</label>
        <input type="text" placeholder="username" name="username"></input>
        <label htmlFor="fullname">Fullname:</label>
        <input type="text" placeholder="fullname" name="fullname"></input>
        <label htmlFor="organisation">
          Are you part of a community organisation, if so which?:
        </label>
        <input
          type="text"
          placeholder="organisation"
          name="organisation"
        ></input>
        <label htmlFor="biography">Biography:</label>
        <textarea name="biography" placeholder="biography" />
        {/* contact info */}
        <h3 className="col-span-2 text-lg">Contact info:</h3>

        <label htmlFor="email">Email:</label>
        <input type="email" placeholder="email" name="email"></input>
        <label htmlFor="phone_number">Phone:</label>
        <input
          type="text"
          placeholder="phone number"
          name="phone_number"
        ></input>
        {/* address */}
        <h3 className="col-span-2 text-lg">Address info:</h3>

        <label htmlFor="address_number">Number:</label>
        <input
          type="text"
          placeholder="house/flat number"
          name="address_number"
        ></input>
        <label htmlFor="address_street">Street:</label>
        <input
          type="text"
          placeholder="street/road name"
          name="address_street"
        ></input>
        <label htmlFor="address_city">Town/city:</label>
        <input type="text" placeholder="town/city" name="address_city"></input>
        {/* TODO verify town exists */}
        <label htmlFor="address_postcode">Postcode:</label>
        <input
          type="text"
          placeholder="postcode"
          name="address_postcode"
        ></input>
        {/* hidden */}
        <input type="hidden" name="clerk_auth_id" value={clerk_auth_id}></input>
        <SubmitBtn />
      </form>
    </div>
  );
}
