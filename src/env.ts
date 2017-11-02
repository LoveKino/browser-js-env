import { spawn, exec } from "child_process";
import template = require("lodash.template");

/**
 * TODO support window
 * TODO support any browser
 */
export = (pageUrl: string, {
    open = undefined,
    silient = false,
    openOptions = {},
    appPath = undefined
} = {}) => {
    if (typeof open === "function") {
       return open(pageUrl);
    } else if (typeof open === "string") {
        const cmd = template(open)({url: pageUrl});
        return exec(cmd);
    } else {
        // default
        return isWindow() ? spawn("start", [pageUrl], openOptions) : spawn("open", [pageUrl], openOptions);
    }
};

const isWindow = () => process.platform === "win32";
