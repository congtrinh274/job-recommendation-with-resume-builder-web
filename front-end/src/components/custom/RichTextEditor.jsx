import { useContext, useState } from 'react';
import {
    BtnBold,
    BtnBulletList,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnStrikeThrough,
    BtnUnderline,
    Editor,
    EditorProvider,
    Separator,
    Toolbar,
} from 'react-simple-wysiwyg';
import { Button } from '../ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { AIChatSession } from '@/utils/AIModel';

const prompt =
    'position title: {position title} dựa vào position title cho tôi chuỗi text mô tả kinh nghiệm làm việc khoảng 5 dòng trong CV của tôi với {language} (Vui lòng không thêm cấp độ kinh nghiệm và Không có mảng JSON và key mặc định là experience_description)';

const RichTextEditor = ({ onRichTextEditorChange, defaultValue, index }) => {
    const [value, setValue] = useState(defaultValue);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState();

    const generateSummaryFromAI = async () => {
        setLoading(true);
        if (!resumeInfo.experience[index].title) {
            alert('Vui lòng thêm vị trí kinh nghiệm làm việc!');
            setLoading(false);
            return;
        }

        const PROMPT = prompt
            .replace('{position title}', resumeInfo.experience[index].title)
            .replace('{language}', resumeInfo.language);
        const result = await AIChatSession.sendMessage(PROMPT);
        const res = JSON.parse(result.response.text());
        setValue(res.experience_description);
        onRichTextEditorChange({ target: { value: res.experience_description } });
        setLoading(false);
    };

    return (
        <div>
            <div className="flex justify-between my-2">
                <label className="text-xs items-end">Mô tả</label>
                <Button
                    className="flex gap-2 border-primary text-primary"
                    variant="outline"
                    size="sm"
                    onClick={generateSummaryFromAI}
                >
                    {loading ? (
                        <LoaderCircle className="animate-spin" />
                    ) : (
                        <>
                            <Brain className="h-4 w-4" />
                            Nhận gợi ý từ AI
                        </>
                    )}
                </Button>
            </div>
            <EditorProvider>
                <Editor
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onRichTextEditorChange(e);
                    }}
                >
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    );
};

export default RichTextEditor;
