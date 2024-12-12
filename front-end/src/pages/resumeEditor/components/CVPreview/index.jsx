const PAGE_HEIGHT = 1122;

// eslint-disable-next-line react/prop-types
const CVPreview = ({ sections }) => {
    const paginateContent = (content) => {
        const pages = [];
        let currentPage = [];
        let currentHeight = 0;

        content.forEach((item) => {
            if (currentHeight + item.height > PAGE_HEIGHT) {
                pages.push(currentPage);
                currentPage = [];
                currentHeight = 0;
            }
            currentPage.push(item);
            currentHeight += item.height;
        });

        if (currentPage.length > 0) {
            pages.push(currentPage);
        }

        return pages;
    };

    const pages = paginateContent(sections);

    return (
        <div id="cv-preview" className=" flex flex-col items-center justify-center min-h-screen relative">
            {pages.map((page, pageIndex) => (
                <div key={pageIndex} className="relative">
                    {pageIndex > 0 && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-white text-sm">
                            Trang {pageIndex + 1}
                        </div>
                    )}
                    <div className="w-[794px] h-[1122px] bg-white shadow-lg border border-gray-200 my-4 p-8">
                        {page.map((section, index) => (
                            <div key={index} className="mb-6">
                                <h2 className="text-lg font-bold mb-2">{section.title}</h2>
                                <div className="text-sm text-gray-700">{section.content}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CVPreview;
