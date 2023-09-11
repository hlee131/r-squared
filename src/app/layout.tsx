import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SideBar from './components/side-bar'
import Message from './components/message'
import TopBar from './components/top-bar'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'R ^ 2',
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
            <body className={`${inter.className} flex flex-row relative`}>
                <Providers>
                    <SideBar></SideBar>
                    <Message></Message>
                    <div className="flex flex-col items-center w-screen h-screen">
                        <TopBar></TopBar>
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    )
}
