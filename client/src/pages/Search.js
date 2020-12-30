import React, { useState } from 'react';
import axios from 'axios';
import API from '../utils/API';
import { Button, Input, Grid, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    searchInput: {
        margin: "10px",
        width: "100px"
    },
    searchContainer: {
        textAlign: "center",
        margin: "50px",
    },
    searchedBooks: {
        textAlign: "center",
        background: "#424242",
        //flexGrow: 1,
        margin: "80px",
        borderRadius: "10px",
        padding: "10px"
    },
    searchButton: {
        background: "#2196f3",
        color: "white",
        "&:hover": {
            background: "#1769aa"
        }
    },
    saveButton: {
        background: "#2196f3",
        color: "white",
        "&:hover":{
            background: "#1769aa"
        },
    },
    title: {
        fontWeight: "bold",
        padding: "15px",
        color: "white",
        fontSize: "20px"
    },
    description:{
        textAlign: "left",
        color: "white",
        padding: "30px",
    },
    bookContainer: {
        padding: "30px"
    }
})


const Search = () => {

    const [book, setBook] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    function handleChange(e){
        const book = e.target.value;
        setBook(book);
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(book);
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}`)
        .then((data) =>{
            console.log(data.data.items);
            setSearchResult(data.data.items)
        })
        .catch((err) => {
            console.log(err);
        })
    }

      function saveBookToDatabase(savedBook) {
        console.log(savedBook)
        let test = searchResult.filter(b => b.id === savedBook)
        test = test[0];
        console.log(test.volumeInfo);
          API.saveBook({
            title: test.volumeInfo.title,
            author: test.volumeInfo.authors[0],
            description: test.volumeInfo.description,
            image: test.volumeInfo.imageLinks.thumbnail ? test.volumeInfo.imageLinks.thumbnail : '',
            link: test.volumeInfo.previewLink
          })
            .then(res => console.log(res))
            .catch(err => console.log(err, "err"));
      };

      const classes = useStyles();

    return(
        <> 
            <Box className={classes.searchContainer}>
                <form>
                    <Input
                    className={classes.searchInput}
                        onChange={handleChange}
                    />
                    <Button className={classes.searchButton} onClick={handleSubmit}>Search</Button>
                </form>
            </Box>
            {searchResult.map(res => (
                <Grid className={classes.searchedBooks}>
                    <Typography className={classes.bookContainer}>
                        <Typography className={classes.title}>{res.volumeInfo.title}</Typography>
                        <img
                            value={res.volumeInfo}
                            src={res.volumeInfo.imageLinks ? res.volumeInfo.imageLinks.thumbnail : ''} 
                            alt="No Image Found" 
                            style={{ width: "100px", height: "150px" }}
                        />
                        <Typography>{res.volumeInfo.author}</Typography>
                        <Typography className={classes.description}>{res.volumeInfo.description}</Typography>
                        <Button
                            key={res.id}
                            className={classes.saveButton}
                            onClick={() =>saveBookToDatabase(res.id)}
                        >
                            Save
                        </Button>
                    </Typography>
                </Grid>
            ))}
        </>
    )
}

export default Search;