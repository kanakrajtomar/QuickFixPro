'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CourseForm = ({ courseID, setOpenForm }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    qualification: '',
    skills: '',
    state: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    pincode: '',
  });

  const [message, setMessage] = useState<string | null>(null); // State for success message

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const bookingData = { ...formData, courseId: courseID._id };
    try {
      const response = await fetch(
        'https://ad-api.sampurnakart.in/api/courses/book',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (response.ok) {
        setMessage('Your request has been successfully saved. We will notify you as soon as possible.');
        setFormData({ // Clear form data after successful submission
          name: '',
          age: '',
          qualification: '',
          skills: '',
          state: '',
          email: '',
          phone: '',
          city: '',
          address: '',
          pincode: '',
        });
      } else {
        setMessage('Failed to book the course. Please try again.');
      }
    } catch (error) {
      console.error('Error booking the course:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white border rounded-lg shadow-md">
      {message && (
        <div
          className={`p-3 mb-4 text-center rounded-lg ${
            message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Your Name..."
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter Your Age..."
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter Your Phone..."
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Your Email..."
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="Enter Your Skills (Optional)"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
          placeholder="Enter Your Qualification..."
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="Enter Your State..."
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Enter Your City..."
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter Your Address..."
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          placeholder="Enter Your Pincode..."
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded"
        >
          Enroll Yourself
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
