import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";

interface PropsType {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
}));

function ImageCard({ title, url, thumbnailUrl, id, albumId }: PropsType) {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="recipe">{title.substring(0, 1)}</Avatar>}
        title={title.substring(0, 1).toUpperCase() + title.substring(1)}
      />
      <CardContent>
        <Typography color="textSecondary">
          Album ID: {albumId} Image ID: {id}
        </Typography>
        <Typography color="textSecondary"></Typography>
      </CardContent>
      <CardMedia image={thumbnailUrl} className={classes.media} />
    </Card>
  );
}

export default ImageCard;
