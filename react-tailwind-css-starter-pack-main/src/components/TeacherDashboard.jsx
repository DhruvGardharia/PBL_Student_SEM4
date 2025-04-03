import React, { useState } from 'react';

const TeacherDashboard = () => {
  // Sample data - would be fetched from backend in real implementation
  const [classes, setClasses] = useState([
    { id: 1, name: 'Mathematics 101', totalStudents: 35, attendanceRate: 82 },
    { id: 2, name: 'Physics 202', totalStudents: 28, attendanceRate: 75 },
    { id: 3, name: 'Computer Science 303', totalStudents: 42, attendanceRate: 90 },
    { id: 4, name: 'Chemistry 104', totalStudents: 30, attendanceRate: 68 },
  ]);
  
  const [selectedClass, setSelectedClass] = useState(null);
  const [viewMode, setViewMode] = useState('dashboard'); // dashboard, students, attendance
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceTime, setAttendanceTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  );
  const [attendanceData, setAttendanceData] = useState([]);
  const [classImage, setClassImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  
  // Calculate average attendance across all classes
  const averageAttendance = Math.round(
    classes.reduce((sum, cls) => sum + cls.attendanceRate, 0) / classes.length
  );
  
  // Mock student data for the selected class
  const getStudentsForClass = (classId) => {
    const studentsList = [
      { id: 1, name: 'Emma Johnson', attendance: 85, lastAttended: '2025-04-01' },
      { id: 2, name: 'Noah Williams', attendance: 92, lastAttended: '2025-04-02' },
      { id: 3, name: 'Olivia Brown', attendance: 78, lastAttended: '2025-04-01' },
      { id: 4, name: 'Liam Jones', attendance: 65, lastAttended: '2025-03-29' },
      { id: 5, name: 'Sophia Miller', attendance: 88, lastAttended: '2025-04-02' },
      { id: 6, name: 'Jackson Davis', attendance: 72, lastAttended: '2025-03-30' },
    ];
    return studentsList;
  };
  
  const handleViewStudents = (classId) => {
    setSelectedClass(classId);
    setViewMode('students');
  };
  
  const handleMarkAttendance = (classId) => {
    setSelectedClass(classId);
    setViewMode('attendance');
    
    // Initialize attendance data when entering attendance mode
    const students = getStudentsForClass(classId);
    setAttendanceData(
      students.map(student => ({ 
        studentId: student.id, 
        name: student.name, 
        present: true 
      }))
    );
    
    // Reset image and time when entering attendance mode
    setClassImage(null);
    setPreviewImage(null);
    setAttendanceTime(
      new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    );
  };
  
  const handleGoBack = () => {
    setViewMode('dashboard');
    setSelectedClass(null);
  };
  
  const toggleAttendance = (studentId) => {
    setAttendanceData(
      attendanceData.map(item => 
        item.studentId === studentId 
          ? { ...item, present: !item.present } 
          : item
      )
    );
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setClassImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeImage = () => {
    setClassImage(null);
    setPreviewImage(null);
  };
  
  const saveAttendance = () => {
    // In a real app, this would send data to your backend
    const currentClass = classes.find(c => c.id === selectedClass);
    alert(`Attendance saved for ${currentClass.name} on ${attendanceDate} at ${attendanceTime}`);
    setViewMode('dashboard');
  };
  
  // Render students view
  const renderStudentsView = () => {
    const students = getStudentsForClass(selectedClass);
    const currentClass = classes.find(c => c.id === selectedClass);
    
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{currentClass.name} - Students</h2>
          <button 
            onClick={handleGoBack}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Back to Dashboard
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <span className="font-medium">Total Students: {currentClass.totalStudents}</span>
            <span className="ml-6 font-medium">Average Attendance: {currentClass.attendanceRate}%</span>
          </div>
          
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left border-b">ID</th>
                <th className="p-3 text-left border-b">Name</th>
                <th className="p-3 text-left border-b">Attendance %</th>
                <th className="p-3 text-left border-b">Last Attended</th>
                <th className="p-3 text-left border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{student.id}</td>
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">
                    <span className={`${
                      student.attendance >= 75 ? 'text-green-600' : 
                      student.attendance >= 60 ? 'text-orange-500' : 'text-red-500'
                    }`}>
                      {student.attendance}%
                    </span>
                  </td>
                  <td className="p-3">{student.lastAttended}</td>
                  <td className="p-3">
                    <button className="text-blue-500 hover:text-blue-700 mr-2">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  // Render attendance marking view
  const renderAttendanceView = () => {
    const currentClass = classes.find(c => c.id === selectedClass);
    
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{currentClass.name} - Mark Attendance</h2>
          <button 
            onClick={handleGoBack}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Back to Dashboard
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="mb-4 flex items-center">
                <label className="mr-4 font-medium">Date:</label>
                <input 
                  type="date" 
                  value={attendanceDate} 
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="border rounded p-2" 
                />
              </div>
              
              <div className="mb-4 flex items-center">
                <label className="mr-4 font-medium">Time:</label>
                <input 
                  type="time" 
                  value={attendanceTime} 
                  onChange={(e) => setAttendanceTime(e.target.value)}
                  className="border rounded p-2" 
                />
              </div>
            </div>
            
            <div>
              <div className="mb-4">
                <label className="block font-medium mb-2">Class Image:</label>
                <div className="flex items-center">
                  <label className="cursor-pointer bg-blue-100 text-blue-600 hover:bg-blue-200 px-4 py-2 rounded">
                    <span>Upload Image</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden" 
                    />
                  </label>
                  {classImage && (
                    <button 
                      onClick={removeImage}
                      className="ml-3 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
              
              {previewImage && (
                <div className="mt-2 border rounded p-2">
                  <img 
                    src={previewImage} 
                    alt="Class snapshot" 
                    className="h-32 object-cover" 
                  />
                </div>
              )}
            </div>
          </div>
          
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left border-b">ID</th>
                <th className="p-3 text-left border-b">Name</th>
                <th className="p-3 text-left border-b">Status</th>
                <th className="p-3 text-left border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map(student => (
                <tr key={student.studentId} className="border-b hover:bg-gray-50">
                  <td className="p-3">{student.studentId}</td>
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">
                    <span className={student.present ? 'text-green-600' : 'text-red-500'}>
                      {student.present ? 'Present' : 'Absent'}
                    </span>
                  </td>
                  <td className="p-3">
                    <button 
                      onClick={() => toggleAttendance(student.studentId)}
                      className={`px-3 py-1 rounded ${
                        student.present 
                          ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                          : 'bg-green-100 text-green-600 hover:bg-green-200'
                      }`}
                    >
                      Mark {student.present ? 'Absent' : 'Present'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="flex justify-end">
            <button 
              onClick={saveAttendance}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
            >
              Save Attendance
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // Render main dashboard
  const renderDashboard = () => {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
          <div className="flex items-center">
            <button className="mr-4 bg-blue-500 text-white p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex items-center bg-blue-500 text-white py-2 px-4 rounded">
              <div className="rounded-full bg-white text-blue-500 h-8 w-8 flex items-center justify-center mr-2">
                T
              </div>
              <span>Prof. Taylor</span>
            </div>
            <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded">
              Logout
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-1">
            <h2 className="text-xl font-bold mb-4">Attendance Overview</h2>
            <div className="flex justify-center">
              <div className="relative h-40 w-40">
                <div className="h-full w-full rounded-full bg-gray-200"></div>
                <div 
                  className="absolute top-0 left-0 h-full w-full rounded-full bg-orange-500"
                  style={{ 
                    clipPath: `polygon(50% 50%, 50% 0, ${50 + 50 * Math.cos(2 * Math.PI * averageAttendance / 100)}% ${50 - 50 * Math.sin(2 * Math.PI * averageAttendance / 100)}%, 50% 50%)` 
                  }}
                ></div>
                <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold">{averageAttendance}%</span>
                  <span className="text-sm">Attendance</span>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-orange-500 font-medium">Average</p>
              <p className="text-gray-600">Overall attendance is {averageAttendance >= 80 ? 'good' : averageAttendance >= 70 ? 'acceptable' : 'concerning'}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <h2 className="text-xl font-bold mb-4">Your Classes</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left border-b">Class Name</th>
                    <th className="p-3 text-left border-b">Students</th>
                    <th className="p-3 text-left border-b">Attendance</th>
                    <th className="p-3 text-left border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map(cls => (
                    <tr key={cls.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{cls.name}</td>
                      <td className="p-3">{cls.totalStudents}</td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                cls.attendanceRate >= 80 ? 'bg-green-600' : 
                                cls.attendanceRate >= 70 ? 'bg-orange-500' : 'bg-red-500'
                              }`} 
                              style={{ width: `${cls.attendanceRate}%` }}
                            ></div>
                          </div>
                          <span className="ml-2">{cls.attendanceRate}%</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <button 
                          onClick={() => handleMarkAttendance(cls.id)}
                          className="bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 py-1 rounded mr-2"
                        >
                          Mark Attendance
                        </button>
                        <button 
                          onClick={() => handleViewStudents(cls.id)}
                          className="bg-purple-100 text-purple-600 hover:bg-purple-200 px-3 py-1 rounded"
                        >
                          View Students
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
          <ul className="space-y-3">
            <li className="flex items-center p-3 bg-blue-50 rounded">
              <div className="bg-blue-100 p-2 rounded mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Marked attendance for Computer Science 303</p>
                <p className="text-sm text-gray-600">Today, 09:30 AM</p>
              </div>
            </li>
            <li className="flex items-center p-3 bg-green-50 rounded">
              <div className="bg-green-100 p-2 rounded mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Physics 202 class completed</p>
                <p className="text-sm text-gray-600">Yesterday, 02:15 PM</p>
              </div>
            </li>
            <li className="flex items-center p-3 bg-yellow-50 rounded">
              <div className="bg-yellow-100 p-2 rounded mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Low attendance alert for Chemistry 104</p>
                <p className="text-sm text-gray-600">Yesterday, 10:45 AM</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-purple-600 text-white rounded-lg w-10 h-10 flex items-center justify-center mr-2">
              <span className="font-bold">A</span>
            </div>
            <h1 className="text-xl font-bold text-purple-600">AttendTrack</h1>
          </div>
        </div>
      </header>
      
      <main>
        {viewMode === 'dashboard' && renderDashboard()}
        {viewMode === 'students' && renderStudentsView()}
        {viewMode === 'attendance' && renderAttendanceView()}
      </main>
    </div>
  );
};

export default TeacherDashboard;