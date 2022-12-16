
import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { MoviesContext } from "../../contexts/moviesContext";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar"; 
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom'

const ratings = [
  {
    value: 5,
    label: "Excellent",
  },
  {
    value: 4,
    label: "Good",
  },
  {
    value: 3,
    label: "Average",
  },
  {
    value: 2,
    label: "Poor",
  },
  {
    value: 0,
    label: "Terrible",
  },
];

const styles = {
  root: {
    marginTop: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    "& > * ": {
      marginTop: 2,
    },
  },
  textField: {
    width: "40ch",
  },
  submit: {
    marginRight: 2,
  },
  snack: {
    width: "50%",
    "& > * ": {
      width: "100%",
    },
  },
};

const ReviewForm = ({ movie }) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const context = useContext(MoviesContext);
  const [rating, setRating] = useState(3);
  const [open, setOpen] = React.useState(false);  //NEW
  const navigate = useNavigate()

  const handleSnackClose = (event) => {     // NEW
    setOpen(false);
    navigate("/movies/favourites");
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const onSubmit = (review) => {
    review.movieId = movie.id;
    review.rating = rating;
    // console.log(review)
    context.addReview(movie, review); 
    setOpen(true);    
  };

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">
        Write a review
      </Typography>
      <Snackbar
        sx={styles.snack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleSnackClose}
      >
        <MuiAlert
          severity="success"
          variant="filled"
          onClose={handleSnackClose}
        >
          <Typography variant="h4">
            Thank you for submitting a review
          </Typography>
        </MuiAlert>
      </Snackbar>
      <form
        sx={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <TextField
          sx={styles.textField}
          variant="outlined"
          margin="normal"
          required
          id="author"
          label="Author's name"
          name="author"
          autoFocus
          inputRef={register({ required: "Author name required" })}
        />
        {errors.author && (
          <Typography variant="h6" component="p">
            {errors.author.message}
          </Typography>
        )}

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="content"
          label="Review text"
          id="content"
          multiline
          rows={10}
          inputRef={register({
            required: "No review text",
            minLength: { value: 10, message: "Review is too short" },
          })}
        />
        {errors.content && (
          <Typography variant="h6" component="p">
            {errors.content.message}
          </Typography>
        )}
        <TextField
          id="select-rating"
          select
          variant="outlined"
          label="Rating Select"
          value={rating}
          onChange={handleRatingChange}
          helperText="Don't forget your rating"
        >
          {ratings.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={styles.buttons}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={styles.submit}
          >
            Submit
          </Button>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            sx={styles.submit}
            onClick={() => {
              reset({
                author: "",
                content: "",
              });
            }}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ReviewForm;