import { Input } from '@/components/ui/input';
import ReactSelect from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import vietnamAddress from '@/data/vietnamAddress.json';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, LoaderCircle } from 'lucide-react';
import { fetRecruiter, updateRecruiter, uploadLicense } from '@/redux/features/recruiterSlice';

const apiBaseUrl = import.meta.env.VITE_SERVER_URL;

function PersonalInfo() {
    const { data } = useSelector((state) => state.recruiter);
    const [formData, setFormData] = useState(data);
    const [districts, setDistricts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
            if (allowedTypes.includes(file.type)) {
                setSelectedFile(file);
            } else {
                alert('Please upload a valid file. Only PDF, JPEG, and PNG are allowed.');
            }
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragActive(false);
        const file = event.dataTransfer.files[0];
        if (file) {
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
            if (allowedTypes.includes(file.type)) {
                setSelectedFile(file);
            } else {
                alert('Please upload a valid file. Only PDF, JPEG, and PNG are allowed.');
            }
        }
    };

    const handleClickArea = () => {
        fileInputRef.current.click();
    };

    const dispatch = useDispatch();

    console.log(formData);

    const provinces = vietnamAddress.map((p) => p.Name);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleProvinceChange = (selectedOption) => {
        setFormData((prev) => ({ ...prev, province: selectedOption ? selectedOption.value : '' }));
    };

    const handleDistrictChange = (selectedOption) => {
        setFormData((prev) => ({ ...prev, district: selectedOption ? selectedOption.value : '' }));
    };

    const onSave = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const updateData = formData;
            await dispatch(updateRecruiter({ updateData }));
            setIsLoading(false);
            alert('Cập nhật thông tin thành công!');
        } catch (error) {
            setIsLoading(false);
            alert(error);
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            setIsLoading(true);
            try {
                const formData = new FormData();

                formData.append('file', selectedFile);

                const result = await dispatch(uploadLicense({ data: formData }));

                if (result.error) {
                    alert(result.payload);
                    setIsLoading(false);
                } else {
                    dispatch(fetRecruiter());
                    setIsLoading(false);
                    alert('Tải thành công!');
                }
            } catch (err) {
                console.error(err);
                setIsLoading(false);
            }
        } else {
            alert('Chưa có file nào được chọn!');
        }
    };

    useEffect(() => {
        if (formData?.province) {
            const selectedProvince = vietnamAddress.find((p) => p.Name === formData?.province);
            if (selectedProvince) {
                setDistricts(selectedProvince?.Districts);
            } else {
                setDistricts([]);
            }
        } else {
            setDistricts([]);
        }
    }, [formData.province]);
    return (
        <div className="bg-white shadow-md rounded px-8 py-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold mb-4">Thông tin cá nhân</h2>
                <p className="text-black-600 mb-4 text-sm">
                    Tài khoản xác thực: <span className="text-red-500 ml-2 font-bold">Cấp {data?.level}/2</span>
                </p>
            </div>
            <div className="border-b">
                <h2 className="font-bold text-primary">
                    Cấp 1 * <span className="text-red-500">Thông tin doanh nghiệp</span>
                </h2>
                <form onSubmit={onSave}>
                    <div className="grid grid-cols-2 mt-2 gap-5">
                        <div className="">
                            <label className="text-xs mb-1 font-bold">Email</label>
                            <Input
                                type="text"
                                disabled={true}
                                name="email"
                                value={data?.email}
                                placeholder="Email"
                                className="w-full p-2 rounded text-black-400 focus:outline-none"
                            />
                        </div>
                        <div className="">
                            <label className="text-xs mb-1 font-bold">Họ tên</label>
                            <Input
                                type="text"
                                name="fullName"
                                defaultValue={data?.fullName}
                                value={formData?.fullName}
                                onChange={handleChange}
                                placeholder="Họ và Tên"
                                className="w-full p-2 rounded text-black-400 focus:outline-none"
                            />
                        </div>

                        <div className="">
                            <label className="text-xs mb-1 font-bold">Tên công ty</label>
                            <Input
                                type="text"
                                name="companyName"
                                defaultValue={data?.companyName}
                                value={formData?.companyName}
                                onChange={handleChange}
                                placeholder="Tên công ty"
                                className="w-full p-2 rounded text-black-400 focus:outline-none"
                            />
                        </div>
                        <div className="">
                            <label className="text-xs mb-1 font-bold">Mã số thuế</label>
                            <Input
                                type="text"
                                name="taxCode"
                                defaultValue={data?.taxCode}
                                value={formData?.taxCode}
                                onChange={handleChange}
                                placeholder="Mã số thuế"
                                className="w-full p-2 rounded text-black-400 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-xs mb-1 font-bold">Tỉnh/Thành</label>
                            <div className="">
                                <ReactSelect
                                    name="province"
                                    onChange={handleProvinceChange}
                                    defaultInputValue={data?.province}
                                    value={
                                        formData?.province
                                            ? { value: formData?.province, label: formData?.province }
                                            : null
                                    }
                                    options={provinces?.map((p) => ({ value: p, label: p }))}
                                    placeholder="Chọn Tỉnh/Thành"
                                    isClearable
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs mb-1 font-bold">Quận/Huyện</label>
                            <div className="">
                                <ReactSelect
                                    name="district"
                                    value={
                                        formData.district
                                            ? { value: formData.district, label: formData.district }
                                            : null
                                    }
                                    onChange={handleDistrictChange}
                                    options={districts.map((d) => ({ value: d.Name, label: d.Name }))}
                                    placeholder="Chọn Quận/Huyện"
                                    isDisabled={!formData?.province}
                                    isClearable
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label className="text-xs mb-1 font-bold">Địa chỉ chi tiết</label>
                            <Input
                                type="text"
                                name="companyAddress"
                                onChange={handleChange}
                                defaultValue={data?.companyAddress}
                                value={formData?.companyAddress}
                                placeholder="Địa chỉ chi tiết"
                                className="w-full p-2 rounded text-black-400 focus:outline-none"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="text-xs mb-1 font-bold">Website</label>
                            <Input
                                type="text"
                                name="webLink"
                                onChange={handleChange}
                                value={formData?.webLink}
                                defaultValue={data?.webLink}
                                placeholder="Địa chỉ trang web công ty"
                                className="w-full p-2 rounded text-black-400 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-6 mb-4">
                        <Button type="submit" className="bg-green-600 text-white px-6 py-2 rounded  text-sm">
                            {isLoading ? <LoaderCircle className="animate-spin" /> : 'Cập nhật'}
                        </Button>
                    </div>
                </form>
            </div>
            <div className="border-b mt-10 ">
                <h2 className="font-bold text-primary mb-3">
                    Cấp 2 * <span className="text-red-500">Thông tin giấy đăng ký doanh nghiệp</span>
                </h2>
                <div className="grid grid-cols-2 mb-8 gap-10">
                    {data?.businessLicense ? (
                        <div
                            className="w-[1/2] relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
                            onClick={() => window.open(`${apiBaseUrl}${data.businessLicense}`, '_blank')}
                        >
                            <img
                                src="/resume-icon2.png"
                                alt="Document Illustration"
                                className="absolute top-1/2 left-1/2 w-16 h-16 object-cover rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:scale-110 "
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-sm font-semibold">
                                Click để xem chi tiết
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            Chọn và tải lên giấy phép doanh nghiệp của bạn! <ArrowRightIcon className="w-4 h-4 " />
                        </div>
                    )}
                    <div className="border p-4">
                        <p className="text-blue-800 text-xs font-medium">
                            {data?.businessLicense
                                ? 'Cập nhật giấy tờ'
                                : 'Tải lên giấy đăng ký kinh doanh hoặc giấy tờ tương đương'}
                        </p>
                        <div
                            className={`my-2 border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
                                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={handleClickArea}
                        >
                            {selectedFile ? (
                                <p className="text-gray-700">{selectedFile.name}</p>
                            ) : (
                                <div className="text-gray-500">
                                    Kéo và thả hoặc tải lên hồ sơ của bạn (.jpeg/.pdf/.png)
                                </div>
                            )}
                            <Input
                                ref={fileInputRef}
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="flex justify-center mt-6 ">
                            <Button
                                onClick={handleUpload}
                                className="bg-green-600 text-white px-6 py-2 rounded  text-sm"
                            >
                                {isLoading ? (
                                    <LoaderCircle className="animate-spin" />
                                ) : data.businessLicense ? (
                                    'Cập nhật'
                                ) : (
                                    'Tải lên'
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <div className="bg-gray-200 h-2 rounded">
                    <div
                        className="bg-blue-500 h-2 rounded"
                        style={{ width: data?.businessLicense ? '100%' : '50%' }}
                    ></div>
                </div>
                <p className="text-center mt-2">Hoàn thành: {data?.businessLicense ? '100%' : '50%'}</p>
            </div>
        </div>
    );
}

export default PersonalInfo;
