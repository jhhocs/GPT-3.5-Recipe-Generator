import { useForm, useFieldArray } from "react-hook-form";

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
        <div className = "Home">
            Home
            <div>
                <form key = {1} onSubmit = {handleSubmit(onSubmitIngridient)}>
                    <input type="text" placeholder="Enter ingridient" {...register("ingridient")} />
                    <button type="submit" >Submit</button>
                </form>
            </div>
            <div>
                <form key = {2} onSubmit = { handleSubmit2(onSubmit)}>
                    <input type="text" placeholder="Cuisine" {...register2("cuisine")} />
                    <ul>
                        {fields.map((item, index) => (
                        <li key={item.id}>
                            <input type="text" placeholder="Ingredient" readOnly {...register2(`ingridients.${index}`)} />
                            <button type="button" onClick={() => remove(index)}>Remove</button>
                        </li>
                        ))}
                    </ul>

                    <button type="submit" >Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Home;