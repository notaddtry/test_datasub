import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  overrides: {
    FilledInput: {
      root: {
        backgroundColor: '#ff0',
        '&:hover': {
          backgroundColor: '#ff8',
        },
        '&$focused': {
          backgroundColor: '#dfb',
        },
      },
      underline: {
        '&:before': {
          borderBottomColor: 'red',
        },
        '&:hover:not(.Mui-focused):before': {
          borderBottomColor: 'green',
        },
        '&:after': {
          // focused
          borderBottomColor: 'purple',
        },
      },
    },
    InputLabel: {
      filled: {
        color: 'purple',
        '&$focused': {
          color: 'green',
        },
        '.MuiFormControl-root:hover &:not($focused)': {
          color: 'red',
        },
      },
    },
  },
})

export default theme
