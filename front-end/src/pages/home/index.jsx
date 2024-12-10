import FileUpload from '@/components/custom/FileUpload';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center pt-36">
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
                            btnName="Xem danh sách công việc được đề xuất"
                            redirectPath="/jobs-list"
                        />
                    </div>

                    <button
                        onClick={() => {
                            navigate('/auth/sign-in');
                        }}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-400 transition"
                    >
                        Tạo Sơ Yếu Lý Lịch của bạn! →
                    </button>
                </div>
            </div>
            <div className="border-t border-white my-6 w-full"></div>

            <div className="w-[90%] max-w-6xl mx-auto rounded-lg overflow-hidden shadow-lg  text-white p-8 mb-12 ">
                <h2 className="text-5xl font-bold mb-6">CÁCH AI CLERK HOẠT ĐỘNG</h2>

                <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                    Como agencia global de los imposibles, en BGN nos gustan los trabajos de marketing y comunicación
                    que nos lo ponen difícil. Aquellos problemas a los que nadie más es capaz de dar una solución que
                    encaje en plazos y presupuesto. Y es algo que llevamos años haciendo con clientes de la talla de
                    Ernest & Young, Saunier Duval, Vaillant, Generali Seguros o Quilosa.
                </p>

                <div className="w-[90%] max-w-6xl mx-auto mt-8">
                    {[
                        {
                            imgSrc: '/vecteezy_3d-pdf-file-extension-document-illustration-concept-icon_23741785.png',
                            title: 'Quản lý dự án',
                            items: ['Tải lên hồ sơ của bạn. Dễ dàng tải lên hồ sơ ở định dạng PDF.'],
                        },
                        {
                            imgSrc: '/vecteezy_ai-chatbot-assistant_44805624.PNG',
                            title: 'Digital Marketing',
                            items: ['AI tự động trích xuất các kỹ năng, kinh nghiệm và thông tin khác từ hồ sơ.'],
                        },
                        {
                            imgSrc: '/vecteezy_people-with-clipboard-3d_46352864.png',
                            title: 'AI Intelligence',
                            items: [
                                'Hệ thống kết nối bạn với các công việc IT phù hợp nhất dựa trên các kỹ năng và kinh nghiệm của bạn.',
                            ],
                        },
                        {
                            imgSrc: '/vecteezy_3d-traveller-character-standing-and-holding-map_36309422.png',
                            title: 'AI Intelligence',
                            items: [
                                'Khám phá các cơ hội nghề nghiệp tiềm năng và tạo tương lai trong lĩnh vực công nghệ.',
                            ],
                        },
                    ].map((section, index) => (
                        <div key={index} className="flex items-start mt-8">
                            {index % 2 === 0 ? (
                                <>
                                    <img
                                        src={section.imgSrc}
                                        alt={`Agency ${index}`}
                                        className="rounded-lg shadow-lg h-[280px] w-[280px] object-cover mr-6"
                                    />
                                    <div className="mt-12 text-white text-lg flex-wrap flex flex-col mt-auto">
                                        {section.items.map((item, itemIndex) => (
                                            <div key={itemIndex} className="p-4 rounded-lg my-2">
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="mt-12 text-white text-lg flex-wrap flex flex-col mt-auto">
                                        {section.items.map((item, itemIndex) => (
                                            <div key={itemIndex} className="p-4 rounded-lg my-2">
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                    <img
                                        src={section.imgSrc}
                                        alt={`Agency ${index}`}
                                        className="rounded-lg shadow-lg h-[280px] w-[280px] object-cover ml-10"
                                    />
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
