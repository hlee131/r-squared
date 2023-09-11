import Link from "next/link";
import Breadcrumbs from "./breadcrumbs";

export default function TopBar() {
    return (
        <div className='relative round-border w-9/12 p-3 m-3'>
            <Link href="/">
                <img className="h-20" src="/logo.svg" />
            </Link>
            <p className="mt-1 text-gray-600">Research Reader: seamless discussion and annotation of research papers</p>
            <Breadcrumbs></Breadcrumbs>
        </div>
    )
}