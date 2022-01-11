import { useEffect, useState } from "react";
import { getGithubContributions } from 'github-contributions-counter';

export default function Contributions({user}) {

    const [contribs, setContribs] = useState(null);
    const [cYear, setCYear] = useState(2021);

    const getContributions = (user, cYear) => {
        getGithubContributions({
            username: 'job',
            token: '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' // secret
          }).then((r) => {
            setContribs(r);
          })
    };

    useEffect(() => {
        getContributions(user, cYear);
    }, [cYear]);

    return (
        <div className="contributions">
            {
                contribs ?
                <div className="lo">loaded</div>
                :
                <div className="dd">not loaded</div>
            }
        </div>
    );
}