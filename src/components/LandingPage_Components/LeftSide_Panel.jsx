import React from 'react';

function LeftSide_Panel() {
  return (
    <div className="flex flex-col">


      {/* Branding Section */}
      <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <div className="flex-shrink-0 text-white text-2xl font-semibold">Landing Page</div>
      </div>


      {/* Desktop Menu */}
      <div className="hidden sm:block sm:ml-6">
        <div className="flex space-x-4">

          <a
            href="#my team"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            My Team
          </a>

          <a
            href="#Task Assignment and Prioritization"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            Assign Task
          </a>

          <a
            href="#Deadline Tracking and Notifications"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            Track Deadlines
          </a>

          <a
            href="#Progress Reporting"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            Progress Report
          </a>

          <a
            href="#Role-Based Permission"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
          >
           Role-Based Permission
          </a>

          <a
            href="#Real-Time Collaboration"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
          >
           Real-Time Collaboratrion
          </a>
          
        </div>
      </div>
    </div>
  );
}

export default LeftSide_Panel;
