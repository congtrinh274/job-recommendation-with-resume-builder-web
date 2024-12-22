const ExperiencePreview = ({ resumeInfo }) => {
    return (
        <div className="my-6">
            <h2 className="text-center font-bold text-sm mb-2" style={{ color: resumeInfo?.themeColor }}>
                {resumeInfo?.language === 'en' ? 'Experiences' : 'Kinh Nghiệm Làm Việc'}
            </h2>
            <hr className="border-[1.5px] my-2" style={{ borderColor: resumeInfo?.themeColor }}></hr>
            {resumeInfo?.experience?.map((experience, index) => (
                <div key={index} className="my-5">
                    <h2 className="text-sm font-bold" style={{ color: resumeInfo?.themeColor }}>
                        {experience?.title}
                    </h2>
                    <h2 className="text-xs flex justify-between">
                        {experience?.companyName}, {experience?.city}, {experience?.state}
                        <span>
                            {resumeInfo?.language === 'en' ? 'From' : 'Từ'} {experience?.startDate}
                            {resumeInfo?.language === 'en' ? ' To ' : ' Đến '}
                            {experience?.currentlyWorking ? 'Present' : experience?.endDate}
                        </span>
                    </h2>
                    <div className="text-xs my-2" dangerouslySetInnerHTML={{ __html: experience.workSummery }} />
                </div>
            ))}
        </div>
    );
};

export default ExperiencePreview;
