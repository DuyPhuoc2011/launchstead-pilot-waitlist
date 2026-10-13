import { SignupForm } from "./signup-form";

export default function Home() {
  return (
    <main className="wrap">
      <p className="eyebrow">Ledgerly · coming soon</p>
      <h1>Bookkeeping that closes itself.</h1>
      <p className="lede">
        Ledgerly reconciles your bank feeds every night and flags only what needs a human. Join the waitlist for early access.
      </p>
      <SignupForm />
    </main>
  );
}
