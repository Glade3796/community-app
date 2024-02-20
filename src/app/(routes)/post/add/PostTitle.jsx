export default function PostTitle({ form, handleInput, title }) {
  let titleTxt = "";
  let placeholder = "";
  if (form.post_type === "asset") {
    titleTxt = "Title(*): ";
    placeholder = "item to share/give away/borrowed";
  } else if (form.post_type === "service") {
    titleTxt = "Service(*): ";
    placeholder = "service i can offer";
  } else if (form.post_type === "request") {
    titleTxt = "Request(*): ";
    placeholder = "I need...";
  } else if (form.post_type === "event") {
    titleTxt = "Event name(*): ";
    placeholder = "event name";
  } else if (form.post_type === "job") {
    titleTxt = "Job title(*): ";
    placeholder = "job title";
  } else if (form.post_type === "news") {
    titleTxt = "Headline(*): ";
    placeholder = "headline";
  } else {
    titleTxt = "Title(*): ";
    placeholder = "title";
  }
  return (
    <div>
      <label htmlFor="title">{titleTxt}</label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder={placeholder}
        onInput={handleInput}
        required
        // minLength={5} disabled for development
      />
    </div>
  );
}
