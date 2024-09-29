import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

function add_image(url) {
    addOnUISdk.ready.then(() => {
        async function callWhenReady() {
            const blob = await fetch(url)
                .then((r) => r.blob())
                .catch((e) => {
                    console.log(e);
                });
            addOnUISdk.app.document.addImage(blob);
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
