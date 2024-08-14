import React, { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numAllowe, setNumAllowe] = useState(false)
  const [charAllowe, setCharAllowe] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const copyClipBoard = useCallback(() => {
    passwordRef.current?.select(password)
    window.navigator.clipboard?.writeText(password)
  }, [password])

  const passwordGenrator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(numAllowe) str += '0123456789'
    if(charAllowe) str += '!@#$%^&*()_+'
    for(let i = 1; i <= length; i++){
      let char  = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }
    setPassword(pass)
  }, [length, numAllowe, charAllowe, setPassword])

  useEffect(() => {
    passwordGenrator()
  }, [length, numAllowe, charAllowe, passwordGenrator])

  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <div className='bg-gray-700 h-auto w-1/2 p-4 text-blue-500 rounded-md'>
        <h1 className='text-center mb-3 text-xl font-bold'>Password Genrator</h1>
        <div className='flex'>
        <input type="text"
        value={password}
        ref={passwordRef}
        className='w-full p-2  focus:outline-none font-bold'
        readOnly
        />
        <button
        onClick={copyClipBoard}
        className='bg-blue-500 text-white px-4 py2'>Copy</button>
        </div>
        <div className='flex items-center'>
        <div className='flex  mt-4'>
          <input type="range"
          value={length}
          min={8}
          max={100}
          onChange={(e) => setLength(e.target.value)}
          className='mr-3 cursor-pointer focus:outline-none'
          />
          <label className='font-bold text-lg'>Length: {length}</label>
        </div>
        <div className='flex mt-4 mx-8'>
          <input type="checkbox"
          checked={numAllowe}
          id='numberInput'
          onChange={() => setNumAllowe((prev) => !prev)}
          className='cursor-pointer mr-2 '
          />
          <label htmlFor="numberInput" className='font-bold text-lg'>Numbers</label>
        </div>
        <div className='flex mt-4 '>
          <input type="checkbox"
          checked={charAllowe}
          id='charInput'
          onChange={() => setCharAllowe((prev) => !prev)}
          className='cursor-pointer mr-2 '
          />
          <label htmlFor="charInput" className='font-bold text-lg'>Character</label>
        </div>
        </div>
      </div>
    </div>
  )
}

export default App
