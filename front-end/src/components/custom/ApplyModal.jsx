import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { IoIosClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCandidate } from '@/redux/features/candidateSlice';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { applyJob } from '@/redux/features/JobSlice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
const ApplyModal = ({ isOpen, onClose, jobTitle }) => {
    const { data: candidate } = useSelector((state) => state.candidate);
    const [cvId, setCVId] = useState();
    const [applicantData, setApplicantData] = useState({
        name: '',
        email: '',
        phone: '',
        coverLetter: '',
    });
    const { jobId } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        if (!candidate) {
            dispatch(fetchCandidate());
        }
    }, [candidate, dispatch]);

    useEffect(() => {
        const savedData = localStorage.getItem('candidateRecommendedJobsData');
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                setCVId(parsedData.currentCvId);
            } catch (error) {
                console.error('Failed to parse jobs data from localStorage', error);
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setApplicantData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (selectedOption) => {
        setCVId(selectedOption?.value);
        setApplicantData((prev) => ({ ...prev, resume: selectedOption?.value }));
    };

    const handleCoverLetterChange = (value) => {
        setApplicantData((prev) => ({ ...prev, coverLetter: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(
                applyJob({
                    jobId,
                    cvId,
                    appliedLetter: applicantData.coverLetter,
                    fullName: applicantData.name,
                    email: applicantData.email,
                    phone: applicantData.phone,
                }),
            );

            if (response.type === 'jobs/applyJob/fulfilled') {
                toast.success('Ứng tuyển thành công');
                setApplicantData({
                    name: '',
                    email: '',
                    phone: '',
                    coverLetter: '',
                });
                onClose();
            } else {
                toast.error(response.payload);
            }
        } catch (error) {
            toast.error('Lỗi khi gửi yêu cầu ứng tuyển:', error.message);
        }
    };

    const cvOptions =
        candidate?.cvs?.map((cv) => ({
            label: cv.title,
            value: cv._id,
        })) || [];

    return (
        isOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg p-6 w-[40%] ">
                    <div className="flex justify-between pb-4 mb-4 border-b">
                        <h2 className="text-xl font-semibold">
                            Ứng tuyển công việc: <span className="font-bold text-blue-800">{jobTitle}</span>
                        </h2>
                        <Button variant="outline" className="px-2" onClick={onClose}>
                            <IoIosClose />
                        </Button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold">Chọn CV để ứng tuyển</label>
                            <Select
                                options={cvOptions}
                                value={cvOptions.find((option) => option.value === cvId)}
                                onChange={handleSelectChange}
                                className="w-full"
                                isClearable
                                placeholder="Chọn CV"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold">Họ và tên</label>
                            <input
                                type="text"
                                name="name"
                                value={applicantData.name}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={applicantData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Số điện thoại</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={applicantData.phone}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold">Thư xin việc</label>
                            <ReactQuill
                                value={applicantData.coverLetter}
                                onChange={handleCoverLetterChange}
                                className="w-full border border-gray-300 rounded max-h-[200px] overflow-y-auto"
                                placeholder="Viết thư xin việc của bạn..."
                            />
                        </div>

                        <div className="flex space-x-4">
                            <Button onClick={onClose} variant="outline" className="flex-[0.2] px-6 py-2 rounded-md">
                                Hủy
                            </Button>
                            <Button type="submit" className="flex-[0.8] bg-blue-500 text-white px-6 py-2 rounded-md">
                                Ứng tuyển
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default ApplyModal;
