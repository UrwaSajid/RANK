import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ColorModeSelect from '../theme/ColorModeSelect';
import { SitemarkIcon } from '../components/CustomIcons';
import CircularProgress from '@mui/material/CircularProgress';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
  background: 'linear-gradient(145deg, #242a37 10%, #42456e 100%)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
}));

const VerifyContainer = styled(Stack)(({ theme }) => ({
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

const OtpInput = styled(TextField)(({ theme }) => ({
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
    color: 'var(--text-light)',
    fontSize: '1.5rem',
    textAlign: 'center',
    letterSpacing: '0.5rem',
    padding: '0.75rem'
  }
}));

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [resendLoading, setResendLoading] = React.useState(false);
  const [countdown, setCountdown] = React.useState(60);
  const [canResend, setCanResend] = React.useState(false);

  React.useEffect(() => {
    // Get userId from state
    if (location.state?.userId) {
      setUserId(location.state.userId);
    } else {
      // If userId is not provided, redirect to signup
      navigate('/signup');
    }
    
    // Set countdown timer for resend button
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Clear timer on unmount
    return () => clearInterval(timer);
  }, [location.state, navigate]);

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 6) {
      setOtp(value);
      setError('');
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, otp })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify OTP');
      }
      
      // OTP verified successfully, redirect to signin
      navigate('/signin', { state: { verified: true } });
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setResendLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP');
      }
      
      // Reset countdown and disable resend button
      setCanResend(false);
      setCountdown(60);
      
      // Start countdown timer again
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <VerifyContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon sx={{ fontSize: 50, mb: 1, alignSelf: 'center', color: '#cbccfa' }} />
          <Typography
            component="h1"
            variant="h4"
            sx={{ 
              width: '100%', 
              fontSize: 'clamp(1.75rem, 10vw, 2rem)', 
              textAlign: 'center',
              fontWeight: 700,
              letterSpacing: '0.5px',
              background: 'linear-gradient(90deg, #cbccfa 0%, #535bf2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Email Verification
          </Typography>
          
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'var(--text-light)' }}>
            We've sent a verification code to your email. Please enter the 6-digit code to verify your account.
          </Typography>
          
          <Box sx={{ mt: 2, mb: 1 }}>
            <OtpInput
              fullWidth
              placeholder="******"
              value={otp}
              onChange={handleOtpChange}
              error={!!error}
              helperText={error}
              inputProps={{ maxLength: 6 }}
            />
          </Box>
          
          <Button
            fullWidth
            variant="contained"
            onClick={verifyOtp}
            disabled={loading || otp.length !== 6}
            sx={{
              background: 'linear-gradient(90deg, #535bf2 0%, #42456e 100%)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(90deg, #4349d8 0%, #383c60 100%)',
              }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify'}
          </Button>
          
          <Typography variant="body2" sx={{ textAlign: 'center', mt: 2, color: 'var(--text-light)' }}>
            Didn't receive the code?
          </Typography>
          
          <Button
            variant="text"
            onClick={resendOtp}
            disabled={!canResend || resendLoading}
            sx={{
              color: canResend ? '#cbccfa' : 'rgba(203, 204, 250, 0.5)',
              '&:hover': {
                color: canResend ? '#535bf2' : 'rgba(203, 204, 250, 0.5)',
              }
            }}
          >
            {resendLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : canResend ? (
              'Resend Code'
            ) : (
              `Resend in ${countdown}s`
            )}
          </Button>
        </Card>
      </VerifyContainer>
    </>
  );
}