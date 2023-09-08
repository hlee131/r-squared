'use client'

import { useEffect, useState } from "react";

export default function Message() {

    const [color, setColor] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        setShowMessage(params.size == 2);
        setColor(params.get('type') != 'message' ? (
            params.get('type') == 'success' ?
                'bg-green-400' : 'bg-red-400'
        ) : '');
        setMsg(params.get('message') || '');
    }, [])

    return showMessage ?
        <div onClick={(e) => e.currentTarget.style.display = 'none'}
            className={`bg-white z-10 cursor-pointer p-3 w-1/5 round-border fixed w-fit bottom-0 right-0 m-5 ${color}`}>
            <p className='text-lg'>
                {msg}</p>
            <p className="text-gray-600">(Click to dismiss)</p>
        </div> : ''
} 