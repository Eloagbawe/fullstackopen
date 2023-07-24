import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const LoginForm = ({
  handleLogin,
  setUsername,
  setPassword,
  username,
  password,
}) => {
  return (
    <div style={{ width: '35%' }} className="">
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin} className="mt-5">
        <Form.Group className="my-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            id="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button
          className="my-4 px-4"
          style={{ backgroundColor: '#27374D', border: 'none' }}
          id="login-button"
          type="submit"
        >
          login
        </Button>
      </Form>
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
