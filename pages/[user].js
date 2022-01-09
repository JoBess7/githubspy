import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Data from "../render/Data";

export default function User() {

    const router = useRouter();

    const [error, setError] = useState({ active: false, message: "" })
    const [loaded, setLoaded] = useState(false);

    const [userInfo, setUserInfo] = useState(null);
    const [limitRate, setLimitRate] = useState(null);


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
    }

    useEffect(() => {
        const user = router.query.id;

        if (user) {
            Promise.all([getLimitRate(), getUserInfo(user)])
                .then((res) => {
                    console.log(res[0]);
                    setUserInfo(res[1]);
                    setLimitRate({
                        remaining: res[0].rate.remaining,
                        limit: res[0].rate.remaining
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
                    <Data userInfo={userInfo} />
                </div>
            );
        }
    };

    return (
        <Render />
    );
}
