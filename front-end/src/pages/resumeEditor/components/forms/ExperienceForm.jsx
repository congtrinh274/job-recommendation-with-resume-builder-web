import RichTextEditor from '@/components/custom/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { updateCV } from '@/redux/features/candidateSlice';
import { LoaderCircle } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummery: '',
};

const ExperienceForm = ({ enableNext }) => {
    const [experienceList, setExperienceList] = useState([]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { cvId } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        resumeInfo?.experience.length > 0 && setExperienceList(resumeInfo?.experience);
    }, []);

    const handleChangeInput = (index, e) => {
        enableNext(false);
        const newEntries = experienceList.slice();
        const { name, value } = e.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    };

    const addNewExperience = () => {
        setExperienceList([
            ...experienceList,
            {
                title: '',
                companyName: '',
                city: '',
                state: '',
                startDate: '',
                endDate: '',
                workSummery: '',
            },
        ]);
    };

    const removeExperience = () => {
        setExperienceList((experienceList) => experienceList.slice(0, -1));
    };

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = experienceList.map((item, idx) => {
            if (idx === index) {
                return { ...item, [name]: e.target.value }; // Sửa giá trị của phần tử cụ thể
            }
            return item; // Các phần tử khác không thay đổi
        });

        setExperienceList(newEntries);
    };

    const onSave = async () => {
        setLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (!cvId) {
                alert('Không tìm thấy ID của CV!');
                return;
            }

            const updateData = { experience: experienceList };
            await dispatch(updateCV({ cvId, updateData, file: null }));
            enableNext(true);
            setLoading(false);
        } catch (error) {
            console.error('Lỗi khi cập nhật tiêu đề CV:', error);
            setLoading(false);
            alert(error);
        }
    };

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            experience: experienceList,
        });
    }, [experienceList]);

    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-4 bg-white">
                <h2 className="font-bold text-lg">Kinh nghiệm làm việc</h2>
                <p>Thêm các công việc đã làm!</p>
                <div>
                    {experienceList.map((item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-2 gap-3 border p-3 my-3 rounded-lg">
                                <div>
                                    <label className="text-xs">Vị trí</label>
                                    <Input
                                        defaultValue={item.title}
                                        name="title"
                                        onChange={(e) => handleChangeInput(index, e)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Tên công ty</label>
                                    <Input
                                        defaultValue={item.companyName}
                                        name="companyName"
                                        onChange={(e) => handleChangeInput(index, e)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Địa chỉ</label>
                                    <Input
                                        defaultValue={item.city}
                                        name="city"
                                        onChange={(e) => handleChangeInput(index, e)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Thành phố</label>
                                    <Input
                                        defaultValue={item.state}
                                        name="state"
                                        onChange={(e) => handleChangeInput(index, e)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Ngày bắt đầu</label>
                                    <Input
                                        defaultValue={item.startDate}
                                        type="date"
                                        name="startDate"
                                        onChange={(e) => handleChangeInput(index, e)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Ngày kết thúc</label>
                                    <Input
                                        defaultValue={item.endDate}
                                        type="date"
                                        name="endDate"
                                        onChange={(e) => handleChangeInput(index, e)}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <RichTextEditor
                                        index={index}
                                        defaultValue={item.workSummery}
                                        onRichTextEditorChange={(e) => handleRichTextEditor(e, 'workSummery', index)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <Button variant="outline" className="text-primary" onClick={addNewExperience}>
                            + Thêm mục
                        </Button>
                        <Button variant="outline" className="text-primary" onClick={removeExperience}>
                            - Xóa mục
                        </Button>
                    </div>
                    <Button onClick={onSave} disabled={loading}>
                        {loading ? <LoaderCircle className="animate-spin" /> : 'Lưu'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ExperienceForm;
