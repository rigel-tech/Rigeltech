/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useRef } from "react";

interface Position {
    id: string;
    title: string;
}

interface ApplicationFormProps {
    positions: Position[];
}

export default function ApplicationForm({ positions }: ApplicationFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        linkedin: "",
        message: "",
    });

    const [fileSelected, setFileSelected] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>("");
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError("File CV không được lớn hơn 5MB");
                setFileSelected(false);
                setFileName("");
                return;
            }

            // Validate file type
            const allowedTypes = [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ];
            if (!allowedTypes.includes(file.type)) {
                setError("Chỉ chấp nhận file PDF hoặc DOCX");
                setFileSelected(false);
                setFileName("");
                return;
            }

            setFileSelected(true);
            setFileName(file.name);
            setError(null);
        } else {
            setFileSelected(false);
            setFileName("");
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        // Validate form
        if (!fileSelected) {
            setError("Vui lòng đính kèm CV của bạn");
            setSubmitting(false);
            return;
        }

        // Here you would normally submit to an API endpoint
        try {
            // Simulating API call with timeout
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Reset form
            setFormData({
                name: "",
                email: "",
                phone: "",
                position: "",
                experience: "",
                linkedin: "",
                message: "",
            });
            setFileSelected(false);
            setFileName("");
            setSubmitted(true);

            // Reset submission state after showing success message
            setTimeout(() => {
                setSubmitted(false);
            }, 5000);
        } catch (err) {
            setError(
                "Có lỗi xảy ra khi gửi đơn ứng tuyển. Vui lòng thử lại sau.",
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            {submitted ? (
                <div className="bg-green-500/20 text-green-400 p-6 rounded-lg text-center">
                    <h3 className="text-xl font-semibold mb-2">
                        Gửi đơn ứng tuyển thành công!
                    </h3>
                    <p>
                        Chúng tôi sẽ liên hệ với bạn sớm nhất có thể. Cảm ơn bạn
                        đã quan tâm đến DIGIFUND.
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-white mb-2"
                            >
                                Họ và tên{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-white mb-2"
                            >
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-white mb-2"
                            >
                                Số điện thoại{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                            />
                        </div>

                        {/* Position */}
                        <div>
                            <label
                                htmlFor="position"
                                className="block text-white mb-2"
                            >
                                Vị trí ứng tuyển{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="position"
                                    name="position"
                                    required
                                    value={formData.position}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 pr-10 rounded-lg bg-white/5 border border-white/10 text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 appearance-none"
                                >
                                    <option value="" disabled>
                                        Chọn vị trí
                                    </option>
                                    {positions.map((pos) => (
                                        <option key={pos.id} value={pos.id}>
                                            {pos.title}
                                        </option>
                                    ))}
                                    <option value="other">Vị trí khác</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white/60">
                                    <svg
                                        className="h-4 w-4 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Experience */}
                        <div>
                            <label
                                htmlFor="experience"
                                className="block text-white mb-2"
                            >
                                Kinh nghiệm{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="experience"
                                    name="experience"
                                    required
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 pr-10 rounded-lg bg-white/5 border border-white/10 text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 appearance-none"
                                >
                                    <option value="" disabled>
                                        Chọn kinh nghiệm
                                    </option>
                                    <option value="fresher">
                                        Fresher (0-1 năm)
                                    </option>
                                    <option value="junior">
                                        Junior (1-2 năm)
                                    </option>
                                    <option value="mid">
                                        Mid-level (2-4 năm)
                                    </option>
                                    <option value="senior">
                                        Senior (4+ năm)
                                    </option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white/60">
                                    <svg
                                        className="h-4 w-4 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* LinkedIn */}
                        <div>
                            <label
                                htmlFor="linkedin"
                                className="block text-white mb-2"
                            >
                                LinkedIn (nếu có)
                            </label>
                            <input
                                type="url"
                                id="linkedin"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/username"
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                            />
                        </div>
                    </div>

                    {/* CV Upload */}
                    <div>
                        <label htmlFor="cv" className="block text-white mb-2">
                            CV của bạn <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="file"
                                id="cv"
                                name="cv"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx"
                                className="hidden"
                                required
                            />
                            <div
                                onClick={triggerFileInput}
                                className={`cursor-pointer w-full flex items-center justify-between px-4 py-3 rounded-lg border ${
                                    fileSelected
                                        ? "bg-primary-600/20 border-primary-500/50"
                                        : "bg-white/5 border-white/10"
                                } text-white hover:bg-white/10`}
                            >
                                <div className="flex items-center">
                                    <span className="mr-2">
                                        {fileSelected ? "📄" : "📎"}
                                    </span>
                                    <span>
                                        {fileSelected
                                            ? fileName
                                            : "Đính kèm CV (PDF, DOCX)"}
                                    </span>
                                </div>
                                <span className="text-sm font-medium text-primary-400">
                                    Chọn file
                                </span>
                            </div>
                            <div className="mt-1 text-xs text-white/60">
                                Dung lượng tối đa: 5MB. Định dạng: PDF, DOC,
                                DOCX
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <label
                            htmlFor="message"
                            className="block text-white mb-2"
                        >
                            Giới thiệu bản thân
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Giới thiệu ngắn gọn về bạn và mong muốn khi ứng tuyển vào DIGIFUND"
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                        ></textarea>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="bg-red-500/20 text-red-400 p-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={submitting}
                        className={`w-full py-3 px-6 ${
                            submitting
                                ? "bg-primary-700"
                                : "bg-primary-600 hover:bg-primary-700"
                        } text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center`}
                    >
                        {submitting ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Đang gửi...
                            </>
                        ) : (
                            "Gửi đơn ứng tuyển"
                        )}
                    </button>
                </form>
            )}
        </div>
    );
}
