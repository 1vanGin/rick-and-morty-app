import { useEffect, useState } from "react";
import axios from "axios";

export function useFetch(url, { pageNumber, id }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: `${url}${id ? `/${id}` : ""}`,
      params: {
        page: pageNumber,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        if (id) {
          setData(response.data);
        } else {
          setData((prevState) => {
            return [...new Set([...prevState, ...response.data.results])];
          });
          setHasMore(response.data.info.next !== null);
        }
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          return;
        }
        setError(true);
        setLoading(false);
        console.error(e);
      });

    return () => cancel();
  }, [url, pageNumber, id]);

  return {
    loading,
    error,
    data,
    hasMore,
  };
}
