import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";

import axios from "axios";

function Recipes() {
  const [response, setResponse] = useState(null);
  const [hasResponse, setHasReseponse] = useState(false);
  const [error, setError] = useState(false);

  function Item(response) {
    const id = response.response.id;
    const recipe = JSON.parse(response.response.recipe);
    // console.log(response.response);
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea component={RouterLink} to={`/Recipes/${id}`}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {recipe.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Difficulty: ${recipe.difficulty}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Prep Time: ${recipe.prep_time}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Cook Time: ${recipe.cook_time}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Total Time: ${recipe.total_time}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Servings: ${recipe.servings}`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

  if (!hasResponse) {
    axios({
      method: "get",
      url: "http://localhost:3001/Recipes",
    })
      .then((response) => {
        setResponse(response.data);
        setHasReseponse(true);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
          height: "100vh",
          fontSize: "1.5em",
        }}
      >
        {error ? "No Recipes found" : ""}
      </div>
    );
  } else {
    return (
      <Box sx={{ flexGrow: 1, padding: "20px" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
        >
          {response.map((recipe, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item response={recipe} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
}

export default Recipes;
