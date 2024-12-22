import { useContext, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCV } from '@/redux/features/candidateSlice';

function ThemeColor() {
    const colors = [
        '#FF5733',
        '#33FF57',
        '#3357FF',
        '#FF33A1',
        '#A133FF',
        '#33FFA1',
        '#FF7133',
        '#71FF33',
        '#7133FF',
        '#FF3371',
        '#33FF71',
        '#3371FF',
        '#A1FF33',
        '#33A1FF',
        '#FF5733',
        '#5733FF',
        '#33FF5A',
        '#5A33FF',
        '#FF335A',
        '#335AFF',
    ];

    const dispatch = useDispatch();

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [selectedColor, setSelectedColor] = useState();
    const { cvId } = useParams();

    const onColorSelect = async (color) => {
        setSelectedColor(color);
        setResumeInfo({
            ...resumeInfo,
            themeColor: color,
        });

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (!cvId) {
                alert('Không tìm thấy ID của CV!');
                return;
            }

            const updateData = { themeColor: color };
            await dispatch(updateCV({ cvId, updateData, file: null }));
        } catch (error) {
            alert(error);
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex gap-2">
                    {' '}
                    <LayoutGrid /> Màu chủ đề
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
                <div className="grid grid-cols-5 gap-3">
                    {colors.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => onColorSelect(item)}
                            className={`h-5 w-5 rounded-full cursor-pointer hover:border-black border 
                                ${selectedColor == item && 'border border-black'}`}
                            style={{
                                background: item,
                            }}
                        ></div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default ThemeColor;
