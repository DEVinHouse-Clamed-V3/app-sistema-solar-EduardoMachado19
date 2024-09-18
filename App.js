import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, Animated } from 'react-native';

import { planetas } from './planetas';
import Planet from './Planet';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentIndex < planetas.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      triggerShake();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      triggerShake();
    }
  };

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#00007f" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Vamos explorar</Text>
        <Image
          source={{ uri: 'https://images.vexels.com/content/152639/preview/space-astronaut-cartoon-265cf0.png' }}
          style={styles.headerImage}
        />
      </View>

      {planetas
        .slice(currentIndex, currentIndex + 1) // Apenas um planeta de cada vez
        .map((item, index) => (
          <Planet
            nome={item.nome}
            img={item.img}
            descricao={item.descricao}
            quantidadeSatelites={item.quantidadeSatelites}
            areaSuperficieKm2={item.areaSuperficieKm2}
            velocidadeOrbitalMediaKmS={item.velocidadeOrbitalMediaKmS}
            periodoRotacaoDias={item.periodoRotacaoDias}
            shakeAnimation={shakeAnimation}
          />
        ))
      }

      <View style={styles.navigationButtons}>
        <TouchableOpacity onPress={handlePrevious} style={styles.button}>
          <Text style={styles.buttonText}>Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.button}>
          <Text style={styles.buttonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#040217',
  },
  header: {
    width: '100%',
    backgroundColor: '#040217',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
  },
  headerImage: {
    width: 75,
    height: 75,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  button: {
    backgroundColor: '#00007f',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
