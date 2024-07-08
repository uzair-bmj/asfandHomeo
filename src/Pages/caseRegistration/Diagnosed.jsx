import React, { useState } from 'react';
import Navbar from '../Navbar';
import Inputs from '../../Components/Inputs';
import Button from '../../Components/Button';
import { useModal } from '../../Hooks/useModal';
import { get, post, put } from '../../api';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Components/Spinner';
import Popup from '../../Components/Popup';

export default function Diagnosed() {
    const [dignosisData, setdignosisData] = useState('');
    const [popupMessage, setPopupMessage] = useState('');
    const [casenumber, setcasenumber] = useState(null)
    const { modal, setmodal, loader, setloader, patientId, setpatientId, complainId, setcomplainId, complain, setcomplain } = useModal();
    const nav = useNavigate();
    const navigation = (path) => {
        nav(path);
        setloader(true);
    };

    const next = async () => {
        const res = await get('/case/getCaseNo')
        console.log(res.data);
        const newCase = res.data.caseNo
        setcasenumber(newCase)

        const caseNoObj = {
            complainId,
            caseNo: newCase
        }
        try {
            const rs = await put('/case/caseNo', caseNoObj)
            console.log(rs.data);
        } catch (error) {
            console.log(error);
        }
        const diagnosedObj = {
            complainId,
            diagnosed: dignosisData
        };
        try {
            const response = await put('/case/diagnosed', diagnosedObj);
            console.log(response);
            if (response) {
                console.log(response.data);
                setcomplain(response.data)
                console.log(complain);
                setcomplainId(response.data.complain._id);
                console.log(complainId);
                setloader(true);
                nav('/case/remedies')
            }
        } catch (error) {
            console.log(error);
            if (error.response.data.message === 'Complain ID is required') {
                setmodal(true);
                setPopupMessage('Complain ID is required');
            } else if (error.response.data.message === 'Complain not found') {
                setmodal(true);
                setPopupMessage('Complain not found');
            } else {
                setmodal(true);
                setPopupMessage('Something went wrong');
            }
        }
    };

    return (
        <>
            {loader ? <Spinner /> :
                <>
                    <div className='sm:flex h-auto py-20 sm:py-24 bg-gray-200'>
                        <Navbar />
                        <div className='flex flex-col gap-y-5 justify-center sm:justify-between items-center w-[90vw] sm:w-[70vw] md:w-[70vw] lg:w-[60vw] md:ms-64 sm:ms-48 lg:ms-80 ms-5 xl:ms-[450px] bg-white mt-10 sm:mt-10 py-5 rounded-xl shadow-xl px-5'>
                            <div className='flex items-center'>
                                <img src="/history.png" alt="" className='w-24 h-24' />
                                <h1 className='text-3xl font-bold text-[rgb(22,57,90)]'>Diagnosed</h1>
                            </div>
                            <div className='flex flex-col justify-between w-full sm:px-10 gap-y-5'>
                                <textarea name="" id="" cols={50} rows={5} className='rounded-xl border-2 border-solid border-[rgb(22,57,90)] focus:border-[rgb(22,57,90)] px-5 py-5' value={dignosisData} onChange={(e) => setdignosisData(e.target.value
                                )}></textarea>
                            </div>
                            <div className='flex justify-center gap-x-5'>
                                <Button name="Skip" class="rounded-lg hover:transform-none mt-5 w-full" click={() => navigation('/case/remedies')} />
                                <Button name="Next" class="rounded-lg hover:transform-none mt-5 w-full" click={next} />
                            </div>
                        </div>
                    </div>
                    {modal && popupMessage && <Popup text={popupMessage} />}
                </>
            }
        </>
    );
}