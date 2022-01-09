import Info from "../components/Info";

export default function Data({ userInfo }) {

    const {
        public_repos,
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
            />

        </div>
    );
}