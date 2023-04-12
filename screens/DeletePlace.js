import React from 'react';
import { View, Text, Button } from 'react-native';
import { deletePlace } from "../util/database";

function DeletePlace({ navigation }) {
    const placeId = navigation.getParam("placeId");

    async function deletePlaceHandler() {
        await deletePlace(placeId);
        navigation.navigate("AllPlaces");
    }

    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <Text style={styles.font}>Are you sure you want to delete this place?</Text>
            </View>
            <Button title="Delete" onPress={deletePlaceHandler} />
        </View>
    );
}


export default DeletePlace;