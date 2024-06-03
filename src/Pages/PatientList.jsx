import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Button from '../Components/Button';
import Inputs from '../Components/Inputs';
import axios from 'axios';

export default function PatientList() {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        axios.get('/api/patient/list').then((res) => {
            console.log(res.data.data);
            setPatients(res.data.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <>
            <div className='sm:flex justify-center items-center h-screen'>
                <div>
                    <Navbar />
                </div>
                <div className=''>
                    <div className='md:w-[70vw] w-[95vw] ms-[10px] sm:w-[70vw] xl:w-[60vw] sm:ms-[180px] md:ms-[220px] lg:ms-[330px] flex flex-col gap-y-5'>
                        <div className=''>
                            <h1 className='text-2xl font-bold text-[rgb(22,57,90)] mt-2 text-center'>My Patients</h1>
                        </div>
                        <div className='bg-white rounded-xl shadow-xl  py-10 flex flex-col '>
                            <div className='px-5 flex justify-between items-center'>
                                <Inputs class="border-2 border-solid border-gray-400 rounded-lg hover:shadow-none sm:px-4 px-2 sm:w-full w-[150px] sm:text-md text-sm" placeholder="Search Patient" type="search" />
                                <Button name="Add Patient" class="hover:scale-none rounded-lg hover:transform-none hover:border-2 hover:border-solid px-2 sm:px-4 hover:border-[rgba(252,165,23,255)]" />
                            </div>
                            <div>
                                <div className=' flex justify-between w-full relative bg-[rgb(22,57,90)] text-white px-10 py-5 mt-5'>
                                    <h1 className=' text-sm xl:text-md'>Name</h1>
                                    <h1 className='absolute hidden md:block md:left-36 lg:left-40 text-sm xl:text-md'>Age</h1>
                                    <h1 className=' absolute hidden md:block md:left-52 lg:left-64 text-sm xl:text-md'>Gender</h1>
                                    <h1 className='absolute md:left-72 left-32 sm:left-40 lg:left-96 text-sm xl:text-md'>Contact</h1>
                                    <h1 className='absolute md:left-96 sm:left-64 left-56 lg:left-[500px] text-sm xl:text-md'>Total Cases</h1>
                                </div>
                            </div>
                            <div className=' flex flex-col '>
                                {
                                    patients && patients.map((items, index) => (
                                        <div key={index} className='flex justify-between items-center odd:bg-gray-300 px-10 py-3 relative'>
                                            <div className='flex flex-col'>
                                                <h1 className='font-medium text-sm xl:text-md'>{items.fullname}</h1>
                                                <h1 className='md:hidden block'>{items.age}</h1>
                                            </div>
                                            <h1 className='absolute md:left-36 hidden md:block lg:left-40 text-sm xl:text-md'>{items.age}</h1>
                                            <h1 className='md:block hidden absolute md:left-52 lg:left-64 text-sm xl:text-md'>{items.gender}</h1>
                                            <h1 className=' absolute md:left-72 left-28 sm:left-36 lg:left-96 text-sm xl:text-md'>{`0${items.contact}`}</h1>
                                            <h1 className='absolute md:left-[400px] left-64 sm:left-72 lg:left-[530px] md:text-sm xl:text-md'>{items.totalCases || 0}</h1>
                                            {/* <Button name="New Case" class="rounded-lg px-2 py-1 text-sm" /> */}
                                            <Button name="Remove patient" class="hidden sm:block rounded-lg px-2 py-1 text-[12px] bg-red-600 hover:bg-red-400 hover:text-red-600  hover:border-red-600 hover:border-2 hover:border-solid hover:transform-none" />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
