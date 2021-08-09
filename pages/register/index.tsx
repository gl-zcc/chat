import React, { useState } from 'react';
import Copyright from '../components/copyright';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import http from '../components/http';
import router from 'next/router';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Alart as AlartType } from '../../src/type'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export interface State extends SnackbarOrigin {
  open: boolean;
}

export default function SignUp() {
  const classes = useStyles();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [snack, setSnack] = useState<AlartType>({ open: false, msg: '', severity: 'success' });
  const [btnState, setBtnState] = useState({ disabled: false, text: '注册' });

  async function register() {
    setBtnState({
      disabled: true,
      text: '注册中...'
    })
    let result = await http.post('api/auth/register', { userName, password });
    if (result.data.success) {
      setSnack({
        open: true,
        msg: result.data.msg,
        severity: 'success'
      })
    } else {
      setSnack({
        open: true,
        msg: result.data.msg,
        severity: 'error'
      })
    }
    setBtnState({
      disabled: false,
      text: '注册'
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          注册
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                value={userName} onChange={(event) => setUserName(event.target.value)}
                label="用户名"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="密码"
                type="password"
                id="password"
                value={password} onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={btnState.disabled}
            onClick={register}
            className={classes.submit}
          >
            {btnState.text}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                已有账号? 登录
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      <Snackbar
        open={snack.open}
        message={snack.msg}
        autoHideDuration={2000}
        onClose={() => {
          router.push('/login', '', { shallow: true })
        }}
      >
        <Alert severity={snack.severity}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </Container>
  );
}