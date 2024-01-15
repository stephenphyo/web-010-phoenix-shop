import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = ({url, method = 'GET', headers = null, body = null}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:9000';
    const API = axios.create({
        baseURL: API_URL
    });

  useEffect(() => {
    axios[method](url, JSON.parse(headers), JSON.parse(body))
    .then(res => {
        setData(res.data);
    })
    .catch(err => {
        setError(err);
    })
    .finally(() => {
        setLoading(false);
    })
  }, [url, method, headers, body]);

  return { data, loading, error };
};

export default useAxios;