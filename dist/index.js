"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = __importStar(require("@actions/core"));
var deploy_1 = require("./deploy");
deploy_1.deploy({
    dockerComposePath: core.getInput('docker_compose_path'),
    GITHUB_TOKEN: core.getInput('GITHUB_TOKEN', { required: true }),
});
