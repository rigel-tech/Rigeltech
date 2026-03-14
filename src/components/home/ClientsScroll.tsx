"use client";

import InlineImage from "@/components/admin/InlineImage";

type ClientLogo = {
    id: string;
    image: string;
    alt: string;
};

type ClientsScrollProps = {
    logos: ClientLogo[];
    docKey?: string;
};

export default function ClientsScroll({ logos, docKey }: ClientsScrollProps) {
    const items = Array.isArray(logos) ? logos : [];

    const renderLogo = (client: ClientLogo, index: number, key: string) => (
        <div key={key} className="flex-none mx-8 w-[120px]">
            <InlineImage
                path={`clients.logos[${index}].image`}
                docKey={docKey}
                src={client.image}
                alt={client.alt || ""}
                width={120}
                height={60}
                className="grayscale hover:grayscale-0 transition-all w-auto h-auto"
                style={{ width: "auto", height: "auto" }}
            />
        </div>
    );

    return (
        <div className="relative w-full overflow-hidden">
            <div className="inline-flex animate-smooth-scroll">
                <div className="flex">
                    {items.map((client, index) =>
                        renderLogo(client, index, `${client.id}-${index}`),
                    )}
                </div>
                <div className="flex">
                    {items.map((client, index) =>
                        renderLogo(
                            client,
                            index,
                            `${client.id}-${index}-duplicate`,
                        ),
                    )}
                </div>
            </div>
        </div>
    );
}
