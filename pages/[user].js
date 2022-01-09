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

  const [loaded1, setLoaded1] = useState(false);
  const [loaded2, setLoaded2] = useState(false);
  const [loaded3, setLoaded3] = useState(false);
  const [loaded4, setLoaded4] = useState(false);

  function getUserInfo(user) {
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

          setLoaded1(true);
      })
      .catch(error => {
          setError({active: true, message: "error in getuserinfo"});
      });
  }

  function getLimitRate() {
      fetch(`https://api.github.com/rate_limit`)
      .then(response => {
          if(response.status === 404) return setError({active: true, message: ""});
          if(response.status === 403) return setError({active: true, message: ""});
          
          return response.json();
      })
      .then(json => {
          console.log("limit rate ok");
          setData({
            graph: data.graph,
            limitRate: {
                remaining: json.rate.remaining,
                limit: json.rate.limit
            }
          });

          setLoaded2(true);
      })
      .catch(error => {
          setError({active: true, message: "error in getlimitrate"});
      });
  }

  useEffect(() => {
    const user = router.query.id;

    if(user) {
        getUserInfo(user);
        getLimitRate();
    }
  }, [router.query.id]);

  const Render = () => {
    if (error.active) {
      return (
        <div>
          <BackButton/>
          <Error message={error.message}/>
        </div>
      );
    } else if (!loaded1 || !loaded2) {
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
