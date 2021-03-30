fetch('https://restcountries.eu/rest/v2/region/europe')
    .then(res => res.json())
    .then(data => {

        const input_options = document.getElementById("cities")
        data.forEach(country => {
            const input_option = document.createElement("option")
            // var option_value = `city=${country.capital}&country=${country.alpha2Code}`
            
            var option_value = `${country.capital},${country.alpha2Code}`

            input_option.setAttribute("value", option_value)
            input_options.appendChild(input_option)
        });
    })

function display_weather() {
    var selected_city = document.getElementById("city").value.toLowerCase()
    
    var split_key = selected_city.split(",")
    var city = split_key[0]
    var country_code = split_key[1]
    city = city.split(" ").join("-")

    fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&country=${country_code}&key=03bd4cea8e164553819c5cfaba49bbc3`)
        .then(res => res.json())
        .then(data => {
            get_results(data)
            reset_top_bar()
        })
        .catch(err => console.log(err))
}

function get_results(data) {

    const weather_img_url = `https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png`
    const result_image = document.createElement("img")
    result_image.setAttribute("src", weather_img_url)

    const result_city = document.createElement("h3")
    result_city.innerText = data.data[0].city_name + ", " + data.data[0].country_code
    
    const result_desc =  document.createElement("h5")
    result_desc.innerText = data.data[0].weather.description

    const result_temp = document.createElement("h5")
    result_temp.innerText = Math.floor(data.data[0].temp) + "˚C"

    const result_atemp = document.createElement("p")
    result_atemp.innerText = `Apparent temperature: ${Math.floor(data.data[0].app_temp)}˚C`
    
    const result_wind = document.createElement("p")
    result_wind.innerText = `Wind speed: ${data.data[0].wind_spd.toFixed(1)}m/s`

    const result_hum = document.createElement("p")
    result_hum.innerText = `Humidity: ${data.data[0].rh.toFixed(0)}%`

    const result_precip = document.createElement("p")
    result_precip.innerText = `Precipitation: ${data.data[0].precip.toFixed(0)}mm`

    const result_remove = document.createElement("button")
    result_remove.innerText = "x"
    result_remove.classList.add("remove")
    result_remove.title = "Remove this result"
    result_remove.addEventListener("click", () => {
        remove_result(result_remove.parentElement)
    })

    const card = document.createElement("div")
    card.classList.add("card")
    card.appendChild(result_image)
    card.appendChild(result_city)
    card.appendChild(result_desc)
    card.appendChild(result_temp)
    card.appendChild(result_atemp)
    card.appendChild(result_wind)
    card.appendChild(result_hum)
    card.appendChild(result_precip)
    card.appendChild(result_remove)

    document.getElementById("container").style.justifyContent = "start"
    const results = document.getElementById("results")
    results.appendChild(card)

    // add_remove_functionality()
}

function reset_top_bar() {
    document.getElementById("city").value = ""
}

function remove_result(el) {
    el.remove()
}

function add_remove_functionality() {

    var remove_buttons = new Array()
    remove_buttons = document.querySelectorAll(".remove")
    
    remove_buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            console.log("this")
        })
    })
}