import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { getTopRepos } from "../utils/chart";
import FlipMove from "react-flip-move";

export default function Repos({repos}) {

    const [chosenRepos, setChosenRepos] = useState([]);
    const [by, setBy] = useState("stargazers_count");
    const [display, setDisplay] = useState("8");

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

                <select value={by} onChange={(e) => setBy(e.target.value)} className="select-by" name="select-by" id="select-by">
                    <option value="stargazers_count">stars</option>
                    <option value="forks">forks</option>
                    <option value="size">size</option>
                </select>

                <span className="picker-text">display</span>
                <select value={display} onChange={(e) => updateDisplay(e.target.value)} className="select-by" name="select-by" id="select-by">
                    <option value="4">4</option>
                    <option value="8">8</option>
                    <option value="16">16</option>
                </select>
            </div>

                <FlipMove className="repos-grid">
                {
                    
                    chosenRepos.map((repo, idx) => {
                        console.log(repo)
                        return (
                            <div className="repo" key={repo.name}>
                                {repo.name}
                            </div>
                        )
                    })
                }
                </FlipMove>
        </div>
    );
}