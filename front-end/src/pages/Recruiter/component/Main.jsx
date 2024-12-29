import { useSelector } from 'react-redux';

const Main = ({ activeItem, setActiveItem }) => {
    const { data: recruiterData } = useSelector((state) => state.recruiter);

    return (
        <div>
            {recruiterData?.validatedState === 'CANCELED' && (
                <div
                    className="text-red-500  underline cursor-pointer text-center italic"
                    onClick={() => setActiveItem('personal')}
                >
                    Cần hoàn thành thông tin Nhà Tuyển Dụng trước khi được phép đăng tin tuyển dụng!
                </div>
            )}
            <div className="">
                <div>
                    <div className="bg-gray-100  grid grid-col-3 items-center py-10 ">
                        <h1 className="text-xl font-bold text-primary">Hiệu quả tuyển dụng</h1>
                        <div className="grid grid-cols-3 gap-10 mt-4">
                            <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg shadow-md flex flex-col items-center">
                                <h2 className="text-xl font-semibold">0</h2>
                                <p className="mt-2 text-center">Tin tuyển dụng đã tạo</p>
                            </div>
                            <div className="bg-green-100 text-green-700 p-4 rounded-lg shadow-md flex flex-col items-center">
                                <h2 className="text-xl font-semibold">0</h2>
                                <p className="mt-2 text-center">CV đã tiếp nhận</p>
                            </div>
                            <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow-md flex flex-col items-center">
                                <h2 className="text-xl font-semibold">0</h2>
                                <p className="mt-2 text-center">CV ứng tuyển mới</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
