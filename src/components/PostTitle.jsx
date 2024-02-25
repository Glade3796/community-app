export default function PostTitle({ form, handleInput, title }) {
  let titleTxt = "";
  let placeholder = "";

  switch (form.post_type) {
    case "asset":
      titleTxt = "Title(*): ";
      placeholder = "item to share/give away/borrowed";
      break;
    case "service":
      titleTxt = "Service(*): ";
      placeholder = "service i can offer";
      break;
    case "request":
      titleTxt = "Request(*): ";
      placeholder = "I need...";
      break;
    case "event":
      titleTxt = "Event name(*): ";
      placeholder = "event name";
      break;
    case "job":
      titleTxt = "Job title(*): ";
      placeholder = "job title";
      break;
    case "news":
      titleTxt = "Headline(*): ";
      placeholder = "headline";
      break;
    default:
      titleTxt = "Title(*): ";
      placeholder = "title";
      break;
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
        value={form.title}
        // minLength={5} disabled for development
      />
    </div>
  );
}
