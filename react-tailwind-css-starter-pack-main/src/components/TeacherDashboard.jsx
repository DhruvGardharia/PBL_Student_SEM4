import React, { useState, useEffect } from 'react';

const TeacherDashboard = () => {
    const [classes, setClasses] = useState([
        { id: 1, name: 'Mathematics 101', totalStudents: 35, attendanceRate: 82 },
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

    useEffect(() => {
        fetch("http://localhost:4000/api/ping")
            .then(res => res.json())
            .then(data => console.log("Backend says:", data))
            .catch(err => console.error("Backend error:", err));
    }, []);

    const averageAttendance = Math.round(classes.reduce((sum, cls) => sum + cls.attendanceRate, 0) / classes.length);

    const getStudentsForClass = (classId) => [
        { id: 1, name: 'Emma Johnson', attendance: 85, lastAttended: '2025-04-01' },
        { id: 2, name: 'Noah Williams', attendance: 92, lastAttended: '2025-04-02' },
        { id: 3, name: 'Olivia Brown', attendance: 78, lastAttended: '2025-04-01' },
        { id: 4, name: 'Liam Jones', attendance: 65, lastAttended: '2025-03-29' },
        { id: 5, name: 'Sophia Miller', attendance: 88, lastAttended: '2025-04-02' },
        { id: 6, name: 'Jackson Davis', attendance: 72, lastAttended: '2025-03-30' },
    ];

    const handleViewStudents = (classId) => {
        setSelectedClass(classId);
        setViewMode('students');
    };

    const handleMarkAttendance = (classId) => {
        setSelectedClass(classId);
        setViewMode('attendance');
        const students = getStudentsForClass(classId);
        setAttendanceData(students.map(student => ({ studentId: student.id, name: student.name, present: true })));
        setClassImage(null);
        setPreviewImage(null);
        setAttendanceTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
        setExtractedRollNumbers([]);
    };

    const handleGoBack = () => {
        setViewMode('dashboard');
        setSelectedClass(null);
        setExtractedRollNumbers([]);
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

    const extractRollNumbersFromImage = async () => {
        if (!classImage) {
            alert('Please upload an image first.');
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
                setExtractedRollNumbers(data.rollNos);

                const updatedAttendance = attendanceData.map((student) => {
                    const roll = student.studentId.toString().padStart(3, '0');
                    const fullRoll = `232${roll.slice(-2)}`;
                    const isPresent = data.rollNos.includes(fullRoll) || data.rollNos.includes(roll.slice(-2));
                    return { ...student, present: isPresent };
                });
                setAttendanceData(updatedAttendance);
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

    const saveAttendance = () => {
        const currentClass = classes.find(c => c.id === selectedClass);
        alert(`Attendance saved for ${currentClass.name} on ${attendanceDate} at ${attendanceTime}`);
        setViewMode('dashboard');
    };

    const renderDashboard = () => (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Welcome, Teacher</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {classes.map(cls => (
                    <div key={cls.id} className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold mb-2">{cls.name}</h3>
                        <p>Total Students: {cls.totalStudents}</p>
                        <p>Attendance Rate: {cls.attendanceRate}%</p>
                        <div className="mt-4 flex justify-between">
                            <button onClick={() => handleViewStudents(cls.id)} className="text-blue-600">View Students</button>
                            <button onClick={() => handleMarkAttendance(cls.id)} className="text-green-600">Mark Attendance</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 p-4 bg-white rounded shadow">
                <h3 className="text-lg font-semibold">Overall Average Attendance</h3>
                <p className="text-3xl font-bold text-purple-600">{averageAttendance}%</p>
            </div>
        </div>
    );

    const renderStudentsView = () => {
        const students = getStudentsForClass(selectedClass);
        return (
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Students in Class</h2>
                    <button onClick={handleGoBack} className="bg-blue-500 text-white px-4 py-2 rounded">Back</button>
                </div>
                <table className="w-full border-collapse bg-white shadow-md">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Attendance %</th>
                            <th className="p-3 text-left">Last Attended</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.id} className="border-b">
                                <td className="p-3">{student.name}</td>
                                <td className="p-3">{student.attendance}%</td>
                                <td className="p-3">{student.lastAttended}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderAttendanceView = () => {
        const currentClass = classes.find(c => c.id === selectedClass);
        return (
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">{currentClass.name} - Mark Attendance</h2>
                    <button onClick={handleGoBack} className="bg-blue-500 text-white px-4 py-2 rounded">Back</button>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block mb-2 font-medium">Date</label>
                            <input type="date" value={attendanceDate} onChange={(e) => setAttendanceDate(e.target.value)} className="border rounded p-2 w-full" />
                            <label className="block mt-4 mb-2 font-medium">Time</label>
                            <input type="time" value={attendanceTime} onChange={(e) => setAttendanceTime(e.target.value)} className="border rounded p-2 w-full" />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">Upload Attendance Image</label>
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="border rounded p-2 w-full" />
                            {previewImage && (
                                <div className="mt-2">
                                    <img src={previewImage} alt="Uploaded preview" className="h-40 object-contain rounded" />
                                    <button onClick={removeImage} className="mt-2 bg-red-500 text-white px-4 py-1 rounded">Remove</button>
                                </div>
                            )}
                            <button onClick={extractRollNumbersFromImage} className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Extract Roll Numbers</button>
                        </div>
                    </div>
                    {extractedRollNumbers.length > 0 && (
                        <div className="mt-4">
                            <h3 className="font-semibold">Extracted Roll Numbers:</h3>
                            <ul className="list-disc ml-6">
                                {extractedRollNumbers.map((roll, idx) => <li key={idx}>{roll}</li>)}
                            </ul>
                        </div>
                    )}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Mark Attendance</h3>
                        <table className="w-full border-collapse bg-white shadow-md">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-3 text-left">Student Name</th>
                                    <th className="p-3 text-left">Present</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceData.map(item => (
                                    <tr key={item.studentId} className="border-b">
                                        <td className="p-3">{item.name}</td>
                                        <td className="p-3">
                                            <input type="checkbox" checked={item.present} onChange={() => toggleAttendance(item.studentId)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={saveAttendance} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Save Attendance</button>
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
