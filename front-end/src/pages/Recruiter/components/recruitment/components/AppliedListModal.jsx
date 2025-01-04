import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobById, updateApplicationListState } from '@/redux/features/JobSlice';
import { Button } from '@/components/ui/button';
import ReactQuill from 'react-quill';
import {} from '@/redux/features/recruiterSlice';
import { toast } from 'react-toastify';

const apiBaseUrl = import.meta.env.VITE_SERVER_URL;

const AppliedListDialog = ({ isOpen, onClose, jobId }) => {
    const { currentJob: job } = useSelector((state) => state.job);
    const [isExpanded, setIsExpanded] = useState(false);
    const [responseLetter, setResponseLetter] = useState('');
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

    const dispatch = useDispatch();

    const handleApprove = (application) => {
        setSelectedApplication(application);
        setIsApproveModalOpen(true);
    };

    const handleReject = (application) => {
        setSelectedApplication(application);
        setIsRejectModalOpen(true);
    };

    const handleConfirmApprove = async () => {
        const jobId = job._id;
        const cvId = selectedApplication.cvId._id;
        const newStatus = 'APPLIED';
        try {
            await dispatch(updateApplicationListState({ jobId, cvId, newStatus, responseLetter })).unwrap();
            toast.success('Cập nhật thành công: ');
        } catch (error) {
            toast.error('Đã xảy ra lỗi: ' + error);
        }
        setIsApproveModalOpen(false);
    };

    const handleConfirmReject = async () => {
        const jobId = job._id;
        const cvId = selectedApplication.cvId._id;
        const newStatus = 'CANCELED';
        try {
            await dispatch(updateApplicationListState({ jobId, cvId, newStatus, responseLetter })).unwrap();
            toast.success('Cập nhật thành công: ');
        } catch (error) {
            toast.error('Đã xảy ra lỗi: ' + error);
        }
        setIsRejectModalOpen(false);
    };

    const toggleDetails = () => {
        setIsExpanded((prev) => !prev);
    };

    useEffect(() => {
        if (isOpen && jobId) {
            dispatch(getJobById(jobId));
        }
    }, [isOpen, jobId, dispatch]);

    function handleView(application) {
        if (!application?.cvId?.isOwn) {
            const fullURL = application?.cvId?.uploadedCV.startsWith('http')
                ? application?.cvId?.uploadedCV
                : `${apiBaseUrl}${application?.cvId?.uploadedCV}`;
            window.open(fullURL, '_blank');
        } else {
            const fullURL = `http://localhost:5173/resume-preview/${application?.cvId._id}`;
            window.open(fullURL, '_blank');
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[80%] p-6" aria-describedby={undefined}>
                <DialogTitle>Thông tin công việc</DialogTitle>
                <div className="overflow-y-auto h-[70vh]">
                    <div className="pb-2 border-b">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <span className="font-semibold text-black-500">Tiêu đề:</span> {job?.title}
                            </div>
                            <div>
                                <span className="font-semibold text-black-500">Cấp bậc:</span> {job?.level}
                            </div>
                            <div>
                                <span className="font-semibold text-black-500">Mức lương:</span> {job?.salary}
                            </div>
                            <div>
                                <span className="font-semibold text-black-500">Ngày hết hạn:</span>{' '}
                                {new Date(job?.expiredDate).toLocaleDateString()}
                            </div>

                            {isExpanded && (
                                <>
                                    <div className="col-span-2">
                                        <span className="font-semibold text-black-500">Mô tả:</span>
                                        <p
                                            className="text-sm pl-4"
                                            dangerouslySetInnerHTML={{ __html: job?.description }}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <span className="font-semibold text-black-500">Yêu cầu:</span>
                                        <p
                                            className="text-sm pl-4"
                                            dangerouslySetInnerHTML={{ __html: job?.requirements }}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <span className="font-semibold text-black-500">Kỹ năng cần thiết:</span>
                                        <p className="text-sm pl-4" dangerouslySetInnerHTML={{ __html: job?.skills }} />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="mt-2">
                            <span onClick={toggleDetails} className="cursor-pointer underline rounded text-sm">
                                {isExpanded ? 'Ngắn gọn' : 'Chi tiết'}
                            </span>
                        </div>
                    </div>

                    <div className="min-h-[300px] overflow-y-auto">
                        <h2 className="text-lg font-bold mb-2">Danh sách ứng tuyển</h2>
                        {job?.appliedList?.length > 0 ? (
                            <table className="table-fixed w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="w-[50px] border border-gray-300 p-2">STT</th>
                                        <th className="border border-gray-300 p-2">Tên ứng viên</th>
                                        <th className="border border-gray-300 p-2">Email</th>
                                        <th className="border border-gray-300 p-2">Số điện thoại</th>
                                        <th className="border border-gray-300 p-2">CV</th>
                                        <th className="border border-gray-300 p-2">Thư xin việc</th>
                                        <th className="border border-gray-300 p-2">Chi tiết</th>
                                        <th className="border border-gray-300 p-2">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {job?.appliedList?.map((application, index) => (
                                        <tr key={application._id} className="hover:bg-gray-100">
                                            <td className="whitespace-nowrap overflow-hidden text-ellipsis border border-gray-300 p-2 text-center">
                                                {index + 1}
                                            </td>
                                            <td className="whitespace-nowrap overflow-hidden text-ellipsis border border-gray-300 p-2">
                                                {application.fullName}
                                            </td>
                                            <td className="whitespace-nowrap overflow-hidden text-ellipsis border border-gray-300 p-2">
                                                {application.email}
                                            </td>
                                            <td className="whitespace-nowrap overflow-hidden text-ellipsis border border-gray-300 p-2">
                                                {application?.phone}
                                            </td>
                                            <td className="whitespace-nowrap overflow-hidden text-ellipsis border border-gray-300 p-2 text-center">
                                                <button
                                                    className="bg-blue-500 text-white px-3 py-1 text-xs rounded hover:bg-blue-600"
                                                    onClick={() => handleView(application)}
                                                >
                                                    Xem
                                                </button>
                                            </td>
                                            <td className="border border-gray-300 p-2">
                                                <div
                                                    className="text-sm  line-clamp-2 overflow-hidden text-ellipsis"
                                                    dangerouslySetInnerHTML={{ __html: application?.appliedLetter }}
                                                />
                                            </td>

                                            <td className="border border-gray-300 p-2 text-center">
                                                <button
                                                    className="bg-blue-500 text-white px-1 py-1 text-xs rounded  hover:bg-blue-600"
                                                    onClick={() => console.log('Xem chi tiết:', application._id)}
                                                >
                                                    Xem chi tiết
                                                </button>
                                            </td>
                                            <td className="border border-gray-300 p-2 ">
                                                {application?.isApplied === 'PENDING' ? (
                                                    <div className="flex space-x-2 justify-center items-center">
                                                        <button
                                                            className="bg-green-500 text-white px-1 py-1 text-xs rounded  hover:bg-green-600"
                                                            onClick={() => handleApprove(application)}
                                                        >
                                                            Duyệt
                                                        </button>
                                                        <button
                                                            className="bg-red-500 text-white px-1 py-1 text-xs rounded  hover:bg-red-600"
                                                            onClick={() => handleReject(application)}
                                                        >
                                                            Hủy
                                                        </button>
                                                    </div>
                                                ) : application?.isApplied === 'APPLIED' ? (
                                                    <div className="text-center">Đã duyệt</div>
                                                ) : (
                                                    <div className="text-center">Đã loại</div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-center ">Chưa có ứng tuyển nào.</p>
                        )}
                    </div>
                </div>
            </DialogContent>

            {isApproveModalOpen && (
                <Dialog open={isApproveModalOpen} onOpenChange={setIsApproveModalOpen}>
                    <DialogContent className="min-w-[30%] p-6" aria-describedby={undefined}>
                        <DialogTitle>Xác nhận ứng viên trúng tuyển</DialogTitle>
                        <div className="mt-4">
                            <label className="text-sm">{`Nhập thư phản hồi (Lịch phỏng vấn, địa điểm,..)`}</label>
                            <ReactQuill
                                className="w-full border border-gray-300 rounded max-h-[200px] overflow-y-auto"
                                value={responseLetter}
                                onChange={setResponseLetter}
                            />
                        </div>
                        <div className="mt-8 flex justify-end">
                            <Button onClick={handleConfirmApprove} className="bg-green-500 text-white">
                                Xác nhận
                            </Button>
                            <Button onClick={() => setIsApproveModalOpen(false)} className="ml-2">
                                Hủy
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            {isRejectModalOpen && (
                <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
                    <DialogContent className="max-w-[400px] p-6" aria-describedby={undefined}>
                        <DialogTitle>Xác nhận hủy</DialogTitle>
                        <p>Bạn có chắc chắn muốn loại hồ sơ này?</p>
                        <div className="mt-4 flex justify-end">
                            <Button onClick={handleConfirmReject} className="bg-red-500 text-white">
                                Đồng ý
                            </Button>
                            <Button onClick={() => setIsRejectModalOpen(false)} className="ml-2">
                                Hủy
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </Dialog>
    );
};

export default AppliedListDialog;
