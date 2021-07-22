/* import Header from '../components/layout/head';
import router from 'next/router'
import { useState } from 'react'
import http from '../components/http'
import Button from '@material-ui/core/Button';


export default function About() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  async function login() {
    let result = await http.post('api/auth/login', { userName, password });
    alert(result.data.msg)
    if (result.data.success) {
      router.push('/','',{shallow:true})
    }
  }
  return (
    <div>
      <Header />
      <Button variant="contained" color="primary">
      你好，世界
    </Button>
      <input value={userName} onChange={(event) => setUserName(event.target.value)} />
      <br />
      <input type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
      <br />
      <button onClick={login}>登录</button>
    </div>
  )
}
 */

import Header from '../components/layout/head';
import Copyright from '../components/copyright';
import router from 'next/router'
import { useState } from 'react'
import http from '../components/http'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
// import Link from 'next/link'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' });

  async function login() {
    let result = await http.post('api/auth/login', { userName, password });
    if (result.data.success) {
      setSnack({
        open: true,
        msg: result.data.msg,
        severity: 'success'
      })
      router.push('/', '', { shallow: true })
    } else {
      setSnack({
        open: true,
        msg: result.data.msg,
        severity: 'error'
      })
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      {/* <Header /> */}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          登录
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="用户名"
            name="userName"
            value={userName} onChange={(event) => setUserName(event.target.value)}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={password} onChange={(event) => setPassword(event.target.value)}
            label="密码"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="记住密码"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={login}
            className={classes.submit}
          >
            登录
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                忘记密码？
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"没有账号? 注册"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar
        open={snack.open}
        message={snack.msg}
        autoHideDuration={3000}
        onClose={() => {
          setSnack({
            msg: snack.msg,
            open: false,
            severity: snack.severity
          })
        }}
      >
        <Alert severity={snack.severity}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </Container>
  );
}