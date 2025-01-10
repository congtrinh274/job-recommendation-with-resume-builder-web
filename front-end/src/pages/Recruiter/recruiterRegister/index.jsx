import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import ReactSelect from 'react-select';
import vietnamAddress from '@/data/vietnamAddress.json';
import { useDispatch } from 'react-redux';
import { updateRecruiter, verifiedEmail, verifyEmail } from '@/redux/features/recruiterSlice';
import { LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RecruiterRegister = () => {
    const [formData, setFormData] = useState({
        email: '',
        code: '',
        isCodeSent: false,
        isCodeVerified: false,
        fullName: '',
        gender: '',
        companyName: '',
        taxCode: '',
        province: '',
        district: '',
        webLink: '',
        level: 1,
    });

    const [isLoading, setIsLoading] = useState();

    const [districts, setDistricts] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (formData.province) {
            const selectedProvince = vietnamAddress.find((p) => p.Name === formData.province);
            if (selectedProvince) {
                setDistricts(selectedProvince.Districts);
            } else {
                setDistricts([]);
            }
        } else {
            setDistricts([]);
        }
    }, [formData.province]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSendCode = async () => {
        const email = formData.email;
        setIsLoading(true);
        try {
            await dispatch(verifyEmail({ data: { email } })).unwrap();
            setFormData((prev) => ({ ...prev, isCodeSent: true }));
            setIsLoading(false);
            toast.success('Đã gửi mã xác minh, vui lòng kiểm tra email!');
        } catch (error) {
            toast.error(error);
            setIsLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        const code = formData.code;
        setIsLoading(true);
        try {
            await dispatch(verifiedEmail({ data: { code } })).unwrap();

            setFormData((prev) => ({ ...prev, isCodeVerified: true }));
            setIsLoading(false);
            toast.success('Xác minh email thành công!');
        } catch (error) {
            setIsLoading(false);
            toast.error(error);
        }
    };

    const provinces = vietnamAddress.map((p) => p.Name);

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
            navigate('/recruiter/dashboard');
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error(error);
        }
    };

    return (
        <div className="min-h-screen pt-24 md:px-20 lg:px-32 pb-20">
            <h2 className="font-bold text-3xl text-white mb-4 text-center">Tạo Tài Khoản Nhà Tuyển Dụng</h2>

            <form onSubmit={onSave} className="w-[60%] bg-gray-800 p-4 rounded-md m-auto">
                <h2 className="text-white mb-6 italic text-center">
                    Vui lòng điền các thông tin nhà tuyển dụng bên dưới để hoàn thành hồ sơ*
                </h2>
                <div className="mb-6 flex gap-4 items-center">
                    <div className="flex-1 relative ">
                        <input
                            disabled={formData.isCodeVerified}
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Nhập email"
                            className="w-full p-2 rounded text-black-400 focus:outline-none "
                        />
                        {formData.email && (
                            <Button
                                type="button"
                                disabled={formData.isCodeVerified || isLoading}
                                onClick={handleSendCode}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded text-sm"
                            >
                                {isLoading ? <LoaderCircle className="animate-spin" /> : 'Gửi mã'}
                            </Button>
                        )}
                    </div>
                    <div className="flex-1 relative ">
                        <input
                            disabled={formData.isCodeVerified}
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            placeholder="Nhập mã xác minh"
                            className="w-full p-2 rounded text-black-400 focus:outline-none"
                        />
                        {formData.code && (
                            <Button
                                type="button"
                                disabled={formData.isCodeVerified || isLoading}
                                onClick={handleVerifyCode}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-3 py-1 rounded text-sm"
                            >
                                {isLoading ? <LoaderCircle className="animate-spin" /> : 'Xác minh'}
                            </Button>
                        )}
                    </div>
                </div>

                <div className="mb-6 flex gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            name="fullName"
                            disabled={!formData.isCodeVerified}
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Họ và Tên"
                            className="w-full p-2 rounded text-black-400 focus:outline-none"
                        />
                    </div>
                    <div className="flex-1 flex items-center text-white">
                        <div className="flex items-center">
                            <label className="mr-10 ">Giới tính:</label>
                            <label className="flex items-center mr-4">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Nam"
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Nam
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="gender" value="Nữ" onChange={handleChange} className="mr-2" />
                                Nữ
                            </label>
                        </div>
                    </div>
                </div>

                <div className="mb-6 flex gap-4">
                    <div className="flex-1">
                        <input
                            disabled={!formData.isCodeVerified}
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Tên Công Ty"
                            className="w-full p-2 rounded text-black-400 focus:outline-none"
                        />
                    </div>
                    <div className="flex-1">
                        <input
                            disabled={!formData.isCodeVerified}
                            type="text"
                            name="taxCode"
                            value={formData.taxCode}
                            onChange={handleChange}
                            placeholder="Mã Số Thuế"
                            className="w-full p-2 rounded  text-black-400 focus:outline-none"
                        />
                    </div>
                </div>
                <div className="mb-6 flex gap-4">
                    <div className="flex-1">
                        <input
                            disabled={!formData.isCodeVerified}
                            type="text"
                            name="webLink"
                            value={formData.webLink}
                            onChange={handleChange}
                            placeholder="Link website công ty (nếu có)"
                            className="w-full p-2 rounded text-black-400 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <ReactSelect
                                name="province"
                                value={
                                    formData.province ? { value: formData.province, label: formData.province } : null
                                }
                                onChange={handleProvinceChange}
                                options={provinces.map((p) => ({ value: p, label: p }))}
                                placeholder="Chọn Tỉnh/Thành"
                                isClearable
                            />
                        </div>
                        <div className="w-1/2">
                            <ReactSelect
                                name="district"
                                value={
                                    formData.district ? { value: formData.district, label: formData.district } : null
                                }
                                onChange={handleDistrictChange}
                                options={districts.map((d) => ({ value: d.Name, label: d.Name }))}
                                placeholder="Chọn Quận/Huyện"
                                isDisabled={!formData.province}
                                isClearable
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center ">
                    <Button type="submit" className=" w-full bg-green-600 text-white px-6 py-2 rounded  text-sm">
                        {isLoading ? <LoaderCircle className="animate-spin" /> : 'Hoàn thành'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default RecruiterRegister;
