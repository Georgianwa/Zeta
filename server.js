const app = require("./index");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Express server live on port 3000");
    console.log("Swagger Docs at http://localhost:3000/api-docs");
});
