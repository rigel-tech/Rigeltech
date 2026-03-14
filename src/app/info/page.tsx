import { Suspense } from "react";
import BusinessCardClient from "@/components/info/BusinessCardClient";
import { getTeamMembers } from "@/lib/content/team";

export default async function InfoPage() {
    const teamMembers = await getTeamMembers();

    return (
        <div className="min-h-screen py-16 md:py-24 flex items-center justify-center bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900">
            <div className="container mx-auto px-4">
                <Suspense
                    fallback={
                        <div className="text-white text-center">Loading...</div>
                    }
                >
                    <BusinessCardClient teamMembers={teamMembers} />
                </Suspense>
            </div>
        </div>
    );
}
