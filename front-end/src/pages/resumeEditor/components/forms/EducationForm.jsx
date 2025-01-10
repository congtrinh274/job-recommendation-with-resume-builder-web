import { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Brain, LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { updateCV } from '@/redux/features/candidateSlice';
import { AIChatSession } from '@/utils/AIModel';
import { toast } from 'react-toastify';

const prompt =
    'Education description: {universityName} , {degree} ngành {major}, dựa vào thông tin trên cho tôi một bản mô tả đầy đủ quá trình học phù hợp cho CV của tôi khoảng 6 dòng bằng {language}  (Vui lòng không thêm cấp độ  và không có mảng JSON và key mặc định là description)';

const EducationForm = ({ enableNext }) => {
    const { cvId } = useParams();
    const dispatch = useDispatch();

    const [educationalList, setEducationalList] = useState([]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        resumeInfo?.education.length > 0 && setEducationalList(resumeInfo?.education);
    }, []);

    const generateSummeryFromGemini = async (index) => {
        setLoading(true);
        const PROMPT = prompt
            .replace('{universityName}', resumeInfo?.education[index].universityName)
            .replace('{degree}', resumeInfo?.education[index].degree)
            .replace('{major}', resumeInfo?.education[index].major)
            .replace('{language}', resumeInfo?.language);

        const result = await AIChatSession.sendMessage(PROMPT);
        const responseText = JSON.parse(result.response.text()).description;

        const updatedList = [...educationalList];
        updatedList[index] = { ...updatedList[index], description: responseText };

        setEducationalList(updatedList);
        enableNext(false);
        setLoading(false);
    };

    const handleInputChange = (e, index) => {
        enableNext(false);
        const { name, value } = e.target;

        setEducationalList((prevList) => {
            const newList = [...prevList];
            newList[index] = { ...newList[index], [name]: value };
            return newList;
        });
    };

    const addEducationItem = () => {
        setEducationalList([
            ...educationalList,
            {
                universityName: '',
                degree: '',
                major: '',
                startDate: '',
                endDate: '',
                description: '',
            },
        ]);
    };

    const removeEducationItem = () => {
        setEducationalList((educationalList) => educationalList.slice(0, -1));
    };

    const onSave = async () => {
        setLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (!cvId) {
                toast.warning('Không tìm thấy ID của CV!');
                return;
            }

            const updateData = { education: educationalList };
            await dispatch(updateCV({ cvId, updateData, file: null }));
            enableNext(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error);
        }
    };

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            education: educationalList,
        });
    }, [educationalList]);

    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-4 bg-white">
                <h2 className="font-bold text-lg">Học Vấn</h2>
                <p>Thêm trình độ học vấn!</p>

                <div>
                    {educationalList.map((item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-2 gap-3 border p-3 my-3 rounded-lg">
                                <div className="col-span-2">
                                    <label className="text-xs">Tên trường</label>
                                    <Input
                                        defaultValue={item.universityName}
                                        name="universityName"
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Cấp độ</label>
                                    <Input
                                        defaultValue={item.degree}
                                        name="degree"
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Chuyên ngành</label>
                                    <Input
                                        defaultValue={item.major}
                                        name="major"
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Ngày bắt đầu</label>
                                    <Input
                                        defaultValue={item.startDate}
                                        type="date"
                                        name="startDate"
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Ngày tốt nghiệp</label>
                                    <Input
                                        defaultValue={item.endDate}
                                        type="date"
                                        name="endDate"
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                </div>
                                <div className="col-span-2 mt-2">
                                    <div className="flex justify-between items-end mb-2">
                                        <label className="text-xs">Sơ lược quá trình</label>
                                        <Button
                                            type="button"
                                            className="border-primary text-primary flex gap-2"
                                            size="sm"
                                            variant="outline"
                                            onClick={() => generateSummeryFromGemini(index)}
                                        >
                                            <Brain className="h-4 w-4" />
                                            Nhận gợi ý từ AI
                                        </Button>
                                    </div>
                                    <Textarea
                                        value={item.description || ''}
                                        name="description"
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <Button variant="outline" className="text-primary" onClick={addEducationItem}>
                            + Thêm mục
                        </Button>
                        <Button variant="outline" className="text-primary" onClick={removeEducationItem}>
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

export default EducationForm;
