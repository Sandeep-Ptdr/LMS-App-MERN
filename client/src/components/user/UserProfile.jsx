import React from "react";

const UserProfile = () => {
  // Hardcoded user data for display purposes
  const user = {
    name: "John Doe",  
    email: "johndoe@example.com",  
    role: "Instructor",  
    bio: "I am an instructor with over 5 years of experience in teaching web development.",
    profilePicture: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-sulimansallehi-1704488.jpg&fm=jpg",  
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-semibold mb-6 text-gray-600">User Profile</h1>

      <div className="bg-gray-50 shadow-md rounded p-4">
        
        <div className="flex justify-center items-center mb-4">
          <img
            className="w-32 h-32 rounded-full object-cover object-center border-2 border-gray-300"
            src={user.profilePicture}
            alt="Profile"
          />
        </div>

         
        <p className="text-gray-700 text-lg mb-2">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="text-gray-700 text-lg mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-700 text-lg mb-2">
          <strong>Role:</strong> {user.role}
        </p>
        <p className="text-gray-700 text-lg mb-4">
          <strong>Bio:</strong> {user.bio}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
