"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

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
