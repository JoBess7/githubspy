import { useEffect, useState } from "react";
import { getMonthOrder, getParsedDate} from "../utils/date";

export default function Contributions({user}) {

    const colors = ["#e3e3e3", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
    const [contribs, setContribs] = useState(null);
    const [monthOrder, setMonthOrder] = useState(null);

    const getContributionString = (count) => {
        if(count === 0) return "No contributions ";
        else if(count === 1) return count + " contribution ";
        else return count + " contributions ";
    }
 
    function getContributions(user) {
        return fetch(`https://gh-calendar.rschristian.dev/user/${user}`)
        .then((r) => r.json())
        .then((r) => {
            setContribs(r);

            if(!("message" in r)) 
                setMonthOrder(getMonthOrder(r));

        })
        .catch((err) => {
            // do nothing
        });

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
                                    <td className="contrib-left-b">
                                        <span className="mon">Mon</span>
                                        <span className="wed">Wed</span>
                                        <span className="fri">Fri</span>
                                    </td>
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
                                                                                    <span className="contrib-info-ins">
                                                                                        {
                                                                                            getContributionString(day.count)
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
                    <div className="contrib-gen-flex">
                        <div className="contrib-gen-info">
                            {contribs.total} contributions in the last year
                        </div>

                        <div className="less-more-flex">
                            <span>Less</span>
                            <div style={{backgroundColor: colors[0]}} className="less-more-square"/>
                            <div style={{backgroundColor: colors[1]}} className="less-more-square"/>   
                            <div style={{backgroundColor: colors[2]}} className="less-more-square"/>  
                            <div style={{backgroundColor: colors[3]}} className="less-more-square"/>  
                            <div style={{backgroundColor: colors[4]}} className="less-more-square"/>                      
                            <span>More</span>
                        </div>
                    </div>
                </div>
                :
                <></>
     
            }
        </div>
    );
}