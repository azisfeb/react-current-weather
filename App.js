import React from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';

import { DangerZone } from 'expo'
const { Lottie } = DangerZone

import { API_KEY } from "./utils/weatherAPIKey";

import Weather from "./components/Weather";

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    error: null
  };

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude)
      },
      error => {
        this.setState({
          error: 'Error Getting Weather conditions'
        })
      }
    )
  }

  fetchWeather(lat, long){
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}&units=metric`
    )
    .then(res => res.json())
    .then(json => {
      this.setState({
        temperature: json.main.temp,
        weatherCondition: json.weather[0].main,
        isLoading: false
      })
    })
  }

  render() {
    const { isLoading, weatherCondition, temperature } = this.state
    return(
      <View style={styles.container}>
        {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Fething weather...</Text>
            </View>
          ) : (
            <Weather weather={weatherCondition} temperature={temperature} />
          )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    backgroundColor: '#FFFDE4',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  loadingText: {
    fontSize: 30
  }
});
