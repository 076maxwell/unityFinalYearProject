import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, StatusBar} from 'react-native';
import Weather from '../components/Weatherfunct';
import Search from '../components/Search';
import Layout from "../components/Layout";
import Header from "../components/WeatherHeaher";

const API_KEY = "85b81bb9c30a5b9b4baca0e3ded8880e";


function CityWise({ navigation }) {
    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(true);

    async function fetchWeatherData(cityName) {
        setLoaded(false);
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
        try {
            const response = await fetch(API);
            if(response.status == 200) {
                const data = await response.json();
                setWeatherData(data);
            } else {
                setWeatherData(null);
            }
            setLoaded(true);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchWeatherData('Mankoeng');
    }, [])
    

    if(!loaded) {
        return (
            <><StatusBar backgroundColor='darkgray' />
            <View style={styles.container}>
                <ActivityIndicator color='grey' size={36} />
            </View></>

        )
    }

    else if(weatherData === null) {
        return (
            <Layout>
               <StatusBar backgroundColor='darkgray' /> 
                <Header navigation={navigation} title="Weather" style={{backgroundColor: 'blue',}} />
                    <View style={styles.container}>
                        <Search fetchWeatherData={fetchWeatherData}/>
                        <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
                    </View>
            </Layout>
            
        )
    }

    return (
        <Layout> 
             <Header navigation={navigation} title="Weather" />
                <View style={styles.container}>
                    <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData}  />
                </View>
        </Layout>
           
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#407ad6',
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryText: {
        margin: 20,
        fontSize: 28
    }
  });

export default CityWise
