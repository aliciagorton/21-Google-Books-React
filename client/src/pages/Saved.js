import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
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
        margin: "20px"
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
    },
    link: {
        color: "white",
        cursor: "pointer",
        "&:hover": {
            color: "#1769aa"
        }
    },
    image: {
        margin: "30px"
    },
    descriptoin: {
        color: "white"
    },
    view: {
        color: "white"
    }
})

const Saved = () => {

    const [book, setBook] = useState([]);

    useEffect(() => {
        loadBooks();
    },[])

    function loadBooks(){
        API.getBooks()
            .then((res) => {
                setBook(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function deleteBook(id){
        API.deleteBook(id)
            .then((res) => {
                loadBooks();
            })
            .catch((res) => {
                console.log(res);
            })
    }

    const classes = useStyles();

    return(
        <>
        {book.length ? (
            <ul>
                {book.map(b =>(
                    <Grid className={classes.searchedBooks}>
                        <Typography className={classes.bookContainer} key={b._id}>
                            <Typography className={classes.title}>
                                {b.title} by {b.author}
                            </Typography>
                            <img
                                className={classes.image}
                                value={b.title}
                                key={b._id} 
                                src={b.image} 
                                alt="Pic of searched book" 
                                style={{ width: "100px", height: "150px" }}
                            />
                            <br/>
                            <Typography className={classes.description}>{b.description}</Typography>
                            <Button className={classes.saveButton} onClick={()=>deleteBook(b._id)}>Delete</Button>
                        </Typography>
                    </Grid>
                ))}
            </ul>
        ) : (
            <h3>No Results Found</h3>
        )}
        </>
    )
}

export default Saved;