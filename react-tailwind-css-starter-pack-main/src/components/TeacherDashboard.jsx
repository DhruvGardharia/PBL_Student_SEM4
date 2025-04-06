import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf'; // Import jsPDF

const TeacherDashboard = () => {
    const [classes, setClasses] = useState([
        { id: 1, name: 'Mathematics 101', totalStudents: 87, attendanceRate: 82 },
        { id: 2, name: 'Physics 202', totalStudents: 28, attendanceRate: 75 },
        { id: 3, name: 'Computer Science 303', totalStudents: 42, attendanceRate: 90 },
        { id: 4, name: 'Chemistry 104', totalStudents: 30, attendanceRate: 68 },
    ]);

    const [selectedClass, setSelectedClass] = useState(null);
    const [viewMode, setViewMode] = useState('dashboard');
    const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceTime, setAttendanceTime] = useState(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    const [attendanceData, setAttendanceData] = useState([]);
    const [classImage, setClassImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [extractedRollNumbers, setExtractedRollNumbers] = useState([]);
    const [audioFile, setAudioFile] = useState(null);
    const [transcriptionText, setTranscriptionText] = useState('');
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [transcriptionError, setTranscriptionError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:4000/api/ping")
            .then(res => res.json())
            .then(data => console.log("Backend says:", data))
            .catch(err => console.error("Backend error:", err));
    }, []);

    const averageAttendance = Math.round(classes.reduce((sum, cls) => sum + cls.attendanceRate, 0) / classes.length);

    const handleViewStudents = (classId) => {
        setSelectedClass(classId);
        setViewMode('students');
    };

    const handleMarkAttendance = (classId) => {
        setSelectedClass(classId);
        setViewMode('attendance');
        const startRoll = 23201;
        const endRoll = 23287;
        const students = Array.from({ length: endRoll - startRoll + 1 }, (_, i) => {
            const rollNumber = startRoll + i;
            return { studentId: rollNumber, name: rollNumber.toString().padStart(5, '0'), present: false };
        });
        setAttendanceData(students);
        setClassImage(null);
        setPreviewImage(null);
        setAttendanceTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
        setExtractedRollNumbers([]);
        setAudioFile(null);
        setTranscriptionText('');
        setIsTranscribing(false);
        setTranscriptionError(null);
    };

    const handleGoBack = () => {
        setViewMode('dashboard');
        setSelectedClass(null);
        setExtractedRollNumbers([]);
        setAudioFile(null);
        setTranscriptionText('');
        setIsTranscribing(false);
        setTranscriptionError(null);
    };

    const toggleAttendance = (studentId) => {
        setAttendanceData(
            attendanceData.map(item =>
                item.studentId === studentId ? { ...item, present: !item.present } : item
            )
        );
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setClassImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setClassImage(null);
        setPreviewImage(null);
    };

    const generateRollNumberPdf = (extractedRolls) => {
        if (!selectedClass) {
            alert('Please select a class first to generate the roll number analysis PDF.');
            return;
        }
        const pdf = new jsPDF();
        pdf.setFontSize(12);
        const margin = 10;
        let yPosition = margin;
        const lineHeight = 5;

        const currentClass = classes.find(c => c.id === selectedClass);
        const className = currentClass ? currentClass.name : 'Unknown Class';

        const expectedRolls = Array.from({ length: 87 }, (_, i) => 23201 + i).map(num => num.toString().padStart(5, '0'));
        const absentRolls = extractedRolls.map(roll => roll.toString().padStart(5, '0'));
        const presentRolls = expectedRolls.filter(roll => !absentRolls.includes(roll));

        pdf.text(`Roll Number Analysis for ${className}`, margin, yPosition);
        yPosition += 2 * lineHeight;

        pdf.text('Absent Roll Numbers (Detected in Image):', margin, yPosition);
        yPosition += lineHeight;
        absentRolls.forEach(roll => {
            if (yPosition + lineHeight + margin > pdf.internal.pageSize.getHeight()) {
                pdf.addPage();
                yPosition = margin;
            }
            pdf.text(`- ${roll}`, margin + 10, yPosition);
            yPosition += lineHeight;
        });

        yPosition += lineHeight;
        pdf.text('Present Roll Numbers (Not Detected in Image):', margin, yPosition);
        yPosition += lineHeight;
        presentRolls.forEach(roll => {
            if (yPosition + lineHeight + margin > pdf.internal.pageSize.getHeight()) {
                pdf.addPage();
                yPosition = margin;
            }
            pdf.text(`- ${roll}`, margin + 10, yPosition);
            yPosition += lineHeight;
        });

        pdf.save(`roll_number_analysis_${className.replace(/\s+/g, '_')}.pdf`);
    };

    const extractRollNumbersFromImage = async () => {
        if (!classImage) {
            alert('Please upload an image first.');
            return;
        }
        if (!selectedClass) {
            alert('Please select a class first to extract roll numbers.');
            return;
        }

        const formData = new FormData();
        formData.append('image', classImage);

        try {
            const response = await fetch('http://localhost:4000/api/ocr/image', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok && data && data.rollNos) {
                const extractedRollsFormatted = data.rollNos.map(roll => roll.toString().padStart(5, '0'));
                setExtractedRollNumbers(extractedRollsFormatted);

                const updatedAttendance = attendanceData.map((student) => {
                    const rollNumber = student.studentId.toString().padStart(5, '0');
                    return { ...student, present: !extractedRollsFormatted.includes(rollNumber) }; // Mark extracted as absent
                });
                setAttendanceData(updatedAttendance);
                generateRollNumberPdf(extractedRollsFormatted);
            } else {
                alert('No roll numbers found or an error occurred.');
                setExtractedRollNumbers([]);
            }
        } catch (error) {
            console.error('There was an error:', error);
            alert('An error occurred while communicating with the server.');
            setExtractedRollNumbers([]);
        }
    };

    const handleAudioUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAudioFile(file);
        }
    };

    const transcribeAudio = async () => {
        if (!audioFile) {
            alert('Please upload an audio file first.');
            return;
        }

        setIsTranscribing(true);
        setTranscriptionError(null);
        setTranscriptionText('');

        const formData = new FormData();
        formData.append('audio', audioFile);

        try {
            const response = await fetch('http://localhost:4000/api/gemini-transcribe', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok && data && data.transcript) {
                setTranscriptionText(data.transcript);
                const transcribedText = data.transcript.toLowerCase();
                const updatedAttendance = attendanceData.map(student => {
                    const studentNameLower = student.name.toLowerCase();
                    if (studentNameLower.split(' ').some(part => transcribedText.includes(part))) {
                        return { ...student, present: true };
                    }
                    return student;
                });
                setAttendanceData(updatedAttendance);
            } else {
                setTranscriptionError('Transcription failed or no text found.');
                setTranscriptionText('');
            }
        } catch (error) {
            console.error('Error transcribing audio:', error);
            setTranscriptionError('An error occurred during audio transcription.');
            setTranscriptionText('');
        } finally {
            setIsTranscribing(false);
        }
    };

    const downloadTranscriptionAsPdf = () => {
        const pdf = new jsPDF();
        const text = transcriptionText;
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 10;
        const textWidth = pageWidth - 2 * margin;
        const lineHeight = 5;

        pdf.setFontSize(12);

        const splitText = pdf.splitTextToSize(text, textWidth);
        let yPosition = margin;

        splitText.forEach(line => {
            const lineSize = pdf.getTextDimensions(line, { fontSize: 12 }).h;

            if (yPosition + lineSize + margin > pageHeight) {
                pdf.addPage();
                yPosition = margin;
            }
            pdf.text(line, margin, yPosition);
            yPosition += lineHeight;
        });

        pdf.save('transcription.pdf');
    };

    const downloadAttendancePdf = () => {
        if (!selectedClass) {
            alert('Please select a class first to download attendance.');
            return;
        }
        const pdf = new jsPDF();
        pdf.setFontSize(12);
        const margin = 10;
        let yPosition = margin;
        const lineHeight = 5;

        const currentClass = classes.find(c => c.id === selectedClass);
        const className = currentClass ? currentClass.name : 'Unknown Class';
        const formattedDate = new Date(attendanceDate).toLocaleDateString();

        pdf.text(`Attendance for ${className}`, margin, yPosition);
        yPosition += 2 * lineHeight;
        pdf.text(`Date: ${formattedDate}`, margin, yPosition);
        yPosition += 2 * lineHeight;

        pdf.text('Student Attendance:', margin, yPosition);
        yPosition += lineHeight;

        attendanceData.forEach(student => {
            if (yPosition + lineHeight + margin > pdf.internal.pageSize.getHeight()) {
                pdf.addPage();
                yPosition = margin;
            }
            pdf.text(`- ${student.name}: ${student.present ? 'Present' : 'Absent'}`, margin + 10, yPosition);
            yPosition += lineHeight;
        });

        pdf.save(`attendance_${className.replace(/\s+/g, '_')}_${attendanceDate}.pdf`);
    };

    const saveAttendance = () => {
        const currentClass = classes.find(c => c.id === selectedClass);
        alert(`Attendance saved for ${currentClass.name} on ${attendanceDate} at ${attendanceTime}`);
        setViewMode('dashboard');
    };

    const renderDashboard = () => (
        <div className="p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Welcome, Teacher!</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {classes.map(cls => (
                    <div key={cls.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-indigo-600 mb-2">{cls.name}</h3>
                            <p className="text-gray-700 mb-1">
                                <span className="font-semibold">Students:</span> {cls.totalStudents}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-semibold">Attendance:</span> {cls.attendanceRate}%
                            </p>
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    onClick={() => handleViewStudents(cls.id)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => handleMarkAttendance(cls.id)}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Attendance
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Overall Average Attendance</h3>
                <div className="text-4xl font-bold text-purple-600">{averageAttendance}%</div>
            </div>
        </div>
    );

    const renderStudentsView = () => {
        const currentClass = classes.find(c => c.id === selectedClass);
        return (
            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-800">{currentClass?.name} - Students</h2>
                        <p className="text-gray-600">View and manage students in this class.</p>
                    </div>
                    <button
                        onClick={handleGoBack}
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                    >
                        Back to Dashboard
                    </button>
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-6 text-center text-gray-500">
                        Student list functionality can be added here.
                    </div>
                </div>
            </div>
        );
    };

    const renderAttendanceView = () => {
        const currentClass = classes.find(c => c.id === selectedClass);
        return (
            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-800">{currentClass?.name} - Mark Attendance</h2>
                        <p className="text-gray-600">Record attendance for today's class.</p>
                    </div>
                    <button
                        onClick={handleGoBack}
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                    >
                        Back to Dashboard
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow-md p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
                            <input
                                type="date"
                                value={attendanceDate}
                                onChange={(e) => setAttendanceDate(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">Time</label>
                            <input
                                type="time"
                                value={attendanceTime}
                                onChange={(e) => setAttendanceTime(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Attendance Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {previewImage && (
                                <div className="mt-4">
                                    <img src={previewImage} alt="Uploaded preview" className="h-48 object-contain rounded shadow-sm" />
                                    <button
                                        onClick={removeImage}
                                        className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Remove Image
                                    </button>
                                </div>
                            )}
                            <button
                                onClick={extractRollNumbersFromImage}
                                className="mt-6 bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                            >
                                Extract Roll Numbers
                            </button>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Audio for Transcription</label>
                            <input
                                type="file"
                                accept="audio/*"
                                onChange={handleAudioUpload}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <button
                                onClick={transcribeAudio}
                                className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                                disabled={isTranscribing || !audioFile}
                            >
                                {isTranscribing ? 'Transcribing...' : 'Transcribe Audio'}
                            </button>
                            {transcriptionError && <p className="mt-2 text-red-500">{transcriptionError}</p>}
                            {transcriptionText && (
                                <div className="mt-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Transcription:</label>
                                    <textarea
                                        value={transcriptionText}
                                        readOnly
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-48"
                                    />
                                    <button
                                        onClick={downloadTranscriptionAsPdf}
                                        className="mt-3 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Download Transcription as PDF
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {extractedRollNumbers.length > 0 && (
                        <div className="mt-8 p-4 bg-gray-100 rounded-md">
                            <h3 className="font-semibold text-lg text-gray-800 mb-2">Extracted Roll Numbers:</h3>
                            <ul className="list-disc ml-6">
                                {extractedRollNumbers.map((roll, idx) => (
                                    <li key={idx} className="text-gray-700">{roll}</li>
                                ))}
                                <button
                                    onClick={() => generateRollNumberPdf(extractedRollNumbers)}
                                    className="mt-3 bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Download Roll Number Analysis PDF
                                </button>
                            </ul>
                        </div>
                    )}

                    <div className="mt-8 bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold">
                                    <th className="py-3 px-6 text-left">Roll Number</th>
                                    <th className="py-3 px-6 text-center">Present</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm">
                                {attendanceData.map(student => (
                                    <tr key={student.studentId} className="border-b border-gray-200">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">{student.name}</td>
                                        <td className="py-3 px-6 text-center">
                                            <input
                                                type="checkbox"
                                                checked={student.present}
                                                onChange={() => toggleAttendance(student.studentId)}
                                                className="form-checkbox h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {attendanceData.length === 0 && (
                            <div className="p-6 text-center text-gray-500">No students to mark attendance for.</div>
                        )}
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={saveAttendance}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline mr-2"
                        >
                            Save Attendance
                        </button>
                        <button
                            onClick={downloadAttendancePdf}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                        >
                            Download Attendance PDF
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {viewMode === 'dashboard' && renderDashboard()}
            {viewMode === 'students' && renderStudentsView()}
            {viewMode === 'attendance' && renderAttendanceView()}
        </div>
    );
};

export default TeacherDashboard;