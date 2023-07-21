import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  const buttonStyle = {
    backgroundColor: props.bgColor ? props.bgColor : '#4C4C6D',
    color: '#fdfdfd',
    borderRadius: '0.5rem',
    textTransform: 'none',
    padding: '0.8rem 1.5rem',
    fontWeight: 'bold',
    width: props.buttonWidth ? props.buttonWidth : '12rem',
    fontSize: '1rem',
  }

  return (
    <div style={{ marginTop: 30, marginBottom: 20 }}>
      <div style={hideWhenVisible}>
        <Button
          style={buttonStyle}
          variant="contained"
          disableElevation
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <Button variant="text" onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  )
})
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  buttonWidth: PropTypes.string,
}

Togglable.displayName = 'Togglable'

export default Togglable
