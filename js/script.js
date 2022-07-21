const input = document.querySelector('.header__input');
const btn = document.querySelector('.header__btn');
const cityName = document.querySelector('.section-mid__icon--city');
const temperature = document.querySelector('.temperature');
const minTemp = document.querySelector('.min');
const maxTemp = document.querySelector('.max');
const feelLike = document.querySelector('.feel-like');
const pressure = document.querySelector('.pressure');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
const text = document.querySelector('.section-mid__icon--text');
const body = document.querySelector('body');
const picture = document.querySelector('.wheather-picture');
const title = document.querySelector('.title');
const error = document.querySelector('.error');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=a51e1a82f22fe38141417754134f8f54';
const API_UNITS = '&units=metric';

// searchWeather()

const searchWeather = () => {
	if (input.value === '') {
		error.style.visibility = 'visible';
	} else {
		error.style.visibility = 'hidden';
		const city = input.value;
		input.value = '';
		cityName.textContent = city;
		const URL = API_LINK + city + API_KEY + API_UNITS;
		fetch(URL)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				const temp = data.main.temp;
				temperature.textContent = Math.floor(temp) + '°C';
				maxTemp.textContent = Math.floor(data.main.temp_max) + '°C';
				minTemp.textContent = Math.floor(data.main.temp_min) + '°C';
				feelLike.textContent = Math.floor(data.main.feels_like) + '°C';
				pressure.textContent = data.main.pressure + ' hPa';
				humidity.textContent = data.main.humidity + '%';
				windSpeed.textContent = data.wind.speed + ' m/h';

				if (data.weather[0].id === 800 && temp >= 30) {
					text.textContent = 'Clear Sky';
					body.classList.add('clear-hot');
					body.classList.remove('clouds');
					body.classList.remove('clear');
					body.classList.remove('mist');
					body.classList.remove('snow');
					body.classList.remove('rain');
					body.classList.remove('drizzle');
					body.classList.remove('thunderstorm');
					picture.setAttribute('src', 'img/icons/sun.png');
					title.style.color = '#fff';
				} else if (data.weather[0].id > 800) {
					text.textContent = 'Clouds';
					body.classList.add('clouds');
					body.classList.remove('clear');
					body.classList.remove('mist');
					body.classList.remove('snow');
					body.classList.remove('rain');
					body.classList.remove('drizzle');
					body.classList.remove('thunderstorm');
					body.classList.remove('clear-hot');
					picture.setAttribute('src', 'img/icons/cloud.png');
					title.style.color = '#fff';
				} else if (data.weather[0].id === 800) {
					text.textContent = 'Clear Sky';
					body.classList.add('clear');
					body.classList.remove('clouds');
					body.classList.remove('mist');
					body.classList.remove('snow');
					body.classList.remove('rain');
					body.classList.remove('drizzle');
					body.classList.remove('thunderstorm');
					body.classList.remove('clear-hot');
					picture.setAttribute('src', 'img/icons/sun.png');
					title.style.color = '#fff';
				} else if (data.weather[0].id < 800 && data.weather[0].id >= 700) {
					text.textContent = 'Fog';
					body.classList.add('mist');
					body.classList.remove('clouds');
					body.classList.remove('clear');
					body.classList.remove('snow');
					body.classList.remove('rain');
					body.classList.remove('drizzle');
					body.classList.remove('thunderstorm');
					body.classList.remove('clear-hot');
					picture.setAttribute('src', 'img/icons/fog.png');
					title.style.color = '#333';
				} else if (data.weather[0].id < 700 && data.weather[0].id >= 600) {
					text.textContent = 'Snow';
					body.classList.add('snow');
					body.classList.remove('clouds');
					body.classList.remove('clear');
					body.classList.remove('mist');
					body.classList.remove('rain');
					body.classList.remove('drizzle');
					body.classList.remove('thunderstorm');
					body.classList.remove('clear-hot');
					picture.setAttribute('src', 'img/icons/ice.png');
					title.style.color = '#333';
				} else if (data.weather[0].id < 600 && data.weather[0].id >= 500) {
					text.textContent = 'Rain';
					body.classList.add('rain');
					body.classList.remove('clouds');
					body.classList.remove('clear');
					body.classList.remove('mist');
					body.classList.remove('snow');
					body.classList.remove('drizzle');
					body.classList.remove('thunderstorm');
					body.classList.remove('clear-hot');
					picture.setAttribute('src', 'img/icons/rain.png');
					title.style.color = '#333';
				} else if (data.weather[0].id < 400 && data.weather[0].id >= 300) {
					text.textContent = 'Drizzle';
					body.classList.add('drizzle');
					body.classList.remove('clouds');
					body.classList.remove('clear');
					body.classList.remove('mist');
					body.classList.remove('snow');
					body.classList.remove('rain');
					body.classList.remove('thunderstorm');
					body.classList.remove('clear-hot');
					picture.setAttribute('src', 'img/icons/drizzle.png');
					title.style.color = '#333';
				} else if (data.weather[0].id < 300 && data.weather[0].id >= 200) {
					text.textContent = 'Thunderstorm';
					body.classList.add('thunderstorm');
					body.classList.remove('clouds');
					body.classList.remove('clear');
					body.classList.remove('mist');
					body.classList.remove('snow');
					body.classList.remove('rain');
					body.classList.remove('drizzle');
					body.classList.remove('clear-hot');
					picture.setAttribute('src', 'img/icons/thunderstorm.png');
					title.style.color = '#fff';
				}
			});
	}
};

btn.addEventListener('click', searchWeather);
document.addEventListener('keyup', e => {
	if (e.key == 'Enter') {
		searchWeather();
	}
});
