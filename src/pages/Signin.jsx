import * as React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from '../components/ForgotPassword';
import ColorModeSelect from '../theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from '../components/CustomIcons';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
  background: 'linear-gradient(145deg, #242a37 10%, #42456e 100%)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: '100vh',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage: 'linear-gradient(135deg, #1c2231 0%, #363e62 100%)',
    backgroundRepeat: 'no-repeat',
  },
}));

const GoogleButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ffffff',
  color: '#757575',
  '&:hover': {
    backgroundColor: '#f1f1f1',
    color: '#000000',
  },
  border: '1px solid #dadce0',
}));

const FacebookButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1877f2',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#166fe5',
  },
  border: 'none',
}));

const StyledLink = styled(Link)({
  transition: 'all 0.3s ease',
  color: '#cbccfa',
  textDecoration: 'none',
  '&:hover': {
    color: '#535bf2',
    textDecoration: 'none',
    transform: 'translateY(-2px)',
  },
});

export default function SignIn() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateInputs();
    
    if (isValid) {
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
      // Simulate successful login
      navigate('/');
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <SitemarkIcon sx={{ fontSize: 50, mb: 1, alignSelf: 'center', color: '#cbccfa' }} />
          <Typography
            component="h1"
            variant="h4"
            sx={{ 
              width: '100%', 
              fontSize: 'clamp(2rem, 10vw, 2.15rem)', 
              textAlign: 'center',
              fontWeight: 700,
              letterSpacing: '0.5px',
              background: 'linear-gradient(90deg, #cbccfa 0%, #535bf2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email" sx={{ color: '#cbccfa' }}>Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: 'rgba(203, 204, 250, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(203, 204, 250, 0.6)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#535bf2',
                    }
                  },
                  '& .MuiInputBase-input': {
                    color: 'var(--text-light)'
                  }
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password" sx={{ color: '#cbccfa' }}>Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: 'rgba(203, 204, 250, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(203, 204, 250, 0.6)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#535bf2',
                    }
                  },
                  '& .MuiInputBase-input': {
                    color: 'var(--text-light)'
                  }
                }}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" sx={{ color: '#cbccfa' }} />}
              label="Remember me"
              sx={{ color: 'var(--text-light)' }}
            />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                background: 'linear-gradient(90deg, #535bf2 0%, #42456e 100%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(90deg, #4349d8 0%, #383c60 100%)',
                }
              }}
            >
              Sign in
            </Button>
            <StyledLink
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Forgot your password?
            </StyledLink>
          </Box>
          <Divider sx={{ my: 2, '&::before, &::after': { borderColor: 'rgba(203, 204, 250, 0.3)' } }}>
            <Typography sx={{ color: '#cbccfa' }}>or</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <GoogleButton
              fullWidth
              onClick={() => console.log('Google sign-in')}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </GoogleButton>
            <FacebookButton
              fullWidth
              onClick={() => console.log('Facebook sign-in')}
              startIcon={<FacebookIcon />}
            >
              Sign in with Facebook
            </FacebookButton>
            <Typography sx={{ textAlign: 'center', mt: 2, color: 'var(--text-light)' }}>
              Don&apos;t have an account?{' '}
              <StyledLink
                component={RouterLink}
                to="/signup"
                variant="body2"
              >
                Sign up
              </StyledLink>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}