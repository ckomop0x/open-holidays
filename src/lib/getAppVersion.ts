import packageJson from "../../package.json" assert { type: "json" };

export const getAppVersion = () => packageJson.version;
