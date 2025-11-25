import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

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
    const [selectedBreed, selectBreed] = useState()

    const { data: dogsData, loading: dogsBreedLoading, error: dogsError } = useLoadData(
        `https://dog.ceo/api/breeds/list/all`
    );
    const { data: dogImage, loading: dogImageLoading, error: dogImageError } = useLoadData(
        `https://dog.ceo/api/breed/${selectedBreed}/images/random`
    );

    return (
        <div>
            <h1>Dog breed picture</h1>
            <div>
                {dogsBreedLoading && <div>Loading...</div>}
                {dogsError && <div style={{ color: "red" }}>{dogsError.error}</div>}
                {dogsData && !dogsError && (
                    <select onChange={(e) => selectBreed(e.target.value)} value={selectedBreed}>
                        {Object.keys(dogsData.message).map((breed) => (
                            <option key={breed} value={breed}>
                                {breed}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            <br />
            <div>
                {dogImageLoading && <div>Image is loading...</div>}
                {dogImageError && <div style={{ color: "red" }}>{dogImageError.error}</div>}
                {dogImage && !dogImageError && (
                    <img src={dogImage.message}></img>
                )}
            </div>
        </div>
    );
};

createRoot(document.getElementById("root")).render(<App />);
