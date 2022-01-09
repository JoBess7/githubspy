import { TiArrowLeftThick } from "react-icons/ti";
import Router from "next/router";

export default function BackButton() {

    const redirect = () => {
        Router.push("/");
    };

    return (
        <div className="back-button" onClick={() => redirect()}>
            <TiArrowLeftThick className="back-button-icon" size={15} />
            <div className="back-back">Back</div>
        </div>
    );
}