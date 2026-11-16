import { SignupForm } from "./signup-form";

export default function Home() {
  return (
    <main className="wrap">
      <p className="eyebrow">Ledgerly · early access opens December 1</p>
      <h1>Bookkeeping that closes itself.</h1>
      <p className="lede">
        Ledgerly reconciles your bank feeds every night and flags only what needs a human. Join the waitlist for early access (drill C).
      </p>
      <SignupForm />
    </main>
  );
}
