import HomeBlocks from "@/components/home/HomeBlocks";
import { getFields } from "@/lib/content/fields";
import { getHomeContent } from "@/lib/content/home";
import { getServices } from "@/lib/content/services";

export default async function Home() {
    const [fields, services, home] = await Promise.all([
        getFields(),
        getServices(),
        getHomeContent(),
    ]);

    return (
        <main className="pt-20">
            <HomeBlocks home={home} fields={fields} services={services} />
        </main>
    );
}
