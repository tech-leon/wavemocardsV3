import React, { useState, useEffect } from "react";
import axios from "axios";

function Connect({ URL, children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get(URL, {
          cancelToken: source.token
        });
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          // console.log('Request canceled:', error.message);
        } else {
          setError(error.response?.data?.message || error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      source.cancel('Component unmounted');
    };
  }, [URL]);  // 將 URL 加入依賴項數組

  if (loading) return <div>載入中...</div>;
  if (error) return <div>錯誤：{error}</div>;
  return children(data);
}

export default Connect;