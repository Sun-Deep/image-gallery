import { useEffect, useState } from "react";
import axios from "axios";

interface Photos {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const API_URL: string = "https://jsonplaceholder.typicode.com/photos";

const getData = async () => {
  return fetch(API_URL)
    .then((data) => data.json())
    .catch((err) => "Something went wrong..");
};

function App() {
  const [images, setImages] = useState<Photos[]>([]);
  const [allData, setAllData] = useState<Photos[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setAllData(data);
      });
  }, []);
  setTimeout(() => {
    setImages(allData.slice(0, 50));
  });
  return (
    <div>
      {images &&
        images.map((img) => (
          <p key={img.id}>
            {img.id} {img.title}
          </p>
        ))}
    </div>
  );
}

export default App;
