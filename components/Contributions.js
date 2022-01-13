import { useEffect, useState } from "react";
import { getMonthOrder, getParsedDate} from "../utils/date";

export default function Contributions({user}) {

    const colors = ["#ebedf0", "#9be9a8", "#40c463", "#216e39"];
    const [contribs, setContribs] = useState(null);
    const [monthOrder, setMonthOrder] = useState([]);

    function getContributions(user) {
        return fetch(`https://gh-calendar.rschristian.dev/user/${user}`)
        .then((r) => r.json())
        .then((r) => {
            setMonthOrder(getMonthOrder(r));
            setContribs(r);
        })
    };

    useEffect(() => {
        getContributions(user);
    }, []);


    return (
        <div className="contributions">
            {
                contribs && monthOrder
                ?
                
                <div className="contrib-flex">
                    <span className="contrib-title">Contributions in the Last Year</span>
                    <div className="contrib-table">
                        <table>
                            <tbody>
                                <tr className="contrib-top-row">
                                    <td className="contrib-left-column"></td>
                                    <td className="contrib-months">
                                        {
                                            monthOrder.map((month, idx) => {
                                                return (
                                                    <span key={idx} className="contrib-month">{month}</span>
                                                )
                                            })
                                        }
                                    </td>
                                </tr>
                                <tr className="contrib-bottom-row">
                                    <td></td>
                                    <td>
                                        <div className="contrib-display">
                                            {
                                                contribs.contributions.map((contrib, index) => {
                                                    return (
                                                        <div className={"contrib-row row" + index} key={index}>
                                                            {
                                                                contrib.map((day, idx) => {
                                                                    return (
                                                                        <div key={idx} className="contrib-day-container">
                                                                            
                                                                            <div style={{backgroundColor: colors[day.intensity]}} className="contrib-day"/>
                                                                            <div className="contrib-info">
                                                                                <div className="contrib-info-top">
                                                                                    <span className="contrib-info-ins">{
                                                                                        day.count === 0
                                                                                        ?
                                                                                        "No contributions "
                                                                                        :
                                                                                        day.count + " contributions "
                                                                                    }
                                                                                    on
                                                                                    {
                                                                                        " " + getParsedDate(day.date)
                                                                                    }
                                                                                    </span>
                                                                                </div>

                                                                                <div className="contrib-info-triangle"></div>
                                                                            </div>

                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div> 
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                <></>
     
            }
        </div>
    );
}