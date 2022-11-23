import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom";

const useLoadData = (url) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        setError(null);
        setData(null);
        setLoading(true);
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response);
                }
            })
            .then((data) => {
                setData(data);
                setError(null);
                setLoading(false);
            })
            .catch(async (error) => {
                setError(await error.json());
                setLoading(false);
            });
    }, [url]);

    return { data, loading, error };
};

const App = () => {
    const [number, setNumber] = useState(1);
    const { data, loading, error } = useLoadData(
        `https://rickandmortyapi.com/api/character/${number}`
    );

    return (
        <div>
            <h1>Rick and Morty character</h1>
            <div style={{ display: "flex", gap: 8 }}>
                <label>Select ID of character</label>
                <input value={number} onChange={(e) => setNumber(e.target.value)} />
            </div>
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: "red" }}>{error.error}</div>}
            {data && !error && (
                <div>
                    <h2>
                        {data.name} - {data.status}
                    </h2>
                    <img src={data.image} alt={data.name} width={400} height={400} />
                </div>
            )}
        </div>
    );
};

createRoot(document.getElementById("root")).render(<App />);
