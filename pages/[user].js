import {useRouter} from "next/router";
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Data from "../render/Data";

export default function User() {

  const router = useRouter();
  const [error, setError] = useState({active: false, message: ""})
  const [data, setData] = useState({
    graph: null,
    limitRate: {remaining: null, limit: null},
  });

  const [loaded, setLoaded] = useState(false);

  const getUserInfo = (user) => {
      fetch(`https://api.github.com/users/${user}`)
      .then(response => {
          if(response.status === 404) return setError({active: true, message: ""});
          if(response.status === 403) return setError({active: true, message: ""});
          
          return response.json();
      })
      .then(json => {
          setData({
            graph: json,
            limitRate: {
                remaining: data.limitRate.remaining,
                limit: data.limitRate.limit
            }
          });
      })
      .catch(error => {
          setError({active: true, message: "error in getuserinfo"});
      });
  };

  const getLimitRate = () => {
      fetch(`https://api.github.com/rate_limit`)
      .then(response => {
          if(response.status === 404) return setError({active: true, message: ""});
          if(response.status === 403) return setError({active: true, message: ""});
          
          return response.json();
      })
      .then(json => {
          setData({
            graph: data.graph,
            limitRate: {
                remaining: json.rate.remaining,
                limit: json.rate.limit
            }
          });
      })
      .catch(error => {
          setError({active: true, message: "error in getlimitrate"});
      });
  };

  useEffect(() => {
    const user = router.query.id;

    if(user) {
        Promise.all([getLimitRate(), getUserInfo(user)])
        .then(
          setLoaded(true)
        )
        .catch(error => {
          console.log(error)
        });
    }
  }, [router.query.id]);

  const Render = () => {
    console.log("loaded: " + loaded);
    console.log("data: " + data.graph);
    if (error.active) {
      return (
        <div>
          <BackButton/>
          <Error message={error.message}/>
        </div>
      );
    } else if (!loaded) {
      return (
        <div>
          <BackButton/>
          <Loader/>
        </div>
      );
    } else {
      return (
        <div>
          <BackButton/>
          <Data userInfo={data.graph}/>
        </div>
      );
    }
  };

  return (
    <Render/>
  );
}
