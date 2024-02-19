//Drop down components
"use client";
//Drop down for selecting the type of post
export function SelectPostType({ handleInput }) {
  const types = [
    "asset",
    "service",
    "request",
    "event",
    // "job",
    "news",
    "other",
  ]; //line 25 of schema.sql
  return (
    <div>
      <label htmlFor="post_type">Post type(*): </label>
      <select
        name="post_type"
        id="postType"
        onInput={handleInput}
        defaultValue={"asset"}
      >
        {types.map((type, i) => (
          <option value={type} key={i + type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}
