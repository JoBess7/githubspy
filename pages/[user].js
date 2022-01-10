import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Data from "../render/Data";
import GhPolyglot from "gh-polyglot";

export default function User() {

    const router = useRouter();

    const [error, setError] = useState({ active: false, message: "" })
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState({
        limitRate: null,
        userInfo: null,
        polyglot: null,
        repos: null
    });

    const getPolyglotInfo = (user) => {
        return new Promise((resolve, reject) => {
            var userPoly = new GhPolyglot(`${user}/git-stats`);

            userPoly.userStats(function (err, stats) {
                if(err) {
                    setError({active: true, message: ""});
                } else {
                    resolve(stats);
                }
            });
        });
    };

    const getUserInfo = (user) => {
        return fetch(`https://api.github.com/users/${user}`)
            .then(response => {
                if (response.status === 404) return setError({ active: true, message: "" });
                if (response.status === 403) return setError({ active: true, message: "" });

                return response.json();
            })
            .catch(error => {
                setError({ active: true, message: "error in getuserinfo" });
            });
    };

    const getLimitRate = () => {
        return fetch(`https://api.github.com/rate_limit`)
            .then(response => {
                if (response.status === 404) return setError({ active: true, message: "" });
                if (response.status === 403) return setError({ active: true, message: "" });

                return response.json();
            })
            .catch(error => {
                setError({ active: true, message: "error in getlimitrate" });
            });
    };

    const getRepos = (user) => {
        return new Promise((resolve, reject) => {
            var userPoly = new GhPolyglot(`${user}/git-stats`);


             userPoly.getAllRepos(function (err, stats) {
                if(err) {
                    setError({active: true, message: ""});
                } else {
                    resolve(stats);
                }
            });
        });
    };


    useEffect(() => {
        const user = router.query.id;

        if (user) {
            Promise.all([getLimitRate(), getUserInfo(user), getPolyglotInfo(user), getRepos(user)])
                .then((res) => {
                    setData({
                        limitRate: res[0],
                        userInfo: res[1],
                        polyglot: res[2],
                        repos: res[3]
                    });
                }
                )
                .then(() => setLoaded(true))
                .catch(error => {
                    console.log(error)
                });
        }

    }, [router.query.id]);

    const Render = () => {
        if (error.active) {
            return (
                <div>
                    <BackButton />
                    <Error message={error.message} />
                </div>
            );
        } else if (!loaded) {
            return (
                <div>
                    <BackButton />
                    <Loader />
                </div>
            );
        } else {
            return (
                <div>
                    <BackButton />
                    <Data 
                        userInfo={data.userInfo}
                        languages={data.polyglot}
                        repos={data.repos}
                    />
                </div>
            );
        }
    };

    return (
        <Render />
    );
}
