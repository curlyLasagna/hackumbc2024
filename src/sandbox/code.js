import addOnSandboxSdk from "add-on-sdk-document-sandbox";
const { runtime } = addOnSandboxSdk.instance;

function start() {
    runtime.exposeApi(sandboxApi);
    start();
}