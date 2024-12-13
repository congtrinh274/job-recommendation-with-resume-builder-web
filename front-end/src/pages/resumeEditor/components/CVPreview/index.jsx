import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const CVPreview = ({ sections, themeColor, font, spacing }) => {
    const [pageBreaks, setPageBreaks] = useState([]);

    useEffect(() => {
        const checkPageBreaks = () => {
            const previewElement = document.getElementById('cv-preview');
            if (previewElement) {
                const pageHeight = 1122;
                const breaks = [];
                let currentHeight = 0;

                previewElement.childNodes.forEach((child, index) => {
                    const childRect = child.getBoundingClientRect();
                    currentHeight += childRect.height;
                    if (currentHeight > pageHeight) {
                        breaks.push(index);
                        currentHeight = childRect.height;
                    }
                });

                setPageBreaks(breaks);
            }
        };

        checkPageBreaks();
        window.addEventListener('resize', checkPageBreaks);
        return () => window.removeEventListener('resize', checkPageBreaks);
    }, [sections]);

    return (
        <div
            id="cv-preview"
            className={`w-full max-w-4xl mx-auto p-6 border rounded-lg shadow-md bg-white`}
            style={{ fontFamily: font, lineHeight: spacing, borderColor: themeColor }}
        >
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Họ và Tên"
                    className={`w-full text-3xl font-bold mb-2 border-b border-gray-300 focus:outline-none focus:border-${themeColor}`}
                />
                <input
                    type="text"
                    placeholder="Chức danh / Vị trí mong muốn"
                    className="w-full text-xl text-gray-600 border-b border-gray-300 focus:outline-none focus:border-gray-400"
                />
            </div>

            {/* eslint-disable-next-line react/prop-types */}
            {sections.map((section, index) => (
                <div
                    key={index}
                    className={`mb-6 ${
                        pageBreaks.includes(index) ? 'border-t-2 border-dashed border-gray-400 mt-4 pt-4' : ''
                    }`}
                >
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold border-b-2 pb-1" style={{ borderColor: themeColor }}>
                            {section.title}
                        </h2>
                        <button className="text-sm text-blue-500 hover:underline" onClick={() => section.onEdit()}>
                            Sửa
                        </button>
                    </div>
                    <textarea
                        className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder={`Nhập ${section.title.toLowerCase()}...`}
                        rows={5}
                    ></textarea>
                </div>
            ))}

            <div className="text-center mt-6">
                <button
                    onClick={() => alert('Thêm mục mới')}
                    className={`px-4 py-2 rounded-md shadow-md bg-${themeColor} hover:bg-opacity-90`}
                >
                    + Thêm mục mới
                </button>
            </div>
        </div>
    );
};

export default CVPreview;
