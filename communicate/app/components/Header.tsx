import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Line from './line'

export default function Header() {

    return (
            <div className="flex flex-col">
                <div className="flex flex-row py-2 px-10 justify-between">
                    <h1 className="text-4xl py-2">Comm<span className="text-olive">UNI</span>cate</h1>
                    <div className='text-4xl pt-2'>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                </div>
                <Line />
            </div>
    );

};