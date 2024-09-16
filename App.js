import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, FlatList, TouchableOpacity, StatusBar, Animated } from 'react-native';
import { planetas } from './planetas';

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
      <FlatList
        data={[planetas[currentIndex]]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Animated.View style={[styles.planetaContainer, { transform: [{ translateX: shakeAnimation }] }]}>
            <Text style={styles.planetaNome}>{item.nome}</Text>
            <Image source={{ uri: item.img }} style={styles.planetaImagem} />
            <Text style={styles.planetaDescricao}>{item.descricao}</Text>
            <Text style={styles.planetaInfo}>Satélites: {item.quantidadeSatelites}</Text>
            <Text style={styles.planetaInfo}>Área de Superfície: {item.areaSuperficieKm2} km²</Text>
            <Text style={styles.planetaInfo}>Velocidade Orbital: {item.velocidadeOrbitalMediaKmS} km/s</Text>
            <Text style={styles.planetaInfo}>Período de Rotação: {item.periodoRotacaoDias} dias</Text>
          </Animated.View>
        )}
      />
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
    backgroundColor: '#040217'
  },
  header: {
    width: '100%',
    backgroundColor: '#040217',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
  },
  headerImage: {
    width: 75,
    height: 75,
  },
  planetaContainer: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 50,
  },
  planetaNome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  planetaImagem: {
    width: 150,
    height: 150,
    marginVertical: 10,
  },
  planetaDescricao: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5
  },
  planetaInfo: {
    fontSize: 16,
    marginVertical: 2,
    color: '#fff',
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
