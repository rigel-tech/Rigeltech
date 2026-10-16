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
        <div key={key} className="flex-none mx-6">
            <InlineImage
                path={`clients.logos[${index}].image`}
                docKey={docKey}
                src={client.image}
                alt={client.alt || ""}
                width={120}
                height={40}
                wrapperClassName="h-[64px] w-[148px] rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5 flex items-center justify-center"
                className="max-h-[40px] max-w-[116px] object-contain grayscale hover:grayscale-0 transition-all duration-200"
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
