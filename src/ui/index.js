import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
// import { add_image } from "./sdkUtils";

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
    // Get the UI runtime.
    const { runtime } = addOnUISdk.instance;

    // Get the proxy object, which is required
    // to call the APIs defined in the Document Sandbox runtime
    // i.e., in the `code.js` file of this add-on.
    // const sandboxProxy = await runtime.apiProxy("documentSandbox");
    const route = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/cocaine/PNG';
    const createRectangleButton = document.getElementById("createRectangle");
    createRectangleButton.addEventListener("click", async event => {
        console.log(route);
        add_image(route);
        // await sandboxProxy.getImage();
    });

    // Enable the button only when:
    // 1. `addOnUISdk` is ready,
    // 2. `sandboxProxy` is available, and
    // 3. `click` event listener is registered.
    createRectangleButton.disabled = false;
});
