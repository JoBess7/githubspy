import { ImGithub } from "react-icons/im";
import { FiGithub } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import UserSearch from "../components/UserSearch";
import Router from "next/router";

export default function Home() {

    const submitUser = (user) => {
        if (user !== "") {
            redirect(user);
        }
    };

    const redirect = (user) => {
        Router.push(`/user?id=${user}`);
    };

    const [ref, inView] = useInView({
        threshold: 0
    });

    return (
        <div className="home">
            <div ref={ref} className={`home-flex ${inView ? "" : "home-flex-hidden"}`}>
                <ImGithub size={85} fill="whitesmoke" />
                <span className="find-profile">Spy a Profile</span>
                <UserSearch submit={submitUser} />
            </div>

            <div className="built-info">
                <div className="built-info-flex">

                    <span>Built by Jonathan Bessette</span>

                    <div className="built-icons">
                        <a href="https://github.com/JoBess7/githubspy">
                            <FiGithub className="gh-icon" size={23} />
                        </a>
                    </div>

                </div>
            </div>
        </div>
    )
}
