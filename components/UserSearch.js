import { useState } from "react";
import {TiArrowRightThick} from "react-icons/ti";

export default function UserSearch({submit}) {

    const [value, setValue] = useState("");

    return (
        <div className="user-search">
            <input
                value={value}
                placeholder="" 
                type="text" 
                className="input"
                name="user"
                autoFocus
                onChange={(e) => setValue(e.target.value)}
                onKeyPress={(e) => {if((e.key) === "Enter") submit(value)}}
            />
            <div onClick={() => submit(value)} className="go-button">
                <TiArrowRightThick className="arrow" color="black" size={26}/>
            </div>
        </div>
    );
}