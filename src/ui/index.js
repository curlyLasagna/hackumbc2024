import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

function add_image(url) {
    addOnUISdk.ready.then(() => {
        async function callWhenReady() {
            const blob = await fetch(url).then((r) => r.blob());
            addOnUISdk.app.document.addImage(blob);
        }
        callWhenReady();
    });
}

addOnUISdk.ready.then(async () => {

    const route = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/cocaine/PNG';
    const createRectangleButton = document.getElementById("createRectangle");
    createRectangleButton.addEventListener("click", async event => {
        add_image(route);
    });

    createRectangleButton.disabled = false;
});
