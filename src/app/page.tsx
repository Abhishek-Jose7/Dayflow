import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg-app)",
      textAlign: "center",
      padding: "2rem"
    }}>
      <h1 style={{ fontSize: "4rem", fontWeight: 700, marginBottom: "1rem", color: "var(--primary)" }}>Dayflow.</h1>
      <p style={{ fontSize: "1.5rem", color: "var(--text-secondary)", marginBottom: "3rem", maxWidth: "600px" }}>
        Every workday, perfectly aligned. The modern HRMS for forward-thinking teams.
      </p>

      <div style={{ display: "flex", gap: "1rem" }}>
        <Link href="/login">
          <Button style={{ padding: "1rem 2.5rem", fontSize: "1.1rem" }}>Login</Button>
        </Link>
        <Link href="/register">
          <Button variant="outline" style={{ padding: "1rem 2.5rem", fontSize: "1.1rem" }}>Register</Button>
        </Link>
      </div>
    </div>
  );
}
