import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { updateCV } from '@/redux/features/candidateSlice';
import { AIChatSession } from '@/utils/AIModel';
import { Brain, LoaderCircle } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const prompt =
    'JobTitle: Bản tóm tắt ngắn gọn khoảng 4-5 dòng cho vị trí {jobTitle} trong CV theo các level với tiếng Việt';

const SummeryForm = ({ enableNext }) => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const dispatch = useDispatch();
    const { cvId } = useParams();
    const [summery, setSummery] = useState();
    const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        summery &&
            setResumeInfo({
                ...resumeInfo,
                summery: summery,
            });
    }, [summery]);

    const generateSummeryFromGemini = async () => {
        setLoading(true);
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo.jobTitle);
        console.log(PROMPT);
        const result = await AIChatSession.sendMessage(PROMPT);
        console.log(JSON.parse(result.response.text()));
        setAiGeneratedSummeryList(JSON.parse(result.response.text()));
        setLoading(false);
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

            const updateData = { summery };
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
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-4 bg-white">
                <h2 className="font-bold text-lg">Bản tóm tắt</h2>
                <p>Thêm bản tóm tắt cho vị trí ứng tuyển</p>

                <form className="mt-6" onSubmit={onSave}>
                    <div className="flex justify-between items-end">
                        <label>Thêm tóm tắt</label>
                        <Button
                            type="button"
                            className="border-primary text-primary flex gap-2"
                            size="sm"
                            variant="outline"
                            onClick={() => generateSummeryFromGemini()}
                        >
                            <Brain className="h-4 w-4" />
                            Sử dụng AI
                        </Button>
                    </div>
                    <Textarea
                        className="mt-3"
                        defaultValue={resumeInfo.summery}
                        required
                        onChange={(e) => setSummery(e.target.value)}
                    />
                    <div className="mt-3 flex justify-end">
                        <Button type="submit" disabled={loading}>
                            {loading ? <LoaderCircle className="animate-spin" /> : 'Lưu'}
                        </Button>
                    </div>
                </form>
            </div>
            {aiGeneratedSummeryList && (
                <div className="bg-white mt-10 p-5 rounded-lg shadow-lg">
                    <h2 className="font-bold text-lg">Đề xuất</h2>
                    {aiGeneratedSummeryList.map((item, index) => (
                        <div className="mt-4" key={index}>
                            <h2 className="font-bold my-1">Level: {item?.level}</h2>
                            <p>{item.summary}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SummeryForm;
