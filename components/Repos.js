import { useEffect, useState } from "react";
import { getTopRepos } from "../utils/chart";
import FlipMove from "react-flip-move";
import {BsJournalBookmark} from "react-icons/bs";
import {AiOutlineFork, AiFillStar} from "react-icons/ai";
import { langColors } from "../utils/langColors";
import { getSize } from "../utils/formatting";

export default function Repos({repos}) {

    const [chosenRepos, setChosenRepos] = useState([]);
    const [by, setBy] = useState("stargazers_count");
    const [display, setDisplay] = useState("8");
    console.log(chosenRepos)
    useEffect(() => {
        setChosenRepos(getTopRepos(repos, parseInt(display), by));
    }, [by, display]);

    const updateDisplay = (val) => {
        if(val === "all") {
            setDisplay(repos.length);
        } else setDisplay(val);
    }

    return (
        <div className="repos">
            <div className="repos-picker">
                <span className="repos-title">Top Repos</span>

                <span className="picker-text">by</span>
                <select value={by} onChange={(e) => setBy(e.target.value)} className="s-by select-by" name="select-by" id="select-by">
                    <option value="stargazers_count">stars</option>
                    <option value="forks">forks</option>
                    <option value="size">size</option>
                </select>

                <span className="display picker-text">display</span>
                <select value={display} onChange={(e) => updateDisplay(e.target.value)} className="s-display select-by" name="select-by" id="select-by">
                    <option value="4">4</option>
                    <option value="8">8</option>
                    <option value="16">16</option>
                </select>
            </div>

   
                {
                    chosenRepos.map((repo, idx) => {
                        return (
                            <div className="repo" key={repo.name}>
                                <a className="repo-linker" href={repo.html_url}>
                                    <div className="repo-pad">
                                        <div className="title-flex">
                                            <BsJournalBookmark className="repo-icon" size={13} fill="black"/>
                                            <span>{repo.name}</span>
                                        </div>
                                        <div className="repo-desc">
                                            <span>
                                                {repo.description}
                                            </span>
                                        </div>
                                        <div className="repo-info">
                                            <div className="repo-info-1">
                                                {
                                                    repo.language &&
                                                    <>
                                                        <div style={{backgroundColor: langColors.hasOwnProperty(repo.language) ? langColors[repo.language] : "rgba(150,195,100,1)"}} className="language-color"></div>
                                                        <div className="language pd">{repo.language}</div>
                                                    </>
                                                }
                                                
                                                <AiFillStar size={15} color="rgb(120, 120, 120)"/>
                                                <span className="pd">{repo.stargazers_count}</span>
                                                <AiOutlineFork size={16} color="rgb(100, 100, 100)"/>
                                                <span>{repo.forks}</span>
                                            </div>

                                            <div className="repo-info-2">
                                                {getSize(repo.size)}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        )
                    })
                }

        </div>
    );
}