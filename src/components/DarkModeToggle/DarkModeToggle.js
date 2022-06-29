import React, { useState, useEffect } from 'react'
import '../../dark-theme.css'
import '../../light-theme.css'
import '../../index.css'

const DarkModeToggle = () => {
  const [checked, setChecked] = useState(
    localStorage.getItem('theme') === 'dark' ? true : false
  )
  useEffect(() => {
    document
      .getElementsByTagName('HTML')[0]
      .setAttribute('data-theme', localStorage.getItem('theme'))
  }, [])

  const toggleThemeChange = () => {
    if (checked === false) {
      localStorage.setItem('theme', 'dark')
      document
        .getElementsByTagName('HTML')[0]
        .setAttribute('data-theme', localStorage.getItem('theme'))
      setChecked(true)
    } else {
      localStorage.setItem('theme', 'light')
      document
        .getElementsByTagName('HTML')[0]
        .setAttribute('data-theme', localStorage.getItem('theme'))
      setChecked(false)
    }
  }

  return (
    <label className='switch'>
      <input
        type='checkbox'
        defaultChecked={checked}
        onChange={() => toggleThemeChange()}
      />
      <span className='slider round' />
    </label>
  )
}

export default DarkModeToggle

/* 

<label className='toggle-dark-mode-switch'>
      <button
        type='checkbox'
        defaultChecked={checked}
        onClick={() => toggleThemeChange()}
      >
        {localStorage.theme == 'light' ? (
          <span className='toggle-dark-mode-switch-text'>light</span>
        ) : (
          <span className='toggle-dark-mode-switch-text'>night</span>
        )}
      </button>

    </label>
*/
