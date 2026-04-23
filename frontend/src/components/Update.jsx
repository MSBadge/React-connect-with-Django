import { useEffect, useState } from 'react';
import { putPost } from '../api/API';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export const Update = ({ selectedStudent, onUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'M'
  });

  useEffect(() => {
    if (selectedStudent) {
      setFormData({
        name: selectedStudent.name || '',
        age: selectedStudent.age || '',
        gender: selectedStudent.gender || 'M'
      });
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedStudent) {
      return;
    }

    try {
      await putPost(selectedStudent.id, formData);
      alert('Student updated successfully!');
      onUpdated();
      onCancel();
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Failed to update student.');
    }
  };

  if (!selectedStudent) {
    return null;
  }

  return (
    <form onSubmit={handleUpdate} className='flex justify-center my-2.5'>
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
      <select
        name="gender"
        onChange={handleChange}
        value={formData.gender}
        className='border rounded-sm p-1 m-1 h-8.5'
      >
        <option className='bg-black' value="M">Male</option>
        <option className='bg-black' value="F">Female</option>
        <option className='bg-black' value="O">Other</option>
      </select>
      <button type="submit" className='border rounded-sm p-1 m-1 bg-amber-700 hover:bg-amber-900 active:bg-amber-600 w-20'>
        <CheckIcon/>
      </button>
      <button type="button" onClick={onCancel} className='border rounded-sm p-1 m-1 bg-gray-700 hover:bg-gray-900 active:bg-gray-600 w-20'>
        <CloseIcon/>
      </button>
    </form>
  );
};
