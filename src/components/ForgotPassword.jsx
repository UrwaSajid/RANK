import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ForgotPassword({ open, handleClose }) {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError(true);
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Placeholder for actual password reset functionality
    console.log('Password reset requested for:', email);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setEmail('');
    setError(false);
    setErrorMessage('');
    setIsSubmitted(false);
    handleClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          backgroundImage: 'linear-gradient(145deg, #242a37 10%, #42456e 100%)',
          color: 'text.primary',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }
      }}
    >
      {!isSubmitted ? (
        <>
          <DialogTitle sx={{ 
            fontWeight: 600,
            background: 'linear-gradient(90deg, #cbccfa 0%, #535bf2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Reset Password
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: 'var(--text-light)', opacity: 0.9 }}>
              To reset your password, please enter your email address. We will send you
              instructions on how to reset your password.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="reset-email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) {
                  setError(false);
                  setErrorMessage('');
                }
              }}
              error={error}
              helperText={errorMessage}
              sx={{ 
                mt: 2,
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
                },
                '& .MuiInputLabel-root': { 
                  color: '#cbccfa',
                  '&.Mui-focused': {
                    color: '#535bf2'
                  }
                }
              }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2, pt: 0 }}>
            <Button 
              onClick={handleClose} 
              variant="outlined"
              sx={{ 
                color: '#cbccfa',
                borderColor: 'rgba(203, 204, 250, 0.3)',
                '&:hover': {
                  borderColor: 'rgba(203, 204, 250, 0.8)',
                  backgroundColor: 'rgba(203, 204, 250, 0.04)'
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              variant="contained"
              sx={{
                background: 'linear-gradient(90deg, #535bf2 0%, #42456e 100%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(90deg, #4349d8 0%, #383c60 100%)',
                }
              }}
            >
              Send Reset Link
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle sx={{ 
            fontWeight: 600,
            background: 'linear-gradient(90deg, #cbccfa 0%, #535bf2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Email Sent
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: 'var(--text-light)', opacity: 0.9 }}>
              If an account exists with the email {email}, you will receive password reset
              instructions shortly. Please check your email.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ p: 2, pt: 0 }}>
            <Button 
              onClick={handleReset} 
              variant="contained"
              sx={{
                background: 'linear-gradient(90deg, #535bf2 0%, #42456e 100%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(90deg, #4349d8 0%, #383c60 100%)',
                }
              }}
            >
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}