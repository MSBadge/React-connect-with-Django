import React, { useState } from 'react';
import { createPost } from '../api/API';

// Store in state 
const StudentForm = ({ onStudentAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'M'
  });

  // Display on UI, real time chenge
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit Form 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await createPost(formData);
      alert('Student added successfully!');
      setFormData({
        name: '',
        age: '',
        gender: 'M'
      });
      if (onStudentAdded) {
        onStudentAdded();
      }
    } catch (error) {
      console.error('Error posting data:', error);
      alert('Failed to add student.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex justify-center my-2.5'>
      <input 
        name="name" 
        placeholder="Name" 
        onChange={handleChange} 
        value={formData.name} 
        className='border rounded-sm p-1 m-1 hover:bg-gray-800'
      />
      <input 
        name="age" 
        type="number" 
        placeholder="Age" 
        onChange={handleChange} 
        value={formData.age} 
        className='border rounded-sm p-1 m-1 hover:bg-gray-800'
      />
      <select name="gender" onChange={handleChange} value={formData.gender} className='border rounded-sm p-1 m-1 h-8.5'>
        <option className=' bg-black' value="M">Male</option>
        <option className='bg-black' value="F">Female</option>
        <option className='bg-black' value="O">Other</option>
      </select>
      <button type="submit" className='border rounded-sm p-1 m-1 bg-sky-700 hover:bg-green-900 active:bg-green-600 w-20'>POST</button>
      
    </form>
  );
};

export default StudentForm;
