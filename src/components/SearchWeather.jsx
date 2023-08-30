import React, { useEffect, useState } from 'react'

const SearchWeather = () => {
    const [search,setSearch] = useState('london')
    const [input,setInput] = useState('')
    const [data,setData] = useState([])

    let componentMounted = true;
    // 
    useEffect(() => {
        const fetchWeather = async() => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=71fca08984728f26fd8e02973f0c5fd4`)
            if(componentMounted){
                setData(await response.json())
                console.log(response.json())
            }
            return () => {
                componentMounted = false
            }
        }
        fetchWeather()
    },[search])

    let emoji = null
    if(typeof data.main != "undefined"){
        if(data.weather[0].main == "Clouds"){
            emoji = 'fa-cloud'
        }else if(data.weather[0].main == "Thunderstorm"){
            emoji = 'fa-bolt'
        }else if(data.weather[0].main == "Drizz"){
            emoji = 'fa-cloud-main'
        }else if(data.weather[0].main == "Rain"){
            emoji = 'fa-cloud-shower-heavy'
        }else if (data.weather[0].main == "Snow"){
            emoji = 'fa-snow-flake'
        }else{
            emoji = 'fa-smog'
        }
    }else{
        return (
            <div>
                ...loading
            </div>
        )
    }

    let temp = (data.main.temp -273.15).toFixed(2)
    let temp_min = (data.main.temp_min -273.15).toFixed(2)
    let temp_max = (data.main.temp_max -273.15).toFixed(2)


    // Date 
    let d = new Date()
    let date = d.getDate()
    let year = d.getFullYear()
    let month = d.toLocaleString('default',{month:'long'})
    let day = d.toLocaleString('default',{weekday:'long'})

    // Time 
    let time = d.toLocaleString([],{
        hour:'2-digit',
        minute : '2-digit',
        second: '2-digit'
    })

    const handleSubmit =(e) => {
        e.preventDefault()
        setSearch(input)
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div class="card text-white text-center border-0">
                            <img src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`} class="card-img" alt="..." />
                            <div class="card-img-overlay">
                                <form action="" onSubmit={handleSubmit}>
                                    <div class="input-group mb-4 w-75 mx-auto">
                                        <input type="text" class="form-control"name="search" value={input} onChange={(e) => setInput(e.target.value)} required placeholder='Enter location' />
                                        <button type="submit" class="input-group-text">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                </form>
                                <div className="bg-dark bg-opacity-50 py-3">
                                    <h2 class="card-title">{data.name}</h2>
                                    <p class="card-text">
                                        {day}, {month} {date},{year}
                                        <br />
                                        {time}
                                    </p>
                                    <hr />
                                    <i className={`fas ${emoji} fa-4x`}></i>
                                    <h1 className="fw-bolder mb-5">{temp}&deg;C</h1>
                                    <p className="lead md-0">{data.weather[0].main}</p>
                                    <p className="lead">{temp_min}&deg;C | {temp_max}&deg;C</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchWeather
