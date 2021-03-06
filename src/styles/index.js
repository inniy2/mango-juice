export const navStyles = theme => ({
    root: {
      flexGrow: 1
    },
    flex: {
      flex: 1
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    },
    toolbarMargin: theme.mixins.toolbar
  });

export const ghostStyles = theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary
    },
    button: {
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 20,
    },
    textField: {
      marginTop: 10,
    },
    span: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary
    },
    modal: {
      position: 'absolute',
      width: 400,
      //backgroundColor: theme.palette.text.paper,
      backgroundColor: '#ffffff90',
      // border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: `25%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    },
  });

export const navMateStyles = theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    link: {
      color: 'inherit',
      textDecoration: 'none',
    },
  });

export const footerStyles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      background: '#5500FF',
    },
  });

export const loginStyles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      marginTop: 15,
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    textfield: {
      marginTop: 10,
    },
    button: {
      marginTop: 20,
      marginBottom: 500,
    },
  });

export const modalStyles = theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});