"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Home() {

  const {
    data: session,
    isPending,
  } = authClient.useSession();
  
  console.log("session", session);
  
  return (
    <div className="container mx-auto p-4">
      <Button asChild>
        <Link href={"/Auth/org/Login"}>
          Organization
        </Link>

      </Button>
      <Button asChild>
        <Link href={"/Auth/Emp/Login"}>
          User
        </Link>
      </Button>
    </div>
  );
}
