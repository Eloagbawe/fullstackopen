import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'

const LoginForm = ({
  handleLogin,
  setUsername,
  setPassword,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Log in to Blog Application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <Box
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
          >
            <TextField
              label="Username"
              variant="outlined"
              style={{ width: '30%', margin: '1.5rem 0' }}
              type="text"
              id="username"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </Box>
        </div>
        <div>
          <Box
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
          >
            <TextField
              label="Password"
              variant="outlined"
              style={{ width: '30%', margin: '1.5rem 0' }}
              type="password"
              id="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Box>
        </div>
        <Button
          variant="contained"
          style={{ width: '10rem', margin: '1rem 0' }}
          id="login-button"
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  )
}
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}
export default LoginForm
