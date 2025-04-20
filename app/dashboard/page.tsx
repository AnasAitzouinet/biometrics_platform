import React from 'react'
import { auth } from "@/lib/auth";
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
export default async function page() {
    const data = await auth.api.getSession({
        headers: await headers(),
    });

    console.log(data);
  return (
    <div>page</div>
  )
}
