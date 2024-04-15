import { createTheme } from "@mui/material";
import { red } from '@mui/material/colors';

export const softnetTheme = createTheme({
    palette: {
        primary: {
            main: '#F68626',
            text: '#FFF',
            textContent: '#7E7D80'
        },
        secondary: {
            main: '#543884'
        },
        error: {
            main: red.A400
        }
    },
    typography: {
        color: '#FFF'
    }
});