import ContactPageClient from "@/components/contact/ContactPageClient";
import { getSiteSettings } from "@/lib/content/site";

export default async function ContactPage() {
    const site = await getSiteSettings();

    return <ContactPageClient site={site} />;
}
