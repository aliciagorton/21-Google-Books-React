import React, { useState } from 'react';
import axios from 'axios';
import API from '../utils/API';
import { Button, Input, Grid, Typography, Card, Form, Container, Image  } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({

});

const Search = () => {
    const classes = useStyles();

    const [books, setBooks] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    function handleChange(e){
        const books = e.target.value;
        setBooks(books);
    };

    function handleSubmit(e){
        e.preventDefault();
        console.log(books);
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${books}`)
        .then((data) =>{
            console.log(data.data.items);
            setSearchResult(data.data.items)
        })
        .catch((err) => {
            console.log(err);
        })
    };

    function saveBooksToDatabase(savedBooks) {
        console.log(savedBooks)
        let test = searchResult.filter(b => b.id === savedBooks)
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

    return (
        <div>
            <Card className={classes.search}>
                <Form>
                    <Input 
                        className={classes.formSearch}
                        onChange={handleChange}
                    />
                    <Button
                        className={classes.searchButton} 
                        onClick={handleSubmit}>
                        Search
                    </Button>
                </Form>
            </Card>
            <div>
            {searchResult.map(res => (
                <Grid className={classes.searchedBooks}>
                    <Container className={classes.bookContainer}>
                        <Typography className={classes.title}>{res.volumnInfo.title} 
                        </Typography>
                        <Image 
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
                            onClick={() =>saveBooksToDatabase(res.id)}
                            >
                            Save
                        </Button>
                    </Container>
                </Grid>
            ))};
            </div>
        </div>
    )
      
}
export default Search;