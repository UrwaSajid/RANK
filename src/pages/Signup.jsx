import * as React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ColorModeSelect from '../theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from '../components/CustomIcons';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: '2rem auto',
  marginBottom: '2rem',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
  background: 'linear-gradient(145deg, #242a37 10%, #42456e 100%)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh', // Changed from height: '100vh'
  padding: theme.spacing(2),
  paddingBottom: theme.spacing(4),
  overflow: 'auto', // Add overflow auto
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'fixed', // Changed from absolute to fixed
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

export default function SignUp() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [serverError, setServerError] = React.useState('');

  const validateInputs = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;

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

    if (!name || name.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateInputs();

    if (isValid) {
      setLoading(true);
      setServerError('');

      const data = new FormData(event.currentTarget);
      const userData = {
        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
      };

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Registration failed');
        }

        navigate('/verify-otp', { state: { userId: result.userId } });
      } catch (error) {
        setServerError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
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
              WebkitTextFillColor: 'transparent',
            }}
          >
            Sign up
          </Typography>

          {serverError && (
            <Alert severity="error" sx={{ mt: 2, mb: 0 }}>
              {serverError}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name" sx={{ color: '#cbccfa' }}>
                Full name
              </FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Jon Snow"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
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
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'var(--text-light)',
                  },
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email" sx={{ color: '#cbccfa' }}>
                Email
              </FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
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
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'var(--text-light)',
                  },
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password" sx={{ color: '#cbccfa' }}>
                Password
              </FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
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
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'var(--text-light)',
                  },
                }}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" sx={{ color: '#cbccfa' }} />}
              label="I want to receive updates via email."
              sx={{ color: 'var(--text-light)' }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                background: 'linear-gradient(90deg, #535bf2 0%, #42456e 100%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(90deg, #4349d8 0%, #383c60 100%)',
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign up'}
            </Button>
          </Box>
          <Divider sx={{ my: 2, '&::before, &::after': { borderColor: 'rgba(203, 204, 250, 0.3)' } }}>
            <Typography sx={{ color: '#cbccfa' }}>or</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <GoogleButton
              fullWidth
              onClick={() => console.log('Google sign-up')}
              startIcon={<GoogleIcon />}
            >
              Sign up with Google
            </GoogleButton>
            <FacebookButton
              fullWidth
              onClick={() => console.log('Facebook sign-up')}
              startIcon={<FacebookIcon />}
            >
              Sign up with Facebook
            </FacebookButton>
            <Typography sx={{ textAlign: 'center', mt: 2, color: 'var(--text-light)' }}>
              Already have an account?{' '}
              <StyledLink component={RouterLink} to="/signin" variant="body2">
                Sign in
              </StyledLink>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
}