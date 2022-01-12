import Info from "../components/Info";
import Charts from "../components/Charts";
import Repos from "../components/Repos";
import Contributions from "../components/Contributions";

export default function Data({user, userInfo, languages, repos }) {

    const {
        public_repos,
        created_at,
        avatar_url,
        following,
        followers,
        location,
        html_url,
        company,
        login,
        email,
        name

    } = userInfo;

    return (
        <div className="data">

            <div className="avatar-container">
                <img className="avatar" src={avatar_url} alt="" />
            </div>

            <span className="name">{name}</span>

            <a className="login" href={html_url}>
                @{login}
            </a>

            <Info
                company={company}
                location={location}
                email={email}
                repoCount={public_repos}
                following={following}
                followers={followers}
                date={created_at}
            />

            <Charts        
                languages={languages}
                repos={repos}
            />

            <Contributions
                user={user}
            />

            <Repos        
                repos={repos}
            />

        </div>
    );
}