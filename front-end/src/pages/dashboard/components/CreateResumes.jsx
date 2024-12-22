import { PlusSquare } from 'lucide-react';
import { useState } from 'react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createCV } from '@/redux/features/candidateSlice';

function CreateResume() {
    const [openDialog, setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        setResumeTitle(event.target.value);
    };

    const handleCreate = async () => {
        if (!resumeTitle) {
            alert('Vui lòng nhập tên hồ sơ của bạn');
        } else {
            const result = await dispatch(createCV({ cvData: { title: resumeTitle, isPrimary: false, isOwn: true } }));

            if (result.error) {
                alert(result.payload);
            } else {
                const { data } = result.payload;
                navigate(`/resume-editor/${result.payload.data._id}`, { state: { data } });
            }
        }
    };

    return (
        <div>
            <div
                className=" border items-center flex justify-center bg-secondary rounded-lg  w-46 h-60 hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed"
                onClick={() => setOpenDialog(true)}
            >
                <PlusSquare />
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tạo Hồ Sơ Mới</DialogTitle>
                        <DialogDescription>
                            <p>Nhập tên hồ sơ</p>
                            <Input
                                className="my-2"
                                placeholder="Vd. Full Stack Developer"
                                onChange={handleInputChange}
                            />
                        </DialogDescription>
                        <div className="flex justify-end gap-5">
                            <Button onClick={() => setOpenDialog(false)} variant="ghost">
                                Hủy
                            </Button>
                            <Button onClick={handleCreate}>Tạo mới</Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateResume;
