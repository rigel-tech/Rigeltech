"use client";

import { useState } from "react";
import type { SiteSettings } from "@/lib/content/site";
import InlineBlock from "@/components/admin/InlineBlock";
import InlineText from "@/components/admin/InlineText";

export default function ContactPageClient({ site }: { site: SiteSettings }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <main className="min-h-screen">
            <section className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary-600 mb-6">
                            Liên Hệ Với Chúng Tôi
                        </h1>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            Hãy để lại thông tin, chúng tôi sẽ liên hệ với bạn
                            sớm nhất
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <InlineBlock
                                path="companyName"
                                paths={[
                                    "companyName",
                                    "taxId",
                                    "mainOffice",
                                    "branchOffice",
                                    "hotline",
                                    "email",
                                    "website",
                                ]}
                                docKey={site.key}
                                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8"
                            >
                                <h3 className="text-xl font-semibold text-primary-600 mb-6">
                                    Thông Tin Liên Hệ
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-4">
                                        <div>
                                            <h4 className="font-medium text-gray-800">
                                                <InlineText
                                                    as="span"
                                                    path="companyName"
                                                    docKey={site.key}
                                                    value={site.companyName}
                                                    className="font-medium text-gray-800"
                                                />{" "}
                                                | MST:{" "}
                                                <InlineText
                                                    as="span"
                                                    path="taxId"
                                                    docKey={site.key}
                                                    value={site.taxId}
                                                    className="font-medium text-gray-800"
                                                />
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <span className="text-2xl">📍</span>
                                        <div>
                                            <h4 className="font-medium text-gray-800">
                                                Trụ sở chính
                                            </h4>
                                            <InlineText
                                                as="p"
                                                path="mainOffice"
                                                docKey={site.key}
                                                value={site.mainOffice}
                                                className="text-gray-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <span className="text-2xl">📍</span>
                                        <div>
                                            <h4 className="font-medium text-gray-800">
                                                VP giao dịch
                                            </h4>
                                            <InlineText
                                                as="p"
                                                path="branchOffice"
                                                docKey={site.key}
                                                value={site.branchOffice}
                                                className="text-gray-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <span className="text-2xl">📞</span>
                                        <div>
                                            <h4 className="font-medium text-gray-800">
                                                Hotline
                                            </h4>
                                            <InlineText
                                                as="p"
                                                path="hotline"
                                                docKey={site.key}
                                                value={site.hotline}
                                                className="text-gray-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <span className="text-2xl">✉️</span>
                                        <div>
                                            <h4 className="font-medium text-gray-800">
                                                Email
                                            </h4>
                                            <InlineText
                                                as="p"
                                                path="email"
                                                docKey={site.key}
                                                value={site.email}
                                                className="text-gray-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <span className="text-2xl">🌐</span>
                                        <div>
                                            <h4 className="font-medium text-gray-800">
                                                Website:
                                            </h4>

                                            <InlineText
                                                as="p"
                                                path="website"
                                                docKey={site.key}
                                                value={site.website}
                                                className="text-gray-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </InlineBlock>

                            <InlineBlock
                                path="workingHours"
                                paths={["workingHours"]}
                                docKey={site.key}
                                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8"
                            >
                                <h3 className="text-xl font-semibold text-primary-600 mb-6">
                                    Giờ làm việc
                                </h3>
                                <div className="space-y-2">
                                    {site.workingHours.map((item, index) => (
                                        <p
                                            key={`${item.label}-${index}`}
                                            className="flex justify-between"
                                        >
                                            <InlineText
                                                as="span"
                                                path={`workingHours[${index}].label`}
                                                docKey={site.key}
                                                value={item.label}
                                                className="text-gray-500"
                                            />
                                            <InlineText
                                                as="span"
                                                path={`workingHours[${index}].value`}
                                                docKey={site.key}
                                                value={item.value}
                                                className="text-gray-800"
                                            />
                                        </p>
                                    ))}
                                </div>
                            </InlineBlock>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8">
                            <h3 className="text-xl font-semibold text-primary-600 mb-6">
                                Gửi tin nhắn cho chúng tôi
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Họ và tên
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Nhập họ và tên của bạn"
                                        title="Họ và tên"
                                        aria-label="Họ và tên"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        required
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Nhập email của bạn"
                                        title="Email"
                                        aria-label="Email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        required
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="Nhập số điện thoại của bạn"
                                        title="Số điện thoại"
                                        aria-label="Số điện thoại"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                phone: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Tiêu đề
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder="Nhập tiêu đề tin nhắn"
                                        title="Tiêu đề"
                                        aria-label="Tiêu đề"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        required
                                        value={formData.subject}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                subject: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nội dung
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        placeholder="Nhập nội dung tin nhắn"
                                        title="Nội dung"
                                        aria-label="Nội dung"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        required
                                        value={formData.message}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                message: e.target.value,
                                            })
                                        }
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 px-6 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                                >
                                    Gửi tin nhắn
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
