import React, { FormEvent } from 'react'
import { useState   } from 'react'

import './home.css'
import {BsSearch } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {

  const [input, setInput] = useState("")

  const navigate = useNavigate()
  
  function handleSubmit(e: FormEvent){
    e.preventDefault()

    if(input === "")return

    navigate(`/detail/${input}`)
  }

  function handleGetMore(){
    alert("teste")
  }

  return (
    <main className='main-container'>
      <form className="form" onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder='Digite o nome da moeda: Ex. Bitcoin'
        value={input}
        onChange={ (e) => setInput(e.target.value)}
        />
        <button type='submit'>
          <BsSearch size={30} color='#FFF'/>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope='col'>Moeda</th>
            <th scope='col'>Valor Mercado</th>
            <th scope='col'>Preço</th>
            <th scope='col'>Volume</th>
            <th scope='col'>Mudança 24h</th>
          </tr>
        </thead>
        <tbody id='tbody'>
            <tr className='tr'>

              <td className='tdLabel' data-label= "Moeda">
                <div className="name">
                  <Link to= {"/detail/bitcoin"}>
                    <span>Bitcoin</span> | BTC
                  </Link>
                </div>
              </td>

              <td className='tdLabel' data-label= "Valor Mercado">
                1T
              </td>

              <td className='tdLabel' data-label= "Preço">
                8.000
              </td>

              <td className='tdLabel' data-label= "Volume">
                2B
              </td>

              <td className='tdProfit' data-label= "Mudança 24h">
                <span >1.20</span>
              </td>

            </tr>
        </tbody>
      </table>

    <button className="buttonMore" onClick={handleGetMore}>
      Carregar mais...
    </button>

    </main>
  )
}

export default Home
