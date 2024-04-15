import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Fab, Snackbar, Alert, Grid,
Paper, Box, Modal,Button, Link, TableContainer, Table, TableHead, TableRow, TableCell, Tooltip, TableBody, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { AccountCircle, Logout, CheckCircleSharp, Share } from '@mui/icons-material/';
import { initiateSocket, disconnectSocket, selectCard, onUpdateUser, onGetPlayers, deleteEstimates, emitShowEstimates, onShowEstimates, deletePlayers } from '../utils/notifications';
import { useParams, useNavigate } from 'react-router-dom';

export const PokerPage = () => {


  const navigate = useNavigate();
  const { roomId } = useParams();
  const [showEstimates, setShowEstimates] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(true);
  const [usOpenDialog, setUsOpenDialog] = useState(false);
  const [usOpenDialogPlayers, setUsOpenDialogPlayers] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  const [openNotiCopy, setOpenNotiCopy] = useState(false);
  const [existUser, setExistUser] = useState(false);
  const [userName, setUserName] = useState();

  const [room, setRoom] = useState(roomId);
  const [user, setUser] = useState();

  const [usersList, setUsersList] = useState([]);
  const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height:200,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 5,
    p:4,
    pt: 8
  };
  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    localStorage.removeItem('user');
    disconnectSocket();
    navigate('/');
  }
  const onCloseNoti = () => {
    setOpenNoti(false);
  }
  const onCloseNotiCopy = () => {
    setOpenNotiCopy(false);
  }
  const addUser = () => {

    if(userName){
      const userCurrent = {
        name: userName
      };
      setUser(userCurrent);
      setExistUser(true);

    }else{
      setOpenNoti(true);
    }
  }
  const changeName = (e) => {
    const value = e.target.value;
    setUserName(value);
  }

  const showPoints = () => {

    emitShowEstimates(room, showEstimates);

  }

  const closeDialog = () => {

    setUsOpenDialog(false);

  }
  const closeDialogPlayers = () => {

    setUsOpenDialogPlayers(false);

  }
  const openDialog = () => {

    setUsOpenDialog(true);

  }
  const openDialogPlayers = () => {

    setUsOpenDialogPlayers(true);

  }
  const copyClipboard = () => {

    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setOpenNotiCopy(true);

  }

  useEffect(() => {

    const userCurrent = JSON.parse(localStorage.getItem('user'));
    if(userCurrent) {
      setUser(userCurrent);
      setExistUser(true);
    }
    if(room && user) {

      initiateSocket(room, user);
      onGetPlayers((data) => {
        setUsersList(data);
      });
      onUpdateUser((data) => {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
      });
      onShowEstimates((data) => {
        setShowEstimates(!data);
      });


    }

    return () => {
      disconnectSocket();
    }
  }, [existUser])


  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1, color: 'primary.text' }} onClick={ logout }>
            <Typography sx={{ cursor:'pointer', width:'180px'}} >Planning Poker Softnet</Typography>
          </Typography>
          <Tooltip sx={{ cursor:'pointer', ml:1, color: 'primary.text' }} title="Copiar URL" onClick={ copyClipboard }>
            <Share />
          </Tooltip>
          <Typography sx={{ flexGrow: 1, cursor:'pointer', ml:1 , color: 'primary.text'}} onClick={ copyClipboard }>
            Sala: { room }
          </Typography>
          <div >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={ handleMenu }
                color="inherit"
              >
                <Typography component="div" sx={{ mr: 2, color: 'primary.text' }}>
                  {
                    (user) && user.name
                  }
                </Typography>
                <AccountCircle sx={{ color: 'primary.text' }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={ anchorEl }
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean( anchorEl )}
                onClose={ handleClose }
              >
                <MenuItem onClick={ logout } ><Logout sx={{ mr:1 }} /> Salir</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <main style={{ minHeight:'800px' }}>
      {
        (room && user) ? (
            <Grid container spacing={5} sx={{ p: 2, ml: 2}}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  '& > :not(style)': {
                    mt: 6,
                    ml:2,
                    width: 110,
                    height: 160,
                  },
                }}
              >
              {['?', 1, 2, 3, 5, 8, 13].map((point) => (
                    <Paper key={ point } elevation={5}  onClick= { () => selectCard(room, point, user ) }
                      sx={{
                        textAlign: 'center',
                        fontSize: 35,
                        lineHeight: '160px',
                        color: 'primary.main',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#f2f2f2',
                        },
                      }}
                    > { point }</Paper>
                ))}
              </Box>
              <Grid item xs={12} md={5}>
                <Button variant="contained" sx={ { mb:2, color: 'primary.text' } } onClick={ () => showPoints( room ) }>Mostrar</Button>
                <Button variant="contained" sx={ { mb:2, ml:2, color: 'primary.text'} } onClick={ () => openDialog() }>Eliminar estimados</Button>
                <Button variant="contained" sx={ { mb:2, ml:2, color: 'primary.text'} } onClick={ () => openDialogPlayers() }>Limpiar sala</Button>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                  <TableHead>
                      <TableRow>
                          <TableCell>Nombre</TableCell>
                          <TableCell align="right">Puntos de historia</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                  {
                  usersList.map((row) => (

                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                      <TableCell component="th" scope="row">
                        { row.name }
                      </TableCell>
                      <TableCell align="right" >
                        {
                        (showEstimates) ? (

                          <Fab variant="extended">
                          { row.point }
                          </Fab>

                        ) : (
                          <Fab variant="extended">
                            {

                            (row.qualified) ? (<CheckCircleSharp sx={{ color: 'green' }}/>) : (<CheckCircleSharp/>)

                            }
                          </Fab>
                        )

                        }

                        </TableCell>
                    </TableRow>

                  ))}
                  </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
          </Grid>
        ) : (

          <Modal
            open={ openModal}
          >
            <Box sx={style}>
              <TextField sx={{ width: '80%' }}
                required
                label="Requerido"
                placeholder='Ingresa tu nombre'
                onChange={ changeName }
              />
              <Button variant="contained" onClick={ addUser} sx={{ mt: 1, ml: 3, color: 'primary.text' }}>Entrar</Button>
            </Box>
          </Modal>
        )
      }
      <Dialog
        open={ usOpenDialog }
        onClose={ closeDialog }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          { "Eliminar estimados" }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Esto borrará todas las estimaciones en esta sala.
          ¿Quieres continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ closeDialog }>Cancel</Button>
          <Button variant="contained" color="error" onClick={ () => {

            closeDialog();
            deleteEstimates( room );

          } } autoFocus>
            continuar
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={ usOpenDialogPlayers }
        onClose={ closeDialogPlayers }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          { "Limpiar sala" }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Esto despejará la sala, por lo tanto, eliminará todos los usuarios y estimaciones.
          ¿Quieres continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ closeDialogPlayers }>Cancel</Button>
          <Button variant="contained" color="error" onClick={ () => {

            closeDialogPlayers();
            deleteEstimates( room );
            deletePlayers( room );

          } } autoFocus>
            continuar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={ onCloseNoti } open={ openNoti } autoHideDuration={3000} >
          <Alert severity="error" sx={{ width: '100%' }}>
              Name is required.
          </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={ onCloseNotiCopy } open={ openNotiCopy } autoHideDuration={3000} >
          <Alert severity="success" sx={{ width: '100%' }}>
              Se copió en el portapapeles.
          </Alert>
      </Snackbar>

      </main>

      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="http://softnet.com.mx/softnet/">
            Softnet
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </>

  )
}
