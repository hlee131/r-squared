'use client'

import React, { createContext, useEffect, useState } from "react";
import { Database } from "../../types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Message, MessageType } from "./components/message";

export type UserType = Database['public']['Tables']['profiles']['Row'];

export type MessagesContextType = {
    messages: Message[],
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

export type UserDataContextType = {
    userData: UserType | null,
    // setUserData: React.Dispatch<React.SetStateAction<UserType>>
    updateUserData: () => void
}

export const UserDataContext = createContext<UserDataContextType>({
    userData: null, /* setUserData: (_) => { }, */ updateUserData: () => { }
});
export const MessageContext = createContext<MessagesContextType>({
    messages: [], setMessages: (_) => { }
});

export default function Providers({ children }: {
    children: React.ReactNode
}) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userData, setUserData] = useState<UserType | null>(null);
    const supabase = createClientComponentClient<Database>();

    const updateUserData = () => {
        supabase.auth.getUser()
            .then(({ data }) => data.user)
            .then(user => user ? supabase.from('profiles').select('*').eq('id', user.id) : null)
            .then(res => res?.data?.at(0) || null)
            .then(user => setUserData(user));
    }

    // set up user data provider
    useEffect(updateUserData, []);

    // set up messages provider
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (params.size == 2) {
            let urlMessage = {
                message: params.get('message') || '',
                type: MessageType[(params.get('type')?.toUpperCase() || 'MESSAGE') as keyof typeof MessageType]
            };
            setMessages([urlMessage]);
        }

    }, [])

    return (
        <UserDataContext.Provider value={{ userData, /* setUserData, */ updateUserData }}>
            <MessageContext.Provider value={{ messages, setMessages }}>
                {children}
            </MessageContext.Provider>
        </UserDataContext.Provider>
    )
}