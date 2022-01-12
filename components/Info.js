import { BiBuildings } from "react-icons/bi";
import { MdLocationOn, MdEmail } from "react-icons/md";
import {BsCalendarEvent} from "react-icons/bs";
import {getDate} from "../utils/date.js";

export default function Info({ company, location, email, following, followers, repoCount, date }) {

    const infosTop = [
        {
            info: company,
            icon: BiBuildings,
            padding: "3px"
        },
        {
            info: location,
            icon: MdLocationOn,
            padding: "3px"
        },
        {
            info: email,
            icon: MdEmail,
            padding: "3px"
        },
        {
            info: getDate(date),
            icon: BsCalendarEvent,
            padding: "6px"
        }
    ];

    const infosBottom = [
        {
            info: repoCount,
            what: "repositories",
        },
        {
            info: following,
            what: "following",
        },
        {
            info: followers,
            what: "followers",
        }
    ];

    return (
        <div className="info">

            <div className="info-top">
                {
                    infosTop.map((elem, index) => {
                        if (elem.info) {
                            return (
                                <div key={index} className="info-sub-flex">
                                    <elem.icon style={{paddingRight: elem.padding}} fill="rgb(140, 140, 140)" size={17} />
                                    <span className="info-text">{elem.info}</span>
                                </div>
                            );
                        } else return <div key={index}></div>
                    })
                }
            </div>

            <div className="info-bottom">
                {
                    infosBottom.map((elem, index) => {
                        return (
                            <div key={index} className="info-bubble-flex">
                                <span className="info-bubble">{elem.info}</span>
                                <span className="info-bubble-what">{elem.what}</span>
                            </div>
                        );
                    })
                }
            </div>



        </div>
    );
}