
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Calendar } from "./ui/calendar";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "./ui/table";
// import { Button } from "./ui/button";
// import { Calendar as CalendarIcon, UserRound, LogOut } from "lucide-react";

// const StudentProfile = ({ student, onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white w-full max-w-md rounded-lg overflow-hidden shadow-xl transform transition-all">
//         <div className="relative">
//           <div className="h-32 bg-gradient-to-r from-purple-500 to-blue-500"></div>
//           <button 
//             onClick={onClose}
//             className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/40 transition-colors"
//           >
//             ×
//           </button>
//           <div className="flex justify-center">
//             <img 
//               src={student.profileImage} 
//               alt={student.name}
//               className="h-24 w-24 rounded-full border-4 border-white absolute -bottom-12"
//             />
//           </div>
//         </div>
        
//         <div className="pt-16 pb-8 px-6">
//           <h2 className="text-2xl font-bold text-center mb-1">{student.name}</h2>
//           <p className="text-gray-500 text-center mb-6">{student.rollNumber}</p>
          
//           <div className="space-y-4">
//             <div className="bg-gray-50 rounded-lg p-4">
//               <p className="text-sm text-gray-500 mb-1">Email</p>
//               <p className="font-medium">{student.email}</p>
//             </div>
            
//             <div className="bg-gray-50 rounded-lg p-4">
//               <p className="text-sm text-gray-500 mb-1">Course</p>
//               <p className="font-medium">{student.course}</p>
//             </div>
            
//             <div className="bg-gray-50 rounded-lg p-4">
//               <p className="text-sm text-gray-500 mb-1">Semester</p>
//               <p className="font-medium">{student.semester}</p>
//             </div>
//           </div>
          
