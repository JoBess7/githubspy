export default function Data({userInfo}) {
    console.log(userInfo)
    const avatarURL = userInfo.avatar_url;
    const name = userInfo.name;
    const login = userInfo.login;
    const githubURL = userInfo.html_url;

    return (
        <div className="data">

            <div className="avatar-container">
                <img className="avatar" src={avatarURL} alt=""/> 
            </div>

            <span className="name">{name}</span>

            <a className="login" href={githubURL}>
                @{login}
            </a>


        </div>
    );
}