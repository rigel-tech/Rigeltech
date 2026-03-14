"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import type { TeamMember } from "@/lib/content/team-static";
import InlineBlock from "@/components/admin/InlineBlock";
import InlineImage from "@/components/admin/InlineImage";
import InlineText from "@/components/admin/InlineText";

const formatPhoneNumber = (phone: string, isEnglish: boolean) => {
    if (!phone) return "";

    if (isEnglish) {
        return (
            "+84 " +
            phone.substring(1).replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")
        );
    }
    return phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3");
};

export default function BusinessCardClient({
    teamMembers,
}: {
    teamMembers: TeamMember[];
}) {
    const searchParams = useSearchParams();
    const [member, setMember] = useState<TeamMember | null>(null);

    useEffect(() => {
        const id = searchParams.get("id");
        const foundMember = id
            ? teamMembers.find((m) => m.id === id)
            : teamMembers[0];

        setMember(foundMember || teamMembers[0]);
    }, [searchParams, teamMembers]);

    if (!member)
        return <div className="text-white text-center">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            {/* Vietnamese Business Card */}
            <InlineBlock
                path="name.vi"
                paths={[
                    "name.vi",
                    "position.vi",
                    "phone",
                    "mobile",
                    "email",
                    "qrCode",
                ]}
                docKey={member.id}
                className="bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-md mx-auto"
            >
                <div className="p-8 relative">
                    {/* Company Logo - TOP RIGHT position */}
                    <div className="absolute top-4 right-4 flex flex-col items-center">
                        <Image
                            src="/logo-nobackground.png"
                            alt="DIGIFUND Logo"
                            width={80}
                            height={80}
                            className="h-14 w-14 object-contain"
                        />
                        <h1 className="text-l font-bold text-[#ffbd59] -mt-2">
                            DIGIFUND
                        </h1>
                    </div>

                    {/* Header - Director name on LEFT */}
                    <div className="mb-8 mt-2">
                        <div className="max-w-[70%]">
                            <InlineText
                                as="h2"
                                path="name.vi"
                                docKey={member.id}
                                value={member.name.vi}
                                className="text-xl font-bold text-gray-800 whitespace-nowrap"
                            />
                            <InlineText
                                as="p"
                                path="position.vi"
                                docKey={member.id}
                                value={member.position.vi}
                                className="text-[12px] sm:text-[14px] text-primary-600 font-medium"
                            />
                        </div>
                    </div>

                    {/* Company full name - now below both sections */}
                    <div className="text-center mb-2">
                        <p className="text-xs text-gray-500">
                            CÔNG TY CỔ PHẦN CÔNG NGHỆ DIGIFUND
                        </p>
                        <p className="text-xs text-gray-500">MST: 0318817989</p>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-300 to-transparent mb-4"></div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 gap-3">
                        {member.phone && (
                            <div className="flex items-center text-sm text-gray-700">
                                <span className="text-primary-600 mr-3 w-6 text-center">
                                    📞
                                </span>
                                <a
                                    href={`tel:${member.phone}`}
                                    className="hover:text-primary-600 transition-colors"
                                >
                                    <InlineText
                                        as="span"
                                        path="phone"
                                        docKey={member.id}
                                        value={formatPhoneNumber(member.phone, false)}
                                        className="text-sm text-gray-700"
                                    />
                                </a>
                            </div>
                        )}
                        <div className="flex items-center text-sm text-gray-700">
                            <span className="text-primary-600 mr-3 w-6 text-center">
                                📱
                            </span>
                            <a
                                href={`tel:${member.mobile}`}
                                className="hover:text-primary-600 transition-colors"
                            >
                                <InlineText
                                    as="span"
                                    path="mobile"
                                    docKey={member.id}
                                    value={formatPhoneNumber(member.mobile, false)}
                                    className="text-sm text-gray-700"
                                />
                            </a>
                        </div>
                        <div className="flex items-start text-sm text-gray-700">
                            <span className="text-primary-600 mr-3 w-6 text-center">
                                <FaMapMarkerAlt className="w-6 h-5 mx-auto" />
                            </span>
                            <a
                                href="https://maps.app.goo.gl/2sGGhNsj73ecWaaU7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary-600 transition-colors"
                            >
                                Số 156 Đường Nam Kỳ Khởi Nghĩa, Phường Bến Nghé,
                                Quận 1, Thành phố Hồ Chí Minh
                            </a>
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                            <span className="text-primary-600 mr-3 w-6 text-center">
                                ✉️
                            </span>
                            <a
                                href={`mailto:${member.email}`}
                                className="hover:text-primary-600 transition-colors"
                            >
                                <InlineText
                                    as="span"
                                    path="email"
                                    docKey={member.id}
                                    value={member.email}
                                    className="text-sm text-gray-700"
                                />
                            </a>
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                            <span className="text-primary-600 mr-3 w-6 text-center">
                                🌐
                            </span>
                            <a
                                href="https://digifund.tech"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary-600 transition-colors"
                            >
                                digifund.tech
                            </a>
                        </div>
                    </div>

                    {/* Bottom Accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 to-primary-700"></div>

                    {/* Bottom right corner image - QR code */}
                    <div className="absolute bottom-2 right-2">
                        <InlineImage
                            path="qrCode"
                            docKey={member.id}
                            src={member.qrCode}
                            alt="QR Code"
                            width={80}
                            height={80}
                            className="object-contain"
                        />
                    </div>
                </div>
            </InlineBlock>

            {/* English Business Card - Added below */}
            <InlineBlock
                path="name.en"
                paths={[
                    "name.en",
                    "position.en",
                    "phone",
                    "mobile",
                    "email",
                    "qrCode",
                ]}
                docKey={member.id}
                className="bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-md mx-auto mt-10"
            >
                <div className="p-8 relative">
                    {/* Company Logo - TOP RIGHT position */}
                    <div className="absolute top-4 right-4 flex flex-col items-center">
                        <Image
                            src="/logo-nobackground.png"
                            alt="DIGIFUND Logo"
                            width={80}
                            height={80}
                            className="h-14 w-14 object-contain"
                        />
                        <h1 className="text-l font-bold text-[#ffbd59] -mt-2">
                            DIGIFUND
                        </h1>
                    </div>

                    {/* Header - Director name on LEFT */}
                    <div className="mb-8 mt-2">
                        <div className="max-w-[70%]">
                            <InlineText
                                as="h2"
                                path="name.en"
                                docKey={member.id}
                                value={member.name.en}
                                className="text-xl font-bold text-gray-800 whitespace-nowrap"
                            />
                            <InlineText
                                as="p"
                                path="position.en"
                                docKey={member.id}
                                value={member.position.en}
                                className="text-[12px] sm:text-[14px] text-primary-600 font-medium"
                            />
                        </div>
                    </div>

                    {/* Company full name - now below both sections */}
                    <div className="text-center mb-2">
                        <p className="text-xs text-gray-500">
                            DIGIFUND TECHNOLOGY JOINT STOCK COMPANY
                        </p>
                        <p className="text-xs text-gray-500">
                            Tax ID: 0318817989
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-300 to-transparent mb-4"></div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 gap-3">
                        {member.phone && (
                            <div className="flex items-center text-sm text-gray-700">
                                <span className="text-primary-600 mr-3 w-6 text-center">
                                    📞
                                </span>
                                <a
                                    href={`tel:${member.phone}`}
                                    className="hover:text-primary-600 transition-colors"
                                >
                                    <InlineText
                                        as="span"
                                        path="phone"
                                        docKey={member.id}
                                        value={formatPhoneNumber(member.phone, true)}
                                        className="text-sm text-gray-700"
                                    />
                                </a>
                            </div>
                        )}
                        <div className="flex items-center text-sm text-gray-700">
                            <span className="text-primary-600 mr-3 w-6 text-center">
                                📱
                            </span>
                            <a
                                href={`tel:${member.mobile}`}
                                className="hover:text-primary-600 transition-colors"
                            >
                                <InlineText
                                    as="span"
                                    path="mobile"
                                    docKey={member.id}
                                    value={formatPhoneNumber(member.mobile, true)}
                                    className="text-sm text-gray-700"
                                />
                            </a>
                        </div>
                        <div className="flex items-start text-sm text-gray-700">
                            <span className="text-primary-600 mr-3 w-6 text-center">
                                <FaMapMarkerAlt className="w-6 h-5 mx-auto" />
                            </span>
                            <a
                                href="https://maps.app.goo.gl/2sGGhNsj73ecWaaU7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary-600 transition-colors"
                            >
                                156 Nam Ky Khoi Nghia Street, Ben Nghe Ward,
                                District 1, Ho Chi Minh City
                            </a>
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                            <span className="text-primary-600 mr-3 w-6 text-center">
                                ✉️
                            </span>
                            <a
                                href={`mailto:${member.email}`}
                                className="hover:text-primary-600 transition-colors"
                            >
                                <InlineText
                                    as="span"
                                    path="email"
                                    docKey={member.id}
                                    value={member.email}
                                    className="text-sm text-gray-700"
                                />
                            </a>
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                            <span className="text-primary-600 mr-3 w-6 text-center">
                                🌐
                            </span>
                            <a
                                href="https://digifund.tech"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary-600 transition-colors"
                            >
                                digifund.tech
                            </a>
                        </div>
                    </div>

                    {/* Bottom Accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 to-primary-700"></div>

                    {/* Bottom right corner image - QR code */}
                    <div className="absolute bottom-2 right-2">
                        <InlineImage
                            path="qrCode"
                            docKey={member.id}
                            src={member.qrCode}
                            alt="QR Code"
                            width={80}
                            height={80}
                            className="object-contain"
                        />
                    </div>
                </div>
            </InlineBlock>
        </div>
    );
}

