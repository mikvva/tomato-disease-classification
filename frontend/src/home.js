import * as React from "react"
import { useState, useEffect } from "react"
import Dropzone from 'react-dropzone'

import axios from "axios";

import { useTheme } from '@emotion/react';

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Avatar from "@mui/material/Avatar"
import Container from "@mui/material/Container"
import CardContent from "@mui/material/CardContent"
import Card from "@mui/material/Card"
import Paper from "@mui/material/Paper"
import CardActionArea from "@mui/material/CardActionArea"
import CardMedia from "@mui/material/CardMedia"
import Grid from "@mui/material/Grid"
import TableContainer from "@mui/material/TableContainer"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import CircularProgress from "@mui/material/CircularProgress"
import Button from '@mui/material/Button';


import image from "./bg.jpg"
import thlogo from "./thlogo.png"

import { useMemo } from 'react';
import { css } from '@emotion/css';


const useClasses = stylesElement => {
  const theme = useTheme();
  return useMemo(() => {
    const rawClasses = typeof stylesElement === 'function'
      ? stylesElement(theme)
      : stylesElement;
    const prepared = {};

    Object.entries(rawClasses).forEach(([key, value = {}]) => {
      prepared[key] = css(value);
    });

    return prepared;
  }, [stylesElement, theme]);
};


const styles = theme => ({
    grow: {
        flexGrow: 1,
      },
      clearButton: {
        width: "-webkit-fill-available",
        borderRadius: "15px",
        padding: "15px 22px",
        color: "#000000a6",
        fontSize: "20px",
        fontWeight: 900,
      },
      root: {
        maxWidth: 345,
        flexGrow: 1,
      },
      media: {
        height: 400,
      },
      paper: {
        paddin: 0,
        margin: 'auto',
        maxWidth: 500,
      },
      gridContainer: {
        padding: "4em 0 1em 0",
        justifyContent: 'center'
      },
      mainContainer: {
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100vh',
      },
      imageCard: {
        margin: 'auto',
        maxWidth: 400,
        maxHeight: 500,
        backgroundColor: 'transparent',
        boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
        borderRadius: '85px'
      },
      imageCardEmpty: {
        height: 'auto',       
      },
      noImage: {
        margin: "auto",
        width: 400,
        height: "400 !important",
       
      },
      input: {
        display: 'none',
      },
      uploadIcon: {
        background: 'white',
      },
      tableContainer: {
        backgroundColor: 'transparent !important',
        boxShadow: 'none !important',
      },
      table: {
        backgroundColor: 'transparent !important',
      },
      tableHead: {
        backgroundColor: 'transparent !important',
      },
      tableRow: {
        backgroundColor: 'transparent !important',
      },
      tableCell: {
        fontSize: '22px',
        backgroundColor: 'transparent !important',
        borderColor: 'transparent !important',
        color: '#000000a6 !important',
        fontWeight: 'bolder',
        padding: '1px 16px 1px 16px',
      },
      tableCell1: {
        fontSize: '14px',
        backgroundColor: 'transparent !important',
        borderColor: 'transparent !important',
        color: '#000000a6 !important',
        fontWeight: 'bolder',
        padding: '1px 16px 1px 16px',
      },
      tableBody: {
        backgroundColor: 'transparent !important',
      },
      title: {
        color: 'black !important',
        textAlign: 'center',
      },
      buttonGrid: {
        margin: 'auto',
        maxWidth: "100pc"
      },
      detail: {
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      },
      content:{
        display: 'flex',
        direction: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100',
        fontWeight: 'bolder',
        fontSize: '18px',
      },
      appBar: {
        background: '#B7E3CC',
        boxShadow: 'none',
        color: 'white',        
      },
      palette: {
        primary: {
          main: "#00ff00"
        }
      },
      loader: {
        color: '#B7E3CC !important',
      },
     

});

// useState returns a pair: the current state value and a function that lets you update it.
// The only argument to useState is the initial state

export default function ImageUpload (){  

  const classes = useClasses(styles);
    
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [data, setData] = useState();
    const [image, setImage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    let confidence = 0;

    const sendFile = async () => {
        if(image) {
            let formData = new FormData();
            formData.append("file", selectedFile);

            let res = await axios({
                method : "post",
                url: process.env.REACT_APP_API_URL,
                data : formData,
            });
            if(res.status === 200){
                setData(res.data);
            }
            setIsLoading(false);
        }
    }

    const clearData = () => {
        setData(null);
        setImage(false);
        setSelectedFile(null);
        setPreview(null);
    };

    useEffect(() => {
        if(!selectedFile){
            setPreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
    }, [selectedFile]);

    useEffect(() => {
        if(!preview){
            return;
        }
        setIsLoading(true);

        // eslint-disable-next-line
        sendFile();

    },[preview]);

    const onSelectFile = (files) => {
        if(!files || files.length === 0){
            setSelectedFile(undefined);
            setImage(false);
            setData(undefined);
            return;
        }
        setSelectedFile(files[0]);
        setData(undefined);
        setImage(true);
    };

    if(data) {
        confidence = (parseFloat(data.confidence) * 100).toFixed(2);
    }

    return (
    <React.Fragment>
      <Container maxWidth={false} className={classes.mainContainer} disableGutters={true}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar sx={{ backgroundColor: '#a6880f' }} >
        <Avatar src={thlogo}></Avatar>
        <div className={classes.grow}/>
        <Typography className={classes.title} variant="h6" noWrap>
            Tomato Health
        </Typography>
        </Toolbar>
      </AppBar>
      <Grid
          className={classes.gridContainer}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ''}`}>
              {image && <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={preview}
                  component="image"
                />
              </CardActionArea>
              }
              {!image && <CardContent className={classes.content}>
              <Dropzone
                sx={{justifyContent:'center', alignItems:'center'}}
                onDrop={onSelectFile}
                // accept={{"image/*"}}
              >
                {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {!isDragActive && 'Click here or drop a file to upload!'}
                    {isDragActive && !isDragReject && "Drop it like it's hot!"}
                    {isDragReject && "File type not accepted, sorry!"}
                  </div>
                )}
              </Dropzone>
              </CardContent>}

              {data && <CardContent className={classes.content}>
                <TableContainer component={Paper} className={classes.tableContainer}>
                  <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead className={classes.tableHead}>
                      <TableRow className={classes.tableRow}>
                        <TableCell className={classes.tableCell1}>Label:</TableCell>
                        <TableCell align="right" className={classes.tableCell1}>Confidence:</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                      <TableRow className={classes.tableRow}>
                        <TableCell component="th" scope="row" className={classes.tableCell}>
                          {data.class}
                        </TableCell>
                        <TableCell align="right" className={classes.tableCell}>{confidence}%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>}
              {isLoading && <CardContent className={classes.content}>
                <CircularProgress color="secondary" className={classes.loader} />
                <Typography className={classes.title} variant="h6" noWrap>
                  Processing
                </Typography>
              </CardContent>}
            </Card>
          </Grid>
          {data &&
            <Grid item className={classes.buttonGrid} >
              <Button variant="contained" className={classes.clearButton} color="primary" component="span" size="large" onClick={clearData} >
                Clear
              </Button>
            </Grid>}
        </Grid >
      </Container>        
    </React.Fragment>
    );
};