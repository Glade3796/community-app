"use client";
import { useEffect, useState } from "react";
import { SelectPostType } from "../../../../components/DropDownInputs";
import PostTitle from "./PostTitle";
import { AddPostBtn } from "@/components/Buttons";
import { createServicePost } from "@/_lib/actions";

export default function AddServiceForm() {
  const user_id = 1; //TODO get user_id? from context?
  const [disableBtn, setDisableBtn] = useState(false); //set to false for development
  const [form, setForm] = useState({
    user_id: user_id,
    post_type: "asset",
    title: "",
    content: "",
    quantity: undefined,
    frequency: null,
    date: null,
    available: true,
    closed: false,
  });
  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  //closed checkbox logic
  function handleClosed() {
    setForm({ ...form, closed: !form.closed });
  }
  //available checkbox logic
  function handleAvailable() {
    setForm({ ...form, available: !form.available });
  }

  //disable button if form is invalid:

  //! disabled for development
  // useEffect(() => {
  //   if (form.title.length >= 5 && form.content.length >= 30) {
  //     setDisableBtn(false);
  //   }
  //   if (form.title.length >= 50) {
  //     setDisableBtn(true);
  //   }
  //   if (form.content.length >= 500) {
  //     setDisableBtn(true);
  //   }
  // }, [form.title.length, form.content.length]);
  return (
    <form
      action={createServicePost}
      className="flex flex-col justify-center items-center gap-4"
    >
      <h1>New post</h1>
      <SelectPostType handleInput={handleInput} />
      <input type="hidden" name="user_id" value={user_id} />
      <PostTitle form={form} handleInput={handleInput} />
      {/* title validation */}
      {form.title.length < 5 && !!form.title && (
        <p>must contain atleast 5 characters</p>
      )}
      {form.content.length > 50 && <p>must be less than 50 characters</p>}
      <div className="flex items-start">
        <label htmlFor="content">Description(*): </label>
        <textarea
          id="content"
          name="content"
          onInput={handleInput}
          // minLength={30} disabled for development
          // maxLength={500} disabled for development
        />
      </div>

      {/* content validation  */}
      {form.content.length < 30 && !!form.content && (
        <p>must contain atleast 30 characters</p>
      )}
      {form.content.length > 500 && <p>must be less than 500 characters</p>}

      {form.post_type === "asset" && (
        <div>
          <label htmlFor="quantity">Quantity: </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="quantity"
            onInput={handleInput}
          ></input>
        </div>
      )}
      {form.post_type === "service" && (
        <div>
          <label htmlFor="frequency">Frequency: </label>
          <input
            type="text"
            id="frequency"
            name="frequency"
            placeholder="frequency"
            onInput={handleInput}
          ></input>
        </div>
      )}
      {/* TODO validate date */}
      {form.post_type === "event" && (
        <div>
          <label htmlFor="date">Date of event: </label>
          <input type="date" name="date" onInput={handleInput} />
        </div>
      )}
      {form.post_type === "service" && (
        <div>
          <label htmlFor="available">Currently available?</label>
          <input
            type="checkbox"
            name="available"
            value={true}
            defaultChecked
            onInput={handleAvailable}
          />
        </div>
      )}
      {form.post_type === "asset" && (
        <div>
          <label htmlFor="available">Currently available?</label>
          <input
            type="checkbox"
            name="available"
            value={true}
            defaultChecked
            onInput={handleAvailable}
          />
        </div>
      )}
      <div>
        <label htmlFor="closed">Replies allowed?</label>
        <input
          type="checkbox"
          name="closed"
          value={form.closed}
          defaultChecked
          onInput={handleClosed}
        />
      </div>
      {form.closed && (
        <p>you won&apos;t hear from the community if they can&apos;t reply</p>
      )}
      <AddPostBtn disableBtn={disableBtn} />
      {disableBtn && <p>Please ensure required (*) items are filled inn</p>}
    </form>
  );
}
