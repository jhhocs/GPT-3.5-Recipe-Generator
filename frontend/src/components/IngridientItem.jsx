function IngridientItem() {
  return (
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
  );
}

export default IngridientItem;
