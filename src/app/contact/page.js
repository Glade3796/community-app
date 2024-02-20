import gp1 from "@/../public/images/gp1.png";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <h2>How we are different?</h2>
      <ul>
        <p>
          We are different from other local groups because of the following :
        </p>
        <li>
          <strong>Trust</strong> — We ensure you are connected to real people in
          neighbourhoods that matter to you.
        </li>

        <li>
          <strong>Local perspective</strong> — Whether you need to find a local
          professional or a lost dog, your neighbours can help — and you can
          reach out to them instantly.
        </li>

        <li>
          <strong>Proximity</strong> — You are automatically connected to
          everyone nearby so you can build real-world connections.
        </li>

        <br></br>
        <Image src={gp1} alt="Importance of Posting" placeholder="blur" />
        <h2>There are a couple ways you can contact FAA : </h2>
        <li>
          Report a post or member. FAAA encourages healthy debate and serves as
          an open, positive platform where neighbors can discuss topics of local
          interest. To report content or members who violate our Community
          Guidelines, email : <strong>FAAA_report@hotmail.co.uk</strong>
        </li>
        <li>
          If you are experiencing an issue with the Nextdoor app or website, the
          most effective way to let us know is to send an message to our support
          team&apos;s email : <strong>FAAA_support@hotmail.co.uk</strong>
        </li>
      </ul>
    </div>
  );
}
