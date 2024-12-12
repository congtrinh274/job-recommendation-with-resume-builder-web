import PropTypes from 'prop-types';
import { useState } from 'react';
import { ChromePicker } from 'react-color';

const SubHeader = ({
    currentLanguage,
    onLanguageChange,
    currentFont,
    onFontChange,
    themeColor,
    onThemeColorChange,
    lineSpacing,
    onLineSpacingChange,
    onUploadBackground,
    // onCustomizeLayout,
}) => {
    const [colorPickerVisible, setColorPickerVisible] = useState(false);
    const [backgroundDropdownVisible, setBackgroundDropdownVisible] = useState(false);

    const backgroundOptions = ['Mẫu 1', 'Mẫu 2', 'Mẫu 3'];

    return (
        <div className="flex items-center justify-between border-b pl-4 pr-4 pb-1 ml-4 mr-4 mt-2 mb-4 text-sm text-white">
            <div className="flex items-center space-x-2">
                <span>Ngôn ngữ CV</span>
                {['Tiếng Việt', 'Tiếng Anh'].map((flag, index) => (
                    <button
                        key={index}
                        onClick={() => onLanguageChange(flag)}
                        className={`flex items-center justify-center p-2 rounded-full border text-xs text-gray-500 bg-white ${
                            currentLanguage === flag ? 'border-green-500' : 'border-gray-300'
                        }`}
                    >
                        {flag}
                    </button>
                ))}
            </div>

            {/* Font */}
            <div className="flex items-center space-x-2 ">
                <span>{currentFont}</span>
                <select
                    value={currentFont}
                    onChange={(e) => onFontChange(e.target.value)}
                    className="border rounded px-2 py-1 text-gray-500"
                >
                    <option value="Roboto">Roboto</option>
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                </select>
            </div>

            {/* Spacing */}
            <div className="relative flex items-center space-x-2">
                <span>Màu chủ đề</span>
                <button
                    onClick={() => setColorPickerVisible(!colorPickerVisible)}
                    className="w-6 h-6 rounded-full border"
                    style={{ backgroundColor: themeColor }}
                ></button>
                {colorPickerVisible && (
                    <div className="absolute top-12 left-0 z-50 bg-white shadow-lg rounded ">
                        <ChromePicker
                            color={themeColor}
                            onChangeComplete={(color) => {
                                console.log(color.hex);
                                onThemeColorChange(color.hex);
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Khoảng cách dòng */}
            <div className="flex items-center space-x-2">
                <span>Khoảng cách dòng</span>
                <select
                    value={lineSpacing}
                    onChange={(e) => onLineSpacingChange(e.target.value)}
                    className="border rounded px-2 py-1 text-gray-500"
                >
                    <option value="1">1</option>
                    <option value="1.2">1.2</option>
                    <option value="1.6">1.6</option>
                    <option value="2">2</option>
                </select>
            </div>

            {/* Hình nền CV */}
            <div className="relative">
                <button
                    onClick={() => setBackgroundDropdownVisible(!backgroundDropdownVisible)}
                    className="flex items-center space-x-1 px-4 py-1 border rounded bg-white hover:bg-gray-200 text-gray-500"
                >
                    <span>Hình nền CV</span>
                </button>
                {backgroundDropdownVisible && (
                    <div className="absolute top-10 left-0 bg-white border rounded shadow z-10 text-gray-500">
                        {backgroundOptions.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    onUploadBackground(option);
                                    setBackgroundDropdownVisible(false);
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

SubHeader.propTypes = {
    currentLanguage: PropTypes.string.isRequired,
    onLanguageChange: PropTypes.func.isRequired,
    currentFont: PropTypes.string.isRequired,
    onFontChange: PropTypes.func.isRequired,
    themeColor: PropTypes.string.isRequired,
    onThemeColorChange: PropTypes.func.isRequired,
    lineSpacing: PropTypes.string.isRequired,
    onLineSpacingChange: PropTypes.func.isRequired,
    onUploadBackground: PropTypes.func.isRequired,
    onCustomizeLayout: PropTypes.func.isRequired,
};

export default SubHeader;
