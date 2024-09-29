import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor} from "express-document-sdk";
// Get the document sandbox runtime.
const { runtime } = addOnSandboxSdk.instance;

function start() {
    // APIs to be exposed to the UI runtime
    // i.e., to the `index.html` file of this add-on.
    const sandboxApi = {
        getImage: async () => {
            const route = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/cocaine/PNG';
            try {
                const res = await fetch(route);
                const blob = await res.blob();
                // const imageUrl = URL.createObjectURL(blob);
                const image = editor.createImageContainer(editor.loadBitmapImage(blob));
                add_image(route)
            } catch (err) {
                console.log(err)
                throw err;
            }
        }
    };

    // Expose `sandboxApi` to the UI runtime.
    runtime.exposeApi(sandboxApi);

    start();

}