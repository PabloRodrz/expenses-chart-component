import data from '../services/data.json'
import logo from '../images/logo.svg'
import './expenses.css'
import { useState } from 'react'
const Expenses = () => {
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let date = new Date();
  let dayName = days[date.getDay()].toLowerCase();
  dayName = dayName.slice(0, 3)
  const [showMoney, setShowMoney] = useState(null)
  const handleHover = (day) => {
    setShowMoney(day)
  }

  let max = 0
  for (let i = 0; i < data.length; i++) {
    if (data[i].amount > max) {
      max = data[i].amount
    }
  }

  max += 1;

  const newData = data.map(d => { return { ...d, height: Math.round((d.amount * 100 / max)) } });
  return (
    <div className='balance-container'>
      <div className="balance">
        <div>
          <span className='balance-mybalance'>My balance</span>
          <span className='balance-money'>$921.48</span>
        </div>
        <div>
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className='week-balance'>
        <h3>Spending - Last 7 days</h3>
        <div className='days'>
          {newData.map(d => {
            return <div key={d.day} className="days-days">
              <div id={d.day} className="amount"
                style={showMoney === d.day ? { display: "block" } : { visibility: "hidden" }}>
                {d.amount}</div>
              <div className="day"
                style={dayName === d.day ? { height: d.height + '%', backgroundColor: "#76B5BC" } : { height: d.height + '%', backgroundColor: "#EC775F" }}
                onMouseEnter={() => handleHover(d.day)}
                onMouseLeave={() => setShowMoney(null)}></div>
            </div>
          })}
        </div>
        <div className='nameofdays'>
          {data.map(d => {
            return <span key={d.day}>{d.day}</span>
          })}
        </div>
        <div className='line'></div>
        <div className='total'>
          <div>
            <span className='week-total'>Total this month</span>
            <span className='week-money'>$478.33</span>
          </div>
          <div>
            <span className='percentage'>+2.4%</span>
            <span className='month'>from last month</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Expenses