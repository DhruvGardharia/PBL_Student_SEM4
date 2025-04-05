// // import React, { useState } from 'react';
// // import AuthButton from './AuthButton';

// // const HeroSection = () => {
// //   const [activeTab, setActiveTab] = useState('login');
// //   const [userType, setUserType] = useState('student');
  
// //   return (
// //     <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
// //       {/* Left Section - Text Content */}
// //       <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
// //         <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
// //           Simplify Attendance <span className="gradient-text">Management</span>
// //         </h1>
// //         <p className="text-xl text-gray-600 mb-8">
// //           Track student attendance effortlessly with our intuitive platform designed for both teachers and students.
// //         </p>
        
// //         {/* Stats */}
// //         <div className="grid grid-cols-3 gap-4 mb-8">
// //           <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-lg shadow-sm card-hover">
// //             <h3 className="text-3xl font-bold gradient-text">99%</h3>
// //             <p className="text-sm text-gray-600">Accuracy</p>
// //           </div>
// //           <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-lg shadow-sm card-hover">
// //             <h3 className="text-3xl font-bold gradient-text">1000+</h3>
// //             <p className="text-sm text-gray-600">Schools</p>
// //           </div>
// //           <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-lg shadow-sm card-hover">
// //             <h3 className="text-3xl font-bold gradient-text">50k+</h3>
// //             <p className="text-sm text-gray-600">Users</p>
// //           </div>
// //         </div>
// //       </div>
      
// //       {/* Right Section - Auth Cards */}
// //       <div className="md:w-1/2">
// //         <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md mx-auto animate-float">
// //           {/* Tab Buttons */}
// //           <div className="flex mb-8 bg-gray-100 rounded-full p-1">
// //             <button 
// //               onClick={() => setActiveTab('login')}
// //               className={`flex-1 py-2 rounded-full font-medium transition-all ${
// //                 activeTab === 'login' 
// //                   ? 'bg-white shadow-sm text-attendblue'
// //                   : 'text-gray-500 hover:text-gray-700'
// //               }`}
// //             >
// //               Login
// //             </button>
// //             <button 
// //               onClick={() => setActiveTab('signup')}
// //               className={`flex-1 py-2 rounded-full font-medium transition-all ${
// //                 activeTab === 'signup' 
// //                   ? 'bg-white shadow-sm text-attendpurple'
// //                   : 'text-gray-500 hover:text-gray-700'
// //               }`}
// //             >
// //               Sign Up
// //             </button>
// //           </div>
          
// //           {/* User Type Toggle */}
// //           <div className="flex justify-center mb-8">
// //             <div className="inline-flex bg-gray-100 rounded-full p-1">
// //               <button 
// //                 onClick={() => setUserType('student')}
// //                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
// //                   userType === 'student' 
// //                     ? 'bg-white shadow-sm text-attendpurple'
// //                     : 'text-gray-500 hover:text-gray-700'
// //                 }`}
// //               >
// //                 Student
// //               </button>
// //               <button 
// //                 onClick={() => setUserType('teacher')}
// //                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
// //                   userType === 'teacher' 
// //                     ? 'bg-white shadow-sm text-attendblue'
// //                     : 'text-gray-500 hover:text-gray-700'
// //                 }`}
// //               >
// //                 Teacher
// //               </button>
// //             </div>
// //           </div>
          
// //           <h3 className="text-2xl font-bold text-center mb-6">
// //             {activeTab === 'login' ? 'Welcome Back!' : 'Create Your Account'}
// //           </h3>
          
// //           {/* Form Fields */}
// //           <div className="space-y-4 mb-8">
// //             {activeTab === 'signup' && (
// //               <div>
// //                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
// //                 <input
// //                   type="text"
// //                   id="name"
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-attendblue focus:border-attendblue"
// //                   placeholder="Enter your full name"
// //                 />
// //               </div>
// //             )}
            
// //             <div>
// //               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
// //               <input
// //                 type="email"
// //                 id="email"
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-attendblue focus:border-attendblue"
// //                 placeholder="Enter your email"
// //               />
// //             </div>
            
// //             <div>
// //               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
// //               <input
// //                 type="password"
// //                 id="password"
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-attendblue focus:border-attendblue"
// //                 placeholder="Enter your password"
// //               />
// //             </div>
// //           </div>
          
// //           {/* Action Button */}
// //           <AuthButton 
// //             text={activeTab === 'login' ? 'Login' : 'Sign Up'} 
// //             type={userType === 'student' ? 'student' : 'teacher'}
// //           />
          
// //           {/* Additional Options */}
// //           <div className="mt-6 text-center">
// //             <a href="#" className="text-sm text-attendblue hover:underline">
// //               {activeTab === 'login' ? 'Forgot password?' : 'Already have an account? Login'}
// //             </a>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HeroSection;
// import React, { useState } from 'react';
// import AuthButton from './AuthButton';

// const HeroSection = () => {
//   const [activeTab, setActiveTab] = useState('login');
//   const [userType, setUserType] = useState('student');
  
//   return (
//     <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
//       {/* Left Section - Text Content */}
//       <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
//           Simplify Attendance <span className="gradient-text">Management</span>
//         </h1>
//         <p className="text-xl text-gray-600 mb-8">
//           Track student attendance effortlessly with our intuitive platform designed for both teachers and students.
//         </p>
//       </div>
      
