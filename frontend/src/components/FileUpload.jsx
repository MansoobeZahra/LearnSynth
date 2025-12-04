import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Image as ImageIcon, Video, Music, X, Mic } from 'lucide-react';

const UploadBox = ({ label, icon: Icon, accept, onFileSelect, colorClass, bgClass }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0]);
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative border-2 border-dashed rounded-xl p-4 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 h-32 ${isDragging ? 'border-opacity-100 bg-opacity-20' : 'border-opacity-50 bg-opacity-5'
                } ${colorClass} ${bgClass}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleChange}
                accept={accept}
            />
            <div className={`p-2 rounded-full bg-white/50 dark:bg-black/20`}>
                <Icon className={`w-6 h-6 ${colorClass.replace('border-', 'text-')}`} />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
        </motion.div>
    );
};

const FileUpload = ({ onFileSelect, selectedFile, onClearFile }) => {
    const getIcon = (type) => {
        if (type.startsWith('image/')) return <ImageIcon className="w-8 h-8 text-purple-500" />;
        if (type.startsWith('video/')) return <Video className="w-8 h-8 text-pink-500" />;
        if (type.startsWith('audio/')) return <Music className="w-8 h-8 text-blue-500" />;
        return <FileText className="w-8 h-8 text-orange-500" />;
    };

    return (
        <div className="w-full mb-6">
            <AnimatePresence mode="wait">
                {!selectedFile ? (
                    <div className="grid grid-cols-2 gap-4">
                        <UploadBox
                            label="Image"
                            icon={ImageIcon}
                            accept="image/*"
                            onFileSelect={onFileSelect}
                            colorClass="border-purple-500"
                            bgClass="bg-purple-500"
                        />
                        <UploadBox
                            label="Video"
                            icon={Video}
                            accept="video/*"
                            onFileSelect={onFileSelect}
                            colorClass="border-pink-500"
                            bgClass="bg-pink-500"
                        />
                        <UploadBox
                            label="Audio"
                            icon={Music}
                            accept="audio/*"
                            onFileSelect={onFileSelect}
                            colorClass="border-blue-500"
                            bgClass="bg-blue-500"
                        />
                        <UploadBox
                            label="Text / PDF"
                            icon={FileText}
                            accept=".txt,.pdf,.md,.csv,.html,.js,.py"
                            onFileSelect={onFileSelect}
                            colorClass="border-orange-500"
                            bgClass="bg-orange-500"
                        />
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-700 flex items-center gap-4"
                    >
                        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
                            {getIcon(selectedFile.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {selectedFile.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onClearFile();
                            }}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FileUpload;
