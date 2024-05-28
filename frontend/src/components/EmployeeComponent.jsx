import React, { useEffect, useState } from 'react';
import { createEmployee ,getEmployee, updateEmployee} from '../services/EmployeeService';
import {useNavigate,useParams} from 'react-router-dom';

const EmployeeComponent = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [errors,setErrors]=useState({firstname:'',lastname:'',email:''})
    const {id}=useParams();
const navigator=useNavigate()
useEffect(()=>{
    if(id){
        getEmployee(id).then((response)=>{
            setFirstname(response.data.firstname);
            setLastname(response.data.lastname);
            setEmail(response.data.email);
        }).catch(error=>console.log(error))
    }
},[id])
    function saveorUpdateEmployee(e) {
        e.preventDefault(); // Prevent the default form submission behavior
        const employee = { firstname, lastname, email };
        console.log(employee); // Log the employee object to the console
       
       if(validateForm()){
        if(id){
            updateEmployee(id,employee).then((response)=>{
console.log(response.data);
navigator('/employees').catch(error=>console.error(error))
            })
        }else{
            createEmployee(employee).then((response)=>{
                console.log(response.data);
                navigator('/')
    
            }).catch(error=>console.error(error))
        }
         
       }
        
    }
function validateForm(){
    let valid=true;
    const erorrCopy={...errors}
    if(firstname.trim()){
        erorrCopy.firstname=''
}else{erorrCopy.firstname='FirstName is required';
    valid=false;
}
if(lastname.trim()){
    erorrCopy.lastname=''
}else{erorrCopy.lastname='LastName is required';
valid=false;
}
if(email.trim()){
    erorrCopy.email=''
}else{erorrCopy.email='Email is required';
valid=false;
}
setErrors(erorrCopy);
return valid;
}
function pageTitle(){
    if(id){
        return <h2 className='text-center'>Update Employee</h2>
    }
    else{
        return <h2 className='text-center'>Add Employee</h2>
    }
}
    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {pageTitle()}
                    <div className="card-body">
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee FirstName'
                                    name='firstname'
                                    value={firstname}
                                    className={`form-control ${errors.firstname?'is-invalid':''}`}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                                {errors.firstname && 
                                <div className="invalid-feedback">
      {errors.firstname}
    </div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee LastName'
                                    name='lastname'
                                    value={lastname}
                                    className={`form-control ${errors.lastname?'is-invalid':''}`}
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                                {errors.lastname && 
                                <div className="invalid-feedback">
      {errors.lastname}
    </div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Email:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Email'
                                    name='email'
                                    value={email}
                                    className={`form-control ${errors.email?'is-invalid':''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && 
                                <div className="invalid-feedback">
      {errors.email}
    </div>}
                            </div>
                            
                            <button className='btn btn-success' onClick={saveorUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponent;
