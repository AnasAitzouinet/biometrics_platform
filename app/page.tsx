"use client";

import { authClient } from "@/lib/auth-client";
import UserOrgForm from "./UserOrgForm";
import OrganizationForm from "./OrgForm";
import InviteForm from "./InviteForm";
import AccepteInviteForm from "./AccepteInvite";
import { useEffect, useState } from "react";
import { set } from "zod";

export default function Home() {
  const [org, setOrg] = useState(null);
  const { data: session, error, isPending } = authClient.useSession();
  const { data: organizations } = authClient.useListOrganizations();

  useEffect(() => {
    const fetchOrganizations = async () => {
      const org = await authClient.organization.getFullOrganization()
      console.log(org)
    }
    fetchOrganizations();
  }
    , [session]);


  // Render a loading state while the session is pending.
  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  // Render an error state if the session retrieval fails.
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">
          Error: {error.message}
        </h1>
      </div>
    );
  }

  // Render a session-not-found state along with a sign-up form.
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <h1 className="text-xl font-semibold">No session found</h1>
        <UserOrgForm />
      </div>
    );
  }

  // Main UI when a session exists.
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {session.user?.name}!
      </h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Organizations</h2>
        {organizations && organizations.length > 0 ? (
          <ul className="list-disc pl-5">
            {organizations.map((org) => (
              <li key={org.id} className="mb-2">
                {org.name}

              </li>
            ))}
          </ul>
        ) : (
          <p>No organizations found</p>
        )}
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Create Organization</h2>
        <OrganizationForm />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Invite User</h2>
        <InviteForm />
      </section>

    </div>
  );
}
