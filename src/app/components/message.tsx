'use client'

import React, { useContext } from "react";
import { MessageContext } from "../providers";

export enum MessageType {
    SUCCESS = 'SUCCESS', ERROR = 'ERROR', MESSAGE = 'MESSAGE'
}
export type Message = { type: MessageType, message: string }


export default function Message() {

    const { messages, setMessages } = useContext(MessageContext);

    const colors: { [type in MessageType]: string } = {
        SUCCESS: 'bg-green-500',
        ERROR: 'bg-red-500',
        MESSAGE: 'bg-white'
    }

    const onClick = (msg: Message) => {
        setMessages(prev => prev.filter((m: Message) => {
            return m.message != msg.message
        }))
    }

    return (
        <div className="z-10 w-1/5 fixed bottom-0 right-0 m-5">
            {messages.length > 0 ?
                messages.map((msg) =>
                    <div onClick={() => onClick(msg)}
                        className={`m-3 cursor-pointer p-3 w-full round-border ${colors[msg.type]}`}>
                        <p className='text-lg'>
                            {msg.message}</p>
                        <p className="text-gray-600">(Click to dismiss)</p>
                    </div>) : ''}
        </div>
    )

} 