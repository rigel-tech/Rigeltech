"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import InlineBlock from "@/components/admin/InlineBlock";
import InlineImage from "@/components/admin/InlineImage";
import InlineText from "@/components/admin/InlineText";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type BannerSlide = {
    id: string;
    image: string;
    alt: string;
    title: string;
    description: string;
};

type BannerSliderProps = {
    slides: BannerSlide[];
    docKey?: string;
};

export default function BannerSlider({ slides, docKey }: BannerSliderProps) {
    const items = Array.isArray(slides) ? slides : [];
    return (
        <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="banner-swiper h-full"
            style={{ height: '100%', minHeight: '600px' }}
        >
            {items.map((banner, index) => (
                <SwiperSlide key={banner.id || index} style={{ height: '100%' }}>
                    <InlineBlock
                        path={`bannerSlides[${index}]`}
                        docKey={docKey}
                        className="relative h-[600px] md:h-[720px]"
                    >
                        <InlineImage
                            path={`bannerSlides[${index}].image`}
                            docKey={docKey}
                            src={banner.image}
                            alt={banner.alt || ""}
                            width={1920}
                            height={720}
                            priority
                            className="object-cover w-full h-full"
                            wrapperClassName="relative w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black/50">
                            <div className="container mx-auto px-4 h-full flex items-center">
                                <div className="max-w-2xl text-white">
                                    <InlineText
                                        as="h1"
                                        path={`bannerSlides[${index}].title`}
                                        docKey={docKey}
                                        value={banner.title}
                                        className="text-5xl font-bold mb-6"
                                    />
                                    <InlineText
                                        as="p"
                                        path={`bannerSlides[${index}].description`}
                                        docKey={docKey}
                                        value={banner.description}
                                        className="text-xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </InlineBlock>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
