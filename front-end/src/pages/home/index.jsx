import FileUpload from '@/components/custom/FileUpload';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const handleFileUpload = (file) => {
        console.log('Tệp đã chọn:', file.name);
    };

    const hanldeUploadBtn = () => {
        navigate('/jobs-list');
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center pt-28">
            <div className="w-[90%] max-w-6xl mx-auto flex rounded-lg overflow-hidden shadow-lg mb-12">
                <div className="w-1/2 p-8 flex flex-col justify-center items-start relative">
                    <div className="flex items-center">
                        <div className="text-yellow-400 font-bold mb-8 text-5xl">AI CLERK</div>

                        <img
                            src="/vecteezy_cute-space-astronaut-on-clear-background_47307968.png"
                            alt="3D Image"
                            className="absolute w-40 h-auto z-10 pointer-events-none "
                            style={{ right: '160px' }}
                        />
                    </div>

                    <h1 className="text-5xl font-extrabold mb-4 text-white mt-4">
                        Tìm Kiếm Công Việc IT Phù Hợp <span className="text-yellow-300">Với AI</span>
                    </h1>

                    <p className="text-gray-300 mb-6 text-xl">
                        Dễ dàng tạo và tìm kiếm công việc IT phù hợp với AI CLERK. Kết nối cơ hội, khám phá nghề nghiệp,
                        và xây dựng tương lai công nghệ của bạn!
                    </p>
                </div>

                <div className="w-1/2 p-8 flex flex-col justify-center gap-6 opacity-90">
                    <div className="w-full">
                        <FileUpload
                            title="Tải Lên Hồ Sơ Xin Việc"
                            acceptFileTypes=".pdf,.docx"
                            onFileUpload={handleFileUpload}
                            btnName="Xem danh sách công việc được đề xuất"
                            btnHandle={hanldeUploadBtn}
                        />
                    </div>

                    <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-400 transition">
                        Tạo Sơ Yếu Lý Lịch của bạn! →
                    </button>
                </div>
            </div>

            <div className="w-[90%] max-w-6xl mt-12 rounded-lg p-8 shadow-lg">
                <h2 className="text-center text-4xl font-extrabold mb-6 text-yellow-300">Cách AI CLERK Hoạt Động</h2>

                <div className="space-y-4">
                    <p className="text-white text-lg">
                        🔹 <strong>Tải lên hồ sơ của bạn</strong>: Dễ dàng tải lên hồ sơ xin việc ở định dạng PDF
                    </p>
                    <p className="text-white text-lg">
                        🔹 <strong>AI phân tích thông tin</strong>: AI tự động trích xuất các kỹ năng, kinh nghiệm và
                        thông tin khác từ hồ sơ.
                    </p>
                    <p className="text-white text-lg">
                        🔹 <strong>Đề xuất công việc phù hợp</strong>: Hệ thống kết nối bạn với các công việc IT phù hợp
                        nhất dựa trên các kỹ năng và kinh nghiệm của bạn.
                    </p>
                    <p className="text-white text-lg">
                        🔹 <strong>Kết nối cơ hội nghề nghiệp</strong>: Khám phá các cơ hội nghề nghiệp tiềm năng và tạo
                        tương lai trong lĩnh vực công nghệ.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
