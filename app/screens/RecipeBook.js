import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { v4 as uuidv4 } from 'uuid'; 

import RecipeModal from '../../COMPONENTS/recipeModal.js';
import ClickableBox from '../../COMPONENTS/clickableBox.js';
import { gridStyle } from '../../STYLES/styles.js';

const RecipeBook = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [recipes, setRecipes] = useState([
        {
            id: uuidv4(),
            name: "Recipe 1",
            image: null, // You can specify the image path here
            ingredients: [
                {  name: "Ingredient 1", quantity: "2 cups" },
                {  name: "Ingredient 2", quantity: "1 tsp" },
                // Add more ingredients as needed
            ],
            instructions: "Step 1: Do something...\nStep 2: Do something else...", // Multi-line instructions
            
        },
        {
            id: uuidv4(),
            name: "Chicken",
            image: require('./chicken.jpeg'),
            ingredients: [
                {  name: "Chicken", quantity: "1 lb" },
                {  name: "Salt", quantity: "1 tsp" },
                // Add more ingredients as needed
            ],
            instructions: "Step 1: Season the chicken...\nStep 2: Cook it...",
        },
    ]);
    
    /* toggle the state of the modal when a recipe is clicked */
    const handleRecipeInteraction = (recipe) => {
        setModalVisible(true);
        setSelectedRecipe(recipe);
    };

    /* Add a recipe with unique ID, open the modal for the newly added recipe */
    const handleAddRecipe = () => {
        const uniqueId = uuidv4();
        const newRecipe = { id: uniqueId, name: "", ingredients: [{ name: "", quantity: "" }], instructions: ""};
        const updatedRecipes = [...recipes, newRecipe];
        setRecipes(updatedRecipes);
        handleRecipeInteraction(newRecipe);
        setIsEditing(true);
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={[gridStyle.grid]}>
                {/* Modal that displays recipe information */}
                <RecipeModal
                    modalVisible={modalVisible}
                    selectedRecipe={selectedRecipe}
                    recipes={recipes}
                    isEditing={isEditing}
                    setRecipes={setRecipes}
                    setModalVisible={setModalVisible}
                    setSelectedRecipe={setSelectedRecipe}
                    setIsEditing={setIsEditing}
                />
                {/* Clickable boxes that displays each recipe */}
                {recipes.map((recipe) => (
                    <ClickableBox
                        key={recipe.id}
                        content={recipe.image ? recipe.image : recipe.name}
                        onClick={() => handleRecipeInteraction(recipe)}
                    />
                ))}
                {/* Clickable box to add a recipe */}
                <ClickableBox
                    content={"Add Recipe"}
                    onClick={handleAddRecipe}
                />
            </View>
        </ScrollView>
    );
}

export default RecipeBook;