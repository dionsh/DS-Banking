import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Savings = ({ name, description, image }) => {
    return (
        <View style={styles.cardWrapper}>

            
            <View style={styles.infoWrapper}>
                <Text style={styles.name}>{name}</Text>
                <Text>{description}</Text>
            </View>

        
            <Image source={image} style={styles.img} />

        </View>
    );
};

const styles = StyleSheet.create({
    cardWrapper: {
        flexDirection: 'row', 
        backgroundColor: 'white',
        borderRadius: 8,
        width: '90%',
        alignSelf: 'center',
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },

    img: {
        width: 100,
        height: 100,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
       
    },

    infoWrapper: {
        marginLeft: 20,
        marginTop: 20,
        flex: 1,
    },

    name: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
    },
});

export default Savings;
