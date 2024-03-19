import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Line from './line'
import { useRouter } from 'next/navigation'

export default function Header() {
    const router = useRouter()

    return (
            <div className="flex flex-col">
                <div className="flex flex-row py-2 px-10 justify-between">
                    <h1 className="text-4xl py-2">Comm<span className="text-olive">UNI</span>cate</h1>
                    <button className='text-4xl pt-2' onClick={() => router.push('/profile')}>
                        <FontAwesomeIcon icon={faUser} />
                    </button>
                </div>
                <Line />
            </div>
    );

};