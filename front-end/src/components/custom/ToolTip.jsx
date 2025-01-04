import { Bookmark, ClockAlert, LocateIcon } from 'lucide-react';
import PropTypes from 'prop-types';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
const apiBaseUrl = import.meta.env.VITE_SERVER_URL;

const Tooltip = ({ isDivisibleByThree, recruiterData, job }) => {
    function formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    const navigate = useNavigate();

    const handleGetJobDetail = (jobId) => {
        navigate('/job-detail/' + jobId);
    };

    return (
        <div
            className={`absolute hidden group-hover:flex flex-col bg-white shadow-lg rounded-lg pl-4 pr-4 pt-4 pb-4 z-50 border border-gray-200 ${
                isDivisibleByThree
                    ? 'right-[280px] top-[16px] -translate-y-1/2'
                    : 'left-[280px] top-[16px] -translate-y-1/2'
            }`}
        >
            <div
                className={
                    isDivisibleByThree
                        ? 'absolute right-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-b-[8px] border-b-transparent border-t-[8px] border-t-transparent border-l-[8px] border-l-white'
                        : 'absolute left-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-white'
                }
            ></div>
            <div className="w-[400px] h-[450px] flex flex-col justify-between">
                <div className="flex">
                    <div className="">
                        <img
                            src={recruiterData?.imgUrl ? `${apiBaseUrl}${recruiterData?.imgUrl}` : '/null.png'}
                            alt="Preview"
                            className="object-cover w-28 h-24 border shadow-md"
                        />
                    </div>
                    <div className="">
                        <div className="text-xl ml-4">{job?.title}</div>
                        <div className="ml-4 text-gray-500">{recruiterData?.companyName}</div>
                        <div className="ml-4 font-bold text-sm text-green-600 mt-4">{job?.salary}</div>
                    </div>
                </div>
                <div className="mt-2 flex ">
                    <div className="text-xs flex flex-start items-center bg-gray-200 p-1">
                        <LocateIcon className="mr-1 w-4 h-4 text-red-500" />
                        {job?.location}
                    </div>
                    <div className="text-xs ml-4 flex flex-start items-center bg-gray-200 p-1">
                        <ClockAlert className="mr-1 w-4 h-4 text-red-500" />
                        {formatDate(job?.expiredDate)}
                    </div>
                </div>
                <div className="mt-4 overflow-y-auto max-h-[250px]">
                    <div>
                        <span className="font-bold flex items-center">
                            <Bookmark className="w-4 h-6 text-green-500 mr-1" /> Mô tả công việc
                        </span>
                        <div className="text-sm pl-6" dangerouslySetInnerHTML={{ __html: job?.description }} />
                    </div>
                    <div className="mt-2">
                        <span className="font-bold flex items-center">
                            <Bookmark className="w-4 h-6 text-green-500 mr-1" /> Yêu cầu ứng viên
                        </span>
                        <div className="text-sm pl-6" dangerouslySetInnerHTML={{ __html: job?.requirements }} />
                    </div>
                    <div className="mt-2">
                        <span className="font-bold flex items-center">
                            <Bookmark className="w-4 h-6 text-green-500 mr-1" /> Kỹ năng
                        </span>
                        <div className="text-sm pl-6" dangerouslySetInnerHTML={{ __html: job?.skills }} />
                    </div>
                </div>
                <div className="flex space-x-5 mt-auto justify-center">
                    <Button onClick={() => handleGetJobDetail(job?.id)} variant="outline">
                        Ứng tuyển
                    </Button>
                    <Button onClick={() => handleGetJobDetail(job?.id)}>Xem chi tiết</Button>
                </div>
            </div>
        </div>
    );
};

Tooltip.propTypes = {
    isDivisibleByThree: PropTypes.bool,
    recruiterData: PropTypes.object,
    job: PropTypes.object,
};

export default Tooltip;
