import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobById } from '@/redux/features/JobSlice';

const AppliedListDialog = ({ isOpen, onClose, jobId }) => {
    const { currentJob: job } = useSelector((state) => state.job);
    const [isExpanded, setIsExpanded] = useState(false);
    const dispatch = useDispatch();
    console.log(job);

    const toggleDetails = () => {
        setIsExpanded((prev) => !prev);
    };

    useEffect(() => {
        if (isOpen && jobId) {
            dispatch(getJobById(jobId));
        }
    }, [isOpen, jobId, dispatch]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[80%] p-6" aria-describedby={undefined}>
                <DialogTitle>Thông tin công việc</DialogTitle>
                <div className="overflow-y-auto max-h-[70vh]">
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

                            {/* Phần chi tiết */}
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

                    <div>
                        <h2 className="text-lg font-bold mb-2">Danh sách ứng tuyển</h2>
                        {job?.appliedList?.length > 0 ? (
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 p-2">STT</th>
                                        <th className="border border-gray-300 p-2">Tên ứng viên</th>
                                        <th className="border border-gray-300 p-2">Email</th>
                                        <th className="border border-gray-300 p-2">Kỹ năng</th>
                                        <th className="border border-gray-300 p-2">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {job?.appliedList?.map((application, index) => (
                                        <tr key={application._id} className="hover:bg-gray-100">
                                            <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                                            <td className="border border-gray-300 p-2">{application.name}</td>
                                            <td className="border border-gray-300 p-2">{application.email}</td>
                                            <td className="border border-gray-300 p-2">
                                                {application.skills.join(', ')}
                                            </td>
                                            <td className="border border-gray-300 p-2 text-center">
                                                <Button
                                                    className="bg-blue-500 text-white px-2 py-1 text-sm rounded"
                                                    onClick={() => console.log('Xem chi tiết:', application._id)}
                                                >
                                                    Xem chi tiết
                                                </Button>
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
        </Dialog>
    );
};

export default AppliedListDialog;
