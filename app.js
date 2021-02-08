
document.getElementById("searchButton").addEventListener("click", function(){
    const inputText = document.getElementById("searchingName").value;
    console.log("Input Text is: " + inputText);
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + inputText)
    .then(response => response.json())
    .then(data => displayMeal(data))
    .catch(err => alert("Could not find the: " + inputText + "\ndue to:\n" + err.message));
});

function displayMeal(mealItems){
    const mealDivs = document.getElementById("mealItemsList");
    mealDivs.innerHTML = ``;
    ingredientsDetails.innerHTML = ``;
    mealItems.meals.forEach(meal => {
        const mealDiv = document.createElement("div");
        mealDiv.className = "mealDivItems";
        mealDiv.innerHTML = `
            <div onclick="displayMealIngredients('${meal.idMeal}')">
                <div style="widht: 60px;">
                <img src="${meal.strMealThumb}">
                </div>
                <div>
                    <h3>${meal.strMeal}</h3>
                </div>
                
            </div>     
        `;
        console.log(meal.strMeal);
        mealDivs.appendChild(mealDiv);
    });
}
const displayMealIngredients = mealID =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            mealIngredientsDetailsAdd(data.meals[0]);
        });

}
const mealIngredientsDetailsAdd = mealItemName => {
    const mealDetailsNode = document.getElementById("ingredientsDetails");
    const mealIngredientsDetailsArray = [];
    for(let i = 1; i <= 30; i++) {
        if(mealItemName[`strIngredient${i}`]) {
            mealIngredientsDetailsArray.push(`${mealItemName[`strMeasure${i}`]}-${mealItemName[`strIngredient${i}`]}`);
        }else{
            break;
        }
    }

    mealDetailsNode.innerHTML = `
          <div id="ingredientsShowStage">
                <div>
                    <img src="${mealItemName.strMealThumb}" >
                    <h4 style="text-align: center; margin-top: 30px;">${mealItemName.strMeal}</h4>
                </div>
              
              <div>
                  <h5 style="margin-left: 50px;">Ingredients:</h5>
                  <ul style="margin-left: 50px;">
                      ${mealIngredientsDetailsArray.map(ingredient => `<li>${ingredient}</li>`).join('')}
                  </ul>
              </div>
          </div>
           `;
}