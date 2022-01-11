import { useEffect, useState } from "react";

export default function Contributions({user}) {

    const [contribs, setContribs] = useState(null);
    const [cYear, setCYear] = useState(2021);

    const getContributions = (user, cYear) => {
        return fetch(`https://skyline.github.com/${user}/${cYear}.json`)
            .then(response => {
                if (response.status === 404) return setError({ active: true, message: "" });
                if (response.status === 403) return setError({ active: true, message: "" });

                return response.json();
            })
            .catch(error => {
                setError({ active: true, message: "" });
            });
    };

    useEffect(() => {
        getContributions(user, cYear)
        .then((res) => {
            setContribs(res);
            console.log(res);
        });
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