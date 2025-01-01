import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import RichTextEditor from './RichTextEditor';
import { toast } from 'react-toastify';
import { createJob, fetchCategoryJobs } from '@/redux/features/recruiterSlice';

const JobCreationModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        level: '',
        location: '',
        description: '',
        requirements: '',
        skills: '',
        category: '',
        newCategory: '',
        salary: '',
        expiredDate: '',
    });
    const [isCustomCategory, setIsCustomCategory] = useState(false);

    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.recruiter);

    useEffect(() => {
        dispatch(fetchCategoryJobs());
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategoryChange = (selectedOption) => {
        if (selectedOption) {
            setFormData({ ...formData, category: selectedOption.value });
        }
    };

    const handleCustomCategoryToggle = () => {
        setIsCustomCategory(!isCustomCategory);

        if (isCustomCategory) {
            setFormData({ ...formData, category: '' });
        } else {
            setFormData({ ...formData, category: formData.newCategory || '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const jobData = formData;
        dispatch(createJob(jobData))
            .unwrap()
            .then((response) => {
                toast.success('Tạo thành công, vui lòng đợi xét duyệt từ quản trị viên!');
                onClose();
            })
            .catch((error) => {
                toast.error('Vui lòng nhập đầy đủ dữ liệu tuyển dụng!');
            });
    };

    const categoryOptions = categories?.map((category) => ({
        value: category._id,
        label: category.title,
    }));

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 mt-5">
            <div className="bg-white rounded-lg p-4 w-[60%] ml-40 h-[80%]" style={{ overflowY: 'auto' }}>
                <h3 className="text-lg font-bold mb-4">Tạo công việc mới</h3>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="mb-4 col-span-2">
                            <label className="block text-sm font-medium mb-2">Danh mục</label>
                            <div className="grid grid-cols-2 gap-4">
                                <Select
                                    options={categoryOptions}
                                    value={categoryOptions?.find((option) => option.value === formData.category)}
                                    onChange={handleCategoryChange}
                                    isDisabled={isCustomCategory}
                                    placeholder="Chọn danh mục"
                                />
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={isCustomCategory}
                                        onChange={handleCustomCategoryToggle}
                                        className="mr-2"
                                    />
                                    Tạo danh mục mới
                                </label>
                            </div>
                            {isCustomCategory && (
                                <input
                                    type="text"
                                    name="newCategory"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-2"
                                    value={formData.newCategory}
                                    onChange={handleInputChange}
                                    placeholder="Nhập danh mục mới"
                                />
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Tiêu đề</label>
                            <input
                                type="text"
                                name="title"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Cấp bậc</label>
                            <input
                                type="text"
                                name="level"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                value={formData.level}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4 col-span-2">
                            <label className="block text-sm font-medium mb-2">Địa chỉ</label>
                            <input
                                type="text"
                                name="location"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                value={formData.location}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4 col-span-2">
                            <label className="block text-sm font-medium mb-2">Mô tả</label>
                            <RichTextEditor
                                value={formData.description}
                                onChange={(value) => setFormData((prevState) => ({ ...prevState, description: value }))}
                            />
                        </div>
                        <div className="mb-4 col-span-2">
                            <label className="block text-sm font-medium mb-2">Yêu cầu</label>
                            <RichTextEditor
                                value={formData.requirements}
                                onChange={(value) =>
                                    setFormData((prevState) => ({ ...prevState, requirements: value }))
                                }
                            />
                        </div>
                        <div className="mb-4 col-span-2">
                            <label className="block text-sm font-medium mb-2">Kỹ năng</label>
                            <RichTextEditor
                                value={formData.skills}
                                onChange={(value) => setFormData((prevState) => ({ ...prevState, skills: value }))}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Mức lương</label>
                            <input
                                type="text"
                                name="salary"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                value={formData.salary}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Ngày hết hạn</label>
                            <input
                                type="date"
                                name="expiredDate"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                value={formData.expiredDate}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center m-auto">
                        <button
                            type="button"
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
                            onClick={onClose}
                        >
                            Hủy
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobCreationModal;
