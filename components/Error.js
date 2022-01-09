import { ImGithub } from "react-icons/im";

export default function Error({ message }) {
    return (
        <div className="error">
            <ImGithub fill="whitesmoke" size={70} />
            <span className="oops">Oops! An error occured.</span>
            <span className="message">{message}</span>
        </div>
    );
}