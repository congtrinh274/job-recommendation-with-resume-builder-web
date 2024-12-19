import { useContext, useState } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updateCV } from '@/redux/features/candidateSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';

function PersonalDetailForm({ enableNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const dispatch = useDispatch();
    const { cvId } = useParams();
    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        enableNext(false);
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        setResumeInfo({
            ...resumeInfo,
            [name]: value,
        });
    };

    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (!cvId) {
                alert('Không tìm thấy ID của CV!');
                return;
            }

            const updateData = formData;
            await dispatch(updateCV({ cvId, updateData, file: null }));
            enableNext(true);
            setLoading(false);
        } catch (error) {
            console.error('Lỗi khi cập nhật tiêu đề CV:', error);
            setLoading(false);
            alert(error);
        }
    };

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-4 bg-white">
            <h2 className="font-bold text-lg">Thông tin cá nhân</h2>
            <p>Bắt đầu với thông tin cá nhân của bạn!</p>
            <form onSubmit={onSave}>
                <div className="grid grid-cols-2 mt-5 gap-3">
                    <div>
                        <label className="text-sm">Họ</label>
                        <Input
                            name="firstName"
                            defaultValue={resumeInfo?.firstName}
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm">Tên</label>
                        <Input
                            name="lastName"
                            defaultValue={resumeInfo?.lastName}
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="text-sm">Vị trí</label>
                        <Input
                            name="jobTitle"
                            defaultValue={resumeInfo?.jobTitle}
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="text-sm">Địa chỉ</label>
                        <Input
                            name="address"
                            defaultValue={resumeInfo?.address}
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm">Số điện thoại</label>
                        <Input name="phone" defaultValue={resumeInfo?.phone} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className="text-sm">Email</label>
                        <Input name="email" defaultValue={resumeInfo?.email} required onChange={handleInputChange} />
                    </div>
                </div>
                <div className="mt-3 flex justify-end">
                    <Button type="submit" disabled={loading}>
                        {loading ? <LoaderCircle className="animate-spin" /> : 'Lưu'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default PersonalDetailForm;
