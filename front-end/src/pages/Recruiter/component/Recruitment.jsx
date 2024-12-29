import React, { useState } from 'react';

const Recruitment = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        skills: '',
        location: '',
        salary: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // API call or form submission logic
        console.log('Job Posting Data:', formData);
        alert('Job posting created successfully!');
        setFormData({ title: '', description: '', skills: '', location: '', salary: '' });
    };

    return (
        <div className="p-5 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-5">Create a Job Posting</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Job Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Job Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Required Skills:</label>
                    <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Salary Range:</label>
                    <input
                        type="text"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Create Job Posting
                </button>
            </form>
        </div>
    );
};

export default Recruitment;
