import { useEffect, useState } from "react";
import { getGithubContributions } from 'github-contributions-counter';
import { token } from "./secret/env";
import SimpleLoader from "./SimpleLoader";
import { getMonthOrder, getParsedDate} from "../utils/date";
import { createTokenAuth } from "@octokit/auth-token";
import { request } from '@octokit/request';

export default function Contributions({user}) {

    const [contribs, setContribs] = useState(null);
    const [monthOrder, setMonthOrder] = useState(null);

    async function getContributions(user) {
        const headers = {
            'Authorization': `bearer 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`,
        }
        const body = {
            "query": `query {
                user(login: "${user}") {
                  name
                  contributionsCollection {
                    contributionCalendar {
                      colors
                      totalContributions
                      weeks {
                        contributionDays {
                          color
                          contributionCount
                          date
                          weekday
                        }
                        firstDay
                      }
                    }
                  }
                }
              }`
        }
        const response = await fetch('https://api.github.com/graphql', { method: 'POST', body: JSON.stringify(body), headers: headers })
        const data = await response.json()
        console.log(data);
        return data
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
                                                contribs.weeks.map((contrib, index) => {
                                                    return (
                                                        <div className={"contrib-row row" + index} key={index}>
                                                            {
                                                                contrib.contributionDays.map((day, idx) => {
                                                                    return (
                                                                        <div key={idx} className="contrib-day-container">
                                                                            
                                                                            <div style={{backgroundColor: day.contributionCount === 0 ? "rgba(0, 0, 0, 0.05)" : day.color}} className="contrib-day"/>
                                                                            <div className="contrib-info">
                                                                                <div className="contrib-info-top">
                                                                                    <span className="contrib-info-ins">{
                                                                                        day.contributionCount === 0
                                                                                        ?
                                                                                        "No contributions "
                                                                                        :
                                                                                        day.contributionCount + " contributions "
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