//           <Button 
//             className="w-full mt-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white"
//             onClick={onClose}
//           >
//             Close
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const StudentDashboard = () => {
//   const navigate = useNavigate();
//   const [date, setDate] = useState(new Date());
//   const [showProfile, setShowProfile] = useState(false);
  
//   const studentData = {
//     name: "John Doe",
//     rollNumber: "R12345",
//     email: "john.doe@example.com",
//     course: "Computer Science",
//     semester: "4th Semester",
//     profileImage: "https://i.pravatar.cc/150?img=12"
//   };
  
//   const attendanceData = [
//     { date: "2023-09-01", status: "Present", subject: "Mathematics" },
//     { date: "2023-09-02", status: "Absent", subject: "Physics" },
//     { date: "2023-09-03", status: "Present", subject: "Computer Science" }
//   ];
  
//   const totalClasses = attendanceData.length;
//   const presentClasses = attendanceData.filter(record => record.status === "Present").length;
//   const attendancePercentage = Math.round((presentClasses / totalClasses) * 100);
  
//   const filteredAttendance = attendanceData.filter(record => {
//     return new Date(record.date).toDateString() === date.toDateString();
//   });
  
//   const handleLogout = () => {
//     navigate('/');
//   };
  
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <header className="bg-white p-4 shadow-md flex justify-between items-center">
//         <h1 className="text-xl font-bold">Student Dashboard</h1>
//         <div className="flex gap-4">
//           <Button variant="ghost" onClick={() => setShowProfile(true)}>
//             <UserRound className="h-5 w-5" /> Profile
//           </Button>
//           <Button variant="outline" onClick={handleLogout}>
//             <LogOut className="h-5 w-5" /> Logout
//           </Button>
//         </div>
//       </header>
//       <main className="mt-6 grid gap-6 lg:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Attendance Calendar</CardTitle>
//             <CardDescription>Select a date to view attendance</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Calendar mode="single" selected={date} onSelect={(newDate) => newDate && setDate(newDate)} />
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Attendance Records</CardTitle>
//             <CardDescription>{date.toDateString()}</CardDescription>
//           </CardHeader>
//           <CardContent>
//             {filteredAttendance.length > 0 ? (
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Subject</TableHead>
//                     <TableHead>Status</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredAttendance.map((record, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{record.subject}</TableCell>
//                       <TableCell>
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           record.status === 'Present' 
//                             ? 'bg-green-100 text-green-800' 
//                             : 'bg-red-100 text-red-800'
//                         }`}>
//                           {record.status}
//                         </span>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             ) : (
//               <p>No attendance records found for this date.</p>
//             )}
//           </CardContent>
//         </Card>
//       </main>
//       {showProfile && (
//         <StudentProfile 
//           student={studentData} 
//           onClose={() => setShowProfile(false)} 
//         />
//       )}
//     </div>
//   );
// };

// export default StudentDashboard;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  Calendar  from "./ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import Badge  from "./ui/badge";
import { 
  Calendar as CalendarIcon, 
  UserRound, 
  LogOut, 
  Bell, 
  BookOpen, 
  Award, 
  Clock, 
  ArrowUpRight 
} from "lucide-react";
import { CalendarDays } from "lucide-react";

// const StudentProfile = ({ student, onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
//       <div className="bg-white w-full max-w-md rounded-xl overflow-hidden shadow-2xl transform transition-all animate-scale-in">
//         <div className="relative">
//           <div className="h-36 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"></div>
//           <button 
//             onClick={onClose}
//             className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/40 transition-colors text-white text-xl font-bold"
//           >
//             ×
//           </button>
//           <div className="flex justify-center">
//             <img 
//               src={student.profileImage} 
//               alt={student.name}
//               className="h-28 w-28 rounded-full border-4 border-white absolute -bottom-14 shadow-lg hover:scale-105 transition-transform duration-300"
//             />
//           </div>
//         </div>
        
//         <div className="pt-16 pb-8 px-6">
//           <h2 className="text-2xl font-bold text-center mb-1 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{student.name}</h2>
//           <p className="text-gray-500 text-center mb-6 flex items-center justify-center gap-2">
//             <Badge variant="outline" className="font-semibold">{student.rollNumber}</Badge>
//           </p>
          
//           <div className="space-y-4">
//             <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-100">
//               <p className="text-sm text-gray-500 mb-1">Email</p>
//               <p className="font-medium">{student.email}</p>
//             </div>
            
//             <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-100">
//               <p className="text-sm text-gray-500 mb-1">Course</p>
//               <p className="font-medium flex items-center">
//                 <BookOpen className="h-4 w-4 mr-2 text-purple-500" />
//                 {student.course}
//               </p>
//             </div>
            
//             <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-100">
//               <p className="text-sm text-gray-500 mb-1">Semester</p>
//               <p className="font-medium flex items-center">
//                 <Clock className="h-4 w-4 mr-2 text-purple-500" />
//                 {student.semester}
//               </p>
//             </div>

//             <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-100">
//               <p className="text-sm text-gray-500 mb-1">Attendance</p>
//               <p className="font-medium flex items-center">
//                 <Award className="h-4 w-4 mr-2 text-purple-500" />
//                 Good Standing (85%)
//               </p>
//             </div>
//           </div>
          
//           <Button 
//             className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all duration-300"
//             onClick={onClose}
//           >
//             Close
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AttendanceCard = ({ title, value, icon, color }) => {
//   return (
//     <div className={`bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 ${color} flex items-center gap-4 group hover:-translate-y-1`}>
//       <div className={`p-3 rounded-full ${color.replace('border-', 'bg-').replace('-600', '-100')} ${color.replace('border-', 'text-')}`}>
//         {icon}
//       </div>
//       <div>
//         <p className="text-sm text-gray-500 mb-1">{title}</p>
//         <p className="text-2xl font-bold">{value}</p>
//       </div>
//       <ArrowUpRight className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" />
//     </div>
//   );
// };

// const StudentDashboard = () => {
//   const navigate = useNavigate();
//   const [date, setDate] = useState(new Date());
//   const [showProfile, setShowProfile] = useState(false);
  
//   const studentData = {
//     name: "John Doe",
//     rollNumber: "R12345",
//     email: "john.doe@example.com",
//     course: "Computer Science",
//     semester: "4th Semester",
//     profileImage: "https://i.pravatar.cc/150?img=12"
//   };
  
//   const attendanceData = [
//     { date: "2023-09-01", status: "Present", subject: "Mathematics" },
//     { date: "2023-09-01", status: "Present", subject: "Physics" },
//     { date: "2023-09-01", status: "Present", subject: "Chemistry" },
//     { date: "2023-09-02", status: "Absent", subject: "Physics" },
//     { date: "2023-09-03", status: "Present", subject: "Computer Science" }
//   ];
  
//   const totalClasses = attendanceData.length;
//   const presentClasses = attendanceData.filter(record => record.status === "Present").length;
//   const attendancePercentage = Math.round((presentClasses / totalClasses) * 100);
  
//   const filteredAttendance = attendanceData.filter(record => {
//     return new Date(record.date).toDateString() === date.toDateString();
//   });
  
//   const handleLogout = () => {
//     navigate('/');
//   };
  
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
//         <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//           <div className="flex items-center gap-2">
//             <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-md">
//               <span className="text-white font-bold text-xl">A</span>
//             </div>
//             <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">AttendTrack</h1>
//           </div>
//           <div className="flex items-center gap-3">
//             <Button variant="ghost" size="sm" className="relative">
//               <Bell className="h-5 w-5" />
//               <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">3</span>
//             </Button>
//             <Button 
//               variant="ghost" 
//               className="flex items-center gap-2 hover:bg-gray-100 transition-colors"
//               onClick={() => setShowProfile(true)}
//             >
//               <img 
//                 src={studentData.profileImage} 
//                 alt={studentData.name}
//                 className="h-8 w-8 rounded-full border border-gray-200"
//               />
//               <span className="font-medium">{studentData.name}</span>
//             </Button>
//             <Button 
//               variant="outline" 
//               className="flex items-center gap-2 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
//               onClick={handleLogout}
//             >
//               <LogOut className="h-4 w-4" />
//               <span>Logout</span>
//             </Button>
//           </div>
//         </div>
//       </header>
      
//       <main className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <AttendanceCard 
//             title="Total Attendance" 
//             value={`${attendancePercentage}%`} 
//             icon={<Award className="h-6 w-6" />}
//             color="border-green-600"
//           />
//           <AttendanceCard 
//             title="Days Present" 
//             value={presentClasses} 
//             icon={<Clock className="h-6 w-6" />}
//             color="border-blue-600"
//           />
//           <AttendanceCard 
//             title="Total Classes" 
//             value={totalClasses} 
//             icon={<BookOpen className="h-6 w-6" />}
//             color="border-purple-600"
//           />
//         </div>
        
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <Card className="overflow-hidden hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm border border-white">
//             <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
//               <CardTitle className="flex items-center gap-2 text-gray-800">
//                 <CalendarIcon className="h-5 w-5 text-indigo-600" />
//                 <span>Attendance Calendar</span>
//               </CardTitle>
//               <CardDescription>Select a date to view attendance</CardDescription>
//             </CardHeader>
//             <CardContent className="p-4">
//               <Calendar
//                 mode="single"
//                 selected={date}
//                 onSelect={(newDate) => newDate && setDate(newDate)}
//                 className="rounded-md border border-gray-100 p-3 hover:shadow-inner transition-shadow mx-auto max-w-sm"
//               />
//             </CardContent>
//           </Card>
          
//           <Card className="lg:col-span-2 overflow-hidden hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm border border-white">
//             <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
//               <CardTitle className="text-gray-800">Attendance Records</CardTitle>
//               <CardDescription className="flex items-center gap-1">
//                 <CalendarIcon className="h-4 w-4" />
//                 {date.toLocaleDateString('en-US', { 
//                   weekday: 'long', 
//                   month: 'short', 
//                   day: 'numeric' 
//                 })}
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               {filteredAttendance.length > 0 ? (
//                 <div className="rounded-lg border border-gray-100 overflow-hidden">
//                   <Table>
//                     <TableHeader className="bg-gray-50">
//                       <TableRow>
//                         <TableHead>Subject</TableHead>
//                         <TableHead>Status</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {filteredAttendance.map((record, index) => (
//                         <TableRow key={index} className="hover:bg-gray-50 transition-colors">
//                           <TableCell className="font-medium">{record.subject}</TableCell>
//                           <TableCell>
//                             <Badge variant={record.status === 'Present' ? 'outline' : 'destructive'} 
//                               className={`hover:scale-105 transition-transform ${
//                                 record.status === 'Present' 
//                                   ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
//                                   : ''
//                               }`}>
//                               {record.status}
//                             </Badge>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </div>
//               ) : (
//                 <div className="text-center py-12 text-gray-500 bg-gray-50/50 rounded-lg border border-dashed border-gray-200">
//                   <CalendarIcon className="h-12 w-12 mx-auto text-gray-300 mb-2" />
//                   <p>No attendance records found for this date</p>
//                   <Button variant="ghost" size="sm" className="mt-2 text-indigo-600 hover:text-indigo-700">
//                     Choose another date
//                   </Button>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </main>
      
//       {showProfile && (
//         <StudentProfile 
//           student={studentData} 
//           onClose={() => setShowProfile(false)} 
//         />
//       )}
//     </div>
//   );
// };

// export default StudentDashboard;

const AttendanceProgressCircle = ({ percentage }) => {
  let color = "bg-green-500";
  if (percentage < 75) {
    color = "bg-red-500";
  } else if (percentage < 85) {
    color = "bg-orange-500";
  }

  return (
    <div className="relative w-48 h-48 mx-auto">
      <div className="w-full h-full rounded-full bg-gray-200"></div>
      <div 
        className={`absolute top-0 left-0 w-full h-full rounded-full ${color} transition-all duration-1000 ease-out`}
        style={{ 
          clipPath: `polygon(50% 50%, 50% 0%, ${percentage >= 50 ? '100% 0%' : `${50 + (percentage/100 * 360)}% 0%`}, ${
            percentage >= 25 ? '100% 0%, 100% 100%' : ''
          }${
            percentage >= 50 ? ', 0% 100%' : ''
          }${
            percentage >= 75 ? ', 0% 0%' : ''
          }${
            percentage >= 100 ? ', 50% 0%' : ''
          })` 
        }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full rounded-full flex items-center justify-center">
        <div className="bg-white rounded-full w-36 h-36 flex flex-col items-center justify-center shadow-inner">
          <span className="text-4xl font-bold">{percentage}%</span>
          <span className="text-sm text-gray-500">Attendance</span>
        </div>
      </div>
    </div>
  );
};

const AttendanceCard = ({ title, value, icon, color }) => {
  return (
    <div className={`bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 ${color} flex items-center gap-4 group hover:-translate-y-1`}>
      <div className={`p-3 rounded-full ${color.replace('border-', 'bg-').replace('-600', '-100')} ${color.replace('border-', 'text-')}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <ArrowUpRight className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" />
    </div>
  );
};

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  
  const studentData = {
    name: "John Doe",
    rollNumber: "R12345",
    email: "john.doe@example.com",
    course: "Computer Science",
    semester: "4th Semester",
    profileImage: "https://i.pravatar.cc/150?img=12"
  };
  
  const attendanceData = [
    { date: "2023-09-01", status: "Present", subject: "Mathematics", time: "10:00 AM" },
    { date: "2023-09-01", status: "Present", subject: "Physics", time: "11:30 AM" },
    { date: "2023-09-01", status: "Present", subject: "Chemistry", time: "2:00 PM" },
    { date: "2023-09-02", status: "Absent", subject: "Physics", time: "11:30 AM" },
    { date: "2023-09-03", status: "Present", subject: "Computer Science", time: "9:00 AM" },
    { date: "2023-09-04", status: "Present", subject: "Mathematics", time: "10:00 AM" },
    { date: "2023-09-04", status: "Absent", subject: "Physics", time: "11:30 AM" },
    { date: "2023-09-05", status: "Present", subject: "Chemistry", time: "2:00 PM" }
  ];
  
  const totalClasses = attendanceData.length;
  const presentClasses = attendanceData.filter(record => record.status === "Present").length;
  const attendancePercentage = Math.round((presentClasses / totalClasses) * 100);
  
  const handleLogout = () => {
    navigate('/');
  };

  const handleViewProfile = () => {
    navigate('/profile');
  };

  const handleCheckAttendance = () => {
    navigate('/check-attendance');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">AttendTrack</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">3</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 hover:bg-gray-100 transition-colors"
              onClick={handleViewProfile}
            >
              <img 
                src={studentData.profileImage} 
                alt={studentData.name}
                className="h-8 w-8 rounded-full border border-gray-200"
              />
              <span className="font-medium">{studentData.name}</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Attendance Overview</h2>
            <AttendanceProgressCircle percentage={attendancePercentage} />
            <div className="mt-6 text-center">
              <p className={`text-sm font-medium ${
                attendancePercentage < 75 ? 'text-red-500' : 
                attendancePercentage < 85 ? 'text-orange-500' : 'text-green-500'
              }`}>
                {attendancePercentage < 75 ? 'Poor' : 
                 attendancePercentage < 85 ? 'Average' : 'Excellent'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {attendancePercentage < 75 ? 'Your attendance is below requirements' : 
                 attendancePercentage < 85 ? 'Your attendance is acceptable' : 'Keep up the good work!'}
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <AttendanceCard 
              title="Total Classes" 
              value={totalClasses} 
              icon={<BookOpen className="h-6 w-6" />}
              color="border-purple-600"
            />
            <AttendanceCard 
              title="Classes Attended" 
              value={presentClasses} 
              icon={<Clock className="h-6 w-6" />}
              color="border-blue-600"
            />
            <Card className="md:col-span-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 hover:shadow-md transition-all duration-300 border border-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-indigo-600" />
                  Check Attendance by Date
                </CardTitle>
                <CardDescription>View your attendance records for specific dates</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all duration-300"
                  onClick={handleCheckAttendance}
                >
                  Check Attendance
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Card className="overflow-hidden hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm border border-white">
          <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
            <CardTitle className="text-gray-800">Recent Attendance</CardTitle>
            <CardDescription>Your attendance for the last 5 classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-gray-100 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.slice(0, 5).map((record, index) => (
                    <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                      <TableCell>{new Date(record.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric'
                      })}</TableCell>
                      <TableCell className="font-medium">{record.subject}</TableCell>
                      <TableCell>{record.time}</TableCell>
                      <TableCell>
                        <Badge variant={record.status === 'Present' ? 'outline' : 'destructive'} 
                          className={`hover:scale-105 transition-transform ${
                            record.status === 'Present' 
                              ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
                              : ''
                          }`}>
                          {record.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default StudentDashboard;
