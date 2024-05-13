import React, { FormEvent } from 'react'
import { useState, useEffect } from 'react'

import './home.css'
import {BsSearch } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'

export interface CoinProps{
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  vwap24Hr: string;
  changePercent24Hr: string;
  rank: string;
  supply: string;
  maxSuppy: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  explorer: string;
  formatedPrice?: string; // ? = opcional(pode ou não existir)
  formatedMarket?: string; 
  formatedVolume?: string;
}

interface DataProp{
  data:CoinProps[]
}

const Home = () => {

  const [input, setInput] = useState("")
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [offset, setOffset] = useState(0);

  const navigate = useNavigate()

  useEffect(() => {
    getData()
  },[offset])

  async function getData() {
    fetch(`https://api.coincap.io/v2/assets?limit=10&offset=${offset}`)
      .then(response => response.json())
      .then((data: DataProp) => {
        const coinData = data.data;
  
        const priceFormatter = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        });
        const priceCompact = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact"
        });
  
        const formattedResult = coinData.map(item => {
          const formatted = {
            ...item,
            formatedPrice: priceFormatter.format(Number(item.priceUsd)),
            formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
            formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr))
          };

          return formatted
        });
  
        const listCoins = [...coins, ...formattedResult]
        setCoins(listCoins);
        
      });
  }
  
  function handleSubmit(e: FormEvent){
    e.preventDefault()

    if(input === "")return

    navigate(`/detail/${input}`)
  }

  function handleGetMore(){
    if(offset === 0){
      setOffset(10)
      return
    }

    setOffset(offset + 10)

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
            {coins.length > 0 && coins.map((item) => (
              <tr className='tr' key={item.id}>

              <td className='tdLabel' data-label= "Moeda">
                <div className="name">
                  <img className='cripto-logo' src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`} alt="Cripto Logo" />
                  <Link className='cripto-name' to= {`/detail/${item.id}`}>
                    <span >{item.name}</span> | {item.symbol}
                  </Link>
                </div>
              </td>

              <td className='tdLabel' data-label= "Valor Mercado">
                {item.formatedMarket}
              </td>

              <td className='tdLabel' data-label= "Preço">
                {item.formatedPrice}
              </td>

              <td className='tdLabel' data-label= "Volume">
                {item.formatedVolume}
              </td>

              <td className={Number(item.changePercent24Hr) > 0 ? "tdProfit" : "tdLoss"} data-label= "Mudança 24h">
                <span >{Number(item.changePercent24Hr).toFixed(3)}</span>
              </td>

            </tr>
            ))}
        </tbody>
      </table>

    <button className="buttonMore" onClick={handleGetMore}>
      Carregar mais...
    </button>

    </main>
  )
}

export default Home
