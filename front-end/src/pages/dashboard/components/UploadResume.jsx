import { Upload } from 'lucide-react';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fetCandidate, uploadCV } from '@/redux/features/candidateSlice';

function UploadResume() {
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [resumeTitle, setResumeTitle] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
        } else {
            alert('Please upload a valid PDF file.');
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragActive(false);
        const file = event.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
        } else {
            alert('Please upload a valid PDF file.');
        }
    };

    const handleClickArea = () => {
        fileInputRef.current.click();
    };

    const handleUpload = async () => {
        if (!resumeTitle.trim()) {
            alert('Please provide a title for your resume.');
            return;
        }

        if (selectedFile) {
            try {
                const formData = new FormData();

                formData.append('file', selectedFile);
                formData.append('title', resumeTitle);
                formData.append('isOwn', false);

                const result = await dispatch(uploadCV({ cvData: formData }));

                if (result.error) {
                    alert(result.payload);
                    setResumeTitle('');
                } else {
                    dispatch(fetCandidate());
                    setOpenDialog(false);
                }
            } catch (err) {
                console.error(err);
            }
        } else {
            alert('No file selected.');
        }
    };

    return (
        <div>
            <div
                className="border items-center flex justify-center bg-secondary rounded-lg w-46 h-60 hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed"
                onClick={() => setOpenDialog(true)}
            >
                <Upload />
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tải Lên Hồ Sơ</DialogTitle>
                        <DialogDescription>
                            <Input
                                placeholder="Nhập tên hồ sơ *"
                                value={resumeTitle}
                                onChange={(e) => setResumeTitle(e.target.value)}
                                className="mt-2 p-2 rounded border"
                            />
                            <div
                                className={`my-4 border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
                                    dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={handleClickArea}
                            >
                                {selectedFile ? (
                                    <p className="text-gray-700">{selectedFile.name}</p>
                                ) : (
                                    <div className="text-gray-500">Kéo và thả hoặc tải lên hồ sơ của bạn</div>
                                )}
                                <Input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="application/pdf"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </DialogDescription>

                        <div className="flex justify-end gap-5">
                            <Button onClick={() => setOpenDialog(false)} variant="ghost">
                                Hủy
                            </Button>
                            <Button onClick={handleUpload}>Tải lên</Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default UploadResume;
