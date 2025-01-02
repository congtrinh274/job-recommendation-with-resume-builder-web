import { Button } from '@/components/ui/button';
import React from 'react';

const JobItem = ({ job }) => {
    const { title, level, location, salary, expiredDate, approvedState, description } = job;

    const formattedDate = new Date(expiredDate).toLocaleDateString();

    const stateColor = () => {
        if (approvedState === 'PENDING') {
            return 'border-b-4 border-yellow-500';
        } else if (approvedState === 'APPROVED') {
            return 'border-b-4 border-green-500';
        } else {
            return 'border-b-4 border-red-500';
        }
    };

    const approvedStateValue = () => {
        if (approvedState === 'PENDING') {
            return 'Chờ xét duyệt';
        } else if (approvedState === 'APPROVED') {
            return 'Đã duyệt';
        } else {
            return 'Đã hủy';
        }
    };

    return (
        <div
            className={`relative bg-white p-4 border shadow-md rounded-lg transition-all duration-300  ${stateColor()} hover:shadow-lg group`}
        >
            <h3 className="text-lg font-bold ">{title}</h3>
            <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="text-sm ">
                    <span className="font-semibold">Cấp bậc:</span> {level}
                </div>
                <div className="text-sm col-span-2">
                    <span className="font-semibold">Mức lương:</span> {salary}
                </div>
                <div className="text-sm ">
                    <span className="font-semibold">Ngày hết hạn: </span>
                    {formattedDate}
                </div>
                <div className="text-sm ">
                    <span className="font-semibold">Trạng thái: </span>
                    {approvedStateValue()}
                </div>
                <div className="text-sm col-span-2">
                    <span className="font-semibold">Địa chỉ: </span> {location}
                </div>
                <div className="col-span-2">
                    <span className="font-semibold">Mô tả:</span>
                    <div
                        className="text-sm pl-6 line-clamp-3 overflow-hidden text-ellipsis"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="absolute inset-0 bg-gray-50/80 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="grid grid-cols-2 gap-2 animate-spread">
                    <Button className="px-2 py-1 text-sm bg-blue-600 text-white rounded-lg shadow transform transition-all duration-300 hover:bg-blue-600">
                        Xem chi tiết
                    </Button>
                    <Button
                        disabled={approvedState !== 'APPROVED'}
                        className="px-2 py-1 text-sm bg-green-600 text-white rounded-lg shadow transform transition-all duration-300 hover:bg-green-600"
                    >
                        DS ứng tuyển
                    </Button>
                    <Button className="px-2 py-1 text-sm bg-yellow-600 text-white rounded-lg shadow transform transition-all duration-300 hover:bg-yellow-600">
                        Cập nhật
                    </Button>
                    <Button className="px-2 py-1 text-sm bg-red-600 text-white rounded-lg shadow transform transition-all duration-300 hover:bg-red-600">
                        Xóa
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default JobItem;
