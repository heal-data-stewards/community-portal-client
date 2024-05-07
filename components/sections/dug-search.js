import React, { useRef, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import ButtonBase from "@material-ui/core/ButtonBase"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

const useStyles = makeStyles({
  root: {
    margin: "0 0 3rem",
    padding: "3rem 0 3.5rem",
    backgroundColor: "#53256510",
  },
  feedbackLine: {
    color: "#982568"
  },
  title: {
    color: "#982568", 
    fontSize: "1.5rem",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  textInputBox: {
    padding: "0.5rem 1rem", 
    marginLeft: 1, 
    flex: 1, 
    fontFamily: "Montserrat"
  },
  searchButton: {
    backgroundColor: "#982568",
    height: "100%",
    padding: "1rem 1rem",
    color: "#FFF",
    borderRadius: "0 4px 4px 0",
    transition:
      "background-color 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    transition: "color 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: "#98256899",
    },
  }
});

const FeedbackLine = ({ message }) => {
  const classes = useStyles();

  return (
    <Typography variant="caption" className={classes.feedbackLine}>
      {message}
    </Typography>
  )
}

const DugSearch = ({ data }) => {
  const classes = useStyles();

  const inputField = useRef()
  const [errorMessage, setErrorMessage] = useState("")

  const doSearch = (event) => {
    event.preventDefault()
    //checks if the inputField has rendered
    if (!inputField.current) {
      return
    }

    //checks if the user has entered any value here (it can be a bunch of spaces and  still be considered a value)
    //this only returns if the user hasnt entered any characters at all
    if (!inputField.current.value) {
      setErrorMessage("No value indicated. Please enter search term.")
      return
    }

    //this trims any spaces off the front or back of the words
    //if you enter a bunch of spaces, you wont get sent to the heal dug page
    const trimmedString = inputField.current.value.trim()
    if (!trimmedString) {
      setErrorMessage("No value indicated. Please enter search term.")
      return
    }

    //this only sends you to the heal-dug page with your trimmed version of the search term
    if (data.newTab === true) {
      window.open(`https://heal.renci.org/?q=${trimmedString}`, "_blank")
    } else {
      window.location = `https://heal.renci.org/?q=${trimmedString}`
    }
    setErrorMessage("")
  }

  return (
    <Box className={classes.root}>
      <div className="prose-lg container event-html text-gray-dark text-xl">
        <Typography
          variant="h3"
          gutterBottom
          className={classes.title}
        >
          {data.title}
        </Typography>
        <Paper
          component="form"
          noValidate
          autoComplete="off"
          className={classes.searchBox}
          onSubmit={doSearch}
        >
          <InputBase
            className={classes.textInputBox}
            placeholder={data.placeholder}
            inputProps={{ "aria-label": `${data.placeholder}` }}
            inputRef={inputField}
            autoFocus
          />
          <ButtonBase
            type="submit"
            onSubmit={() => {
              doSearch
            }}
            className={classes.searchButton}
          >
            {data.buttonText}
          </ButtonBase>
        </Paper>
        <FeedbackLine message={errorMessage} />
      </div>
    </Box>
  )
}

export default DugSearch
