import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { InputAdornment } from "@mui/material";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
    getValues,
  } = useForm({ defaultValues: { ingridient: "" } });
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    control,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingridients",
  });

  const onSubmitIngridient = (data) => {
    append(data.ingridient);
    console.log(data);
  };

  useEffect(() => {
    if (isSubmitSuccessful && !errors.ingridient) {
      console.log("reset");
      reset({ ingridient: "" });
    }
  }, [formState, reset]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      // my={4}
      //   sx={{ marginTop: "20vh" }}
    >
      <Grid
        border={1}
        padding={5}
        borderRadius={2}
        margin={10}
        sx={{ width: "50vw", minHeight: "60vh" }}
      >
        <Grid
          item
          xs={3}
          container
          spacing={2}
          className="Home"
          //   display={"flex"}
          //   wrap="wrap"
          direction="row"
          sx={
            {
              // minHeight: '40vh',
              // minWidth: '80vh',
              // height:'50vh',
              // width:'75vh'
            }
          }
        >
          <Grid sx={{ width: "40%" }}>
            <h2>Recipe Generator</h2>
            <Paper
              key={1}
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                // width: "10vw",
              }}
              onSubmit={handleSubmit(onSubmitIngridient)}
            >
              <InputBase
                variant="outlined"
                type="text"
                placeholder="Enter ingridient"
                sx={{ ml: 1, flex: 1 }}
                {...register("ingridient", {
                  validate: (value) => {
                    if (value.replace(/\s/g, "") === "") {
                      return false;
                    }
                    return true;
                  },
                })}
              />
              <Button
                variant="outlined"
                type="submit"
                sx={{ minWidth: "20px", padding: "0px" }}
              >
                <AddIcon />
              </Button>
            </Paper>
          </Grid>
          <Grid sx={{ width: "60%" }}>
            <p>Ingrediants</p>
            <form id="form" key={2} onSubmit={handleSubmit2(onSubmit)}>
              <Box
                pacing={{ xs: 1, sm: 2 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
              >
                {fields.map((item, index) => (
                  <TextField
                    key={item.id}
                    variant="outlined"
                    type="text"
                    placeholder="Ingredient"
                    fullWidth
                    style={{ minWidth: "100px", width: "100px" }}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="start">
                          <ClearIcon />
                        </InputAdornment>
                      ),
                    }}
                    {...register2(`ingridients.${index}`)}
                    onClick={() => remove(index)}
                  />
                ))}
                <TextField
                  variant="outlined"
                  type="text"
                  placeholder="Cuisine"
                  {...register2("cuisine")}
                />
              </Box>
            </form>
          </Grid>
        </Grid>
        <Button form="form" variant="outlined" type="submit">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}

export default Home;
