import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const apiBaseUrl = import.meta.env.VITE_SERVER_URL;

const JobDetailModal = ({ isOpen, onClose, job, root }) => {
    function formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    const getJobApprovalStatus = (approvedState) => {
        switch (approvedState) {
            case 'APPROVED':
                return 'Đã duyệt';
            case 'CANCELED':
                return 'Đã hủy';
            case 'PENDING':
                return 'Chờ xét duyệt';
            default:
                return 'Trạng thái không xác định';
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[80%] ">
                <DialogHeader>
                    <DialogTitle>Chi tiết công việc</DialogTitle>
                    <DialogDescription>Thông tin chi tiết về công việc và nhà tuyển dụng.</DialogDescription>
                </DialogHeader>
                <div className="flex">
                    <div className=" flex-[1]  pr-2 ">
                        <h3 className="text-lg font-semibold mb-4 border-b">Thông tin công việc</h3>
                        <div className="grid grid-cols-2 pr-4 border-r overflow-y-auto max-h-[65vh] ">
                            <div>
                                <strong>Vị trí:</strong> {job?.title}
                            </div>
                            <div>
                                <strong>Cấp bậc:</strong> {job?.level}
                            </div>
                            <div>
                                <strong>Địa điểm:</strong> {job?.location}
                            </div>
                            <div>
                                <strong>Mức lương:</strong> {job?.salary}
                            </div>
                            <div>
                                <strong>Ngày hết hạn:</strong> {formatDate(job?.expiredDate)}
                            </div>
                            <div>
                                <strong>Trạng thái:</strong> {getJobApprovalStatus(job?.approvedState)}
                            </div>
                            <div className="col-span-2">
                                <strong>Mô tả:</strong>
                                <div className="text-sm pl-6 " dangerouslySetInnerHTML={{ __html: job?.description }} />
                            </div>
                            <div className="col-span-2">
                                <strong>Yêu cầu:</strong>
                                <div
                                    className="text-sm pl-6 "
                                    dangerouslySetInnerHTML={{ __html: job?.requirements }}
                                />
                            </div>
                            <div className="col-span-2">
                                <strong>Kỹ năng cần thiết:</strong>
                                <div className="text-sm pl-6 " dangerouslySetInnerHTML={{ __html: job?.skills }} />
                            </div>
                        </div>
                    </div>

                    {root !== 'recruiter' && (
                        <div className="flex-[0.3] pl-4">
                            <h3 className="text-lg font-semibold mb-4 border-b">Thông tin nhà tuyển dụng</h3>
                            <div className="grid grid-cols-1 gap-2 text-sm">
                                <p>
                                    <strong>ID NTD:</strong> {job?.recruiterId?._id}
                                </p>
                                <p>
                                    <strong>Công ty:</strong> {job?.recruiterId?.companyName}
                                </p>
                                <p>
                                    <strong>Mã số thuế:</strong> {job?.recruiterId?.taxCode}
                                </p>
                                <p>
                                    <strong>Email:</strong> {job?.recruiterId?.email}
                                </p>
                                <p>
                                    <strong>Địa chỉ:</strong>{' '}
                                    {`${job?.recruiterId?.district}, ${job?.recruiterId?.province}`}
                                </p>
                                <p>
                                    <strong>Website:</strong>{' '}
                                    <a className="cursor-pointer" href={job?.recruiterId?.webLink} target="_blank">
                                        Truy cập
                                    </a>
                                </p>
                                <p>
                                    <strong>Giấy phép:</strong>{' '}
                                    <a href={`${apiBaseUrl}${job?.recruiterId?.businessLicense}`} target="_blank">
                                        Xem
                                    </a>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" className="bg-red-500 text-white " onClick={onClose}>
                        Đóng
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default JobDetailModal;
