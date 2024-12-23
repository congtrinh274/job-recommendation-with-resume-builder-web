import PropTypes from 'prop-types';

const JobItem = ({ job }) => {
    return (
        <div className="group w-full border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow bg-white mb-4 relative">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{job.title}</h2>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
                <p>
                    <strong className="font-medium text-gray-700">Công ty:</strong> {job.company}
                </p>
                <p>
                    <strong className="font-medium text-gray-700">Địa chỉ:</strong> {job.location}
                </p>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
                <p>
                    <strong className="font-medium text-gray-700">Lương:</strong> {job.salary || 'Not provided'}
                </p>
                <p>
                    <strong className="font-medium text-gray-700">Ngày hết hạn:</strong>
                    {job.expiredDate || 'Not specified'}
                </p>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-1 w-full">
                <p className="line-clamp-2">
                    <strong className="font-medium text-gray-700">Yêu cầu: </strong>
                    {job.requirements || 'Not specified'}
                </p>
            </div>
            <a
                href={job.Link}
                target="_blank"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 font-medium text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <span className="text-white"> Xem chi tiết công việc</span>
            </a>
        </div>
    );
};

JobItem.propTypes = {
    job: PropTypes.object,
};

export default JobItem;
