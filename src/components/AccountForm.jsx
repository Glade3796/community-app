import { createAccountSubmit, editAccountSubmit } from "@/_lib/account_actions";
import { CreateProfBtn, SubmitBtn, UpdateProfBtn } from "./Buttons";

export default function AccountForm({ clerk_auth_id, edit, userData }) {
  //   const [form, setForm] = useState({ userData });

  return (
    <form
      className="grid grid-cols-2 gap-2"
      action={edit ? editAccountSubmit : createAccountSubmit}
    >
      {/* user info */}
      <h3 className="col-span-2 text-lg">User info:</h3>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        placeholder="username"
        name="username"
        defaultValue={userData?.username || ""}
      ></input>
      <label htmlFor="full_name">Fullname:</label>
      <input
        type="text"
        placeholder="fullname"
        name="full_name"
        defaultValue={userData?.full_name || ""}
      ></input>
      <label htmlFor="organisation_name">
        Are you part of a community organisation, if so which?:
      </label>
      <input
        type="text"
        placeholder="organisation"
        name="organisation_name"
        defaultValue={userData?.organisation || ""}
      ></input>
      <label htmlFor="biography">Biography:</label>
      <textarea
        name="biography"
        placeholder="biography"
        defaultValue={userData?.biography || ""}
      />
      {/* contact info */}
      <h3 className="col-span-2 text-lg">Contact info:</h3>

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        placeholder="email"
        name="email"
        defaultValue={userData?.email || ""}
      ></input>
      <label htmlFor="phone_number">Phone:</label>
      <input
        type="text"
        placeholder="phone number"
        name="phone_number"
        defaultValue={userData?.phone_number || ""}
      ></input>
      {/* address */}
      <h3 className="col-span-2 text-lg">Address info:</h3>

      <label htmlFor="address_number">Number:</label>
      <input
        type="text"
        placeholder="house/flat number"
        name="address_number"
        defaultValue={userData?.address_number || ""}
      ></input>
      <label htmlFor="address_street">Street:</label>
      <input
        type="text"
        placeholder="street/road name"
        name="address_street"
        defaultValue={userData?.address_street || ""}
      ></input>
      <label htmlFor="address_city">Town/city:</label>
      <input
        type="text"
        placeholder="town/city"
        name="address_city"
        defaultValue={userData?.address_city || ""}
      ></input>
      {/* TODO verify town exists */}
      <label htmlFor="address_postcode">Postcode:</label>
      <input
        type="text"
        placeholder="postcode"
        name="address_postcode"
        defaultValue={userData?.address_postcode || ""}
      ></input>
      {/* hidden */}
      <input type="hidden" name="clerk_auth_id" value={clerk_auth_id}></input>
      <input type="hidden" name="id" value={userData?.id}></input>
      {!edit && <CreateProfBtn />}
      {edit && <UpdateProfBtn />}
    </form>
  );
}
