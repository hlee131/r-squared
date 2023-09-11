'use client'

import { useState } from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../types/supabase';

export default function AuthModal({ closeModal }: { closeModal: () => void }) {
    const [currentPage, setCurrentPage] = useState('Login');

    return (
        <div className="relative flex flex-row space-between round-border bg-white w-1/3 p-3" >

            {/* form */}
            < div className="w-1/2 flex flex-col items-center justify-center" >
                <div className="flex flex-row w-full">
                    <button className={`round-border p-1 m-1 w-1/2 text-center ${currentPage == 'Login' ? 'selected' : ''}`}
                        onClick={() => setCurrentPage('Login')}>Login</button>
                    <button className={`round-border p-1 m-1 w-1/2 text-center ${currentPage == 'Login' ? '' : 'selected'}`}
                        onClick={() => setCurrentPage('Register')}>Register</button>
                </div>
                <h1 className="text-2xl m-3 text-center">{currentPage == 'Login' ? 'Welcome back!' : 'Welcome to R ^ 2!'}</h1>
                <form className="flex flex-col items-center" action={`/auth/${currentPage.toLowerCase()}`} method='post'>
                    <input className="round-border m-1 p-2" name='email' type='email' placeholder='Email'></input>
                    {currentPage == 'Login' ? '' : <input className="round-border m-1 p-2" name='username' type='text' placeholder='Username'></input>}
                    <input className="round-border m-1 p-2" name='password' type='password' placeholder='Password'></input>
                    <button type='submit' className='round-border p-1 m-2 w-1/3 text-center'>{currentPage}!</button>
                </form>
            </div >

            {/* logo */}
            < div className="w-1/2 flex items-center justify-center" >
                <img className="h-4/5" src='/logo.svg' />
            </div >

            {/* close button */}
            < p onClick={closeModal} className="cursor-pointer absolute top-0 right-0 m-3" > X</p >
        </div >
    )
}