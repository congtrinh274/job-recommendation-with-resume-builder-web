import { getJobById } from '@/redux/features/JobSlice';
import { AiFillDollarCircle } from 'react-icons/ai';
import { FaLocationDot } from 'react-icons/fa6';
import { SiLevelsdotfyi } from 'react-icons/si';
import { FaClock } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';
import ApplyModal from '@/components/custom/ApplyModal';

const apiBaseUrl = import.meta.env.VITE_SERVER_URL;

const JobDetail = () => {
    const dispatch = useDispatch();
    const { currentJob: job } = useSelector((state) => state.job);
    const { jobId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);

    function formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        if (jobId) {
            dispatch(getJobById(jobId));
        }
    }, [jobId, dispatch]);

    return (
        <div>
            <div className="min-h-screen flex flex-col pt-36">
                <div className="w-[90%] max-w-6xl mx-auto flex justify-between rounded-lg shadow-lg mb-6">
                    <div className="w-[65%] flex flex-col space-y-10">
                        <div className="bg-white w-[full] p-6 rounded-lg shadow-lg">
                            <div className="text-xl font-medium">{job?.title}</div>
                            <div className="flex justify-between mt-4">
                                <div className="flex items-center">
                                    <AiFillDollarCircle className="w-10 h-10 text-green-500" />
                                    <div className="flex flex-col pl-2">
                                        <span className="text-xs">Mức lương</span>
                                        <span className="text-sm font-medium ">{job?.salary}</span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FaLocationDot className="w-9 h-9 text-green-500" />
                                    <div className="flex flex-col pl-2">
                                        <span className="text-xs">Địa điểm</span>
                                        <span className="text-sm font-medium ">{job?.location}</span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <SiLevelsdotfyi className="w-9 h-9 text-green-500" />
                                    <div className="flex flex-col pl-2">
                                        <span className="text-xs">Level</span>
                                        <span className="text-sm font-medium ">{job?.level}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-center rounded-lg bg-gray-200 p-1 w-[36%] text-sm">
                                <FaClock className="mr-2 w-4 h-4" />
                                <span>
                                    Hạn nộp hồ sơ: <strong>{formatDate(job?.expiredDate)}</strong>
                                </span>
                            </div>
                            <div className="mt-6">
                                <Button onClick={openModal} className="text-xs w-full">
                                    <IoIosSend /> Ứng tuyển ngay
                                </Button>
                            </div>
                        </div>
                        <div className="bg-white w-[full] p-6 rounded-lg shadow-lg">
                            <div className="text-xl font-medium mb-6">Chi tiết tin tuyển dụng</div>
                            <div>
                                <span className="font-bold flex items-center">
                                    <Bookmark className="w-4 h-6 text-green-500 mr-1" /> Mô tả công việc
                                </span>
                                <div className="text-sm pl-6" dangerouslySetInnerHTML={{ __html: job?.description }} />
                            </div>
                            <div className="mt-4">
                                <span className="font-bold flex items-center">
                                    <Bookmark className="w-4 h-6 text-green-500 mr-1" /> Yêu cầu ứng viên
                                </span>
                                <div className="text-sm pl-6" dangerouslySetInnerHTML={{ __html: job?.requirements }} />
                            </div>
                            <div className="mt-4">
                                <span className="font-bold flex items-center">
                                    <Bookmark className="w-4 h-6 text-green-500 mr-1" /> Kỹ năng
                                </span>
                                <div className="text-sm pl-6" dangerouslySetInnerHTML={{ __html: job?.skills }} />
                            </div>
                            <div className="mt-4">
                                <span className="font-bold flex items-center ">
                                    <FaLocationDot className="w-4 h-4 text-blue-500 mr-1" /> Địa điểm làm việc
                                </span>
                                <span className="ml-4 text-sm"> - {job?.location}</span>
                            </div>
                            <div className="mt-4">
                                <span className="font-bold flex items-center">
                                    <IoIosSend className="w-4 h-6 text-blue-500 mr-1" /> Cách thức ứng tuyển
                                </span>
                                <span className="ml-4 text-sm">
                                    Ứng viên nộp hồ sơ trực tiếp bằng cách nhấn{' '}
                                    <span className="font-medium">Ứng tuyển ngay</span> dưới đây
                                </span>
                            </div>
                            <div className="mt-4">
                                <span className="font-bold flex items-center ">
                                    <FaClock className="w-4 h-4 text-blue-500 mr-2" /> Hạn nộp hồ sơ:
                                    <span className="text-sm font-medium ml-1">{formatDate(job?.expiredDate)}</span>
                                </span>
                            </div>
                            <div className="mt-6 flex justify-center">
                                <Button onClick={openModal} className="text-xs ">
                                    <IoIosSend /> Ứng tuyển ngay
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* Thông tin NTD */}
                    <div className="w-[30%]  bg-white  p-6 rounded-lg shadow-lg h-fit">
                        <div className="text-xl font-medium mb-4">Thông tin nhà tuyển dụng</div>
                        <div className="flex ">
                            <div className="">
                                <img
                                    src={
                                        job?.recruiterId?.imgUrl
                                            ? `${apiBaseUrl}${job?.recruiterId?.imgUrl}`
                                            : '/null.png'
                                    }
                                    alt="Preview"
                                    className="object-contain w-28 h-24 border shadow-md"
                                />
                            </div>
                            <div>
                                <div className="ml-4 text-lg font-semibold">{job?.recruiterId?.companyName}</div>
                                <div className="ml-4 text-sm ">MST: {job?.recruiterId?.taxCode}</div>
                            </div>
                        </div>
                        <div className="text-sm mt-4">
                            <p className="">
                                <span className="font-semibold">Nhà tuyển dụng: </span>
                                {job?.recruiterId?.fullName || 'Chưa có thông tin'}
                            </p>
                        </div>
                        <div className="text-sm mt-2">
                            <p className="">
                                <span className="font-semibold">Email: </span>
                                {job?.recruiterId?.email || 'Chưa có thông tin'}
                            </p>
                        </div>
                        <div className="text-sm mt-2">
                            <p className="">
                                <span className="font-semibold">Địa chỉ: </span>
                                {`${job?.recruiterId?.district}, ${job?.recruiterId?.province}` || 'Chưa có thông tin'}
                            </p>
                        </div>

                        <div className="text-sm mt-2">
                            <p className="">
                                <span className="font-semibold">Website: </span>
                                <a href={job?.recruiterId?.webLink} target="blank">
                                    Truy cập
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ApplyModal isOpen={isModalOpen} onClose={closeModal} jobTitle={job?.title} />
        </div>
    );
};

export default JobDetail;
