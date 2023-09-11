'use client'

import { Fragment, useContext, useState } from "react"
import AuthModal from "./auth-modal";
import { UserDataContext } from "../providers";


export default function SideBar() {
    const [showAuth, setShowAuth] = useState(false);
    const { userData } = useContext(UserDataContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        isOpen ?
            <div className="z-10 flex items-center justify-center w-screen h-screen absolute top-0 left-0"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>

                <div className="absolute left-0 bg-white text-center border border-solid border-black w-3/12 h-screen">
                    <p onClick={() => setIsOpen(false)} className="text-xl cursor-pointer absolute top-0 right-0 m-3">X</p>

                    {/* friends */}
                    <h1 className="text-2xl">Following</h1>
                    {userData?.following_users.length ? '' :
                        <Fragment>
                            <p>You currently aren't following anyone.</p>
                            <p>To follow someone, click on their username.</p>
                        </Fragment>
                    }

                    {/* filter by arxiv tags */}
                    <h1 className="text-2xl">Arxiv Tags</h1>
                    {userData?.following_tags.length ? '' :
                        <Fragment>
                            <p>You currently aren't following any tags.</p>
                            <p>To follow a tag, click on the tag.</p>
                        </Fragment>
                    }


                    {/* Auth buttons */}
                    <form action='/auth/logout' method='post' className="absolute bottom-0 left-0 w-full">
                        {userData ?
                            <button type='submit' className="m-3 round-border p-2">Sign out</button> :
                            <button onClick={(e) => { e.preventDefault(); setShowAuth(true) }}
                                className="m-3 round-border p-2">Login / Register</button>
                        }
                    </form>
                </div>
                {showAuth ? <AuthModal closeModal={() => setShowAuth(false)}></AuthModal> : ''}
            </div> :
            <button className="z-10 text-5xl absolute m-3"
                onClick={() => setIsOpen(true)}>+</button>
    )
}