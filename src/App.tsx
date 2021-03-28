import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import { Button, Grid, makeStyles, Paper } from "@material-ui/core";
import { API_URL } from "./config";

interface Photos {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  showMore: {
    display: "flex",
    justifyContent: "center",
    height: "150px",
    alignItems: "center",
  },
}));

let currentAlbum = 1;

function App() {
  const classes = useStyles();

  const [images, setImages] = useState<Photos[]>([]);
  const [allData, setAllData] = useState<Photos[]>([]);

  const filterPhotos = () => {
    return allData
      .filter((d) => d.albumId === currentAlbum && d.id % 2 === 0)
      .slice(0, 1);
  };

  const loadTenPhotos = () => {
    const temp: any = [];
    for (let i = 0; i < 10; i++) {
      temp.push(...filterPhotos());
      currentAlbum++;
    }
    setImages((img) => [...img, ...temp]);
  };

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setAllData(data);
      });
  }, []);

  const handleShowMore = () => {
    if (images.length < 50) {
      loadTenPhotos();
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {images &&
          images.map((img) => (
            <Grid item xs={12} sm={6} lg={4} key={img.id}>
              <ImageCard
                title={img.title}
                thumbnailUrl={img.thumbnailUrl}
                url={img.url}
                id={img.id}
                albumId={img.albumId}
              />
            </Grid>
          ))}
      </Grid>
      <div className={classes.showMore}>
        <Button variant="contained" color="primary" onClick={handleShowMore}>
          Show More
        </Button>
      </div>
    </div>
  );
}

export default App;
