import React, { useEffect } from 'react'
import { useState } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import {useNavigate} from 'react-router-dom';

const ListEmployeeComponent = () => {
    const[employee,setEmployee]=useState([])
    const navigator=useNavigate();
   
    useEffect(()=>{
        getAllEmployees();
    },[])
    function getAllEmployees(){
        listEmployees().then((response)=>{
            setEmployee(response.data);
        }).catch(error=>{
                console.log(error);
            
        })
    }
    // const dummyData=[
    //     {
    //         "id": 1,
    //         "firstname": "U",
    //         "lastname": "T",
    //         "email": "User@mail.com"
    //     },
    //     {
    //         "id": 2,
    //         "firstname": "User",
    //         "lastname": "Testing",
    //         "email": "User@mail.com"
    //     },
    //     {
    //         "id": 3,
    //         "firstname": "Ur",
    //         "lastname": "Ting",
    //         "email": "User@mail.com"
    //     }
    // ]
    function addnewEmployee(){
        navigator("/add-employee")
    }
function updateEmployee(id){
    navigator(`/edit-employee/${id}`)
}
function deleteEmployeebyid(id){
    alert("want to delete??");
    alert("really\ to delete??");
    deleteEmployee(id).then((response)=>{
        console.log(response.data);
        getAllEmployees();
    
    }).catch(error=>console.error(error))
}

  return (
    <div className='container'>
        
      <h2 className='text-center'>List of employees</h2>
      <button type="button" className="btn btn-primary mb-2" onClick={addnewEmployee}>Add New Employee</button>
      <table className='table table-striped table-bordered'>
        <thead>
        
            <tr>
            <th>
                    Employee id
                </th>
                <th>
                    Employee firstname
                </th>
                <th>
                    Employee lastname
                </th>
                <th>
                    Employee email
                </th>
                <th>
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            {/* {dummyData.map(employee=>
                <tr key={employee.id}
                >
                    <td>{employee.id}</td>
                    <td>{employee.firstname}</td>
                    <td>{employee.lastname}</td>
                    <td>{employee.email}</td>
                </tr>
            )} */}
             {employee.map(employee=>
                <tr key={employee.id}
                >
                    <td>{employee.id}</td>
                    <td>{employee.firstname}</td>
                    <td>{employee.lastname}</td>
                    <td>{employee.email}</td>
                    <td >
                         <button className='btn btn-info' onClick={()=>{updateEmployee(employee.id)}} >Update</button>
                         <button className='btn btn-danger' onClick={()=>{deleteEmployeebyid(employee.id)}}  style={{marginLeft:'10px'}}>Delete</button>
                         </td>
                </tr>
            )} 
            
        </tbody>
      </table>
    </div>
  )
}

export default ListEmployeeComponent