//       {/* Right Section - Auth Cards */}
//       <div className="md:w-1/2">
//         <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md mx-auto animate-float">
//           {/* Tab Buttons */}
//           <div className="flex mb-8 bg-gray-100 rounded-full p-1">
//             <button 
//               onClick={() => setActiveTab('login')}
//               className={`flex-1 py-2 rounded-full font-medium transition-all ${
//                 activeTab === 'login' 
//                   ? 'bg-white shadow-sm text-attendblue'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Login
//             </button>
//             <button 
//               onClick={() => setActiveTab('signup')}
//               className={`flex-1 py-2 rounded-full font-medium transition-all ${
//                 activeTab === 'signup' 
//                   ? 'bg-white shadow-sm text-attendpurple'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Sign Up
//             </button>
//           </div>
          
//           {/* User Type Toggle */}
//           <div className="flex justify-center mb-8">
//             <div className="inline-flex bg-gray-100 rounded-full p-1">
//               <button 
//                 onClick={() => setUserType('student')}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                   userType === 'student' 
//                     ? 'bg-white shadow-sm text-attendpurple'
//                     : 'text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 Student
//               </button>
//               <button 
//                 onClick={() => setUserType('teacher')}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                   userType === 'teacher' 
//                     ? 'bg-white shadow-sm text-attendblue'
//                     : 'text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 Teacher
//               </button>
//             </div>
//           </div>
          
//           <h3 className="text-2xl font-bold text-center mb-6">
//             {activeTab === 'login' ? 'Welcome Back!' : 'Create Your Account'}
//           </h3>
          
//           {/* Form Fields */}
//           <div className="space-y-4 mb-8">
//             {activeTab === 'signup' && userType === 'student' && (
//               <>
//                 <div>
//                   <label htmlFor="roll_no" className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
//                   <input
//                     type="text"
//                     id="roll_no"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-attendblue focus:border-attendblue"
//                     placeholder="Enter your roll number"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-attendblue focus:border-attendblue"
//                     placeholder="Enter your full name"
//                   />
//                 </div>
//               </>
//             )}
//             {activeTab === 'signup' && userType === 'teacher' && (
//               <>
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-attendblue focus:border-attendblue"
//                     placeholder="Enter your full name"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="subjects" className="block text-sm font-medium text-gray-700 mb-1">Subjects</label>
//                   <input
//                     type="text"
//                     id="subjects"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-attendblue focus:border-attendblue"
//                     placeholder="Enter subjects you teach"
//                   />
//                 </div>
//               </>
//             )}
            
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//               <input
//                 type="email"
//                 id="email"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-attendblue focus:border-attendblue"
//                 placeholder="Enter your email"
//               />
//             </div>
            
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-attendblue focus:border-attendblue"
//                 placeholder="Enter your password"
//               />
//             </div>
//           </div>
          
//           {/* Action Button */}
//           <AuthButton 
//             text={activeTab === 'login' ? 'Login' : 'Sign Up'} 
//             type={userType === 'student' ? 'student' : 'teacher'}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthButton from './AuthButton';

const HeroSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [userType, setUserType] = useState('student');
  
  // Mock login function
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would validate credentials here
    if (activeTab === 'login' && userType === 'student') {
      navigate('/student-dashboard');
    } 
    else if(activeTab === 'login' && userType === 'teacher')
      navigate('/teacher-dashboard');

    else {
      // Handle teacher login or signup flow
      alert("This functionality is still under development");
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
      {/* Left Section - Text Content */}
      <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Simplify Attendance <span className="gradient-text">Management</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Track student attendance effortlessly with our intuitive platform designed for both teachers and students.
        </p>
      </div>
      
      {/* Right Section - Auth Cards */}
      <div className="md:w-1/2">
        <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md mx-auto animate-float">
          {/* Tab Buttons */}
          <div className="flex mb-8 bg-gray-100 rounded-full p-1">
            <button 
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 rounded-full font-medium transition-all ${
                activeTab === 'login' 
                  ? 'bg-white shadow-sm text-attendblue'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Login
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-2 rounded-full font-medium transition-all ${
                activeTab === 'signup' 
                  ? 'bg-white shadow-sm text-attendpurple'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>
          
          {/* User Type Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-full p-1">
              <button 
                type="button"
                onClick={() => setUserType('student')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  userType === 'student' 
                    ? 'bg-white shadow-sm text-attendpurple'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Student
              </button>
              <button 
                type="button"
                onClick={() => setUserType('teacher')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  userType === 'teacher' 
                    ? 'bg-white shadow-sm text-attendblue'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Teacher
              </button>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-center mb-6">
            {activeTab === 'login' ? 'Welcome Back!' : 'Create Your Account'}
          </h3>
          
          {/* Form Fields */}
          <div className="space-y-4 mb-8">
            {activeTab === 'signup' && userType === 'student' && (
              <>
                <div>
                  <label htmlFor="roll_no" className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                  <input
                    type="text"
                    id="roll_no"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-attendblue focus:border-attendblue"
                    placeholder="Enter your roll number"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-attendblue focus:border-attendblue"
                    placeholder="Enter your full name"
                  />
                </div>
              </>
            )}
            {activeTab === 'signup' && userType === 'teacher' && (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-attendblue focus:border-attendblue"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="subjects" className="block text-sm font-medium text-gray-700 mb-1">Subjects</label>
                  <input
                    type="text"
                    id="subjects"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-attendblue focus:border-attendblue"
                    placeholder="Enter subjects you teach"
                  />
                </div>
              </>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-attendblue focus:border-attendblue"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-attendblue focus:border-attendblue"
                placeholder="Enter your password"
              />
            </div>
          </div>
          
          {/* Action Button */}
          <AuthButton 
            text={activeTab === 'login' ? 'Login' : 'Sign Up'} 
            type={userType === 'student' ? 'student' : 'teacher'}
          />
        </form>
      </div>
    </div>
  );
};

export default HeroSection;