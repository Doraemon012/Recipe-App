import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Avatar, IconButton } from 'react-native-paper';
import { theme } from '../Theme';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const HorizontalRecipeCard = ({ recipe, onClick }) => {
    return (
        <Card style={styles.cardContainer} mode="elevated" elevation={2}>
            <View style={styles.cardContentContainer}>
                <View style={styles.imageContainer}>
                    <Card.Cover source={{ uri: recipe.image }} style={styles.image} />
                </View>
                <View style={styles.contentContainer}>
                    <Title style={styles.cardTitle}>{recipe.name}</Title>
                    {/* <View style={styles.buttonContainer}>
                        <IconButton icon="heart" iconColor={theme.colors.green} size={18} />
                        <Text style={styles.likeCount}></Text>
                        <IconButton icon="bookmark" iconColor={theme.colors.green} size={18} />
                    </View> */}
                </View>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        // width: windowWidth - 32,
        borderRadius: theme.borderRadii.extraLarge,
        backgroundColor: theme.colors.white,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        // marginVertical: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    cardContentContainer: {
        flexDirection: 'row',
    },
    imageContainer: {
        flex: 1,
        padding:12,
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth / 3,
        height: windowWidth / 3,
        alignItems: 'center',
        borderRadius:theme.borderRadii.extraLarge
    },
    contentContainer: {
        flex: 1,
        padding: 15,
    },
    image: {
        width: '100%',
        height: windowWidth / 3,
        borderRadius: theme.borderRadii.extraLarge,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    likeCount: {
        color: theme.colors.green,
        marginLeft: 5,
    },
    cardTitle: {
        fontWeight: 'bold',
        color: theme.colors.chGreen,
        marginBottom: 5,
    },
});

export default HorizontalRecipeCard;
