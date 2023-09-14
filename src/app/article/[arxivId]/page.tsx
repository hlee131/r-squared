import { EditorProps } from "draft-js"
import dynamic from "next/dynamic"

const WYSIWYG = dynamic<EditorProps>(() => import('../../components/wysiwyg'),
    { ssr: false })

export default function Page() {

    return (<div className="w-9/12 h-full flex flex-row m-1">
        {/* actual paper */}
        <div className="w-1/2 h-full m-1">

        </div>

        {/* comments and tools */}
        <div className="w-1/2 h-full round-border m-1">
            {/* comment editor */}
            <WYSIWYG />
        </div>
    </div>)
}