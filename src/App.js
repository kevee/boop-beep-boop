import React, { useState, useEffect, useRef } from 'react'
import './App.css'

const colors = [
  '#9C4BE3',
  '#E3261E',
  '#CFE31E',
  '#4BE37C',
  '#E3921E',
  '#1E31E3',
  '#1EE3E3',
  '#871199',
  '#187899',
  '#119979',
]

const labels = [
  { time: 400, label: 'boop' },
  { time: 350, label: 'beep' },
  { time: 200, label: 'boop' },
  { time: 200, label: 'bee' },
  { time: 150, label: 'boo' },
  { time: 150, label: 'boo' },
  { time: 150, label: 'boo' },
  { time: 200, label: 'beep' },
  { time: 300, label: 'boop' },
  { time: 400, label: 'boop' },
]

const BoopBoop = () => {
  const [label, setLabel] = useState(0)

  useEffect(() => {
    if (typeof labels[label] === 'undefined') {
      return
    }
    setTimeout(() => {
      setLabel(label + 1)
    }, labels[label].time)
  }, [label])

  if (typeof labels[label] === 'undefined') {
    return null
  }
  return (
    <div
      className="boop"
      style={{
        background: colors[Math.floor(Math.random() * colors.length)],
      }}
    >
      <p
        style={{
          transform: `rotate(${Math.floor(Math.random() * 360)}deg)`,
          fontSize: `${Math.floor(Math.random() * 10)}rem`,
        }}
      >
        {labels[label].label}
      </p>
    </div>
  )
}

const App = () => {
  const [boop, setBoop] = useState(false)
  const videoRef = useRef(false)

  useEffect(() => {
    videoRef.current.addEventListener('ended', (event) => {
      setBoop(false)
    })
  }, [])
  return (
    <div className={`app ${boop ? 'playing' : 'not-playing'}`}>
      {boop ? (
        <BoopBoop />
      ) : (
        <div className="container">
          <button
            onClick={(event) => {
              event.preventDefault()
              setBoop(true)
              videoRef.current.play()
            }}
          >
            boop
          </button>
        </div>
      )}
      <video src="/boop.mp4" ref={videoRef} playsInline />
    </div>
  )
}

export default App
