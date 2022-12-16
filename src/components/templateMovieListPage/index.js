
import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
 
function MovieListPageTemplate({ movies, title, action }) {
  return (
            <Grid container sx={{ padding: '20px' }}>

          <Grid item xs={12}>
            <Header title={title} />
          </Grid>
          <Grid item container spacing={5}>
            <MovieList action={action} movies={movies}/>
          </Grid>
        </Grid>
  );
}
export default MovieListPageTemplate;