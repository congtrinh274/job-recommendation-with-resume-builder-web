import JobItem from '@/components/custom/JobItem';
import { Button } from '@/components/ui/button';
import { getActiveJob } from '@/redux/features/JobSlice';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const { isSignedIn } = useSelector((state) => state.auth);
    const { jobs } = useSelector((state) => state.job);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ location: '', salary: '', level: '' });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getActiveJob());
    }, [dispatch]);

    const handleCreateCVBtn = () => {
        if (isSignedIn) {
            navigate('/dashboard');
        } else {
            navigate('auth/sign-in');
        }
    };

    const totalPages = Math.ceil(jobs?.length / itemsPerPage);
    const paginatedJobs = jobs
        ?.filter((job) => {
            return (
                job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (filters.location ? job.location.includes(filters.location) : true) &&
                (filters.salary ? job.salary.includes(filters.salary) : true) &&
                (filters.level ? job.level === filters.level : true)
            );
        })
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div id="home" className="min-h-screen flex flex-col justify-center items-center pt-36">
            <div className="w-[90%] max-w-6xl mx-auto flex rounded-lg overflow-hidden shadow-lg mb-12">
                <div className="w-1/2 p-8 flex flex-col justify-center items-start relative">
                    <div className="flex items-center">
                        <div className="text-yellow-400 font-bold mb-8 text-5xl">SUper SMART CV</div>

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
                    <button
                        onClick={handleCreateCVBtn}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-400 transition"
                    >
                        Tạo Sơ Yếu Lý Lịch của bạn! →
                    </button>
                </div>
            </div>
            <div className="border-t border-white my-6 w-full"></div>

            <div id="search" className="mt-8 mb-12 min-w-[1245px]">
                <h2 className="text-white w-full text-center text-5xl font-bold mb-10">Việc Làm Mới Nhất</h2>
                <div className="w-full mx-auto p-4 bg-gray-800 rounded-lg mb-8">
                    <div className="flex items-center mb-4">
                        <input
                            type="text"
                            placeholder="Tìm kiếm công việc..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-3 rounded-lg w-full bg-gray-700 text-white search-box"
                        />
                    </div>

                    <div className="flex gap-4">
                        <select
                            name="location"
                            value={filters.location}
                            onChange={handleFilterChange}
                            className="p-3 rounded-lg bg-gray-700 text-white filter-select"
                        >
                            <option value="">Chọn vị trí</option>
                            <option value="Hà Nội">Hà Nội</option>
                            <option value="Tp. Hồ Chí Minh">TP.HCM</option>
                            <option value="Đà Nẵng">Đà Nẵng</option>
                        </select>

                        <select
                            name="salary"
                            value={filters.salary}
                            onChange={handleFilterChange}
                            className="p-3 rounded-lg bg-gray-700 text-white filter-select"
                        >
                            <option value="">Chọn mức lương</option>
                            <option value="10M-20M">10M - 20M</option>
                            <option value="20M-30M">20M - 30M</option>
                            <option value="30M+">30M+</option>
                        </select>

                        <select
                            name="level"
                            value={filters.level}
                            onChange={handleFilterChange}
                            className="p-3 rounded-lg bg-gray-700 text-white filter-select"
                        >
                            <option value="">Chọn cấp độ</option>
                            <option value="Intern">Intern</option>
                            <option value="Fresher">Fresher</option>
                            <option value="Junior">Junior</option>
                            <option value="Middle">Middle</option>
                            <option value="Senior">Senior</option>
                        </select>
                    </div>
                </div>

                <div className="p-4 border rounded-lg shadow-lg  job-list-box">
                    <div className="flex justify-between items-center mt-4 mb-4 text-sm ">
                        <h2 className="text-xl font-bold text-center text-white">Danh sách tin tuyển dụng</h2>
                        <div className="flex gap-3 items-center text-sm">
                            <Button
                                disabled={currentPage === 1}
                                onClick={handlePrevPage}
                                className="border-primary bg-red-500 text-white"
                                size="sm"
                            >
                                <CircleArrowLeft className="h-6 w-6" />
                            </Button>
                            <span className="text-sm font-medium text-white">
                                Trang {currentPage}/{totalPages}
                            </span>
                            <Button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="border-primary bg-red-500 text-white"
                                size="sm"
                            >
                                <CircleArrowRight className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 job-grid">
                        {paginatedJobs?.map((job, index) => (
                            <JobItem job={job} recruiterData={job?.recruiterId} key={index} itemKey={index + 1} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t border-white my-6 w-full"></div>

            <div
                id="info"
                className="w-[90%] max-w-6xl mx-auto rounded-lg overflow-hidden shadow-lg  text-white p-8 mb-12 "
            >
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
