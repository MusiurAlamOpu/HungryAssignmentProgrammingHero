
document.getElementById("searchButton").addEventListener("click", function(){
    const inputText = document.getElementById("searchingName").value;
    console.log("Input Text is: " + inputText);
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + inputText)
    .then(response => response.json())
    .then(data => displayMeal(data));
});

function displayMeal(mealItems){
    console.log("Length: " + mealItems.meals.length);
    const mealDivs = document.getElementById("mealItemsList");
    for(let i = 0; i < mealItems.meals.length; i++) {
        const meal = mealItems.meals[i];
        const mealDiv = document.createElement("div");
        mealDiv.className = "mealDivItems";
        mealDiv.innerHTML = `
            <h3>${meal.strMeal}</h3>
        `;
        console.log(meal.strMeal);
        mealDivs.appendChild(mealDiv);
    }
}