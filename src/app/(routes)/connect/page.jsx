import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <strong>
        <h1 className="text-4xl text-center p-2">Contact Us</h1>
        <h2 className="text-2xl text-center p-2">How we are different?</h2>
      </strong>
      <div className="text-center p-20 mx-10">
        <ul>
          <li>
            <strong>Trust</strong> — We ensure you are connected to real people
            in neighbourhoods that matter to you.
          </li>

          <li>
            <strong>Local perspective</strong> — Whether you need to find a
            local professional or a lost dog, your neighbours can help — and you
            can reach out to them instantly.
          </li>

          <li>
            <strong>Proximity</strong> — You are automatically connected to
            everyone nearby so you can build real-world connections.
          </li>
          <li>
            <div className="text-center p-20 mx-10">
              <strong>
                <p>Email us at : hello@neighbourly.com</p>
              </strong>
            </div>
          </li>
        </ul>
      </div>
    </main>
  );
}
