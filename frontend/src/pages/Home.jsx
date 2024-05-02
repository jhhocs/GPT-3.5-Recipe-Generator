import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { InputAdornment } from "@mui/material";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Unstable_Grid2";
import InputBase from "@mui/material/InputBase";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import SendIcon from "@mui/icons-material/Send";

import axios from "axios";

function Home() {
  const [inputWidth, setInputWidth] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
    // getValues,
  } = useForm({ defaultValues: { ingridient: "" } });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    // getValues,
    control,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const navigate = useNavigate();

  const onSubmitIngridient = (data) => {
    // if (data.ingridient.length * 10 > 50) {
    setInputWidth([...inputWidth, data.ingridient.length * 8 + 50 + "px"]);

    // data.inputWidth = data.ingridient.length * 10 + "px";
    // } else {
    // data.inputWidth = 50;
    // }
    append(data.ingridient);
    // console.log(getValues(`ingredients.${0}.inputWidth`));
    // console.log(getValues(`ingredients.${0}`));
  };

  const callAPI = async (data) => {
    axios({
      method: "post",
      url: "http://localhost:3001/callAPI",
      data: {
        cuisine: data.cuisine,
        ingredients: data.ingredients.toString(),
        // cuisine: "Italian",
      },
    })
      .then((response) => {
        console.log(response.data);
        // setResponse(JSON.parse(result.choices[0].message.content));
        setLoading(false);
        // this.props.history.push("/recepies/" + response.data.id);
        navigate("/recipes/" + response.data.id);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        // setTimeout(() => {
        setError(true);
        // }, 3000);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  };

  // function Response() {
  //   if (!hasResponse) {
  //     return;
  //   } else {
  //     return (
  //       <div>success</div>
  //       // <Redirect to={"/recepies/" + response.id} />
  //       // <div>
  //       //   {
  //       //     <div>
  //       //       <h1>{response.name}</h1>
  //       //       <h4>{"Difficulty: " + response.difficulty}</h4>
  //       //       <p>{"Preparation Time: " + response.prep_time}</p>
  //       //       <p>{"Cook Time: " + response.cook_time}</p>
  //       //       <p>{"Total Time: " + response.total_time}</p>
  //       //       <p>{"Servings: " + response.servings}</p>
  //       //       <h2>Ingredients</h2>
  //       //       <ul>
  //       //         {response.ingredients.map((ingredient, index) => (
  //       //           <li key={index}>
  //       //             {ingredient.name + " " + ingredient.quantity}
  //       //           </li>
  //       //         ))}
  //       //       </ul>
  //       //       <h2>Instructions</h2>
  //       //       <ol>
  //       //         {response.instructions.map((instruction, index) => (
  //       //           <li key={index}>{instruction}</li>
  //       //         ))}
  //       //       </ol>
  //       //       <h2>Additional Notes</h2>
  //       //       <ul>
  //       //         {response.notes.map((note, index) => (
  //       //           <li key={index}>{note}</li>
  //       //         ))}
  //       //       </ul>
  //       //     </div>
  //       //   }
  //       // </div>
  //     );
  //   }
  // }

  useEffect(() => {
    if (isSubmitSuccessful && !errors.ingridient) {
      console.log("reset");
      reset({ ingridient: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState, reset]);

  const onSubmit = (data) => {
    if (error || loading) return;
    console.log(data);
    setLoading(true);
    callAPI(data);
  };

  return (
    <div>
      {/* <Navbar /> */}
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
          sx={{ minWidth: "450px", width: "50vw", minHeight: "60vh" }}
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
                  autoComplete="off"
                  // margin={1}
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
              <LoadingButton
                form="form"
                variant="outlined"
                type="submit"
                color={error ? "error" : "primary"}
                sx={{ marginTop: "10px" }}
                loading={loading}
                loadingPosition="end"
                endIcon={error ? <></> : <SendIcon />}
              >
                {error ? " Error" : "Submit"}
              </LoadingButton>
            </Grid>
            <Grid sx={{ width: "60%" }}>
              <Box sx={{ paddingTop: "10px" }}>
                <p>Ingredients</p>
              </Box>
              <form id="form" key={2} onSubmit={handleSubmit2(onSubmit)}>
                <Box
                  // pacing={{ xs: 1, sm: 2 }}
                  direction="row"
                  useFlexGap
                  flexWrap="wrap"
                  padding={0}
                  sx={{ width: "100%", height: "100%" }}
                >
                  <Box>
                    {fields.map((item, index) => (
                      <TextField
                        key={item.id}
                        variant="outlined"
                        type="text"
                        placeholder="Ingredient"
                        size="small"
                        sx={{
                          // minWidth: "100px",
                          // width: "80px",
                          width: inputWidth[index] ? inputWidth[index] : "50px",
                          marginLeft: "5px",
                          marginBottom: "5px",
                          input: { cursor: "pointer" },
                          // margin: "10px",
                          // height: "10px",
                        }}
                        InputProps={{
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment
                              position="start"
                              sx={{
                                // width: "100%",
                                // height: "100%",
                                marginRight: "-5px",
                              }}
                            >
                              <ClearIcon />
                            </InputAdornment>
                          ),
                        }}
                        {...register2(`ingredients.${index}`)}
                        onClick={() => {
                          remove(index);
                          setInputWidth(
                            inputWidth.filter((item, i) => i !== index)
                          );
                        }}
                      />
                    ))}
                  </Box>
                  <Box>
                    <TextField
                      variant="outlined"
                      type="text"
                      placeholder="Cuisine"
                      autoComplete="off"
                      {...register2("cuisine")}
                    />
                  </Box>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
