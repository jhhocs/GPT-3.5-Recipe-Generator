import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import axios from "axios";

function Recipe() {
  const [response, setResponse] = useState(null);
  const [hasResponse, setHasReseponse] = useState(false);
  const [error, setError] = useState(false);

  function Response() {
    let { id } = useParams();
    console.log("ID: " + id);
    if (!hasResponse) {
      axios({
        method: "post",
        url: "http://localhost:3001/Recipe",
        data: {
          id: id,
        },
      })
        .then((response) => {
          console.log(response.data);
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
          {error ? "Recipe not found!" : ""}
        </div>
      );
    } else {
      return (
        <Box display="flex" justifyContent="center" mt={5}>
          <Paper elevation={3} style={{ padding: "20px", width: "80%" }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {response.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Difficulty: {response.difficulty}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Preparation Time: {response.prep_time}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Cook Time: {response.cook_time}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total Time: {response.total_time}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Servings: {response.servings}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Ingredients
            </Typography>
            <List sx={{ listStyleType: "disc", marginLeft: "30px" }}>
              {response.ingredients.map((ingredient, index) => (
                <ListItem key={index} sx={{ display: "list-item" }}>
                  <ListItemText
                    primary={ingredient.name + " " + ingredient.quantity}
                  />
                </ListItem>
              ))}
            </List>
            <Typography variant="h6" gutterBottom>
              Instructions
            </Typography>
            <List>
              {response.instructions.map((instruction, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`${index + 1}. ${instruction}`} />
                </ListItem>
              ))}
            </List>
            <Typography variant="h6" gutterBottom>
              Additional Notes
            </Typography>
            <List sx={{ listStyleType: "disc", marginLeft: "30px" }}>
              {response.notes.map((note, index) => (
                <ListItem key={index} sx={{ display: "list-item" }}>
                  <ListItemText primary={note} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      );
    }
  }

  return (
    <div>
      <Response />
    </div>
  );
}

export default Recipe;
