import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <h1 className="flex gap-2 items-center">
        <LayoutDashboard size={50} strokeWidth={1} className="text-slate-700" />
        Dashboard
      </h1>
      <p>The best Dashboard to manage data flows</p>
      <div className="flex gap-2 items-center">
        <Button asChild>
          <Link href="/login">Log in</Link>
        </Button>
        <small>or</small>
        <Button variant="outline" asChild>
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    </>
  );
}
