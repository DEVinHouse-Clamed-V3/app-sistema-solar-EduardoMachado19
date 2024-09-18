import React from 'react';
import { Text, Image, StyleSheet, Animated } from 'react-native';

const Planet = ({ nome, img, descricao, quantidadeSatelites, areaSuperficieKm2, velocidadeOrbitalMediaKmS, periodoRotacaoDias, shakeAnimation }) => {
    return (
        <Animated.View style={[styles.planetaContainer, { transform: [{ translateX: shakeAnimation }] }]}>
            <Text style={styles.planetaNome}>{nome}</Text>
            <Image source={{ uri: img }} style={styles.planetaImagem} />
            <Text style={styles.planetaDescricao}>{descricao}</Text>
            <Text style={styles.planetaInfo}>Satélites: {quantidadeSatelites}</Text>
            <Text style={styles.planetaInfo}>Área de Superfície: {areaSuperficieKm2} km²</Text>
            <Text style={styles.planetaInfo}>Velocidade Orbital: {velocidadeOrbitalMediaKmS} km/s</Text>
            <Text style={styles.planetaInfo}>Período de Rotação: {periodoRotacaoDias} dias</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
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
        marginBottom: 5,
    },
    planetaInfo: {
        fontSize: 16,
        marginVertical: 2,
        color: '#fff',
    },
});

export default Planet;
