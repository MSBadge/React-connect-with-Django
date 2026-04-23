import { useEffect, useState } from 'react'
import { deletePost, getList } from '../api/API'
import StudentForm from './Form';
import { Update } from './Update';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export const Dashboard = () => {

    const [stuData, setData] = useState([])
    const [selectedStudent, setSelectedStudent] = useState(null)

    // Dispaly all List 
    const getStudentData = async () => {
        try {
            const res = await getList();
            setData(res.data)
            
        } catch (error) {
            console.log(error.data);
            
        }
    }

    useEffect(()=>{
        getStudentData()
    },[])

    const handleEditClick = (student) => {
        setSelectedStudent(student)
    }


    // Delete Post 
    const handleDeletePost = async (id) => {
        await deletePost(id)
        alert('Student Delete Succesfully !!')
        
        // Filter and display remaning data 
        const updatedPosts = stuData.filter((current) => {
            return current.id !== id
        });
        setData(updatedPosts)
    }
    
  return (
    <>
    <StudentForm onStudentAdded={getStudentData} />
    <Update
        selectedStudent={selectedStudent}
        onUpdated={getStudentData}
        onCancel={() => setSelectedStudent(null)}
    />
    
    <div className='flex justify-center'>
    <table className='w-2xl text-center'>
        <caption>Student List</caption>
        <thead>
        <tr>
            <th className='border border-gray-300 px-4 py-2'>Sr. No</th>
            <th className='border border-gray-300 px-4 py-2'>Name</th>
            <th className='border border-gray-300 px-4 py-2'>Age</th>
            <th className='border border-gray-300 px-4 py-2'>Gender</th>
            <th className='border border-gray-300 px-4 py-2'>Edit / Delete</th>
        </tr>
        </thead>
        <tbody>
        {stuData.map((item,id)=>(
        <tr key={item.id}>
            <td className='border border-gray-300 px-4 py-2'>{id + 1}</td>
            <td className='border border-gray-300 px-4 py-2 text-justify'>{item.name}</td>
            <td className='border border-gray-300 px-4 py-2'>{item.age}</td>
            <td className='border border-gray-300 px-4 py-2'>{item.gender}</td>
            <td className='border border-gray-300 px-4 py-2 flex justify-around'>
                <button className='border border-green-500 bg-green-400 m-1 p-2 hover:bg-green-500 active:bg-green-800 rounded-4xl' type="submit" onClick={() => {
                    handleEditClick(item)
                }} ><EditIcon/></button>
                <button className='border border-red-500 bg-red-400 hover:bg-red-500 active:bg-red-800 m-1 p-2 rounded-4xl' type="submit" onClick={() => 
                    {
                        handleDeletePost(item.id)
                    }
                }><DeleteIcon/></button>
            </td>
        </tr> ))}
        </tbody>
    </table>        
    </div>

        
        
    </>
  )
}
