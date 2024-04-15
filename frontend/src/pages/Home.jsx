import { useForm, useFieldArray } from "react-hook-form";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

function Home() {
    const { register, handleSubmit } = useForm();
    const { register: register2, handleSubmit: handleSubmit2, control } = useForm();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "ingridients"
    });

    const onSubmitIngridient = (data) => {
        append(data.ingridient);
        console.log(data)
    }

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Grid 
            container
            alignItems="center" 
            justifyContent="center"
            // my={4} 
            sx={{ minHeight: '100vh' }}>
            <Grid 
                item xs={3} 
                container spacing={2} 
                className = "Home" 
                border={1} 
                padding={5} 
                borderRadius={2}
                display={"flex"}
                wrap="nowrap"
                direction="row"
                sx={{
                    minHeight: '40vh',
                    minWidth: '80vh',
                    // height:'50vh',
                    // width:'75vh'
                }}>
                <Grid alignSelf="center" >
                    <Paper 
                        key = {1} 
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', minWidth: '30vh' }}
                        onSubmit = {handleSubmit(onSubmitIngridient)}>
                        <InputBase 
                            variant="outlined" 
                            type="text" 
                            placeholder="Enter ingridient" 
                            sx={{ ml: 1, flex: 1 }}
                            {...register("ingridient")} />
                        <Button 
                            variant="outlined" 
                            type="submit" 
                            sx={{ minWidth:'20px', padding:'0px'}}>
                            <AddIcon />
                        </Button>
                    </Paper>
                </Grid>
                <Grid>
                    <form key = {2} onSubmit = { handleSubmit2(onSubmit)}>
                        <ul>  {/*https://mui.com/material-ui/react-grid/   https://mui.com/material-ui/react-grid2/*/}
                            {fields.map((item, index) => (
                            <li key={item.id}>
                                <TextField variant="outlined" type="text" placeholder="Ingredient" readOnly {...register2(`ingridients.${index}`)} />
                                <Button variant="outlined" type="button" onClick={() => remove(index)}><ClearIcon /></Button>
                            </li>
                            ))}
                            <TextField variant="outlined" type="text" placeholder="Cuisine" {...register2("cuisine")} />
                        </ul>

                        <Button variant="outlined" type="submit" >Submit</Button>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home;