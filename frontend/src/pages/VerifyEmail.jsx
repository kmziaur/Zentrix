import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const VerifyEmail = () => {

    const {token} = useParams()
    const [status,setStatus] = useState("Verifying....")
    const navigate = useNavigate()

    const verifyEmail = async()=>{
        try {
            const res = await axios.post('http://localhost:8000/api/v1/user/verify',{},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            if(res.data.success){
                setStatus('✅ Email Verified Successfully')
                setTimeout(()=>{
                    navigate('/login')

                },2000);
            }

            
        } catch (error) {
            console.log(error)
            setStatus("❎ Verification failed. Please try again")
            
        }

    }

    useEffect(()=>{
        verifyEmail()
    },[token])

  return (
    <div className='relative w-full h-190 overflow-hidden'>
        <div className='min-h-screen flex items-center justify-center bg-pink-100 px-4'>
            <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center'>
                <h2 className='text-xl font-semibold text-gray-800 mb-4'>{status}</h2>
            </div>
        </div>
    </div>
  )
}

export default VerifyEmail