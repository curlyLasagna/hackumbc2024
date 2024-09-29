import addOnUISdk, { Variant } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

function add_image(url) {
    addOnUISdk.ready.then(() => {
        async function callWhenReady() {
            try {
                const response = await fetch(url);
                // All errors. Regardless of who's at fault
                if (response.status >= 400 && response.status < 600) {
                    addOnUISdk.app.showModalDialog({
                        title: "Invalid query",
                        description: "Come on bruh",
                        variant: Variant.warning
                    });
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const blob = await response.blob();
                await addOnUISdk.app.document.addImage(blob);
            } catch (error) {
                console.error("Error:", error);
                addOnUISdk.app.showModalDialog({
                    title: "Error",
                    description: `Failed to add image: ${error.message}`,
                    variant: Variant.error
                });
            }
        }
        callWhenReady();
    });
}

addOnUISdk.ready.then(async () => {

    const getStructureBySMILES = document.getElementById("displayCompoundBySmiles");

    const getStructureByName = document.getElementById("displayCompoundByName")

    const smilesInput = document.getElementById("smilesInput");
    const nameInput = document.getElementById("nameInput");

    getStructureBySMILES.addEventListener("click", async event => {
        const smiles = encodeURIComponent(smilesInput.value.trim())
        add_image(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${smiles}/PNG`);
    });

    getStructureByName.addEventListener("click", async event => {
        const name = encodeURIComponent(nameInput.value.trim())
        add_image(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${name}/PNG`);
    });

    getStructureBySMILES.disabled = false;
});
