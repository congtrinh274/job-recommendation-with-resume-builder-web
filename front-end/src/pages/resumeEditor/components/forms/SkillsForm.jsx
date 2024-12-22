import { Input } from '@/components/ui/input';
import { useContext, useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateCV } from '@/redux/features/candidateSlice';

const SkillsForm = ({ enableNext }) => {
    const { cvId } = useParams();
    const dispatch = useDispatch();
    const [skillList, setSkillList] = useState([]);

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        resumeInfo?.skills.length > 0 && setSkillList(resumeInfo?.skills);
    }, []);

    const handleInputChange = (value, name, index) => {
        enableNext(false);
        const newEntries = skillList.map((item, i) => (i === index ? { ...item, [name]: value } : item));

        setSkillList(newEntries);
    };

    const addSkillItem = () => {
        setSkillList([
            ...skillList,
            {
                name: '',
                rating: 0,
            },
        ]);
    };

    const removeSkillItem = () => {
        setSkillList((skillList) => skillList.slice(0, -1));
    };

    const onSave = async () => {
        setLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (!cvId) {
                alert('Không tìm thấy ID của CV!');
                return;
            }

            const updateData = { skills: skillList };
            await dispatch(updateCV({ cvId, updateData, file: null }));
            enableNext(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alert(error);
        }
    };

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            skills: skillList,
        });
    }, [skillList]);

    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-4 bg-white ">
                <h2 className="font-bold text-lg">Kỹ năng chuyên môn</h2>
                <p>Thêm danh sách kỹ năng của bạn!</p>

                <div className="mt-4">
                    {skillList.map((item, index) => (
                        <div key={index} className="flex justify-between border rounded-lg p-2 m-1">
                            <div className="flex w-[50%] justify-center items-center">
                                <label className="text-xs w-[30%]">Tên kỹ năng</label>
                                <Input
                                    defaultValue={item.name}
                                    onChange={(e) => handleInputChange(e.target.value, 'name', index)}
                                />
                            </div>
                            <Rating
                                style={{ maxWidth: 120 }}
                                value={item.rating}
                                onChange={(e) => handleInputChange(e, 'rating', index)}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-2">
                    <div className="flex gap-2">
                        <Button variant="outline" className="text-primary" onClick={addSkillItem}>
                            + Thêm mục
                        </Button>
                        <Button variant="outline" className="text-primary" onClick={removeSkillItem}>
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

export default SkillsForm;
