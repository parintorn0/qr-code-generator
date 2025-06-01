import React, { useState } from 'react'

import './App.css'
import { browser } from "wxt/browser"
import { useEffect } from 'react'
import QrCode from '../../components/QrCode'
import { createRef } from 'react'

export default function App() {
  const [content, setContent] = useState("None")
  const [currentTabUrl, setCurrentTabUrl] = useState("None")
  const [isCustom, setIsCustom] = useState(false)

  const changeCustom = (newIsCustom) => {
    setIsCustom(newIsCustom)
    setContent(currentTabUrl)
  }

  const getCurrentUrl = async () => {
    const [ { url }, ] = await browser.tabs.query({active: true, lastFocusedWindow: true})
    setContent(url)
    setCurrentTabUrl(url)
  }

  const changeContent = (value) => {
    setContent(value)
  }

  useEffect(()=>{
    getCurrentUrl()
  }, [])

  return (
      <div id="card">
        <center>
          <QrCode text={content} />
          <div id='current-url'>
              {content.slice(0, 50)}
              {content.length > 50 && 
                <><br/>...</>
              }
          </div>
          <div class="input">
            <center>
              <button onClick={()=>changeCustom(false)} class={!isCustom?"active":""}>
                Current URL
              </button>
              <button onClick={()=>changeCustom(true)} class={isCustom?"active":""}>
                Custom Text
              </button>
            </center>
            {isCustom && 
              <center>
                <input value={content} onChange={(e)=>changeContent(e.target.value)} type="url" />
              </center>
            }
              
          </div>
        </center>
      </div>
  );
}
