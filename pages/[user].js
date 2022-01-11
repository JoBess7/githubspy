import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Data from "../render/Data";
import Footer from "../components/Footer";
import GhPolyglot from "gh-polyglot";

export default function User() {

    const router = useRouter();

    const [user, setUser] = useState(router.query.id);
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
                    setError({active: true, message: "Are you sure this user exists?"});
                } else {
                    resolve(stats);
                }
            });
        });
    };

    const getUserInfo = (user) => {
        return fetch(`https://api.github.com/users/${user}`)
            .then(response => {
                if (response.status === 404) return setError({ active: true, message: "Are you sure this user exists? top" });
                if (response.status === 403) return setError({ active: true, message: "Limit rate exceeded, try again later." });

                return response.json();
            })
            .catch(error => {
                setError({ active: true, message: "Are you sure this user exists?"});
            });
    };

    const getLimitRate = () => {
        return fetch(`https://api.github.com/rate_limit`)
            .then(response => {
                if (response.status === 404) return setError({ active: true, message: "Limit rate exceeded, try again later." });
                if (response.status === 403) return setError({ active: true, message: "Limit rate exceeded, try again later." });

                return response.json();
            })
            .catch(error => {
                setError({ active: true, message: "Honestly don't know what happened there..." });
            });
    };

    const getRepos = (user) => {
        return new Promise((resolve, reject) => {
            var userPoly = new GhPolyglot(`${user}/git-stats`);

             userPoly.getAllRepos(function (err, stats) {
                if(err) {
                    if(err.includes("limit")) {
                        setError({active: true, message: "Limit rate exceeded, try again later."});
                    }
                } else {
                    resolve(stats);
                }
            });
        });
    };

    useEffect(() => {

        if (user) {
            Promise.all([getLimitRate(), getUserInfo(user), getPolyglotInfo(user), getRepos(user)])
                .then((res) => {
                    setData({
                        limitRate: res[0],
                        userInfo: res[1],
                        polyglot: res[2],
                        repos: res[3],
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
                <div style={{marginBottom: "100px"}}>
                    <BackButton />
                    <Data 
                        userInfo={data.userInfo}
                        languages={data.polyglot}
                        repos={data.repos}
                        user={user}
                    />
                    <Footer/>
                </div>
            );
        }
    };

    return (
        <Render />
    );
}
