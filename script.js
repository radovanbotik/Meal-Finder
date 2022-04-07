//GRAB ELEMENTS
const search = document.querySelector(".search");
const btnSearch = document.querySelector(".btn-search");
const btnRandom = document.querySelector(".btn-random");
const result = document.querySelector(".result-heading");
const meal = document.querySelector(".meal-single");
const meals = document.querySelector(".meals");
const form = document.querySelector(".form");

const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
//FETCH

//RETRIEVE INPUT DATA and FETCH IT
function searchMeal(e) {
  e.preventDefault();

  //CLEAR SINGLE MEAL
  //meal.innerHTML = "";
  //GET INPUT DATA
  const term = search.value;
  const fetchMeals = async function (meal) {
    const res = await fetch(`${URL}${meal}`);
    const data = await res.json();
    result.innerHTML = `<h2>search results for '${meal}':<h2>`;
    if (data.meals === 0) {
      result.innerHTML = `<p>there are no search results</p>`;
    } else {
      meals.innerHTML = data.meals
        .map(
          dish =>
            `<div class='meal-single'>
            <img src='${dish.strMealThumb}' alt='${dish.strMeal}'/>
            <div class ='meal-info' data-mealID='${dish.idMeal}'>
            <h3>${dish.strMeal}</h3></div>
            </div>`
        )
        .join("");
    }
    search.value = "";
  };

  getMealById = async function (mId) {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mId}`
    );
    const data = await res.json();
    const meal = data.meals[0];
    console.log(meal);
    addMealToDOM(meal);
  };

  //CHECK INPUT
  if (term.trim()) {
    fetchMeals(term);
  } else {
    alert("Enter data!");
  }
}

const addMealToDOM = function (meal1) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal1[`strIngredient${i}`]) {
      ingredients.push(
        `${meal1[`strIngredient${i}`]} -${meal1[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  meal.innerHTML = `
  <div class="meal"><h1>${meal1.strMeal}</h1>
  <img src="${meal1.strMealThumb}" alt="${meal1.strMeal}"/>
  <div class='meal-info'>
  ${meal1.strCategory ? `<p>${meal1.strCategory}</p>` : ""}
  ${meal1.strArea ? `<p>${meal1.strArea}</p>` : ""}
  </div>
  <div class="main">${meal1.strInstructions}
  <h2>ingredients</h2>
  <ul>
  ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
  </ul>
  </div>
  </div>`;
};

// EVENT LISTENERS
form.addEventListener("submit", searchMeal);
meals.addEventListener("click", e => {
  const mealInfo = e.path.find(item => {
    // console.log(item);
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealID");
    getMealById(mealID);
  }
});
