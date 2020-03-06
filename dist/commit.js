"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var exec_1 = require("@actions/exec");
var core = __importStar(require("@actions/core"));
exports.commit = function (_a) {
    var USER_NAME = _a.USER_NAME, USER_EMAIL = _a.USER_EMAIL, MESSAGE = _a.MESSAGE, GITHUB_TOKEN = _a.GITHUB_TOKEN;
    return __awaiter(void 0, void 0, void 0, function () {
        var REMOTE_REPO, options, err_1, ref, branch, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 15, , 16]);
                    if (!GITHUB_TOKEN) {
                        console.log('missing required env vars, skipping commit creation');
                        core.setFailed('missing required env vars');
                        return [2 /*return*/];
                    }
                    console.log("committing changes with message \"" + MESSAGE + "\"");
                    REMOTE_REPO = "https://" + process.env.GITHUB_ACTOR + ":" + GITHUB_TOKEN + "@github.com/" + process.env.GITHUB_REPOSITORY + ".git";
                    options = {
                        cwd: process.env.GITHUB_WORKSPACE,
                        listeners: {
                            stdline: core.debug,
                            stderr: core.error,
                            debug: core.debug,
                        },
                    };
                    return [4 /*yield*/, exec_1.exec('git', ['config', 'user.name', "\"" + USER_NAME + "\""], options)];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, exec_1.exec('git', ['config', 'user.email', "\"" + USER_EMAIL + "\""], options)];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, exec_1.exec('git', ['remote', 'add', 'publisher', REMOTE_REPO], options)];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, exec_1.exec('git', ['show-ref'], options)];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, exec_1.exec('git', ['branch', '--verbose'], options)];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, exec_1.exec('git', ['add', '-A'], options)];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7:
                    _b.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, exec_1.exec('git', ['commit', '-m', "" + MESSAGE], options)];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 9:
                    err_1 = _b.sent();
                    core.debug('nothing to commit, working tree clean');
                    return [2 /*return*/];
                case 10:
                    ref = process.env.GITHUB_REF || 'master';
                    branch = ref.split('/').reverse()[0];
                    return [4 /*yield*/, exec_1.exec('git', ['branch', 'tmp'], options)];
                case 11:
                    _b.sent();
                    return [4 /*yield*/, exec_1.exec('git', ['checkout', branch], options)];
                case 12:
                    _b.sent();
                    return [4 /*yield*/, exec_1.exec('git', ['merge', 'tmp'], options)];
                case 13:
                    _b.sent();
                    return [4 /*yield*/, exec_1.exec('git', ['push', 'publisher', branch], options)];
                case 14:
                    _b.sent();
                    return [3 /*break*/, 16];
                case 15:
                    err_2 = _b.sent();
                    core.setFailed(err_2.message);
                    console.log(err_2);
                    return [3 /*break*/, 16];
                case 16: return [2 /*return*/];
            }
        });
    });
};
