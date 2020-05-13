import React, {useState} from 'react';

const api = {
    key: "b835cbcde695ddde0098872d1af1b8d9",
    base: "https://api.openweathermap.org/data/2.5/",

}

const App = () => {

    const [query, setQuery] =useState('');
    const [weather, setWeather] =useState({});

    const search = e => {
        if(e.key === "Enter"){
            fetch(`${api.base}weather?q=${query}&inits=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                });
        }
    }

    const dateBuilder = (d) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September' , 'October', 'November', 'December'];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 299 )? 'App warm' : 'App'): 'App' }>
      <main>
          <div className="search-box">
             <input
                 type="text"
                 className="search-bar"
                 placeholder="search..."
                onChange={e => setQuery(e.target.value)}
                value={query}
             onKeyPress={search}/>
          </div>
          {(typeof weather.main != "undefined") ?
             ( <div>
              <div>
                  <div className="location-box">
                      <div className="location">{weather.name} {weather.sys.country}</div>
                      <div className="date">{dateBuilder(new Date())}</div>
                  </div>
              </div>
              <div className="weather-box">
                  <div className="temp">
                      {Math.round(weather.main.temp)-273} c
                  </div>
                  <div className="weather">
                      {weather.weather[0].main}
                  </div>
              </div>
          </div>) : ('')}
      </main>
    </div>
  );
}

export default App;
