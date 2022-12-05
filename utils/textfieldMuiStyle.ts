const textfieldStyle = {
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& > fieldset": {
      borderColor: "lightGrey",
    },
  },
  "& label.Mui-focused": {
    display: "none",
  },
  "& legend": {
    display: "none",
  },

  "& .MuiInputBase-input": {
    height: "100%",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      marginTop: "5px",
    },
  },

  "& label": {
    marginTop: "-0.5%",
    fontSize: "1.3rem",
  },
};
export default textfieldStyle;
