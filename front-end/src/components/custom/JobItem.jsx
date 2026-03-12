import PropTypes from 'prop-types';
import Tooltip from './Tooltip'; // Import Tooltip
import { useNavigate } from 'react-router-dom';

const apiBaseUrl = import.meta.env.VITE_SERVER_URL;

const JobItem = ({ job, recruiterData, itemKey }) => {
    const isDivisibleByThree = itemKey % 3 === 0;
    const navigate = useNavigate();

    const handleGetJobDetail = (jobId) => {
        navigate('/job-detail/' + jobId);
    };

    return (
        <div key={itemKey} className="w-full h-[100px] border shadow-md bg-white relative hover:bg-gray-200">
            <div className="flex h-full">
                <div className="w-1/4 h-full">
                    <img
                        src={recruiterData?.imgUrl ? `${apiBaseUrl}${recruiterData?.imgUrl}` : '/null.png'}
                        alt="Preview"
                        className="object-cover w-full h-full "
                    />
                </div>
                <div className="w-3/4 pl-2 ">
                    <div className="group">
                        <h2
                            onClick={() => handleGetJobDetail(job._id)}
                            className="font-semibold text-gray-800 mt-1 group-hover:underline group-hover:text-blue-600 cursor-pointer truncate"
                        >
                            {job.title}
                        </h2>

                        <Tooltip isDivisibleByThree={isDivisibleByThree} recruiterData={recruiterData} job={job} />
                    </div>
                    <p className="text-xs font-semibold text-gray-600">
                        Công ty {recruiterData?.companyName ? recruiterData?.companyName : 'N/A'}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="text-xs">
                            <span className="font-semibold">Cấp bậc:</span> {job?.level}
                        </div>
                        <div className="flex justify-between col-span-2 mr-2">
                            <div className="text-xs bg-gray-200 rounded-lg p-1 w-24 truncate text-center">
                                <span className="font-semibold"></span> {job?.salary}
                            </div>
                            <div className="text-xs bg-gray-200 rounded-lg p-1 w-24 truncate text-center">
                                <span className="font-semibold"></span> {job?.location}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

JobItem.propTypes = {
    job: PropTypes.object,
};

export default JobItem;
