import { BiBuildings } from "react-icons/bi";
import { MdLocationOn, MdEmail } from "react-icons/md";

export default function Info({ company, location, email }) {

    const infosTop = [
        {
            info: company,
            icon: BiBuildings
        },
        {
            info: location,
            icon: MdLocationOn
        },
        {
            info: email,
            icon: MdEmail
        }
    ];

    return (
        <div className="info">

            <div className="info-top">
                {
                    infosTop.map((elem) => {
                        if (elem.info) {
                            return (
                                <div className="info-sub-flex">
                                    <elem.icon fill="rgb(140, 140, 140)" size={17} />
                                    <span className="info-text">{elem.info}</span>
                                </div>
                            );
                        } else return <></>
                    })
                }
            </div>



        </div>
    );
}