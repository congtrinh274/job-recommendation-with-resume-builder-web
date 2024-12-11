import { Upload } from 'lucide-react';
import { useState, useRef } from 'react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function UploadResume() {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
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

    const handleUpload = () => {
        if (selectedFile) {
            console.log('Uploading file:', selectedFile);
            setOpenDialog(false);
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

            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload Resume</DialogTitle>
                        <DialogDescription>
                            <div>Drag and drop your PDF file or click to select one.</div>
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
                                    <div className="text-gray-500">Drop your file here or click to upload</div>
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
                                Cancel
                            </Button>
                            <Button onClick={handleUpload}>Upload</Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default UploadResume;
