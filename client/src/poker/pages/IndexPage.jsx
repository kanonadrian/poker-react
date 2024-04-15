import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, Grid, Snackbar, Alert } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

export const IndexPage = () => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const createRoom = () => {
        setLoading(true);
        setTimeout(() => {
            setOpen(true)
        }, 1000);
        setTimeout(() => {
            const numberRoom = Math.random().toString().slice(2,15);
            navigate(`/${ numberRoom }`);
        }, 3000);
        
    }
    const onCloseNoti = () => {
        setOpen(false);
    }
    return (
        <>
           <AppBar position="static">
                <Toolbar>
                    <Typography component="div" sx={{ flexGrow: 1, color: 'primary.text' }}>
                    Planning Poker Softnet
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <Grid container style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h4" mt={ 7 } sx={{color: 'primary.textContent'}}>
                            Realiza estimaciones ágiles y precisas gracias al Planning Poker.
                        </Typography>
                        <Typography mt={ 5 } sx={{color: 'primary.textContent'}}>
                            En el mundo del software, los desarrolladores se enfrentan constantemente a diferentes desafíos. Hacer una estimación sobre el alcance o el tamaño que tendrá un proyecto, es uno de ellos.
                        </Typography>
                        <Typography mt={ 1 } sx={{color: 'primary.textContent'}}>
                            El Planning Poker nace como una técnica que busca facilitar dicha estimación y asegurar su precisión. Inscrita dentro de las metodologías ágiles, esta técnica facilita igualmente la distribución del trabajo dentro de los miembros del equipo.
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                    
                </Grid>
                <Grid mt={5} container style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    {/* <Button variant="outlined" onClick={ createRoom }>Create room</Button> */}
                    <LoadingButton
                        onClick={ createRoom }
                        loading={ loading }
                        variant="outlined"
                        >
                        Crear sala
                    </LoadingButton>
                </Grid>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={ onCloseNoti } open={ open } autoHideDuration={6000} >
                    <Alert severity="success" sx={{ width: '100%' }}>
                        Se creó la sala exitosamente.
                    </Alert>
                </Snackbar>
            </main>
        </>
    )
}