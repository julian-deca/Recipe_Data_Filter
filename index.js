const fs = require("fs");

async function filterData() {
  return fs.readFile("recipeData.json", "utf8", function (err, str) {
    if (err) throw err;
    let data = JSON.parse(str);
    let filteredData = data.recipes.filter((item) => {
      if (
        item.analyzedInstructions &&
        item.extendedIngredients &&
        item.image &&
        item.title
      ) {
        if (item.analyzedInstructions[0]) {
          if (item.analyzedInstructions[0].steps) {
            return true;
          }
        }
      }
      return false;
    });
    let relevant = filteredData.map((item) => {
      return {
        name: item.title,
        image: item.image,
        steps: item.analyzedInstructions[0].steps,
        ingredients: item.extendedIngredients,
      };
    });
    const json = JSON.stringify(relevant);
    fs.writeFile("filteredRecipeData.json", json, (err) => {
      if (err) throw err;
      console.log("Data written to file");
    });
  });
}

filterData();
