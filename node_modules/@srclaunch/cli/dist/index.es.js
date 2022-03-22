var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, copyDefault, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// ../../node_modules/pluralize/pluralize.js
var require_pluralize = __commonJS({
  "../../node_modules/pluralize/pluralize.js"(exports, module) {
    (function(root, pluralize4) {
      if (typeof __require === "function" && typeof exports === "object" && typeof module === "object") {
        module.exports = pluralize4();
      } else if (typeof define === "function" && define.amd) {
        define(function() {
          return pluralize4();
        });
      } else {
        root.pluralize = pluralize4();
      }
    })(exports, function() {
      var pluralRules = [];
      var singularRules = [];
      var uncountables = {};
      var irregularPlurals = {};
      var irregularSingles = {};
      function sanitizeRule(rule) {
        if (typeof rule === "string") {
          return new RegExp("^" + rule + "$", "i");
        }
        return rule;
      }
      function restoreCase(word, token) {
        if (word === token)
          return token;
        if (word === word.toLowerCase())
          return token.toLowerCase();
        if (word === word.toUpperCase())
          return token.toUpperCase();
        if (word[0] === word[0].toUpperCase()) {
          return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
        }
        return token.toLowerCase();
      }
      function interpolate(str, args) {
        return str.replace(/\$(\d{1,2})/g, function(match, index) {
          return args[index] || "";
        });
      }
      function replace(word, rule) {
        return word.replace(rule[0], function(match, index) {
          var result = interpolate(rule[1], arguments);
          if (match === "") {
            return restoreCase(word[index - 1], result);
          }
          return restoreCase(match, result);
        });
      }
      function sanitizeWord(token, word, rules) {
        if (!token.length || uncountables.hasOwnProperty(token)) {
          return word;
        }
        var len = rules.length;
        while (len--) {
          var rule = rules[len];
          if (rule[0].test(word))
            return replace(word, rule);
        }
        return word;
      }
      function replaceWord(replaceMap, keepMap, rules) {
        return function(word) {
          var token = word.toLowerCase();
          if (keepMap.hasOwnProperty(token)) {
            return restoreCase(word, token);
          }
          if (replaceMap.hasOwnProperty(token)) {
            return restoreCase(word, replaceMap[token]);
          }
          return sanitizeWord(token, word, rules);
        };
      }
      function checkWord(replaceMap, keepMap, rules, bool) {
        return function(word) {
          var token = word.toLowerCase();
          if (keepMap.hasOwnProperty(token))
            return true;
          if (replaceMap.hasOwnProperty(token))
            return false;
          return sanitizeWord(token, token, rules) === token;
        };
      }
      function pluralize4(word, count, inclusive) {
        var pluralized = count === 1 ? pluralize4.singular(word) : pluralize4.plural(word);
        return (inclusive ? count + " " : "") + pluralized;
      }
      pluralize4.plural = replaceWord(irregularSingles, irregularPlurals, pluralRules);
      pluralize4.isPlural = checkWord(irregularSingles, irregularPlurals, pluralRules);
      pluralize4.singular = replaceWord(irregularPlurals, irregularSingles, singularRules);
      pluralize4.isSingular = checkWord(irregularPlurals, irregularSingles, singularRules);
      pluralize4.addPluralRule = function(rule, replacement) {
        pluralRules.push([sanitizeRule(rule), replacement]);
      };
      pluralize4.addSingularRule = function(rule, replacement) {
        singularRules.push([sanitizeRule(rule), replacement]);
      };
      pluralize4.addUncountableRule = function(word) {
        if (typeof word === "string") {
          uncountables[word.toLowerCase()] = true;
          return;
        }
        pluralize4.addPluralRule(word, "$0");
        pluralize4.addSingularRule(word, "$0");
      };
      pluralize4.addIrregularRule = function(single, plural) {
        plural = plural.toLowerCase();
        single = single.toLowerCase();
        irregularSingles[single] = plural;
        irregularPlurals[plural] = single;
      };
      [
        ["I", "we"],
        ["me", "us"],
        ["he", "they"],
        ["she", "they"],
        ["them", "them"],
        ["myself", "ourselves"],
        ["yourself", "yourselves"],
        ["itself", "themselves"],
        ["herself", "themselves"],
        ["himself", "themselves"],
        ["themself", "themselves"],
        ["is", "are"],
        ["was", "were"],
        ["has", "have"],
        ["this", "these"],
        ["that", "those"],
        ["echo", "echoes"],
        ["dingo", "dingoes"],
        ["volcano", "volcanoes"],
        ["tornado", "tornadoes"],
        ["torpedo", "torpedoes"],
        ["genus", "genera"],
        ["viscus", "viscera"],
        ["stigma", "stigmata"],
        ["stoma", "stomata"],
        ["dogma", "dogmata"],
        ["lemma", "lemmata"],
        ["schema", "schemata"],
        ["anathema", "anathemata"],
        ["ox", "oxen"],
        ["axe", "axes"],
        ["die", "dice"],
        ["yes", "yeses"],
        ["foot", "feet"],
        ["eave", "eaves"],
        ["goose", "geese"],
        ["tooth", "teeth"],
        ["quiz", "quizzes"],
        ["human", "humans"],
        ["proof", "proofs"],
        ["carve", "carves"],
        ["valve", "valves"],
        ["looey", "looies"],
        ["thief", "thieves"],
        ["groove", "grooves"],
        ["pickaxe", "pickaxes"],
        ["passerby", "passersby"]
      ].forEach(function(rule) {
        return pluralize4.addIrregularRule(rule[0], rule[1]);
      });
      [
        [/s?$/i, "s"],
        [/[^\u0000-\u007F]$/i, "$0"],
        [/([^aeiou]ese)$/i, "$1"],
        [/(ax|test)is$/i, "$1es"],
        [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, "$1es"],
        [/(e[mn]u)s?$/i, "$1s"],
        [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, "$1"],
        [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1i"],
        [/(alumn|alg|vertebr)(?:a|ae)$/i, "$1ae"],
        [/(seraph|cherub)(?:im)?$/i, "$1im"],
        [/(her|at|gr)o$/i, "$1oes"],
        [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, "$1a"],
        [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, "$1a"],
        [/sis$/i, "ses"],
        [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, "$1$2ves"],
        [/([^aeiouy]|qu)y$/i, "$1ies"],
        [/([^ch][ieo][ln])ey$/i, "$1ies"],
        [/(x|ch|ss|sh|zz)$/i, "$1es"],
        [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, "$1ices"],
        [/\b((?:tit)?m|l)(?:ice|ouse)$/i, "$1ice"],
        [/(pe)(?:rson|ople)$/i, "$1ople"],
        [/(child)(?:ren)?$/i, "$1ren"],
        [/eaux$/i, "$0"],
        [/m[ae]n$/i, "men"],
        ["thou", "you"]
      ].forEach(function(rule) {
        return pluralize4.addPluralRule(rule[0], rule[1]);
      });
      [
        [/s$/i, ""],
        [/(ss)$/i, "$1"],
        [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, "$1fe"],
        [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, "$1f"],
        [/ies$/i, "y"],
        [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, "$1ie"],
        [/\b(mon|smil)ies$/i, "$1ey"],
        [/\b((?:tit)?m|l)ice$/i, "$1ouse"],
        [/(seraph|cherub)im$/i, "$1"],
        [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i, "$1"],
        [/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i, "$1sis"],
        [/(movie|twelve|abuse|e[mn]u)s$/i, "$1"],
        [/(test)(?:is|es)$/i, "$1is"],
        [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1us"],
        [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, "$1um"],
        [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, "$1on"],
        [/(alumn|alg|vertebr)ae$/i, "$1a"],
        [/(cod|mur|sil|vert|ind)ices$/i, "$1ex"],
        [/(matr|append)ices$/i, "$1ix"],
        [/(pe)(rson|ople)$/i, "$1rson"],
        [/(child)ren$/i, "$1"],
        [/(eau)x?$/i, "$1"],
        [/men$/i, "man"]
      ].forEach(function(rule) {
        return pluralize4.addSingularRule(rule[0], rule[1]);
      });
      [
        "adulthood",
        "advice",
        "agenda",
        "aid",
        "aircraft",
        "alcohol",
        "ammo",
        "analytics",
        "anime",
        "athletics",
        "audio",
        "bison",
        "blood",
        "bream",
        "buffalo",
        "butter",
        "carp",
        "cash",
        "chassis",
        "chess",
        "clothing",
        "cod",
        "commerce",
        "cooperation",
        "corps",
        "debris",
        "diabetes",
        "digestion",
        "elk",
        "energy",
        "equipment",
        "excretion",
        "expertise",
        "firmware",
        "flounder",
        "fun",
        "gallows",
        "garbage",
        "graffiti",
        "hardware",
        "headquarters",
        "health",
        "herpes",
        "highjinks",
        "homework",
        "housework",
        "information",
        "jeans",
        "justice",
        "kudos",
        "labour",
        "literature",
        "machinery",
        "mackerel",
        "mail",
        "media",
        "mews",
        "moose",
        "music",
        "mud",
        "manga",
        "news",
        "only",
        "personnel",
        "pike",
        "plankton",
        "pliers",
        "police",
        "pollution",
        "premises",
        "rain",
        "research",
        "rice",
        "salmon",
        "scissors",
        "series",
        "sewage",
        "shambles",
        "shrimp",
        "software",
        "species",
        "staff",
        "swine",
        "tennis",
        "traffic",
        "transportation",
        "trout",
        "tuna",
        "wealth",
        "welfare",
        "whiting",
        "wildebeest",
        "wildlife",
        "you",
        /pok[eé]mon$/i,
        /[^aeiou]ese$/i,
        /deer$/i,
        /fish$/i,
        /measles$/i,
        /o[iu]s$/i,
        /pox$/i,
        /sheep$/i
      ].forEach(pluralize4.addUncountableRule);
      return pluralize4;
    });
  }
});

// ../../node_modules/tslib/tslib.js
var require_tslib = __commonJS({
  "../../node_modules/tslib/tslib.js"(exports, module) {
    var __extends;
    var __assign;
    var __rest;
    var __decorate;
    var __param;
    var __metadata;
    var __awaiter;
    var __generator;
    var __exportStar;
    var __values;
    var __read;
    var __spread;
    var __spreadArrays;
    var __spreadArray;
    var __await;
    var __asyncGenerator;
    var __asyncDelegator;
    var __asyncValues;
    var __makeTemplateObject;
    var __importStar;
    var __importDefault;
    var __classPrivateFieldGet;
    var __classPrivateFieldSet;
    var __createBinding;
    (function(factory) {
      var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
      if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function(exports2) {
          factory(createExporter(root, createExporter(exports2)));
        });
      } else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
      } else {
        factory(createExporter(root));
      }
      function createExporter(exports2, previous) {
        if (exports2 !== root) {
          if (typeof Object.create === "function") {
            Object.defineProperty(exports2, "__esModule", { value: true });
          } else {
            exports2.__esModule = true;
          }
        }
        return function(id, v) {
          return exports2[id] = previous ? previous(id, v) : v;
        };
      }
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b)
          if (Object.prototype.hasOwnProperty.call(b, p))
            d[p] = b[p];
      };
      __extends = function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      __rest = function(s, e) {
        var t = {};
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
          }
        return t;
      };
      __decorate = function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      __param = function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      __metadata = function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      };
      __awaiter = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator = function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      __exportStar = function(m, o) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
            __createBinding(o, m, p);
      };
      __createBinding = Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      };
      __values = function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
          return m.call(o);
        if (o && typeof o.length === "number")
          return {
            next: function() {
              if (o && i >= o.length)
                o = void 0;
              return { value: o && o[i++], done: !o };
            }
          };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      __read = function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
          return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"]))
              m.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      };
      __spread = function() {
        for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read(arguments[i]));
        return ar;
      };
      __spreadArrays = function() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
          s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
        return r;
      };
      __spreadArray = function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      __await = function(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
      };
      __asyncGenerator = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i;
        function verb(n) {
          if (g[n])
            i[n] = function(v) {
              return new Promise(function(a, b) {
                q.push([n, v, a, b]) > 1 || resume(n, v);
              });
            };
        }
        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }
        function step(r) {
          r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f, v) {
          if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]);
        }
      };
      __asyncDelegator = function(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function(e) {
          throw e;
        }), verb("return"), i[Symbol.iterator] = function() {
          return this;
        }, i;
        function verb(n, f) {
          i[n] = o[n] ? function(v) {
            return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v;
          } : f;
        }
      };
      __asyncValues = function(o) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i);
        function verb(n) {
          i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
              v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
          };
        }
        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function(v2) {
            resolve({ value: v2, done: d });
          }, reject);
        }
      };
      __makeTemplateObject = function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      var __setModuleDefault = Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      };
      __importStar = function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      __classPrivateFieldGet = function(receiver, state, kind, f) {
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      };
      __classPrivateFieldSet = function(receiver, state, value, kind, f) {
        if (kind === "m")
          throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      };
      exporter("__extends", __extends);
      exporter("__assign", __assign);
      exporter("__rest", __rest);
      exporter("__decorate", __decorate);
      exporter("__param", __param);
      exporter("__metadata", __metadata);
      exporter("__awaiter", __awaiter);
      exporter("__generator", __generator);
      exporter("__exportStar", __exportStar);
      exporter("__createBinding", __createBinding);
      exporter("__values", __values);
      exporter("__read", __read);
      exporter("__spread", __spread);
      exporter("__spreadArrays", __spreadArrays);
      exporter("__spreadArray", __spreadArray);
      exporter("__await", __await);
      exporter("__asyncGenerator", __asyncGenerator);
      exporter("__asyncDelegator", __asyncDelegator);
      exporter("__asyncValues", __asyncValues);
      exporter("__makeTemplateObject", __makeTemplateObject);
      exporter("__importStar", __importStar);
      exporter("__importDefault", __importDefault);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet);
    });
  }
});

// ../../node_modules/lower-case/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/lower-case/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.lowerCase = exports.localeLowerCase = void 0;
    var SUPPORTED_LOCALE = {
      tr: {
        regexp: /\u0130|\u0049|\u0049\u0307/g,
        map: {
          \u0130: "i",
          I: "\u0131",
          I\u0307: "i"
        }
      },
      az: {
        regexp: /\u0130/g,
        map: {
          \u0130: "i",
          I: "\u0131",
          I\u0307: "i"
        }
      },
      lt: {
        regexp: /\u0049|\u004A|\u012E|\u00CC|\u00CD|\u0128/g,
        map: {
          I: "i\u0307",
          J: "j\u0307",
          \u012E: "\u012F\u0307",
          \u00CC: "i\u0307\u0300",
          \u00CD: "i\u0307\u0301",
          \u0128: "i\u0307\u0303"
        }
      }
    };
    function localeLowerCase(str, locale) {
      var lang = SUPPORTED_LOCALE[locale.toLowerCase()];
      if (lang)
        return lowerCase(str.replace(lang.regexp, function(m) {
          return lang.map[m];
        }));
      return lowerCase(str);
    }
    exports.localeLowerCase = localeLowerCase;
    function lowerCase(str) {
      return str.toLowerCase();
    }
    exports.lowerCase = lowerCase;
  }
});

// ../../node_modules/no-case/dist/index.js
var require_dist2 = __commonJS({
  "../../node_modules/no-case/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.noCase = void 0;
    var lower_case_1 = require_dist();
    var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
    var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
    function noCase(input, options) {
      if (options === void 0) {
        options = {};
      }
      var _a = options.splitRegexp, splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP : _a, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP : _b, _c = options.transform, transform = _c === void 0 ? lower_case_1.lowerCase : _c, _d = options.delimiter, delimiter = _d === void 0 ? " " : _d;
      var result = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
      var start = 0;
      var end = result.length;
      while (result.charAt(start) === "\0")
        start++;
      while (result.charAt(end - 1) === "\0")
        end--;
      return result.slice(start, end).split("\0").map(transform).join(delimiter);
    }
    exports.noCase = noCase;
    function replace(input, re, value) {
      if (re instanceof RegExp)
        return input.replace(re, value);
      return re.reduce(function(input2, re2) {
        return input2.replace(re2, value);
      }, input);
    }
  }
});

// ../../node_modules/pascal-case/dist/index.js
var require_dist3 = __commonJS({
  "../../node_modules/pascal-case/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pascalCase = exports.pascalCaseTransformMerge = exports.pascalCaseTransform = void 0;
    var tslib_1 = require_tslib();
    var no_case_1 = require_dist2();
    function pascalCaseTransform(input, index) {
      var firstChar = input.charAt(0);
      var lowerChars = input.substr(1).toLowerCase();
      if (index > 0 && firstChar >= "0" && firstChar <= "9") {
        return "_" + firstChar + lowerChars;
      }
      return "" + firstChar.toUpperCase() + lowerChars;
    }
    exports.pascalCaseTransform = pascalCaseTransform;
    function pascalCaseTransformMerge(input) {
      return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    }
    exports.pascalCaseTransformMerge = pascalCaseTransformMerge;
    function pascalCase(input, options) {
      if (options === void 0) {
        options = {};
      }
      return no_case_1.noCase(input, tslib_1.__assign({ delimiter: "", transform: pascalCaseTransform }, options));
    }
    exports.pascalCase = pascalCase;
  }
});

// ../../node_modules/camel-case/dist/index.js
var require_dist4 = __commonJS({
  "../../node_modules/camel-case/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.camelCase = exports.camelCaseTransformMerge = exports.camelCaseTransform = void 0;
    var tslib_1 = require_tslib();
    var pascal_case_1 = require_dist3();
    function camelCaseTransform(input, index) {
      if (index === 0)
        return input.toLowerCase();
      return pascal_case_1.pascalCaseTransform(input, index);
    }
    exports.camelCaseTransform = camelCaseTransform;
    function camelCaseTransformMerge(input, index) {
      if (index === 0)
        return input.toLowerCase();
      return pascal_case_1.pascalCaseTransformMerge(input);
    }
    exports.camelCaseTransformMerge = camelCaseTransformMerge;
    function camelCase(input, options) {
      if (options === void 0) {
        options = {};
      }
      return pascal_case_1.pascalCase(input, tslib_1.__assign({ transform: camelCaseTransform }, options));
    }
    exports.camelCase = camelCase;
  }
});

// ../../node_modules/upper-case-first/dist/index.js
var require_dist5 = __commonJS({
  "../../node_modules/upper-case-first/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.upperCaseFirst = void 0;
    function upperCaseFirst(input) {
      return input.charAt(0).toUpperCase() + input.substr(1);
    }
    exports.upperCaseFirst = upperCaseFirst;
  }
});

// ../../node_modules/capital-case/dist/index.js
var require_dist6 = __commonJS({
  "../../node_modules/capital-case/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.capitalCase = exports.capitalCaseTransform = void 0;
    var tslib_1 = require_tslib();
    var no_case_1 = require_dist2();
    var upper_case_first_1 = require_dist5();
    function capitalCaseTransform(input) {
      return upper_case_first_1.upperCaseFirst(input.toLowerCase());
    }
    exports.capitalCaseTransform = capitalCaseTransform;
    function capitalCase(input, options) {
      if (options === void 0) {
        options = {};
      }
      return no_case_1.noCase(input, tslib_1.__assign({ delimiter: " ", transform: capitalCaseTransform }, options));
    }
    exports.capitalCase = capitalCase;
  }
});

// ../../node_modules/upper-case/dist/index.js
var require_dist7 = __commonJS({
  "../../node_modules/upper-case/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.upperCase = exports.localeUpperCase = void 0;
    var SUPPORTED_LOCALE = {
      tr: {
        regexp: /[\u0069]/g,
        map: {
          i: "\u0130"
        }
      },
      az: {
        regexp: /[\u0069]/g,
        map: {
          i: "\u0130"
        }
      },
      lt: {
        regexp: /[\u0069\u006A\u012F]\u0307|\u0069\u0307[\u0300\u0301\u0303]/g,
        map: {
          i\u0307: "I",
          j\u0307: "J",
          \u012F\u0307: "\u012E",
          i\u0307\u0300: "\xCC",
          i\u0307\u0301: "\xCD",
          i\u0307\u0303: "\u0128"
        }
      }
    };
    function localeUpperCase(str, locale) {
      var lang = SUPPORTED_LOCALE[locale.toLowerCase()];
      if (lang)
        return upperCase(str.replace(lang.regexp, function(m) {
          return lang.map[m];
        }));
      return upperCase(str);
    }
    exports.localeUpperCase = localeUpperCase;
    function upperCase(str) {
      return str.toUpperCase();
    }
    exports.upperCase = upperCase;
  }
});

// ../../node_modules/constant-case/dist/index.js
var require_dist8 = __commonJS({
  "../../node_modules/constant-case/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.constantCase = void 0;
    var tslib_1 = require_tslib();
    var no_case_1 = require_dist2();
    var upper_case_1 = require_dist7();
    function constantCase(input, options) {
      if (options === void 0) {
        options = {};
      }
      return no_case_1.noCase(input, tslib_1.__assign({ delimiter: "_", transform: upper_case_1.upperCase }, options));
    }
    exports.constantCase = constantCase;
  }
});

// ../../node_modules/dot-case/dist/index.js
var require_dist9 = __commonJS({
  "../../node_modules/dot-case/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dotCase = void 0;
    var tslib_1 = require_tslib();
    var no_case_1 = require_dist2();
    function dotCase(input, options) {
      if (options === void 0) {
        options = {};
      }
      return no_case_1.noCase(input, tslib_1.__assign({ delimiter: "." }, options));
    }
    exports.dotCase = dotCase;
  }
});

// ../../node_modules/header-case/dist/index.js
var require_dist10 = __commonJS({
  "../../node_modules/header-case/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.headerCase = void 0;
    var tslib_1 = require_tslib();
    var capital_case_1 = require_dist6();
    function headerCase(input, options) {
      if (options === void 0) {
        options = {};
      }
      return capital_case_1.capitalCase(input, tslib_1.__assign({ delimiter: "-" }, options));
    }
    exports.headerCase = headerCase;
  }
});

// ../../node_modules/param-case/dist/index.js
var require_dist11 = __commonJS({
  "../../node_modules/param-case/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.paramCase = void 0;
    var tslib_1 = require_tslib();
    var dot_case_1 = require_dist9();
    function paramCase2(input, options) {
      if (options === void 0) {
        options = {};
      }
      return dot_case_1.dotCase(input, tslib_1.__assign({ delimiter: "-" }, options));
    }
    exports.paramCase = paramCase2;
  }
});

// ../../node_modules/path-case/dist/index.js
var require_dist12 = __commonJS({
  "../../node_modules/path-case/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pathCase = void 0;
    var tslib_1 = require_tslib();
    var dot_case_1 = require_dist9();
    function pathCase(input, options) {
      if (options === void 0) {
        options = {};
      }
      return dot_case_1.dotCase(input, tslib_1.__assign({ delimiter: "/" }, options));
    }
    exports.pathCase = pathCase;
  }
});

// ../../node_modules/sentence-case/dist/index.js
var require_dist13 = __commonJS({
  "../../node_modules/sentence-case/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sentenceCase = exports.sentenceCaseTransform = void 0;
    var tslib_1 = require_tslib();
    var no_case_1 = require_dist2();
    var upper_case_first_1 = require_dist5();
    function sentenceCaseTransform(input, index) {
      var result = input.toLowerCase();
      if (index === 0)
        return upper_case_first_1.upperCaseFirst(result);
      return result;
    }
    exports.sentenceCaseTransform = sentenceCaseTransform;
    function sentenceCase(input, options) {
      if (options === void 0) {
        options = {};
      }
      return no_case_1.noCase(input, tslib_1.__assign({ delimiter: " ", transform: sentenceCaseTransform }, options));
    }
    exports.sentenceCase = sentenceCase;
  }
});

// ../../node_modules/snake-case/dist/index.js
var require_dist14 = __commonJS({
  "../../node_modules/snake-case/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.snakeCase = void 0;
    var tslib_1 = require_tslib();
    var dot_case_1 = require_dist9();
    function snakeCase(input, options) {
      if (options === void 0) {
        options = {};
      }
      return dot_case_1.dotCase(input, tslib_1.__assign({ delimiter: "_" }, options));
    }
    exports.snakeCase = snakeCase;
  }
});

// ../../node_modules/change-case/dist/index.js
var require_dist15 = __commonJS({
  "../../node_modules/change-case/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    tslib_1.__exportStar(require_dist4(), exports);
    tslib_1.__exportStar(require_dist6(), exports);
    tslib_1.__exportStar(require_dist8(), exports);
    tslib_1.__exportStar(require_dist9(), exports);
    tslib_1.__exportStar(require_dist10(), exports);
    tslib_1.__exportStar(require_dist2(), exports);
    tslib_1.__exportStar(require_dist11(), exports);
    tslib_1.__exportStar(require_dist3(), exports);
    tslib_1.__exportStar(require_dist12(), exports);
    tslib_1.__exportStar(require_dist13(), exports);
    tslib_1.__exportStar(require_dist14(), exports);
  }
});

// src/index.ts
import meow from "meow";
import updateNotifier from "update-notifier";

// src/lib/cli.ts
import fs12 from "fs-extra";
import path12 from "path";

// src/commands/help/index.ts
function showHelp() {
  cli.showHelp();
}

// src/commands/models/build/index.ts
import path9 from "path";
import fs9 from "fs-extra";

// src/commands/models/build/clean.ts
import fs from "fs-extra";
import path from "path";
async function cleanModels() {
  try {
    const APPLAB_DIRECTORY = ".applab";
    const MODEL_DEPS_PATH = path.join(path.resolve(), APPLAB_DIRECTORY, "dependencies/models");
    console.info("Cleaning models...");
    await fs.emptyDir(path.join(MODEL_DEPS_PATH, "src"));
  } catch (err) {
    console.error(err);
  }
}

// src/commands/models/build/stubs/index.ts
import fs2 from "fs-extra";
import path2 from "path";

// src/commands/models/build/stubs/models.ts
function getDocumentModel() {
  return `import { ModelProps, Primitives } from "@srclaunch/types";

  export const Document: ModelProps = {
    fields: {
      name: {
        label: "Name",
        type: Primitives.String,
        required: true,
      },
      description: {
        label: "Description",
        type: Primitives.String,
        required: true,
      }
    },
    name: "Document",
    relationships: {
      belongsTo: ["Organization", "Invoice", "User"],
    },
  };
  `;
}
function getInvoiceModel() {
  return `import { ModelProps, Primitives } from "@srclaunch/types";

  export const Invoice: ModelProps = {
    fields: {
      amount: {
        label: "Amount",
        type: Primitives.Number,
        required: true,
      },
      currency: {
        label: "Currency",
        type: Primitives.CurrencyCode,
        required: true,
      },
      date: {
        label: "Date",
        type: Primitives.Date,
        required: true,
      },
      due_date: {
        label: "Due Date",
        type: Primitives.Date,
        required: true,
      },
      notes: {
        label: "Notes",
        type: Primitives.String,
      },
      status: {
        label: "Status",
        type: Primitives.String,
        required: true,
      },
    },
    name: "Invoice",
    relationships: {
      belongsTo: ["Organization", "Payment", "User"],
    },
  };`;
}
function getOrganizationModel() {
  return `import { ModelProps, Primitives } from "@srclaunch/types";

export const Organization: ModelProps = {
  fields: {
    description: {
      label: "Description",
      type: Primitives.String,
    },
    name: {
      label: "Name",
      type: Primitives.String,
    },
  },
  name: "Organization",
  relationships: {},
};`;
}
function getPaymentModel() {
  return `import { ModelProps, Primitives } from "@srclaunch/types";

  export const Payment: ModelProps = {
    fields: {
      amount: {
        label: "Amount",
        type: Primitives.Number,
        required: true,
      },
      currency: {
        label: "Currency",
        type: Primitives.CurrencyCode,
        required: true,
      },
      date: {
        label: "Date",
        type: Primitives.Date,
        required: true,
      },
      failure_reason: {
        label: "Failure Reason",
        type: Primitives.Menu,
        menu: [
          {
            label: 'Insufficient Funds',
            value: 'insufficient-funds',
          },
          {
            label: 'Invalid Amount',
            value: 'invalid-amount',
          },
          {
            label: 'Invalid Currency',
            value: 'invalid-currency',
          },
          {
            label: 'Invalid Card',
            value: 'invalid-card',
          },
          {
            label: 'Invalid Card Expiry',
            value: 'invalid-card-expiry',
          },
          {
            label: 'Invalid Card Number',
            value: 'invalid-card-number',
          },
          {
            label: 'Invalid Card Security Code',
            value: 'invalid-card-security-code',
          },
          {
            label: 'Invalid Card Holder',
            value: 'invalid-card-holder',
          },
          {
            label: 'Invalid Card Address',
            value: 'invalid-card-address',
          },
        ]
      },
      notes: {
        label: "Notes",
        type: Primitives.String,
        required: true,
      },
      status: {
        label: "Status",
        type: Primitives.Menu,
        required: true,
        menu: [
          {
            label: "Paid",
            value: "paid",
          },
          {
            label: "Failure",
            value: "failure",
          },
          {
            label: "Pending",
            value: "pending",
          },
        ],
      }
    },
    name: "Payment",
    relationships: {
      belongsTo: ["Organization", "User"],
    },
  };`;
}
function getPaymentMethodModel() {
  return `import { ModelProps, Primitives } from "@srclaunch/types";

export const PaymentMethod: ModelProps = {
  fields: {
    default: {
      label: "Default",
      type: Primitives.Boolean,
    },
    masked_number: {
      label: "Number",
      type: Primitives.String,
    },
    name: {
      label: "Name",
      type: Primitives.String,
    },
    type: {
      label: "Type",
      menu: [
        {
          label: "Bank Transfer",
          value: "bank-transfer",
        },
        {
          label: "Credit Card",
          value: "credit-card",
        },
        {
          label: "Crypto",
          value: "crypto",
        },
      ],
      type: Primitives.Menu,
    },
  },
  name: "PaymentMethod",
  relationships: {
    belongsTo: ["Organization", "Payment", "Team", "User"],
  },
};`;
}
function getPersonModel() {
  return `import { ModelProps, Primitives } from "@srclaunch/types";

export const Person: ModelProps = {
  fields: {
    analytics: {
      label: "Analytics",
      type: Primitives.JSON,
    },
    billing: {
      label: "Billing Details",
      type: Primitives.JSON,
    },
  },
  name: "Person",
  relationships: {
    hasMany: ["Event"],
    hasOne: ["User"],
  },
};`;
}
function getSubscriptionModel() {
  return `import { ModelProps, Primitives } from "@srclaunch/types";

export const Subscription: ModelProps = {
  fields: {
    status: {
      label: "Status",
      menu: [
        {
          label: "Active",
          value: "active",
        },
        {
          label: "Expired",
          value: "expired",
        },
        {
          label: "Canceled",
          value: "canceled",
        },
      ],
      type: Primitives.Menu,
    },
    cancel_date: {
      label: "Cancel date",
      type: Primitives.DateTime,
    },
    expiration_date: {
      label: "Expiration date",
      type: Primitives.DateTime,
    },
    renewal_date: {
      label: "Renewal date",
      type: Primitives.DateTime,
    },
    start_date: {
      label: "Start date",
      type: Primitives.DateTime,
    },
  },
  name: "Subscription",
  relationships: {
    belongsTo: ["Organization", "Product", "Team", "User"],
  },
};`;
}
function getTeamModel() {
  return `import { ModelProps, Primitives } from "@srclaunch/types";

export const Team: ModelProps = {
  fields: {
    description: {
      label: "Description",
      type: Primitives.String,
    },
    name: {
      label: "Name",
      type: Primitives.String,
    },
  },
  name: "Team",
  relationships: {
    belongsTo: ["Organization"],
  },
};`;
}
function getUserModel() {
  return `import {
  CurrencyCode,
  LanguageCode,
  LocaleCode,
  ModelProps,
  Primitives,
} from "@srclaunch/types";

export const User: ModelProps = {
  description: "A user that signs into the application",
  fields: {
    access: {
      label: "Access Details",
      type: Primitives.JSON,
    },
    cognito_id: {
      label: "Cognito ID",
      type: Primitives.String,
    },
    membership: {
      label: "Membership",
      type: Primitives.JSON,
    },
    onboarding: {
      label: "Onboarding",
      type: Primitives.JSON,
    },
    preferences: {
      defaultValue: {
        accessibility: {
          outlines: false,
        },
        localization: {
          currency: CurrencyCode.UnitedStatesDollar,
          language: LanguageCode.English,
          locale: LocaleCode.EnglishUnitedStates,
        },
        look_and_feel: {
          theme: "light",
        },
      },
      label: "Preferences",
      type: Primitives.JSON,
    },
  },
  name: "User",
  relationships: {
    belongsTo: ["Person", "Team"]
  },
};`;
}
function getUserGroupModel() {
  return `import { ModelProps, Primitives } from "@srclaunch/types";

export const UserGroup: ModelProps = {
  fields: {
    description: {
      label: "Description",
      type: Primitives.String,
    },
    name: {
      label: "Name",
      type: Primitives.String,
    },
  },
  name: "UserGroup",
  relationships: {
    belongsTo: ["Organization", "Team"],
  },
};`;
}
function getUserRoleModel() {
  return `import { ModelProps, Primitives } from "@srclaunch/types";

export const UserRole: ModelProps = {
  fields: {
    description: {
      label: "Description",
      type: Primitives.String,
    },
    name: {
      label: "Name",
      type: Primitives.String,
    },
  },
  name: "UserRole",
  relationships: {
    belongsTo: ["Organization", "Team"],
  },
};`;
}

// src/commands/models/build/stubs/index.ts
async function copyStubModels() {
  try {
    const APPLAB_DIRECTORY = ".applab";
    const BUILD_PATH = path2.join(path2.resolve(), APPLAB_DIRECTORY, "dependencies/models");
    const applabModelPath = path2.join(BUILD_PATH, "src");
    await fs2.writeFile(path2.join(applabModelPath, "Organization.ts"), getOrganizationModel(), "utf8");
    await fs2.writeFile(path2.join(applabModelPath, "Team.ts"), getTeamModel(), "utf8");
    await fs2.writeFile(path2.join(applabModelPath, "Document.ts"), getDocumentModel(), "utf8");
    await fs2.writeFile(path2.join(applabModelPath, "Payment.ts"), getPaymentModel(), "utf8");
    await fs2.writeFile(path2.join(applabModelPath, "Invoice.ts"), getInvoiceModel(), "utf8");
    await fs2.writeFile(path2.join(applabModelPath, "PaymentMethod.ts"), getPaymentMethodModel(), "utf8");
    await fs2.writeFile(path2.join(applabModelPath, "Person.ts"), getPersonModel(), "utf8");
    await fs2.writeFile(path2.join(applabModelPath, "Subscription.ts"), getSubscriptionModel(), "utf8");
    await fs2.writeFile(path2.join(applabModelPath, "User.ts"), getUserModel(), "utf8");
    await fs2.writeFile(path2.join(applabModelPath, "UserGroup.ts"), getUserGroupModel(), "utf8");
    await fs2.writeFile(path2.join(applabModelPath, "UserRole.ts"), getUserRoleModel(), "utf8");
  } catch (err) {
    console.error(err);
  }
}

// src/commands/models/build/outputs/applab.ts
import fs3 from "fs-extra";
import path3 from "path";

// src/commands/models/build/exports.ts
function constructModelExportIndexScript(models, modelFormat = "applab") {
  try {
    let indexFileExports = "";
    let indexFileImports = "";
    let sequelizeDefaultExports = "export default {";
    const fileExtension = `.${modelFormat === "applab" || modelFormat === "sequelize" ? "ts" : "json"}`;
    for (const model of models) {
      const modelName = model.split(fileExtension)[0];
      if (modelFormat === "json") {
        indexFileImports += `import ${modelName} from './${modelName}.json';
`;
      } else if (modelFormat === "sequelize") {
        indexFileImports += `import ${modelName}Init, { ${modelName} } from './${modelName}';
`;
        sequelizeDefaultExports += `${modelName}: ${modelName}Init,`;
      } else {
        indexFileImports += `import { ${modelName} } from './${modelName}.js';
`;
      }
      indexFileExports += `  ${modelName},
`;
    }
    if (modelFormat === "sequelize") {
      sequelizeDefaultExports += "};";
    }
    return `${indexFileImports}
export {
${indexFileExports}};
${modelFormat === "sequelize" ? sequelizeDefaultExports : ""}
`;
  } catch (err) {
    console.error(err);
  }
}

// src/commands/models/build/outputs/applab.ts
async function buildAppLabModels({
  path: projectPath
}) {
  try {
    const MODELS_PATH = path3.join(path3.resolve(), "models");
    const APPLAB_DIRECTORY = ".applab";
    const BUILD_PATH = path3.join(path3.resolve(), APPLAB_DIRECTORY, `${projectPath}/src`);
    const files = await fs3.readdir(MODELS_PATH);
    for (const file of files) {
      const fileContents = await fs3.readFile(path3.join(MODELS_PATH, file), "utf8");
      const fieldsPropertyExists = fileContents.includes("fields: {");
      if (!fieldsPropertyExists) {
        throw new Error(`${file} is missing the fields property.`);
      }
      let entityFields = `
    created_date: {
      label: 'Created Date',
      required: false,
      type: Primitives.DateTime,
    },
    updated_date: {
      label: 'Updated Date',
      required: false,
      type: Primitives.DateTime,
    },
  `;
      const relationshipsStart = fileContents.indexOf("relationships:") + 15;
      const relationshipsEnd = fileContents.indexOf("}", relationshipsStart) + 1;
      const relationships = fileContents.slice(relationshipsStart, relationshipsEnd);
      if (relationships) {
        const belongsToStart = relationships.indexOf("belongsTo:") + 10;
        const belongsToEnd = relationships.indexOf("]", belongsToStart) + 1;
        const belongsTo = relationships.slice(belongsToStart, belongsToEnd);
        if (belongsTo) {
          const belongsToFields = JSON.parse(belongsTo.replace(/'/g, '"'));
          for (const relationship of belongsToFields) {
            entityFields += `
        ${relationship}Id: {
          label: '${relationship}',
          required: false,
          type: Primitives.UUID
        },
        `;
          }
        }
      }
      const updatedFileContents = fileContents.replace("fields: {", `fields: {
        ${entityFields}`);
      await fs3.writeFile(path3.join(BUILD_PATH, file), updatedFileContents, "utf8");
    }
    const buildModels2 = await fs3.readdir(BUILD_PATH);
    const models = buildModels2.filter((file) => {
      return file.slice(-3) === ".ts" && file.split(".ts")[0] !== "index";
    });
    const indexFileContent = constructModelExportIndexScript(models, "applab");
    await fs3.writeFile(path3.join(BUILD_PATH, "index.ts"), indexFileContent, "utf8");
    console.info("Finished building AppLab models");
  } catch (error) {
    console.error(error);
  }
}

// ../types/dist/applab/activity/index.js
var Activities;
(function(Activities2) {
  Activities2["Comment"] = "comment";
  Activities2["Create"] = "create";
  Activities2["Delete"] = "delete";
  Activities2["Edit"] = "edit";
  Activities2["Invoice"] = "invoice";
  Activities2["Message"] = "message";
  Activities2["PageView"] = "pageView";
  Activities2["Paid"] = "paid";
  Activities2["Payment"] = "payment";
  Activities2["Purchase"] = "purchase";
  Activities2["Referral"] = "referral";
  Activities2["Renewal"] = "renewal";
  Activities2["Signup"] = "signup";
  Activities2["Subscription"] = "subscription";
  Activities2["Upgrade"] = "upgrade";
})(Activities || (Activities = {}));

// ../types/dist/applab/analytics/index.js
var Analytics;
(function(Analytics2) {
  Analytics2["Business"] = "business";
  Analytics2["Engineering"] = "engineering";
  Analytics2["Exception"] = "exception";
  Analytics2["LogMessage"] = "log-message";
  Analytics2["Marketing"] = "marketing";
  Analytics2["PageLeave"] = "page-leave";
  Analytics2["PageView"] = "page-view";
  Analytics2["Product"] = "product";
  Analytics2["QualityManagement"] = "quality-management";
  Analytics2["UserAccess"] = "user-access";
  Analytics2["UserLogin"] = "user-login";
  Analytics2["UserLogout"] = "user-logout";
  Analytics2["UserSignup"] = "user-signup";
  Analytics2["UserPreferencesChanged"] = "user-preferences-changed";
  Analytics2["WebsiteVisit"] = "website-visit";
})(Analytics || (Analytics = {}));

// ../types/dist/applab/analytics/web/index.js
var PageLeaveMethod;
(function(PageLeaveMethod2) {
  PageLeaveMethod2["CloseTab"] = "close-tab";
  PageLeaveMethod2["ExternalLink"] = "external-link";
  PageLeaveMethod2["NavigateAway"] = "navigate-away";
  PageLeaveMethod2["Unknown"] = "unknown";
})(PageLeaveMethod || (PageLeaveMethod = {}));

// ../types/dist/applab/application/deployment/index.js
var DeploymentTarget;
(function(DeploymentTarget2) {
  DeploymentTarget2["Ecs"] = "Ecs";
})(DeploymentTarget || (DeploymentTarget = {}));
var DeploymentStatus;
(function(DeploymentStatus2) {
  DeploymentStatus2["Finished"] = "Finished";
  DeploymentStatus2["Queued"] = "Queued";
  DeploymentStatus2["Running"] = "Running";
  DeploymentStatus2["Started"] = "Started";
})(DeploymentStatus || (DeploymentStatus = {}));

// ../types/dist/applab/application/device/index.js
var DeviceType;
(function(DeviceType2) {
  DeviceType2["Mobile"] = "mobile";
  DeviceType2["TV"] = "tv";
  DeviceType2["Watch"] = "watch";
  DeviceType2["Web"] = "web";
})(DeviceType || (DeviceType = {}));

// ../types/dist/applab/application/environment/index.js
var EnvironmentType;
(function(EnvironmentType2) {
  EnvironmentType2["Development"] = "Development";
  EnvironmentType2["NonProduction"] = "NonProduction";
  EnvironmentType2["Production"] = "Production";
})(EnvironmentType || (EnvironmentType = {}));

// ../types/dist/applab/application/onboarding/index.js
var OnboardingStatus;
(function(OnboardingStatus2) {
  OnboardingStatus2["Completed"] = "completed";
  OnboardingStatus2["Started"] = "started";
  OnboardingStatus2["Uncompleted"] = "uncompleted";
})(OnboardingStatus || (OnboardingStatus = {}));

// ../types/dist/applab/application/pipeline/index.js
var PipelineType;
(function(PipelineType2) {
  PipelineType2["Build"] = "Build";
  PipelineType2["Deployment"] = "Deployment";
  PipelineType2["Test"] = "Test";
})(PipelineType || (PipelineType = {}));

// ../types/dist/applab/application/pipeline/workflow.js
var PipelineWorkflowStatus;
(function(PipelineWorkflowStatus2) {
  PipelineWorkflowStatus2["Canceled"] = "Canceled";
  PipelineWorkflowStatus2["Completed"] = "Completed";
  PipelineWorkflowStatus2["Failed"] = "Failed";
  PipelineWorkflowStatus2["Running"] = "Running";
  PipelineWorkflowStatus2["Queued"] = "Queued";
  PipelineWorkflowStatus2["Waiting"] = "Waiting";
})(PipelineWorkflowStatus || (PipelineWorkflowStatus = {}));
var PipelineStepStatus;
(function(PipelineStepStatus2) {
  PipelineStepStatus2["Canceled"] = "Canceled";
  PipelineStepStatus2["Completed"] = "Completed";
  PipelineStepStatus2["Failed"] = "Failed";
  PipelineStepStatus2["Running"] = "Running";
  PipelineStepStatus2["Queued"] = "Queued";
  PipelineStepStatus2["Waiting"] = "Waiting";
})(PipelineStepStatus || (PipelineStepStatus = {}));

// ../types/dist/applab/application/platforms/web/pages/index.js
var PageRole;
(function(PageRole2) {
  PageRole2["ForgotPassword"] = "forgot_password";
  PageRole2["Index"] = "index";
  PageRole2["Login"] = "login";
  PageRole2["PageNotFound"] = "404";
  PageRole2["Signup"] = "signup";
  PageRole2["VerifyCode"] = "verify_code";
})(PageRole || (PageRole = {}));

// ../types/dist/applab/application/ui/alert.js
var AlertLevel;
(function(AlertLevel2) {
  AlertLevel2["Info"] = "info";
  AlertLevel2["Warning"] = "warning";
  AlertLevel2["Error"] = "error";
  AlertLevel2["Success"] = "success";
})(AlertLevel || (AlertLevel = {}));

// ../types/dist/applab/application/ui/modal.js
var ModalType;
(function(ModalType2) {
  ModalType2["Details"] = "details";
  ModalType2["Dialog"] = "dialog";
})(ModalType || (ModalType = {}));

// ../types/dist/applab/application/ui/notification.js
var NotificationType;
(function(NotificationType2) {
  NotificationType2["Info"] = "info";
  NotificationType2["Warning"] = "warning";
  NotificationType2["Error"] = "error";
  NotificationType2["Success"] = "success";
})(NotificationType || (NotificationType = {}));

// ../types/dist/applab/data/data-point/index.js
var DataPointMetric;
(function(DataPointMetric2) {
  DataPointMetric2["AccountBalance"] = "AccountBalance";
  DataPointMetric2["UserAssets"] = "UserAssets";
  DataPointMetric2["UserCreditCardDebt"] = "UserCreditCardDebt";
  DataPointMetric2["UserCreditLimit"] = "UserCreditLimit";
  DataPointMetric2["UserCreditUtilization"] = "UserCreditUtilization";
  DataPointMetric2["UserDebt"] = "UserDebt";
  DataPointMetric2["UserInvestments"] = "UserInvestments";
  DataPointMetric2["UserRetirement"] = "UserRetirement";
  DataPointMetric2["UserSavings"] = "UserSavings";
})(DataPointMetric || (DataPointMetric = {}));

// ../types/dist/applab/data/model/defaults.js
var DefaultValue;
(function(DefaultValue2) {
  DefaultValue2["DateTime"] = "date_time";
  DefaultValue2["True"] = "true";
  DefaultValue2["False"] = "false";
  DefaultValue2["UniqueId"] = "unique_id";
})(DefaultValue || (DefaultValue = {}));

// ../types/dist/applab/data/model/index.js
var ModelType;
(function(ModelType2) {
  ModelType2["DomainModel"] = "domain_entity";
  ModelType2["GenericModel"] = "generic_entity";
})(ModelType || (ModelType = {}));

// ../types/dist/applab/data/primitive/index.js
var Primitives;
(function(Primitives2) {
  Primitives2["AirportCode"] = "airport-code";
  Primitives2["BankIDCode"] = "bank-id-code";
  Primitives2["BitcoinAddress"] = "bitcoin-address";
  Primitives2["Boolean"] = "boolean";
  Primitives2["City"] = "city";
  Primitives2["Color"] = "color";
  Primitives2["CountryCode"] = "country-code";
  Primitives2["CreditCard"] = "credit-card";
  Primitives2["CurrencyAmount"] = "currency-amount";
  Primitives2["CurrencyCode"] = "currency-code";
  Primitives2["DataURI"] = "data-uri";
  Primitives2["Date"] = "date";
  Primitives2["DateRange"] = "date-range";
  Primitives2["DateTime"] = "date-time";
  Primitives2["DayOfMonth"] = "day-of-month";
  Primitives2["DomainName"] = "domain-name";
  Primitives2["EmailAddress"] = "email-address";
  Primitives2["EthereumAddress"] = "ethereum-address";
  Primitives2["EAN"] = "european-article-number";
  Primitives2["EIN"] = "employer-identification-number";
  Primitives2["Float"] = "float";
  Primitives2["GeographicCoordinate"] = "geographic-coordinate";
  Primitives2["GeographicCoordinates"] = "geographic-coordinates";
  Primitives2["GitRepositoryURL"] = "git-repository-url";
  Primitives2["HSLColor"] = "hsl-color";
  Primitives2["HexColor"] = "hex-color";
  Primitives2["Hexadecimal"] = "hexadecimal";
  Primitives2["IBAN"] = "international-bank-account-number";
  Primitives2["IMEI"] = "international-mobile-equipment-identifier";
  Primitives2["IPAddress"] = "ip-address";
  Primitives2["IPAddressRange"] = "ip-address-range";
  Primitives2["ISBN"] = "international-standard-book-number";
  Primitives2["ISIN"] = "international-stock-number";
  Primitives2["ISMN"] = "international-standard-music-number";
  Primitives2["ISSN"] = "international-standard-serial-number";
  Primitives2["ISO8601"] = "iso-8601";
  Primitives2["ISO31661Alpha2"] = "iso-31661-alpha-2";
  Primitives2["ISO31661Alpha3"] = "iso-31661-alpha-3";
  Primitives2["ISO4217"] = "iso-4217";
  Primitives2["Image"] = "image";
  Primitives2["Integer"] = "integer";
  Primitives2["JSON"] = "json";
  Primitives2["LanguageCode"] = "language-code";
  Primitives2["LicensePlateNumber"] = "license-plate-number";
  Primitives2["LongText"] = "long-text";
  Primitives2["MD5"] = "md5";
  Primitives2["Markdown"] = "markdown";
  Primitives2["Menu"] = "menu";
  Primitives2["Number"] = "number";
  Primitives2["MACAddress"] = "mac-address";
  Primitives2["MagnetURI"] = "magnet-uri";
  Primitives2["MimeType"] = "mime-type";
  Primitives2["Month"] = "month";
  Primitives2["Password"] = "password";
  Primitives2["PassportNumber"] = "passport-number";
  Primitives2["Percent"] = "percent";
  Primitives2["PhoneNumber"] = "phone-number";
  Primitives2["Port"] = "port";
  Primitives2["PostalCode"] = "postal-code";
  Primitives2["Province"] = "province";
  Primitives2["RFC3339"] = "rfc-3339";
  Primitives2["RGBColor"] = "rgb-color";
  Primitives2["SemanticVersion"] = "semantic-version";
  Primitives2["SSN"] = "social-security-number";
  Primitives2["State"] = "state";
  Primitives2["StreetAddress"] = "street-address";
  Primitives2["String"] = "string";
  Primitives2["Tags"] = "tags";
  Primitives2["TaxIDNumber"] = "tax-id-number";
  Primitives2["Time"] = "time";
  Primitives2["TimeOfDay"] = "time-of-day";
  Primitives2["TimeRange"] = "time-range";
  Primitives2["TimezoneRegion"] = "timezone-region";
  Primitives2["URL"] = "url";
  Primitives2["URLPath"] = "url-path";
  Primitives2["UUID"] = "uuid";
  Primitives2["VATIDNumber"] = "value-added-tax-id-number";
  Primitives2["VerificationCode"] = "verification-code";
  Primitives2["Video"] = "video";
  Primitives2["Weekday"] = "weekday";
  Primitives2["Year"] = "year";
})(Primitives || (Primitives = {}));

// ../types/dist/applab/problem/index.js
var Severity;
(function(Severity2) {
  Severity2["Critical"] = "Critical";
  Severity2["Error"] = "Error";
  Severity2["Fatal"] = "Fatal";
  Severity2["Warning"] = "Warning";
})(Severity || (Severity = {}));

// ../types/dist/applab/rules/condition/index.js
var Condition;
(function(Condition2) {
  Condition2["Contains"] = "contains";
  Condition2["HasCharacterCount"] = "has-character-count";
  Condition2["HasNumberCount"] = "has-number-count";
  Condition2["HasLetterCount"] = "has-letter-count";
  Condition2["HasLowercaseCount"] = "has-lowercase-count";
  Condition2["HasSpacesCount"] = "has-spaces-count";
  Condition2["HasSymbolCount"] = "has-symbol-count";
  Condition2["HasUppercaseCount"] = "has-uppercase-count";
  Condition2["IsAfter"] = "is-after";
  Condition2["IsAfterOrEqual"] = "is-after-or-equal";
  Condition2["IsAirport"] = "is-airport";
  Condition2["IsAlpha"] = "is-alpha";
  Condition2["IsAlphanumeric"] = "is-alphanumeric";
  Condition2["IsAlgorithmHash"] = "is-algorithm-hash";
  Condition2["IsAscii"] = "is-ascii";
  Condition2["IsBase64"] = "is-base-64";
  Condition2["IsBefore"] = "is-before";
  Condition2["IsBeforeOrAfter"] = "is-before-or-after";
  Condition2["IsBeforeOrEqual"] = "is-before-or-equal";
  Condition2["IsBetween"] = "is-between";
  Condition2["IsBIC"] = "is-bic";
  Condition2["IsBitcoinAddress"] = "is-bitcoin-address";
  Condition2["IsBoolean"] = "is-boolean";
  Condition2["IsColor"] = "is-color";
  Condition2["IsComplexEnough"] = "is-complex-enough";
  Condition2["IsCountry"] = "is-country";
  Condition2["IsCreditCard"] = "is-credit-card";
  Condition2["IsCurrency"] = "is-currency";
  Condition2["IsDataURI"] = "is-data-uri";
  Condition2["IsDate"] = "is-date";
  Condition2["IsDateRange"] = "is-date-range";
  Condition2["IsDateTime"] = "is-date-time";
  Condition2["IsDayOfMonth"] = "is-day-of-month";
  Condition2["IsDecimal"] = "is-decimal";
  Condition2["IsDivisibleBy"] = "is-divisible-by";
  Condition2["IsDomainName"] = "is-domain-name";
  Condition2["IsEmailAddress"] = "is-email-address";
  Condition2["IsEthereumAddress"] = "is-ethereum-address";
  Condition2["IsEAN"] = "is-ean";
  Condition2["IsEIN"] = "is-ein";
  Condition2["IsEqual"] = "is-equal";
  Condition2["IsEvenNumber"] = "is-even-number";
  Condition2["IsFloat"] = "is-float";
  Condition2["IsIBAN"] = "is-iban";
  Condition2["IsGreaterThan"] = "greater-than";
  Condition2["IsGreaterThanOrEqual"] = "greater-than-or-equal";
  Condition2["IsHSLColor"] = "is-hsl-color";
  Condition2["IsHexColor"] = "is-hex-color";
  Condition2["IsHexadecimal"] = "is-hexadecimal";
  Condition2["IsIdentityCardCode"] = "is-identity-card-code";
  Condition2["IsIMEI"] = "is-imei";
  Condition2["IsInIPAddressRange"] = "is-in-ip-address-range";
  Condition2["IsInList"] = "is-in-list";
  Condition2["IsInTheLast"] = "is-in-the-last";
  Condition2["IsInteger"] = "is-integer";
  Condition2["IsIPAddress"] = "is-ip-address";
  Condition2["IsIPAddressRange"] = "is-ip-address-range";
  Condition2["IsISBN"] = "is-isbn";
  Condition2["IsISIN"] = "is-isin";
  Condition2["IsISMN"] = "is-ismn";
  Condition2["IsISRC"] = "is-isrc";
  Condition2["IsISSN"] = "is-issn";
  Condition2["IsISO4217"] = "is-iso-4217";
  Condition2["IsISO8601"] = "is-iso-8601";
  Condition2["IsISO31661Alpha2"] = "is-iso-31661-alpha-2";
  Condition2["IsISO31661Alpha3"] = "is-iso-31661-alpha-3";
  Condition2["IsJSON"] = "is-json";
  Condition2["IsLanguage"] = "is-language";
  Condition2["IsLatitude"] = "is-latitude";
  Condition2["IsLongitude"] = "is-longitude";
  Condition2["IsLengthEqual"] = "is-length-equal";
  Condition2["IsLengthGreaterThan"] = "is-length-greater-than";
  Condition2["IsLengthGreaterThanOrEqual"] = "is-length-great-than-or-equal";
  Condition2["IsLengthLessThan"] = "is-length-less-than";
  Condition2["IsLengthLessThanOrEqual"] = "is-length-less-than-or-equal";
  Condition2["IsLessThan"] = "less-than";
  Condition2["IsLessThanOrEqual"] = "less-than-or-equal";
  Condition2["IsLicensePlateNumber"] = "is-license-plate-number";
  Condition2["IsLowercase"] = "is-lowercase";
  Condition2["IsOctal"] = "is-octal";
  Condition2["IsMACAddress"] = "is-mac-address";
  Condition2["IsMD5"] = "is-md5";
  Condition2["IsMagnetURI"] = "is-magnet-uri";
  Condition2["IsMarkdown"] = "is-markdown";
  Condition2["IsMimeType"] = "is-mime-type";
  Condition2["IsMonth"] = "is-month";
  Condition2["IsNegativeNumber"] = "is-negative-number";
  Condition2["IsNotDate"] = "is-not-date";
  Condition2["IsNotEqual"] = "is-not-equal";
  Condition2["IsNotInIPAddressRange"] = "is-not-in-ip-address-range";
  Condition2["IsNotInList"] = "is-not-in-list";
  Condition2["IsNotNull"] = "is-not-null";
  Condition2["IsNotRegexMatch"] = "is-not-regex-match";
  Condition2["IsNotToday"] = "is-not-today";
  Condition2["IsNumber"] = "is-number";
  Condition2["IsNumeric"] = "is-numeric";
  Condition2["IsOddNumber"] = "is-odd-number";
  Condition2["IsPassportNumber"] = "is-passport-number";
  Condition2["IsPhoneNumber"] = "is-phone-number";
  Condition2["IsPort"] = "is-port";
  Condition2["IsPositiveNumber"] = "is-positive-number";
  Condition2["IsPostalCode"] = "is-postal-code";
  Condition2["IsProvince"] = "is-province";
  Condition2["IsRGBColor"] = "is-rgb-color";
  Condition2["IsRegexMatch"] = "is-regex-match";
  Condition2["IsRequired"] = "is-required";
  Condition2["IsSemanticVersion"] = "is-semantic-version";
  Condition2["IsSlug"] = "is-slug";
  Condition2["IsSSN"] = "is-ssn";
  Condition2["IsState"] = "is-state";
  Condition2["IsStreetAddress"] = "is-street-address";
  Condition2["IsString"] = "is-string";
  Condition2["IsStrongPassword"] = "is-strong-password";
  Condition2["IsTags"] = "is-tags";
  Condition2["IsTaxIDNumber"] = "is-tax-id-number";
  Condition2["IsThisMonth"] = "is-this-month";
  Condition2["IsThisQuarter"] = "is-this-quarter";
  Condition2["IsThisWeek"] = "is-this-week";
  Condition2["IsThisWeekend"] = "is-this-weekend";
  Condition2["IsThisYear"] = "is-this-year";
  Condition2["IsTime"] = "is-time";
  Condition2["IsTimeOfDay"] = "is-time-of-day";
  Condition2["IsTimeRange"] = "is-time-range";
  Condition2["IsToday"] = "is-today";
  Condition2["IsURL"] = "is-url";
  Condition2["IsUUID"] = "is-uuid";
  Condition2["IsUppercase"] = "is-uppercase";
  Condition2["IsUsernameAvailable"] = "is-username-available";
  Condition2["IsValidStreetAddress"] = "is-valid-street-address";
  Condition2["IsVATIDNumber"] = "is-vat-id-number";
  Condition2["IsWeekday"] = "is-weekday";
  Condition2["IsWeekend"] = "is-weekend";
  Condition2["IsYear"] = "is-year";
})(Condition || (Condition = {}));
var AuthenticationCondition;
(function(AuthenticationCondition2) {
  AuthenticationCondition2["IsAuthenticated"] = "is-authenticated";
  AuthenticationCondition2["IsNotAuthenticated"] = "is-not-authenticated";
  AuthenticationCondition2["IsUsernameAvailable"] = "is-username-available";
  AuthenticationCondition2["PasswordMismatch"] = "password-mismatch";
})(AuthenticationCondition || (AuthenticationCondition = {}));

// ../types/dist/applab/rules/condition/primitive/appearance/color.js
var ColorCondition;
(function(ColorCondition2) {
  ColorCondition2["IsHSLColor"] = "is-hsl-color";
  ColorCondition2["IsHexColor"] = "is-hex-color";
  ColorCondition2["IsNotNull"] = "is-not-null";
  ColorCondition2["IsRGBColor"] = "is-rgb-color";
  ColorCondition2["IsString"] = "is-string";
})(ColorCondition || (ColorCondition = {}));

// ../types/dist/applab/rules/condition/primitive/i18n/currency.js
var CurrencyCondition;
(function(CurrencyCondition2) {
  CurrencyCondition2["IsBetween"] = "is-between";
  CurrencyCondition2["IsCurrency"] = "is-currency";
  CurrencyCondition2["IsDecimal"] = "is-decimal";
  CurrencyCondition2["IsDivisibleBy"] = "is-divisible-by";
  CurrencyCondition2["IsEvenNumber"] = "is-even-number";
  CurrencyCondition2["IsFloat"] = "is-float";
  CurrencyCondition2["IsGreaterThan"] = "greater-than";
  CurrencyCondition2["IsGreaterThanOrEqual"] = "greater-than-or-equal";
  CurrencyCondition2["IsInteger"] = "is-integer";
  CurrencyCondition2["IsISO8601"] = "is-iso-8601";
  CurrencyCondition2["IsLessThan"] = "less-than";
  CurrencyCondition2["IsLessThanOrEqual"] = "less-than-or-equal";
  CurrencyCondition2["IsNegativeNumber"] = "is-negative-number";
  CurrencyCondition2["IsNotEqual"] = "is-not-equal";
  CurrencyCondition2["IsNotNull"] = "is-not-null";
  CurrencyCondition2["IsNumber"] = "is-number";
  CurrencyCondition2["IsOddNumber"] = "is-odd-number";
  CurrencyCondition2["IsPositiveNumber"] = "is-positive-number";
})(CurrencyCondition || (CurrencyCondition = {}));
var BitcoinAddressCondition;
(function(BitcoinAddressCondition2) {
  BitcoinAddressCondition2["IsBitcoinAddress"] = "is-bitcoin-address";
  BitcoinAddressCondition2["IsEqual"] = "is-equal";
  BitcoinAddressCondition2["IsNotEqual"] = "is-not-equal";
  BitcoinAddressCondition2["IsNotNull"] = "is-not-null";
})(BitcoinAddressCondition || (BitcoinAddressCondition = {}));
var EthereumAddressCondition;
(function(EthereumAddressCondition2) {
  EthereumAddressCondition2["IsEthereumAddress"] = "is-ethereum-address";
  EthereumAddressCondition2["IsEqual"] = "is-equal";
  EthereumAddressCondition2["IsNotEqual"] = "is-not-equal";
  EthereumAddressCondition2["IsNotNull"] = "is-not-null";
})(EthereumAddressCondition || (EthereumAddressCondition = {}));

// ../types/dist/applab/rules/condition/primitive/i18n/language.js
var LanguageCondition;
(function(LanguageCondition2) {
  LanguageCondition2["IsEqual"] = "is-equal";
  LanguageCondition2["IsJSON"] = "is-json";
  LanguageCondition2["IsLanguage"] = "is-language";
  LanguageCondition2["IsNotEqual"] = "is-not-equal";
  LanguageCondition2["IsNotNull"] = "is-not-null";
})(LanguageCondition || (LanguageCondition = {}));

// ../types/dist/applab/rules/condition/primitive/i18n/locale.js
var CityCondition;
(function(CityCondition2) {
  CityCondition2["IsAlpha"] = "is-alpha";
  CityCondition2["IsEqual"] = "is-equal";
  CityCondition2["IsInList"] = "is-in-list";
  CityCondition2["IsNotEqual"] = "is-not-equal";
  CityCondition2["IsNotInList"] = "is-not-in-list";
  CityCondition2["IsNotNull"] = "is-not-null";
  CityCondition2["IsString"] = "is-string";
})(CityCondition || (CityCondition = {}));
var CountryCondition;
(function(CountryCondition2) {
  CountryCondition2["IsAlpha"] = "is-alpha";
  CountryCondition2["IsCountry"] = "is-country";
  CountryCondition2["IsEqual"] = "is-equal";
  CountryCondition2["IsInList"] = "is-in-list";
  CountryCondition2["IsNotEqual"] = "is-not-equal";
  CountryCondition2["IsNotInList"] = "is-not-in-list";
  CountryCondition2["IsNotNull"] = "is-not-null";
  CountryCondition2["IsString"] = "is-string";
})(CountryCondition || (CountryCondition = {}));
var LatitudeCondition;
(function(LatitudeCondition2) {
  LatitudeCondition2["IsEqual"] = "is-equal";
  LatitudeCondition2["IsFloat"] = "is-float";
  LatitudeCondition2["IsNotEqual"] = "is-not-equal";
  LatitudeCondition2["IsNotNull"] = "is-not-null";
  LatitudeCondition2["IsNumeric"] = "is-numeric";
})(LatitudeCondition || (LatitudeCondition = {}));
var LongitudeCondition;
(function(LongitudeCondition2) {
  LongitudeCondition2["IsEqual"] = "is-equal";
  LongitudeCondition2["IsFloat"] = "is-float";
  LongitudeCondition2["IsNotEqual"] = "is-not-equal";
  LongitudeCondition2["IsNotNull"] = "is-not-null";
  LongitudeCondition2["IsNumeric"] = "is-numeric";
})(LongitudeCondition || (LongitudeCondition = {}));
var PostalCodeCondition;
(function(PostalCodeCondition2) {
  PostalCodeCondition2["IsEqual"] = "is-equal";
  PostalCodeCondition2["IsNotEqual"] = "is-not-equal";
  PostalCodeCondition2["IsPostalCode"] = "is-postal-code";
  PostalCodeCondition2["IsNotNull"] = "is-not-null";
})(PostalCodeCondition || (PostalCodeCondition = {}));
var ProvinceCondition;
(function(ProvinceCondition2) {
  ProvinceCondition2["IsAlpha"] = "is-alpha";
  ProvinceCondition2["IsEqual"] = "is-equal";
  ProvinceCondition2["IsInList"] = "is-in-list";
  ProvinceCondition2["IsNotEqual"] = "is-not-equal";
  ProvinceCondition2["IsNotInList"] = "is-not-in-list";
  ProvinceCondition2["IsNotNull"] = "is-not-null";
  ProvinceCondition2["IsProvince"] = "is-province";
  ProvinceCondition2["IsString"] = "is-string";
})(ProvinceCondition || (ProvinceCondition = {}));
var StateCondition;
(function(StateCondition2) {
  StateCondition2["IsAlpha"] = "is-alpha";
  StateCondition2["IsEqual"] = "is-equal";
  StateCondition2["IsInList"] = "is-in-list";
  StateCondition2["IsNotEqual"] = "is-not-equal";
  StateCondition2["IsNotInList"] = "is-not-in-list";
  StateCondition2["IsNotNull"] = "is-not-null";
  StateCondition2["IsState"] = "is-state";
  StateCondition2["IsString"] = "is-string";
})(StateCondition || (StateCondition = {}));
var StreetAddressCondition;
(function(StreetAddressCondition2) {
  StreetAddressCondition2["IsAlphanumeric"] = "is-alphanumeric";
  StreetAddressCondition2["IsEqual"] = "is-equal";
  StreetAddressCondition2["IsNotEqual"] = "is-not-equal";
  StreetAddressCondition2["IsNotNull"] = "is-not-null";
  StreetAddressCondition2["IsString"] = "is-string";
  StreetAddressCondition2["IsStreetAddress"] = "is-street-address";
})(StreetAddressCondition || (StreetAddressCondition = {}));

// ../types/dist/applab/rules/condition/primitive/places/transportation/airport.js
var AirportCondition;
(function(AirportCondition2) {
  AirportCondition2["IsAirport"] = "is-airport";
  AirportCondition2["IsAlpha"] = "is-alpha";
  AirportCondition2["IsEqual"] = "is-equal";
  AirportCondition2["IsInList"] = "is-in-list";
  AirportCondition2["IsNotEqual"] = "is-not-equal";
  AirportCondition2["IsNotInList"] = "is-not-in-list";
  AirportCondition2["IsNotNull"] = "is-not-null";
  AirportCondition2["IsString"] = "is-string";
})(AirportCondition || (AirportCondition = {}));

// ../types/dist/applab/rules/condition/primitive/application.js
var AlgorithmHashCondition;
(function(AlgorithmHashCondition2) {
  AlgorithmHashCondition2["IsAlgorithmHash"] = "is-algorithm-hash";
  AlgorithmHashCondition2["IsEqual"] = "is-equal";
  AlgorithmHashCondition2["IsInList"] = "is-in-list";
  AlgorithmHashCondition2["IsNotEqual"] = "is-not-equal";
  AlgorithmHashCondition2["IsNotInList"] = "is-not-in-list";
  AlgorithmHashCondition2["IsNotNull"] = "is-not-null";
  AlgorithmHashCondition2["IsString"] = "is-string";
})(AlgorithmHashCondition || (AlgorithmHashCondition = {}));
var SemanticVersionCondition;
(function(SemanticVersionCondition2) {
  SemanticVersionCondition2["IsEqual"] = "is-equal";
  SemanticVersionCondition2["IsInList"] = "is-in-list";
  SemanticVersionCondition2["IsNotEqual"] = "is-not-equal";
  SemanticVersionCondition2["IsNotInList"] = "is-not-in-list";
  SemanticVersionCondition2["IsNotNull"] = "is-not-null";
  SemanticVersionCondition2["IsSemanticVersion"] = "is-semantic-version";
  SemanticVersionCondition2["IsString"] = "is-string";
})(SemanticVersionCondition || (SemanticVersionCondition = {}));
var UUIDCondition;
(function(UUIDCondition2) {
  UUIDCondition2["IsEqual"] = "is-equal";
  UUIDCondition2["IsInList"] = "is-in-list";
  UUIDCondition2["IsNotEqual"] = "is-not-equal";
  UUIDCondition2["IsNotInList"] = "is-not-in-list";
  UUIDCondition2["IsNotNull"] = "is-not-null";
  UUIDCondition2["IsString"] = "is-string";
  UUIDCondition2["IsUUID"] = "is-uuid";
})(UUIDCondition || (UUIDCondition = {}));
var MD5Condition;
(function(MD5Condition2) {
  MD5Condition2["IsEqual"] = "is-equal";
  MD5Condition2["IsInList"] = "is-in-list";
  MD5Condition2["IsMD5"] = "is-md5";
  MD5Condition2["IsNotEqual"] = "is-not-equal";
  MD5Condition2["IsNotInList"] = "is-not-in-list";
  MD5Condition2["IsNotNull"] = "is-not-null";
  MD5Condition2["IsString"] = "is-string";
})(MD5Condition || (MD5Condition = {}));

// ../types/dist/applab/rules/condition/primitive/boolean.js
var BooleanCondition;
(function(BooleanCondition2) {
  BooleanCondition2["IsBoolean"] = "is-boolean";
  BooleanCondition2["IsEqual"] = "is-equal";
  BooleanCondition2["IsNotEqual"] = "is-not-equal";
  BooleanCondition2["IsNotNull"] = "is-not-null";
})(BooleanCondition || (BooleanCondition = {}));

// ../types/dist/applab/rules/condition/primitive/date.js
var DateCondition;
(function(DateCondition2) {
  DateCondition2["IsAfter"] = "is-after";
  DateCondition2["IsAfterOrEqual"] = "is-after-or-equal";
  DateCondition2["IsBefore"] = "is-before";
  DateCondition2["IsBeforeOrEqual"] = "is-before-or-equal";
  DateCondition2["IsBetween"] = "is-between";
  DateCondition2["IsDate"] = "is-date";
  DateCondition2["IsEqual"] = "is-equal";
  DateCondition2["IsNotDate"] = "is-not-date";
  DateCondition2["IsNotEqual"] = "is-not-equal";
  DateCondition2["IsNotNull"] = "is-not-null";
  DateCondition2["IsNotToday"] = "is-not-today";
  DateCondition2["IsThisWeek"] = "is-this-week";
  DateCondition2["IsThisMonth"] = "is-this-month";
  DateCondition2["IsThisQuarter"] = "is-this-quarter";
  DateCondition2["IsThisYear"] = "is-this-year";
  DateCondition2["IsToday"] = "is-today";
  DateCondition2["IsWeekend"] = "is-weekend";
})(DateCondition || (DateCondition = {}));
var DateRangeCondition;
(function(DateRangeCondition2) {
  DateRangeCondition2["IsAfter"] = "is-after";
  DateRangeCondition2["IsBefore"] = "is-before";
  DateRangeCondition2["IsBeforeOrAfter"] = "is-before-or-after";
  DateRangeCondition2["IsBetween"] = "is-between";
  DateRangeCondition2["IsDate"] = "is-date";
  DateRangeCondition2["IsDateRange"] = "is-date-range";
  DateRangeCondition2["IsEqual"] = "is-equal";
  DateRangeCondition2["IsNotEqual"] = "is-not-equal";
  DateRangeCondition2["IsNotNull"] = "is-not-null";
})(DateRangeCondition || (DateRangeCondition = {}));
var DateTimeCondition;
(function(DateTimeCondition2) {
  DateTimeCondition2["IsAfter"] = "is-after";
  DateTimeCondition2["IsAfterOrEqual"] = "is-after-or-equal";
  DateTimeCondition2["IsBefore"] = "is-before";
  DateTimeCondition2["IsBeforeOrEqual"] = "is-before-or-equal";
  DateTimeCondition2["IsBetween"] = "is-between";
  DateTimeCondition2["IsDate"] = "is-date";
  DateTimeCondition2["IsEqual"] = "is-equal";
  DateTimeCondition2["IsNotDate"] = "is-not-date";
  DateTimeCondition2["IsNotEqual"] = "is-not-equal";
  DateTimeCondition2["IsNotNull"] = "is-not-null";
  DateTimeCondition2["IsNotToday"] = "is-not-today";
  DateTimeCondition2["IsThisWeek"] = "is-this-week";
  DateTimeCondition2["IsThisMonth"] = "is-this-month";
  DateTimeCondition2["IsThisQuarter"] = "is-this-quarter";
  DateTimeCondition2["IsThisYear"] = "is-this-year";
  DateTimeCondition2["IsToday"] = "is-today";
  DateTimeCondition2["IsWeekend"] = "is-weekend";
})(DateTimeCondition || (DateTimeCondition = {}));
var DayOfMonthCondition;
(function(DayOfMonthCondition2) {
  DayOfMonthCondition2["IsAfter"] = "is-after";
  DayOfMonthCondition2["IsAfterOrEqual"] = "is-after-or-equal";
  DayOfMonthCondition2["IsBefore"] = "is-before";
  DayOfMonthCondition2["IsBeforeOrEqual"] = "is-before-or-equal";
  DayOfMonthCondition2["IsBetween"] = "is-between";
  DayOfMonthCondition2["IsDayOfMonth"] = "is-day-of-month";
  DayOfMonthCondition2["IsEvenNumber"] = "is-even-number";
  DayOfMonthCondition2["IsEqual"] = "is-equal";
  DayOfMonthCondition2["IsGreaterThan"] = "greater-than";
  DayOfMonthCondition2["IsGreaterThanOrEqual"] = "greater-than-or-equal";
  DayOfMonthCondition2["IsInteger"] = "is-integer";
  DayOfMonthCondition2["IsLessThan"] = "less-than";
  DayOfMonthCondition2["IsLessThanOrEqual"] = "less-than-or-equal";
  DayOfMonthCondition2["IsNotEqual"] = "is-not-equal";
  DayOfMonthCondition2["IsNotNull"] = "is-not-null";
  DayOfMonthCondition2["IsNumber"] = "is-number";
  DayOfMonthCondition2["IsOddNumber"] = "is-odd-number";
  DayOfMonthCondition2["IsToday"] = "is-today";
  DayOfMonthCondition2["IsWeekday"] = "is-weekday";
  DayOfMonthCondition2["IsWeekend"] = "is-weekend";
})(DayOfMonthCondition || (DayOfMonthCondition = {}));
var MonthCondition;
(function(MonthCondition2) {
  MonthCondition2["IsAfter"] = "is-after";
  MonthCondition2["IsAfterOrEqual"] = "is-after-or-equal";
  MonthCondition2["IsBefore"] = "is-before";
  MonthCondition2["IsBeforeOrEqual"] = "is-before-or-equal";
  MonthCondition2["IsBetween"] = "is-between";
  MonthCondition2["IsEvenNumber"] = "is-even-number";
  MonthCondition2["IsEqual"] = "is-equal";
  MonthCondition2["IsGreaterThan"] = "greater-than";
  MonthCondition2["IsGreaterThanOrEqual"] = "greater-than-or-equal";
  MonthCondition2["IsInteger"] = "is-integer";
  MonthCondition2["IsLessThan"] = "less-than";
  MonthCondition2["IsLessThanOrEqual"] = "less-than-or-equal";
  MonthCondition2["IsMonth"] = "is-month";
  MonthCondition2["IsNotEqual"] = "is-not-equal";
  MonthCondition2["IsNotNull"] = "is-not-null";
  MonthCondition2["IsNumber"] = "is-number";
  MonthCondition2["IsOddNumber"] = "is-odd-number";
  MonthCondition2["IsThisMonth"] = "is-this-month";
})(MonthCondition || (MonthCondition = {}));
var TimeCondition;
(function(TimeCondition2) {
  TimeCondition2["IsAfter"] = "is-after";
  TimeCondition2["IsAfterOrEqual"] = "is-after-or-equal";
  TimeCondition2["IsBefore"] = "is-before";
  TimeCondition2["IsBeforeOrEqual"] = "is-before-or-equal";
  TimeCondition2["IsBetween"] = "is-between";
  TimeCondition2["IsEqual"] = "is-equal";
  TimeCondition2["IsNotEqual"] = "is-not-equal";
  TimeCondition2["IsNotNull"] = "is-not-null";
  TimeCondition2["IsTime"] = "is-time";
})(TimeCondition || (TimeCondition = {}));
var TimeRangeCondition;
(function(TimeRangeCondition2) {
  TimeRangeCondition2["IsAfter"] = "is-after";
  TimeRangeCondition2["IsBefore"] = "is-before";
  TimeRangeCondition2["IsBeforeOrAfter"] = "is-before-or-after";
  TimeRangeCondition2["IsBetween"] = "is-between";
  TimeRangeCondition2["IsTime"] = "is-time";
  TimeRangeCondition2["IsEqual"] = "is-equal";
  TimeRangeCondition2["IsNotEqual"] = "is-not-equal";
  TimeRangeCondition2["IsNotNull"] = "is-not-null";
  TimeRangeCondition2["IsTimeRange"] = "is-time-range";
})(TimeRangeCondition || (TimeRangeCondition = {}));
var TimeOfDayCondition;
(function(TimeOfDayCondition2) {
  TimeOfDayCondition2["IsAfter"] = "is-after";
  TimeOfDayCondition2["IsBefore"] = "is-before";
  TimeOfDayCondition2["IsBeforeOrAfter"] = "is-before-or-after";
  TimeOfDayCondition2["IsBetween"] = "is-between";
  TimeOfDayCondition2["IsEqual"] = "is-equal";
  TimeOfDayCondition2["IsInList"] = "is-in-list";
  TimeOfDayCondition2["IsNotEqual"] = "is-not-equal";
  TimeOfDayCondition2["IsNotInList"] = "is-not-in-list";
  TimeOfDayCondition2["IsNotNull"] = "is-not-null";
  TimeOfDayCondition2["IsTimeOfDay"] = "is-time-of-day";
  TimeOfDayCondition2["IsTimeRange"] = "is-time-range";
})(TimeOfDayCondition || (TimeOfDayCondition = {}));
var WeekdayCondition;
(function(WeekdayCondition2) {
  WeekdayCondition2["IsAfter"] = "is-after";
  WeekdayCondition2["IsAfterOrEqual"] = "is-after-or-equal";
  WeekdayCondition2["IsBefore"] = "is-before";
  WeekdayCondition2["IsBeforeOrEqual"] = "is-before-or-equal";
  WeekdayCondition2["IsBetween"] = "is-between";
  WeekdayCondition2["IsEvenNumber"] = "is-even-number";
  WeekdayCondition2["IsEqual"] = "is-equal";
  WeekdayCondition2["IsGreaterThan"] = "greater-than";
  WeekdayCondition2["IsGreaterThanOrEqual"] = "greater-than-or-equal";
  WeekdayCondition2["IsLessThan"] = "less-than";
  WeekdayCondition2["IsLessThanOrEqual"] = "less-than-or-equal";
  WeekdayCondition2["IsNotEqual"] = "is-not-equal";
  WeekdayCondition2["IsNotNull"] = "is-not-null";
  WeekdayCondition2["IsNumber"] = "is-number";
  WeekdayCondition2["IsOddNumber"] = "is-odd-number";
  WeekdayCondition2["IsWeekday"] = "is-weekday";
  WeekdayCondition2["IsWeekend"] = "is-weekend";
})(WeekdayCondition || (WeekdayCondition = {}));
var YearCondition;
(function(YearCondition2) {
  YearCondition2["IsAfter"] = "is-after";
  YearCondition2["IsAfterOrEqual"] = "is-after-or-equal";
  YearCondition2["IsBefore"] = "is-before";
  YearCondition2["IsBeforeOrEqual"] = "is-before-or-equal";
  YearCondition2["IsBetween"] = "is-between";
  YearCondition2["IsEvenNumber"] = "is-even-number";
  YearCondition2["IsEqual"] = "is-equal";
  YearCondition2["IsGreaterThan"] = "greater-than";
  YearCondition2["IsGreaterThanOrEqual"] = "greater-than-or-equal";
  YearCondition2["IsInteger"] = "is-integer";
  YearCondition2["IsLessThan"] = "less-than";
  YearCondition2["IsLessThanOrEqual"] = "less-than-or-equal";
  YearCondition2["IsNotEqual"] = "is-not-equal";
  YearCondition2["IsNotNull"] = "is-not-null";
  YearCondition2["IsNumber"] = "is-number";
  YearCondition2["IsOddNumber"] = "is-odd-number";
  YearCondition2["IsThisYear"] = "is-this-year";
  YearCondition2["IsYear"] = "is-year";
})(YearCondition || (YearCondition = {}));

// ../types/dist/applab/rules/condition/primitive/format.js
var HexadecimalCondition;
(function(HexadecimalCondition2) {
  HexadecimalCondition2["IsEqual"] = "is-equal";
  HexadecimalCondition2["IsHexadecimal"] = "is-hexadecimal";
  HexadecimalCondition2["IsLengthEqual"] = "is-length-equal";
  HexadecimalCondition2["IsLengthGreaterThan"] = "is-length-greater-than";
  HexadecimalCondition2["IsLengthGreaterThanOrEqual"] = "is-length-great-than-or-equal";
  HexadecimalCondition2["IsLengthLessThan"] = "is-length-less-than";
  HexadecimalCondition2["IsLengthLessThanOrEqual"] = "is-length-less-than-or-equal";
  HexadecimalCondition2["IsNotEqual"] = "is-not-equal";
  HexadecimalCondition2["IsNotNull"] = "is-not-null";
  HexadecimalCondition2["IsString"] = "is-string";
})(HexadecimalCondition || (HexadecimalCondition = {}));
var JSONCondition;
(function(JSONCondition2) {
  JSONCondition2["IsEqual"] = "is-equal";
  JSONCondition2["IsJSON"] = "is-json";
  JSONCondition2["IsNotEqual"] = "is-not-equal";
  JSONCondition2["IsNotNull"] = "is-not-null";
})(JSONCondition || (JSONCondition = {}));
var MarkdownCondition;
(function(MarkdownCondition2) {
  MarkdownCondition2["IsEqual"] = "is-equal";
  MarkdownCondition2["IsNotEqual"] = "is-not-equal";
  MarkdownCondition2["IsNotNull"] = "is-not-null";
  MarkdownCondition2["IsMarkdown"] = "is-markdown";
  MarkdownCondition2["IsString"] = "is-string";
})(MarkdownCondition || (MarkdownCondition = {}));

// ../types/dist/applab/rules/condition/primitive/menu.js
var MenuCondition;
(function(MenuCondition2) {
  MenuCondition2["Contains"] = "contains";
  MenuCondition2["IsEqual"] = "is-equal";
  MenuCondition2["IsNotEqual"] = "is-not-equal";
  MenuCondition2["IsNotNull"] = "is-not-null";
})(MenuCondition || (MenuCondition = {}));
var TagsCondition;
(function(TagsCondition2) {
  TagsCondition2["Contains"] = "contains";
  TagsCondition2["IsEqual"] = "is-equal";
  TagsCondition2["IsNotEqual"] = "is-not-equal";
  TagsCondition2["IsNotNull"] = "is-not-null";
})(TagsCondition || (TagsCondition = {}));

// ../types/dist/applab/rules/condition/primitive/network.js
var DataURICondition;
(function(DataURICondition2) {
  DataURICondition2["Contains"] = "contains";
  DataURICondition2["IsDataURI"] = "is-data-uri";
  DataURICondition2["IsEqual"] = "is-equal";
  DataURICondition2["IsNotEqual"] = "is-not-equal";
  DataURICondition2["IsNotNull"] = "is-not-null";
  DataURICondition2["IsString"] = "is-string";
})(DataURICondition || (DataURICondition = {}));
var DomainNameCondition;
(function(DomainNameCondition2) {
  DomainNameCondition2["Contains"] = "contains";
  DomainNameCondition2["IsDomainName"] = "is-domain-name";
  DomainNameCondition2["IsEqual"] = "is-equal";
  DomainNameCondition2["IsNotEqual"] = "is-not-equal";
  DomainNameCondition2["IsNotNull"] = "is-not-null";
  DomainNameCondition2["IsString"] = "is-string";
})(DomainNameCondition || (DomainNameCondition = {}));
var EmailCondition;
(function(EmailCondition2) {
  EmailCondition2["Contains"] = "contains";
  EmailCondition2["IsEmailAddress"] = "is-email-address";
  EmailCondition2["IsEqual"] = "is-equal";
  EmailCondition2["IsInList"] = "is-in-list";
  EmailCondition2["IsNotEqual"] = "is-not-equal";
  EmailCondition2["IsNotInList"] = "is-not-in-list";
  EmailCondition2["IsNotNull"] = "is-not-null";
  EmailCondition2["IsString"] = "is-string";
})(EmailCondition || (EmailCondition = {}));
var IPAddressCondition;
(function(IPAddressCondition2) {
  IPAddressCondition2["Contains"] = "contains";
  IPAddressCondition2["IsEqual"] = "is-equal";
  IPAddressCondition2["IsIPAddress"] = "is-ip-address";
  IPAddressCondition2["IsInIPAddressRange"] = "is-in-ip-address-range";
  IPAddressCondition2["IsInList"] = "is-in-list";
  IPAddressCondition2["IsNotEqual"] = "is-not-equal";
  IPAddressCondition2["IsNotInList"] = "is-not-in-list";
  IPAddressCondition2["IsNotInIPAddressRange"] = "is-not-in-ip-address-range";
  IPAddressCondition2["IsNotNull"] = "is-not-null";
  IPAddressCondition2["IsString"] = "is-string";
})(IPAddressCondition || (IPAddressCondition = {}));
var IPAddressRangeCondition;
(function(IPAddressRangeCondition2) {
  IPAddressRangeCondition2["IsEqual"] = "is-equal";
  IPAddressRangeCondition2["IsIPAddressRange"] = "is-ip-address-range";
  IPAddressRangeCondition2["IsInList"] = "is-in-list";
  IPAddressRangeCondition2["IsNotEqual"] = "is-not-equal";
  IPAddressRangeCondition2["IsNotInList"] = "is-not-in-list";
  IPAddressRangeCondition2["IsNotInIPAddressRange"] = "is-not-in-ip-address-range";
  IPAddressRangeCondition2["IsNotNull"] = "is-not-null";
  IPAddressRangeCondition2["IsString"] = "is-string";
})(IPAddressRangeCondition || (IPAddressRangeCondition = {}));
var PortCondition;
(function(PortCondition2) {
  PortCondition2["IsEqual"] = "is-equal";
  PortCondition2["IsGreaterThan"] = "greater-than";
  PortCondition2["IsGreaterThanOrEqual"] = "greater-than-or-equal";
  PortCondition2["IsInteger"] = "is-integer";
  PortCondition2["IsLessThan"] = "less-than";
  PortCondition2["IsLessThanOrEqual"] = "less-than-or-equal";
  PortCondition2["IsNotEqual"] = "is-not-equal";
  PortCondition2["IsNotNull"] = "is-not-null";
})(PortCondition || (PortCondition = {}));
var MACAddressCondition;
(function(MACAddressCondition2) {
  MACAddressCondition2["Contains"] = "contains";
  MACAddressCondition2["IsEqual"] = "is-equal";
  MACAddressCondition2["IsInList"] = "is-in-list";
  MACAddressCondition2["IsMACAddress"] = "is-mac-address";
  MACAddressCondition2["IsNotEqual"] = "is-not-equal";
  MACAddressCondition2["IsNotInList"] = "is-not-in-list";
  MACAddressCondition2["IsNotNull"] = "is-not-null";
  MACAddressCondition2["IsString"] = "is-string";
})(MACAddressCondition || (MACAddressCondition = {}));
var MagnetURICondition;
(function(MagnetURICondition2) {
  MagnetURICondition2["Contains"] = "contains";
  MagnetURICondition2["IsEqual"] = "is-equal";
  MagnetURICondition2["IsInList"] = "is-in-list";
  MagnetURICondition2["IsMagnetURI"] = "is-magnet-uri";
  MagnetURICondition2["IsNotEqual"] = "is-not-equal";
  MagnetURICondition2["IsNotInList"] = "is-not-in-list";
  MagnetURICondition2["IsNotNull"] = "is-not-null";
  MagnetURICondition2["IsString"] = "is-string";
})(MagnetURICondition || (MagnetURICondition = {}));
var MimeTypeCondition;
(function(MimeTypeCondition2) {
  MimeTypeCondition2["Contains"] = "contains";
  MimeTypeCondition2["IsEqual"] = "is-equal";
  MimeTypeCondition2["IsInList"] = "is-in-list";
  MimeTypeCondition2["IsMimeType"] = "is-mime-type";
  MimeTypeCondition2["IsNotEqual"] = "is-not-equal";
  MimeTypeCondition2["IsNotInList"] = "is-not-in-list";
  MimeTypeCondition2["IsNotNull"] = "is-not-null";
  MimeTypeCondition2["IsString"] = "is-string";
})(MimeTypeCondition || (MimeTypeCondition = {}));
var SlugCondition;
(function(SlugCondition2) {
  SlugCondition2["Contains"] = "contains";
  SlugCondition2["IsEqual"] = "is-equal";
  SlugCondition2["IsInList"] = "is-in-list";
  SlugCondition2["IsNotEqual"] = "is-not-equal";
  SlugCondition2["IsNotInList"] = "is-not-in-list";
  SlugCondition2["IsNotNull"] = "is-not-null";
  SlugCondition2["IsString"] = "is-string";
  SlugCondition2["IsSlug"] = "is-slug";
})(SlugCondition || (SlugCondition = {}));
var URLCondition;
(function(URLCondition2) {
  URLCondition2["Contains"] = "contains";
  URLCondition2["IsEqual"] = "is-equal";
  URLCondition2["IsInList"] = "is-in-list";
  URLCondition2["IsNotEqual"] = "is-not-equal";
  URLCondition2["IsNotInList"] = "is-not-in-list";
  URLCondition2["IsNotNull"] = "is-not-null";
  URLCondition2["IsString"] = "is-string";
  URLCondition2["IsURL"] = "is-url";
})(URLCondition || (URLCondition = {}));

// ../types/dist/applab/rules/condition/primitive/number.js
var NumberCondition;
(function(NumberCondition2) {
  NumberCondition2["IsAfter"] = "is-after";
  NumberCondition2["IsAfterOrEqual"] = "is-after-or-equal";
  NumberCondition2["IsBefore"] = "is-before";
  NumberCondition2["IsBeforeOrEqual"] = "is-before-or-equal";
  NumberCondition2["IsBetween"] = "is-between";
  NumberCondition2["IsDecimal"] = "is-decimal";
  NumberCondition2["IsDivisibleBy"] = "is-divisible-by";
  NumberCondition2["IsEAN"] = "is-ean";
  NumberCondition2["IsEIN"] = "is-ein";
  NumberCondition2["IsEqual"] = "is-equal";
  NumberCondition2["IsEvenNumber"] = "is-even-number";
  NumberCondition2["IsFloat"] = "is-float";
  NumberCondition2["IsGreaterThan"] = "greater-than";
  NumberCondition2["IsGreaterThanOrEqual"] = "greater-than-or-equal";
  NumberCondition2["IsInt"] = "is-integer";
  NumberCondition2["IsISBN"] = "is-isbn";
  NumberCondition2["IsISMN"] = "is-ismn";
  NumberCondition2["IsISSN"] = "is-issn";
  NumberCondition2["IsLatitude"] = "is-latitude";
  NumberCondition2["IsLongitude"] = "is-longitude";
  NumberCondition2["IsLessThan"] = "less-than";
  NumberCondition2["IsLessThanOrEqual"] = "less-than-or-equal";
  NumberCondition2["IsMACAddress"] = "is-mac-address";
  NumberCondition2["IsNumber"] = "is-number";
  NumberCondition2["IsNegativeNumber"] = "is-negative-number";
  NumberCondition2["IsNotEqual"] = "is-not-equal";
  NumberCondition2["IsNotNull"] = "is-not-null";
  NumberCondition2["IsOddNumber"] = "is-odd-number";
  NumberCondition2["IsPassportNumber"] = "is-passport-number";
  NumberCondition2["IsPhoneNumber"] = "is-phone-number";
  NumberCondition2["IsPort"] = "is-port";
  NumberCondition2["IsPositiveNumber"] = "is-positive-number";
  NumberCondition2["IsPostalCode"] = "is-postal-code";
  NumberCondition2["IsSemanticVersion"] = "is-semantic-version";
  NumberCondition2["IsSSN"] = "is-ssn";
  NumberCondition2["IsTaxIDNumber"] = "is-tax-id-number";
  NumberCondition2["IsUUID"] = "is-uuid";
  NumberCondition2["IsVATIDNumber"] = "is-vat-id-number";
})(NumberCondition || (NumberCondition = {}));
var FloatCondition;
(function(FloatCondition2) {
  FloatCondition2["IsEqual"] = "is-equal";
  FloatCondition2["IsFloat"] = "is-float";
  FloatCondition2["IsGreaterThan"] = "greater-than";
  FloatCondition2["IsGreaterThanOrEqual"] = "greater-than-or-equal";
  FloatCondition2["IsLessThan"] = "less-than";
  FloatCondition2["IsLessThanOrEqual"] = "less-than-or-equal";
  FloatCondition2["IsNotEqual"] = "is-not-equal";
  FloatCondition2["IsNotNull"] = "is-not-null";
  FloatCondition2["IsNumber"] = "is-number";
  FloatCondition2["IsNumeric"] = "is-numeric";
})(FloatCondition || (FloatCondition = {}));
var IntegerCondition;
(function(IntegerCondition2) {
  IntegerCondition2["IsEqual"] = "is-equal";
  IntegerCondition2["IsInteger"] = "is-integer";
  IntegerCondition2["IsGreaterThan"] = "greater-than";
  IntegerCondition2["IsGreaterThanOrEqual"] = "greater-than-or-equal";
  IntegerCondition2["IsLessThan"] = "less-than";
  IntegerCondition2["IsLessThanOrEqual"] = "less-than-or-equal";
  IntegerCondition2["IsNotEqual"] = "is-not-equal";
  IntegerCondition2["IsNotNull"] = "is-not-null";
  IntegerCondition2["IsNumber"] = "is-number";
  IntegerCondition2["IsNumeric"] = "is-numeric";
})(IntegerCondition || (IntegerCondition = {}));

// ../types/dist/applab/rules/condition/primitive/pii.js
var CreditCardCondition;
(function(CreditCardCondition2) {
  CreditCardCondition2["IsCreditCard"] = "is-credit-card";
  CreditCardCondition2["IsEqual"] = "is-equal";
  CreditCardCondition2["IsLengthEqual"] = "is-length-equal";
  CreditCardCondition2["IsLengthGreaterThan"] = "is-length-greater-than";
  CreditCardCondition2["IsLengthGreaterThanOrEqual"] = "is-length-great-than-or-equal";
  CreditCardCondition2["IsLengthLessThan"] = "is-length-less-than";
  CreditCardCondition2["IsLengthLessThanOrEqual"] = "is-length-less-than-or-equal";
  CreditCardCondition2["IsNotEqual"] = "is-not-equal";
  CreditCardCondition2["IsNotNull"] = "is-not-null";
  CreditCardCondition2["IsRegexMatch"] = "is-regex-match";
  CreditCardCondition2["IsNotRegexMatch"] = "is-not-regex-match";
})(CreditCardCondition || (CreditCardCondition = {}));
var EmailAddressCondition;
(function(EmailAddressCondition2) {
  EmailAddressCondition2["isEmailAddress"] = "is-email-address";
  EmailAddressCondition2["IsEqual"] = "is-equal";
  EmailAddressCondition2["IsInList"] = "is-in-list";
  EmailAddressCondition2["IsLengthEqual"] = "is-length-equal";
  EmailAddressCondition2["IsLengthGreaterThan"] = "is-length-greater-than";
  EmailAddressCondition2["IsLengthGreaterThanOrEqual"] = "is-length-great-than-or-equal";
  EmailAddressCondition2["IsLengthLessThan"] = "is-length-less-than";
  EmailAddressCondition2["IsLengthLessThanOrEqual"] = "is-length-less-than-or-equal";
  EmailAddressCondition2["IsNotEqual"] = "is-not-equal";
  EmailAddressCondition2["IsNotInList"] = "is-not-in-list";
  EmailAddressCondition2["IsNotNull"] = "is-not-null";
  EmailAddressCondition2["IsRegexMatch"] = "is-regex-match";
  EmailAddressCondition2["IsNotRegexMatch"] = "is-not-regex-match";
})(EmailAddressCondition || (EmailAddressCondition = {}));
var LicensePlateNumber;
(function(LicensePlateNumber2) {
  LicensePlateNumber2["IsLicensePlateNumber"] = "is-license-plate-number";
  LicensePlateNumber2["IsNotNull"] = "is-not-null";
  LicensePlateNumber2["IsNotRegexMatch"] = "is-not-regex-match";
  LicensePlateNumber2["IsString"] = "is-string";
  LicensePlateNumber2["IsRegexMatch"] = "is-regex-match";
})(LicensePlateNumber || (LicensePlateNumber = {}));
var PassportNumberCondition;
(function(PassportNumberCondition2) {
  PassportNumberCondition2["IsNotNull"] = "is-not-null";
  PassportNumberCondition2["IsPassportNumber"] = "is-passport-number";
  PassportNumberCondition2["IsString"] = "is-string";
  PassportNumberCondition2["IsRegexMatch"] = "is-regex-match";
})(PassportNumberCondition || (PassportNumberCondition = {}));
var PasswordCondition;
(function(PasswordCondition2) {
  PasswordCondition2["IsComplexEnough"] = "is-complex-enough";
  PasswordCondition2["IsInList"] = "is-in-list";
  PasswordCondition2["IsNotInList"] = "is-not-in-list";
  PasswordCondition2["IsNotNull"] = "is-not-null";
  PasswordCondition2["IsNotRegexMatch"] = "is-not-regex-match";
  PasswordCondition2["IsLengthGreaterThan"] = "is-length-greater-than";
  PasswordCondition2["IsLengthGreaterThanOrEqual"] = "is-length-great-than-or-equal";
  PasswordCondition2["IsLengthLessThan"] = "is-length-less-than";
  PasswordCondition2["IsLengthLessThanOrEqual"] = "is-length-less-than-or-equal";
  PasswordCondition2["IsStrongPassword"] = "is-strong-password";
  PasswordCondition2["IsString"] = "is-string";
  PasswordCondition2["IsRegexMatch"] = "is-regex-match";
})(PasswordCondition || (PasswordCondition = {}));
var PhoneNumberCondition;
(function(PhoneNumberCondition2) {
  PhoneNumberCondition2["IsNotNull"] = "is-not-null";
  PhoneNumberCondition2["IsNotRegexMatch"] = "is-not-regex-match";
  PhoneNumberCondition2["IsNumber"] = "is-number";
  PhoneNumberCondition2["IsPhoneNumber"] = "is-phone-number";
  PhoneNumberCondition2["IsRegexMatch"] = "is-regex-match";
})(PhoneNumberCondition || (PhoneNumberCondition = {}));
var SocialSecurityNumberCondition;
(function(SocialSecurityNumberCondition2) {
  SocialSecurityNumberCondition2["IsNotNull"] = "is-not-null";
  SocialSecurityNumberCondition2["IsSSN"] = "is-ssn";
  SocialSecurityNumberCondition2["IsString"] = "is-string";
  SocialSecurityNumberCondition2["IsRegexMatch"] = "is-regex-match";
})(SocialSecurityNumberCondition || (SocialSecurityNumberCondition = {}));

// ../types/dist/applab/rules/condition/primitive/standards.js
var BICCondition;
(function(BICCondition2) {
  BICCondition2["Contains"] = "contains";
  BICCondition2["IsBIC"] = "is-bic";
  BICCondition2["IsEqual"] = "is-equal";
  BICCondition2["IsInList"] = "is-in-list";
  BICCondition2["IsNotEqual"] = "is-not-equal";
  BICCondition2["IsNotInList"] = "is-not-in-list";
  BICCondition2["IsNotNull"] = "is-not-null";
  BICCondition2["IsString"] = "is-string";
})(BICCondition || (BICCondition = {}));
var EANCondition;
(function(EANCondition2) {
  EANCondition2["Contains"] = "contains";
  EANCondition2["IsEAN"] = "is-ean";
  EANCondition2["IsEqual"] = "is-equal";
  EANCondition2["IsInList"] = "is-in-list";
  EANCondition2["IsNotEqual"] = "is-not-equal";
  EANCondition2["IsNotInList"] = "is-not-in-list";
  EANCondition2["IsNotNull"] = "is-not-null";
  EANCondition2["IsString"] = "is-string";
})(EANCondition || (EANCondition = {}));
var EINCondition;
(function(EINCondition2) {
  EINCondition2["Contains"] = "contains";
  EINCondition2["IsEIN"] = "is-ein";
  EINCondition2["IsEqual"] = "is-equal";
  EINCondition2["IsInList"] = "is-in-list";
  EINCondition2["IsNotEqual"] = "is-not-equal";
  EINCondition2["IsNotInList"] = "is-not-in-list";
  EINCondition2["IsNotNull"] = "is-not-null";
  EINCondition2["IsString"] = "is-string";
})(EINCondition || (EINCondition = {}));
var IBANCondition;
(function(IBANCondition2) {
  IBANCondition2["Contains"] = "contains";
  IBANCondition2["IsEqual"] = "is-equal";
  IBANCondition2["IsIBAN"] = "is-iban";
  IBANCondition2["IsInList"] = "is-in-list";
  IBANCondition2["IsNotEqual"] = "is-not-equal";
  IBANCondition2["IsNotInList"] = "is-not-in-list";
  IBANCondition2["IsNotNull"] = "is-not-null";
  IBANCondition2["IsString"] = "is-string";
})(IBANCondition || (IBANCondition = {}));
var ISBNCondition;
(function(ISBNCondition2) {
  ISBNCondition2["Contains"] = "contains";
  ISBNCondition2["IsEqual"] = "is-equal";
  ISBNCondition2["IsISBN"] = "is-isbn";
  ISBNCondition2["IsInList"] = "is-in-list";
  ISBNCondition2["IsNotEqual"] = "is-not-equal";
  ISBNCondition2["IsNotInList"] = "is-not-in-list";
  ISBNCondition2["IsNotNull"] = "is-not-null";
  ISBNCondition2["IsString"] = "is-string";
})(ISBNCondition || (ISBNCondition = {}));
var ISINCondition;
(function(ISINCondition2) {
  ISINCondition2["Contains"] = "contains";
  ISINCondition2["IsEqual"] = "is-equal";
  ISINCondition2["IsISIN"] = "is-isin";
  ISINCondition2["IsInList"] = "is-in-list";
  ISINCondition2["IsNotEqual"] = "is-not-equal";
  ISINCondition2["IsNotInList"] = "is-not-in-list";
  ISINCondition2["IsNotNull"] = "is-not-null";
  ISINCondition2["IsString"] = "is-string";
})(ISINCondition || (ISINCondition = {}));
var ISMNCondition;
(function(ISMNCondition2) {
  ISMNCondition2["Contains"] = "contains";
  ISMNCondition2["IsEqual"] = "is-equal";
  ISMNCondition2["IsISMN"] = "is-ismn";
  ISMNCondition2["IsInList"] = "is-in-list";
  ISMNCondition2["IsNotEqual"] = "is-not-equal";
  ISMNCondition2["IsNotInList"] = "is-not-in-list";
  ISMNCondition2["IsNotNull"] = "is-not-null";
  ISMNCondition2["IsString"] = "is-string";
})(ISMNCondition || (ISMNCondition = {}));
var ISSNCondition;
(function(ISSNCondition2) {
  ISSNCondition2["Contains"] = "contains";
  ISSNCondition2["IsEqual"] = "is-equal";
  ISSNCondition2["IsISSN"] = "is-issn";
  ISSNCondition2["IsInList"] = "is-in-list";
  ISSNCondition2["IsNotEqual"] = "is-not-equal";
  ISSNCondition2["IsNotInList"] = "is-not-in-list";
  ISSNCondition2["IsNotNull"] = "is-not-null";
  ISSNCondition2["IsString"] = "is-string";
})(ISSNCondition || (ISSNCondition = {}));
var TaxIDNumberCondition;
(function(TaxIDNumberCondition2) {
  TaxIDNumberCondition2["Contains"] = "contains";
  TaxIDNumberCondition2["IsEqual"] = "is-equal";
  TaxIDNumberCondition2["IsInList"] = "is-in-list";
  TaxIDNumberCondition2["IsNotEqual"] = "is-not-equal";
  TaxIDNumberCondition2["IsNotInList"] = "is-not-in-list";
  TaxIDNumberCondition2["IsNotNull"] = "is-not-null";
  TaxIDNumberCondition2["IsString"] = "is-string";
  TaxIDNumberCondition2["IsTaxIDNumber"] = "is-tax-id-number";
})(TaxIDNumberCondition || (TaxIDNumberCondition = {}));
var VATCondition;
(function(VATCondition2) {
  VATCondition2["Contains"] = "contains";
  VATCondition2["IsEqual"] = "is-equal";
  VATCondition2["IsInList"] = "is-in-list";
  VATCondition2["IsNotEqual"] = "is-not-equal";
  VATCondition2["IsNotInList"] = "is-not-in-list";
  VATCondition2["IsNotNull"] = "is-not-null";
  VATCondition2["IsString"] = "is-string";
  VATCondition2["IsVATIDNumber"] = "is-vat-id-number";
})(VATCondition || (VATCondition = {}));

// ../types/dist/applab/rules/condition/primitive/string.js
var StringCondition;
(function(StringCondition2) {
  StringCondition2["Contains"] = "contains";
  StringCondition2["HasNumberCount"] = "has-number-count";
  StringCondition2["HasLowercaseCount"] = "has-lowercase-count";
  StringCondition2["HasLetterCount"] = "has-letter-count";
  StringCondition2["HasSpacesCount"] = "has-spaces-count";
  StringCondition2["HasSymbolCount"] = "has-symbol-count";
  StringCondition2["HasUppercaseCount"] = "has-uppercase-count";
  StringCondition2["IsAlpha"] = "is-alpha";
  StringCondition2["IsAlphanumeric"] = "is-alphanumeric";
  StringCondition2["IsAscii"] = "is-ascii";
  StringCondition2["IsBase64"] = "is-base-64";
  StringCondition2["IsColor"] = "is-color";
  StringCondition2["IsComplexEnough"] = "is-complex-enough";
  StringCondition2["IsCreditCard"] = "is-credit-card";
  StringCondition2["IsDataURI"] = "is-data-uri";
  StringCondition2["IsDomainName"] = "is-domain-name";
  StringCondition2["IsEmailAddress"] = "is-email-address";
  StringCondition2["IsEthereumAddress"] = "is-ethereum-address";
  StringCondition2["IsEAN"] = "is-ean";
  StringCondition2["IsEIN"] = "is-ein";
  StringCondition2["IsEqual"] = "is-equal";
  StringCondition2["IsIBAN"] = "is-iban";
  StringCondition2["IsHSLColor"] = "is-hsl-color";
  StringCondition2["IsHexColor"] = "is-hex-color";
  StringCondition2["IsHexadecimal"] = "is-hexadecimal";
  StringCondition2["IsIdentityCardCode"] = "is-identity-card-code";
  StringCondition2["IsIMEI"] = "is-imei";
  StringCondition2["IsInList"] = "is-in-list";
  StringCondition2["IsIPAddress"] = "is-ip-address";
  StringCondition2["IsInIPAddressRange"] = "is-in-ip-address-range";
  StringCondition2["IsISBN"] = "is-isbn";
  StringCondition2["IsISIN"] = "is-isin";
  StringCondition2["IsISMN"] = "is-ismn";
  StringCondition2["IsISRC"] = "is-isrc";
  StringCondition2["IsISSN"] = "is-issn";
  StringCondition2["IsLanguage"] = "is-language";
  StringCondition2["IsLatitude"] = "is-latitude";
  StringCondition2["IsLongitude"] = "is-longitude";
  StringCondition2["IsLengthEqual"] = "is-length-equal";
  StringCondition2["IsLengthGreaterThan"] = "is-length-greater-than";
  StringCondition2["IsLengthGreaterThanOrEqual"] = "is-length-great-than-or-equal";
  StringCondition2["IsLengthLessThan"] = "is-length-less-than";
  StringCondition2["IsLengthLessThanOrEqual"] = "is-length-less-than-or-equal";
  StringCondition2["IsLicensePlateNumber"] = "is-license-plate-number";
  StringCondition2["IsLowercase"] = "is-lowercase";
  StringCondition2["IsOctal"] = "is-octal";
  StringCondition2["IsMACAddress"] = "is-mac-address";
  StringCondition2["IsMD5"] = "is-md5";
  StringCondition2["IsMagnetURI"] = "is-magnet-uri";
  StringCondition2["IsMarkdown"] = "is-markdown";
  StringCondition2["IsMimeType"] = "is-mime-type";
  StringCondition2["IsMonth"] = "is-month";
  StringCondition2["IsNotInIPAddressRange"] = "is-not-in-ip-address-range";
  StringCondition2["IsNotInList"] = "is-not-in-list";
  StringCondition2["IsNotNull"] = "is-not-null";
  StringCondition2["IsNotRegexMatch"] = "is-not-regex-match";
  StringCondition2["IsNumber"] = "is-number";
  StringCondition2["IsNumeric"] = "is-numeric";
  StringCondition2["IsPassportNumber"] = "is-passport-number";
  StringCondition2["IsPhoneNumber"] = "is-phone-number";
  StringCondition2["IsPort"] = "is-port";
  StringCondition2["IsPostalCode"] = "is-postal-code";
  StringCondition2["IsProvince"] = "is-province";
  StringCondition2["IsRegexMatch"] = "is-regex-match";
  StringCondition2["IsSemanticVersion"] = "is-semantic-version";
  StringCondition2["IsSlug"] = "is-slug";
  StringCondition2["IsSSN"] = "is-ssn";
  StringCondition2["IsState"] = "is-state";
  StringCondition2["IsStreetAddress"] = "is-street-address";
  StringCondition2["IsString"] = "is-string";
  StringCondition2["IsTaxIDNumber"] = "is-tax-id-number";
  StringCondition2["IsURL"] = "is-url";
  StringCondition2["IsUUID"] = "is-uuid";
  StringCondition2["IsUppercase"] = "is-uppercase";
  StringCondition2["IsVATIDNumber"] = "is-vat-id-number";
  StringCondition2["IsWeekday"] = "is-weekday";
  StringCondition2["IsWeekend"] = "is-weekend";
  StringCondition2["IsYear"] = "is-year";
})(StringCondition || (StringCondition = {}));
var LongTextCondition;
(function(LongTextCondition2) {
  LongTextCondition2["Contains"] = "contains";
  LongTextCondition2["IsAlpha"] = "is-alpha";
  LongTextCondition2["IsAlphanumeric"] = "is-alphanumeric";
  LongTextCondition2["IsInList"] = "is-in-list";
  LongTextCondition2["IsMarkdown"] = "is-markdown";
  LongTextCondition2["IsNotInList"] = "is-not-in-list";
  LongTextCondition2["IsNumeric"] = "is-numeric";
  LongTextCondition2["IsLowercase"] = "is-lowercase";
  LongTextCondition2["IsString"] = "is-string";
  LongTextCondition2["IsUppercase"] = "is-uppercase";
})(LongTextCondition || (LongTextCondition = {}));

// ../types/dist/applab/rules/validation/form/index.js
var FormValidationProblem;
(function(FormValidationProblem2) {
  FormValidationProblem2["InvalidCharacters"] = "invalid-characters";
  FormValidationProblem2["InvalidPattern"] = "invalid-pattern";
  FormValidationProblem2["NotComplexEnough"] = "not-complex-enough";
  FormValidationProblem2["NotUnique"] = "not-unique";
  FormValidationProblem2["NotValidEmail"] = "not-valid-email";
  FormValidationProblem2["TooLong"] = "too-long";
  FormValidationProblem2["TooShort"] = "too-short";
  FormValidationProblem2["Required"] = "required";
})(FormValidationProblem || (FormValidationProblem = {}));

// ../types/dist/applab/rules/index.js
var Privilege;
(function(Privilege2) {
  Privilege2[Privilege2["Allowed"] = 0] = "Allowed";
  Privilege2[Privilege2["Blocked"] = 1] = "Blocked";
})(Privilege || (Privilege = {}));

// ../types/dist/applab/service/queue/task/index.js
var TaskStatus;
(function(TaskStatus2) {
  TaskStatus2["Canceled"] = "Canceled";
  TaskStatus2["Completed"] = "Completed";
  TaskStatus2["Created"] = "Created";
  TaskStatus2["Faulted"] = "Faulted";
  TaskStatus2["Queued"] = "Queued";
  TaskStatus2["Running"] = "Running";
  TaskStatus2["Waiting"] = "Waiting";
})(TaskStatus || (TaskStatus = {}));

// ../types/dist/applab/user/authentication/verification.js
var UserVerificationStatus;
(function(UserVerificationStatus2) {
  UserVerificationStatus2["Archived"] = "ARCHIVED";
  UserVerificationStatus2["Compromised"] = "COMPROMISED";
  UserVerificationStatus2["Confirmed"] = "CONFIRMED";
  UserVerificationStatus2["ForcePasswordChange"] = "FORCE_CHANGE_PASSWORD";
  UserVerificationStatus2["ResetRequired"] = "RESET_REQUIRED";
  UserVerificationStatus2["Unconfirmed"] = "UNCONFIRMED";
  UserVerificationStatus2["Unknown"] = "UNKNOWN";
})(UserVerificationStatus || (UserVerificationStatus = {}));
var UserAuthenticationVerificationType;
(function(UserAuthenticationVerificationType2) {
  UserAuthenticationVerificationType2["Code"] = "code";
  UserAuthenticationVerificationType2["Link"] = "link";
})(UserAuthenticationVerificationType || (UserAuthenticationVerificationType = {}));

// ../types/dist/applab/user/role.js
var UserRole;
(function(UserRole2) {
  UserRole2["Owner"] = "Owner";
  UserRole2["Admin"] = "Admin";
  UserRole2["User"] = "User";
  UserRole2["Visitor"] = "Visitor";
})(UserRole || (UserRole = {}));

// ../types/dist/business/commerce/payment-method/index.js
var PaymentIntentStatus;
(function(PaymentIntentStatus2) {
  PaymentIntentStatus2["RequiresPaymentMethod"] = "requires_payment_method";
  PaymentIntentStatus2["RequiresConfirmation"] = "requires_confirmation";
  PaymentIntentStatus2["RequiresAction"] = "requires_action";
  PaymentIntentStatus2["Processing"] = "processing";
  PaymentIntentStatus2["RequiresCapture"] = "requires_capture";
  PaymentIntentStatus2["Canceled"] = "canceled";
  PaymentIntentStatus2["Succeeded"] = "succeeded";
})(PaymentIntentStatus || (PaymentIntentStatus = {}));

// ../types/dist/business/commerce/subscription/index.js
var SubscriptionStatus;
(function(SubscriptionStatus2) {
  SubscriptionStatus2["Incomplete"] = "incomplete";
  SubscriptionStatus2["IncompleteExpired"] = "incomplete_expired";
  SubscriptionStatus2["Trialing"] = "trialing";
  SubscriptionStatus2["Active"] = "active";
  SubscriptionStatus2["PastDue"] = "past_due";
  SubscriptionStatus2["Canceled"] = "canceled";
  SubscriptionStatus2["Unpaid"] = "unpaid";
})(SubscriptionStatus || (SubscriptionStatus = {}));
var SubscriptionPlanDuration;
(function(SubscriptionPlanDuration2) {
  SubscriptionPlanDuration2["Monthly"] = "monthly";
  SubscriptionPlanDuration2["Quarterly"] = "quarterly";
  SubscriptionPlanDuration2["Yearly"] = "yearly";
  SubscriptionPlanDuration2["Lifetime"] = "lifetime";
})(SubscriptionPlanDuration || (SubscriptionPlanDuration = {}));

// ../types/dist/communications/chat.js
var ChatMessageStatus;
(function(ChatMessageStatus2) {
  ChatMessageStatus2["Delivered"] = "delivered";
  ChatMessageStatus2["Read"] = "read";
  ChatMessageStatus2["Sending"] = "sending";
  ChatMessageStatus2["Sent"] = "sent";
})(ChatMessageStatus || (ChatMessageStatus = {}));
var ChatMessageType;
(function(ChatMessageType2) {
  ChatMessageType2["Audio"] = "audio";
  ChatMessageType2["File"] = "file";
  ChatMessageType2["Image"] = "image";
  ChatMessageType2["Text"] = "text";
  ChatMessageType2["Video"] = "video";
})(ChatMessageType || (ChatMessageType = {}));
var ChatMessageAttachmentType;
(function(ChatMessageAttachmentType2) {
  ChatMessageAttachmentType2["Audio"] = "audio";
  ChatMessageAttachmentType2["File"] = "file";
  ChatMessageAttachmentType2["Image"] = "image";
  ChatMessageAttachmentType2["Video"] = "video";
})(ChatMessageAttachmentType || (ChatMessageAttachmentType = {}));
var ChatMessageReactionType;
(function(ChatMessageReactionType2) {
  ChatMessageReactionType2["Angry"] = "angry";
  ChatMessageReactionType2["Laugh"] = "laugh";
  ChatMessageReactionType2["Like"] = "like";
  ChatMessageReactionType2["Love"] = "love";
  ChatMessageReactionType2["Sad"] = "sad";
  ChatMessageReactionType2["Wow"] = "wow";
  ChatMessageReactionType2["Wink"] = "wink";
  ChatMessageReactionType2["Yay"] = "yay";
})(ChatMessageReactionType || (ChatMessageReactionType = {}));

// ../types/dist/communications/medium.js
var CommunicationMedium;
(function(CommunicationMedium2) {
  CommunicationMedium2["Email"] = "email";
  CommunicationMedium2["PhoneNumber"] = "phone_number";
})(CommunicationMedium || (CommunicationMedium = {}));

// ../types/dist/engineering/logging/level.js
var LogLevel;
(function(LogLevel2) {
  LogLevel2["Analytics"] = "analytics";
  LogLevel2["Critical"] = "critical";
  LogLevel2["Debug"] = "debug";
  LogLevel2["Exception"] = "exception";
  LogLevel2["Http"] = "http";
  LogLevel2["Info"] = "info";
  LogLevel2["Warning"] = "warning";
})(LogLevel || (LogLevel = {}));

// ../types/dist/engineering/networking/http/index.js
var HttpRequestMethod;
(function(HttpRequestMethod2) {
  HttpRequestMethod2["Delete"] = "delete";
  HttpRequestMethod2["Get"] = "get";
  HttpRequestMethod2["Head"] = "head";
  HttpRequestMethod2["Patch"] = "patch";
  HttpRequestMethod2["Post"] = "post";
  HttpRequestMethod2["Put"] = "put";
})(HttpRequestMethod || (HttpRequestMethod = {}));
var HttpResponseCode;
(function(HttpResponseCode2) {
  HttpResponseCode2[HttpResponseCode2["CONTINUE"] = 100] = "CONTINUE";
  HttpResponseCode2[HttpResponseCode2["SWITCHING_PROTOCOLS"] = 101] = "SWITCHING_PROTOCOLS";
  HttpResponseCode2[HttpResponseCode2["PROCESSING"] = 102] = "PROCESSING";
  HttpResponseCode2[HttpResponseCode2["OK"] = 200] = "OK";
  HttpResponseCode2[HttpResponseCode2["CREATED"] = 201] = "CREATED";
  HttpResponseCode2[HttpResponseCode2["ACCEPTED"] = 202] = "ACCEPTED";
  HttpResponseCode2[HttpResponseCode2["NON_AUTHORITATIVE_INFORMATION"] = 203] = "NON_AUTHORITATIVE_INFORMATION";
  HttpResponseCode2[HttpResponseCode2["NO_CONTENT"] = 204] = "NO_CONTENT";
  HttpResponseCode2[HttpResponseCode2["RESET_CONTENT"] = 205] = "RESET_CONTENT";
  HttpResponseCode2[HttpResponseCode2["PARTIAL_CONTENT"] = 206] = "PARTIAL_CONTENT";
  HttpResponseCode2[HttpResponseCode2["MULTI_STATUS"] = 207] = "MULTI_STATUS";
  HttpResponseCode2[HttpResponseCode2["ALREADY_REPORTED"] = 208] = "ALREADY_REPORTED";
  HttpResponseCode2[HttpResponseCode2["IM_USED"] = 226] = "IM_USED";
  HttpResponseCode2[HttpResponseCode2["MULTIPLE_CHOICES"] = 300] = "MULTIPLE_CHOICES";
  HttpResponseCode2[HttpResponseCode2["MOVED_PERMANENTLY"] = 301] = "MOVED_PERMANENTLY";
  HttpResponseCode2[HttpResponseCode2["FOUND"] = 302] = "FOUND";
  HttpResponseCode2[HttpResponseCode2["SEE_OTHER"] = 303] = "SEE_OTHER";
  HttpResponseCode2[HttpResponseCode2["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
  HttpResponseCode2[HttpResponseCode2["USE_PROXY"] = 305] = "USE_PROXY";
  HttpResponseCode2[HttpResponseCode2["SWITCH_PROXY"] = 306] = "SWITCH_PROXY";
  HttpResponseCode2[HttpResponseCode2["TEMPORARY_REDIRECT"] = 307] = "TEMPORARY_REDIRECT";
  HttpResponseCode2[HttpResponseCode2["PERMANENT_REDIRECT"] = 308] = "PERMANENT_REDIRECT";
  HttpResponseCode2[HttpResponseCode2["BAD_REQUEST"] = 400] = "BAD_REQUEST";
  HttpResponseCode2[HttpResponseCode2["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
  HttpResponseCode2[HttpResponseCode2["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
  HttpResponseCode2[HttpResponseCode2["FORBIDDEN"] = 403] = "FORBIDDEN";
  HttpResponseCode2[HttpResponseCode2["NOT_FOUND"] = 404] = "NOT_FOUND";
  HttpResponseCode2[HttpResponseCode2["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
  HttpResponseCode2[HttpResponseCode2["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
  HttpResponseCode2[HttpResponseCode2["PROXY_AUTHENTICATION_REQUIRED"] = 407] = "PROXY_AUTHENTICATION_REQUIRED";
  HttpResponseCode2[HttpResponseCode2["REQUEST_TIMEOUT"] = 408] = "REQUEST_TIMEOUT";
  HttpResponseCode2[HttpResponseCode2["CONFLICT"] = 409] = "CONFLICT";
  HttpResponseCode2[HttpResponseCode2["GONE"] = 410] = "GONE";
  HttpResponseCode2[HttpResponseCode2["LENGTH_REQUIRED"] = 411] = "LENGTH_REQUIRED";
  HttpResponseCode2[HttpResponseCode2["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
  HttpResponseCode2[HttpResponseCode2["PAYLOAD_TOO_LARGE"] = 413] = "PAYLOAD_TOO_LARGE";
  HttpResponseCode2[HttpResponseCode2["URI_TOO_LONG"] = 414] = "URI_TOO_LONG";
  HttpResponseCode2[HttpResponseCode2["UNSUPPORTED_MEDIA_TYPE"] = 415] = "UNSUPPORTED_MEDIA_TYPE";
  HttpResponseCode2[HttpResponseCode2["RANGE_NOT_SATISFIABLE"] = 416] = "RANGE_NOT_SATISFIABLE";
  HttpResponseCode2[HttpResponseCode2["EXPECTATION_FAILED"] = 417] = "EXPECTATION_FAILED";
  HttpResponseCode2[HttpResponseCode2["I_AM_A_TEAPOT"] = 418] = "I_AM_A_TEAPOT";
  HttpResponseCode2[HttpResponseCode2["MISDIRECTED_REQUEST"] = 421] = "MISDIRECTED_REQUEST";
  HttpResponseCode2[HttpResponseCode2["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
  HttpResponseCode2[HttpResponseCode2["LOCKED"] = 423] = "LOCKED";
  HttpResponseCode2[HttpResponseCode2["FAILED_DEPENDENCY"] = 424] = "FAILED_DEPENDENCY";
  HttpResponseCode2[HttpResponseCode2["TOO_EARLY"] = 425] = "TOO_EARLY";
  HttpResponseCode2[HttpResponseCode2["UPGRADE_REQUIRED"] = 426] = "UPGRADE_REQUIRED";
  HttpResponseCode2[HttpResponseCode2["PRECONDITION_REQUIRED"] = 428] = "PRECONDITION_REQUIRED";
  HttpResponseCode2[HttpResponseCode2["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
  HttpResponseCode2[HttpResponseCode2["REQUEST_HEADER_FIELDS_TOO_LARGE"] = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE";
  HttpResponseCode2[HttpResponseCode2["UNAVAILABLE_FOR_LEGAL_REASONS"] = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS";
  HttpResponseCode2[HttpResponseCode2["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
  HttpResponseCode2[HttpResponseCode2["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
  HttpResponseCode2[HttpResponseCode2["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
  HttpResponseCode2[HttpResponseCode2["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
  HttpResponseCode2[HttpResponseCode2["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
  HttpResponseCode2[HttpResponseCode2["HTTP_VERSION_NOT_SUPPORTED"] = 505] = "HTTP_VERSION_NOT_SUPPORTED";
  HttpResponseCode2[HttpResponseCode2["VARIANT_ALSO_NEGOTIATES"] = 506] = "VARIANT_ALSO_NEGOTIATES";
  HttpResponseCode2[HttpResponseCode2["INSUFFICIENT_STORAGE"] = 507] = "INSUFFICIENT_STORAGE";
  HttpResponseCode2[HttpResponseCode2["LOOP_DETECTED"] = 508] = "LOOP_DETECTED";
  HttpResponseCode2[HttpResponseCode2["BANDWIDTH_LIMIT_EXCEEDED"] = 509] = "BANDWIDTH_LIMIT_EXCEEDED";
  HttpResponseCode2[HttpResponseCode2["NOT_EXTENDED"] = 510] = "NOT_EXTENDED";
  HttpResponseCode2[HttpResponseCode2["NETWORK_AUTHENTICATION_REQUIRED"] = 511] = "NETWORK_AUTHENTICATION_REQUIRED";
})(HttpResponseCode || (HttpResponseCode = {}));

// ../types/dist/i18n/locale/country.js
var CountryCode;
(function(CountryCode2) {
  CountryCode2["Afghanistan"] = "AF";
  CountryCode2["Albania"] = "AL";
  CountryCode2["Algeria"] = "DZ";
  CountryCode2["AmericanSamoa"] = "AS";
  CountryCode2["Andorra"] = "AD";
  CountryCode2["Angola"] = "AO";
  CountryCode2["Anguilla"] = "AI";
  CountryCode2["Antarctica"] = "AQ";
  CountryCode2["AntiguaAndBarbuda"] = "AG";
  CountryCode2["Argentina"] = "AR";
  CountryCode2["Armenia"] = "AM";
  CountryCode2["Aruba"] = "AW";
  CountryCode2["Australia"] = "AU";
  CountryCode2["Austria"] = "AT";
  CountryCode2["Azerbaijan"] = "AZ";
  CountryCode2["Bahamas"] = "BS";
  CountryCode2["Bahrain"] = "BH";
  CountryCode2["Bangladesh"] = "BD";
  CountryCode2["Barbados"] = "BB";
  CountryCode2["Belarus"] = "BY";
  CountryCode2["Belgium"] = "BE";
  CountryCode2["Belize"] = "BZ";
  CountryCode2["Benin"] = "BJ";
  CountryCode2["Bermuda"] = "BM";
  CountryCode2["Bhutan"] = "BT";
  CountryCode2["Bolivia"] = "BO";
  CountryCode2["BosniaAndHerzegovina"] = "BA";
  CountryCode2["Botswana"] = "BW";
  CountryCode2["BouvetIsland"] = "BV";
  CountryCode2["Brazil"] = "BR";
  CountryCode2["BritishIndianOceanTerritory"] = "IO";
  CountryCode2["Brunei"] = "BN";
  CountryCode2["Bulgaria"] = "BG";
  CountryCode2["BurkinaFaso"] = "BF";
  CountryCode2["Burundi"] = "BI";
  CountryCode2["Cambodia"] = "KH";
  CountryCode2["Cameroon"] = "CM";
  CountryCode2["Canada"] = "CA";
  CountryCode2["CapeVerde"] = "CV";
  CountryCode2["CaymanIslands"] = "KY";
  CountryCode2["CentralAfricanRepublic"] = "CF";
  CountryCode2["Chad"] = "TD";
  CountryCode2["Chile"] = "CL";
  CountryCode2["China"] = "CN";
  CountryCode2["ChristmasIsland"] = "CX";
  CountryCode2["CocosKeelingIslands"] = "CC";
  CountryCode2["Colombia"] = "CO";
  CountryCode2["Comoros"] = "KM";
  CountryCode2["Congo"] = "CG";
  CountryCode2["CongoTheDemocraticRepublicOfThe"] = "CD";
  CountryCode2["CookIslands"] = "CK";
  CountryCode2["CostaRica"] = "CR";
  CountryCode2["CoteDIvoire"] = "CI";
  CountryCode2["Croatia"] = "HR";
  CountryCode2["Cuba"] = "CU";
  CountryCode2["Cyprus"] = "CY";
  CountryCode2["CzechRepublic"] = "CZ";
  CountryCode2["Denmark"] = "DK";
  CountryCode2["Djibouti"] = "DJ";
  CountryCode2["Dominica"] = "DM";
  CountryCode2["DominicanRepublic"] = "DO";
  CountryCode2["Ecuador"] = "EC";
  CountryCode2["Egypt"] = "EG";
  CountryCode2["ElSalvador"] = "SV";
  CountryCode2["EquatorialGuinea"] = "GQ";
  CountryCode2["Eritrea"] = "ER";
  CountryCode2["Estonia"] = "EE";
  CountryCode2["Ethiopia"] = "ET";
  CountryCode2["FalklandIslands"] = "FK";
  CountryCode2["FaroeIslands"] = "FO";
  CountryCode2["Fiji"] = "FJ";
  CountryCode2["Finland"] = "FI";
  CountryCode2["France"] = "FR";
  CountryCode2["FrenchGuiana"] = "GF";
  CountryCode2["FrenchPolynesia"] = "PF";
  CountryCode2["FrenchSouthernTerritories"] = "TF";
  CountryCode2["Gabon"] = "GA";
  CountryCode2["Gambia"] = "GM";
  CountryCode2["Georgia"] = "GE";
  CountryCode2["Germany"] = "DE";
  CountryCode2["Ghana"] = "GH";
  CountryCode2["Gibraltar"] = "GI";
  CountryCode2["Greece"] = "GR";
  CountryCode2["Greenland"] = "GL";
  CountryCode2["Grenada"] = "GD";
  CountryCode2["Guadeloupe"] = "GP";
  CountryCode2["Guam"] = "GU";
  CountryCode2["Guatemala"] = "GT";
  CountryCode2["Guernsey"] = "GG";
  CountryCode2["Guinea"] = "GN";
  CountryCode2["GuineaBissau"] = "GW";
  CountryCode2["Guyana"] = "GY";
  CountryCode2["Haiti"] = "HT";
  CountryCode2["HeardIslandMcdonaldIslands"] = "HM";
  CountryCode2["HolySeeVaticanCityState"] = "VA";
  CountryCode2["Honduras"] = "HN";
  CountryCode2["HongKong"] = "HK";
  CountryCode2["Hungary"] = "HU";
  CountryCode2["Iceland"] = "IS";
  CountryCode2["India"] = "IN";
  CountryCode2["Indonesia"] = "ID";
  CountryCode2["Iran"] = "IR";
  CountryCode2["Iraq"] = "IQ";
  CountryCode2["Ireland"] = "IE";
  CountryCode2["IsleOfMan"] = "IM";
  CountryCode2["Israel"] = "IL";
  CountryCode2["Italy"] = "IT";
  CountryCode2["Jamaica"] = "JM";
  CountryCode2["Japan"] = "JP";
  CountryCode2["Jersey"] = "JE";
  CountryCode2["Jordan"] = "JO";
  CountryCode2["Kazakhstan"] = "KZ";
  CountryCode2["Kenya"] = "KE";
  CountryCode2["Kiribati"] = "KI";
  CountryCode2["Kuwait"] = "KW";
  CountryCode2["Kyrgyzstan"] = "KG";
  CountryCode2["Laos"] = "LA";
  CountryCode2["Latvia"] = "LV";
  CountryCode2["Lebanon"] = "LB";
  CountryCode2["Lesotho"] = "LS";
  CountryCode2["Liberia"] = "LR";
  CountryCode2["Libya"] = "LY";
  CountryCode2["Liechtenstein"] = "LI";
  CountryCode2["Lithuania"] = "LT";
  CountryCode2["Luxembourg"] = "LU";
  CountryCode2["Macau"] = "MO";
  CountryCode2["Madagascar"] = "MG";
  CountryCode2["Malawi"] = "MW";
  CountryCode2["Malaysia"] = "MY";
  CountryCode2["Maldives"] = "MV";
  CountryCode2["Mali"] = "ML";
  CountryCode2["Malta"] = "MT";
  CountryCode2["MarshallIslands"] = "MH";
  CountryCode2["Martinique"] = "MQ";
  CountryCode2["Mauritania"] = "MR";
  CountryCode2["Mauritius"] = "MU";
  CountryCode2["Mayotte"] = "YT";
  CountryCode2["Mexico"] = "MX";
  CountryCode2["MicronesiaFederatedStatesOf"] = "FM";
  CountryCode2["Moldova"] = "MD";
  CountryCode2["Monaco"] = "MC";
  CountryCode2["Mongolia"] = "MN";
  CountryCode2["Montenegro"] = "ME";
  CountryCode2["Montserrat"] = "MS";
  CountryCode2["Morocco"] = "MA";
  CountryCode2["Mozambique"] = "MZ";
  CountryCode2["Myanmar"] = "MM";
  CountryCode2["Namibia"] = "NA";
  CountryCode2["Nauru"] = "NR";
  CountryCode2["Nepal"] = "NP";
  CountryCode2["Netherlands"] = "NL";
  CountryCode2["NetherlandsAntilles"] = "AN";
  CountryCode2["NewCaledonia"] = "NC";
  CountryCode2["NewZealand"] = "NZ";
  CountryCode2["NorthKorea"] = "KP";
  CountryCode2["Nicaragua"] = "NI";
  CountryCode2["Niger"] = "NE";
  CountryCode2["Nigeria"] = "NG";
  CountryCode2["Niue"] = "NU";
  CountryCode2["NorfolkIsland"] = "NF";
  CountryCode2["NorthMacedonia"] = "MK";
  CountryCode2["NorthernMarianaIslands"] = "MP";
  CountryCode2["Norway"] = "NO";
  CountryCode2["Oman"] = "OM";
  CountryCode2["Pakistan"] = "PK";
  CountryCode2["Palau"] = "PW";
  CountryCode2["PalestinianTerritoryOccupied"] = "PS";
  CountryCode2["Panama"] = "PA";
  CountryCode2["PapuaNewGuinea"] = "PG";
  CountryCode2["Paraguay"] = "PY";
  CountryCode2["Peru"] = "PE";
  CountryCode2["Philippines"] = "PH";
  CountryCode2["Pitcairn"] = "PN";
  CountryCode2["Poland"] = "PL";
  CountryCode2["Portugal"] = "PT";
  CountryCode2["PuertoRico"] = "PR";
  CountryCode2["Qatar"] = "QA";
  CountryCode2["Reunion"] = "RE";
  CountryCode2["Romania"] = "RO";
  CountryCode2["RussianFederation"] = "RU";
  CountryCode2["Rwanda"] = "RW";
  CountryCode2["SaintBarthelemy"] = "BL";
  CountryCode2["SaintHelena"] = "SH";
  CountryCode2["SaintKittsAndNevis"] = "KN";
  CountryCode2["SaintLucia"] = "LC";
  CountryCode2["SaintMartin"] = "MF";
  CountryCode2["SaintPierreAndMiquelon"] = "PM";
  CountryCode2["SaintVincentAndTheGrenadines"] = "VC";
  CountryCode2["Samoa"] = "WS";
  CountryCode2["SanMarino"] = "SM";
  CountryCode2["SaoTomeAndPrincipe"] = "ST";
  CountryCode2["SaudiArabia"] = "SA";
  CountryCode2["Senegal"] = "SN";
  CountryCode2["Serbia"] = "RS";
  CountryCode2["SerbiaAndMontenegro"] = "CS";
  CountryCode2["Seychelles"] = "SC";
  CountryCode2["SierraLeone"] = "SL";
  CountryCode2["Singapore"] = "SG";
  CountryCode2["Slovakia"] = "SK";
  CountryCode2["Slovenia"] = "SI";
  CountryCode2["SolomonIslands"] = "SB";
  CountryCode2["Somalia"] = "SO";
  CountryCode2["SouthAfrica"] = "ZA";
  CountryCode2["SouthGeorgiaAndTheSouthSandwichIslands"] = "GS";
  CountryCode2["SouthKorea"] = "KR";
  CountryCode2["Spain"] = "ES";
  CountryCode2["SriLanka"] = "LK";
  CountryCode2["Sudan"] = "SD";
  CountryCode2["Suriname"] = "SR";
  CountryCode2["SvalbardAndJanMayen"] = "SJ";
  CountryCode2["Swaziland"] = "SZ";
  CountryCode2["Sweden"] = "SE";
  CountryCode2["Switzerland"] = "CH";
  CountryCode2["Syria"] = "SY";
  CountryCode2["Taiwan"] = "TW";
  CountryCode2["Tajikistan"] = "TJ";
  CountryCode2["Tanzania"] = "TZ";
  CountryCode2["Thailand"] = "TH";
  CountryCode2["TimorLeste"] = "TL";
  CountryCode2["Togo"] = "TG";
  CountryCode2["Tokelau"] = "TK";
  CountryCode2["Tonga"] = "TO";
  CountryCode2["TrinidadAndTobago"] = "TT";
  CountryCode2["Tunisia"] = "TN";
  CountryCode2["Turkey"] = "TR";
  CountryCode2["Turkmenistan"] = "TM";
  CountryCode2["TurksAndCaicosIslands"] = "TC";
  CountryCode2["Tuvalu"] = "TV";
  CountryCode2["Uganda"] = "UG";
  CountryCode2["Ukraine"] = "UA";
  CountryCode2["UnitedArabEmirates"] = "AE";
  CountryCode2["UnitedKingdom"] = "GB";
  CountryCode2["UnitedStates"] = "US";
  CountryCode2["UnitedStatesMinorOutlyingIslands"] = "UM";
  CountryCode2["Uruguay"] = "UY";
  CountryCode2["Uzbekistan"] = "UZ";
  CountryCode2["Vanuatu"] = "VU";
  CountryCode2["Venezuela"] = "VE";
  CountryCode2["Vietnam"] = "VN";
  CountryCode2["VirginIslandsBritish"] = "VG";
  CountryCode2["VirginIslandsUS"] = "VI";
  CountryCode2["WallisAndFutuna"] = "WF";
  CountryCode2["WesternSahara"] = "EH";
  CountryCode2["Yemen"] = "YE";
  CountryCode2["Zambia"] = "ZM";
  CountryCode2["Zimbabwe"] = "ZW";
})(CountryCode || (CountryCode = {}));

// ../types/dist/i18n/currency/index.js
var CurrencyCode;
(function(CurrencyCode2) {
  CurrencyCode2["AfghanistanAfghani"] = "AFN";
  CurrencyCode2["AlbaniaLek"] = "ALL";
  CurrencyCode2["ArmeniaDram"] = "AMD";
  CurrencyCode2["AlgeriaDinar"] = "DZD";
  CurrencyCode2["AmericanSamoaTala"] = "WST";
  CurrencyCode2["AngolaKwanza"] = "AOA";
  CurrencyCode2["ArgentinaPeso"] = "ARS";
  CurrencyCode2["AustraliaDollar"] = "AUD";
  CurrencyCode2["ArubaFlorin"] = "AWG";
  CurrencyCode2["AzerbaijanNewManat"] = "AZN";
  CurrencyCode2["BosniaAndHerzegovinaConvertibleMark"] = "BAM";
  CurrencyCode2["BahrainDinar"] = "BHD";
  CurrencyCode2["BarbadosDollar"] = "BBD";
  CurrencyCode2["BangladeshTaka"] = "BDT";
  CurrencyCode2["BelgiumFranc"] = "BGN";
  CurrencyCode2["BermudaDollar"] = "BMD";
  CurrencyCode2["BruneiDollar"] = "BND";
  CurrencyCode2["BoliviaBoliviano"] = "BOB";
  CurrencyCode2["BrazilReal"] = "BRL";
  CurrencyCode2["BahamasDollar"] = "BSD";
  CurrencyCode2["BhutanNgultrum"] = "BTN";
  CurrencyCode2["BotswanaPula"] = "BWP";
  CurrencyCode2["BelarusRuble"] = "BYN";
  CurrencyCode2["BelizeDollar"] = "BZD";
  CurrencyCode2["BulgariaLev"] = "BGN";
  CurrencyCode2["BurundiFranc"] = "BIF";
  CurrencyCode2["BritishPound"] = "GBP";
  CurrencyCode2["CanadaDollar"] = "CAD";
  CurrencyCode2["CambodiaRiel"] = "KHR";
  CurrencyCode2["ComorosFranc"] = "KMF";
  CurrencyCode2["CaymanIslandsDollar"] = "KYD";
  CurrencyCode2["ChilePeso"] = "CLP";
  CurrencyCode2["ChinaYuan"] = "CNY";
  CurrencyCode2["ColombiaPeso"] = "COP";
  CurrencyCode2["CostaRicaColon"] = "CRC";
  CurrencyCode2["CroatiaKuna"] = "HRK";
  CurrencyCode2["CubaConvertiblePeso"] = "CUC";
  CurrencyCode2["CubaPeso"] = "CUP";
  CurrencyCode2["CapeVerdeEscudo"] = "CVE";
  CurrencyCode2["CyprusPound"] = "CYP";
  CurrencyCode2["CzechRepublicKoruna"] = "CZK";
  CurrencyCode2["DjiboutiFranc"] = "DJF";
  CurrencyCode2["DenmarkKrone"] = "DKK";
  CurrencyCode2["DominicaDollar"] = "XCD";
  CurrencyCode2["DominicanRepublicPeso"] = "DOP";
  CurrencyCode2["EastCaribbeanDollar"] = "XCD";
  CurrencyCode2["EgyptPound"] = "EGP";
  CurrencyCode2["ElSalvadorColon"] = "SVC";
  CurrencyCode2["EquatorialGuineaEkwele"] = "GQE";
  CurrencyCode2["EritreaNakfa"] = "ERN";
  CurrencyCode2["EstoniaKroon"] = "EEK";
  CurrencyCode2["EthiopiaBirr"] = "ETB";
  CurrencyCode2["Euro"] = "EUR";
  CurrencyCode2["FijiDollar"] = "FJD";
  CurrencyCode2["FalklandIslandsPound"] = "FKP";
  CurrencyCode2["GambiaDalasi"] = "GMD";
  CurrencyCode2["GabonFranc"] = "GMD";
  CurrencyCode2["GeorgiaLari"] = "GEL";
  CurrencyCode2["GhanaCedi"] = "GHS";
  CurrencyCode2["GibraltarPound"] = "GIP";
  CurrencyCode2["GuatemalaQuetzal"] = "GTQ";
  CurrencyCode2["GuernseyPound"] = "GGP";
  CurrencyCode2["GuineaBissauPeso"] = "GWP";
  CurrencyCode2["GuyanaDollar"] = "GYD";
  CurrencyCode2["HongKongDollar"] = "HKD";
  CurrencyCode2["HondurasLempira"] = "HNL";
  CurrencyCode2["HaitiGourde"] = "HTG";
  CurrencyCode2["HungaryForint"] = "HUF";
  CurrencyCode2["IndonesiaRupiah"] = "IDR";
  CurrencyCode2["IsleOfManPound"] = "IMP";
  CurrencyCode2["IsraelNewShekel"] = "ILS";
  CurrencyCode2["IndiaRupee"] = "INR";
  CurrencyCode2["IraqDinar"] = "IQD";
  CurrencyCode2["IranRial"] = "IRR";
  CurrencyCode2["IcelandKrona"] = "ISK";
  CurrencyCode2["JamaicaDollar"] = "JMD";
  CurrencyCode2["JapanYen"] = "JPY";
  CurrencyCode2["JerseyPound"] = "JEP";
  CurrencyCode2["JordanDinar"] = "JOD";
  CurrencyCode2["KazakhstanTenge"] = "KZT";
  CurrencyCode2["KenyaShilling"] = "KES";
  CurrencyCode2["KyrgyzstanSom"] = "KGS";
  CurrencyCode2["NorthKoreaWon"] = "KPW";
  CurrencyCode2["SouthKoreaWon"] = "KRW";
  CurrencyCode2["KuwaitDinar"] = "KWD";
  CurrencyCode2["LaosKip"] = "LAK";
  CurrencyCode2["LebanonPound"] = "LBP";
  CurrencyCode2["LiberiaDollar"] = "LRD";
  CurrencyCode2["LesothoLoti"] = "LSL";
  CurrencyCode2["LibyanDinar"] = "LYD";
  CurrencyCode2["LithuaniaLitas"] = "LTL";
  CurrencyCode2["LatviaLats"] = "LVL";
  CurrencyCode2["LibyaDinar"] = "LYD";
  CurrencyCode2["MacauPataca"] = "MOP";
  CurrencyCode2["MaldivesRufiyaa"] = "MVR";
  CurrencyCode2["MalawiKwacha"] = "MWK";
  CurrencyCode2["MaltaLira"] = "MTL";
  CurrencyCode2["MauritiusRupee"] = "MUR";
  CurrencyCode2["MongoliaTughrik"] = "MNT";
  CurrencyCode2["MoroccoDirham"] = "MAD";
  CurrencyCode2["MoldovaLeu"] = "MDL";
  CurrencyCode2["MozambiqueMetical"] = "MZN";
  CurrencyCode2["MadagascarAriary"] = "MGA";
  CurrencyCode2["MacedoniaDenar"] = "MKD";
  CurrencyCode2["MexicoPeso"] = "MXN";
  CurrencyCode2["MalaysiaRinggit"] = "MYR";
  CurrencyCode2["MyanmarKyat"] = "MMK";
  CurrencyCode2["MicronesiaFederatedStatesDollar"] = "USD";
  CurrencyCode2["NicaraguaCordoba"] = "NIO";
  CurrencyCode2["NamibiaDollar"] = "NAD";
  CurrencyCode2["NetherlandsAntillesGuilder"] = "ANG";
  CurrencyCode2["NewCaledoniaFranc"] = "XPF";
  CurrencyCode2["NigeriaNaira"] = "NGN";
  CurrencyCode2["NicaraguaCordobaOro"] = "NIO";
  CurrencyCode2["NigerCFAFranc"] = "XOF";
  CurrencyCode2["NorwayKrone"] = "NOK";
  CurrencyCode2["NepalRupee"] = "NPR";
  CurrencyCode2["NewZealandDollar"] = "NZD";
  CurrencyCode2["OmanRial"] = "OMR";
  CurrencyCode2["PanamaBalboa"] = "PAB";
  CurrencyCode2["PeruNuevoSol"] = "PEN";
  CurrencyCode2["PapuaNewGuineaKina"] = "PGK";
  CurrencyCode2["PhilippinesPeso"] = "PHP";
  CurrencyCode2["PakistanRupee"] = "PKR";
  CurrencyCode2["PeruNuevo"] = "PEN";
  CurrencyCode2["PolandZloty"] = "PLN";
  CurrencyCode2["ParaguayGuarani"] = "PYG";
  CurrencyCode2["QatarRial"] = "QAR";
  CurrencyCode2["RomaniaNewLeu"] = "RON";
  CurrencyCode2["SerbiaDinar"] = "RSD";
  CurrencyCode2["SriLankaRupee"] = "LKR";
  CurrencyCode2["RussiaRuble"] = "RUB";
  CurrencyCode2["RwandaFranc"] = "RWF";
  CurrencyCode2["SaudiArabiaRiyal"] = "SAR";
  CurrencyCode2["SlovakiaKoruna"] = "SKK";
  CurrencyCode2["SloveniaTolar"] = "SIT";
  CurrencyCode2["SolomonIslandsDollar"] = "SBD";
  CurrencyCode2["SeychellesRupee"] = "SCR";
  CurrencyCode2["SudanPound"] = "SDG";
  CurrencyCode2["SwedenKrona"] = "SEK";
  CurrencyCode2["SingaporeDollar"] = "SGD";
  CurrencyCode2["SaintHelenaPound"] = "SHP";
  CurrencyCode2["SierraLeoneLeone"] = "SLL";
  CurrencyCode2["SomaliaShilling"] = "SOS";
  CurrencyCode2["SurinameDollar"] = "SRD";
  CurrencyCode2["SintMaartenPound"] = "SXD";
  CurrencyCode2["SyriaPound"] = "SYP";
  CurrencyCode2["SwazilandLilangeni"] = "SZL";
  CurrencyCode2["SwitzerlandFranc"] = "CHF";
  CurrencyCode2["ThailandBaht"] = "THB";
  CurrencyCode2["TajikistanSomoni"] = "TJS";
  CurrencyCode2["TurkmenistanManat"] = "TMT";
  CurrencyCode2["TunisiaDinar"] = "TND";
  CurrencyCode2["TongaPaanga"] = "TOP";
  CurrencyCode2["TurkeyLira"] = "TRY";
  CurrencyCode2["TrinidadAndTobagoDollar"] = "TTD";
  CurrencyCode2["TaiwanNewDollar"] = "TWD";
  CurrencyCode2["TanzaniaShilling"] = "TZS";
  CurrencyCode2["UnitedArabEmiratesDirham"] = "AED";
  CurrencyCode2["UkraineHryvnia"] = "UAH";
  CurrencyCode2["UgandaShilling"] = "UGX";
  CurrencyCode2["UnitedKingdomPound"] = "GBP";
  CurrencyCode2["UnitedStatesDollar"] = "USD";
  CurrencyCode2["UruguayPeso"] = "UYU";
  CurrencyCode2["UzbekistanSom"] = "UZS";
  CurrencyCode2["VenezuelaBolivar"] = "VEF";
  CurrencyCode2["VietnamDong"] = "VND";
  CurrencyCode2["VanuatuVatu"] = "VUV";
  CurrencyCode2["SamoaTala"] = "WST";
  CurrencyCode2["YemenRial"] = "YER";
  CurrencyCode2["SouthAfricaRand"] = "ZAR";
  CurrencyCode2["ZambiaKwacha"] = "ZMW";
  CurrencyCode2["ZimbabweDollar"] = "ZWL";
})(CurrencyCode || (CurrencyCode = {}));
var Currencies = {
  AfghanistanAfghani: {
    code: CurrencyCode.AfghanistanAfghani,
    countries: [CountryCode.Afghanistan],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Afghan Afghani",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u060B",
    symbol_native: "\u060B",
    symbol_placement: "before",
    thousands_separator: ","
  },
  AlbaniaLek: {
    code: CurrencyCode.AlbaniaLek,
    countries: [CountryCode.Albania],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Albanian Lek",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Lek",
    symbol_native: "Lek",
    symbol_placement: "before",
    thousands_separator: "."
  },
  AlgeriaDinar: {
    code: CurrencyCode.AlgeriaDinar,
    countries: [CountryCode.Algeria],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Algerian Dinar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u062F.\u062C",
    symbol_native: "\u062F.\u062C",
    symbol_placement: "before",
    thousands_separator: ","
  },
  ArgentinaPeso: {
    code: CurrencyCode.ArgentinaPeso,
    countries: [CountryCode.Argentina],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Argentine Peso",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: ","
  },
  ArmeniaDram: {
    code: CurrencyCode.ArmeniaDram,
    countries: [CountryCode.Armenia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Armenian Dram",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u0564\u0580.",
    symbol_native: "\u0564\u0580.",
    symbol_placement: "before",
    thousands_separator: "."
  },
  ArubaFlorin: {
    code: CurrencyCode.ArubaFlorin,
    countries: [CountryCode.Aruba],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Aruban Florin",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u0192",
    symbol_native: "\u0192",
    symbol_placement: "before",
    thousands_separator: ","
  },
  AustraliaDollar: {
    code: CurrencyCode.AustraliaDollar,
    countries: [CountryCode.Australia],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Australian Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: ","
  },
  AzerbaijanManat: {
    code: CurrencyCode.AzerbaijanNewManat,
    countries: [CountryCode.Azerbaijan],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Azerbaijani Manat",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u043C\u0430\u043D",
    symbol_native: "\u043C\u0430\u043D",
    symbol_placement: "before",
    thousands_separator: ","
  },
  BahrainDinar: {
    code: CurrencyCode.BahrainDinar,
    countries: [CountryCode.Bahrain],
    decimal_digits: 3,
    decimal_separator: ".",
    name: "Bahraini Dinar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: ".\u062F.\u0628",
    symbol_native: ".\u062F.\u0628",
    symbol_placement: "before",
    thousands_separator: ","
  },
  BangladeshTaka: {
    code: CurrencyCode.BangladeshTaka,
    countries: [CountryCode.Bangladesh],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Bangladeshi Taka",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u09F3",
    symbol_native: "\u09F3",
    symbol_placement: "before",
    thousands_separator: ","
  },
  BarbadosDollar: {
    code: CurrencyCode.BarbadosDollar,
    countries: [CountryCode.Barbados],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Barbadian Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: ","
  },
  BelarusRuble: {
    code: CurrencyCode.BelarusRuble,
    countries: [CountryCode.Belarus],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Belarusian Ruble",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Br",
    symbol_native: "Br",
    symbol_placement: "before",
    thousands_separator: "."
  },
  BelizeDollar: {
    code: CurrencyCode.BelizeDollar,
    countries: [CountryCode.Belize],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Belize Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "BZ$",
    symbol_native: "BZ$",
    symbol_placement: "before",
    thousands_separator: ","
  },
  BermudaDollar: {
    code: CurrencyCode.BermudaDollar,
    countries: [CountryCode.Bermuda],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Bermudian Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: ","
  },
  BoliviaBoliviano: {
    code: CurrencyCode.BoliviaBoliviano,
    countries: [CountryCode.Bolivia],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Bolivian Boliviano",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$b",
    symbol_native: "$b",
    symbol_placement: "before",
    thousands_separator: ","
  },
  BosniaAndHerzegovinaConvertibleMarka: {
    code: CurrencyCode.BosniaAndHerzegovinaConvertibleMark,
    countries: [CountryCode.BosniaAndHerzegovina],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Bosnia and Herzegovina Convertible Marka",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "KM",
    symbol_native: "KM",
    symbol_placement: "before",
    thousands_separator: "."
  },
  BotswanaPula: {
    code: CurrencyCode.BotswanaPula,
    countries: [CountryCode.Botswana],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Botswana Pula",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "P",
    symbol_native: "P",
    symbol_placement: "before",
    thousands_separator: ","
  },
  BrazilReal: {
    code: CurrencyCode.BrazilReal,
    countries: [CountryCode.Brazil],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Brazilian Real",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "R$",
    symbol_native: "R$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  BruneiDollar: {
    code: CurrencyCode.BruneiDollar,
    countries: [CountryCode.Brunei],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Brunei Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: ","
  },
  BulgariaLev: {
    code: CurrencyCode.BulgariaLev,
    countries: [CountryCode.Bulgaria],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Bulgarian Lev",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u043B\u0432",
    symbol_native: "\u043B\u0432",
    symbol_placement: "before",
    thousands_separator: "."
  },
  BurundiFranc: {
    code: CurrencyCode.BurundiFranc,
    countries: [CountryCode.Burundi],
    decimal_digits: 0,
    decimal_separator: ".",
    name: "Burundian Franc",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "FBu",
    symbol_native: "FBu",
    symbol_placement: "before",
    thousands_separator: ","
  },
  CambodiaRiel: {
    code: CurrencyCode.CambodiaRiel,
    countries: [CountryCode.Cambodia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Cambodian Riel",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u17DB",
    symbol_native: "\u17DB",
    symbol_placement: "before",
    thousands_separator: "."
  },
  CanadaDollar: {
    code: CurrencyCode.CanadaDollar,
    countries: [CountryCode.Canada],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Canadian Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: ","
  },
  CapeVerdeEscudo: {
    code: CurrencyCode.CapeVerdeEscudo,
    countries: [CountryCode.CapeVerde],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Cape Verde Escudo",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Esc",
    symbol_native: "Esc",
    symbol_placement: "before",
    thousands_separator: ","
  },
  CaymanIslandsDollar: {
    code: CurrencyCode.CaymanIslandsDollar,
    countries: [CountryCode.CaymanIslands],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Cayman Islands Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: ","
  },
  ChilePeso: {
    code: CurrencyCode.ChilePeso,
    countries: [CountryCode.Chile],
    decimal_digits: 0,
    decimal_separator: ".",
    name: "Chilean Peso",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: ","
  },
  ChinaYuanRenminbi: {
    code: CurrencyCode.ChinaYuan,
    countries: [CountryCode.China],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Chinese Yuan",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA5",
    symbol_native: "\xA5",
    symbol_placement: "before",
    thousands_separator: ","
  },
  ColombiaPeso: {
    code: CurrencyCode.ColombiaPeso,
    countries: [CountryCode.Colombia],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Colombian Peso",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: ","
  },
  ComorosFranc: {
    code: CurrencyCode.ComorosFranc,
    countries: [CountryCode.Comoros],
    decimal_digits: 0,
    decimal_separator: ".",
    name: "Comoros Franc",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "CF",
    symbol_native: "CF",
    symbol_placement: "before",
    thousands_separator: ","
  },
  CostaRicaColon: {
    code: CurrencyCode.CostaRicaColon,
    countries: [CountryCode.CostaRica],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Costa Rican Colon",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20A1",
    symbol_native: "\u20A1",
    symbol_placement: "before",
    thousands_separator: ","
  },
  CroatiaKuna: {
    code: CurrencyCode.CroatiaKuna,
    countries: [CountryCode.Croatia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Croatian Kuna",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "kn",
    symbol_native: "kn",
    symbol_placement: "before",
    thousands_separator: "."
  },
  CubaConvertiblePeso: {
    code: CurrencyCode.CubaConvertiblePeso,
    countries: [CountryCode.Cuba],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Cuba Convertible Peso",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  CubaPeso: {
    code: CurrencyCode.CubaPeso,
    countries: [CountryCode.Cuba],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Cuba Peso",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  CyprusPound: {
    code: CurrencyCode.CyprusPound,
    countries: [CountryCode.Cyprus],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Cyprus Pound",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA3",
    symbol_native: "\xA3",
    symbol_placement: "before",
    thousands_separator: "."
  },
  CzechRepublicKoruna: {
    code: CurrencyCode.CzechRepublicKoruna,
    countries: [CountryCode.CzechRepublic],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Czech Republic Koruna",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "K\u010D",
    symbol_native: "K\u010D",
    symbol_placement: "before",
    thousands_separator: "."
  },
  DenmarkKrone: {
    code: CurrencyCode.DenmarkKrone,
    countries: [CountryCode.Denmark],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Denmark Krone",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "kr",
    symbol_native: "kr",
    symbol_placement: "before",
    thousands_separator: "."
  },
  DjiboutiFranc: {
    code: CurrencyCode.DjiboutiFranc,
    countries: [CountryCode.Djibouti],
    decimal_digits: 0,
    decimal_separator: ".",
    name: "Djibouti Franc",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Fdj",
    symbol_native: "Fdj",
    symbol_placement: "before",
    thousands_separator: ","
  },
  DominicanRepublicPeso: {
    code: CurrencyCode.DominicanRepublicPeso,
    countries: [CountryCode.DominicanRepublic],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Dominican Republic Peso",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "RD$",
    symbol_native: "RD$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  EastCaribbeanDollar: {
    code: CurrencyCode.EastCaribbeanDollar,
    countries: [
      CountryCode.AntiguaAndBarbuda,
      CountryCode.Dominica,
      CountryCode.Grenada,
      CountryCode.SaintKittsAndNevis,
      CountryCode.SaintLucia,
      CountryCode.SaintVincentAndTheGrenadines
    ],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "East Caribbean Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: ","
  },
  EgyptPound: {
    code: CurrencyCode.EgyptPound,
    countries: [CountryCode.Egypt],
    decimal_digits: 2,
    decimal_separator: ".",
    name: "Egypt Pound",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA3",
    symbol_native: "\xA3",
    symbol_placement: "before",
    thousands_separator: ","
  },
  ElSalvadorColon: {
    code: CurrencyCode.ElSalvadorColon,
    countries: [CountryCode.ElSalvador],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "El Salvador Colon",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20A1",
    symbol_native: "\u20A1",
    symbol_placement: "before",
    thousands_separator: "."
  },
  EquatorialGuineaEkwele: {
    code: CurrencyCode.EquatorialGuineaEkwele,
    countries: [CountryCode.EquatorialGuinea],
    decimal_digits: 0,
    decimal_separator: ".",
    name: "Equatorial Guinea Ekwele",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "GQE",
    symbol_native: "GQE",
    symbol_placement: "before",
    thousands_separator: ","
  },
  EritreaNakfa: {
    code: CurrencyCode.EritreaNakfa,
    countries: [CountryCode.Eritrea],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Eritrea Nakfa",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Nfk",
    symbol_native: "Nfk",
    symbol_placement: "before",
    thousands_separator: "."
  },
  EstoniaKroon: {
    code: CurrencyCode.EstoniaKroon,
    countries: [CountryCode.Estonia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Estonia Kroon",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "kr",
    symbol_native: "kr",
    symbol_placement: "before",
    thousands_separator: "."
  },
  EthiopiaBirr: {
    code: CurrencyCode.EthiopiaBirr,
    countries: [CountryCode.Ethiopia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Ethiopia Birr",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Br",
    symbol_native: "Br",
    symbol_placement: "before",
    thousands_separator: "."
  },
  Euro: {
    code: CurrencyCode.Euro,
    countries: [
      CountryCode.Andorra,
      CountryCode.Austria,
      CountryCode.Belgium,
      CountryCode.Cyprus,
      CountryCode.Estonia,
      CountryCode.Finland,
      CountryCode.France,
      CountryCode.Germany,
      CountryCode.Greece,
      CountryCode.Ireland,
      CountryCode.Italy,
      CountryCode.Latvia,
      CountryCode.Lithuania,
      CountryCode.Luxembourg,
      CountryCode.Malta,
      CountryCode.Monaco,
      CountryCode.Netherlands,
      CountryCode.Portugal,
      CountryCode.Spain,
      CountryCode.Sweden,
      CountryCode.UnitedKingdom
    ],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Euro",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20AC",
    symbol_native: "\u20AC",
    symbol_placement: "before",
    thousands_separator: "."
  },
  FalklandIslandsPound: {
    code: CurrencyCode.FalklandIslandsPound,
    countries: [CountryCode.FalklandIslands],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Equatorial Guinea Ekwele",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA3",
    symbol_native: "\xA3",
    symbol_placement: "before",
    thousands_separator: "."
  },
  FijiDollar: {
    code: CurrencyCode.FijiDollar,
    countries: [CountryCode.Fiji],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Fiji Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  GambiaDalasi: {
    code: CurrencyCode.GambiaDalasi,
    countries: [CountryCode.Gambia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Gambia Dalasi",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "D",
    symbol_native: "D",
    symbol_placement: "before",
    thousands_separator: "."
  },
  GeorgiaLari: {
    code: CurrencyCode.GeorgiaLari,
    countries: [CountryCode.Georgia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Georgia Lari",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20BE",
    symbol_native: "\u20BE",
    symbol_placement: "before",
    thousands_separator: "."
  },
  GhanaCedi: {
    code: CurrencyCode.GhanaCedi,
    countries: [CountryCode.Ghana],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Ghana Cedi",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20B5",
    symbol_native: "\u20B5",
    symbol_placement: "before",
    thousands_separator: "."
  },
  GibraltarPound: {
    code: CurrencyCode.GibraltarPound,
    countries: [CountryCode.Gibraltar],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Gibraltar Pound",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA3",
    symbol_native: "\xA3",
    symbol_placement: "before",
    thousands_separator: "."
  },
  GuatemalaQuetzal: {
    code: CurrencyCode.GuatemalaQuetzal,
    countries: [CountryCode.Guatemala],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Guatemala Quetzal",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Q",
    symbol_native: "Q",
    symbol_placement: "before",
    thousands_separator: "."
  },
  GuernseyPound: {
    code: CurrencyCode.GuernseyPound,
    countries: [CountryCode.Guernsey],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Guernsey Pound",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA3",
    symbol_native: "\xA3",
    symbol_placement: "before",
    thousands_separator: "."
  },
  GuineaBissauPeso: {
    code: CurrencyCode.GuineaBissauPeso,
    countries: [CountryCode.GuineaBissau],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Guinea-Bissau Peso",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20B5",
    symbol_native: "\u20B5",
    symbol_placement: "before",
    thousands_separator: "."
  },
  GuyanaDollar: {
    code: CurrencyCode.GuyanaDollar,
    countries: [CountryCode.Guyana],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Guyana Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  HaitiGourde: {
    code: CurrencyCode.HaitiGourde,
    countries: [CountryCode.Haiti],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Haiti Gourde",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "G",
    symbol_native: "G",
    symbol_placement: "before",
    thousands_separator: "."
  },
  HondurasLempira: {
    code: CurrencyCode.HondurasLempira,
    countries: [CountryCode.Honduras],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Honduras Lempira",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "L",
    symbol_native: "L",
    symbol_placement: "before",
    thousands_separator: "."
  },
  HongKongDollar: {
    code: CurrencyCode.HongKongDollar,
    countries: [CountryCode.HongKong],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Hong Kong Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  HungaryForint: {
    code: CurrencyCode.HungaryForint,
    countries: [CountryCode.Hungary],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Hungary Forint",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Ft",
    symbol_native: "Ft",
    symbol_placement: "before",
    thousands_separator: "."
  },
  IcelandKrona: {
    code: CurrencyCode.IcelandKrona,
    countries: [CountryCode.Iceland],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Iceland Krona",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "kr",
    symbol_native: "kr",
    symbol_placement: "before",
    thousands_separator: "."
  },
  IndianRupee: {
    code: CurrencyCode.IndiaRupee,
    countries: [CountryCode.India, CountryCode.Bhutan],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Indian Rupee",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20B9",
    symbol_native: "\u20B9",
    symbol_placement: "before",
    thousands_separator: "."
  },
  IndonesiaRupiah: {
    code: CurrencyCode.IndonesiaRupiah,
    countries: [CountryCode.Indonesia],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Indonesia Rupiah",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Rp",
    symbol_native: "Rp",
    symbol_placement: "before",
    thousands_separator: "."
  },
  IranRial: {
    code: CurrencyCode.IranRial,
    countries: [CountryCode.Iran],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Iran Rial",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\uFDFC",
    symbol_native: "\uFDFC",
    symbol_placement: "before",
    thousands_separator: "."
  },
  IsleOfManPound: {
    code: CurrencyCode.IsleOfManPound,
    countries: [CountryCode.IsleOfMan],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Isle of Man Pound",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\uFDFC",
    symbol_native: "\uFDFC",
    symbol_placement: "before",
    thousands_separator: "."
  },
  IsraeliShekel: {
    code: CurrencyCode.IsraelNewShekel,
    countries: [CountryCode.Israel],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Israeli Shekel",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20AA",
    symbol_native: "\u20AA",
    symbol_placement: "before",
    thousands_separator: "."
  },
  JamaicaDollar: {
    code: CurrencyCode.JamaicaDollar,
    countries: [CountryCode.Jamaica],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Jamaica Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "J$",
    symbol_native: "J$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  JapanYen: {
    code: CurrencyCode.JapanYen,
    countries: [CountryCode.Japan],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Japan Yen",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA5",
    symbol_native: "\uFFE5",
    symbol_placement: "before",
    thousands_separator: "."
  },
  JerseyPound: {
    code: CurrencyCode.JerseyPound,
    countries: [CountryCode.Jersey],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Jersey Pound",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA3",
    symbol_native: "\xA3",
    symbol_placement: "before",
    thousands_separator: "."
  },
  JordanDinar: {
    code: CurrencyCode.JordanDinar,
    countries: [CountryCode.Jordan],
    decimal_digits: 3,
    decimal_separator: ",",
    name: "Jordan Dinar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "JD",
    symbol_native: "JD",
    symbol_placement: "before",
    thousands_separator: "."
  },
  KazakhstanTenge: {
    code: CurrencyCode.KazakhstanTenge,
    countries: [CountryCode.Kazakhstan],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Kazakhstan Tenge",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20B8",
    symbol_native: "\u20B8",
    symbol_placement: "before",
    thousands_separator: "."
  },
  KenyaShilling: {
    code: CurrencyCode.KenyaShilling,
    countries: [CountryCode.Kenya],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Kenya Shilling",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "KSh",
    symbol_native: "KSh",
    symbol_placement: "before",
    thousands_separator: "."
  },
  KuwaitDinar: {
    code: CurrencyCode.KuwaitDinar,
    countries: [CountryCode.Kuwait],
    decimal_digits: 3,
    decimal_separator: ",",
    name: "Kuwait Dinar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "KD",
    symbol_native: "KD",
    symbol_placement: "before",
    thousands_separator: "."
  },
  KyrgyzstanSom: {
    code: CurrencyCode.KyrgyzstanSom,
    countries: [CountryCode.Kyrgyzstan],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Kyrgyzstan Som",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "KGS",
    symbol_native: "KGS",
    symbol_placement: "before",
    thousands_separator: "."
  },
  LaosKip: {
    code: CurrencyCode.LaosKip,
    countries: [CountryCode.Laos],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Laos Kip",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20AD",
    symbol_native: "\u20AD",
    symbol_placement: "before",
    thousands_separator: "."
  },
  LatviaLats: {
    code: CurrencyCode.LatviaLats,
    countries: [CountryCode.Latvia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Latvia Lat",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Ls",
    symbol_native: "Ls",
    symbol_placement: "before",
    thousands_separator: "."
  },
  LebanonPound: {
    code: CurrencyCode.LebanonPound,
    countries: [CountryCode.Lebanon],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Lebanon Pound",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA3",
    symbol_native: "\xA3",
    symbol_placement: "before",
    thousands_separator: "."
  },
  LesothoLoti: {
    code: CurrencyCode.LesothoLoti,
    countries: [CountryCode.Lesotho],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Lesotho Loti",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "M",
    symbol_native: "M",
    symbol_placement: "before",
    thousands_separator: "."
  },
  LiberiaDollar: {
    code: CurrencyCode.LiberiaDollar,
    countries: [CountryCode.Liberia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Liberia Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  LibyanDinar: {
    code: CurrencyCode.LibyanDinar,
    countries: [CountryCode.Libya],
    decimal_digits: 3,
    decimal_separator: ",",
    name: "Libyan Dinar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "LD",
    symbol_native: "LD",
    symbol_placement: "before",
    thousands_separator: "."
  },
  LithuaniaLitas: {
    code: CurrencyCode.LithuaniaLitas,
    countries: [CountryCode.Lithuania],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Lithuania Litas",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Lt",
    symbol_native: "Lt",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MacauPataca: {
    code: CurrencyCode.MacauPataca,
    countries: [CountryCode.Macau],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Macau Pataca",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "MOP$",
    symbol_native: "MOP$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MacedoniaDenar: {
    code: CurrencyCode.MacedoniaDenar,
    countries: [CountryCode.NorthMacedonia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Macedonia Denar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u0434\u0435\u043D",
    symbol_native: "\u0434\u0435\u043D",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MadagascarAriary: {
    code: CurrencyCode.MadagascarAriary,
    countries: [CountryCode.Madagascar],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Madagascar Ariary",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Ar",
    symbol_native: "Ar",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MalawiKwacha: {
    code: CurrencyCode.MalawiKwacha,
    countries: [CountryCode.Malawi],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Malawi Kwacha",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "MK",
    symbol_native: "MK",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MalaysiaRinggit: {
    code: CurrencyCode.MalaysiaRinggit,
    countries: [CountryCode.Malaysia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Malaysia Ringgit",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "RM",
    symbol_native: "RM",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MaldivesRufiyaa: {
    code: CurrencyCode.MaldivesRufiyaa,
    countries: [CountryCode.Maldives],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Maldives Rufiyaa",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Rf",
    symbol_native: "Rf",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MaltaLira: {
    code: CurrencyCode.MaltaLira,
    countries: [CountryCode.Malta],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Malta Lira",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Lm",
    symbol_native: "Lm",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MauritiusRupee: {
    code: CurrencyCode.MauritiusRupee,
    countries: [CountryCode.Mauritius],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Mauritius Rupee",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20A8",
    symbol_native: "\u20A8",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MexicoPeso: {
    code: CurrencyCode.MexicoPeso,
    countries: [CountryCode.Mexico],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Mexico Peso",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MoldovaLeu: {
    code: CurrencyCode.MoldovaLeu,
    countries: [CountryCode.Moldova],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Moldova Leu",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "L",
    symbol_native: "L",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MongoliaTughrik: {
    code: CurrencyCode.MongoliaTughrik,
    countries: [CountryCode.Mongolia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Mongolia Tughrik",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20AE",
    symbol_native: "\u20AE",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MoroccoDirham: {
    code: CurrencyCode.MoroccoDirham,
    countries: [CountryCode.Morocco],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Morocco Dirham",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "DH",
    symbol_native: "DH",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MozambiqueMetical: {
    code: CurrencyCode.MozambiqueMetical,
    countries: [CountryCode.Mozambique],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Mozambique Metical",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "MT",
    symbol_native: "MT",
    symbol_placement: "before",
    thousands_separator: "."
  },
  MyanmarKyat: {
    code: CurrencyCode.MyanmarKyat,
    countries: [CountryCode.Myanmar],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Myanmar Kyat",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "K",
    symbol_native: "K",
    symbol_placement: "before",
    thousands_separator: "."
  },
  NamibiaDollar: {
    code: CurrencyCode.NamibiaDollar,
    countries: [CountryCode.Namibia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Namibia Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  NepalRupee: {
    code: CurrencyCode.NepalRupee,
    countries: [CountryCode.Nepal],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Nepal Rupee",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20A8",
    symbol_native: "\u20A8",
    symbol_placement: "before",
    thousands_separator: "."
  },
  NetherlandsAntillesGuilder: {
    code: CurrencyCode.NetherlandsAntillesGuilder,
    countries: [CountryCode.NetherlandsAntilles],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Netherlands Antilles Guilder",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u0192",
    symbol_native: "\u0192",
    symbol_placement: "before",
    thousands_separator: "."
  },
  NewCaledoniaFranc: {
    code: CurrencyCode.NewCaledoniaFranc,
    countries: [CountryCode.NewCaledonia],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "New Caledonia Franc",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20A3",
    symbol_native: "\u20A3",
    symbol_placement: "before",
    thousands_separator: "."
  },
  NewZealandDollar: {
    code: CurrencyCode.NewZealandDollar,
    countries: [CountryCode.NewZealand],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "New Zealand Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  NicaraguaCordoba: {
    code: CurrencyCode.NicaraguaCordoba,
    countries: [CountryCode.Nicaragua],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Nicaragua Cordoba",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "C$",
    symbol_native: "C$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  NigerCFAFranc: {
    code: CurrencyCode.NigerCFAFranc,
    countries: [CountryCode.Niger],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Niger CFA Franc",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "CFA",
    symbol_native: "CFA",
    symbol_placement: "before",
    thousands_separator: "."
  },
  NigeriaNaira: {
    code: CurrencyCode.NigeriaNaira,
    countries: [CountryCode.Nigeria],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Nigeria Naira",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20A6",
    symbol_native: "\u20A6",
    symbol_placement: "before",
    thousands_separator: "."
  },
  NorthKoreaWon: {
    code: CurrencyCode.NorthKoreaWon,
    countries: [CountryCode.NorthKorea],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "North Korea Won",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20A9",
    symbol_native: "\u20A9",
    symbol_placement: "before",
    thousands_separator: "."
  },
  NorwayKrone: {
    code: CurrencyCode.NorwayKrone,
    countries: [CountryCode.Norway],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Norway Krone",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "kr",
    symbol_native: "kr",
    symbol_placement: "before",
    thousands_separator: "."
  },
  OmanRial: {
    code: CurrencyCode.OmanRial,
    countries: [CountryCode.Oman],
    decimal_digits: 3,
    decimal_separator: ",",
    name: "Oman Rial",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\uFDFC",
    symbol_native: "\uFDFC",
    symbol_placement: "before",
    thousands_separator: "."
  },
  PakistanRupee: {
    code: CurrencyCode.PakistanRupee,
    countries: [CountryCode.Pakistan],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Pakistan Rupee",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20A8",
    symbol_native: "\u20A8",
    symbol_placement: "before",
    thousands_separator: "."
  },
  PanamaBalboa: {
    code: CurrencyCode.PanamaBalboa,
    countries: [CountryCode.Panama],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Panama Balboa",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "B/.",
    symbol_native: "B/.",
    symbol_placement: "before",
    thousands_separator: "."
  },
  ParaguayGuarani: {
    code: CurrencyCode.ParaguayGuarani,
    countries: [CountryCode.Paraguay],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Paraguay Guarani",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Gs",
    symbol_native: "Gs",
    symbol_placement: "before",
    thousands_separator: "."
  },
  PeruvianNuevo: {
    code: CurrencyCode.PeruNuevo,
    countries: [CountryCode.Peru],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Peruvian Nuevo",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "S/.",
    symbol_native: "S/.",
    symbol_placement: "before",
    thousands_separator: "."
  },
  PhilippinesPeso: {
    code: CurrencyCode.PhilippinesPeso,
    countries: [CountryCode.Philippines],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Philippines Peso",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20B1",
    symbol_native: "\u20B1",
    symbol_placement: "before",
    thousands_separator: "."
  },
  PolandZloty: {
    code: CurrencyCode.PolandZloty,
    countries: [CountryCode.Poland],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Poland Zloty",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "z\u0142",
    symbol_native: "z\u0142",
    symbol_placement: "before",
    thousands_separator: "."
  },
  QatarRial: {
    code: CurrencyCode.QatarRial,
    countries: [CountryCode.Qatar],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Qatar Rial",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\uFDFC",
    symbol_native: "\uFDFC",
    symbol_placement: "before",
    thousands_separator: "."
  },
  RomaniaNewLeu: {
    code: CurrencyCode.RomaniaNewLeu,
    countries: [CountryCode.Romania],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Romania New Leu",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "lei",
    symbol_native: "lei",
    symbol_placement: "before",
    thousands_separator: "."
  },
  RussiaRuble: {
    code: CurrencyCode.RussiaRuble,
    countries: [CountryCode.RussianFederation],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Russia Ruble",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20BD",
    symbol_native: "\u20BD",
    symbol_placement: "before",
    thousands_separator: "."
  },
  RwandaFranc: {
    code: CurrencyCode.RwandaFranc,
    countries: [CountryCode.Rwanda],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Rwanda Franc",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "RF",
    symbol_native: "RF",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SaudiArabiaRiyal: {
    code: CurrencyCode.SaudiArabiaRiyal,
    countries: [CountryCode.SaudiArabia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Saudi Arabia Riyal",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\uFDFC",
    symbol_native: "\uFDFC",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SerbiaDinar: {
    code: CurrencyCode.SerbiaDinar,
    countries: [CountryCode.Serbia],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Serbia Dinar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u0414\u0438\u043D.",
    symbol_native: "\u0414\u0438\u043D.",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SeychellesRupee: {
    code: CurrencyCode.SeychellesRupee,
    countries: [CountryCode.Seychelles],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Seychelles Rupee",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20A8",
    symbol_native: "\u20A8",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SingaporeDollar: {
    code: CurrencyCode.SingaporeDollar,
    countries: [CountryCode.Singapore],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Singapore Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SlovakiaKoruna: {
    code: CurrencyCode.SlovakiaKoruna,
    countries: [CountryCode.Slovakia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Slovakia Koruna",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Sk",
    symbol_native: "Sk",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SloveniaTolar: {
    code: CurrencyCode.SloveniaTolar,
    countries: [CountryCode.Slovenia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Slovenia Tolar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "SIT",
    symbol_native: "SIT",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SolomonIslandsDollar: {
    code: CurrencyCode.SolomonIslandsDollar,
    countries: [CountryCode.SolomonIslands],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Solomon Islands Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SomaliaShilling: {
    code: CurrencyCode.SomaliaShilling,
    countries: [CountryCode.Somalia],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Somalia Shilling",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "S",
    symbol_native: "S",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SouthAfricaRand: {
    code: CurrencyCode.SouthAfricaRand,
    countries: [CountryCode.SouthAfrica],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "South Africa Rand",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "R",
    symbol_native: "R",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SouthKoreaWon: {
    code: CurrencyCode.SouthKoreaWon,
    countries: [CountryCode.SouthKorea],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "South Korea Won",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20A9",
    symbol_native: "\u20A9",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SriLankaRupee: {
    code: CurrencyCode.SriLankaRupee,
    countries: [CountryCode.SriLanka],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Sri Lanka Rupee",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20A8",
    symbol_native: "\u20A8",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SudanPound: {
    code: CurrencyCode.SudanPound,
    countries: [CountryCode.Sudan],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Sudan Pound",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA3",
    symbol_native: "\xA3",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SurinameDollar: {
    code: CurrencyCode.SurinameDollar,
    countries: [CountryCode.Suriname],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Suriname Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SwazilandLilangeni: {
    code: CurrencyCode.SwazilandLilangeni,
    countries: [CountryCode.Swaziland],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Swaziland Lilangeni",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "E",
    symbol_native: "E",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SwedenKrona: {
    code: CurrencyCode.SwedenKrona,
    countries: [CountryCode.Sweden],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Sweden Krona",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "kr",
    symbol_native: "kr",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SwitzerlandFranc: {
    code: CurrencyCode.SwitzerlandFranc,
    countries: [CountryCode.Switzerland],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Switzerland Franc",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "CHF",
    symbol_native: "CHF",
    symbol_placement: "before",
    thousands_separator: "."
  },
  SyriaPound: {
    code: CurrencyCode.SyriaPound,
    countries: [CountryCode.Syria],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Syria Pound",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA3",
    symbol_native: "\xA3",
    symbol_placement: "before",
    thousands_separator: "."
  },
  TaiwanNewDollar: {
    code: CurrencyCode.TaiwanNewDollar,
    countries: [CountryCode.Taiwan],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Taiwan New Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "NT$",
    symbol_native: "NT$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  TajikistanSomoni: {
    code: CurrencyCode.TajikistanSomoni,
    countries: [CountryCode.Tajikistan],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Tajikistan Somoni",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "TJS",
    symbol_native: "TJS",
    symbol_placement: "before",
    thousands_separator: "."
  },
  TanzaniaShilling: {
    code: CurrencyCode.TanzaniaShilling,
    countries: [CountryCode.Tanzania],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Tanzania Shilling",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "TSh",
    symbol_native: "TSh",
    symbol_placement: "before",
    thousands_separator: "."
  },
  ThailandBaht: {
    code: CurrencyCode.ThailandBaht,
    countries: [CountryCode.Thailand],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Thailand Baht",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u0E3F",
    symbol_native: "\u0E3F",
    symbol_placement: "before",
    thousands_separator: "."
  },
  TunisiaDinar: {
    code: CurrencyCode.TunisiaDinar,
    countries: [CountryCode.Tunisia],
    decimal_digits: 3,
    decimal_separator: ",",
    name: "Tunisia Dinar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u062F.\u062A",
    symbol_native: "\u062F.\u062A",
    symbol_placement: "before",
    thousands_separator: "."
  },
  TurkeyLira: {
    code: CurrencyCode.TurkeyLira,
    countries: [CountryCode.Turkey],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Turkey Lira",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20BA",
    symbol_native: "\u20BA",
    symbol_placement: "before",
    thousands_separator: "."
  },
  TurkmenistanManat: {
    code: CurrencyCode.TurkmenistanManat,
    countries: [CountryCode.Turkmenistan],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Turkmenistan Manat",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "m",
    symbol_native: "m",
    symbol_placement: "before",
    thousands_separator: "."
  },
  UgandaShilling: {
    code: CurrencyCode.UgandaShilling,
    countries: [CountryCode.Uganda],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Uganda Shilling",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "USh",
    symbol_native: "USh",
    symbol_placement: "before",
    thousands_separator: "."
  },
  UkraineHryvnia: {
    code: CurrencyCode.UkraineHryvnia,
    countries: [CountryCode.Ukraine],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Ukraine Hryvnia",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20B4",
    symbol_native: "\u20B4",
    symbol_placement: "before",
    thousands_separator: "."
  },
  UnitedArabEmiratesDirham: {
    code: CurrencyCode.UnitedArabEmiratesDirham,
    countries: [CountryCode.UnitedArabEmirates],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "United Arab Emirates Dirham",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u062F.\u0625",
    symbol_native: "\u062F.\u0625",
    symbol_placement: "before",
    thousands_separator: "."
  },
  UnitedKingdomPound: {
    code: CurrencyCode.UnitedKingdomPound,
    countries: [CountryCode.UnitedKingdom],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "United Kingdom Pound",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\xA3",
    symbol_native: "\xA3",
    symbol_placement: "before",
    thousands_separator: "."
  },
  UnitedStatesDollar: {
    code: CurrencyCode.UnitedStatesDollar,
    countries: [CountryCode.UnitedStates],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "United States Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    symbol_placement: "before",
    thousands_separator: "."
  },
  UruguayPeso: {
    code: CurrencyCode.UruguayPeso,
    countries: [CountryCode.Uruguay],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Uruguay Peso",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "$U",
    symbol_native: "$U",
    symbol_placement: "before",
    thousands_separator: "."
  },
  UzbekistanSom: {
    code: CurrencyCode.UzbekistanSom,
    countries: [CountryCode.Uzbekistan],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Uzbekistan Som",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "UZS",
    symbol_native: "UZS",
    symbol_placement: "before",
    thousands_separator: "."
  },
  VanuatuVatu: {
    code: CurrencyCode.VanuatuVatu,
    countries: [CountryCode.Vanuatu],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Vanuatu Vatu",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "VT",
    symbol_native: "VT",
    symbol_placement: "before",
    thousands_separator: "."
  },
  VenezuelaBolivar: {
    code: CurrencyCode.VenezuelaBolivar,
    countries: [CountryCode.Venezuela],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Venezuela Bolivar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "Bs. F",
    symbol_native: "Bs. F",
    symbol_placement: "before",
    thousands_separator: "."
  },
  VietnamDong: {
    code: CurrencyCode.VietnamDong,
    countries: [CountryCode.Vietnam],
    decimal_digits: 0,
    decimal_separator: ",",
    name: "Vietnam Dong",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20AB",
    symbol_native: "\u20AB",
    symbol_placement: "before",
    thousands_separator: "."
  },
  YemenRial: {
    code: CurrencyCode.YemenRial,
    countries: [CountryCode.Yemen],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Yemen Rial",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\uFDFC",
    symbol_native: "\uFDFC",
    symbol_placement: "before",
    thousands_separator: "."
  },
  ZambiaKwacha: {
    code: CurrencyCode.ZambiaKwacha,
    countries: [CountryCode.Zambia],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Zambia Kwacha",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "ZK",
    symbol_native: "ZK",
    symbol_placement: "before",
    thousands_separator: "."
  },
  ZimbabweDollar: {
    code: CurrencyCode.ZimbabweDollar,
    countries: [CountryCode.Zimbabwe],
    decimal_digits: 2,
    decimal_separator: ",",
    name: "Zimbabwe Dollar",
    negative_sign: "-",
    positive_sign: "",
    rounding: 0,
    symbol: "\u20AB",
    symbol_native: "\u20AB",
    symbol_placement: "before",
    thousands_separator: "."
  }
};
var CryptoCurrency;
(function(CryptoCurrency2) {
  CryptoCurrency2["Bitcoin"] = "BTC";
  CryptoCurrency2["Ethereum"] = "ETH";
  CryptoCurrency2["Litecoin"] = "LTC";
  CryptoCurrency2["Ripple"] = "XRP";
  CryptoCurrency2["Dash"] = "DASH";
  CryptoCurrency2["Zcash"] = "ZEC";
  CryptoCurrency2["Dogecoin"] = "DOGE";
  CryptoCurrency2["Monero"] = "XMR";
  CryptoCurrency2["BitcoinCash"] = "BCH";
  CryptoCurrency2["EOS"] = "EOS";
  CryptoCurrency2["Binance"] = "BNB";
  CryptoCurrency2["Stellar"] = "XLM";
  CryptoCurrency2["Cardano"] = "ADA";
  CryptoCurrency2["IOTA"] = "IOTA";
  CryptoCurrency2["Tezos"] = "XTZ";
  CryptoCurrency2["NEO"] = "NEO";
  CryptoCurrency2["TRON"] = "TRX";
  CryptoCurrency2["EOSClassic"] = "EOSC";
  CryptoCurrency2["Ontology"] = "ONT";
  CryptoCurrency2["VeChain"] = "VEN";
  CryptoCurrency2["QTUM"] = "QTUM";
  CryptoCurrency2["Lisk"] = "LSK";
  CryptoCurrency2["Waves"] = "WAVES";
  CryptoCurrency2["OmiseGO"] = "OMG";
  CryptoCurrency2["Zilliqa"] = "ZIL";
  CryptoCurrency2["BitcoinGold"] = "BTG";
  CryptoCurrency2["Decred"] = "DCR";
  CryptoCurrency2["Stratis"] = "STRAT";
  CryptoCurrency2["Populous"] = "PPT";
  CryptoCurrency2["Augur"] = "REP";
  CryptoCurrency2["Golem"] = "GNT";
  CryptoCurrency2["Siacoin"] = "SC";
  CryptoCurrency2["BasicAttentionToken"] = "BAT";
  CryptoCurrency2["ZCoin"] = "XZC";
  CryptoCurrency2["StratisHedged"] = "SNT";
  CryptoCurrency2["VeChainHedged"] = "VEN";
  CryptoCurrency2["PowerLedger"] = "POWR";
  CryptoCurrency2["WavesHedged"] = "WAVE";
  CryptoCurrency2["ZilliqaHedged"] = "ZRX";
  CryptoCurrency2["BitcoinDiamond"] = "BCD";
  CryptoCurrency2["DigiByte"] = "DGB";
  CryptoCurrency2["DigiByteHedged"] = "DGB";
  CryptoCurrency2["Bytecoin"] = "BCN";
  CryptoCurrency2["BytecoinHedged"] = "BCN";
})(CryptoCurrency || (CryptoCurrency = {}));

// ../types/dist/i18n/language/index.js
var LanguageCode;
(function(LanguageCode2) {
  LanguageCode2["Afrikaans"] = "af";
  LanguageCode2["Albanian"] = "sq";
  LanguageCode2["Amharic"] = "am";
  LanguageCode2["Arabic"] = "ar";
  LanguageCode2["Armenian"] = "hy";
  LanguageCode2["Azerbaijani"] = "az";
  LanguageCode2["Bashkir"] = "ba";
  LanguageCode2["Basque"] = "eu";
  LanguageCode2["Belarusian"] = "be";
  LanguageCode2["Bengali"] = "bn";
  LanguageCode2["Berber"] = "ber";
  LanguageCode2["Bhutani"] = "dz";
  LanguageCode2["Bihari"] = "bh";
  LanguageCode2["Bislama"] = "bi";
  LanguageCode2["Bosnian"] = "bs";
  LanguageCode2["Breten"] = "br";
  LanguageCode2["Bulgarian"] = "bg";
  LanguageCode2["Burmese"] = "my";
  LanguageCode2["Cantonese"] = "yue";
  LanguageCode2["Catalan"] = "ca";
  LanguageCode2["Chinese"] = "zh";
  LanguageCode2["Chuvash"] = "cv";
  LanguageCode2["Corsican"] = "co";
  LanguageCode2["Croatian"] = "hr";
  LanguageCode2["Czech"] = "cs";
  LanguageCode2["Danish"] = "da";
  LanguageCode2["Dari"] = "prs";
  LanguageCode2["Divehi"] = "dv";
  LanguageCode2["Dutch"] = "nl";
  LanguageCode2["English"] = "en";
  LanguageCode2["Esperanto"] = "eo";
  LanguageCode2["Estonian"] = "et";
  LanguageCode2["Faroese"] = "fo";
  LanguageCode2["Farsi"] = "fa";
  LanguageCode2["Filipino"] = "fil";
  LanguageCode2["Finnish"] = "fi";
  LanguageCode2["French"] = "fr";
  LanguageCode2["Frisian"] = "fy";
  LanguageCode2["Galician"] = "gl";
  LanguageCode2["Georgian"] = "ka";
  LanguageCode2["German"] = "de";
  LanguageCode2["Greek"] = "el";
  LanguageCode2["Greenlandic"] = "kl";
  LanguageCode2["Gujarati"] = "gu";
  LanguageCode2["Haitian"] = "ht";
  LanguageCode2["Hausa"] = "ha";
  LanguageCode2["Hebrew"] = "he";
  LanguageCode2["Hindi"] = "hi";
  LanguageCode2["Hungarian"] = "hu";
  LanguageCode2["Icelandic"] = "is";
  LanguageCode2["Igbo"] = "ig";
  LanguageCode2["Indonesian"] = "id";
  LanguageCode2["Irish"] = "ga";
  LanguageCode2["Italian"] = "it";
  LanguageCode2["Japanese"] = "ja";
  LanguageCode2["Javanese"] = "jv";
  LanguageCode2["Kannada"] = "kn";
  LanguageCode2["Karelian"] = "krl";
  LanguageCode2["Kazakh"] = "kk";
  LanguageCode2["Khmer"] = "km";
  LanguageCode2["Komi"] = "kv";
  LanguageCode2["Konkani"] = "kok";
  LanguageCode2["Korean"] = "ko";
  LanguageCode2["Kurdish"] = "ku";
  LanguageCode2["Kyrgyz"] = "ky";
  LanguageCode2["Lao"] = "lo";
  LanguageCode2["Latin"] = "la";
  LanguageCode2["Latvian"] = "lv";
  LanguageCode2["Lithuanian"] = "lt";
  LanguageCode2["Luxembourgish"] = "lb";
  LanguageCode2["Ossetian"] = "os";
  LanguageCode2["Macedonian"] = "mk";
  LanguageCode2["Malagasy"] = "mg";
  LanguageCode2["Malay"] = "ms";
  LanguageCode2["Malayalam"] = "ml";
  LanguageCode2["Maltese"] = "mt";
  LanguageCode2["Maori"] = "mi";
  LanguageCode2["Marathi"] = "mr";
  LanguageCode2["Mari"] = "mhr";
  LanguageCode2["Mongolian"] = "mn";
  LanguageCode2["Montenegrin"] = "me";
  LanguageCode2["Nepali"] = "ne";
  LanguageCode2["NorthernSotho"] = "nso";
  LanguageCode2["Norwegian"] = "no";
  LanguageCode2["NorwegianBokmal"] = "nb";
  LanguageCode2["NorwegianNynorsk"] = "nn";
  LanguageCode2["Oriya"] = "or";
  LanguageCode2["Pashto"] = "ps";
  LanguageCode2["Persian"] = "fa";
  LanguageCode2["Polish"] = "pl";
  LanguageCode2["Portuguese"] = "pt";
  LanguageCode2["Punjabi"] = "pa";
  LanguageCode2["Quechua"] = "qu";
  LanguageCode2["Romanian"] = "ro";
  LanguageCode2["Russian"] = "ru";
  LanguageCode2["Sakha"] = "sah";
  LanguageCode2["Sami"] = "se";
  LanguageCode2["Samoan"] = "sm";
  LanguageCode2["Sanskrit"] = "sa";
  LanguageCode2["Scots"] = "gd";
  LanguageCode2["Serbian"] = "sr";
  LanguageCode2["SerbianCyrillic"] = "sr-Cyrl";
  LanguageCode2["Sesotho"] = "st";
  LanguageCode2["Shona"] = "sn";
  LanguageCode2["Sindhi"] = "sd";
  LanguageCode2["Sinhala"] = "si";
  LanguageCode2["Slovak"] = "sk";
  LanguageCode2["Slovenian"] = "sl";
  LanguageCode2["Somali"] = "so";
  LanguageCode2["Spanish"] = "es";
  LanguageCode2["Sudanese"] = "su";
  LanguageCode2["Sutu"] = "sx";
  LanguageCode2["Swahili"] = "sw";
  LanguageCode2["Swedish"] = "sv";
  LanguageCode2["Syriac"] = "syr";
  LanguageCode2["Tagalog"] = "tl";
  LanguageCode2["Tajik"] = "tg";
  LanguageCode2["Tamazight"] = "tmh";
  LanguageCode2["Tamil"] = "ta";
  LanguageCode2["Tatar"] = "tt";
  LanguageCode2["Telugu"] = "te";
  LanguageCode2["Thai"] = "th";
  LanguageCode2["Tibetan"] = "bo";
  LanguageCode2["Tsonga"] = "ts";
  LanguageCode2["Tswana"] = "tn";
  LanguageCode2["Turkish"] = "tr";
  LanguageCode2["Turkmen"] = "tk";
  LanguageCode2["Ukrainian"] = "uk";
  LanguageCode2["Urdu"] = "ur";
  LanguageCode2["Uzbek"] = "uz";
  LanguageCode2["Vietnamese"] = "vi";
  LanguageCode2["Welsh"] = "cy";
  LanguageCode2["Xhosa"] = "xh";
  LanguageCode2["Yiddish"] = "yi";
  LanguageCode2["Yoruba"] = "yo";
  LanguageCode2["Zulu"] = "zu";
})(LanguageCode || (LanguageCode = {}));

// ../types/dist/i18n/locale/index.js
var LocaleCode;
(function(LocaleCode2) {
  LocaleCode2["Afrikaans"] = "af";
  LocaleCode2["AfrikaansSouthAfrica"] = "af-ZA";
  LocaleCode2["Albanian"] = "sq";
  LocaleCode2["AlbanianAlbania"] = "sq-AL";
  LocaleCode2["Amharic"] = "am";
  LocaleCode2["AmharicEthiopia"] = "am-ET";
  LocaleCode2["Arabic"] = "ar";
  LocaleCode2["ArabicAlgeria"] = "ar-DZ";
  LocaleCode2["ArabicBahrain"] = "ar-BH";
  LocaleCode2["ArabicEgypt"] = "ar-EG";
  LocaleCode2["ArabicIraq"] = "ar-IQ";
  LocaleCode2["ArabicJordan"] = "ar-JO";
  LocaleCode2["ArabicKuwait"] = "ar-KW";
  LocaleCode2["ArabicLebanon"] = "ar-LB";
  LocaleCode2["ArabicLibya"] = "ar-LY";
  LocaleCode2["ArabicMorocco"] = "ar-MA";
  LocaleCode2["ArabicOman"] = "ar-OM";
  LocaleCode2["ArabicQatar"] = "ar-QA";
  LocaleCode2["ArabicSaudiArabia"] = "ar-SA";
  LocaleCode2["ArabicSyria"] = "ar-SY";
  LocaleCode2["ArabicTunisia"] = "ar-TN";
  LocaleCode2["ArabicUnitedArabEmirates"] = "ar-AE";
  LocaleCode2["ArabicYemen"] = "ar-YE";
  LocaleCode2["Armenian"] = "hy";
  LocaleCode2["ArmenianArmenia"] = "hy-AM";
  LocaleCode2["Azerbaijani"] = "az";
  LocaleCode2["AzerbaijaniAzerbaijan"] = "az-AZ";
  LocaleCode2["AzerbaijaniCyrillicAzerbaijan"] = "az-Cyrl-AZ";
  LocaleCode2["Bashkir"] = "ba";
  LocaleCode2["Basque"] = "eu";
  LocaleCode2["BasqueSpain"] = "eu-ES";
  LocaleCode2["Belarusian"] = "be";
  LocaleCode2["BelarusianBelarus"] = "be-BY";
  LocaleCode2["Bengali"] = "bn";
  LocaleCode2["BengaliBangladesh"] = "bn-BD";
  LocaleCode2["BengaliIndia"] = "bn-IN";
  LocaleCode2["Berber"] = "ber";
  LocaleCode2["Bhutani"] = "dz";
  LocaleCode2["BhutaniBhutan"] = "dz-BT";
  LocaleCode2["Bosnian"] = "bs";
  LocaleCode2["BosnianBosniaAndHerzegovina"] = "bs-BA";
  LocaleCode2["Breton"] = "br";
  LocaleCode2["Bulgarian"] = "bg";
  LocaleCode2["BulgarianBosniaAndHerzegovina"] = "bg-BG";
  LocaleCode2["BulgarianBulgaria"] = "bg-BG";
  LocaleCode2["Burmese"] = "my";
  LocaleCode2["BurmeseMyanmar"] = "my-MM";
  LocaleCode2["Cantonese"] = "yue";
  LocaleCode2["CantoneseHongKong"] = "yue-HK";
  LocaleCode2["Catalan"] = "ca";
  LocaleCode2["CatalanSpain"] = "ca-ES";
  LocaleCode2["Chechen"] = "ce";
  LocaleCode2["Cherokee"] = "chr";
  LocaleCode2["Chinese"] = "zh";
  LocaleCode2["ChineseSimplified"] = "zh-Hans";
  LocaleCode2["ChineseSimplifiedChina"] = "zh-Hans-CN";
  LocaleCode2["ChineseSimplifiedHongKong"] = "zh-Hans-HK";
  LocaleCode2["ChineseSimplifiedMacau"] = "zh-Hans-MO";
  LocaleCode2["ChineseSimplifiedSingapore"] = "zh-Hans-SG";
  LocaleCode2["ChineseTraditional"] = "zh-Hant";
  LocaleCode2["ChineseTraditionalHongKong"] = "zh-Hant-HK";
  LocaleCode2["ChineseTraditionalMacau"] = "zh-Hant-MO";
  LocaleCode2["ChineseTraditionalSingapore"] = "zh-Hant-SG";
  LocaleCode2["ChineseTraditionalTaiwan"] = "zh-Hant-TW";
  LocaleCode2["Chuvash"] = "cv";
  LocaleCode2["CorsicanFrance"] = "co-FR";
  LocaleCode2["Croatian"] = "hr";
  LocaleCode2["CroatianBosniaAndHerzegovina"] = "hr-BA";
  LocaleCode2["CroatianCroatia"] = "hr-HR";
  LocaleCode2["Czech"] = "cs";
  LocaleCode2["CzechCzechRepublic"] = "cs-CZ";
  LocaleCode2["Danish"] = "da";
  LocaleCode2["DanishDenmark"] = "da-DK";
  LocaleCode2["Dari"] = "prs";
  LocaleCode2["DariAfghanistan"] = "prs-AF";
  LocaleCode2["Divehi"] = "dv";
  LocaleCode2["DivehiMaldives"] = "dv-MV";
  LocaleCode2["Dutch"] = "nl";
  LocaleCode2["DutchBelgium"] = "nl-BE";
  LocaleCode2["DutchNetherlands"] = "nl-NL";
  LocaleCode2["English"] = "en";
  LocaleCode2["EnglishAustralia"] = "en-AU";
  LocaleCode2["EnglishBelgium"] = "en-BE";
  LocaleCode2["EnglishBelize"] = "en-BZ";
  LocaleCode2["EnglishCanada"] = "en-CA";
  LocaleCode2["EnglishCaribbean"] = "en-029";
  LocaleCode2["EnglishIreland"] = "en-IE";
  LocaleCode2["EnglishJamaica"] = "en-JM";
  LocaleCode2["EnglishNewZealand"] = "en-NZ";
  LocaleCode2["EnglishPhilippines"] = "en-PH";
  LocaleCode2["EnglishSingapore"] = "en-SG";
  LocaleCode2["EnglishSouthAfrica"] = "en-ZA";
  LocaleCode2["EnglishTrinidadAndTobago"] = "en-TT";
  LocaleCode2["EnglishUnitedKingdom"] = "en-GB";
  LocaleCode2["EnglishUnitedStates"] = "en-US";
  LocaleCode2["EnglishZimbabwe"] = "en-ZW";
  LocaleCode2["Esperanto"] = "eo";
  LocaleCode2["Estonian"] = "et";
  LocaleCode2["EstonianEstonia"] = "et-EE";
  LocaleCode2["Faroese"] = "fo";
  LocaleCode2["FaroeseFaroeIslands"] = "fo-FO";
  LocaleCode2["Farsi"] = "fa";
  LocaleCode2["FarsiIran"] = "fa-IR";
  LocaleCode2["Filipino"] = "fil";
  LocaleCode2["FilipinoPhilippines"] = "fil-PH";
  LocaleCode2["Finnish"] = "fi";
  LocaleCode2["FinnishFinland"] = "fi-FI";
  LocaleCode2["French"] = "fr";
  LocaleCode2["FrenchBelgium"] = "fr-BE";
  LocaleCode2["FrenchCanada"] = "fr-CA";
  LocaleCode2["FrenchFrance"] = "fr-FR";
  LocaleCode2["FrenchLuxembourg"] = "fr-LU";
  LocaleCode2["FrenchMonaco"] = "fr-MC";
  LocaleCode2["FrenchReunion"] = "fr-RE";
  LocaleCode2["FrenchSwitzerland"] = "fr-CH";
  LocaleCode2["Frisian"] = "fy";
  LocaleCode2["FrisianNetherlands"] = "fy-NL";
  LocaleCode2["Galician"] = "gl";
  LocaleCode2["GalicianSpain"] = "gl-ES";
  LocaleCode2["Georgian"] = "ka";
  LocaleCode2["GeorgianGeorgia"] = "ka-GE";
  LocaleCode2["German"] = "de";
  LocaleCode2["GermanAustria"] = "de-AT";
  LocaleCode2["GermanBelgium"] = "de-BE";
  LocaleCode2["GermanGermany"] = "de-DE";
  LocaleCode2["GermanLiechtenstein"] = "de-LI";
  LocaleCode2["GermanLuxembourg"] = "de-LU";
  LocaleCode2["GermanSwitzerland"] = "de-CH";
  LocaleCode2["Greenlandic"] = "kl";
  LocaleCode2["GreenlandicGreenland"] = "kl-GL";
  LocaleCode2["Greek"] = "el";
  LocaleCode2["GreekGreece"] = "el-GR";
  LocaleCode2["Gujarati"] = "gu";
  LocaleCode2["GujaratiIndia"] = "gu-IN";
  LocaleCode2["Haitian"] = "ht";
  LocaleCode2["Hausa"] = "ha";
  LocaleCode2["HausaGhana"] = "ha-GH";
  LocaleCode2["HausaNiger"] = "ha-NE";
  LocaleCode2["HausaNigeria"] = "ha-NG";
  LocaleCode2["Hebrew"] = "he";
  LocaleCode2["HebrewIsrael"] = "he-IL";
  LocaleCode2["Hindi"] = "hi";
  LocaleCode2["HindiIndia"] = "hi-IN";
  LocaleCode2["Hungarian"] = "hu";
  LocaleCode2["HungarianHungary"] = "hu-HU";
  LocaleCode2["Icelandic"] = "is";
  LocaleCode2["IcelandicIceland"] = "is-IS";
  LocaleCode2["Igbo"] = "ig";
  LocaleCode2["IgboNigeria"] = "ig-NG";
  LocaleCode2["Indonesian"] = "id";
  LocaleCode2["IndonesianIndonesia"] = "id-ID";
  LocaleCode2["Irish"] = "ga";
  LocaleCode2["IrishIreland"] = "ga-IE";
  LocaleCode2["Italian"] = "it";
  LocaleCode2["ItalianItaly"] = "it-IT";
  LocaleCode2["ItalianSwitzerland"] = "it-CH";
  LocaleCode2["Japanese"] = "ja";
  LocaleCode2["JapaneseJapan"] = "ja-JP";
  LocaleCode2["Javanese"] = "jv";
  LocaleCode2["Kannada"] = "kn";
  LocaleCode2["KannadaIndia"] = "kn-IN";
  LocaleCode2["Karelian"] = "krl";
  LocaleCode2["Kazakh"] = "kk";
  LocaleCode2["KazakhKazakhstan"] = "kk-KZ";
  LocaleCode2["Khmer"] = "km";
  LocaleCode2["KhmerCambodia"] = "km-KH";
  LocaleCode2["KinyarwandaRwanda"] = "rw-RW";
  LocaleCode2["Komi"] = "kv";
  LocaleCode2["Konkani"] = "kok";
  LocaleCode2["KonkaniIndia"] = "kok-IN";
  LocaleCode2["Korean"] = "ko";
  LocaleCode2["KoreanSouthKorea"] = "ko-KR";
  LocaleCode2["Kurdish"] = "ku";
  LocaleCode2["KurdishIraq"] = "ku-IQ";
  LocaleCode2["KurdishTurkey"] = "ku-TR";
  LocaleCode2["Kyrgyz"] = "ky";
  LocaleCode2["KyrgyzKyrgyzstan"] = "ky-KG";
  LocaleCode2["Lao"] = "lo";
  LocaleCode2["LaoLaos"] = "lo-LA";
  LocaleCode2["Latin"] = "la";
  LocaleCode2["Latvian"] = "lv";
  LocaleCode2["LatvianLatvia"] = "lv-LV";
  LocaleCode2["Lithuanian"] = "lt";
  LocaleCode2["LithuanianLithuania"] = "lt-LT";
  LocaleCode2["Luxembourgish"] = "lb";
  LocaleCode2["LuxembourgishBelgium"] = "lb-LU";
  LocaleCode2["LuxembourgishLuxembourg"] = "lb-LU";
  LocaleCode2["Macedonian"] = "mk";
  LocaleCode2["MacedonianNorthMacedonia"] = "mk-MK";
  LocaleCode2["Malagasy"] = "mg";
  LocaleCode2["Malay"] = "ms";
  LocaleCode2["MalayBrunei"] = "ms-BN";
  LocaleCode2["MalayIndia"] = "ms-IN";
  LocaleCode2["MalayMalaysia"] = "ms-MY";
  LocaleCode2["MalaySingapore"] = "ms-SG";
  LocaleCode2["Malayalam"] = "ml";
  LocaleCode2["MalayalamIndia"] = "ml-IN";
  LocaleCode2["Maltese"] = "mt";
  LocaleCode2["MalteseMalta"] = "mt-MT";
  LocaleCode2["Maori"] = "mi";
  LocaleCode2["MaoriNewZealand"] = "mi-NZ";
  LocaleCode2["Marathi"] = "mr";
  LocaleCode2["MarathiIndia"] = "mr-IN";
  LocaleCode2["Mari"] = "chm";
  LocaleCode2["Mongolian"] = "mn";
  LocaleCode2["MongolianMongolia"] = "mn-MN";
  LocaleCode2["Montenegrin"] = "me";
  LocaleCode2["MontenegrinMontenegro"] = "me-ME";
  LocaleCode2["Nepali"] = "ne";
  LocaleCode2["NepaliNepal"] = "ne-NP";
  LocaleCode2["NorthernSotho"] = "ns";
  LocaleCode2["NorthernSothoSouthAfrica"] = "ns-ZA";
  LocaleCode2["Norwegian"] = "nb";
  LocaleCode2["NorwegianBokmalNorway"] = "nb-NO";
  LocaleCode2["NorwegianNynorskNorway"] = "nn-NO";
  LocaleCode2["Oriya"] = "or";
  LocaleCode2["OriyaIndia"] = "or-IN";
  LocaleCode2["Ossetian"] = "os";
  LocaleCode2["Pashto"] = "ps";
  LocaleCode2["PashtoAfghanistan"] = "ps-AF";
  LocaleCode2["Persian"] = "fa";
  LocaleCode2["PersianIran"] = "fa-IR";
  LocaleCode2["Polish"] = "pl";
  LocaleCode2["PolishPoland"] = "pl-PL";
  LocaleCode2["Portuguese"] = "pt";
  LocaleCode2["PortugueseBrazil"] = "pt-BR";
  LocaleCode2["PortuguesePortugal"] = "pt-PT";
  LocaleCode2["Punjabi"] = "pa";
  LocaleCode2["PunjabiIndia"] = "pa-IN";
  LocaleCode2["PunjabiPakistan"] = "pa-PK";
  LocaleCode2["Quechua"] = "qu";
  LocaleCode2["QuechuaBolivia"] = "qu-BO";
  LocaleCode2["QuechuaEcuador"] = "qu-EC";
  LocaleCode2["QuechuaPeru"] = "qu-PE";
  LocaleCode2["Romanian"] = "ro";
  LocaleCode2["RomanianRomania"] = "ro-RO";
  LocaleCode2["Russian"] = "ru";
  LocaleCode2["RussianKazakhstan"] = "ru-KZ";
  LocaleCode2["RussianKyrgyzstan"] = "ru-KG";
  LocaleCode2["RussianRussia"] = "ru-RU";
  LocaleCode2["RussianUkraine"] = "ru-UA";
  LocaleCode2["Sakha"] = "sah";
  LocaleCode2["Sanskrit"] = "sa";
  LocaleCode2["SanskritIndia"] = "sa-IN";
  LocaleCode2["Sami"] = "se";
  LocaleCode2["SamiNorway"] = "se-NO";
  LocaleCode2["SamiSweden"] = "se-SE";
  LocaleCode2["SamiFinland"] = "se-FI";
  LocaleCode2["Samoan"] = "sm";
  LocaleCode2["SamoanSamoa"] = "sm-WS";
  LocaleCode2["Scots"] = "gd";
  LocaleCode2["Serbian"] = "sr";
  LocaleCode2["SerbianBosniaAndHerzegovina"] = "sr-BA";
  LocaleCode2["SerbianSerbiaAndMontenegro"] = "sr-SP";
  LocaleCode2["SerbianCyrillic"] = "sr-SP-Cyrl";
  LocaleCode2["SerbianCyrillicBosniaAndHerzegovina"] = "sr-Cyrl-BA";
  LocaleCode2["SerbianCyrillicSerbiaAndMontenegro"] = "sr-Cyrl-SP";
  LocaleCode2["Sesotho"] = "st";
  LocaleCode2["SesothoSouthAfrica"] = "st-ZA";
  LocaleCode2["Shona"] = "sn";
  LocaleCode2["ShonaZimbabwe"] = "sn-ZW";
  LocaleCode2["Sindhi"] = "sd";
  LocaleCode2["SindhiPakistan"] = "sd-PK";
  LocaleCode2["Sinhala"] = "si";
  LocaleCode2["SinhalaSriLanka"] = "si-LK";
  LocaleCode2["Slovak"] = "sk";
  LocaleCode2["SlovakSlovakia"] = "sk-SK";
  LocaleCode2["Slovenian"] = "sl";
  LocaleCode2["SlovenianSlovenia"] = "sl-SI";
  LocaleCode2["Somali"] = "so";
  LocaleCode2["SomaliSomalia"] = "so-SO";
  LocaleCode2["Spanish"] = "es";
  LocaleCode2["SpanishArgentina"] = "es-AR";
  LocaleCode2["SpanishBolivia"] = "es-BO";
  LocaleCode2["SpanishChile"] = "es-CL";
  LocaleCode2["SpanishColombia"] = "es-CO";
  LocaleCode2["SpanishCostaRica"] = "es-CR";
  LocaleCode2["SpanishCuba"] = "es-CU";
  LocaleCode2["SpanishDominicanRepublic"] = "es-DO";
  LocaleCode2["SpanishEcuador"] = "es-EC";
  LocaleCode2["SpanishEquatorialGuinea"] = "es-GQ";
  LocaleCode2["SpanishElSalvador"] = "es-SV";
  LocaleCode2["SpanishGuatemala"] = "es-GT";
  LocaleCode2["SpanishHonduras"] = "es-HN";
  LocaleCode2["SpanishMexico"] = "es-MX";
  LocaleCode2["SpanishNicaragua"] = "es-NI";
  LocaleCode2["SpanishPanama"] = "es-PA";
  LocaleCode2["SpanishParaguay"] = "es-PY";
  LocaleCode2["SpanishPeru"] = "es-PE";
  LocaleCode2["SpanishPuertoRico"] = "es-PR";
  LocaleCode2["SpanishSpain"] = "es-ES";
  LocaleCode2["SpanishUnitedStates"] = "es-US";
  LocaleCode2["SpanishUruguay"] = "es-UY";
  LocaleCode2["SpanishVenezuela"] = "es-VE";
  LocaleCode2["Sudanese"] = "su";
  LocaleCode2["Sutu"] = "st";
  LocaleCode2["SutuSouthAfrica"] = "st-ZA";
  LocaleCode2["Swahili"] = "sw";
  LocaleCode2["SwahiliKenya"] = "sw-KE";
  LocaleCode2["Swedish"] = "sv";
  LocaleCode2["SwedishFinland"] = "sv-FI";
  LocaleCode2["SwedishSweden"] = "sv-SE";
  LocaleCode2["Syriac"] = "syr";
  LocaleCode2["SyriacSyria"] = "syr-SY";
  LocaleCode2["Tajik"] = "tg";
  LocaleCode2["TajikTajikistan"] = "tg-TJ";
  LocaleCode2["Tagalog"] = "tl";
  LocaleCode2["TagalogPhilippines"] = "tl-PH";
  LocaleCode2["Tamazight"] = "tmh";
  LocaleCode2["Tamil"] = "ta";
  LocaleCode2["TamilIndia"] = "ta-IN";
  LocaleCode2["Tatar"] = "tt";
  LocaleCode2["Telugu"] = "te";
  LocaleCode2["TeluguIndia"] = "te-IN";
  LocaleCode2["Thai"] = "th";
  LocaleCode2["ThaiThailand"] = "th-TH";
  LocaleCode2["Tibetan"] = "bo";
  LocaleCode2["TibetanBhutan"] = "bo-BT";
  LocaleCode2["TibetanChina"] = "bo-CN";
  LocaleCode2["TibetanIndia"] = "bo-IN";
  LocaleCode2["Tsonga"] = "ts";
  LocaleCode2["Tswana"] = "tn";
  LocaleCode2["TswanaSouthAfrica"] = "tn-ZA";
  LocaleCode2["Turkish"] = "tr";
  LocaleCode2["TurkishTurkey"] = "tr-TR";
  LocaleCode2["Turkmen"] = "tk";
  LocaleCode2["Ukrainian"] = "uk";
  LocaleCode2["UkrainianUkraine"] = "uk-UA";
  LocaleCode2["Urdu"] = "ur";
  LocaleCode2["UrduAfghanistan"] = "ur-AF";
  LocaleCode2["UrduIndia"] = "ur-IN";
  LocaleCode2["UrduPakistan"] = "ur-PK";
  LocaleCode2["Uzbek"] = "uz";
  LocaleCode2["UzbekCyrillic"] = "uz-Cyrl-UZ";
  LocaleCode2["UzbekLatin"] = "uz-Latn-UZ";
  LocaleCode2["UzbekUzbekistan"] = "uz-UZ";
  LocaleCode2["Vietnamese"] = "vi";
  LocaleCode2["VietnameseVietnam"] = "vi-VN";
  LocaleCode2["Welsh"] = "cy";
  LocaleCode2["WelshUnitedKingdom"] = "cy-GB";
  LocaleCode2["Xhosa"] = "xh";
  LocaleCode2["XhosaSouthAfrica"] = "xh-ZA";
  LocaleCode2["Yiddish"] = "yi";
  LocaleCode2["Yoruba"] = "yo";
  LocaleCode2["YorubaNigeria"] = "yo-NG";
  LocaleCode2["ZhuyinMandarinChina"] = "yue-Hant-CN";
  LocaleCode2["Zulu"] = "zu";
  LocaleCode2["ZuluSouthAfrica"] = "zu-ZA";
})(LocaleCode || (LocaleCode = {}));

// ../types/dist/i18n/time/region.js
var TimezoneRegions;
(function(TimezoneRegions2) {
  TimezoneRegions2["AfricaAbidjan"] = "Africa/Abidjan";
  TimezoneRegions2["AfricaAccra"] = "Africa/Accra";
  TimezoneRegions2["AfricaAddisAbaba"] = "Africa/Addis_Ababa";
  TimezoneRegions2["AfricaAlgiers"] = "Africa/Algiers";
  TimezoneRegions2["AfricaAsmara"] = "Africa/Asmara";
  TimezoneRegions2["AfricaBamako"] = "Africa/Bamako";
  TimezoneRegions2["AfricaBangui"] = "Africa/Bangui";
  TimezoneRegions2["AfricaBanjul"] = "Africa/Banjul";
  TimezoneRegions2["AfricaBissau"] = "Africa/Bissau";
  TimezoneRegions2["AfricaBlantyre"] = "Africa/Blantyre";
  TimezoneRegions2["AfricaBrazzaville"] = "Africa/Brazzaville";
  TimezoneRegions2["AfricaBujumbura"] = "Africa/Bujumbura";
  TimezoneRegions2["AfricaCairo"] = "Africa/Cairo";
  TimezoneRegions2["AfricaCasablanca"] = "Africa/Casablanca";
  TimezoneRegions2["AfricaCeuta"] = "Africa/Ceuta";
  TimezoneRegions2["AfricaConakry"] = "Africa/Conakry";
  TimezoneRegions2["AfricaDakar"] = "Africa/Dakar";
  TimezoneRegions2["AfricaDarEsSalaam"] = "Africa/Dar_es_Salaam";
  TimezoneRegions2["AfricaDjibouti"] = "Africa/Djibouti";
  TimezoneRegions2["AfricaDouala"] = "Africa/Douala";
  TimezoneRegions2["AfricaElAaiun"] = "Africa/El_Aaiun";
  TimezoneRegions2["AfricaFreetown"] = "Africa/Freetown";
  TimezoneRegions2["AfricaGaborone"] = "Africa/Gaborone";
  TimezoneRegions2["AfricaHarare"] = "Africa/Harare";
  TimezoneRegions2["AfricaJohannesburg"] = "Africa/Johannesburg";
  TimezoneRegions2["AfricaJuba"] = "Africa/Juba";
  TimezoneRegions2["AfricaKampala"] = "Africa/Kampala";
  TimezoneRegions2["AfricaKhartoum"] = "Africa/Khartoum";
  TimezoneRegions2["AfricaKigali"] = "Africa/Kigali";
  TimezoneRegions2["AfricaKinshasa"] = "Africa/Kinshasa";
  TimezoneRegions2["AfricaLagos"] = "Africa/Lagos";
  TimezoneRegions2["AfricaLibreville"] = "Africa/Libreville";
  TimezoneRegions2["AfricaLome"] = "Africa/Lome";
  TimezoneRegions2["AfricaLuanda"] = "Africa/Luanda";
  TimezoneRegions2["AfricaLubumbashi"] = "Africa/Lubumbashi";
  TimezoneRegions2["AfricaLusaka"] = "Africa/Lusaka";
  TimezoneRegions2["AfricaMalabo"] = "Africa/Malabo";
  TimezoneRegions2["AfricaMaputo"] = "Africa/Maputo";
  TimezoneRegions2["AfricaMaseru"] = "Africa/Maseru";
  TimezoneRegions2["AfricaMbabane"] = "Africa/Mbabane";
  TimezoneRegions2["AfricaMogadishu"] = "Africa/Mogadishu";
  TimezoneRegions2["AfricaMonrovia"] = "Africa/Monrovia";
  TimezoneRegions2["AfricaNairobi"] = "Africa/Nairobi";
  TimezoneRegions2["AfricaNdjamena"] = "Africa/Ndjamena";
  TimezoneRegions2["AfricaNiamey"] = "Africa/Niamey";
  TimezoneRegions2["AfricaNouakchott"] = "Africa/Nouakchott";
  TimezoneRegions2["AfricaOuagadougou"] = "Africa/Ouagadougou";
  TimezoneRegions2["AfricaPortoNovo"] = "Africa/Porto-Novo";
  TimezoneRegions2["AfricaSaoTome"] = "Africa/Sao_Tome";
  TimezoneRegions2["AfricaTripoli"] = "Africa/Tripoli";
  TimezoneRegions2["AfricaTunis"] = "Africa/Tunis";
  TimezoneRegions2["AfricaWindhoek"] = "Africa/Windhoek";
  TimezoneRegions2["AmericaAdak"] = "America/Adak";
  TimezoneRegions2["AmericaAnchorage"] = "America/Anchorage";
  TimezoneRegions2["AmericaAnguilla"] = "America/Anguilla";
  TimezoneRegions2["AmericaAntigua"] = "America/Antigua";
  TimezoneRegions2["AmericaAraguaina"] = "America/Araguaina";
  TimezoneRegions2["AmericaArgentinaBuenosAires"] = "America/Argentina/Buenos_Aires";
  TimezoneRegions2["AmericaArgentinaCatamarca"] = "America/Argentina/Catamarca";
  TimezoneRegions2["AmericaArgentinaCordoba"] = "America/Argentina/Cordoba";
  TimezoneRegions2["AmericaArgentinaJujuy"] = "America/Argentina/Jujuy";
  TimezoneRegions2["AmericaArgentinaLaRioja"] = "America/Argentina/La_Rioja";
  TimezoneRegions2["AmericaArgentinaMendoza"] = "America/Argentina/Mendoza";
  TimezoneRegions2["AmericaArgentinaRioGallegos"] = "America/Argentina/Rio_Gallegos";
  TimezoneRegions2["AmericaArgentinaSalta"] = "America/Argentina/Salta";
  TimezoneRegions2["AmericaArgentinaSanJuan"] = "America/Argentina/San_Juan";
  TimezoneRegions2["AmericaArgentinaSanLuis"] = "America/Argentina/San_Luis";
  TimezoneRegions2["AmericaArgentinaTucuman"] = "America/Argentina/Tucuman";
  TimezoneRegions2["AmericaArgentinaUshuaia"] = "America/Argentina/Ushuaia";
  TimezoneRegions2["AmericaAruba"] = "America/Aruba";
  TimezoneRegions2["AmericaAsuncion"] = "America/Asuncion";
  TimezoneRegions2["AmericaAtikokan"] = "America/Atikokan";
  TimezoneRegions2["AmericaAtka"] = "America/Atka";
  TimezoneRegions2["AmericaBahia"] = "America/Bahia";
  TimezoneRegions2["AmericaBahiaBanderas"] = "America/Bahia_Banderas";
  TimezoneRegions2["AmericaBarbados"] = "America/Barbados";
  TimezoneRegions2["AmericaBelem"] = "America/Belem";
  TimezoneRegions2["AmericaBelize"] = "America/Belize";
  TimezoneRegions2["AmericaBlancSablon"] = "America/Blanc-Sablon";
  TimezoneRegions2["AmericaBoaVista"] = "America/Boa_Vista";
  TimezoneRegions2["AmericaBogota"] = "America/Bogota";
  TimezoneRegions2["AmericaBoise"] = "America/Boise";
  TimezoneRegions2["AmericaCambridgeBay"] = "America/Cambridge_Bay";
  TimezoneRegions2["AmericaCampoGrande"] = "America/Campo_Grande";
  TimezoneRegions2["AmericaCancun"] = "America/Cancun";
  TimezoneRegions2["AmericaCaracas"] = "America/Caracas";
  TimezoneRegions2["AmericaCayenne"] = "America/Cayenne";
  TimezoneRegions2["AmericaCayman"] = "America/Cayman";
  TimezoneRegions2["AmericaChicago"] = "America/Chicago";
  TimezoneRegions2["AmericaChihuahua"] = "America/Chihuahua";
  TimezoneRegions2["AmericaCoralHarbour"] = "America/Coral_Harbour";
  TimezoneRegions2["AmericaCordoba"] = "America/Cordoba";
  TimezoneRegions2["AmericaCostaRica"] = "America/Costa_Rica";
  TimezoneRegions2["AmericaCreston"] = "America/Creston";
  TimezoneRegions2["AmericaCuiaba"] = "America/Cuiaba";
  TimezoneRegions2["AmericaCuracao"] = "America/Curacao";
  TimezoneRegions2["AmericaDanmarkshavn"] = "America/Danmarkshavn";
  TimezoneRegions2["AmericaDawson"] = "America/Dawson";
  TimezoneRegions2["AmericaDawsonCreek"] = "America/Dawson_Creek";
  TimezoneRegions2["AmericaDenver"] = "America/Denver";
  TimezoneRegions2["AmericaDetroit"] = "America/Detroit";
  TimezoneRegions2["AmericaDominica"] = "America/Dominica";
  TimezoneRegions2["AmericaEdmonton"] = "America/Edmonton";
  TimezoneRegions2["AmericaEirunepe"] = "America/Eirunepe";
  TimezoneRegions2["AmericaElSalvador"] = "America/El_Salvador";
  TimezoneRegions2["AmericaFortaleza"] = "America/Fortaleza";
  TimezoneRegions2["AmericaGlaceBay"] = "America/Glace_Bay";
  TimezoneRegions2["AmericaGodthab"] = "America/Godthab";
  TimezoneRegions2["AmericaGooseBay"] = "America/Goose_Bay";
  TimezoneRegions2["AmericaGrandTurk"] = "America/Grand_Turk";
  TimezoneRegions2["AmericaGrenada"] = "America/Grenada";
  TimezoneRegions2["AmericaGuadeloupe"] = "America/Guadeloupe";
  TimezoneRegions2["AmericaGuatemala"] = "America/Guatemala";
  TimezoneRegions2["AmericaGuayaquil"] = "America/Guayaquil";
  TimezoneRegions2["AmericaGuyana"] = "America/Guyana";
  TimezoneRegions2["AmericaHalifax"] = "America/Halifax";
  TimezoneRegions2["AmericaHavana"] = "America/Havana";
  TimezoneRegions2["AmericaHermosillo"] = "America/Hermosillo";
  TimezoneRegions2["AmericaIndianaIndianapolis"] = "America/Indiana/Indianapolis";
  TimezoneRegions2["AmericaIndianaKnox"] = "America/Indiana/Knox";
  TimezoneRegions2["AmericaIndianaMarengo"] = "America/Indiana/Marengo";
  TimezoneRegions2["AmericaIndianaPetersburg"] = "America/Indiana/Petersburg";
  TimezoneRegions2["AmericaIndianaTellCity"] = "America/Indiana/Tell_City";
  TimezoneRegions2["AmericaIndianaVevay"] = "America/Indiana/Vevay";
  TimezoneRegions2["AmericaIndianaVincennes"] = "America/Indiana/Vincennes";
  TimezoneRegions2["AmericaIndianaWinamac"] = "America/Indiana/Winamac";
  TimezoneRegions2["AmericaInuvik"] = "America/Inuvik";
  TimezoneRegions2["AmericaIqaluit"] = "America/Iqaluit";
  TimezoneRegions2["AmericaJamaica"] = "America/Jamaica";
  TimezoneRegions2["AmericaJuneau"] = "America/Juneau";
  TimezoneRegions2["AmericaKentuckyLouisville"] = "America/Kentucky/Louisville";
  TimezoneRegions2["AmericaKentuckyMonticello"] = "America/Kentucky/Monticello";
  TimezoneRegions2["AmericaKralendijk"] = "America/Kralendijk";
  TimezoneRegions2["AmericaLaPaz"] = "America/La_Paz";
  TimezoneRegions2["AmericaLima"] = "America/Lima";
  TimezoneRegions2["AmericaLosAngeles"] = "America/Los_Angeles";
  TimezoneRegions2["AmericaLouisville"] = "America/Louisville";
  TimezoneRegions2["AmericaLowerPrinces"] = "America/Lower_Princes";
  TimezoneRegions2["AmericaMaceio"] = "America/Maceio";
  TimezoneRegions2["AmericaManagua"] = "America/Managua";
  TimezoneRegions2["AmericaManaus"] = "America/Manaus";
  TimezoneRegions2["AmericaMarigot"] = "America/Marigot";
  TimezoneRegions2["AmericaMartinique"] = "America/Martinique";
  TimezoneRegions2["AmericaMatamoros"] = "America/Matamoros";
  TimezoneRegions2["AmericaMazatlan"] = "America/Mazatlan";
  TimezoneRegions2["AmericaMenominee"] = "America/Menominee";
  TimezoneRegions2["AmericaMerida"] = "America/Merida";
  TimezoneRegions2["AmericaMetlakatla"] = "America/Metlakatla";
  TimezoneRegions2["AmericaMexicoCity"] = "America/Mexico_City";
  TimezoneRegions2["AmericaMiquelon"] = "America/Miquelon";
  TimezoneRegions2["AmericaMoncton"] = "America/Moncton";
  TimezoneRegions2["AmericaMonterrey"] = "America/Monterrey";
  TimezoneRegions2["AmericaMontevideo"] = "America/Montevideo";
  TimezoneRegions2["AmericaMontserrat"] = "America/Montserrat";
  TimezoneRegions2["AmericaMontreal"] = "America/Montreal";
  TimezoneRegions2["AmericaNassau"] = "America/Nassau";
  TimezoneRegions2["AmericaNewYork"] = "America/New_York";
  TimezoneRegions2["AmericaNipigon"] = "America/Nipigon";
  TimezoneRegions2["AmericaNome"] = "America/Nome";
  TimezoneRegions2["AmericaNoronha"] = "America/Noronha";
  TimezoneRegions2["AmericaNorthDakotaBeulah"] = "America/North_Dakota/Beulah";
  TimezoneRegions2["AmericaNorthDakotaCenter"] = "America/North_Dakota/Center";
  TimezoneRegions2["AmericaNorthDakotaNewSalem"] = "America/North_Dakota/New_Salem";
  TimezoneRegions2["AmericaOjinaga"] = "America/Ojinaga";
  TimezoneRegions2["AmericaPanama"] = "America/Panama";
  TimezoneRegions2["AmericaPangnirtung"] = "America/Pangnirtung";
  TimezoneRegions2["AmericaParamaribo"] = "America/Paramaribo";
  TimezoneRegions2["AmericaPhoenix"] = "America/Phoenix";
  TimezoneRegions2["AmericaPortAuPrince"] = "America/Port-au-Prince";
  TimezoneRegions2["AmericaPortOfSpain"] = "America/Port_of_Spain";
  TimezoneRegions2["AmericaPortoVelho"] = "America/Porto_Velho";
  TimezoneRegions2["AmericaPuertoRico"] = "America/Puerto_Rico";
  TimezoneRegions2["AmericaRainyRiver"] = "America/Rainy_River";
  TimezoneRegions2["AmericaRankinInlet"] = "America/Rankin_Inlet";
  TimezoneRegions2["AmericaRecife"] = "America/Recife";
  TimezoneRegions2["AmericaRegina"] = "America/Regina";
  TimezoneRegions2["AmericaResolute"] = "America/Resolute";
  TimezoneRegions2["AmericaRioBranco"] = "America/Rio_Branco";
  TimezoneRegions2["AmericaSantaIsabel"] = "America/Santa_Isabel";
  TimezoneRegions2["AmericaSantarem"] = "America/Santarem";
  TimezoneRegions2["AmericaSantiago"] = "America/Santiago";
  TimezoneRegions2["AmericaSantoDomingo"] = "America/Santo_Domingo";
  TimezoneRegions2["AmericaSaoPaulo"] = "America/Sao_Paulo";
  TimezoneRegions2["AmericaScoresbysund"] = "America/Scoresbysund";
  TimezoneRegions2["AmericaShiprock"] = "America/Shiprock";
  TimezoneRegions2["AmericaSitka"] = "America/Sitka";
  TimezoneRegions2["AmericaStBarthelemy"] = "America/St_Barthelemy";
  TimezoneRegions2["AmericaStJohns"] = "America/St_Johns";
  TimezoneRegions2["AmericaStKitts"] = "America/St_Kitts";
  TimezoneRegions2["AmericaStLucia"] = "America/St_Lucia";
  TimezoneRegions2["AmericaStThomas"] = "America/St_Thomas";
  TimezoneRegions2["AmericaStVincent"] = "America/St_Vincent";
  TimezoneRegions2["AmericaSwiftCurrent"] = "America/Swift_Current";
  TimezoneRegions2["AmericaTegucigalpa"] = "America/Tegucigalpa";
  TimezoneRegions2["AmericaThule"] = "America/Thule";
  TimezoneRegions2["AmericaThunderBay"] = "America/Thunder_Bay";
  TimezoneRegions2["AmericaTijuana"] = "America/Tijuana";
  TimezoneRegions2["AmericaToronto"] = "America/Toronto";
  TimezoneRegions2["AmericaTortola"] = "America/Tortola";
  TimezoneRegions2["AmericaVancouver"] = "America/Vancouver";
  TimezoneRegions2["AmericaWhitehorse"] = "America/Whitehorse";
  TimezoneRegions2["AmericaWinnipeg"] = "America/Winnipeg";
  TimezoneRegions2["AmericaYakutat"] = "America/Yakutat";
  TimezoneRegions2["AmericaYellowknife"] = "America/Yellowknife";
  TimezoneRegions2["AntarcticaCasey"] = "Antarctica/Casey";
  TimezoneRegions2["AntarcticaDavis"] = "Antarctica/Davis";
  TimezoneRegions2["AntarcticaDumontDUrville"] = "Antarctica/DumontDUrville";
  TimezoneRegions2["AntarcticaMacquarie"] = "Antarctica/Macquarie";
  TimezoneRegions2["AntarcticaMawson"] = "Antarctica/Mawson";
  TimezoneRegions2["AntarcticaMcMurdo"] = "Antarctica/McMurdo";
  TimezoneRegions2["AntarcticaPalmer"] = "Antarctica/Palmer";
  TimezoneRegions2["AntarcticaRothera"] = "Antarctica/Rothera";
  TimezoneRegions2["AntarcticaSyowa"] = "Antarctica/Syowa";
  TimezoneRegions2["AntarcticaTroll"] = "Antarctica/Troll";
  TimezoneRegions2["AntarcticaVostok"] = "Antarctica/Vostok";
  TimezoneRegions2["ArcticLongyearbyen"] = "Arctic/Longyearbyen";
  TimezoneRegions2["AsiaAden"] = "Asia/Aden";
  TimezoneRegions2["AsiaAlmaty"] = "Asia/Almaty";
  TimezoneRegions2["AsiaAmman"] = "Asia/Amman";
  TimezoneRegions2["AsiaAnadyr"] = "Asia/Anadyr";
  TimezoneRegions2["AsiaAqtau"] = "Asia/Aqtau";
  TimezoneRegions2["AsiaAqtobe"] = "Asia/Aqtobe";
  TimezoneRegions2["AsiaAshgabat"] = "Asia/Ashgabat";
  TimezoneRegions2["AsiaBaghdad"] = "Asia/Baghdad";
  TimezoneRegions2["AsiaBahrain"] = "Asia/Bahrain";
  TimezoneRegions2["AsiaBaku"] = "Asia/Baku";
  TimezoneRegions2["AsiaBangkok"] = "Asia/Bangkok";
  TimezoneRegions2["AsiaBarnaul"] = "Asia/Barnaul";
  TimezoneRegions2["AsiaBeirut"] = "Asia/Beirut";
  TimezoneRegions2["AsiaBishkek"] = "Asia/Bishkek";
  TimezoneRegions2["AsiaBrunei"] = "Asia/Brunei";
  TimezoneRegions2["AsiaChita"] = "Asia/Chita";
  TimezoneRegions2["AsiaChoibalsan"] = "Asia/Choibalsan";
  TimezoneRegions2["AsiaColombo"] = "Asia/Colombo";
  TimezoneRegions2["AsiaDamascus"] = "Asia/Damascus";
  TimezoneRegions2["AsiaDhaka"] = "Asia/Dhaka";
  TimezoneRegions2["AsiaDili"] = "Asia/Dili";
  TimezoneRegions2["AsiaDubai"] = "Asia/Dubai";
  TimezoneRegions2["AsiaDushanbe"] = "Asia/Dushanbe";
  TimezoneRegions2["AsiaFamagusta"] = "Asia/Famagusta";
  TimezoneRegions2["AsiaGaza"] = "Asia/Gaza";
  TimezoneRegions2["AsiaHebron"] = "Asia/Hebron";
  TimezoneRegions2["AsiaHoChiMinh"] = "Asia/Ho_Chi_Minh";
  TimezoneRegions2["AsiaHongKong"] = "Asia/Hong_Kong";
  TimezoneRegions2["AsiaHovd"] = "Asia/Hovd";
  TimezoneRegions2["AsiaIrkutsk"] = "Asia/Irkutsk";
  TimezoneRegions2["AsiaJakarta"] = "Asia/Jakarta";
  TimezoneRegions2["AsiaJayapura"] = "Asia/Jayapura";
  TimezoneRegions2["AsiaJerusalem"] = "Asia/Jerusalem";
  TimezoneRegions2["AsiaKabul"] = "Asia/Kabul";
  TimezoneRegions2["AsiaKamchatka"] = "Asia/Kamchatka";
  TimezoneRegions2["AsiaKarachi"] = "Asia/Karachi";
  TimezoneRegions2["AsiaKathmandu"] = "Asia/Kathmandu";
  TimezoneRegions2["AsiaKhandyga"] = "Asia/Khandyga";
  TimezoneRegions2["AsiaKolkata"] = "Asia/Kolkata";
  TimezoneRegions2["AsiaKrasnoyarsk"] = "Asia/Krasnoyarsk";
  TimezoneRegions2["AsiaKualaLumpur"] = "Asia/Kuala_Lumpur";
  TimezoneRegions2["AsiaKuching"] = "Asia/Kuching";
  TimezoneRegions2["AsiaKuwait"] = "Asia/Kuwait";
  TimezoneRegions2["AsiaMacau"] = "Asia/Macau";
  TimezoneRegions2["AsiaMagadan"] = "Asia/Magadan";
  TimezoneRegions2["AsiaMakassar"] = "Asia/Makassar";
  TimezoneRegions2["AsiaManila"] = "Asia/Manila";
  TimezoneRegions2["AsiaMuscat"] = "Asia/Muscat";
  TimezoneRegions2["AsiaNicosia"] = "Asia/Nicosia";
  TimezoneRegions2["AsiaNovokuznetsk"] = "Asia/Novokuznetsk";
  TimezoneRegions2["AsiaNovosibirsk"] = "Asia/Novosibirsk";
  TimezoneRegions2["AsiaOmsk"] = "Asia/Omsk";
  TimezoneRegions2["AsiaOral"] = "Asia/Oral";
  TimezoneRegions2["AsiaPhnomPenh"] = "Asia/Phnom_Penh";
  TimezoneRegions2["AsiaPontianak"] = "Asia/Pontianak";
  TimezoneRegions2["AsiaPyongyang"] = "Asia/Pyongyang";
  TimezoneRegions2["AsiaQatar"] = "Asia/Qatar";
  TimezoneRegions2["AsiaQyzylorda"] = "Asia/Qyzylorda";
  TimezoneRegions2["AsiaRangoon"] = "Asia/Rangoon";
  TimezoneRegions2["AsiaRiyadh"] = "Asia/Riyadh";
  TimezoneRegions2["AsiaSakhalin"] = "Asia/Sakhalin";
  TimezoneRegions2["AsiaSamarkand"] = "Asia/Samarkand";
  TimezoneRegions2["AsiaSeoul"] = "Asia/Seoul";
  TimezoneRegions2["AsiaShanghai"] = "Asia/Shanghai";
  TimezoneRegions2["AsiaSingapore"] = "Asia/Singapore";
  TimezoneRegions2["AsiaSrednekolymsk"] = "Asia/Srednekolymsk";
  TimezoneRegions2["AsiaTaipei"] = "Asia/Taipei";
  TimezoneRegions2["AsiaTashkent"] = "Asia/Tashkent";
  TimezoneRegions2["AsiaTbilisi"] = "Asia/Tbilisi";
  TimezoneRegions2["AsiaTehran"] = "Asia/Tehran";
  TimezoneRegions2["AsiaThimphu"] = "Asia/Thimphu";
  TimezoneRegions2["AsiaTokyo"] = "Asia/Tokyo";
  TimezoneRegions2["AsiaTomsk"] = "Asia/Tomsk";
  TimezoneRegions2["AsiaUlaanbaatar"] = "Asia/Ulaanbaatar";
  TimezoneRegions2["AsiaUrumqi"] = "Asia/Urumqi";
  TimezoneRegions2["AsiaUstNera"] = "Asia/Ust-Nera";
  TimezoneRegions2["AsiaVientiane"] = "Asia/Vientiane";
  TimezoneRegions2["AsiaVladivostok"] = "Asia/Vladivostok";
  TimezoneRegions2["AsiaYakutsk"] = "Asia/Yakutsk";
  TimezoneRegions2["AsiaYekaterinburg"] = "Asia/Yekaterinburg";
  TimezoneRegions2["AsiaYerevan"] = "Asia/Yerevan";
  TimezoneRegions2["AtlanticAzores"] = "Atlantic/Azores";
  TimezoneRegions2["AtlanticBermuda"] = "Atlantic/Bermuda";
  TimezoneRegions2["AtlanticCanary"] = "Atlantic/Canary";
  TimezoneRegions2["AtlanticCapeVerde"] = "Atlantic/Cape_Verde";
  TimezoneRegions2["AtlanticFaroe"] = "Atlantic/Faroe";
  TimezoneRegions2["AtlanticMadeira"] = "Atlantic/Madeira";
  TimezoneRegions2["AtlanticReykjavik"] = "Atlantic/Reykjavik";
  TimezoneRegions2["AtlanticSouthGeorgia"] = "Atlantic/South_Georgia";
  TimezoneRegions2["AtlanticStHelena"] = "Atlantic/St_Helena";
  TimezoneRegions2["AtlanticStanley"] = "Atlantic/Stanley";
  TimezoneRegions2["AustraliaAdelaide"] = "Australia/Adelaide";
  TimezoneRegions2["AustraliaBrisbane"] = "Australia/Brisbane";
  TimezoneRegions2["AustraliaBrokenHill"] = "Australia/Broken_Hill";
  TimezoneRegions2["AustraliaCanberra"] = "Australia/Canberra";
  TimezoneRegions2["AustraliaCurrie"] = "Australia/Currie";
  TimezoneRegions2["AustraliaDarwin"] = "Australia/Darwin";
  TimezoneRegions2["AustraliaEucla"] = "Australia/Eucla";
  TimezoneRegions2["AustraliaHobart"] = "Australia/Hobart";
  TimezoneRegions2["AustraliaLindeman"] = "Australia/Lindeman";
  TimezoneRegions2["AustraliaLordHowe"] = "Australia/Lord_Howe";
  TimezoneRegions2["AustraliaMelbourne"] = "Australia/Melbourne";
  TimezoneRegions2["AustraliaPerth"] = "Australia/Perth";
  TimezoneRegions2["AustraliaSydney"] = "Australia/Sydney";
  TimezoneRegions2["EuropeAmsterdam"] = "Europe/Amsterdam";
  TimezoneRegions2["EuropeAndorra"] = "Europe/Andorra";
  TimezoneRegions2["EuropeAthens"] = "Europe/Athens";
  TimezoneRegions2["EuropeBelgrade"] = "Europe/Belgrade";
  TimezoneRegions2["EuropeBerlin"] = "Europe/Berlin";
  TimezoneRegions2["EuropeBratislava"] = "Europe/Bratislava";
  TimezoneRegions2["EuropeBrussels"] = "Europe/Brussels";
  TimezoneRegions2["EuropeBucharest"] = "Europe/Bucharest";
  TimezoneRegions2["EuropeBudapest"] = "Europe/Budapest";
  TimezoneRegions2["EuropeBusingen"] = "Europe/Busingen";
  TimezoneRegions2["EuropeChisinau"] = "Europe/Chisinau";
  TimezoneRegions2["EuropeCopenhagen"] = "Europe/Copenhagen";
  TimezoneRegions2["EuropeDublin"] = "Europe/Dublin";
  TimezoneRegions2["EuropeGibraltar"] = "Europe/Gibraltar";
  TimezoneRegions2["EuropeGuernsey"] = "Europe/Guernsey";
  TimezoneRegions2["EuropeHelsinki"] = "Europe/Helsinki";
  TimezoneRegions2["EuropeIsleOfMan"] = "Europe/Isle_of_Man";
  TimezoneRegions2["EuropeIstanbul"] = "Europe/Istanbul";
  TimezoneRegions2["EuropeJersey"] = "Europe/Jersey";
  TimezoneRegions2["EuropeKaliningrad"] = "Europe/Kaliningrad";
  TimezoneRegions2["EuropeKiev"] = "Europe/Kiev";
  TimezoneRegions2["EuropeKirov"] = "Europe/Kirov";
  TimezoneRegions2["EuropeLisbon"] = "Europe/Lisbon";
  TimezoneRegions2["EuropeLjubljana"] = "Europe/Ljubljana";
  TimezoneRegions2["EuropeLondon"] = "Europe/London";
  TimezoneRegions2["EuropeLuxembourg"] = "Europe/Luxembourg";
  TimezoneRegions2["EuropeMadrid"] = "Europe/Madrid";
  TimezoneRegions2["EuropeMalta"] = "Europe/Malta";
  TimezoneRegions2["EuropeMariehamn"] = "Europe/Mariehamn";
  TimezoneRegions2["EuropeMinsk"] = "Europe/Minsk";
  TimezoneRegions2["EuropeMonaco"] = "Europe/Monaco";
  TimezoneRegions2["EuropeMoscow"] = "Europe/Moscow";
  TimezoneRegions2["EuropeOslo"] = "Europe/Oslo";
  TimezoneRegions2["EuropeParis"] = "Europe/Paris";
  TimezoneRegions2["EuropePodgorica"] = "Europe/Podgorica";
  TimezoneRegions2["EuropePrague"] = "Europe/Prague";
  TimezoneRegions2["EuropeRiga"] = "Europe/Riga";
  TimezoneRegions2["EuropeRome"] = "Europe/Rome";
  TimezoneRegions2["EuropeSamara"] = "Europe/Samara";
  TimezoneRegions2["EuropeSanMarino"] = "Europe/San_Marino";
  TimezoneRegions2["EuropeSarajevo"] = "Europe/Sarajevo";
  TimezoneRegions2["EuropeSimferopol"] = "Europe/Simferopol";
  TimezoneRegions2["EuropeSkopje"] = "Europe/Skopje";
  TimezoneRegions2["EuropeSofia"] = "Europe/Sofia";
  TimezoneRegions2["EuropeStockholm"] = "Europe/Stockholm";
  TimezoneRegions2["EuropeTallinn"] = "Europe/Tallinn";
  TimezoneRegions2["EuropeTirane"] = "Europe/Tirane";
  TimezoneRegions2["EuropeUzhgorod"] = "Europe/Uzhgorod";
  TimezoneRegions2["EuropeVaduz"] = "Europe/Vaduz";
  TimezoneRegions2["EuropeVatican"] = "Europe/Vatican";
  TimezoneRegions2["EuropeVienna"] = "Europe/Vienna";
  TimezoneRegions2["EuropeVilnius"] = "Europe/Vilnius";
  TimezoneRegions2["EuropeVolgograd"] = "Europe/Volgograd";
  TimezoneRegions2["EuropeWarsaw"] = "Europe/Warsaw";
  TimezoneRegions2["EuropeZagreb"] = "Europe/Zagreb";
  TimezoneRegions2["EuropeZaporozhye"] = "Europe/Zaporozhye";
  TimezoneRegions2["EuropeZurich"] = "Europe/Zurich";
  TimezoneRegions2["GMT"] = "GMT";
  TimezoneRegions2["IndianAntananarivo"] = "Indian/Antananarivo";
  TimezoneRegions2["IndianChagos"] = "Indian/Chagos";
  TimezoneRegions2["IndianChristmas"] = "Indian/Christmas";
  TimezoneRegions2["IndianCocos"] = "Indian/Cocos";
  TimezoneRegions2["IndianComoro"] = "Indian/Comoro";
  TimezoneRegions2["IndianKerguelen"] = "Indian/Kerguelen";
  TimezoneRegions2["IndianMahe"] = "Indian/Mahe";
  TimezoneRegions2["IndianMaldives"] = "Indian/Maldives";
  TimezoneRegions2["IndianMauritius"] = "Indian/Mauritius";
  TimezoneRegions2["IndianMayotte"] = "Indian/Mayotte";
  TimezoneRegions2["IndianReunion"] = "Indian/Reunion";
  TimezoneRegions2["PacificApia"] = "Pacific/Apia";
  TimezoneRegions2["PacificAuckland"] = "Pacific/Auckland";
  TimezoneRegions2["PacificBougainville"] = "Pacific/Bougainville";
  TimezoneRegions2["PacificChatham"] = "Pacific/Chatham";
  TimezoneRegions2["PacificChuuk"] = "Pacific/Chuuk";
  TimezoneRegions2["PacificEaster"] = "Pacific/Easter";
  TimezoneRegions2["PacificEfate"] = "Pacific/Efate";
  TimezoneRegions2["PacificEnderbury"] = "Pacific/Enderbury";
  TimezoneRegions2["PacificFakaofo"] = "Pacific/Fakaofo";
  TimezoneRegions2["PacificFiji"] = "Pacific/Fiji";
  TimezoneRegions2["PacificFunafuti"] = "Pacific/Funafuti";
  TimezoneRegions2["PacificGalapagos"] = "Pacific/Galapagos";
  TimezoneRegions2["PacificGambier"] = "Pacific/Gambier";
  TimezoneRegions2["PacificGuadalcanal"] = "Pacific/Guadalcanal";
  TimezoneRegions2["PacificGuam"] = "Pacific/Guam";
  TimezoneRegions2["PacificHonolulu"] = "Pacific/Honolulu";
  TimezoneRegions2["PacificJohnston"] = "Pacific/Johnston";
  TimezoneRegions2["PacificKiritimati"] = "Pacific/Kiritimati";
  TimezoneRegions2["PacificKosrae"] = "Pacific/Kosrae";
  TimezoneRegions2["PacificKwajalein"] = "Pacific/Kwajalein";
  TimezoneRegions2["PacificMajuro"] = "Pacific/Majuro";
  TimezoneRegions2["PacificMarquesas"] = "Pacific/Marquesas";
  TimezoneRegions2["PacificMidway"] = "Pacific/Midway";
  TimezoneRegions2["PacificNauru"] = "Pacific/Nauru";
  TimezoneRegions2["PacificNiue"] = "Pacific/Niue";
  TimezoneRegions2["PacificNorfolk"] = "Pacific/Norfolk";
  TimezoneRegions2["PacificNoumea"] = "Pacific/Noumea";
  TimezoneRegions2["PacificPagoPago"] = "Pacific/Pago_Pago";
  TimezoneRegions2["PacificPalau"] = "Pacific/Palau";
  TimezoneRegions2["PacificPitcairn"] = "Pacific/Pitcairn";
  TimezoneRegions2["PacificPohnpei"] = "Pacific/Pohnpei";
  TimezoneRegions2["PacificPonape"] = "Pacific/Ponape";
  TimezoneRegions2["PacificPortMoresby"] = "Pacific/Port_Moresby";
  TimezoneRegions2["PacificRarotonga"] = "Pacific/Rarotonga";
  TimezoneRegions2["PacificSaipan"] = "Pacific/Saipan";
  TimezoneRegions2["PacificSamoa"] = "Pacific/Samoa";
  TimezoneRegions2["PacificTahiti"] = "Pacific/Tahiti";
  TimezoneRegions2["PacificTarawa"] = "Pacific/Tarawa";
  TimezoneRegions2["PacificTongatapu"] = "Pacific/Tongatapu";
  TimezoneRegions2["PacificTruk"] = "Pacific/Truk";
  TimezoneRegions2["PacificWake"] = "Pacific/Wake";
  TimezoneRegions2["PacificWallis"] = "Pacific/Wallis";
  TimezoneRegions2["PacificYap"] = "Pacific/Yap";
})(TimezoneRegions || (TimezoneRegions = {}));

// ../types/dist/i18n/time/timezone.js
var TimezoneOffset;
(function(TimezoneOffset2) {
  TimezoneOffset2["UTC_MINUS_12"] = "UTC-12";
  TimezoneOffset2["UTC_MINUS_11_30"] = "UTC-11:30";
  TimezoneOffset2["UTC_MINUS_11"] = "UTC-11";
  TimezoneOffset2["UTC_MINUS_10_30"] = "UTC-10:30";
  TimezoneOffset2["UTC_MINUS_10"] = "UTC-10";
  TimezoneOffset2["UTC_MINUS_9_30"] = "UTC-9:30";
  TimezoneOffset2["UTC_MINUS_9"] = "UTC-09";
  TimezoneOffset2["UTC_MINUS_8_45"] = "UTC-8:45";
  TimezoneOffset2["UTC_MINUS_8"] = "UTC-08";
  TimezoneOffset2["UTC_MINUS_7"] = "UTC-07";
  TimezoneOffset2["UTC_MINUS_6_30"] = "UTC-6:30";
  TimezoneOffset2["UTC_MINUS_6"] = "UTC-06";
  TimezoneOffset2["UTC_MINUS_5_45"] = "UTC-5:45";
  TimezoneOffset2["UTC_MINUS_5_30"] = "UTC-5:30";
  TimezoneOffset2["UTC_MINUS_5"] = "UTC-05";
  TimezoneOffset2["UTC_MINUS_4_30"] = "UTC-4:30";
  TimezoneOffset2["UTC_MINUS_4"] = "UTC-04";
  TimezoneOffset2["UTC_MINUS_3_30"] = "UTC-3:30";
  TimezoneOffset2["UTC_MINUS_3"] = "UTC-03";
  TimezoneOffset2["UTC_MINUS_2_30"] = "UTC-2:30";
  TimezoneOffset2["UTC_MINUS_2"] = "UTC-02";
  TimezoneOffset2["UTC_MINUS_1"] = "UTC-01";
  TimezoneOffset2["UTC_0"] = "UTC+00";
  TimezoneOffset2["UTC_PLUS_1"] = "UTC+01";
  TimezoneOffset2["UTC_PLUS_2"] = "UTC+02";
  TimezoneOffset2["UTC_PLUS_3"] = "UTC+03";
  TimezoneOffset2["UTC_PLUS_3_30"] = "UTC+3:30";
  TimezoneOffset2["UTC_PLUS_4"] = "UTC+04";
  TimezoneOffset2["UTC_PLUS_4_30"] = "UTC+4:30";
  TimezoneOffset2["UTC_PLUS_5"] = "UTC+05";
  TimezoneOffset2["UTC_PLUS_5_30"] = "UTC+5:30";
  TimezoneOffset2["UTC_PLUS_5_45"] = "UTC+5:45";
  TimezoneOffset2["UTC_PLUS_6"] = "UTC+06";
  TimezoneOffset2["UTC_PLUS_6_30"] = "UTC+6:30";
  TimezoneOffset2["UTC_PLUS_7"] = "UTC+07";
  TimezoneOffset2["UTC_PLUS_8"] = "UTC+08";
  TimezoneOffset2["UTC_PLUS_8_45"] = "UTC+8:45";
  TimezoneOffset2["UTC_PLUS_9"] = "UTC+09";
  TimezoneOffset2["UTC_PLUS_9_30"] = "UTC+9:30";
  TimezoneOffset2["UTC_PLUS_10"] = "UTC+10";
  TimezoneOffset2["UTC_PLUS_10_30"] = "UTC+10:30";
  TimezoneOffset2["UTC_PLUS_11"] = "UTC+11";
  TimezoneOffset2["UTC_PLUS_11_30"] = "UTC+11:30";
  TimezoneOffset2["UTC_PLUS_12"] = "UTC+12";
  TimezoneOffset2["UTC_PLUS_12_45"] = "UTC+12:45";
  TimezoneOffset2["UTC_PLUS_13"] = "UTC+13";
  TimezoneOffset2["UTC_PLUS_13_45"] = "UTC+13:45";
  TimezoneOffset2["UTC_PLUS_14"] = "UTC+14";
})(TimezoneOffset || (TimezoneOffset = {}));

// ../types/dist/i18n/time/timezones.js
var Timezones;
(function(Timezones2) {
  Timezones2["AcreTime"] = "ACT";
  Timezones2["AfghanistanTime"] = "AFT";
  Timezones2["AIXCentralEuropeanTime"] = "DFT";
  Timezones2["AlaskaDaylightTime"] = "AKDT";
  Timezones2["AlaskaStandardTime"] = "AKST";
  Timezones2["AlmaAtaTime"] = "ALMT";
  Timezones2["AmazonSummerTime"] = "AMST";
  Timezones2["AmazonTime"] = "AMT";
  Timezones2["AnadyrTime"] = "ANAT";
  Timezones2["AqtobeTime"] = "AQTT";
  Timezones2["ArabiaStandardTime"] = "AST";
  Timezones2["ArgentinaTime"] = "ART";
  Timezones2["ArmeniaTime"] = "AMT";
  Timezones2["ASEANCommonTime"] = "ASEAN";
  Timezones2["AtlanticDaylightTime"] = "ADT";
  Timezones2["AtlanticStandardTime"] = "AST";
  Timezones2["AustralianCentralDaylightSavingTime"] = "ACDT";
  Timezones2["AustralianCentralStandardTime"] = "ACST";
  Timezones2["AustralianCentralWesternStandardTime"] = "ACWST";
  Timezones2["AustralianEasternDaylightSavingTime"] = "AEDT";
  Timezones2["AustralianEasternStandardTime"] = "AEST";
  Timezones2["AustralianEasternTime"] = "AET";
  Timezones2["AustralianWesternStandardTime"] = "AWST";
  Timezones2["AzerbaijanTime"] = "AZT";
  Timezones2["AzoresStandardTime"] = "AZOT";
  Timezones2["AzoresSummerTime"] = "AZOST";
  Timezones2["BakerIslandTime"] = "BIT";
  Timezones2["BangladeshStandardTime"] = "BST";
  Timezones2["BhutanTime"] = "BTT";
  Timezones2["BoliviaTime"] = "BOT";
  Timezones2["BougainvilleStandardTime"] = "BST";
  Timezones2["BrasiliaSummerTime"] = "BRST";
  Timezones2["BrasiliaTime"] = "BRT";
  Timezones2["BritishIndianOceanTime"] = "BIOT";
  Timezones2["BritishSummerTime"] = "BST";
  Timezones2["BruneiTime"] = "BNT";
  Timezones2["CapeVerdeTime"] = "CVT";
  Timezones2["CentralAfricaTime"] = "CAT";
  Timezones2["CentralDaylightTime"] = "CDT";
  Timezones2["CentralEuropeanSummerTime"] = "CEST";
  Timezones2["CentralEuropeanTime"] = "CET";
  Timezones2["CentralIndonesiaTime"] = "WITA";
  Timezones2["CentralStandardTime"] = "CST";
  Timezones2["CentralTime"] = "CT";
  Timezones2["CentralWesternStandardTime"] = "CWST";
  Timezones2["ChamorroStandardTime"] = "CHST";
  Timezones2["ChathamDaylightTime"] = "CHADT";
  Timezones2["ChathamStandardTime"] = "CHAST";
  Timezones2["ChileStandardTime"] = "CLT";
  Timezones2["ChileSummerTime"] = "CLST";
  Timezones2["ChinaStandardTime"] = "CST";
  Timezones2["ChoibalsanStandardTime"] = "CHOT";
  Timezones2["ChoibalsanSummerTime"] = "CHOST";
  Timezones2["ChristmasIslandTime"] = "CXT";
  Timezones2["ChuukTime"] = "CHUT";
  Timezones2["ClipptertonIslandStandardTime"] = "CIST";
  Timezones2["CocosIslandsTime"] = "CCT";
  Timezones2["ColombiaSummerTime"] = "COST";
  Timezones2["ColombiaTime"] = "COT";
  Timezones2["CookIslandTime"] = "CKT";
  Timezones2["CoordinatedUniversalTime"] = "UTC";
  Timezones2["CubaDaylightTime"] = "CDT";
  Timezones2["CubaStandardTime"] = "CST";
  Timezones2["DavisTime"] = "DAVT";
  Timezones2["DumontDUrvilleTime"] = "DDUT";
  Timezones2["EastAfricaTime"] = "EAT";
  Timezones2["EasterIslandStandardTime"] = "EAST";
  Timezones2["EasterIslandSummerTime"] = "EASST";
  Timezones2["EasternCaribbeanTime"] = "ECT";
  Timezones2["EasternDaylightTime"] = "EDT";
  Timezones2["EasternEuropeanSummerTime"] = "EEST";
  Timezones2["EasternEuropeanTime"] = "EET";
  Timezones2["EasternGreenlandSummerTime"] = "EGST";
  Timezones2["EasternGreenlandTime"] = "EGT";
  Timezones2["EasternIndonesianTime"] = "WIT";
  Timezones2["EasternStandardTime"] = "EST";
  Timezones2["EasternTime"] = "ET";
  Timezones2["EcuadorTime"] = "ECT";
  Timezones2["FalklandIslandsSummerTime"] = "FKST";
  Timezones2["FalklandIslandsTime"] = "FKT";
  Timezones2["FernandoDeNoronhaTime"] = "FNT";
  Timezones2["FijiTime"] = "FJT";
  Timezones2["FrenchGuianaTime"] = "GFT";
  Timezones2["FrenchSouthernAndAntarcticTime"] = "TFT";
  Timezones2["FurtherEasternEuropeanTime"] = "FET";
  Timezones2["GalapagosTime"] = "GALT";
  Timezones2["GambierIslandTime"] = "GIT";
  Timezones2["GambierIslandsTime"] = "GAMT";
  Timezones2["GeorgiaStandardTime"] = "GET";
  Timezones2["GilbertIslandTime"] = "GILT";
  Timezones2["GreenwichMeanTime"] = "GMT";
  Timezones2["GulfStandardTime"] = "GST";
  Timezones2["GuyanaTime"] = "GYT";
  Timezones2["HawaiiAleutianDaylightTime"] = "HDT";
  Timezones2["HawaiiAleutianStandardTime"] = "HST";
  Timezones2["HeardAndMcDonaldIslandsTime"] = "HMT";
  Timezones2["HeureAvanceeDEuropeCentraleTime"] = "HAEC";
  Timezones2["HongKongTime"] = "HKT";
  Timezones2["HovdSummerTime"] = "HOVST";
  Timezones2["HovdTime"] = "HOVT";
  Timezones2["IndianOceanTime"] = "IOT";
  Timezones2["IndianStandardTime"] = "IST";
  Timezones2["IndochinaTime"] = "ICT";
  Timezones2["InternationalDayLineWestTime"] = "IDLW";
  Timezones2["IranDaylightTime"] = "IRDT";
  Timezones2["IranStandardTime"] = "IRST";
  Timezones2["IrishStandardTime"] = "IST";
  Timezones2["IrkutskSummerTime"] = "IRKST";
  Timezones2["IrkutskTime"] = "IRKT";
  Timezones2["IsraelDaylightTime"] = "IDT";
  Timezones2["IsraelStandardTime"] = "IST";
  Timezones2["JapanStandardTime"] = "JST";
  Timezones2["KaliningradTime"] = "KALT";
  Timezones2["KamchatkaTime"] = "KAMT";
  Timezones2["KoreaStandardTime"] = "KST";
  Timezones2["KosraeTime"] = "KOST";
  Timezones2["KrasnoyarskSummerTime"] = "KRAST";
  Timezones2["KrasnoyarskTime"] = "KRAT";
  Timezones2["KyrgyzstanTime"] = "KGT";
  Timezones2["LineIslandsTime"] = "LINT";
  Timezones2["KazakhstanStandardTime"] = "KAST";
  Timezones2["LordHoweStandardTime"] = "LHST";
  Timezones2["LordHoweSummerTime"] = "LHST";
  Timezones2["MacquarieIslandStationTime"] = "MIST";
  Timezones2["MagadanTime"] = "MAGT";
  Timezones2["MalaysiaStandardTime"] = "MST";
  Timezones2["MalaysiaTime"] = "MYT";
  Timezones2["MaldivesTime"] = "MVT";
  Timezones2["MarquesasIslandsTime"] = "MART";
  Timezones2["MarshallIslandsTime"] = "MHT";
  Timezones2["MauritiusTime"] = "MUT";
  Timezones2["MawsonStationTime"] = "MAWT";
  Timezones2["MiddleEuropeanSummerTime"] = "MEDT";
  Timezones2["MiddleEuropeanTime"] = "MET";
  Timezones2["MoscowTime"] = "MSK";
  Timezones2["MountainDaylightTime"] = "MDT";
  Timezones2["MountainStandardTime"] = "MST";
  Timezones2["MyanmarStandardTime"] = "MMT";
  Timezones2["NepalTime"] = "NCT";
  Timezones2["NauruTime"] = "NRT";
  Timezones2["NewCaledoniaTime"] = "NCT";
  Timezones2["NewZealandDaylightTime"] = "NZDT";
  Timezones2["NewZealandStandardTime"] = "NZST";
  Timezones2["NewfoundlandDaylightTime"] = "NDT";
  Timezones2["NewfoundlandStandardTime"] = "NST";
  Timezones2["NewfoundlandTime"] = "NT";
  Timezones2["NiueTime"] = "NUT";
  Timezones2["NorfolkIslandTime"] = "NFT";
  Timezones2["NovosibirskTime"] = "NOVT";
  Timezones2["OmskTime"] = "OMST";
  Timezones2["OralTime"] = "ORAT";
  Timezones2["PacificDaylightTime"] = "PDT";
  Timezones2["PacificStandardTime"] = "PST";
  Timezones2["PakistanStandardTime"] = "PKT";
  Timezones2["PalauTime"] = "PWT";
  Timezones2["PapuaNewGuineaTime"] = "PGT";
  Timezones2["ParaguaySummerTime"] = "PYST";
  Timezones2["ParaguayTime"] = "PYT";
  Timezones2["PeruTime"] = "PET";
  Timezones2["PhilippineStandardTime"] = "PHST";
  Timezones2["PhilippineTime"] = "PHT";
  Timezones2["PhoenixIslandTime"] = "PHOT";
  Timezones2["PitcairnTime"] = "PST";
  Timezones2["PohnpeiStandardTime"] = "PONT";
  Timezones2["ReunionTime"] = "RET";
  Timezones2["RotheraResearchStationTime"] = "ROTT";
  Timezones2["SaintPierreAndMiquelonDaylightTime"] = "PMDT";
  Timezones2["SaintPierreAndMiquelonStandardTime"] = "PMST";
  Timezones2["SakhalinIslandTime"] = "SAKT";
  Timezones2["SamaraTime"] = "SAMT";
  Timezones2["SamoaDaylightTime"] = "SDT";
  Timezones2["SamoaStandardTime"] = "SST";
  Timezones2["SeychellesTime"] = "SCT";
  Timezones2["ShowaStationTime"] = "SYOT";
  Timezones2["SingaporeStandardTime"] = "SST";
  Timezones2["SingaporeTime"] = "SGT";
  Timezones2["SolomonIslandsTime"] = "SBT";
  Timezones2["SouthAfricanStandardTime"] = "SAST";
  Timezones2["SouthGeorgiaAndTheSouthSandwichIslandsTime"] = "GST";
  Timezones2["SrednekolymskTime"] = "SRET";
  Timezones2["SriLankaStandardTime"] = "SLST";
  Timezones2["SurinameTime"] = "SRT";
  Timezones2["TahitiTime"] = "TAHT";
  Timezones2["TajikistanTime"] = "TJT";
  Timezones2["ThailandStandardTime"] = "THA";
  Timezones2["TimorLesteTime"] = "TLT";
  Timezones2["TokelauTime"] = "TKT";
  Timezones2["TongaTime"] = "TOT";
  Timezones2["TurkeyTime"] = "TRT";
  Timezones2["TurkmenistanTime"] = "TMT";
  Timezones2["TuvaluTime"] = "TVT";
  Timezones2["UlaanbaatarStandardTime"] = "ULAT";
  Timezones2["UlaanbaatarSummerTime"] = "ULAST";
  Timezones2["UruguayStandardTime"] = "UYT";
  Timezones2["UruguaySummerTime"] = "UYST";
  Timezones2["UzbekistanTime"] = "UZT";
  Timezones2["VanuatuTime"] = "VUT";
  Timezones2["VenezuelaStandardTime"] = "VET";
  Timezones2["VladivostokTime"] = "VLAT";
  Timezones2["VolgogradTime"] = "VOLT";
  Timezones2["VostokStationTime"] = "VOST";
  Timezones2["WakeIslandTime"] = "WAKT";
  Timezones2["WestAfricaSummerTime"] = "WAST";
  Timezones2["WestAfricaTime"] = "WAT";
  Timezones2["WestGreenlandSummerTime"] = "WGST";
  Timezones2["WestGreenlandTime"] = "WGT";
  Timezones2["WestKazakhstanTime"] = "WKT";
  Timezones2["WesternEuropeanSummerTime"] = "WEDT";
  Timezones2["WesternEuropeanTime"] = "WET";
  Timezones2["WesternIndonesianTime"] = "WIT";
  Timezones2["WesternStandardTime"] = "WST";
  Timezones2["YakutskTime"] = "YAKT";
  Timezones2["YekaterinburgTime"] = "YEKT";
})(Timezones || (Timezones = {}));
var AcreTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.AcreTime,
  name: "Acre Time",
  offset: TimezoneOffset.UTC_MINUS_5
};
var AfghanistanTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.AfghanistanTime,
  name: "Afghanistan Time",
  offset: TimezoneOffset.UTC_PLUS_4_30
};
var AIXCentralEuropeanTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.AIXCentralEuropeanTime,
  name: "AIX Central European Time",
  offset: TimezoneOffset.UTC_PLUS_1
};
var AlaskaDaylightTime = {
  dst: {
    is: true,
    uses: true
  },
  id: Timezones.AlaskaDaylightTime,
  name: "Alaska Daylight Time",
  offset: TimezoneOffset.UTC_MINUS_8
};
var AlaskaStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.AlaskaStandardTime,
  name: "Alaska Standard Time",
  offset: TimezoneOffset.UTC_MINUS_9
};
var AlmaAtaTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.AlmaAtaTime,
  name: "Alma-Ata Time",
  offset: TimezoneOffset.UTC_PLUS_6
};
var AmazonSummerTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.AmazonSummerTime,
  name: "Amazon Summer Time",
  offset: TimezoneOffset.UTC_MINUS_3
};
var AmazonTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.AmazonTime,
  name: "Amazon Time",
  offset: TimezoneOffset.UTC_MINUS_4
};
var AnadyrTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.AnadyrTime,
  name: "Anadyr Time",
  offset: TimezoneOffset.UTC_PLUS_12
};
var AqtobeTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.AqtobeTime,
  name: "Aqtobe Time",
  offset: TimezoneOffset.UTC_PLUS_5
};
var ArabiaStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.ArabiaStandardTime,
  name: "Arabia Standard Time",
  offset: TimezoneOffset.UTC_PLUS_3
};
var ArgentinaTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.ArgentinaTime,
  name: "Argentina Time",
  offset: TimezoneOffset.UTC_MINUS_3
};
var ArmeniaTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.ArmeniaTime,
  name: "Armenia Time",
  offset: TimezoneOffset.UTC_PLUS_4
};
var AtlanticDaylightTime = {
  dst: {
    is: true,
    uses: true
  },
  id: Timezones.AtlanticDaylightTime,
  name: "Atlantic Daylight Time",
  offset: TimezoneOffset.UTC_MINUS_3
};
var AtlanticStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.AtlanticStandardTime,
  name: "Atlantic Standard Time",
  offset: TimezoneOffset.UTC_MINUS_4
};
var AustralianCentralDaylightSavingTime = {
  dst: {
    is: true,
    uses: true
  },
  id: Timezones.AustralianCentralDaylightSavingTime,
  name: "Australian Central Daylight Saving Time",
  offset: TimezoneOffset.UTC_PLUS_10_30
};
var AustralianCentralStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.AustralianCentralStandardTime,
  name: "Australian Central Standard Time",
  offset: TimezoneOffset.UTC_PLUS_9_30
};
var AustralianCentralWesternStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.AustralianCentralWesternStandardTime,
  name: "Australian Central Western Standard Time",
  offset: TimezoneOffset.UTC_PLUS_8_45
};
var AustralianEasternDaylightSavingTime = {
  dst: {
    is: true,
    uses: true
  },
  id: Timezones.AustralianEasternDaylightSavingTime,
  name: "Australian Eastern Daylight Saving Time",
  offset: TimezoneOffset.UTC_PLUS_11
};
var AustralianEasternStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.AustralianEasternStandardTime,
  name: "Australian Eastern Standard Time",
  offset: TimezoneOffset.UTC_PLUS_10
};
var AustralianEasternTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.AustralianEasternTime,
  name: "Australian Eastern Time",
  offset: TimezoneOffset.UTC_PLUS_10
};
var AustralianWesternStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.AustralianWesternStandardTime,
  name: "Australian Western Standard Time",
  offset: TimezoneOffset.UTC_PLUS_8
};
var AzerbaijanTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.AzerbaijanTime,
  name: "Azerbaijan Time",
  offset: TimezoneOffset.UTC_PLUS_4
};
var AzoresStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.AzoresStandardTime,
  name: "Azores Standard Time",
  offset: TimezoneOffset.UTC_MINUS_1
};
var AzoresSummerTime = {
  dst: {
    is: true,
    uses: true
  },
  id: Timezones.AzoresSummerTime,
  name: "Azores Summer Time",
  offset: TimezoneOffset.UTC_0
};
var BakerIslandTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.BakerIslandTime,
  name: "Baker Island Time",
  offset: TimezoneOffset.UTC_MINUS_12
};
var BangladeshStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.BangladeshStandardTime,
  name: "Bangladesh Standard Time",
  offset: TimezoneOffset.UTC_PLUS_6
};
var BhutanTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.BhutanTime,
  name: "Bhutan Time",
  offset: TimezoneOffset.UTC_PLUS_6
};
var BoliviaTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.BoliviaTime,
  name: "Bolivia Time",
  offset: TimezoneOffset.UTC_MINUS_4
};
var BougainvilleStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.BougainvilleStandardTime,
  name: "Bougainville Standard Time",
  offset: TimezoneOffset.UTC_PLUS_11
};
var BrasiliaSummerTime = {
  dst: {
    is: true,
    uses: true
  },
  id: Timezones.BrasiliaSummerTime,
  name: "Brasilia Summer Time",
  offset: TimezoneOffset.UTC_MINUS_2
};
var BrasiliaTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.BrasiliaTime,
  name: "Brasilia Time",
  offset: TimezoneOffset.UTC_MINUS_3
};
var BritishIndianOceanTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.BritishIndianOceanTime,
  name: "British Indian Ocean Time",
  offset: TimezoneOffset.UTC_PLUS_6
};
var BritishSummerTime = {
  dst: {
    is: true,
    uses: true
  },
  id: Timezones.BritishSummerTime,
  name: "British Summer Time",
  offset: TimezoneOffset.UTC_PLUS_1
};
var BruneiTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.BruneiTime,
  name: "Brunei Time",
  offset: TimezoneOffset.UTC_PLUS_8
};
var CapeVerdeTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.CapeVerdeTime,
  name: "Cape Verde Time",
  offset: TimezoneOffset.UTC_MINUS_1
};
var CentralAfricaTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.CentralAfricaTime,
  name: "Central Africa Time",
  offset: TimezoneOffset.UTC_PLUS_2
};
var CentralDaylightTime = {
  dst: {
    is: true,
    uses: true
  },
  id: Timezones.CentralDaylightTime,
  name: "Central Daylight Time",
  offset: TimezoneOffset.UTC_MINUS_5
};
var CentralEuropeanSummerTime = {
  dst: {
    is: true,
    uses: true
  },
  id: Timezones.CentralEuropeanSummerTime,
  name: "Central European Summer Time",
  offset: TimezoneOffset.UTC_PLUS_2
};
var CentralEuropeanTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.CentralEuropeanTime,
  name: "Central European Time",
  offset: TimezoneOffset.UTC_PLUS_1
};
var CentralIndonesiaTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.CentralIndonesiaTime,
  name: "Central Indonesia Time",
  offset: TimezoneOffset.UTC_PLUS_8
};
var CentralStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.CentralStandardTime,
  name: "Central Standard Time",
  offset: TimezoneOffset.UTC_MINUS_6
};
var CentralTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.CentralTime,
  name: "Central Time",
  offset: TimezoneOffset.UTC_MINUS_5
};
var CentralWesternStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.CentralWesternStandardTime,
  name: "Central Western Standard Time",
  offset: TimezoneOffset.UTC_PLUS_8_45
};
var ChamorroStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.ChamorroStandardTime,
  name: "Chamorro Standard Time",
  offset: TimezoneOffset.UTC_PLUS_10
};
var ChathamDaylightTime = {
  dst: {
    is: true,
    uses: true
  },
  id: Timezones.ChathamDaylightTime,
  name: "Chatham Daylight Time",
  offset: TimezoneOffset.UTC_PLUS_13_45
};
var ChathamStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.ChathamStandardTime,
  name: "Chatham Standard Time",
  offset: TimezoneOffset.UTC_PLUS_12_45
};
var ChileStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.ChileStandardTime,
  name: "Chile Standard Time",
  offset: TimezoneOffset.UTC_MINUS_4
};
var ChileSummerTime = {
  dst: {
    is: true,
    uses: true
  },
  id: Timezones.ChileSummerTime,
  name: "Chile Summer Time",
  offset: TimezoneOffset.UTC_MINUS_3
};
var ChinaStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.ChinaStandardTime,
  name: "China Standard Time",
  offset: TimezoneOffset.UTC_PLUS_8
};
var ChoibalsanStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.ChoibalsanStandardTime,
  name: "Choibalsan Standard Time",
  offset: TimezoneOffset.UTC_PLUS_8
};
var ChoibalsanSummerTime = {
  dst: {
    is: true,
    uses: true
  },
  id: Timezones.ChoibalsanSummerTime,
  name: "Choibalsan Summer Time",
  offset: TimezoneOffset.UTC_PLUS_9
};
var ChristmasIslandTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.ChristmasIslandTime,
  name: "Christmas Island Time",
  offset: TimezoneOffset.UTC_PLUS_7
};
var ChuukTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.ChuukTime,
  name: "Chuuk Time",
  offset: TimezoneOffset.UTC_PLUS_10
};
var ClipptertonIslandStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.ClipptertonIslandStandardTime,
  name: "Clippterton Island Standard Time",
  offset: TimezoneOffset.UTC_MINUS_8
};
var CocosIslandsTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.CocosIslandsTime,
  name: "Cocos Standard Time",
  offset: TimezoneOffset.UTC_PLUS_6_30
};
var ColombiaSummerTime = {
  dst: {
    is: true,
    uses: true
  },
  id: Timezones.ColombiaSummerTime,
  name: "Colombia Summer Time",
  offset: TimezoneOffset.UTC_MINUS_4
};
var ColombiaTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.ColombiaTime,
  name: "Colombia Time",
  offset: TimezoneOffset.UTC_MINUS_5
};
var CookIslandTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.CookIslandTime,
  name: "Cook Island Time",
  offset: TimezoneOffset.UTC_MINUS_10
};
var CoordinatedUniversalTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.CoordinatedUniversalTime,
  name: "Coordinated Universal Time",
  offset: TimezoneOffset.UTC_0
};
var CubaDaylightTime = {
  dst: {
    is: true,
    uses: true
  },
  id: Timezones.CubaDaylightTime,
  name: "Cuba Daylight Time",
  offset: TimezoneOffset.UTC_MINUS_4
};
var CubaStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.CubaStandardTime,
  name: "Cuba Standard Time",
  offset: TimezoneOffset.UTC_MINUS_5
};
var DavisTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.DavisTime,
  name: "Davis Time",
  offset: TimezoneOffset.UTC_PLUS_7
};
var DumontDUrvilleTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.DumontDUrvilleTime,
  name: "Dumont D'Urville Time",
  offset: TimezoneOffset.UTC_PLUS_10
};
var EastAfricaTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.EastAfricaTime,
  name: "East Africa Time",
  offset: TimezoneOffset.UTC_PLUS_3
};
var EasterIslandStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.EasterIslandStandardTime,
  name: "Easter Island Standard Time",
  offset: TimezoneOffset.UTC_MINUS_6
};
var EasterIslandSummerTime = {
  dst: {
    is: true,
    uses: true
  },
  id: Timezones.EasterIslandSummerTime,
  name: "Easter Island Summer Time",
  offset: TimezoneOffset.UTC_MINUS_5
};
var EasternCaribbeanTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.EasternCaribbeanTime,
  name: "Eastern Caribbean Time",
  offset: TimezoneOffset.UTC_MINUS_4
};
var EasternDaylightTime = {
  dst: {
    is: true,
    uses: true
  },
  id: Timezones.EasternDaylightTime,
  name: "Eastern Daylight Time",
  offset: TimezoneOffset.UTC_MINUS_4
};
var EasternEuropeanSummerTime = {
  dst: {
    is: true,
    uses: true
  },
  id: Timezones.EasternEuropeanSummerTime,
  name: "Eastern European Summer Time",
  offset: TimezoneOffset.UTC_PLUS_3
};
var EasternEuropeanTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.EasternEuropeanTime,
  name: "Eastern European Time",
  offset: TimezoneOffset.UTC_PLUS_2
};
var EasternGreenlandSummerTime = {
  dst: {
    is: true,
    uses: true
  },
  id: Timezones.EasternGreenlandSummerTime,
  name: "Eastern Greenland Summer Time",
  offset: TimezoneOffset.UTC_0
};
var EasternGreenlandTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.EasternGreenlandTime,
  name: "Eastern Greenland Time",
  offset: TimezoneOffset.UTC_MINUS_1
};
var EasternIndonesianTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.EasternIndonesianTime,
  name: "Eastern Indonesian Time",
  offset: TimezoneOffset.UTC_PLUS_9
};
var EasternStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.EasternStandardTime,
  name: "Eastern Standard Time",
  offset: TimezoneOffset.UTC_MINUS_5
};
var EasternTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.EasternTime,
  name: "Eastern Time",
  offset: TimezoneOffset.UTC_MINUS_5
};
var EcuadorTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.EcuadorTime,
  name: "Ecuador Time",
  offset: TimezoneOffset.UTC_MINUS_5
};
var FalklandIslandsSummerTime = {
  dst: {
    is: true,
    uses: true
  },
  id: Timezones.FalklandIslandsSummerTime,
  name: "Falkland Islands Summer Time",
  offset: TimezoneOffset.UTC_MINUS_3
};
var FalklandIslandsTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.FalklandIslandsTime,
  name: "Falkland Islands Time",
  offset: TimezoneOffset.UTC_MINUS_4
};
var FernandoDeNoronhaTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.FernandoDeNoronhaTime,
  name: "Fernando de Noronha Time",
  offset: TimezoneOffset.UTC_MINUS_2
};
var FijiTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.FijiTime,
  name: "Fiji Time",
  offset: TimezoneOffset.UTC_PLUS_12
};
var FrenchGuianaTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.FrenchGuianaTime,
  name: "French Guiana Time",
  offset: TimezoneOffset.UTC_MINUS_3
};
var FrenchSouthernAndAntarcticTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.FrenchSouthernAndAntarcticTime,
  name: "French Southern and Antarctic Time",
  offset: TimezoneOffset.UTC_PLUS_5
};
var FurtherEasternEuropeanTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.FurtherEasternEuropeanTime,
  name: "Further Eastern European Time",
  offset: TimezoneOffset.UTC_PLUS_3
};
var GalapagosTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.GalapagosTime,
  name: "Galapagos Time",
  offset: TimezoneOffset.UTC_MINUS_6
};
var GambierIslandTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.GambierIslandTime,
  name: "Gambier Island Time",
  offset: TimezoneOffset.UTC_MINUS_9
};
var GambierIslandsTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.GambierIslandsTime,
  name: "Gambier Islands Time",
  offset: TimezoneOffset.UTC_MINUS_9
};
var GeorgiaStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.GeorgiaStandardTime,
  name: "Georgia Standard Time",
  offset: TimezoneOffset.UTC_PLUS_4
};
var GilbertIslandTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.GilbertIslandTime,
  name: "Gilbert Island Time",
  offset: TimezoneOffset.UTC_PLUS_12
};
var GreenwichMeanTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.GreenwichMeanTime,
  name: "Greenwich Mean Time",
  offset: TimezoneOffset.UTC_0
};
var GulfStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.GulfStandardTime,
  name: "Gulf Standard Time",
  offset: TimezoneOffset.UTC_PLUS_4
};
var GuyanaTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.GuyanaTime,
  name: "Guyana Time",
  offset: TimezoneOffset.UTC_MINUS_4
};
var HawaiiAleutianDaylightTime = {
  dst: {
    is: true,
    uses: true
  },
  id: Timezones.HawaiiAleutianDaylightTime,
  name: "Hawaii-Aleutian Daylight Time",
  offset: TimezoneOffset.UTC_MINUS_9
};
var HawaiiAleutianStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.HawaiiAleutianStandardTime,
  name: "Hawaii-Aleutian Standard Time",
  offset: TimezoneOffset.UTC_MINUS_10
};
var HeardAndMcDonaldIslandsTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.HeardAndMcDonaldIslandsTime,
  name: "Heard and McDonald Islands Time",
  offset: TimezoneOffset.UTC_PLUS_5
};
var HongKongTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.HongKongTime,
  name: "Hong Kong Time",
  offset: TimezoneOffset.UTC_PLUS_8
};
var HovdSummerTime = {
  dst: {
    is: true,
    uses: true
  },
  id: Timezones.HovdSummerTime,
  name: "Hovd Summer Time",
  offset: TimezoneOffset.UTC_PLUS_8
};
var HovdTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.HovdTime,
  name: "Hovd Time",
  offset: TimezoneOffset.UTC_PLUS_7
};
var IndianOceanTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.IndianOceanTime,
  name: "Indian Ocean Time",
  offset: TimezoneOffset.UTC_PLUS_3
};
var IndianStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.IndianStandardTime,
  name: "Indian Standard Time",
  offset: TimezoneOffset.UTC_PLUS_5_30
};
var IndochinaTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.IndochinaTime,
  name: "Indochina Time",
  offset: TimezoneOffset.UTC_PLUS_7
};
var InternationalDayLineWestTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.InternationalDayLineWestTime,
  name: "International Day Line West Time",
  offset: TimezoneOffset.UTC_MINUS_12
};
var IranDaylightTime = {
  dst: {
    is: true,
    uses: true
  },
  id: Timezones.IranDaylightTime,
  name: "Iran Daylight Time",
  offset: TimezoneOffset.UTC_PLUS_4_30
};
var IranStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.IranStandardTime,
  name: "Iran Standard Time",
  offset: TimezoneOffset.UTC_PLUS_3_30
};
var IrishStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.IrishStandardTime,
  name: "Irish Standard Time",
  offset: TimezoneOffset.UTC_PLUS_1
};
var IrkutskTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.IrkutskTime,
  name: "Irkutsk Time",
  offset: TimezoneOffset.UTC_PLUS_8
};
var IsraelDaylightTime = {
  dst: {
    is: true,
    uses: true
  },
  id: Timezones.IsraelDaylightTime,
  name: "Israel Daylight Time",
  offset: TimezoneOffset.UTC_PLUS_3
};
var IsraelStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.IsraelStandardTime,
  name: "Israel Standard Time",
  offset: TimezoneOffset.UTC_PLUS_2
};
var JapanStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.JapanStandardTime,
  name: "Japan Standard Time",
  offset: TimezoneOffset.UTC_PLUS_9
};
var KaliningradTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.KaliningradTime,
  name: "Kaliningrad Time",
  offset: TimezoneOffset.UTC_PLUS_2
};
var KamchatkaTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.KamchatkaTime,
  name: "Kamchatka Time",
  offset: TimezoneOffset.UTC_PLUS_12
};
var KoreaStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.KoreaStandardTime,
  name: "Korea Standard Time",
  offset: TimezoneOffset.UTC_PLUS_9
};
var KosraeTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.KosraeTime,
  name: "Kosrae Time",
  offset: TimezoneOffset.UTC_PLUS_11
};
var KrasnoyarskTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.KrasnoyarskTime,
  name: "Krasnoyarsk Time",
  offset: TimezoneOffset.UTC_PLUS_7
};
var KyrgyzstanTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.KyrgyzstanTime,
  name: "Kyrgyzstan Time",
  offset: TimezoneOffset.UTC_PLUS_6
};
var LineIslandsTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.LineIslandsTime,
  name: "Line Islands Time",
  offset: TimezoneOffset.UTC_PLUS_14
};
var LordHoweStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.LordHoweStandardTime,
  name: "Lord Howe Standard Time",
  offset: TimezoneOffset.UTC_PLUS_10_30
};
var LordHoweSummerTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.LordHoweSummerTime,
  name: "Lord Howe Summer Time",
  offset: TimezoneOffset.UTC_PLUS_11
};
var MacquarieIslandStationTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.MacquarieIslandStationTime,
  name: "Macquarie Island Station Time",
  offset: TimezoneOffset.UTC_PLUS_11
};
var MagadanTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.MagadanTime,
  name: "Magadan Time",
  offset: TimezoneOffset.UTC_PLUS_12
};
var MalaysiaStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.MalaysiaStandardTime,
  name: "Malaysia Standard Time",
  offset: TimezoneOffset.UTC_PLUS_8
};
var MalaysiaTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.MalaysiaTime,
  name: "Malaysia Time",
  offset: TimezoneOffset.UTC_PLUS_8
};
var MaldivesTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.MaldivesTime,
  name: "Maldives Time",
  offset: TimezoneOffset.UTC_PLUS_5
};
var MarquesasIslandsTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.MarquesasIslandsTime,
  name: "Marquesas Islands Time",
  offset: TimezoneOffset.UTC_PLUS_9_30
};
var MarshallIslandsTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.MarshallIslandsTime,
  name: "Marshall Islands Time",
  offset: TimezoneOffset.UTC_PLUS_12
};
var MauritiusTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.MauritiusTime,
  name: "Mauritius Time",
  offset: TimezoneOffset.UTC_PLUS_4
};
var MawsonStationTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.MawsonStationTime,
  name: "Mawson Station Time",
  offset: TimezoneOffset.UTC_PLUS_5
};
var MiddleEuropeanSummerTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.MiddleEuropeanSummerTime,
  name: "Middle European Summer Time",
  offset: TimezoneOffset.UTC_PLUS_2
};
var MiddleEuropeanTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.MiddleEuropeanTime,
  name: "Middle European Time",
  offset: TimezoneOffset.UTC_PLUS_1
};
var MoscowTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.MoscowTime,
  name: "Moscow Time",
  offset: TimezoneOffset.UTC_PLUS_3
};
var MountainDaylightTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.MountainDaylightTime,
  name: "Mountain Daylight Time",
  offset: TimezoneOffset.UTC_MINUS_6
};
var MountainStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.MountainStandardTime,
  name: "Mountain Standard Time",
  offset: TimezoneOffset.UTC_MINUS_7
};
var MyanmarStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.MyanmarStandardTime,
  name: "Myanmar Standard Time",
  offset: TimezoneOffset.UTC_PLUS_6_30
};
var NepalTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.NepalTime,
  name: "Nepal Time",
  offset: TimezoneOffset.UTC_PLUS_5_45
};
var NauruTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.NauruTime,
  name: "Nauru Time",
  offset: TimezoneOffset.UTC_PLUS_12
};
var NewCaledoniaTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.NewCaledoniaTime,
  name: "New Caledonia Time",
  offset: TimezoneOffset.UTC_PLUS_11
};
var NewZealandDaylightTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.NewZealandDaylightTime,
  name: "New Zealand Daylight Time",
  offset: TimezoneOffset.UTC_PLUS_13
};
var NewZealandStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.NewZealandStandardTime,
  name: "New Zealand Standard Time",
  offset: TimezoneOffset.UTC_PLUS_12
};
var NewfoundlandDaylightTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.NewfoundlandDaylightTime,
  name: "Newfoundland Daylight Time",
  offset: TimezoneOffset.UTC_MINUS_2_30
};
var NewfoundlandTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.NewfoundlandTime,
  name: "Newfoundland Time",
  offset: TimezoneOffset.UTC_MINUS_3_30
};
var NiueTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.NiueTime,
  name: "Niue Time",
  offset: TimezoneOffset.UTC_MINUS_11
};
var NorfolkIslandTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.NorfolkIslandTime,
  name: "Norfolk Island Time",
  offset: TimezoneOffset.UTC_PLUS_11
};
var NovosibirskTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.NovosibirskTime,
  name: "Novosibirsk Time",
  offset: TimezoneOffset.UTC_PLUS_7
};
var OmskTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.OmskTime,
  name: "Omsk Time",
  offset: TimezoneOffset.UTC_PLUS_6
};
var OralTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.OralTime,
  name: "Oral Time",
  offset: TimezoneOffset.UTC_PLUS_5
};
var PacificDaylightTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.PacificDaylightTime,
  name: "Pacific Daylight Time",
  offset: TimezoneOffset.UTC_MINUS_7
};
var PacificStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.PacificStandardTime,
  name: "Pacific Standard Time",
  offset: TimezoneOffset.UTC_MINUS_8
};
var PakistanStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.PakistanStandardTime,
  name: "Pakistan Standard Time",
  offset: TimezoneOffset.UTC_PLUS_5
};
var PalauTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.PalauTime,
  name: "Palau Time",
  offset: TimezoneOffset.UTC_PLUS_9
};
var PapuaNewGuineaTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.PapuaNewGuineaTime,
  name: "Papua New Guinea Time",
  offset: TimezoneOffset.UTC_PLUS_10
};
var ParaguaySummerTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.ParaguaySummerTime,
  name: "Paraguay Summer Time",
  offset: TimezoneOffset.UTC_MINUS_3
};
var ParaguayTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.ParaguayTime,
  name: "Paraguay Time",
  offset: TimezoneOffset.UTC_MINUS_4
};
var PeruTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.PeruTime,
  name: "Peru Time",
  offset: TimezoneOffset.UTC_MINUS_5
};
var PhilippineStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.PhilippineStandardTime,
  name: "Philippine Standard Time",
  offset: TimezoneOffset.UTC_PLUS_8
};
var PhillipineTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.PhilippineTime,
  name: "Philippine Time",
  offset: TimezoneOffset.UTC_PLUS_8
};
var PhoenixIslandTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.PhoenixIslandTime,
  name: "Phoenix Island Time",
  offset: TimezoneOffset.UTC_PLUS_13
};
var PitcairnTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.PitcairnTime,
  name: "Pitcairn Time",
  offset: TimezoneOffset.UTC_MINUS_8
};
var PohnpeiStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.PohnpeiStandardTime,
  name: "Pohnpei Standard Time",
  offset: TimezoneOffset.UTC_PLUS_11
};
var ReunionTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.ReunionTime,
  name: "Reunion Time",
  offset: TimezoneOffset.UTC_PLUS_4
};
var RotheraResearchStationTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.RotheraResearchStationTime,
  name: "Rothera Research Station Time",
  offset: TimezoneOffset.UTC_MINUS_3
};
var SaintPierreAndMiquelonDaylightTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.SaintPierreAndMiquelonDaylightTime,
  name: "Saint Pierre and Miquelon Daylight Time",
  offset: TimezoneOffset.UTC_MINUS_2
};
var SaintPierreAndMiquelonStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.SaintPierreAndMiquelonStandardTime,
  name: "Saint Pierre and Miquelon Standard Time",
  offset: TimezoneOffset.UTC_MINUS_3
};
var SakhalinIslandTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.SakhalinIslandTime,
  name: "Sakhalin Island Time",
  offset: TimezoneOffset.UTC_PLUS_11
};
var SamaraTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.SamaraTime,
  name: "Samara Time",
  offset: TimezoneOffset.UTC_PLUS_4
};
var SamoaDaylightTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.SamoaDaylightTime,
  name: "Samoa Daylight Time",
  offset: TimezoneOffset.UTC_MINUS_10
};
var SamoaStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.SamoaStandardTime,
  name: "Samoa Standard Time",
  offset: TimezoneOffset.UTC_MINUS_11
};
var SeychellesTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.SeychellesTime,
  name: "Seychelles Time",
  offset: TimezoneOffset.UTC_PLUS_4
};
var ShowaStationTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.ShowaStationTime,
  name: "Showa Station Time",
  offset: TimezoneOffset.UTC_PLUS_3
};
var SingaporeStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.SingaporeStandardTime,
  name: "Singapore Standard Time",
  offset: TimezoneOffset.UTC_PLUS_8
};
var SingaporeTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.SingaporeTime,
  name: "Singapore Time",
  offset: TimezoneOffset.UTC_PLUS_8
};
var SolomonIslandsTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.SolomonIslandsTime,
  name: "Solomon Islands Time",
  offset: TimezoneOffset.UTC_PLUS_11
};
var SouthAfricanStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.SouthAfricanStandardTime,
  name: "South African Standard Time",
  offset: TimezoneOffset.UTC_PLUS_2
};
var SouthGeorgiaAndTheSouthSandwichIslandsTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.SouthGeorgiaAndTheSouthSandwichIslandsTime,
  name: "South Georgia and the South Sandwich Islands Time",
  offset: TimezoneOffset.UTC_MINUS_2
};
var SrednekolymskTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.SrednekolymskTime,
  name: "Srednekolymsk Time",
  offset: TimezoneOffset.UTC_PLUS_11
};
var SriLankaStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.SriLankaStandardTime,
  name: "Sri Lanka Standard Time",
  offset: TimezoneOffset.UTC_PLUS_5_30
};
var SurinameTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.SurinameTime,
  name: "Suriname Time",
  offset: TimezoneOffset.UTC_MINUS_3
};
var TahitiTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.TahitiTime,
  name: "Tahiti Time",
  offset: TimezoneOffset.UTC_MINUS_10
};
var TajikistanTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.TajikistanTime,
  name: "Tajikistan Time",
  offset: TimezoneOffset.UTC_PLUS_5
};
var ThailandStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.ThailandStandardTime,
  name: "Thailand Standard Time",
  offset: TimezoneOffset.UTC_PLUS_7
};
var TimorLesteTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.TimorLesteTime,
  name: "Timor-Leste Time",
  offset: TimezoneOffset.UTC_PLUS_9
};
var TokelauTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.TokelauTime,
  name: "Tokelau Time",
  offset: TimezoneOffset.UTC_PLUS_13
};
var TongaTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.TongaTime,
  name: "Tonga Time",
  offset: TimezoneOffset.UTC_PLUS_13
};
var TurkeyTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.TurkeyTime,
  name: "Turkey Time",
  offset: TimezoneOffset.UTC_PLUS_3
};
var TurkmenistanTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.TurkmenistanTime,
  name: "Turkmenistan Time",
  offset: TimezoneOffset.UTC_PLUS_5
};
var TuvaluTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.TuvaluTime,
  name: "Tuvalu Time",
  offset: TimezoneOffset.UTC_PLUS_12
};
var UlaanbaatarStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.UlaanbaatarStandardTime,
  name: "Ulaanbaatar Standard Time",
  offset: TimezoneOffset.UTC_PLUS_8
};
var UlaanbaatarSummerTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.UlaanbaatarSummerTime,
  name: "Ulaanbaatar Summer Time",
  offset: TimezoneOffset.UTC_PLUS_9
};
var UruguayStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.UruguayStandardTime,
  name: "Uruguay Standard Time",
  offset: TimezoneOffset.UTC_MINUS_3
};
var UruguaySummerTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.UruguaySummerTime,
  name: "Uruguay Summer Time",
  offset: TimezoneOffset.UTC_MINUS_2
};
var UzbekistanTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.UzbekistanTime,
  name: "Uzbekistan Time",
  offset: TimezoneOffset.UTC_PLUS_5
};
var VanuatuTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.VanuatuTime,
  name: "Vanuatu Time",
  offset: TimezoneOffset.UTC_PLUS_11
};
var VenezuelaStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.VenezuelaStandardTime,
  name: "Venezuela Standard Time",
  offset: TimezoneOffset.UTC_MINUS_4
};
var VladivostokTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.VladivostokTime,
  name: "Vladivostok Time",
  offset: TimezoneOffset.UTC_PLUS_10
};
var VolgogradTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.VolgogradTime,
  name: "Volgograd Time",
  offset: TimezoneOffset.UTC_PLUS_4
};
var VostokStationTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.VostokStationTime,
  name: "Vostok Station Time",
  offset: TimezoneOffset.UTC_PLUS_6
};
var WakeIslandTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.WakeIslandTime,
  name: "Wake Island Time",
  offset: TimezoneOffset.UTC_PLUS_12
};
var WestAfricaSummerTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.WestAfricaSummerTime,
  name: "West Africa Summer Time",
  offset: TimezoneOffset.UTC_PLUS_2
};
var WestAfricaTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.WestAfricaTime,
  name: "West Africa Time",
  offset: TimezoneOffset.UTC_PLUS_1
};
var WestGreenlandSummerTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.WestGreenlandSummerTime,
  name: "West Greenland Summer Time",
  offset: TimezoneOffset.UTC_MINUS_2
};
var WestGreenlandTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.WestGreenlandTime,
  name: "West Greenland Time",
  offset: TimezoneOffset.UTC_MINUS_3
};
var WestKazakhstanTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.WestKazakhstanTime,
  name: "West Kazakhstan Time",
  offset: TimezoneOffset.UTC_PLUS_5
};
var WesternEuropeanSummerTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.WesternEuropeanSummerTime,
  name: "Western European Summer Time",
  offset: TimezoneOffset.UTC_PLUS_1
};
var WesternEuropeanTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.WesternEuropeanTime,
  name: "Western European Time",
  offset: TimezoneOffset.UTC_0
};
var WesternIndonesianTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.WesternIndonesianTime,
  name: "Western Indonesian Time",
  offset: TimezoneOffset.UTC_PLUS_7
};
var WesternStandardTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.WesternStandardTime,
  name: "Western Standard Time",
  offset: TimezoneOffset.UTC_PLUS_8
};
var YakutskTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.YakutskTime,
  name: "Yakutsk Time",
  offset: TimezoneOffset.UTC_PLUS_9
};
var YekaterinburgTime = {
  dst: {
    is: false,
    uses: true
  },
  id: Timezones.YekaterinburgTime,
  name: "Yekaterinburg Time",
  offset: TimezoneOffset.UTC_PLUS_5
};

// ../types/dist/i18n/locale/region.js
var Region;
(function(Region2) {
  Region2["Africa"] = "Africa";
  Region2["Americas"] = "Americas";
  Region2["Asia"] = "Asia";
  Region2["Europe"] = "Europe";
  Region2["Oceania"] = "Oceania";
  Region2["Polar"] = "Polar";
})(Region || (Region = {}));
var SubRegion;
(function(SubRegion2) {
  SubRegion2["CentralAmerica"] = "Central America";
  SubRegion2["EasternAsia"] = "Eastern Asia";
  SubRegion2["EasternEurope"] = "Eastern Europe";
  SubRegion2["EasternAfrica"] = "Eastern Africa";
  SubRegion2["MiddleAfrica"] = "Middle Africa";
  SubRegion2["MiddleEast"] = "Middle East";
  SubRegion2["NorthernAfrica"] = "Northern Africa";
  SubRegion2["NorthernAmerica"] = "Northern America";
  SubRegion2["NorthernEurope"] = "Northern Europe";
  SubRegion2["Polynesia"] = "Polynesia";
  SubRegion2["SouthAmerica"] = "South America";
  SubRegion2["SouthernAfrica"] = "Southern Africa";
  SubRegion2["SouthernAsia"] = "Southern Asia";
  SubRegion2["SouthernEurope"] = "Southern Europe";
  SubRegion2["WesternAfrica"] = "Western Africa";
  SubRegion2["WesternAsia"] = "Western Asia";
  SubRegion2["WesternEurope"] = "Western Europe";
  SubRegion2["WesternAustralia"] = "Western Australia";
})(SubRegion || (SubRegion = {}));

// ../types/dist/i18n/locale/countries.js
var Countries = {
  Afghanistan: {
    i18n: {
      calling_codes: [93],
      currencies: [CurrencyCode.AfghanistanAfghani],
      languages: [
        LocaleCode.Pashto,
        LocaleCode.Dari,
        LocaleCode.Turkmen,
        LocaleCode.Uzbek
      ],
      tz: {
        offsets: [TimezoneOffset.UTC_PLUS_4_30],
        regions: [TimezoneRegions.AsiaKabul],
        timezones: [Timezones.AfghanistanTime]
      }
    },
    id: CountryCode.Afghanistan,
    info: {
      flag: {
        emoji: "\u{1F1E6}\u{1F1EB}",
        emoji_unicode: "U+1F1E6 U+1F1EB",
        svg: "https://www.countryflags.io/af/flat/64.svg"
      },
      tld: [".af"]
    },
    iso: {
      alpha2: CountryCode.Afghanistan,
      alpha3: "AFG",
      numeric: "004"
    },
    name: {
      alt_spellings: ["AF", "Af\u0121\u0101nist\u0101n"],
      demonym: "Afghan",
      native: {
        endonym: "\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646"
      },
      official: "Islamic Republic of Afghanistan",
      short: "Afghanistan",
      translations: {
        [LocaleCode.Afrikaans]: "Afghanistan",
        [LocaleCode.Albanian]: "Shqip\xEBri",
        [LocaleCode.Amharic]: "\u12A0\u134D\u130B\u1295",
        [LocaleCode.Arabic]: "\u0623\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646",
        [LocaleCode.Armenian]: "\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576",
        [LocaleCode.Azerbaijani]: "Az\u0259rbaycan",
        [LocaleCode.Bashkir]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Basque]: "Afganist\xE1n",
        [LocaleCode.Belarusian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Bengali]: "\u0986\u09AB\u0997\u09BE\u09A8\u09BF\u09B8\u09CD\u09A4\u09BE\u09A8",
        [LocaleCode.Berber]: "\u0623\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646",
        [LocaleCode.Bhutani]: "\u0F60\u0F56\u0FB2\u0F74\u0F42\u0F0B\u0F61\u0F74\u0F63\u0F0B\u0F66\u0FA4\u0FB2\u0F7C\u0F51\u0F0B\u0F40\u0FB1\u0F72\u0F0B\u0F51\u0F7C\u0F53\u0F0B\u0F63\u0F7A\u0F0B\u0F66\u0F90\u0F51\u0F0B\u0F46\u0F0D",
        [LocaleCode.Bosnian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Breton]: "Afganistan",
        [LocaleCode.Bulgarian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Burmese]: "\u1021\u102C\u1019\u1001\u103B\u1004\u103A\u1010\u1031\u102C\u103A",
        [LocaleCode.Catalan]: "Afganistan",
        [LocaleCode.Chinese]: "\u963F\u5BCC\u6C57",
        [LocaleCode.Croatian]: "Afganistan",
        [LocaleCode.Czech]: "Afganistan",
        [LocaleCode.Danish]: "Afghanistan",
        [LocaleCode.Dutch]: "Afghanistan",
        [LocaleCode.English]: "Afghanistan",
        [LocaleCode.Esperanto]: "Afganistan",
        [LocaleCode.Estonian]: "Afganistan",
        [LocaleCode.Finnish]: "Afghanistan",
        [LocaleCode.French]: "Afghanistan",
        [LocaleCode.Frisian]: "Afghanistan",
        [LocaleCode.Galician]: "Afganist\xE1n",
        [LocaleCode.Georgian]: "\u10D0\u10D5\u10E6\u10D0\u10DC\u10D4\u10D7\u10D8",
        [LocaleCode.German]: "Afghanistan",
        [LocaleCode.Greenlandic]: "Afghanistan",
        [LocaleCode.Greek]: "\u0391\u03C6\u03B3\u03B1\u03BD\u03B9\u03C3\u03C4\u03AC\u03BD",
        [LocaleCode.Gujarati]: "\u0A85\u0AAB\u0A97\u0ABE\u0AA8\u0ABF\u0AB8\u0ACD\u0AA4\u0ABE\u0AA8",
        [LocaleCode.Haitian]: "Afghanistan",
        [LocaleCode.Hausa]: "Afghanistan",
        [LocaleCode.Hebrew]: "\u05D0\u05E4\u05D2\u05E0\u05D9\u05E1\u05D8\u05DF",
        [LocaleCode.Hindi]: "\u0905\u092B\u0917\u093E\u0928\u093F\u0938\u094D\u0924\u093E\u0928",
        [LocaleCode.Hungarian]: "Afganistan",
        [LocaleCode.Icelandic]: "Afghanistan",
        [LocaleCode.Igbo]: "Afghanistan",
        [LocaleCode.Indonesian]: "Afghanistan",
        [LocaleCode.Irish]: "Afghanistan",
        [LocaleCode.Italian]: "Afghanistan",
        [LocaleCode.Japanese]: "\u30A2\u30D5\u30AC\u30CB\u30B9\u30BF\u30F3",
        [LocaleCode.Javanese]: "Afghanistan",
        [LocaleCode.Kannada]: "\u0C85\u0CAB\u0C97\u0CBE\u0CA8\u0CBF\u0CB8\u0CCD\u0CA4\u0CBE\u0CA8",
        [LocaleCode.Kazakh]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Khmer]: "\u17A2\u17B6\u17A0\u17D2\u179C\u17D2\u179A\u17B7\u1780",
        [LocaleCode.Korean]: "\uC544\uD504\uAC00\uB2C8\uC2A4\uD0C4",
        [LocaleCode.Kurdish]: "Afghanistan",
        [LocaleCode.Kyrgyz]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Lao]: "\u0EAD\u0EB2\u0E9F\u0EB2\u0EA5\u0EBD\u0E99",
        [LocaleCode.Latin]: "Afghanistan",
        [LocaleCode.Latvian]: "Afghanistan",
        [LocaleCode.Lithuanian]: "Afganistanas",
        [LocaleCode.Luxembourgish]: "Afghanistan",
        [LocaleCode.Macedonian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Malagasy]: "Afghanistan",
        [LocaleCode.Malay]: "Afghanistan",
        [LocaleCode.Malayalam]: "\u0D05\u0D2B\u0D17\u0D3E\u0D28\u0D3F\u0D38\u0D4D\u0D24\u0D3E\u0D28",
        [LocaleCode.Maltese]: "Afghanistan",
        [LocaleCode.Maori]: "Afghanistan",
        [LocaleCode.Marathi]: "\u0905\u092B\u0917\u093E\u0928\u093F\u0938\u094D\u0924\u093E\u0928",
        [LocaleCode.Mongolian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Nepali]: "\u0905\u092B\u0917\u093E\u0928\u093F\u0938\u094D\u0924\u093E\u0928",
        [LocaleCode.Norwegian]: "Afghanistan",
        [LocaleCode.Pashto]: "\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646",
        [LocaleCode.Persian]: "\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646",
        [LocaleCode.Polish]: "Afganistan",
        [LocaleCode.Portuguese]: "Afghanistan",
        [LocaleCode.Punjabi]: "Afghanistan",
        [LocaleCode.Romanian]: "Afghanistan",
        [LocaleCode.Polish]: "Afganistan",
        [LocaleCode.Russian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Samoan]: "Afghanistan",
        [LocaleCode.Sanskrit]: "\u0905\u092B\u0917\u093E\u0928\u093F\u0938\u094D\u0924\u093E\u0928",
        [LocaleCode.Scots]: "Afghanistan",
        [LocaleCode.Serbian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Sesotho]: "Afghanistan",
        [LocaleCode.Shona]: "Afghanistan",
        [LocaleCode.Sindhi]: "Afghanistan",
        [LocaleCode.Sinhala]: "\u0D86\u0D9C\u0DCA\u200D\u0DBB\u0DDC\u0D9A\u0DCA\u0D9A\u0DD2\u0DBA\u0DCF\u0DC0",
        [LocaleCode.Slovak]: "Afganistan",
        [LocaleCode.Slovenian]: "Afganistan",
        [LocaleCode.Somali]: "Afghanistan",
        [LocaleCode.Spanish]: "Afganist\xE1n",
        [LocaleCode.Sudanese]: "Afghanistan",
        [LocaleCode.Swahili]: "Afghanistan",
        [LocaleCode.Swedish]: "Afghanistan",
        [LocaleCode.Tagalog]: "Afghanistan",
        [LocaleCode.Tajik]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Tatar]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Tamil]: "\u0B86\u0BAA\u0BCD\u0BAA\u0B95\u0BBE\u0BA9\u0BBF\u0BB8\u0BCD\u0BA4\u0BBE\u0BA9\u0BCD",
        [LocaleCode.Telugu]: "\u0C06\u0C2B\u0C4D\u0C18\u0C28\u0C3F\u0C38\u0C4D\u0C24\u0C3E\u0C28\u0C4D",
        [LocaleCode.Thai]: "\u0E2D\u0E31\u0E1F\u0E01\u0E32\u0E19\u0E34\u0E2A\u0E16\u0E32\u0E19",
        [LocaleCode.Tibetan]: "\u0F68\u0F55\u0F0B\u0F42\u0F7A\u0F0B\u0F53\u0F72\u0F66\u0F72\u0F0B\u0F4F\u0F7A\u0F53\u0F66\u0F72\u0F0D",
        [LocaleCode.Turkish]: "Afganistan",
        [LocaleCode.Ukrainian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Urdu]: "\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646",
        [LocaleCode.Uzbek]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D",
        [LocaleCode.Vietnamese]: "Afghanistan",
        [LocaleCode.Welsh]: "Afghanistan",
        [LocaleCode.Xhosa]: "Afghanistan",
        [LocaleCode.Yiddish]: "Afghanistan",
        [LocaleCode.Yoruba]: "Afghanistan",
        [LocaleCode.Zulu]: "Afghanistan"
      }
    },
    statistics: {
      demographics: {
        age: {
          distribution: [
            { age: "0 to 14 years", percentage: 15.3 },
            { age: "15 to 64 years", percentage: 66.7 },
            { age: "65 years and over", percentage: 14.6 }
          ],
          median_age: 35.5
        },
        population: {
          largest_city: "Kabul",
          total: 341e5
        }
      },
      geography: {
        area: 652230,
        region: Region.Asia,
        sub_region: SubRegion.SouthernAsia
      },
      government: {
        capital: "Kabul",
        type: "Islamic Emirate"
      }
    }
  },
  Albania: {
    i18n: {
      calling_codes: [355],
      currencies: [CurrencyCode.AlbaniaLek],
      languages: [LocaleCode.Albanian, LocaleCode.Greek, LocaleCode.Turkish],
      tz: {
        offsets: [TimezoneOffset.UTC_PLUS_1],
        regions: [TimezoneRegions.EuropeBrussels],
        timezones: [Timezones.CentralEuropeanTime]
      }
    },
    id: CountryCode.Albania,
    info: {
      flag: {
        emoji: "\u{1F1E6}\u{1F1F1}",
        emoji_unicode: "U+1F1E6 U+1F1F1",
        svg: "https://www.countryflags.io/al/flat/64.svg"
      },
      tld: [".al"]
    },
    iso: {
      alpha2: CountryCode.Albania,
      alpha3: "ALB",
      numeric: "008"
    },
    name: {
      alt_spellings: ["AL", "Shqip\xEBri", "Shqip\xEBria", "Shqipnia"],
      demonym: "Albanian",
      native: {
        endonym: "Shqip\xEBri"
      },
      official: "Republic of Albania",
      short: "Albania",
      translations: {
        [LocaleCode.Afrikaans]: "Albania",
        [LocaleCode.Albanian]: "Albania",
        [LocaleCode.Amharic]: "\u12A0\u120D\u1263\u1295\u12EB",
        [LocaleCode.Arabic]: "\u0623\u0644\u0628\u0627\u0646\u064A\u0627",
        [LocaleCode.Armenian]: "\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576",
        [LocaleCode.Azerbaijani]: "Az\u0259rbaycan",
        [LocaleCode.Bashkir]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F",
        [LocaleCode.Basque]: "Albania",
        [LocaleCode.Belarusian]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F",
        [LocaleCode.Bengali]: "\u0986\u09B2\u09AC\u09BE\u09A8\u09BF\u09AF\u09BC\u09BE",
        [LocaleCode.Berber]: "\u0623\u0644\u0628\u0627\u0646\u064A\u0627",
        [LocaleCode.Bhutani]: "\u0F60\u0F56\u0FB2\u0F74\u0F42\u0F0B\u0F61\u0F74\u0F63\u0F0B",
        [LocaleCode.Bosnian]: "Albanija",
        [LocaleCode.Breton]: "Albania",
        [LocaleCode.Bulgarian]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F",
        [LocaleCode.Burmese]: "\u1021\u102C\u1019\u1001\u103B\u1004\u103A\u1010\u1031\u102C\u103A",
        [LocaleCode.Catalan]: "Alb\xE0nia",
        [LocaleCode.Chinese]: "\u963F\u5C14\u5DF4\u5C3C\u4E9A",
        [LocaleCode.Croatian]: "Albanija",
        [LocaleCode.Czech]: "Alb\xE1nie",
        [LocaleCode.Danish]: "Albanien",
        [LocaleCode.Dutch]: "Albani\xEB",
        [LocaleCode.English]: "Albania",
        [LocaleCode.Esperanto]: "Albanio",
        [LocaleCode.Estonian]: "Albaania",
        [LocaleCode.Finnish]: "Albania",
        [LocaleCode.French]: "Albanie",
        [LocaleCode.Frisian]: "Albani\xEB",
        [LocaleCode.Galician]: "Alb\xE2nia",
        [LocaleCode.Georgian]: "\u10D0\u10DA\u10D1\u10D0\u10DC\u10D8\u10D0",
        [LocaleCode.German]: "Albanien",
        [LocaleCode.Greenlandic]: "Albania",
        [LocaleCode.Greek]: "\u0391\u03BB\u03B2\u03B1\u03BD\u03AF\u03B1",
        [LocaleCode.Gujarati]: "\u0A85\u0AB2\u0AAC\u0AA8\u0ABF\u0AAF\u0ABE",
        [LocaleCode.Haitian]: "Albanais",
        [LocaleCode.Hausa]: "Albania",
        [LocaleCode.Hebrew]: "\u05D0\u05DC\u05D1\u05E0\u05D9\u05D4",
        [LocaleCode.Hindi]: "\u0905\u0932\u094D\u092C\u093E\u0928\u093F\u092F\u093E",
        [LocaleCode.Hungarian]: "Alb\xE1nia",
        [LocaleCode.Icelandic]: "Alb\xFAnir",
        [LocaleCode.Igbo]: "Albania",
        [LocaleCode.Indonesian]: "Albania",
        [LocaleCode.Irish]: "Alb\xE1in",
        [LocaleCode.Italian]: "Albania",
        [LocaleCode.Japanese]: "\u30A2\u30EB\u30D0\u30CB\u30A2",
        [LocaleCode.Javanese]: "Albania",
        [LocaleCode.Kannada]: "\u0C85\u0CB2\u0CCD\u0CAC\u0CBE\u0CA8\u0CBF\u0CAF\u0CBE",
        [LocaleCode.Kazakh]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F",
        [LocaleCode.Khmer]: "\u17A2\u17B6\u17A0\u17D2\u179C\u17D2\u179A\u17C1\u179F\u17CA\u17B8",
        [LocaleCode.Korean]: "\uC54C\uBC14\uB2C8\uC544",
        [LocaleCode.Kurdish]: "\u0622\u0644\u0628\u0627\u0646\u06CC\u0627",
        [LocaleCode.Kyrgyz]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F",
        [LocaleCode.Lao]: "\u0EAD\u0EB2\u0EA5\u0EB2\u0E99\u0EB5",
        [LocaleCode.Latin]: "Albania",
        [LocaleCode.Latvian]: "Alb\u0101nija",
        [LocaleCode.Lithuanian]: "Albanija",
        [LocaleCode.Luxembourgish]: "Albani\xEB",
        [LocaleCode.Macedonian]: "\u0410\u043B\u0431\u0430\u043D\u0438\u0458\u0430",
        [LocaleCode.Malagasy]: "Albania",
        [LocaleCode.Malay]: "Albania",
        [LocaleCode.Malayalam]: "\u0D05\u0D32\u0D4D\u0D2C\u0D3E\u0D28\u0D3F\u0D2F\u0D3E",
        [LocaleCode.Maltese]: "Albania",
        [LocaleCode.Maori]: "Albania",
        [LocaleCode.Marathi]: "\u0905\u0932\u094D\u092C\u093E\u0928\u093F\u092F\u093E",
        [LocaleCode.Mongolian]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F",
        [LocaleCode.Nepali]: "\u0905\u0932\u094D\u092C\u093E\u0928\u093F\u092F\u093E",
        [LocaleCode.Norwegian]: "Albania",
        [LocaleCode.Pashto]: "\u0627\u0627\u0644\u0628\u0627\u0646\u06CC",
        [LocaleCode.Persian]: "\u0622\u0644\u0628\u0627\u0646\u06CC",
        [LocaleCode.Polish]: "Albania",
        [LocaleCode.Portuguese]: "Alb\xE2nia",
        [LocaleCode.Punjabi]: "\u0A05\u0A32\u0A2C\u0A28\u0A40\u0A06",
        [LocaleCode.Romanian]: "Alb\u0103n",
        [LocaleCode.Russian]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F",
        [LocaleCode.Samoan]: "Albania",
        [LocaleCode.Sanskrit]: "Albani",
        [LocaleCode.Scots]: "Alb\xE0inia",
        [LocaleCode.Serbian]: "\u0410\u043B\u0431\u0430\u043D\u0438\u0458\u0430",
        [LocaleCode.Sesotho]: "Albania",
        [LocaleCode.Shona]: "Albania",
        [LocaleCode.Sindhi]: "Albania",
        [LocaleCode.Sinhala]: "\u0D87\u0DBD\u0DCA\u0DB6\u0DCF\u0DB1\u0DD2\u0DBA",
        [LocaleCode.Slovak]: "Alb\xE1nsko",
        [LocaleCode.Slovenian]: "Albanija",
        [LocaleCode.Somali]: "Albania",
        [LocaleCode.Spanish]: "Albania",
        [LocaleCode.Sudanese]: "Albania",
        [LocaleCode.Swahili]: "Albania",
        [LocaleCode.Swedish]: "Albanien",
        [LocaleCode.Tagalog]: "Albania",
        [LocaleCode.Tajik]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F",
        [LocaleCode.Tamil]: "\u0B85\u0BB2\u0BCD\u0BAA\u0BBE\u0BA9\u0BBF\u0BAF\u0BBE",
        [LocaleCode.Tatar]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F",
        [LocaleCode.Telugu]: "\u0C05\u0C32\u0C4D\u0C2C\u0C3E\u0C28\u0C3F\u0C2F\u0C3E",
        [LocaleCode.Thai]: "\u0E2D\u0E31\u0E25\u0E41\u0E1A\u0E19\u0E34\u0E19\u0E35",
        [LocaleCode.Tibetan]: "\u0F68\u0F63\u0F0B\u0F56\u0F72\u0F0B\u0F53\u0F72\u0F0B\u0F61\u0F72",
        [LocaleCode.Turkish]: "Albaniye",
        [LocaleCode.Ukrainian]: "\u0410\u043B\u0431\u0430\u043D\u0456\u044F",
        [LocaleCode.Urdu]: "\u0622\u0644\u0628\u0627\u0646\u06CC",
        [LocaleCode.Uzbek]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F",
        [LocaleCode.Vietnamese]: "Albanie",
        [LocaleCode.Welsh]: "Albania",
        [LocaleCode.Xhosa]: "Albania",
        [LocaleCode.Yiddish]: "\u05D0\u05DC\u05D1\u05E0\u05D9\u05E9",
        [LocaleCode.Yoruba]: "Albania",
        [LocaleCode.Zulu]: "Albania"
      }
    },
    statistics: {
      demographics: {
        age: {
          distribution: [
            { age: "0 to 14 years", percentage: 15.3 },
            { age: "15 to 64 years", percentage: 66.7 },
            { age: "65 years and over", percentage: 14.6 }
          ],
          median_age: 35.5
        },
        population: {
          largest_city: "Tirana",
          total: 2853e3
        }
      },
      geography: {
        area: 28748,
        region: Region.Europe,
        sub_region: SubRegion.SouthernEurope
      },
      government: {
        capital: "Tirana",
        type: "Republic"
      }
    }
  },
  Algeria: {
    i18n: {
      calling_codes: [213],
      currencies: [CurrencyCode.AlgeriaDinar],
      languages: [
        LocaleCode.Arabic,
        LocaleCode.French,
        LocaleCode.Berber,
        LocaleCode.Tamazight
      ],
      tz: {
        offsets: [TimezoneOffset.UTC_PLUS_1, TimezoneOffset.UTC_PLUS_2],
        regions: [TimezoneRegions.AfricaAlgiers],
        timezones: [Timezones.CentralEuropeanTime]
      }
    },
    id: CountryCode.Algeria,
    info: {
      flag: {
        emoji: "\u{1F1E9}\u{1F1FF}",
        emoji_unicode: "U+1F1E9 U+1F1FF",
        svg: "https://www.countryflags.io/dz/flat/64.svg"
      },
      tld: [".dz", ".\u062C\u0632\u0627\u0626\u0631"]
    },
    iso: {
      alpha2: CountryCode.Algeria,
      alpha3: "DZA",
      numeric: "012"
    },
    name: {
      alt_spellings: ["DZ", "Dzayer", "Alg\xE9rie"],
      demonym: "Algerian",
      native: {
        endonym: "\u0627\u0644\u062C\u0632\u0627\u0626\u0631"
      },
      official: "People's Democratic Republic of Algeria",
      short: "Algeria",
      translations: {
        [LocaleCode.Afrikaans]: "Algerije",
        [LocaleCode.Albanian]: "Algeria",
        [LocaleCode.Amharic]: "\u12A0\u120D\u1300\u122D\u1235",
        [LocaleCode.Arabic]: "\u0627\u0644\u062C\u0632\u0627\u0626\u0631",
        [LocaleCode.Armenian]: "\u0531\u056C\u0563\u0578\u0580\u056B\u0561",
        [LocaleCode.Azerbaijani]: "Az\u0259rbaycan",
        [LocaleCode.Bashkir]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Basque]: "Algeria",
        [LocaleCode.Belarusian]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Bengali]: "\u0986\u09B2\u099C\u09C7\u09B0",
        [LocaleCode.Berber]: "\u062C\u0632\u0627\u0626\u0631",
        [LocaleCode.Bhutani]: "\u0F62\u0FAB\u0F7C\u0F44\u0F0B\u0F41",
        [LocaleCode.Bosnian]: "Al\u017Eir",
        [LocaleCode.Breton]: "Algeria",
        [LocaleCode.Bulgarian]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Burmese]: "\u1021\u102C\u101B\u1015\u103A",
        [LocaleCode.Catalan]: "Alg\xE8ria",
        [LocaleCode.Chinese]: "\u963F\u5C14\u53CA\u5229\u4E9A",
        [LocaleCode.Croatian]: "Al\u017Eir",
        [LocaleCode.Czech]: "Al\u017E\xEDrsko",
        [LocaleCode.Danish]: "Algeriet",
        [LocaleCode.Dutch]: "Algerije",
        [LocaleCode.English]: "Algeria",
        [LocaleCode.Esperanto]: "Al\u011Derio",
        [LocaleCode.Estonian]: "Al\u017Eira",
        [LocaleCode.Finnish]: "Algeria",
        [LocaleCode.French]: "Alg\xE9rie",
        [LocaleCode.Frisian]: "Algeri\xEB",
        [LocaleCode.Galician]: "Alxeria",
        [LocaleCode.Georgian]: "\u10D0\u10DA\u10D2\u10D8\u10E3\u10E0\u10D8",
        [LocaleCode.German]: "Algerien",
        [LocaleCode.Greenlandic]: "Algeria",
        [LocaleCode.Greek]: "\u0391\u03BB\u03B3\u03B5\u03C1\u03AF\u03B1",
        [LocaleCode.Gujarati]: "\u0A86\u0AB2\u0AC7\u0A97\u0AB0\u0ABF\u0AAF\u0ABE",
        [LocaleCode.Haitian]: "Alg\xE9rie",
        [LocaleCode.Hausa]: "Algeria",
        [LocaleCode.Hebrew]: "\u05D0\u05DC\u05D2\u05F3\u05D9\u05E8\u05D9\u05D4",
        [LocaleCode.Hindi]: "\u0906\u0932\u094D\u0917\u0947\u0930\u093F\u092F\u093E",
        [LocaleCode.Hungarian]: "Alg\xE1r",
        [LocaleCode.Icelandic]: "Alg\xFAra",
        [LocaleCode.Igbo]: "Algeria",
        [LocaleCode.Indonesian]: "Aljir",
        [LocaleCode.Irish]: "Alg\xE9rie",
        [LocaleCode.Italian]: "Algeria",
        [LocaleCode.Japanese]: "\u30A2\u30EB\u30B8\u30A7\u30EA\u30A2",
        [LocaleCode.Javanese]: "Aljir",
        [LocaleCode.Kannada]: "\u0C86\u0CB2\u0CCD\u0C97\u0CC7\u0CB0\u0CBF\u0CAF\u0CA8\u0CCD",
        [LocaleCode.Kazakh]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Khmer]: "\u17A2\u17B6\u179B\u17CB\u1794\u17B6\u1793\u17B8",
        [LocaleCode.Korean]: "\uC54C\uC81C\uB9AC",
        [LocaleCode.Kurdish]: "\u062C\u0632\u0627\u06CC\u0631 \u0627\u0644\u062C\u0632\u0627\u06CC\u0631",
        [LocaleCode.Kyrgyz]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Lao]: "\u0EAD\u0EB2\u0EA5\u0EB2\u0E88\u0EB5\u0E99",
        [LocaleCode.Latin]: "Algeria",
        [LocaleCode.Latvian]: "Al\u017E\u012Brija",
        [LocaleCode.Lithuanian]: "Al\u017Eyras",
        [LocaleCode.Luxembourgish]: "Algeria",
        [LocaleCode.Macedonian]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Malagasy]: "Alg\xE9rie",
        [LocaleCode.Malay]: "Aljir",
        [LocaleCode.Malayalam]: "\u0D06\u0D32\u0D02\u0D17\u0D47\u0D30\u0D3F\u0D2F\u0D7B",
        [LocaleCode.Maltese]: "Alg\xE9rie",
        [LocaleCode.Maori]: "Algeria",
        [LocaleCode.Marathi]: "\u0906\u0932\u094D\u0917\u0947\u0930\u093F\u092F\u093E",
        [LocaleCode.Mongolian]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Nepali]: "\u0906\u0932\u094D\u0917\u0947\u0930\u093F\u092F\u093E",
        [LocaleCode.Norwegian]: "Algeria",
        [LocaleCode.Pashto]: "\u0627\u0644\u062C\u0632\u0627\u0626\u0631",
        [LocaleCode.Persian]: "\u062C\u0632\u0627\u06CC\u0631 \u0627\u0644\u0639\u0631\u0628",
        [LocaleCode.Polish]: "Algieria",
        [LocaleCode.Portuguese]: "Alg\xE9ria",
        [LocaleCode.Punjabi]: "\u0A06\u0A32\u0A47\u0A17\u0A40\u0A06",
        [LocaleCode.Romanian]: "Algeria",
        [LocaleCode.Russian]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Samoan]: "Algeria",
        [LocaleCode.Sanskrit]: "\u0906\u0932\u094D\u0917\u0947\u0930\u093F\u092F\u093E",
        [LocaleCode.Scots]: "Algeria",
        [LocaleCode.Serbian]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Sesotho]: "Algeria",
        [LocaleCode.Shona]: "Algeria",
        [LocaleCode.Sindhi]: "Algeria",
        [LocaleCode.Sinhala]: "\u0D86\u0DBD\u0DCA\u0DB6\u0DCF\u0DB1\u0DD2\u0DBA",
        [LocaleCode.Slovak]: "Al\u017E\xEDrsko",
        [LocaleCode.Slovenian]: "Al\u017Eir",
        [LocaleCode.Somali]: "Algeria",
        [LocaleCode.Spanish]: "Algeria",
        [LocaleCode.Sudanese]: "Aljir",
        [LocaleCode.Swahili]: "Aljir",
        [LocaleCode.Swedish]: "Algeriet",
        [LocaleCode.Tagalog]: "Algeria",
        [LocaleCode.Tajik]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Tamil]: "\u0B86\u0BB2\u0BCD\u0B95\u0BC7\u0BB0\u0BBF\u0BAF\u0BBE",
        [LocaleCode.Tatar]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Telugu]: "\u0C06\u0C32\u0C4D\u0C17\u0C47\u0C30\u0C3F\u0C2F\u0C3E",
        [LocaleCode.Thai]: "\u0E2D\u0E32\u0E23\u0E32\u0E01\u0E2D\u0E19",
        [LocaleCode.Tibetan]: "\u0F68\u0F63\u0F9F\u0F72\u0F0B\u0F62\u0F72\u0F0B\u0F61\u0F72",
        [LocaleCode.Turkish]: "Cezayir",
        [LocaleCode.Ukrainian]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Urdu]: "\u0622\u0644\u062C\u06CC\u0631",
        [LocaleCode.Uzbek]: "\u0410\u043B\u0436\u0438\u0440",
        [LocaleCode.Vietnamese]: "\u1EA2\u0301\u1EA1\u1EA3\u1EAD\u1EB5",
        [LocaleCode.Welsh]: "Algeria",
        [LocaleCode.Xhosa]: "Algeria",
        [LocaleCode.Yiddish]: "\u05D0\u05DC\u05D2\u05F3\u05D9\u05E8\u05D9\u05D4",
        [LocaleCode.Yoruba]: "Algeria",
        [LocaleCode.Zulu]: "Algeria"
      }
    },
    statistics: {
      demographics: {
        age: {
          distribution: [
            { age: "0 to 14 years", percentage: 15.3 },
            { age: "15 to 64 years", percentage: 66.7 },
            { age: "65 years and over", percentage: 14.6 }
          ],
          median_age: 35.5
        },
        population: {
          largest_city: "Oran",
          total: 371e5
        }
      },
      geography: {
        area: 2381740,
        region: Region.Africa,
        sub_region: SubRegion.NorthernAfrica
      },
      government: {
        capital: "Algiers",
        type: "Republic"
      }
    }
  },
  AmericanSamoa: {
    i18n: {
      calling_codes: [1684],
      currencies: [CurrencyCode.AmericanSamoaTala],
      languages: [LocaleCode.English, LocaleCode.Samoan],
      tz: {
        offsets: [TimezoneOffset.UTC_MINUS_11],
        regions: [TimezoneRegions.PacificSamoa],
        timezones: [Timezones.SamoaStandardTime]
      }
    },
    id: CountryCode.AmericanSamoa,
    info: {
      flag: {
        emoji: "\u{1F1E6}\u{1F1F8}",
        emoji_unicode: "U+1F1E6 U+1F1F8",
        svg: "https://www.countryflags.io/as/flat/64.svg"
      },
      tld: [".as"]
    },
    iso: {
      alpha2: CountryCode.AmericanSamoa,
      alpha3: "ASM",
      numeric: "016"
    },
    name: {
      alt_spellings: ["AS", "Amerika S\u0101moa", "Amelika S\u0101moa", "S\u0101moa Amelika"],
      demonym: "American Samoan",
      native: {
        endonym: "American Samoa"
      },
      official: "American Samoa",
      short: "American Samoa",
      translations: {
        [LocaleCode.Afrikaans]: "Amerikaans Samoa",
        [LocaleCode.Albanian]: "Samoa Amerikane",
        [LocaleCode.Amharic]: "\u1233\u121E\u12A0\u122D",
        [LocaleCode.Arabic]: "\u0633\u0627\u0645\u0648\u0627 \u0627\u0644\u0623\u0645\u0631\u064A\u0643\u064A\u0629",
        [LocaleCode.Armenian]: "\u054D\u0561\u0570\u0561\u0574\u0561\u056C\u056B\u0561",
        [LocaleCode.Azerbaijani]: "Samoa Amerikana",
        [LocaleCode.Bashkir]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438 \u0421\u0430\u043C\u043E\u0430",
        [LocaleCode.Basque]: "Samoa Amerikana",
        [LocaleCode.Belarusian]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0430\u044F \u0421\u0430\u043C\u043E\u0430",
        [LocaleCode.Bengali]: "\u0986\u09AE\u09C7\u09B0\u09BF\u0995\u09BE\u09A8 \u09B8\u09BE\u09AE\u09CB\u09AF\u09BC\u09BE",
        [LocaleCode.Berber]: "\u062C\u0632\u0631 \u0633\u0627\u0645\u0648\u0627 \u0627\u0644\u0623\u0645\u0631\u064A\u0643\u064A\u0629",
        [LocaleCode.Bhutani]: "\u0F68\u0F62\u0F92\u0FB1\u0F0B\u0F58\u0F72\u0F0B\u0F51\u0F58\u0F44\u0F66\u0F0B\u0F66\u0FA4\u0FB2\u0F7C\u0F51\u0F0B\u0F40\u0FB1\u0F72\u0F0B\u0F66\u0F90\u0F56\u0F66\u0F0B\u0F62\u0F92\u0FB1\u0F74\u0F51\u0F0B\u0F46\u0F7A\u0F53\u0F0B\u0F54\u0F7C\u0F0D",
        [LocaleCode.Bosnian]: "Ameri\u010Dka Samoa",
        [LocaleCode.Breton]: "Samoa Amerikan",
        [LocaleCode.Bulgarian]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0430 \u0421\u0430\u043C\u043E\u0430",
        [LocaleCode.Burmese]: "\u1021\u1019\u1039\u1038\u1019\u101B\u102D\u102F\u1018\u102C\u101E\u102C",
        [LocaleCode.Catalan]: "Samoa Americana",
        [LocaleCode.Chinese]: "\u7F8E\u5C5E\u8428\u6469\u4E9A",
        [LocaleCode.Croatian]: "Ameri\u010Dka Samoa",
        [LocaleCode.Czech]: "Americk\xE1 Samoa",
        [LocaleCode.Danish]: "Amerikansk Samoa",
        [LocaleCode.Dutch]: "Amerikaans Samoa",
        [LocaleCode.English]: "American Samoa",
        [LocaleCode.Esperanto]: "Samoa Amerika",
        [LocaleCode.Estonian]: "Ameerika Samoa",
        [LocaleCode.Finnish]: "Amerikka Samoa",
        [LocaleCode.French]: "American Samoa",
        [LocaleCode.Frisian]: "Amerikaans Samoa",
        [LocaleCode.Galician]: "Samoa Americana",
        [LocaleCode.Georgian]: "\u10D0\u10DB\u10D4\u10E0\u10D8\u10D9\u10D8\u10E1 \u10E1\u10D0\u10DB\u10DD\u10D0",
        [LocaleCode.German]: "Amerikanisch-Samoa",
        [LocaleCode.Greenlandic]: "Amerikaans Samoa",
        [LocaleCode.Greek]: "\u0391\u03BC\u03B5\u03C1\u03B9\u03BA\u03B1\u03BD\u03B9\u03BA\u03AE \u03A3\u03B1\u03BC\u03CC\u03B1",
        [LocaleCode.Gujarati]: "\u0A86\u0AAE\u0AC7\u0AB0\u0ABF\u0A95\u0AA8 \u0AB8\u0ABE\u0AAE\u0ACB\u0AAF\u0ABE",
        [LocaleCode.Haitian]: "Amerikaans Samoa",
        [LocaleCode.Hausa]: "Amerikaans Samoa",
        [LocaleCode.Hebrew]: "\u05D0\u05DE\u05E8\u05D9\u05E7\u05E0\u05D9\u05D4 \u05E1\u05DE\u05D5\u05D0\u05D4",
        [LocaleCode.Hindi]: "\u0905\u092E\u0947\u0930\u093F\u0915\u093E \u0938\u092E\u094B\u0906",
        [LocaleCode.Hungarian]: "Amerikai Szamoa",
        [LocaleCode.Icelandic]: "Amerikai Szamoa",
        [LocaleCode.Igbo]: "Ikina Amerika",
        [LocaleCode.Indonesian]: "Samoa Amerika",
        [LocaleCode.Irish]: "Samoa Amerikana",
        [LocaleCode.Italian]: "Samoa Americane",
        [LocaleCode.Japanese]: "\u30A2\u30E1\u30EA\u30AB\u9818\u30B5\u30E2\u30A2",
        [LocaleCode.Javanese]: "Samoa Amerika",
        [LocaleCode.Kannada]: "\u0C85\u0CAE\u0CC7\u0CB0\u0CBF\u0C95\u0CA8\u0CCD \u0CB8\u0CAE\u0CCB\u0C86",
        [LocaleCode.Kazakh]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438\u0439 \u0421\u0430\u043C\u043E\u0430",
        [LocaleCode.Khmer]: "\u17A2\u17B6\u1798\u17C9\u17B6\u179A\u17B8\u179F\u17D2\u178F\u1784\u17CB",
        [LocaleCode.Korean]: "\uC544\uBA54\uB9AC\uCE74 \uC0AC\uBAA8\uC544",
        [LocaleCode.Kurdish]: "Amerikaans Samoa",
        [LocaleCode.Kyrgyz]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438\u0439 \u0421\u0430\u043C\u043E\u0430",
        [LocaleCode.Lao]: "\u0EAD\u0EB2\u0EA1\u0EB2\u0E99\u0EB2\u0E94\u0EB2\u0EA1\u0EB2\u0E99\u0EB2\u0E94",
        [LocaleCode.Latin]: "Samoa Amerikana",
        [LocaleCode.Latvian]: "Amerikas Samoa",
        [LocaleCode.Lithuanian]: "Amerikos Samoa",
        [LocaleCode.Luxembourgish]: "Amerikaans Samoa",
        [LocaleCode.Macedonian]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0430 \u0421\u0430\u043C\u043E\u0430",
        [LocaleCode.Malagasy]: "Samoa Amerika",
        [LocaleCode.Malay]: "Amerika Samo",
        [LocaleCode.Malayalam]: "\u0D05\u0D2E\u0D47\u0D30\u0D3F\u0D15\u0D4D\u0D15\u0D28\u0D4D\u0D31\u0D4D \u0D38\u0D2E\u0D4B\u0D06",
        [LocaleCode.Maltese]: "Samoa Amerika",
        [LocaleCode.Maori]: "Samoa Amerika",
        [LocaleCode.Marathi]: "\u0905\u092E\u0947\u0930\u093F\u0915\u093E \u0938\u092E\u094B\u0906",
        [LocaleCode.Mongolian]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438\u0439 \u0421\u0430\u043C\u043E\u0430",
        [LocaleCode.Nepali]: "\u0905\u092E\u0947\u0930\u093F\u0915\u093E \u0938\u092E\u094B\u0906",
        [LocaleCode.Norwegian]: "Amerikansk Samoa",
        [LocaleCode.Pashto]: "\u0627\u0645\u0631\u06CC\u06A9\u0627\u06CC \u0633\u0645\u0648\u0627",
        [LocaleCode.Persian]: "\u0622\u0645\u0631\u06CC\u06A9\u0627\u06CC \u0633\u0645\u0648\u0627",
        [LocaleCode.Polish]: "Samoa Ameryka\u0144skie",
        [LocaleCode.Portuguese]: "Samoa Americana",
        [LocaleCode.Punjabi]: "\u0A05\u0A2E\u0A30\u0A40\u0A15\u0A40 \u0A38\u0A3E\u0A2E\u0A4B\u0A06",
        [LocaleCode.Romanian]: "Samoa americane",
        [LocaleCode.Russian]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0430\u044F \u0421\u0430\u043C\u043E\u0430",
        [LocaleCode.Samoan]: "Samoa Amerika",
        [LocaleCode.Sanskrit]: "\u0905\u092E\u0947\u0930\u093F\u0915\u093E \u0938\u092E\u094B\u0906",
        [LocaleCode.Scots]: "Amerikaans Samoa",
        [LocaleCode.Serbian]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0430 \u0421\u0430\u043C\u043E\u0430",
        [LocaleCode.Sesotho]: "Amerikaans Samoa",
        [LocaleCode.Shona]: "Amerikaans Samoa",
        [LocaleCode.Sindhi]: "Amerikaans Samoa",
        [LocaleCode.Sinhala]: "\u0D86\u0DBB\u0DCA\u0DA2\u0DD2\u0DB1\u0DCF\u0DB1\u0DD4 \u0DC3\u0DD0\u0DB8\u0DD0\u0DBD\u0DCA\u0DC0",
        [LocaleCode.Slovak]: "Amerikaans Samoa",
        [LocaleCode.Slovenian]: "Amerikaans Samoa",
        [LocaleCode.Somali]: "Amerikaans Samoa",
        [LocaleCode.Spanish]: "Samoa Americana",
        [LocaleCode.Sudanese]: "Amerikaans Samoa",
        [LocaleCode.Swahili]: "Amerikaans Samoa",
        [LocaleCode.Swedish]: "Amerikansk Samoa",
        [LocaleCode.Tagalog]: "Amerikaans Samoa",
        [LocaleCode.Tajik]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438 \u0441\u0430\u043C\u043E\u0430",
        [LocaleCode.Tamil]: "\u0B85\u0BAE\u0BC6\u0BB0\u0BBF\u0B95\u0BCD \u0B9A\u0BAE\u0BCB\u0BB5\u0BBE",
        [LocaleCode.Tatar]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438 \u0441\u0430\u043C\u043E\u0430",
        [LocaleCode.Telugu]: "\u0C05\u0C2E\u0C46\u0C30\u0C3F\u0C15\u0C4D \u0C38\u0C2E\u0C4B\u0C35\u0C3E",
        [LocaleCode.Thai]: "\u0E2A\u0E2B\u0E23\u0E32\u0E0A\u0E2D\u0E32\u0E13\u0E32\u0E08\u0E31\u0E01\u0E23\u0E41\u0E2D\u0E1F\u0E23\u0E34\u0E01\u0E32",
        [LocaleCode.Tibetan]: "\u0F68\u0F7A\u0F0B\u0F62\u0F72\u0F0B\u0F40\u0F0B\u0F68\u0F7A\u0F0B\u0F58\u0F72\u0F0B\u0F51\u0F74\u0F0B\u0F61\u0F72\u0F0B\u0F62\u0F72\u0F0B\u0F40",
        [LocaleCode.Turkish]: "Amerikan Samoas\u0131",
        [LocaleCode.Ukrainian]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u044C\u043A\u0430 \u0421\u0430\u043C\u043E\u0430",
        [LocaleCode.Urdu]: "\u0627\u0645\u0631\u06CC\u06A9\u06CC \u0633\u0645\u0648\u0627",
        [LocaleCode.Uzbek]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438 \u0441\u0430\u043C\u043E\u0430",
        [LocaleCode.Vietnamese]: "Amerikaans Samoa",
        [LocaleCode.Welsh]: "Amerikaans Samoa",
        [LocaleCode.Xhosa]: "Amerikaans Samoa",
        [LocaleCode.Yiddish]: "Amerikaans Samoa",
        [LocaleCode.Yoruba]: "Amerikaans Samoa",
        [LocaleCode.Zulu]: "Amerikaans Samoa"
      }
    },
    statistics: {
      demographics: {
        age: {
          distribution: [
            { age: "0 to 14 years", percentage: 15.3 },
            { age: "15 to 64 years", percentage: 66.7 },
            { age: "65 years and over", percentage: 14.6 }
          ],
          median_age: 35.5
        },
        population: {
          largest_city: "Pago Pago",
          total: 558e3
        }
      },
      geography: {
        area: 199,
        region: Region.Oceania,
        sub_region: SubRegion.Polynesia
      },
      government: {
        capital: "Pago Pago",
        type: "Nonmetropolitan Territory of the US"
      }
    }
  },
  Andorra: {
    i18n: {
      calling_codes: [376],
      currencies: [CurrencyCode.Euro],
      languages: [LocaleCode.Catalan, LocaleCode.Spanish],
      tz: {
        offsets: [TimezoneOffset.UTC_PLUS_1, TimezoneOffset.UTC_PLUS_2],
        regions: [TimezoneRegions.EuropeAndorra],
        timezones: [Timezones.CentralEuropeanTime]
      }
    },
    id: CountryCode.Andorra,
    info: {
      flag: {
        emoji: "\u{1F1E6}\u{1F1F4}",
        emoji_unicode: "U+1F1E6 U+1F1F4",
        svg: "https://www.countryflags.io/ad/flat/64.svg"
      },
      tld: [".ad"]
    },
    iso: {
      alpha2: CountryCode.Andorra,
      alpha3: "AND",
      numeric: "020"
    },
    name: {
      alt_spellings: ["AD", "Principality of Andorra", "Principat d'Andorra"],
      demonym: "Andorran",
      native: {
        endonym: "Andorra"
      },
      official: "Principality of Andorra",
      short: "Andorra",
      translations: {
        [LocaleCode.Afrikaans]: "Andorra",
        [LocaleCode.Albanian]: "Andorra",
        [LocaleCode.Amharic]: "\u12A0\u1295\u12F6\u122B",
        [LocaleCode.Arabic]: "\u0623\u0646\u062F\u0648\u0631\u0627",
        [LocaleCode.Armenian]: "\u0540\u0561\u0576\u0564\u0561\u0580\u0561\u057E\u0561\u0575\u0584",
        [LocaleCode.Azerbaijani]: "Andorra",
        [LocaleCode.Bashkir]: "\u0410\u043D\u0434\u043E\u0440\u0430",
        [LocaleCode.Basque]: "Andorra",
        [LocaleCode.Belarusian]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430",
        [LocaleCode.Bengali]: "\u0985\u09A8\u09CD\u09A1\u09CB\u09B0\u09BE",
        [LocaleCode.Berber]: "\u0623\u0646\u062F\u0648\u0631\u0627",
        [LocaleCode.Bhutani]: "\u0F68\u0F53\u0F0B\u0F4C\u0F7C\u0F0B",
        [LocaleCode.Bosnian]: "Andora",
        [LocaleCode.Breton]: "Andorra",
        [LocaleCode.Bulgarian]: "\u0410\u043D\u0434\u043E\u0440\u0430",
        [LocaleCode.Burmese]: "\u1021\u1014\u1039\u1010\u102C\u101B\u102D\u102F\u1038",
        [LocaleCode.Catalan]: "Andorra",
        [LocaleCode.Chinese]: "\u5B89\u9053\u5C14",
        [LocaleCode.Croatian]: "Andora",
        [LocaleCode.Czech]: "Andorra",
        [LocaleCode.Danish]: "Andorra",
        [LocaleCode.Dutch]: "Andorra",
        [LocaleCode.English]: "Andorra",
        [LocaleCode.Esperanto]: "Andora",
        [LocaleCode.Estonian]: "Andorra",
        [LocaleCode.Finnish]: "Andorra",
        [LocaleCode.French]: "Andorra",
        [LocaleCode.Frisian]: "Andorra",
        [LocaleCode.Galician]: "Andorra",
        [LocaleCode.Georgian]: "\u12A0\u1295\u12F6\u122B",
        [LocaleCode.German]: "Andorra",
        [LocaleCode.Greek]: "\u0391\u03BD\u03B4\u03CC\u03C1\u03B1",
        [LocaleCode.Hebrew]: "\u05D0\u05E0\u05D3\u05D5\u05E8\u05D4",
        [LocaleCode.Hindi]: "\u0905\u0902\u0921\u094B\u0930\u093E",
        [LocaleCode.Hungarian]: "Andorra",
        [LocaleCode.Icelandic]: "Andorra",
        [LocaleCode.Igbo]: "Andorra",
        [LocaleCode.Indonesian]: "Andorra",
        [LocaleCode.Irish]: "Andorra",
        [LocaleCode.Italian]: "Andorra",
        [LocaleCode.Japanese]: "\u30A2\u30F3\u30C9\u30E9",
        [LocaleCode.Javanese]: "Andorra",
        [LocaleCode.Kannada]: "\u0C85\u0C82\u0CA1\u0CCB\u0CB0\u0CBF\u0CAF\u0CA8\u0CCD",
        [LocaleCode.Kazakh]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430",
        [LocaleCode.Khmer]: "\u17A2\u1784\u17CB\u178A\u17B6\u179A\u17B6",
        [LocaleCode.Korean]: "\uC548\uB3C4\uB77C",
        [LocaleCode.Kurdish]: "Andorra",
        [LocaleCode.Kyrgyz]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430",
        [LocaleCode.Lao]: "\u0EAD\u0EB1\u0E99\u0EC2\u0E94\u0EA3\u0EB2",
        [LocaleCode.Latin]: "Andorra",
        [LocaleCode.Latvian]: "Andora",
        [LocaleCode.Lithuanian]: "Andora",
        [LocaleCode.Luxembourgish]: "Andorra",
        [LocaleCode.Macedonian]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430",
        [LocaleCode.Malagasy]: "Andorra",
        [LocaleCode.Malay]: "Andorra",
        [LocaleCode.Malayalam]: "\u0D05\u0D02\u0D21\u0D4B\u0D30\u0D3F\u0D2F\u0D28\u0D4D",
        [LocaleCode.Maltese]: "Andorra",
        [LocaleCode.Maori]: "Andorra",
        [LocaleCode.Marathi]: "\u0905\u0902\u0921\u094B\u0930\u093E",
        [LocaleCode.Mongolian]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430",
        [LocaleCode.Nepali]: "\u0905\u0902\u0921\u094B\u0930\u093E",
        [LocaleCode.Norwegian]: "Andorra",
        [LocaleCode.Pashto]: "\u0622\u0646\u062F\u0648\u0631\u0627",
        [LocaleCode.Persian]: "\u0622\u0646\u062F\u0648\u0631\u0627",
        [LocaleCode.Polish]: "Andora",
        [LocaleCode.Portuguese]: "Andorra",
        [LocaleCode.Punjabi]: "\u0A05\u0A70\u0A21\u0A4B\u0A30\u0A3E",
        [LocaleCode.Romanian]: "Andorra",
        [LocaleCode.Russian]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430",
        [LocaleCode.Samoan]: "Andorra",
        [LocaleCode.Sanskrit]: "\u0905\u0902\u0921\u094B\u0930\u093E",
        [LocaleCode.Scots]: "Andorra",
        [LocaleCode.Serbian]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430",
        [LocaleCode.Sesotho]: "Andorra",
        [LocaleCode.Shona]: "Andorra",
        [LocaleCode.Sindhi]: "\u0905\u0902\u0921\u094B\u0930\u093E",
        [LocaleCode.Sinhala]: "\u0D86\u0DB1\u0DCA\u0DAF\u0DDA",
        [LocaleCode.Slovak]: "Andorra",
        [LocaleCode.Slovenian]: "Andora",
        [LocaleCode.Somali]: "Andorra",
        [LocaleCode.Spanish]: "Andorra",
        [LocaleCode.Sudanese]: "Andorra",
        [LocaleCode.Swahili]: "Andorra",
        [LocaleCode.Swedish]: "Andorra",
        [LocaleCode.Tagalog]: "Andorra",
        [LocaleCode.Tajik]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430",
        [LocaleCode.Tamil]: "\u0B85\u0BA9\u0BCB\u0BB0\u0BCD\u0B9F\u0BBE",
        [LocaleCode.Tatar]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430",
        [LocaleCode.Telugu]: "\u0C05\u0C02\u0C21\u0C4B\u0C30\u0C4D\u0C30\u0C3E",
        [LocaleCode.Thai]: "\u0E2D\u0E31\u0E19\u0E14\u0E2D\u0E23\u0E4C\u0E23\u0E32",
        [LocaleCode.Tibetan]: "\u0F68\u0F53\u0F0B\u0F4C\u0F7C\u0F0B",
        [LocaleCode.Turkish]: "Andora",
        [LocaleCode.Ukrainian]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430",
        [LocaleCode.Urdu]: "\u0622\u0646\u062F\u0648\u0631\u0627",
        [LocaleCode.Uzbek]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430",
        [LocaleCode.Vietnamese]: "Andorra",
        [LocaleCode.Welsh]: "Andorra",
        [LocaleCode.Xhosa]: "Andorra",
        [LocaleCode.Yiddish]: "\u05D0\u05E0\u05D3\u05D5\u05E8\u05D4",
        [LocaleCode.Yoruba]: "Andorra",
        [LocaleCode.Zulu]: "Andorra"
      }
    },
    statistics: {
      demographics: {
        age: {
          distribution: [
            { age: "0 to 14 years", percentage: 15.3 },
            { age: "15 to 64 years", percentage: 66.7 },
            { age: "65 years and over", percentage: 14.6 }
          ],
          median_age: 35.5
        },
        population: {
          largest_city: "Andorra la Vella",
          total: 78e3
        }
      },
      geography: {
        area: 468,
        region: Region.Europe,
        sub_region: SubRegion.SouthernEurope
      },
      government: {
        capital: "Andorra la Vella",
        type: "Constitutional Monarchy"
      }
    }
  },
  Angola: {
    i18n: {
      calling_codes: [244],
      currencies: [CurrencyCode.AngolaKwanza],
      languages: [
        LocaleCode.Portuguese,
        LocaleCode.Spanish,
        LocaleCode.French,
        LocaleCode.Italian,
        LocaleCode.German,
        LocaleCode.English
      ],
      tz: {
        offsets: [
          TimezoneOffset.UTC_0,
          TimezoneOffset.UTC_PLUS_1,
          TimezoneOffset.UTC_PLUS_2
        ],
        regions: [TimezoneRegions.AfricaLuanda],
        timezones: [Timezones.WestAfricaTime]
      }
    },
    id: CountryCode.Angola,
    info: {
      flag: {
        emoji: "\u{1F1E6}\u{1F1EC}",
        emoji_unicode: "U+1F1E6 U+1F1EC",
        svg: "https://www.countryflags.io/ao/flat/64.svg"
      },
      tld: [".ao"]
    },
    iso: {
      alpha2: CountryCode.Angola,
      alpha3: "AGO",
      numeric: "024"
    },
    name: {
      alt_spellings: ["AO", "Rep\xFAblica de Angola", "\u0281\u025Bpublika de an"],
      demonym: "Angolan",
      native: {
        endonym: "Angola"
      },
      official: "Republic of Angola",
      short: "Angola",
      translations: {
        [LocaleCode.Afrikaans]: "Angola",
        [LocaleCode.Albanian]: "Ang\xF2la",
        [LocaleCode.Amharic]: "\u12A0\u1295\u130E\u120A\u12EB",
        [LocaleCode.Arabic]: "\u0623\u0646\u063A\u0648\u0644\u0627",
        [LocaleCode.Armenian]: "\u0540\u0561\u0576\u0563\u0561\u056C\u0561\u056F\u0561",
        [LocaleCode.Azerbaijani]: "Ang\u0259l",
        [LocaleCode.Bashkir]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Basque]: "Angola",
        [LocaleCode.Belarusian]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Bengali]: "\u0985\u0999\u09CD\u0997\u09B2\u09BE",
        [LocaleCode.Berber]: "Angola",
        [LocaleCode.Bhutani]: "\u0F60\u0F56\u0FB2\u0F74\u0F42",
        [LocaleCode.Bosnian]: "Angola",
        [LocaleCode.Breton]: "Angola",
        [LocaleCode.Bulgarian]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Burmese]: "\u1021\u1004\u103A\u1039\u1002\u101C\u102D\u1010\u103A",
        [LocaleCode.Catalan]: "Angola",
        [LocaleCode.Chinese]: "\u5B89\u54E5\u62C9",
        [LocaleCode.Croatian]: "Angola",
        [LocaleCode.Czech]: "Angola",
        [LocaleCode.Danish]: "Angola",
        [LocaleCode.Dutch]: "Angola",
        [LocaleCode.English]: "Angola",
        [LocaleCode.Esperanto]: "Angolo",
        [LocaleCode.Estonian]: "Angola",
        [LocaleCode.Finnish]: "Angola",
        [LocaleCode.French]: "Angola",
        [LocaleCode.Frisian]: "Angola",
        [LocaleCode.Galician]: "Angola",
        [LocaleCode.Georgian]: "\u10D0\u10DC\u10D2\u10DD\u10DA\u10D0",
        [LocaleCode.German]: "Angola",
        [LocaleCode.Greenlandic]: "Angola",
        [LocaleCode.Greek]: "\u0391\u03B3\u03BA\u03CC\u03BB\u03B1",
        [LocaleCode.Gujarati]: "\u0A85\u0A82\u0A97\u0ACB\u0AB2\u0ABE",
        [LocaleCode.Haitian]: "Angola",
        [LocaleCode.Hausa]: "Angola",
        [LocaleCode.Hebrew]: "\u05D0\u05E0\u05D2\u05D5\u05DC\u05D4",
        [LocaleCode.Hindi]: "\u0905\u0919\u094D\u0917\u094B\u0932\u093E",
        [LocaleCode.Hungarian]: "Angola",
        [LocaleCode.Icelandic]: "Angola",
        [LocaleCode.Igbo]: "Angola",
        [LocaleCode.Indonesian]: "Angola",
        [LocaleCode.Irish]: "Angola",
        [LocaleCode.Italian]: "Angola",
        [LocaleCode.Japanese]: "\u30A2\u30F3\u30B4\u30E9",
        [LocaleCode.Javanese]: "Anggol",
        [LocaleCode.Kannada]: "\u0C85\u0C82\u0C97\u0CCB\u0CB2\u0CBE",
        [LocaleCode.Kazakh]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Khmer]: "\u17A2\u1784\u17CB\u1780\u17B6\u179B\u17A2\u1784\u17CB\u1782\u17D2\u179B\u17C1\u179F",
        [LocaleCode.Korean]: "\uC559\uACE8\uB77C",
        [LocaleCode.Kurdish]: "Angola",
        [LocaleCode.Kyrgyz]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Lao]: "\u0EAD\u0EB0\u0E99\u0EB2\u0E94\u0EB2",
        [LocaleCode.Latin]: "Angola",
        [LocaleCode.Latvian]: "Angola",
        [LocaleCode.Lithuanian]: "Angola",
        [LocaleCode.Luxembourgish]: "Angola",
        [LocaleCode.Macedonian]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Malagasy]: "Angola",
        [LocaleCode.Malay]: "Angola",
        [LocaleCode.Malayalam]: "\u0D05\u0D02\u0D17\u0D4B\u0D33\u0D3E",
        [LocaleCode.Maltese]: "Angola",
        [LocaleCode.Maori]: "Angola",
        [LocaleCode.Marathi]: "\u0905\u0919\u094D\u0917\u094B\u0932\u093E",
        [LocaleCode.Mongolian]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Nepali]: "\u0905\u0919\u094D\u0917\u094B\u0932\u093E",
        [LocaleCode.Norwegian]: "Angola",
        [LocaleCode.Pashto]: "\u0627\u0646\u06AB\u0648\u0644\u0627",
        [LocaleCode.Persian]: "\u0622\u0646\u06AF\u0648\u0644\u0627",
        [LocaleCode.Polish]: "Angola",
        [LocaleCode.Portuguese]: "Angola",
        [LocaleCode.Punjabi]: "\u0A05\u0A19\u0A4D\u0A17\u0A4B\u0A32\u0A3E",
        [LocaleCode.Romanian]: "Angole",
        [LocaleCode.Russian]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Samoan]: "Angola",
        [LocaleCode.Sanskrit]: "\u0905\u0919\u094D\u0917\u094B\u0932\u093E",
        [LocaleCode.Scots]: "Angola",
        [LocaleCode.Serbian]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Sesotho]: "Angola",
        [LocaleCode.Shona]: "Angola",
        [LocaleCode.Sindhi]: "\u0905\u0919\u094D\u0917\u094B\u0932\u093E",
        [LocaleCode.Sinhala]: "\u0D86\u0D9C\u0DBD\u0DD2\u0DBA\u0DCF\u0DC0",
        [LocaleCode.Slovak]: "Angola",
        [LocaleCode.Slovenian]: "Angola",
        [LocaleCode.Somali]: "Angola",
        [LocaleCode.Spanish]: "Angola",
        [LocaleCode.Sudanese]: "Angola",
        [LocaleCode.Swahili]: "Angola",
        [LocaleCode.Swedish]: "Angola",
        [LocaleCode.Tagalog]: "Angola",
        [LocaleCode.Tajik]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Tamil]: "\u0B85\u0B99\u0BCD\u0B95\u0BCB\u0BB2\u0BBE",
        [LocaleCode.Tatar]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Telugu]: "\u0C05\u0C02\u0C17\u0C4B\u0C32\u0C3E",
        [LocaleCode.Thai]: "\u0E2D\u0E07\u0E04\u0E4C\u0E01\u0E32\u0E23\u0E2D\u0E32\u0E19\u0E32\u0E21\u0E34\u0E2A\u0E16\u0E32\u0E19",
        [LocaleCode.Tibetan]: "\u0F68\u0F44\u0F0B\u0F63\u0F7C\u0F0B",
        [LocaleCode.Turkish]: "Angola",
        [LocaleCode.Ukrainian]: "\u0410\u043D\u0433\u043E\u043B\u0430",
        [LocaleCode.Urdu]: "\u0627\u0646\u06AF\u0648\u0644\u0627",
        [LocaleCode.Uzbek]: "Angola",
        [LocaleCode.Vietnamese]: "Angola",
        [LocaleCode.Xhosa]: "Angola",
        [LocaleCode.Welsh]: "Angola",
        [LocaleCode.Yiddish]: "\u05D0\u05E0\u05D2\u05D5\u05DC\u05D4",
        [LocaleCode.Yoruba]: "Angola",
        [LocaleCode.Zulu]: "Angola"
      }
    }
  },
  Anguilla: {
    i18n: {
      calling_codes: [1264],
      currencies: [
        CurrencyCode.DominicaDollar,
        CurrencyCode.EastCaribbeanDollar,
        CurrencyCode.Euro,
        CurrencyCode.UnitedStatesDollar,
        CurrencyCode.BritishPound
      ],
      languages: [LocaleCode.English, LocaleCode.Spanish],
      tz: {
        offsets: [TimezoneOffset.UTC_MINUS_4],
        regions: [TimezoneRegions.AmericaAnguilla],
        timezones: [Timezones.AtlanticStandardTime]
      }
    },
    id: CountryCode.Anguilla,
    info: {
      flag: {
        emoji: "\u{1F1E6}\u{1F1EC}",
        emoji_unicode: "U+1F1E6 U+1F1EC",
        svg: "https://www.countryflags.io/ai/flat/64.svg"
      },
      tld: [".ai"]
    },
    iso: {
      alpha2: CountryCode.Anguilla,
      alpha3: "AIA",
      numeric: "660"
    },
    name: {
      alt_spellings: ["AI"],
      demonym: "Anguillian",
      native: {
        endonym: "Anguilla"
      },
      official: "Anguilla",
      short: "Anguilla",
      translations: {
        [LocaleCode.Afrikaans]: "Anguilla",
        [LocaleCode.Albanian]: "Anguilla",
        [LocaleCode.Amharic]: "\u12A0\u1295\u1309\u120B",
        [LocaleCode.Arabic]: "\u0623\u0646\u063A\u0648\u064A\u0644\u0627",
        [LocaleCode.Armenian]: "\u0531\u0576\u0563\u056B\u056C\u0561",
        [LocaleCode.Azerbaijani]: "Az\u0259rbaycan",
        [LocaleCode.Bashkir]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Basque]: "Angila",
        [LocaleCode.Belarusian]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Bengali]: "\u0985\u0999\u09CD\u0997\u09C0\u09B2\u09BE",
        [LocaleCode.Berber]: "\u0623\u0646\u063A\u0648\u064A\u0644\u0627",
        [LocaleCode.Bhutani]: "\u0F68\u0F44\u0F0B\u0F63\u0F7C\u0F0B",
        [LocaleCode.Bosnian]: "Angila",
        [LocaleCode.Breton]: "Angila",
        [LocaleCode.Bulgarian]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Burmese]: "\u1021\u1004\u103A\u1039\u1002\u101C\u102D\u1010\u103A",
        [LocaleCode.Catalan]: "Angilla",
        [LocaleCode.Chinese]: "\u5B89\u572D\u62C9",
        [LocaleCode.Croatian]: "Angila",
        [LocaleCode.Czech]: "Anguilla",
        [LocaleCode.Danish]: "Anguilla",
        [LocaleCode.Dutch]: "Anguilla",
        [LocaleCode.English]: "Anguilla",
        [LocaleCode.Esperanto]: "Angila",
        [LocaleCode.Estonian]: "Anguilla",
        [LocaleCode.Finnish]: "Anguilla",
        [LocaleCode.French]: "Anguilla",
        [LocaleCode.Frisian]: "Angila",
        [LocaleCode.Galician]: "Anguilla",
        [LocaleCode.Georgian]: "\u10D0\u10DC\u10D2\u10D8\u10DA\u10D0",
        [LocaleCode.German]: "Anguilla",
        [LocaleCode.Greenlandic]: "Anguilla",
        [LocaleCode.Greek]: "\u0391\u03BD\u03B3\u03BA\u03C5\u03BB\u03AC",
        [LocaleCode.Gujarati]: "\u0A85\u0A82\u0A97\u0ACD\u0AAF\u0ABE\u0AB2\u0ABE",
        [LocaleCode.Haitian]: "Anguilla",
        [LocaleCode.Hausa]: "Anguilla",
        [LocaleCode.Hebrew]: "\u05D0\u05E0\u05D2\u05D5\u05D9\u05D0\u05DC\u05D4",
        [LocaleCode.Hindi]: "\u0905\u0902\u0917\u094D\u0935\u0947\u0932\u093E",
        [LocaleCode.Hungarian]: "Anguilla",
        [LocaleCode.Icelandic]: "Anguilla",
        [LocaleCode.Igbo]: "Anguilla",
        [LocaleCode.Indonesian]: "Anguilla",
        [LocaleCode.Irish]: "Anguilla",
        [LocaleCode.Italian]: "Anguilla",
        [LocaleCode.Japanese]: "\u30A2\u30F3\u30AE\u30E9",
        [LocaleCode.Javanese]: "Anguilla",
        [LocaleCode.Kannada]: "\u0C85\u0C82\u0C97\u0CCD\u0CB5\u0CC7\u0CB2\u0CBE",
        [LocaleCode.Kazakh]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Khmer]: "\u17A2\u1784\u17CB\u1780\u17B6\u179A\u17A0\u17D2\u1782\u17B8\u1798",
        [LocaleCode.Korean]: "\uC575\uADC8\uB77C",
        [LocaleCode.Kurdish]: "Anguilla",
        [LocaleCode.Kyrgyz]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Lao]: "\u0EAD\u0EB0\u0E99\u0EB0\u0E88\u0EB3",
        [LocaleCode.Latin]: "Anguilla",
        [LocaleCode.Latvian]: "Anguilla",
        [LocaleCode.Lithuanian]: "Anguilla",
        [LocaleCode.Luxembourgish]: "Angilla",
        [LocaleCode.Macedonian]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Malagasy]: "Angila",
        [LocaleCode.Malay]: "Anguilla",
        [LocaleCode.Malayalam]: "\u0D05\u0D02\u0D17\u0D4D\u0D35\u0D47\u0D32\u0D3E",
        [LocaleCode.Maltese]: "Anguilla",
        [LocaleCode.Maori]: "Anguilla",
        [LocaleCode.Marathi]: "\u0905\u0902\u0917\u094D\u0935\u0947\u0932\u093E",
        [LocaleCode.Mongolian]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Nepali]: "\u0905\u0902\u0917\u094D\u0935\u0947\u0932\u093E",
        [LocaleCode.Norwegian]: "Anguilla",
        [LocaleCode.Pashto]: "\u0622\u0646\u06AF\u0648\u0644\u0627",
        [LocaleCode.Persian]: "\u0622\u0646\u06AF\u0648\u0644\u0627",
        [LocaleCode.Polish]: "Anguilla",
        [LocaleCode.Portuguese]: "Anguilla",
        [LocaleCode.Punjabi]: "\u0A05\u0A02\u0A17\u0A40\u0A32\u0A3E",
        [LocaleCode.Romanian]: "Anguilla",
        [LocaleCode.Russian]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Samoan]: "Anguilla",
        [LocaleCode.Sanskrit]: "\u0905\u0902\u0917\u094D\u0935\u0947\u0932\u093E",
        [LocaleCode.Scots]: "Anguilla",
        [LocaleCode.Serbian]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Sesotho]: "Anguilla",
        [LocaleCode.Shona]: "Anguilla",
        [LocaleCode.Sindhi]: "\u0905\u0902\u0917\u094D\u0935\u0947\u0932\u093E",
        [LocaleCode.Sinhala]: "\u0D86\u0D82\u0D9C\u0DD2\u0DBD\u0DCF\u0DC0",
        [LocaleCode.Slovak]: "Anguilla",
        [LocaleCode.Slovenian]: "Anguilla",
        [LocaleCode.Somali]: "Anguilla",
        [LocaleCode.Spanish]: "Anguilla",
        [LocaleCode.Sudanese]: "Anguilla",
        [LocaleCode.Swahili]: "Anguilla",
        [LocaleCode.Swedish]: "Anguilla",
        [LocaleCode.Tagalog]: "Anguilla",
        [LocaleCode.Tajik]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Tamil]: "\u0B85\u0B99\u0BCD\u0B95\u0BC8\u0BB2\u0BBE",
        [LocaleCode.Tatar]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Telugu]: "\u0C05\u0C02\u0C17\u0C4D\u0C35\u0C47\u0C32\u0C3E",
        [LocaleCode.Thai]: "\u0E2D\u0E31\u0E07\u0E01\u0E32\u0E25\u0E32",
        [LocaleCode.Tibetan]: "\u0F68\u0F44\u0F0B\u0F63\u0F72\u0F0B",
        [LocaleCode.Turkish]: "Anguilla",
        [LocaleCode.Ukrainian]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Urdu]: "\u0622\u0646\u06AF\u0648\u0644\u0627",
        [LocaleCode.Uzbek]: "\u0410\u043D\u0433\u0438\u043B\u0438",
        [LocaleCode.Vietnamese]: "Anguilla",
        [LocaleCode.Welsh]: "Anguilla",
        [LocaleCode.Xhosa]: "Anguilla",
        [LocaleCode.Yiddish]: "Anguilla",
        [LocaleCode.Yoruba]: "Anguilla",
        [LocaleCode.Zulu]: "Anguilla"
      }
    }
  },
  Antarctica: {
    i18n: {
      calling_codes: [672],
      currencies: [CurrencyCode.UnitedStatesDollar, CurrencyCode.Euro],
      languages: [
        LocaleCode.English,
        LocaleCode.Spanish,
        LocaleCode.French,
        LocaleCode.Portuguese,
        LocaleCode.Italian,
        LocaleCode.Dutch,
        LocaleCode.German,
        LocaleCode.Swedish,
        LocaleCode.Norwegian,
        LocaleCode.Danish,
        LocaleCode.Finnish
      ],
      tz: {
        offsets: [TimezoneOffset.UTC_PLUS_1, TimezoneOffset.UTC_PLUS_2],
        regions: [
          TimezoneRegions.AntarcticaCasey,
          TimezoneRegions.AntarcticaDavis,
          TimezoneRegions.AntarcticaMcMurdo,
          TimezoneRegions.AntarcticaPalmer,
          TimezoneRegions.AntarcticaRothera
        ],
        timezones: [
          Timezones.AtlanticStandardTime,
          Timezones.CentralTime,
          Timezones.EasternTime,
          Timezones.AtlanticStandardTime,
          Timezones.AzoresStandardTime,
          Timezones.NewfoundlandStandardTime
        ]
      }
    },
    id: CountryCode.Antarctica,
    info: {
      flag: {
        emoji: "\u{1F1E6}\u{1F1F6}",
        emoji_unicode: "U+1F1E6 U+1F1F6",
        svg: "https://www.countryflags.io/aq/flat/64.svg"
      },
      tld: [".aq"]
    },
    iso: {
      alpha2: CountryCode.Antarctica,
      alpha3: "ATA",
      numeric: "010"
    },
    name: {
      alt_spellings: ["AQ"],
      demonym: "Antarctican",
      native: {
        endonym: "Antarctica"
      },
      official: "Antarctica",
      short: "Antarctica",
      translations: {
        [LocaleCode.Afrikaans]: "Antarctica",
        [LocaleCode.Albanian]: "Antarktika",
        [LocaleCode.Amharic]: "\u12A0\u1295\u1272\u120D\u12AB\u1293",
        [LocaleCode.Arabic]: "\u0623\u0646\u062A\u0627\u0631\u0643\u062A\u064A\u0643\u0627",
        [LocaleCode.Armenian]: "\u0540\u0561\u0576\u0561\u0580\u0561\u057F\u056F\u0578",
        [LocaleCode.Azerbaijani]: "Az\u0259rbaycan",
        [LocaleCode.Bashkir]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Basque]: "Antarktika",
        [LocaleCode.Belarusian]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Bengali]: "\u0985\u09A8\u09CD\u09A4\u09B0\u09BE\u09B6\u09CD\u09AC\u09C0",
        [LocaleCode.Berber]: "\u0623\u0646\u062A\u0627\u0631\u0643\u062A\u064A\u0643\u0627",
        [LocaleCode.Bhutani]: "\u0F68\u0F44\u0F0B\u0F63\u0F72\u0F0B",
        [LocaleCode.Bosnian]: "Antarktika",
        [LocaleCode.Breton]: "Antarktika",
        [LocaleCode.Bulgarian]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Burmese]: "\u1021\u1014\u1039\u1010\u102C\u101B\u102E\u1038\u101A\u102C\u1038",
        [LocaleCode.Catalan]: "Ant\xE0rtida",
        [LocaleCode.Chinese]: "\u5357\u6781\u6D32",
        [LocaleCode.Croatian]: "Antarktika",
        [LocaleCode.Czech]: "Antarktida",
        [LocaleCode.Danish]: "Antarktis",
        [LocaleCode.Dutch]: "Antarctica",
        [LocaleCode.English]: "Antarctica",
        [LocaleCode.Esperanto]: "Antarktika",
        [LocaleCode.Estonian]: "Antarktika",
        [LocaleCode.Finnish]: "Antarktis",
        [LocaleCode.French]: "Antarctica",
        [LocaleCode.Frisian]: "Antarktis",
        [LocaleCode.Galician]: "Ant\xE1rtida",
        [LocaleCode.Georgian]: "\u10D0\u10DC\u10E2\u10D0\u10E0\u10E5\u10E2\u10D8\u10D9\u10D0",
        [LocaleCode.German]: "Antarktis",
        [LocaleCode.Greenlandic]: "Antarktis",
        [LocaleCode.Greek]: "\u0391\u03BD\u03C4\u03B1\u03C1\u03BA\u03C4\u03B9\u03BA\u03AE",
        [LocaleCode.Gujarati]: "\u0A85\u0AA8\u0ACD\u0AA4\u0AB0\u0ABE\u0AB6\u0ACD\u0AB5\u0AC0",
        [LocaleCode.Haitian]: "Antarctica",
        [LocaleCode.Hausa]: "Antarktika",
        [LocaleCode.Hebrew]: "\u05D0\u05E0\u05D8\u05E8\u05E7\u05D8\u05D9\u05E7\u05D4",
        [LocaleCode.Hindi]: "\u0905\u0928\u094D\u0924\u0930\u0915\u094D\u0937\u0947\u0924\u094D\u0930",
        [LocaleCode.Hungarian]: "Antarktika",
        [LocaleCode.Icelandic]: "Antarktis",
        [LocaleCode.Igbo]: "Antarktika",
        [LocaleCode.Indonesian]: "Antarktika",
        [LocaleCode.Irish]: "Antarktika",
        [LocaleCode.Italian]: "Antartide",
        [LocaleCode.Japanese]: "\u5357\u6975",
        [LocaleCode.Javanese]: "Antarktika",
        [LocaleCode.Kannada]: "\u0C85\u0CA8\u0CCD\u0CA4\u0CB0\u0CBE\u0CB6\u0CCD\u0CB5\u0CBF",
        [LocaleCode.Kazakh]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Khmer]: "\u17A2\u1784\u17CB\u179F\u17D2\u1780\u179A\u17A2\u17B6\u1798\u17C9\u17BB\u1799",
        [LocaleCode.Korean]: "\uC564\uD2F0\uCE74\uD1A0\uB2C9",
        [LocaleCode.Kurdish]: "Antarktika",
        [LocaleCode.Kyrgyz]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Lao]: "\u0EAD\u0EB0\u0E99\u0EAD\u0EA5\u0EB2\u0E81\u0EB4\u0EAA\u0EB0",
        [LocaleCode.Latin]: "Antarctica",
        [LocaleCode.Latvian]: "Antarktika",
        [LocaleCode.Lithuanian]: "Antarktis",
        [LocaleCode.Luxembourgish]: "Antarktis",
        [LocaleCode.Macedonian]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Malagasy]: "Antarctica",
        [LocaleCode.Malay]: "Antarktika",
        [LocaleCode.Malayalam]: "\u0D05\u0D28\u0D4D\u0D24\u0D30\u0D3E\u0D36\u0D4D\u0D35\u0D3F",
        [LocaleCode.Maltese]: "Antarktika",
        [LocaleCode.Maori]: "Antarktika",
        [LocaleCode.Marathi]: "\u0905\u0928\u094D\u0924\u0930\u093E\u0936\u094D\u0935\u093F\u0915\u093E",
        [LocaleCode.Mongolian]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Nepali]: "\u0905\u0928\u094D\u0924\u0930\u093E\u0936\u094D\u0935\u093F\u0915\u093E",
        [LocaleCode.Norwegian]: "Antarktis",
        [LocaleCode.Pashto]: "\u0627\u0646\u062A\u0627\u0631\u0643\u062A\u064A\u0643\u0627",
        [LocaleCode.Persian]: "\u0622\u0646\u062A\u0627\u0631\u06A9\u062A\u06CC\u06A9\u0627",
        [LocaleCode.Polish]: "Antarktyka",
        [LocaleCode.Portuguese]: "Ant\xE1rtida",
        [LocaleCode.Punjabi]: "\u0A05\u0A28\u0A4D\u0A24\u0A30\u0A3E\u0A36\u0A3F\u0A15\u0A3E",
        [LocaleCode.Romanian]: "Antarctica",
        [LocaleCode.Russian]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Samoan]: "Antarktika",
        [LocaleCode.Sanskrit]: "\u0905\u0928\u094D\u0924\u0930\u093E\u0936\u094D\u0935\u093F\u0915\u093E",
        [LocaleCode.Scots]: "Antarktika",
        [LocaleCode.Serbian]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Sesotho]: "Antarktika",
        [LocaleCode.Shona]: "Antarktika",
        [LocaleCode.Sindhi]: "Antarktika",
        [LocaleCode.Sinhala]: "\u0D86\u0DB1\u0DCA\u0DA7\u0DCA\u0DA7\u0DD2\u0D9A\u0DCF\u0DC0",
        [LocaleCode.Slovak]: "Antarktika",
        [LocaleCode.Slovenian]: "Antarktika",
        [LocaleCode.Somali]: "Antarktika",
        [LocaleCode.Spanish]: "Ant\xE1rtida",
        [LocaleCode.Sudanese]: "Antarktika",
        [LocaleCode.Swahili]: "Antarktika",
        [LocaleCode.Swedish]: "Antarktis",
        [LocaleCode.Tagalog]: "Antarktika",
        [LocaleCode.Tajik]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Tamil]: "\u0B85\u0BA9\u0BCD\u0BA4\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BBF\u0B95\u0BCD",
        [LocaleCode.Tatar]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Telugu]: "\u0C05\u0C28\u0C4D\u0C24\u0C30\u0C3E\u0C36\u0C4D\u0C35\u0C3F\u0C15\u0C3E",
        [LocaleCode.Thai]: "\u0E20\u0E39\u0E21\u0E34\u0E20\u0E32\u0E04\u0E2D\u0E32\u0E19\u0E31\u0E19\u0E15\u0E34\u0E01\u0E32",
        [LocaleCode.Tibetan]: "\u0F68\u0F7A\u0F53\u0F0B\u0F4A\u0F72\u0F4A\u0F7A\u0F53\u0F0B\u0F40\u0F72\u0F66\u0F72\u0F0B\u0F68\u0F7A\u0F53\u0F0B\u0F4A\u0F72\u0F4A\u0F7A\u0F53\u0F0B\u0F40\u0F72\u0F66\u0F72",
        [LocaleCode.Turkish]: "Antarktika",
        [LocaleCode.Ukrainian]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Urdu]: "\u0627\u0646\u062A\u0627\u0631\u06A9\u062A\u06CC\u06A9\u0627",
        [LocaleCode.Uzbek]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430",
        [LocaleCode.Vietnamese]: "\u0110\u1EA5t Antarktik",
        [LocaleCode.Welsh]: "Antarktika",
        [LocaleCode.Xhosa]: "Antarktika",
        [LocaleCode.Yiddish]: "Antarktika",
        [LocaleCode.Yoruba]: "Antarktika",
        [LocaleCode.Zulu]: "Antarktika"
      }
    }
  },
  Armenia: {
    i18n: {
      calling_codes: [374],
      currencies: [CurrencyCode.ArmeniaDram],
      languages: [LocaleCode.Armenian],
      tz: {
        offsets: [TimezoneOffset.UTC_PLUS_4],
        regions: [TimezoneRegions.AsiaJakarta],
        timezones: [Timezones.ArmeniaTime]
      }
    },
    id: CountryCode.Armenia,
    info: {
      flag: {
        emoji: "\u{1F1E6}\u{1F1F2}",
        emoji_unicode: "U+1F1E6 U+1F1F2",
        svg: "https://www.countryflags.io/am/flat/64.svg"
      },
      tld: [".am"]
    },
    iso: {
      alpha2: CountryCode.Armenia,
      alpha3: "ARM",
      numeric: "051"
    },
    name: {
      alt_spellings: ["AM", "Hayastan", "Republic of Armenia", "\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576"],
      demonym: "Armenian",
      native: {
        endonym: "\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576"
      },
      official: "Republic of Armenia",
      short: "Armenia",
      translations: {
        [LocaleCode.Afrikaans]: "Armeni\xEB",
        [LocaleCode.Albanian]: "Armenia",
        [LocaleCode.Amharic]: "\u12A0\u121B\u122D\u129B",
        [LocaleCode.Arabic]: "\u0623\u0631\u0645\u064A\u0646\u064A\u0627",
        [LocaleCode.Armenian]: "\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576",
        [LocaleCode.Azerbaijani]: "Az\u0259rbaycan",
        [LocaleCode.Bashkir]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F",
        [LocaleCode.Basque]: "Arm\xE9nia",
        [LocaleCode.Belarusian]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F",
        [LocaleCode.Bengali]: "\u0986\u09B0\u09CD\u09AE\u09C7\u09A8\u09BF",
        [LocaleCode.Berber]: "\u0623\u0631\u0645\u064A\u0646\u064A\u0627",
        [LocaleCode.Bhutani]: "\u0F62\u0F92\u0FB1\u0F0B\u0F53\u0F42",
        [LocaleCode.Bosnian]: "Armenija",
        [LocaleCode.Breton]: "Armeni\xEB",
        [LocaleCode.Bulgarian]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F",
        [LocaleCode.Burmese]: "\u1021\u102C\u1019\u1010\u102D\u1010\u1039",
        [LocaleCode.Catalan]: "Arm\xE8nia",
        [LocaleCode.Chinese]: "\u4E9A\u7F8E\u5C3C\u4E9A",
        [LocaleCode.Croatian]: "Armenija",
        [LocaleCode.Czech]: "Arm\xE9nie",
        [LocaleCode.Danish]: "Armenien",
        [LocaleCode.Dutch]: "Armeni\xEB",
        [LocaleCode.English]: "Armenia",
        [LocaleCode.Esperanto]: "Armenia",
        [LocaleCode.Estonian]: "Armeenia",
        [LocaleCode.Finnish]: "Armenia",
        [LocaleCode.French]: "Armenia",
        [LocaleCode.Frisian]: "Armeenia",
        [LocaleCode.Galician]: "Arm\xE9nia",
        [LocaleCode.Georgian]: "\u10D0\u10E0\u10DB\u10DD\u10DC\u10D8",
        [LocaleCode.German]: "Armenien",
        [LocaleCode.Greenlandic]: "Armenia",
        [LocaleCode.Greek]: "\u0391\u03C1\u03BC\u03B5\u03BD\u03AF\u03B1",
        [LocaleCode.Gujarati]: "\u0A85\u0AB0\u0ACD\u0AAE\u0AC7\u0AA8\u0ABF",
        [LocaleCode.Haitian]: "Armenia",
        [LocaleCode.Hausa]: "Armenia",
        [LocaleCode.Hebrew]: "\u05D0\u05E8\u05DE\u05E0\u05D9\u05D4",
        [LocaleCode.Hindi]: "\u0905\u05E8\u05DE\u05E0\u093F\u092F\u093E",
        [LocaleCode.Hungarian]: "\xD6rm\xE9nyorsz\xE1g",
        [LocaleCode.Icelandic]: "Armenia",
        [LocaleCode.Igbo]: "Armenia",
        [LocaleCode.Indonesian]: "Armenia",
        [LocaleCode.Irish]: "Armenia",
        [LocaleCode.Italian]: "Armenia",
        [LocaleCode.Japanese]: "\u30A2\u30EB\u30E1\u30CB\u30A2",
        [LocaleCode.Javanese]: "Armenia",
        [LocaleCode.Kannada]: "\u0C85\u0CB0\u0CCD\u0CAE\u0CC7\u0CA8\u0CBF",
        [LocaleCode.Kazakh]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F",
        [LocaleCode.Khmer]: "\u17A2\u17B6\u1798\u17C9\u17C1\u179A\u17B8",
        [LocaleCode.Korean]: "\uC544\uB974\uBA54\uB2C8\uC544",
        [LocaleCode.Kurdish]: "Armenia",
        [LocaleCode.Kyrgyz]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F",
        [LocaleCode.Lao]: "\u0EAD\u0EB2\u0EAB\u0EBC\u0E99\u0EB2",
        [LocaleCode.Latin]: "Armenia",
        [LocaleCode.Latvian]: "Armeenia",
        [LocaleCode.Lithuanian]: "Arm\u0117nija",
        [LocaleCode.Luxembourgish]: "Armenien",
        [LocaleCode.Macedonian]: "\u0410\u0440\u043C\u0435\u043D\u0438\u0458\u0430",
        [LocaleCode.Malagasy]: "Armenia",
        [LocaleCode.Malay]: "Armenia",
        [LocaleCode.Malayalam]: "\u0D05\u0D30\u0D4D\u200D\u0D2E\u0D47\u0D28\u0D3F",
        [LocaleCode.Maltese]: "Armenia",
        [LocaleCode.Maori]: "Armenia",
        [LocaleCode.Marathi]: "\u0905\u0930\u094D\u092E\u0947\u0928\u093F",
        [LocaleCode.Mongolian]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F",
        [LocaleCode.Nepali]: "\u0905\u0930\u094D\u092E\u0947\u0928\u093F",
        [LocaleCode.Norwegian]: "Armenia",
        [LocaleCode.Pashto]: "\u0622\u0631\u0645\u06CC\u0646\u06CC\u0627",
        [LocaleCode.Persian]: "\u0627\u0631\u0645\u0646\u0633\u062A\u0627\u0646",
        [LocaleCode.Polish]: "Armenia",
        [LocaleCode.Portuguese]: "Armenia",
        [LocaleCode.Punjabi]: "\u0A05\u0A30\u0A2E\u0A40\u0A28\u0A40",
        [LocaleCode.Romanian]: "Armenia",
        [LocaleCode.Russian]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F",
        [LocaleCode.Samoan]: "Armenia",
        [LocaleCode.Sanskrit]: "Armenia",
        [LocaleCode.Scots]: "Armenia",
        [LocaleCode.Serbian]: "\u0410\u0440\u043C\u0435\u043D\u0438\u0458\u0430",
        [LocaleCode.Sesotho]: "Armenia",
        [LocaleCode.Shona]: "Armenia",
        [LocaleCode.Sindhi]: "Armenia",
        [LocaleCode.Sinhala]: "\u0D86\u0DBB\u0DCA\u0DB8\u0DD3\u0DB1\u0DD2",
        [LocaleCode.Slovak]: "Armenia",
        [LocaleCode.Slovenian]: "Armenija",
        [LocaleCode.Somali]: "Armenia",
        [LocaleCode.Spanish]: "Armenia",
        [LocaleCode.Sudanese]: "Armenia",
        [LocaleCode.Swahili]: "Armenia",
        [LocaleCode.Swedish]: "Armenien",
        [LocaleCode.Tagalog]: "Armenia",
        [LocaleCode.Tajik]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F",
        [LocaleCode.Tamil]: "\u0B85\u0BB0\u0BCD\u0BAE\u0BC7\u0BA9\u0BBF\u0BAF\u0BA9\u0BCD",
        [LocaleCode.Tatar]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F",
        [LocaleCode.Telugu]: "\u0C05\u0C30\u0C4D\u0C2E\u0C47\u0C28\u0C3F",
        [LocaleCode.Thai]: "\u0E2D\u0E32\u0E23\u0E4C\u0E40\u0E21\u0E19\u0E34\u0E2A\u0E16\u0E32\u0E19",
        [LocaleCode.Tibetan]: "\u0F68\u0F62\u0F0B\u0F58\u0F7A\u0F0B\u0F53\u0F72\u0F0B\u0F61\u0F74\u0F0D",
        [LocaleCode.Turkish]: "Ermenistan",
        [LocaleCode.Ukrainian]: "\u0410\u0440\u043C\u0435\u043D\u0456\u044F",
        [LocaleCode.Urdu]: "\u0627\u0631\u0645\u0646\u0633\u062A\u0627\u0646",
        [LocaleCode.Uzbek]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F",
        [LocaleCode.Vietnamese]: "Armenia",
        [LocaleCode.Welsh]: "Armenia",
        [LocaleCode.Xhosa]: "Armenia",
        [LocaleCode.Yiddish]: "\u05D0\u05E8\u05DE\u05E0\u05D9\u05D4",
        [LocaleCode.Yoruba]: "Armenia",
        [LocaleCode.Zulu]: "Armenia"
      }
    }
  },
  SomeCountry: {
    i18n: {
      calling_codes: [],
      currencies: [],
      languages: [],
      tz: {
        offsets: [],
        regions: [],
        timezones: []
      }
    },
    id: CountryCode.AmericanSamoa,
    info: {
      flag: {
        emoji: "",
        emoji_unicode: "",
        svg: ""
      },
      tld: []
    },
    iso: {
      alpha2: CountryCode.AmericanSamoa,
      alpha3: "",
      numeric: ""
    },
    name: {
      alt_spellings: [],
      demonym: "",
      native: {
        endonym: ""
      },
      official: "",
      short: "",
      translations: {
        [LocaleCode.Afrikaans]: "",
        [LocaleCode.Albanian]: "",
        [LocaleCode.Amharic]: "",
        [LocaleCode.Arabic]: "",
        [LocaleCode.Armenian]: "",
        [LocaleCode.Azerbaijani]: "",
        [LocaleCode.Bashkir]: "",
        [LocaleCode.Basque]: "",
        [LocaleCode.Belarusian]: "",
        [LocaleCode.Bengali]: "",
        [LocaleCode.Berber]: "",
        [LocaleCode.Bhutani]: "",
        [LocaleCode.Bosnian]: "",
        [LocaleCode.Breton]: "",
        [LocaleCode.Bulgarian]: "",
        [LocaleCode.Burmese]: "",
        [LocaleCode.Catalan]: "",
        [LocaleCode.Chinese]: "",
        [LocaleCode.Croatian]: "",
        [LocaleCode.Czech]: "",
        [LocaleCode.Danish]: "",
        [LocaleCode.Dutch]: "",
        [LocaleCode.English]: "",
        [LocaleCode.Esperanto]: "",
        [LocaleCode.Estonian]: "",
        [LocaleCode.Finnish]: "",
        [LocaleCode.French]: "",
        [LocaleCode.Frisian]: "",
        [LocaleCode.Galician]: "",
        [LocaleCode.Georgian]: "",
        [LocaleCode.German]: "",
        [LocaleCode.Greenlandic]: "",
        [LocaleCode.Greek]: "",
        [LocaleCode.Gujarati]: "",
        [LocaleCode.Haitian]: "",
        [LocaleCode.Hausa]: "",
        [LocaleCode.Hebrew]: "",
        [LocaleCode.Hindi]: "",
        [LocaleCode.Hungarian]: "",
        [LocaleCode.Icelandic]: "",
        [LocaleCode.Igbo]: "",
        [LocaleCode.Indonesian]: "",
        [LocaleCode.Irish]: "",
        [LocaleCode.Italian]: "",
        [LocaleCode.Japanese]: "",
        [LocaleCode.Javanese]: "",
        [LocaleCode.Kannada]: "",
        [LocaleCode.Kazakh]: "",
        [LocaleCode.Khmer]: "",
        [LocaleCode.Korean]: "",
        [LocaleCode.Kurdish]: "",
        [LocaleCode.Kyrgyz]: "",
        [LocaleCode.Lao]: "",
        [LocaleCode.Latin]: "",
        [LocaleCode.Latvian]: "",
        [LocaleCode.Lithuanian]: "",
        [LocaleCode.Luxembourgish]: "",
        [LocaleCode.Macedonian]: "",
        [LocaleCode.Malagasy]: "",
        [LocaleCode.Malay]: "",
        [LocaleCode.Malayalam]: "",
        [LocaleCode.Maltese]: "",
        [LocaleCode.Maori]: "",
        [LocaleCode.Marathi]: "",
        [LocaleCode.Mongolian]: "",
        [LocaleCode.Nepali]: "",
        [LocaleCode.Norwegian]: "",
        [LocaleCode.Pashto]: "",
        [LocaleCode.Persian]: "",
        [LocaleCode.Polish]: "",
        [LocaleCode.Portuguese]: "",
        [LocaleCode.Punjabi]: "",
        [LocaleCode.Romanian]: "",
        [LocaleCode.Russian]: "",
        [LocaleCode.Samoan]: "",
        [LocaleCode.Sanskrit]: "",
        [LocaleCode.Scots]: "",
        [LocaleCode.Serbian]: "",
        [LocaleCode.Sesotho]: "",
        [LocaleCode.Shona]: "",
        [LocaleCode.Sindhi]: "",
        [LocaleCode.Sinhala]: "",
        [LocaleCode.Slovak]: "",
        [LocaleCode.Slovenian]: "",
        [LocaleCode.Somali]: "",
        [LocaleCode.Spanish]: "",
        [LocaleCode.Sudanese]: "",
        [LocaleCode.Swahili]: "",
        [LocaleCode.Swedish]: "",
        [LocaleCode.Tagalog]: "",
        [LocaleCode.Tajik]: "",
        [LocaleCode.Tamil]: "",
        [LocaleCode.Tatar]: "",
        [LocaleCode.Telugu]: "",
        [LocaleCode.Thai]: "",
        [LocaleCode.Tibetan]: "",
        [LocaleCode.Turkish]: "",
        [LocaleCode.Ukrainian]: "",
        [LocaleCode.Urdu]: "",
        [LocaleCode.Uzbek]: "",
        [LocaleCode.Vietnamese]: "",
        [LocaleCode.Welsh]: "",
        [LocaleCode.Xhosa]: "",
        [LocaleCode.Yiddish]: "",
        [LocaleCode.Yoruba]: "",
        [LocaleCode.Zulu]: ""
      }
    }
  }
};

// ../types/dist/i18n/locale/locales.js
var Afrikaans = {
  id: LocaleCode.Afrikaans,
  language: {
    code: LanguageCode.Afrikaans,
    name: "Afrikaans",
    native: "Afrikaans"
  },
  name: "Afrikaans",
  native_name: "Afrikaans",
  rtl: false
};
var AfrikaansSouthAfrica = {
  country: {
    code: CountryCode.SouthAfrica,
    name: "South Africa",
    native: "South Africa"
  },
  id: LocaleCode.AfrikaansSouthAfrica,
  language: {
    code: LanguageCode.Afrikaans,
    name: "Afrikaans",
    native: "Afrikaans"
  },
  name: "Afrikaans (South Africa)",
  native_name: "Afrikaans (Suid-Afrika)",
  rtl: false
};
var Albanian = {
  id: LocaleCode.Albanian,
  language: {
    code: LanguageCode.Albanian,
    name: "Albanian",
    native: "Shqip"
  },
  name: "Albanian",
  native_name: "Shqip",
  rtl: false
};
var AlbanianAlbania = {
  country: {
    code: CountryCode.Albania,
    name: "Albania",
    native: "Shqip\xEBria"
  },
  id: LocaleCode.AlbanianAlbania,
  language: {
    code: LanguageCode.Albanian,
    name: "Albanian",
    native: "Shqip"
  },
  name: "Albanian (Albania)",
  native_name: "Shqip (Shqip\xEBria)",
  rtl: false
};
var Amharic = {
  id: LocaleCode.Amharic,
  language: {
    code: LanguageCode.Amharic,
    name: "Amharic",
    native: "\u12A0\u121B\u122D\u129B"
  },
  name: "Amharic",
  native_name: "\u12A0\u121B\u122D\u129B",
  rtl: false
};
var AmharicEthiopia = {
  country: {
    code: CountryCode.Ethiopia,
    name: "Ethiopia",
    native: "\u12A2\u1275\u12EE\u1335\u12EB"
  },
  id: LocaleCode.AmharicEthiopia,
  language: {
    code: LanguageCode.Amharic,
    name: "Amharic",
    native: "\u12A0\u121B\u122D\u129B"
  },
  name: "Amharic (Ethiopia)",
  native_name: "\u12A0\u121B\u122D\u129B (\u12A2\u1275\u12EE\u1335\u12EB)",
  rtl: false
};
var Arabic = {
  id: LocaleCode.Arabic,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
  rtl: true
};
var ArabicAlgeria = {
  country: {
    code: CountryCode.Algeria,
    name: "Algeria",
    native: "\u0627\u0644\u062C\u0632\u0627\u0626\u0631"
  },
  id: LocaleCode.ArabicAlgeria,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Algeria)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u062C\u0632\u0627\u0626\u0631)",
  rtl: true
};
var ArabicBahrain = {
  country: {
    code: CountryCode.Bahrain,
    name: "Bahrain",
    native: "\u0627\u0644\u0628\u062D\u0631\u064A\u0646"
  },
  id: LocaleCode.ArabicBahrain,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Bahrain)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u0628\u062D\u0631\u064A\u0646)",
  rtl: true
};
var ArabicEgypt = {
  country: {
    code: CountryCode.Egypt,
    name: "Egypt",
    native: "\u0645\u0635\u0631"
  },
  id: LocaleCode.ArabicEgypt,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Egypt)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0645\u0635\u0631)",
  rtl: true
};
var ArabicIraq = {
  country: {
    code: CountryCode.Iraq,
    name: "Iraq",
    native: "\u0627\u0644\u0639\u0631\u0627\u0642"
  },
  id: LocaleCode.ArabicIraq,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Iraq)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u0639\u0631\u0627\u0642)",
  rtl: true
};
var ArabicJordan = {
  country: {
    code: CountryCode.Jordan,
    name: "Jordan",
    native: "\u0627\u0644\u0623\u0631\u062F\u0646"
  },
  id: LocaleCode.ArabicJordan,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Jordan)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u0623\u0631\u062F\u0646)",
  rtl: true
};
var ArabicKuwait = {
  country: {
    code: CountryCode.Kuwait,
    name: "Kuwait",
    native: "\u0627\u0644\u0643\u0648\u064A\u062A"
  },
  id: LocaleCode.ArabicKuwait,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Kuwait)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u0643\u0648\u064A\u062A)",
  rtl: true
};
var ArabicLebanon = {
  country: {
    code: CountryCode.Lebanon,
    name: "Lebanon",
    native: "\u0644\u0628\u0646\u0627\u0646"
  },
  id: LocaleCode.ArabicLebanon,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Lebanon)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0644\u0628\u0646\u0627\u0646)",
  rtl: true
};
var ArabicLibya = {
  country: {
    code: CountryCode.Libya,
    name: "Libya",
    native: "\u0644\u064A\u0628\u064A\u0627"
  },
  id: LocaleCode.ArabicLibya,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Libya)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0644\u064A\u0628\u064A\u0627)",
  rtl: true
};
var ArabicMorocco = {
  country: {
    code: CountryCode.Morocco,
    name: "Morocco",
    native: "\u0627\u0644\u0645\u063A\u0631\u0628"
  },
  id: LocaleCode.ArabicMorocco,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Morocco)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u0645\u063A\u0631\u0628)",
  rtl: true
};
var ArabicOman = {
  country: {
    code: CountryCode.Oman,
    name: "Oman",
    native: "\u0639\u0645\u0627\u0646"
  },
  id: LocaleCode.ArabicOman,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Oman)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0639\u0645\u0627\u0646)",
  rtl: true
};
var ArabicQatar = {
  country: {
    code: CountryCode.Qatar,
    name: "Qatar",
    native: "\u0642\u0637\u0631"
  },
  id: LocaleCode.ArabicQatar,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Qatar)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0642\u0637\u0631)",
  rtl: true
};
var ArabicSaudiArabia = {
  country: {
    code: CountryCode.SaudiArabia,
    name: "Saudi Arabia",
    native: "\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629"
  },
  id: LocaleCode.ArabicSaudiArabia,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Saudi Arabia)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629)",
  rtl: true
};
var ArabicTunisia = {
  country: {
    code: CountryCode.Tunisia,
    name: "Tunisia",
    native: "\u062A\u0648\u0646\u0633"
  },
  id: LocaleCode.ArabicTunisia,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Tunisia)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u062A\u0648\u0646\u0633)",
  rtl: true
};
var ArabicUnitedArabEmirates = {
  country: {
    code: CountryCode.UnitedArabEmirates,
    name: "United Arab Emirates",
    native: "\u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0645\u062A\u062D\u062F\u0629"
  },
  id: LocaleCode.ArabicUnitedArabEmirates,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (United Arab Emirates)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0645\u062A\u062D\u062F\u0629)",
  rtl: true
};
var ArabicYemen = {
  country: {
    code: CountryCode.Yemen,
    name: "Yemen",
    native: "\u0627\u0644\u064A\u0645\u0646"
  },
  id: LocaleCode.ArabicYemen,
  language: {
    code: LanguageCode.Arabic,
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629"
  },
  name: "Arabic (Yemen)",
  native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u064A\u0645\u0646)",
  rtl: true
};
var Armenian = {
  id: LocaleCode.Armenian,
  language: {
    code: LanguageCode.Armenian,
    name: "Armenian",
    native: "\u0540\u0561\u0575\u0565\u0580\u0565\u0576"
  },
  name: "Armenian",
  native_name: "\u0540\u0561\u0575\u0565\u0580\u0565\u0576",
  rtl: false
};
var ArmenianArmenia = {
  country: { code: CountryCode.Armenia, name: "Armenia", native: "\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576" },
  id: LocaleCode.ArmenianArmenia,
  language: {
    code: LanguageCode.Armenian,
    name: "Armenian",
    native: "\u0570\u0561\u0575\u0565\u0580\u0565\u0576"
  },
  name: "Armenian (Armenia)",
  native_name: "\u0570\u0561\u0575\u0565\u0580\u0565\u0576 (\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576)",
  rtl: false
};
var Azerbaijani = {
  id: LocaleCode.Azerbaijani,
  language: {
    code: LanguageCode.Azerbaijani,
    name: "Azeribaijani",
    native: "Az\u0259rbaycan"
  },
  name: "Azeri",
  native_name: "Az\u0259rbaycan",
  rtl: false
};
var AzerbaijaniAzerbaijan = {
  country: {
    code: CountryCode.Azerbaijan,
    name: "Azerbaijan",
    native: "Az\u0259rbaycan"
  },
  id: LocaleCode.AzerbaijaniAzerbaijan,
  language: {
    code: LanguageCode.Azerbaijani,
    name: "Azerbaijani",
    native: "Az\u0259rbaycan"
  },
  name: "Azeri (Azerbaijan)",
  native_name: "Az\u0259rbaycan (Az\u0259rbaycan)",
  rtl: false
};
var Basque = {
  id: LocaleCode.Basque,
  language: {
    code: LanguageCode.Basque,
    name: "Basque",
    native: "Euskara"
  },
  name: "Basque",
  native_name: "Euskara",
  rtl: false
};
var BasqueSpain = {
  country: {
    code: CountryCode.Spain,
    name: "Spain",
    native: "Espa\xF1a"
  },
  id: LocaleCode.BasqueSpain,
  language: {
    code: LanguageCode.Basque,
    name: "Basque",
    native: "Euskara"
  },
  name: "Basque (Spain)",
  native_name: "Euskara (Espa\xF1a)",
  rtl: false
};
var Belarusian = {
  id: LocaleCode.Belarusian,
  language: {
    code: LanguageCode.Belarusian,
    name: "Belarusian",
    native: "\u0411\u0435\u043B\u0430\u0440\u0443\u0441\u043A\u0430\u044F"
  },
  name: "Belarusian",
  native_name: "\u0411\u0435\u043B\u0430\u0440\u0443\u0441\u043A\u0430\u044F",
  rtl: false
};
var BelarusianBelarus = {
  country: {
    code: CountryCode.Belarus,
    name: "Belarus",
    native: "\u0411\u0435\u043B\u0430\u0440\u0443\u0441\u044C"
  },
  id: LocaleCode.BelarusianBelarus,
  language: {
    code: LanguageCode.Belarusian,
    name: "Belarusian",
    native: "\u0431\u0435\u043B\u0430\u0440\u0443\u0441\u043A\u0430\u044F"
  },
  name: "Belarusian (Belarus)",
  native_name: "\u0431\u0435\u043B\u0430\u0440\u0443\u0441\u043A\u0430\u044F (\u0411\u0435\u043B\u0430\u0440\u0443\u0441\u044C)",
  rtl: false
};
var Bengali = {
  id: LocaleCode.Bengali,
  language: {
    code: LanguageCode.Bengali,
    name: "Bengali",
    native: "\u09AC\u09BE\u0982\u09B2\u09BE"
  },
  name: "Bengali",
  native_name: "\u09AC\u09BE\u0982\u09B2\u09BE",
  rtl: false
};
var BengaliBangladesh = {
  country: {
    code: CountryCode.Bangladesh,
    name: "Bangladesh",
    native: "\u09AC\u09BE\u0982\u09B2\u09BE\u09A6\u09C7\u09B6"
  },
  id: LocaleCode.BengaliBangladesh,
  language: {
    code: LanguageCode.Bengali,
    name: "Bengali",
    native: "\u09AC\u09BE\u0982\u09B2\u09BE"
  },
  name: "Bengali (Bangladesh)",
  native_name: "\u09AC\u09BE\u0982\u09B2\u09BE (\u09AC\u09BE\u0982\u09B2\u09BE\u09A6\u09C7\u09B6)",
  rtl: false
};
var Bhutani = {
  id: LocaleCode.Bhutani,
  language: {
    code: LanguageCode.Bhutani,
    name: "Bhutani",
    native: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42"
  },
  name: "Bhutani",
  native_name: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42",
  rtl: false
};
var BhutaniBhutan = {
  country: {
    code: CountryCode.Bhutan,
    name: "Bhutan",
    native: "\u0F60\u0F56\u0FB2\u0F74\u0F42"
  },
  id: LocaleCode.BhutaniBhutan,
  language: {
    code: LanguageCode.Bhutani,
    name: "Bhutani",
    native: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42"
  },
  name: "Bhutani (Bhutan)",
  native_name: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42 (\u0F60\u0F56\u0FB2\u0F74\u0F42)",
  rtl: false
};
var Bulgarian = {
  id: LocaleCode.Bulgarian,
  language: {
    code: LanguageCode.Bulgarian,
    name: "Bulgarian",
    native: "\u0411\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438"
  },
  name: "Bulgarian",
  native_name: "\u0411\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438",
  rtl: false
};
var BulgarianBulgaria = {
  country: {
    code: CountryCode.Bulgaria,
    name: "Bulgaria",
    native: "\u0411\u044A\u043B\u0433\u0430\u0440\u0438\u044F"
  },
  id: LocaleCode.BulgarianBulgaria,
  language: {
    code: LanguageCode.Bulgarian,
    name: "Bulgarian",
    native: "\u0431\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438"
  },
  name: "Bulgarian (Bulgaria)",
  native_name: "\u0431\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438 (\u0411\u044A\u043B\u0433\u0430\u0440\u0438\u044F)",
  rtl: false
};
var Burmese = {
  id: LocaleCode.Burmese,
  language: {
    code: LanguageCode.Burmese,
    name: "Burmese",
    native: "\u1017\u1019\u102C\u1005\u102C"
  },
  name: "Burmese",
  native_name: "\u1017\u1019\u102C\u1005\u102C",
  rtl: false
};
var BurmeseMyanmar = {
  country: {
    code: CountryCode.Myanmar,
    name: "Myanmar",
    native: "\u1019\u103C\u1014\u103A\u1019\u102C"
  },
  id: LocaleCode.BurmeseMyanmar,
  language: {
    code: LanguageCode.Burmese,
    name: "Burmese",
    native: "\u1017\u1019\u102C\u1005\u102C"
  },
  name: "Burmese (Myanmar)",
  native_name: "\u1017\u1019\u102C\u1005\u102C (\u1019\u103C\u1014\u103A\u1019\u102C)",
  rtl: false
};
var Cantonese = {
  id: LocaleCode.Cantonese,
  language: {
    code: LanguageCode.Cantonese,
    name: "Cantonese",
    native: "\u5EE3\u6771\u8A71"
  },
  name: "Cantonese",
  native_name: "\u5EE3\u6771\u8A71",
  rtl: false
};
var CantoneseHongKong = {
  country: {
    code: CountryCode.HongKong,
    name: "Hong Kong",
    native: "\u9999\u6E2F"
  },
  id: LocaleCode.CantoneseHongKong,
  language: {
    code: LanguageCode.Cantonese,
    name: "Cantonese",
    native: "\u5EE3\u6771\u8A71"
  },
  name: "Cantonese (Hong Kong)",
  native_name: "\u5EE3\u6771\u8A71 (\u9999\u6E2F)",
  rtl: false
};
var Catalan = {
  id: LocaleCode.Catalan,
  language: {
    code: LanguageCode.Catalan,
    name: "Catalan",
    native: "Catal\xE0"
  },
  name: "Catalan",
  native_name: "Catal\xE0",
  rtl: false
};
var CatalanSpain = {
  country: {
    code: CountryCode.Spain,
    name: "Spain",
    native: "Espa\xF1a"
  },
  id: LocaleCode.CatalanSpain,
  language: {
    code: LanguageCode.Catalan,
    name: "Catalan",
    native: "Catal\xE0"
  },
  name: "Catalan (Spain)",
  native_name: "Catal\xE0 (Espanya)",
  rtl: false
};
var ChineseSimplified = {
  id: LocaleCode.ChineseSimplified,
  language: {
    code: LanguageCode.Chinese,
    name: "Chinese",
    native: "\u4E2D\u6587"
  },
  name: "Chinese (Simplified)",
  native_name: "\u4E2D\u6587",
  rtl: false
};
var ChineseSimplifiedChina = {
  country: {
    code: CountryCode.China,
    name: "China",
    native: "\u4E2D\u56FD"
  },
  id: LocaleCode.ChineseSimplifiedChina,
  language: {
    code: LanguageCode.Chinese,
    name: "Chinese",
    native: "\u4E2D\u6587"
  },
  name: "Chinese (Simplified/China)",
  native_name: "\u4E2D\u6587 (\u4E2D\u56FD)",
  rtl: false
};
var ChineseSimplifiedHongKong = {
  country: {
    code: CountryCode.HongKong,
    name: "Hong Kong",
    native: "\u9999\u6E2F"
  },
  id: LocaleCode.ChineseSimplifiedHongKong,
  language: {
    code: LanguageCode.Chinese,
    name: "Chinese",
    native: "\u4E2D\u6587"
  },
  name: "Chinese (Simplified/Hong Kong)",
  native_name: "\u4E2D\u6587 (\u9999\u6E2F)",
  rtl: false
};
var ChineseSimplifiedMacau = {
  country: {
    code: CountryCode.Macau,
    name: "Macau",
    native: "\u6FB3\u9580"
  },
  id: LocaleCode.ChineseSimplifiedMacau,
  language: {
    code: LanguageCode.Chinese,
    name: "Chinese",
    native: "\u4E2D\u6587"
  },
  name: "Chinese (Simplified/Macau)",
  native_name: "\u4E2D\u6587 (\u6FB3\u9580)",
  rtl: false
};
var ChineseSimplifiedSingapore = {
  country: {
    code: CountryCode.Singapore,
    name: "Singapore",
    native: "\u65B0\u52A0\u5761"
  },
  id: LocaleCode.ChineseSimplifiedSingapore,
  language: {
    code: LanguageCode.Chinese,
    name: "Chinese",
    native: "\u4E2D\u6587"
  },
  name: "Chinese (Simplified/Singapore)",
  native_name: "\u4E2D\u6587 (\u65B0\u52A0\u5761)",
  rtl: false
};
var ChineseTraditional = {
  id: LocaleCode.ChineseTraditional,
  language: {
    code: LanguageCode.Chinese,
    name: "Chinese",
    native: "\u4E2D\u6587"
  },
  name: "Chinese (Traditional)",
  native_name: "\u4E2D\u6587",
  rtl: false
};
var ChineseTraditionalHongKong = {
  country: {
    code: CountryCode.HongKong,
    name: "Hong Kong",
    native: "\u9999\u6E2F"
  },
  id: LocaleCode.ChineseTraditionalHongKong,
  language: {
    code: LanguageCode.Chinese,
    name: "Chinese (Traditional/Hong Kong)",
    native: "\u4E2D\u6587"
  },
  name: "Chinese (Hong Kong)",
  native_name: "\u4E2D\u6587 (\u9999\u6E2F)",
  rtl: false
};
var ChineseTraditionalMacau = {
  country: {
    code: CountryCode.Macau,
    name: "Macau",
    native: "\u6FB3\u9580"
  },
  id: LocaleCode.ChineseTraditionalMacau,
  language: {
    code: LanguageCode.Chinese,
    name: "Chinese (Traditional/Macau)",
    native: "\u4E2D\u6587"
  },
  name: "Chinese (Macau)",
  native_name: "\u4E2D\u6587 (\u6FB3\u9580)",
  rtl: false
};
var ChineseTraditionalSingapore = {
  country: {
    code: CountryCode.Singapore,
    name: "Singapore",
    native: "\u65B0\u52A0\u5761"
  },
  id: LocaleCode.ChineseTraditionalSingapore,
  language: {
    code: LanguageCode.Chinese,
    name: "Chinese (Traditional/Singapore)",
    native: "\u4E2D\u6587"
  },
  name: "Chinese (Singapore)",
  native_name: "\u4E2D\u6587 (\u65B0\u52A0\u5761)",
  rtl: false
};
var Croatian = {
  id: LocaleCode.Croatian,
  language: {
    code: LanguageCode.Croatian,
    name: "Croatian",
    native: "Hrvatski"
  },
  name: "Croatian",
  native_name: "Hrvatski",
  rtl: false
};
var CroatianBosniaAndHerzegovina = {
  country: {
    code: CountryCode.BosniaAndHerzegovina,
    name: "Bosnia and Herzegovina",
    native: "Bosna i Hercegovina"
  },
  id: LocaleCode.CroatianBosniaAndHerzegovina,
  language: {
    code: LanguageCode.Croatian,
    name: "Croatian",
    native: "Hrvatski"
  },
  name: "Croatian (Bosnia and Herzegovina)",
  native_name: "Hrvatski (Bosna i Hercegovina)",
  rtl: false
};
var CroatianCroatia = {
  country: {
    code: CountryCode.Croatia,
    name: "Croatia",
    native: "Hrvatska"
  },
  id: LocaleCode.CroatianCroatia,
  language: {
    code: LanguageCode.Croatian,
    name: "Croatian",
    native: "Hrvatski"
  },
  name: "Croatian (Croatia)",
  native_name: "Hrvatski (Hrvatska)",
  rtl: false
};
var Czech = {
  id: LocaleCode.Czech,
  language: {
    code: LanguageCode.Czech,
    name: "Czech",
    native: "\u010Ce\u0161tina"
  },
  name: "Czech",
  native_name: "\u010Ce\u0161tina",
  rtl: false
};
var CzechCzechRepublic = {
  country: {
    code: CountryCode.CzechRepublic,
    name: "Czech Republic",
    native: "\u010Cesk\xE1 republika"
  },
  id: LocaleCode.CzechCzechRepublic,
  language: {
    code: LanguageCode.Czech,
    name: "Czech",
    native: "\u010Ce\u0161tina"
  },
  name: "Czech (Czech Republic)",
  native_name: "\u010Ce\u0161tina (\u010Cesk\xE1 republika)",
  rtl: false
};
var Danish = {
  id: LocaleCode.Danish,
  language: {
    code: LanguageCode.Danish,
    name: "Danish",
    native: "Dansk"
  },
  name: "Danish",
  native_name: "Dansk",
  rtl: false
};
var DanishDenmark = {
  country: {
    code: CountryCode.Denmark,
    name: "Denmark",
    native: "Danmark"
  },
  id: LocaleCode.DanishDenmark,
  language: {
    code: LanguageCode.Danish,
    name: "Danish",
    native: "Dansk"
  },
  name: "Danish (Denmark)",
  native_name: "Dansk (Danmark)",
  rtl: false
};
var Divehi = {
  id: LocaleCode.Divehi,
  language: {
    code: LanguageCode.Divehi,
    name: "Divehi",
    native: "\u078B\u07A8\u0788\u07AC\u0780\u07A8\u0784\u07A6\u0790\u07B0"
  },
  name: "Divehi",
  native_name: "\u078B\u07A8\u0788\u07AC\u0780\u07A8\u0784\u07A6\u0790\u07B0",
  rtl: true
};
var DivehiMaldives = {
  country: {
    code: CountryCode.Maldives,
    name: "Maldives",
    native: "\u078B\u07A8\u0788\u07AC\u0780\u07A8 \u0783\u07A7\u0787\u07B0\u0796\u07AC"
  },
  id: LocaleCode.DivehiMaldives,
  language: {
    code: LanguageCode.Divehi,
    name: "Divehi",
    native: "\u078B\u07A8\u0788\u07AC\u0780\u07A8\u0784\u07A6\u0790\u07B0"
  },
  name: "Divehi (Maldives)",
  native_name: "\u078B\u07A8\u0788\u07AC\u0780\u07A8\u0784\u07A6\u0790\u07B0 (\u078B\u07A8\u0788\u07AC\u0780\u07A8 \u0783\u07A7\u0787\u07B0\u0796\u07AC)",
  rtl: true
};
var Dutch = {
  id: LocaleCode.Dutch,
  language: {
    code: LanguageCode.Dutch,
    name: "Dutch",
    native: "Nederlands"
  },
  name: "Dutch",
  native_name: "Nederlands",
  rtl: false
};
var DutchBelgium = {
  country: {
    code: CountryCode.Belgium,
    name: "Belgium",
    native: "Belgi\xEB"
  },
  id: LocaleCode.DutchBelgium,
  language: {
    code: LanguageCode.Dutch,
    name: "Dutch",
    native: "Nederlands"
  },
  name: "Dutch (Belgium)",
  native_name: "Nederlands (Belgi\xEB)",
  rtl: false
};
var DutchNetherlands = {
  country: {
    code: CountryCode.Netherlands,
    name: "Netherlands",
    native: "Nederland"
  },
  id: LocaleCode.DutchNetherlands,
  language: {
    code: LanguageCode.Dutch,
    name: "Dutch",
    native: "Nederlands"
  },
  name: "Dutch (Netherlands)",
  native_name: "Nederlands (Nederland)",
  rtl: false
};
var English = {
  id: LocaleCode.English,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English",
  native_name: "English",
  rtl: false
};
var EnglishAustralia = {
  country: {
    code: CountryCode.Australia,
    name: "Australia",
    native: "Australia"
  },
  id: LocaleCode.EnglishAustralia,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (Australia)",
  native_name: "English (Australia)",
  rtl: false
};
var EnglishBelgium = {
  country: {
    code: CountryCode.Belgium,
    name: "Belgium",
    native: "Belgi\xEB"
  },
  id: LocaleCode.EnglishBelgium,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (Belgium)",
  native_name: "English (Belgi\xEB)",
  rtl: false
};
var EnglishCanada = {
  country: {
    code: CountryCode.Canada,
    name: "Canada",
    native: "Canada"
  },
  id: LocaleCode.EnglishCanada,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (Canada)",
  native_name: "English (Canada)",
  rtl: false
};
var EnglishIreland = {
  country: {
    code: CountryCode.Ireland,
    name: "Ireland",
    native: "\xC9ire"
  },
  id: LocaleCode.EnglishIreland,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (Ireland)",
  native_name: "English (\xC9ire)",
  rtl: false
};
var EnglishJamaica = {
  country: {
    code: CountryCode.Jamaica,
    name: "Jamaica",
    native: "Jamaica"
  },
  id: LocaleCode.EnglishJamaica,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (Jamaica)",
  native_name: "English (Jamaica)",
  rtl: false
};
var EnglishNewZealand = {
  country: {
    code: CountryCode.NewZealand,
    name: "New Zealand",
    native: "New Zealand"
  },
  id: LocaleCode.EnglishNewZealand,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (New Zealand)",
  native_name: "English (New Zealand)",
  rtl: false
};
var EnglishPhilippines = {
  country: {
    code: CountryCode.Philippines,
    name: "Philippines",
    native: "Philippines"
  },
  id: LocaleCode.EnglishPhilippines,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (Philippines)",
  native_name: "English (Philippines)",
  rtl: false
};
var EnglishSingapore = {
  country: {
    code: CountryCode.Singapore,
    name: "Singapore",
    native: "Singapore"
  },
  id: LocaleCode.EnglishSingapore,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (Singapore)",
  native_name: "English (Singapore)",
  rtl: false
};
var EnglishSouthAfrica = {
  country: {
    code: CountryCode.SouthAfrica,
    name: "South Africa",
    native: "South Africa"
  },
  id: LocaleCode.EnglishSouthAfrica,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (South Africa)",
  native_name: "English (South Africa)",
  rtl: false
};
var EnglishTrinidadAndTobago = {
  country: {
    code: CountryCode.TrinidadAndTobago,
    name: "Trinidad and Tobago",
    native: "Trinidad and Tobago"
  },
  id: LocaleCode.EnglishTrinidadAndTobago,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (Trinidad and Tobago)",
  native_name: "English (Trinidad and Tobago)",
  rtl: false
};
var EnglishUnitedKingdom = {
  country: {
    code: CountryCode.UnitedKingdom,
    name: "United Kingdom",
    native: "United Kingdom"
  },
  id: LocaleCode.EnglishUnitedKingdom,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (United Kingdom)",
  native_name: "English (United Kingdom)",
  rtl: false
};
var EnglishUnitedStates = {
  country: {
    code: CountryCode.UnitedStates,
    name: "United States",
    native: "United States"
  },
  id: LocaleCode.EnglishUnitedStates,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (United States)",
  native_name: "English (United States)",
  rtl: false
};
var EnglishZimbabwe = {
  country: {
    code: CountryCode.Zimbabwe,
    name: "Zimbabwe",
    native: "Zimbabwe"
  },
  id: LocaleCode.EnglishZimbabwe,
  language: {
    code: LanguageCode.English,
    name: "English",
    native: "English"
  },
  name: "English (Zimbabwe)",
  native_name: "English (Zimbabwe)",
  rtl: false
};
var Esperanto = {
  id: LocaleCode.Esperanto,
  language: {
    code: LanguageCode.Esperanto,
    name: "Esperanto",
    native: "Esperanto"
  },
  name: "Esperanto",
  native_name: "Esperanto",
  rtl: false
};
var Estonian = {
  id: LocaleCode.Estonian,
  language: {
    code: LanguageCode.Estonian,
    name: "Estonian",
    native: "Eesti"
  },
  name: "Estonian",
  native_name: "Eesti",
  rtl: false
};
var EstonianEstonia = {
  country: {
    code: CountryCode.Estonia,
    name: "Estonia",
    native: "Eesti"
  },
  id: LocaleCode.EstonianEstonia,
  language: {
    code: LanguageCode.Estonian,
    name: "Estonian",
    native: "Eesti"
  },
  name: "Estonian (Estonia)",
  native_name: "Eesti (Eesti)",
  rtl: false
};
var Faroese = {
  id: LocaleCode.Faroese,
  language: {
    code: LanguageCode.Faroese,
    name: "Faroese",
    native: "F\xF8royskt"
  },
  name: "Faroese",
  native_name: "F\xF8royskt",
  rtl: false
};
var FaroeseFaroeIslands = {
  country: {
    code: CountryCode.FaroeIslands,
    name: "Faroe Islands",
    native: "F\xF8royar"
  },
  id: LocaleCode.FaroeseFaroeIslands,
  language: {
    code: LanguageCode.Faroese,
    name: "Faroese",
    native: "F\xF8royskt"
  },
  name: "Faroese (Faroe Islands)",
  native_name: "F\xF8royskt (F\xF8royar)",
  rtl: false
};
var Farsi = {
  id: LocaleCode.Farsi,
  language: {
    code: LanguageCode.Farsi,
    name: "Farsi",
    native: "\u0641\u0627\u0631\u0633\u06CC"
  },
  name: "Farsi",
  native_name: "\u0641\u0627\u0631\u0633\u06CC",
  rtl: true
};
var FarsiIran = {
  country: {
    code: CountryCode.Iran,
    name: "Iran",
    native: "\u0627\u06CC\u0631\u0627\u0646"
  },
  id: LocaleCode.FarsiIran,
  language: {
    code: LanguageCode.Farsi,
    name: "Farsi",
    native: "\u0641\u0627\u0631\u0633\u06CC"
  },
  name: "Farsi (Iran)",
  native_name: "\u0641\u0627\u0631\u0633\u06CC (\u0627\u06CC\u0631\u0627\u0646)",
  rtl: true
};
var Filipino = {
  id: LocaleCode.Filipino,
  language: {
    code: LanguageCode.Filipino,
    name: "Filipino",
    native: "Filipino"
  },
  name: "Filipino",
  native_name: "Filipino",
  rtl: false
};
var FilipinoPhilippines = {
  country: {
    code: CountryCode.Philippines,
    name: "Philippines",
    native: "Pilipinas"
  },
  id: LocaleCode.FilipinoPhilippines,
  language: {
    code: LanguageCode.Filipino,
    name: "Filipino",
    native: "Filipino"
  },
  name: "Filipino (Philippines)",
  native_name: "Filipino (Pilipinas)",
  rtl: false
};
var Finnish = {
  id: LocaleCode.Finnish,
  language: {
    code: LanguageCode.Finnish,
    name: "Finnish",
    native: "Suomi"
  },
  name: "Finnish",
  native_name: "Suomi",
  rtl: false
};
var FinnishFinland = {
  country: {
    code: CountryCode.Finland,
    name: "Finland",
    native: "Suomi"
  },
  id: LocaleCode.FinnishFinland,
  language: {
    code: LanguageCode.Finnish,
    name: "Finnish",
    native: "Suomi"
  },
  name: "Finnish (Finland)",
  native_name: "Suomi (Suomi)",
  rtl: false
};
var French = {
  id: LocaleCode.French,
  language: {
    code: LanguageCode.French,
    name: "French",
    native: "Fran\xE7ais"
  },
  name: "French",
  native_name: "Fran\xE7ais",
  rtl: false
};
var FrenchBelgium = {
  country: {
    code: CountryCode.Belgium,
    name: "Belgium",
    native: "Belgique"
  },
  id: LocaleCode.FrenchBelgium,
  language: {
    code: LanguageCode.French,
    name: "French",
    native: "Fran\xE7ais"
  },
  name: "French (Belgium)",
  native_name: "Fran\xE7ais (Belgique)",
  rtl: false
};
var FrenchCanada = {
  country: {
    code: CountryCode.Canada,
    name: "Canada",
    native: "Canada"
  },
  id: LocaleCode.FrenchCanada,
  language: {
    code: LanguageCode.French,
    name: "French",
    native: "Fran\xE7ais"
  },
  name: "French (Canada)",
  native_name: "Fran\xE7ais (Canada)",
  rtl: false
};
var FrenchFrance = {
  country: {
    code: CountryCode.France,
    name: "France",
    native: "France"
  },
  id: LocaleCode.FrenchFrance,
  language: {
    code: LanguageCode.French,
    name: "French",
    native: "Fran\xE7ais"
  },
  name: "French (France)",
  native_name: "Fran\xE7ais (France)",
  rtl: false
};
var FrenchLuxembourg = {
  country: {
    code: CountryCode.Luxembourg,
    name: "Luxembourg",
    native: "Luxembourg"
  },
  id: LocaleCode.FrenchLuxembourg,
  language: {
    code: LanguageCode.French,
    name: "French",
    native: "Fran\xE7ais"
  },
  name: "French (Luxembourg)",
  native_name: "Fran\xE7ais (Luxembourg)",
  rtl: false
};
var FrenchMonaco = {
  country: {
    code: CountryCode.Monaco,
    name: "Monaco",
    native: "Monaco"
  },
  id: LocaleCode.FrenchMonaco,
  language: {
    code: LanguageCode.French,
    name: "French",
    native: "Fran\xE7ais"
  },
  name: "French (Monaco)",
  native_name: "Fran\xE7ais (Monaco)",
  rtl: false
};
var FrenchReunion = {
  country: {
    code: CountryCode.Reunion,
    name: "Reunion",
    native: "La R\xE9union"
  },
  id: LocaleCode.FrenchReunion,
  language: {
    code: LanguageCode.French,
    name: "French",
    native: "Fran\xE7ais"
  },
  name: "French (Reunion)",
  native_name: "Fran\xE7ais (La R\xE9union)",
  rtl: false
};
var FrenchSwitzerland = {
  country: {
    code: CountryCode.Switzerland,
    name: "Switzerland",
    native: "Suisse"
  },
  id: LocaleCode.FrenchSwitzerland,
  language: {
    code: LanguageCode.French,
    name: "French",
    native: "Fran\xE7ais"
  },
  name: "French (Switzerland)",
  native_name: "Fran\xE7ais (Suisse)",
  rtl: false
};
var Frisian = {
  id: LocaleCode.Frisian,
  language: {
    code: LanguageCode.Frisian,
    name: "Frisian",
    native: "Frysk"
  },
  name: "Frisian",
  native_name: "Frysk",
  rtl: false
};
var FrisianNetherlands = {
  country: {
    code: CountryCode.Netherlands,
    name: "Netherlands",
    native: "Nederland"
  },
  id: LocaleCode.FrisianNetherlands,
  language: {
    code: LanguageCode.Frisian,
    name: "Frisian",
    native: "Frysk"
  },
  name: "Frisian (Netherlands)",
  native_name: "Frysk (Nederland)",
  rtl: false
};
var Galician = {
  id: LocaleCode.Galician,
  language: {
    code: LanguageCode.Galician,
    name: "Galician",
    native: "Galego"
  },
  name: "Galician",
  native_name: "Galego",
  rtl: false
};
var GalicianSpain = {
  country: {
    code: CountryCode.Spain,
    name: "Spain",
    native: "Espa\xF1a"
  },
  id: LocaleCode.GalicianSpain,
  language: {
    code: LanguageCode.Galician,
    name: "Galician",
    native: "Galego"
  },
  name: "Galician (Spain)",
  native_name: "Galego (Espa\xF1a)",
  rtl: false
};
var Georgian = {
  id: LocaleCode.Georgian,
  language: {
    code: LanguageCode.Georgian,
    name: "Georgian",
    native: "\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8"
  },
  name: "Georgian",
  native_name: "\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8",
  rtl: false
};
var GeorgianGeorgia = {
  country: {
    code: CountryCode.Georgia,
    name: "Georgia",
    native: "\u10E1\u10D0\u10E5\u10D0\u10E0\u10D7\u10D5\u10D4\u10DA\u10DD"
  },
  id: LocaleCode.GeorgianGeorgia,
  language: {
    code: LanguageCode.Georgian,
    name: "Georgian",
    native: "\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8"
  },
  name: "Georgian (Georgia)",
  native_name: "\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8 (\u10E1\u10D0\u10E5\u10D0\u10E0\u10D7\u10D5\u10D4\u10DA\u10DD)",
  rtl: false
};
var German = {
  id: LocaleCode.German,
  language: {
    code: LanguageCode.German,
    name: "German",
    native: "Deutsch"
  },
  name: "German",
  native_name: "Deutsch",
  rtl: false
};
var GermanAustria = {
  country: {
    code: CountryCode.Austria,
    name: "Austria",
    native: "\xD6sterreich"
  },
  id: LocaleCode.GermanAustria,
  language: {
    code: LanguageCode.German,
    name: "German",
    native: "Deutsch"
  },
  name: "German (Austria)",
  native_name: "Deutsch (\xD6sterreich)",
  rtl: false
};
var GermanBelgium = {
  country: {
    code: CountryCode.Belgium,
    name: "Belgium",
    native: "Belgi\xEB"
  },
  id: LocaleCode.GermanBelgium,
  language: {
    code: LanguageCode.German,
    name: "German",
    native: "Deutsch"
  },
  name: "German (Belgium)",
  native_name: "Deutsch (Belgi\xEB)",
  rtl: false
};
var GermanSwitzerland = {
  country: {
    code: CountryCode.Switzerland,
    name: "Switzerland",
    native: "Suisse"
  },
  id: LocaleCode.GermanSwitzerland,
  language: {
    code: LanguageCode.German,
    name: "German",
    native: "Deutsch"
  },
  name: "German (Switzerland)",
  native_name: "Deutsch (Suisse)",
  rtl: false
};
var GermanLiechtenstein = {
  country: {
    code: CountryCode.Liechtenstein,
    name: "Liechtenstein",
    native: "Liechtenstein"
  },
  id: LocaleCode.GermanLiechtenstein,
  language: {
    code: LanguageCode.German,
    name: "German",
    native: "Deutsch"
  },
  name: "German (Liechtenstein)",
  native_name: "Deutsch (Liechtenstein)",
  rtl: false
};
var GermanLuxembourg = {
  country: {
    code: CountryCode.Luxembourg,
    name: "Luxembourg",
    native: "Luxembourg"
  },
  id: LocaleCode.GermanLuxembourg,
  language: {
    code: LanguageCode.German,
    name: "German",
    native: "Deutsch"
  },
  name: "German (Luxembourg)",
  native_name: "Deutsch (Luxembourg)",
  rtl: false
};
var Greek = {
  id: LocaleCode.Greek,
  language: {
    code: LanguageCode.Greek,
    name: "Greek",
    native: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC"
  },
  name: "Greek",
  native_name: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC",
  rtl: false
};
var GreekGreece = {
  country: {
    code: CountryCode.Greece,
    name: "Greece",
    native: "\u0395\u03BB\u03BB\u03AC\u03B4\u03B1"
  },
  id: LocaleCode.GreekGreece,
  language: {
    code: LanguageCode.Greek,
    name: "Greek",
    native: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC"
  },
  name: "Greek (Greece)",
  native_name: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC (\u0395\u03BB\u03BB\u03AC\u03B4\u03B1)",
  rtl: false
};
var Greenlandic = {
  id: LocaleCode.Greenlandic,
  language: {
    code: LanguageCode.Greenlandic,
    name: "Greenlandic",
    native: "Kalaallisut"
  },
  name: "Greenlandic",
  native_name: "Kalaallisut",
  rtl: false
};
var GreenlandicGreenland = {
  country: {
    code: CountryCode.Greenland,
    name: "Greenland",
    native: "Kalaallit Nunaat"
  },
  id: LocaleCode.GreenlandicGreenland,
  language: {
    code: LanguageCode.Greenlandic,
    name: "Greenlandic",
    native: "Kalaallisut"
  },
  name: "Greenlandic (Greenland)",
  native_name: "Kalaallisut (Kalaallit Nunaat)",
  rtl: false
};
var Gujarati = {
  id: LocaleCode.Gujarati,
  language: {
    code: LanguageCode.Gujarati,
    name: "Gujarati",
    native: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0"
  },
  name: "Gujarati",
  native_name: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0",
  rtl: false
};
var GujaratiIndia = {
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u092D\u093E\u0930\u0924"
  },
  id: LocaleCode.GujaratiIndia,
  language: {
    code: LanguageCode.Gujarati,
    name: "Gujarati",
    native: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0"
  },
  name: "Gujarati (India)",
  native_name: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0 (\u092D\u093E\u0930\u0924)",
  rtl: false
};
var Hausa = {
  id: LocaleCode.Hausa,
  language: {
    code: LanguageCode.Hausa,
    name: "Hausa",
    native: "\u0647\u064E\u0648\u064F\u0633\u064E"
  },
  name: "Hausa",
  native_name: "\u0647\u064E\u0648\u064F\u0633\u064E",
  rtl: false
};
var HausaGhana = {
  country: {
    code: CountryCode.Ghana,
    name: "Ghana",
    native: "Ghana"
  },
  id: LocaleCode.HausaGhana,
  language: {
    code: LanguageCode.Hausa,
    name: "Hausa",
    native: "\u0647\u064E\u0648\u064F\u0633\u064E"
  },
  name: "Hausa (Ghana)",
  native_name: "\u0647\u064E\u0648\u064F\u0633\u064E (Ghana)",
  rtl: false
};
var HausaNiger = {
  country: {
    code: CountryCode.Niger,
    name: "Niger",
    native: "Niger"
  },
  id: LocaleCode.HausaNiger,
  language: {
    code: LanguageCode.Hausa,
    name: "Hausa",
    native: "\u0647\u064E\u0648\u064F\u0633\u064E"
  },
  name: "Hausa (Niger)",
  native_name: "\u0647\u064E\u0648\u064F\u0633\u064E (Niger)",
  rtl: false
};
var HausaNigeria = {
  country: {
    code: CountryCode.Nigeria,
    name: "Nigeria",
    native: "Nigeria"
  },
  id: LocaleCode.HausaNigeria,
  language: {
    code: LanguageCode.Hausa,
    name: "Hausa",
    native: "\u0647\u064E\u0648\u064F\u0633\u064E"
  },
  name: "Hausa (Nigeria)",
  native_name: "\u0647\u064E\u0648\u064F\u0633\u064E (Nigeria)",
  rtl: false
};
var Hebrew = {
  id: LocaleCode.Hebrew,
  language: {
    code: LanguageCode.Hebrew,
    name: "Hebrew",
    native: "\u05E2\u05D1\u05E8\u05D9\u05EA"
  },
  name: "Hebrew",
  native_name: "\u05E2\u05D1\u05E8\u05D9\u05EA",
  rtl: true
};
var HebrewIsrael = {
  country: {
    code: CountryCode.Israel,
    name: "Hebrew",
    native: ""
  },
  id: LocaleCode.HebrewIsrael,
  language: {
    code: LanguageCode.Hebrew,
    name: "Hebrew",
    native: ""
  },
  name: "Hebrew (Israel)",
  native_name: "",
  rtl: true
};
var Hindi = {
  id: LocaleCode.Hindi,
  language: {
    code: LanguageCode.Hindi,
    name: "Hindi",
    native: "\u0939\u093F\u0928\u094D\u0926\u0940"
  },
  name: "Hindi",
  native_name: "\u0939\u093F\u0928\u094D\u0926\u0940",
  rtl: false
};
var HindiIndia = {
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u092D\u093E\u0930\u0924"
  },
  id: LocaleCode.HindiIndia,
  language: {
    code: LanguageCode.Hindi,
    name: "Hindi",
    native: "\u092D\u093E\u0930\u0924\u0940\u092F"
  },
  name: "Hindi (India)",
  native_name: "\u092D\u093E\u0930\u0924\u0940\u092F",
  rtl: false
};
var Hungarian = {
  id: LocaleCode.Hungarian,
  language: {
    code: LanguageCode.Hungarian,
    name: "Hungarian",
    native: "Magyar"
  },
  name: "Hungarian",
  native_name: "Magyar",
  rtl: false
};
var HungarianHungary = {
  country: {
    code: CountryCode.Hungary,
    name: "Hungary",
    native: "Magyarorsz\xE1g"
  },
  id: LocaleCode.HungarianHungary,
  language: {
    code: LanguageCode.Hungarian,
    name: "Hungarian",
    native: "Magyar"
  },
  name: "Hungarian (Hungary)",
  native_name: "Magyar (Magyarorsz\xE1g)",
  rtl: false
};
var Icelandic = {
  id: LocaleCode.Icelandic,
  language: {
    code: LanguageCode.Icelandic,
    name: "Icelandic",
    native: "\xCDslenska"
  },
  name: "Icelandic",
  native_name: "\xCDslenska",
  rtl: false
};
var IcelandicIceland = {
  country: {
    code: CountryCode.Iceland,
    name: "Iceland",
    native: "\xCDsland"
  },
  id: LocaleCode.IcelandicIceland,
  language: {
    code: LanguageCode.Icelandic,
    name: "Icelandic",
    native: "\xCDslenska"
  },
  name: "Icelandic (Iceland)",
  native_name: "\xCDslenska (\xCDsland)",
  rtl: false
};
var Igbo = {
  id: LocaleCode.Igbo,
  language: {
    code: LanguageCode.Igbo,
    name: "Igbo",
    native: "Igbo"
  },
  name: "Igbo",
  native_name: "Igbo",
  rtl: false
};
var Indonesian = {
  id: LocaleCode.Indonesian,
  language: {
    code: LanguageCode.Indonesian,
    name: "Indonesian",
    native: "Bahasa Indonesia"
  },
  name: "Indonesian",
  native_name: "Bahasa Indonesia",
  rtl: false
};
var IndonesianIndonesia = {
  country: {
    code: CountryCode.Indonesia,
    name: "Indonesia",
    native: "Indonesia"
  },
  id: LocaleCode.IndonesianIndonesia,
  language: {
    code: LanguageCode.Indonesian,
    name: "Indonesian",
    native: "Bahasa Indonesia"
  },
  name: "Indonesian (Indonesia)",
  native_name: "Bahasa Indonesia (Indonesia)",
  rtl: false
};
var Irish = {
  id: LocaleCode.Irish,
  language: {
    code: LanguageCode.Irish,
    name: "Irish",
    native: "Gaeilge"
  },
  name: "Irish",
  native_name: "Gaeilge",
  rtl: false
};
var IrishIreland = {
  country: {
    code: CountryCode.Ireland,
    name: "Ireland",
    native: "\xC9ire"
  },
  id: LocaleCode.IrishIreland,
  language: {
    code: LanguageCode.Irish,
    name: "Irish",
    native: "Gaeilge"
  },
  name: "Irish (Ireland)",
  native_name: "Gaeilge (\xC9ire)",
  rtl: false
};
var Italian = {
  id: LocaleCode.Italian,
  language: {
    code: LanguageCode.Italian,
    name: "Italian",
    native: "Italiano"
  },
  name: "Italian",
  native_name: "Italiano",
  rtl: false
};
var ItalianItaly = {
  country: {
    code: CountryCode.Italy,
    name: "Italy",
    native: "Italia"
  },
  id: LocaleCode.ItalianItaly,
  language: {
    code: LanguageCode.Italian,
    name: "Italian",
    native: "Italiano"
  },
  name: "Italian (Italy)",
  native_name: "Italiano (Italia)",
  rtl: false
};
var ItalianSwitzerland = {
  country: {
    code: CountryCode.Switzerland,
    name: "Switzerland",
    native: "Schweiz"
  },
  id: LocaleCode.ItalianSwitzerland,
  language: {
    code: LanguageCode.Italian,
    name: "Italian",
    native: "Italiano"
  },
  name: "Italian (Switzerland)",
  native_name: "Italiano (Svizzera)",
  rtl: false
};
var Japanese = {
  id: LocaleCode.Japanese,
  language: {
    code: LanguageCode.Japanese,
    name: "Japanese",
    native: "\u65E5\u672C\u8A9E"
  },
  name: "Japanese",
  native_name: "\u65E5\u672C\u8A9E",
  rtl: false
};
var JapaneseJapan = {
  country: {
    code: CountryCode.Japan,
    name: "Japan",
    native: "\u65E5\u672C"
  },
  id: LocaleCode.JapaneseJapan,
  language: {
    code: LanguageCode.Japanese,
    name: "Japanese",
    native: "\u65E5\u672C\u8A9E"
  },
  name: "Japanese (Japan)",
  native_name: "\u65E5\u672C\u8A9E (\u65E5\u672C)",
  rtl: false
};
var Kannada = {
  id: LocaleCode.Kannada,
  language: {
    code: LanguageCode.Kannada,
    name: "Kannada",
    native: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1"
  },
  name: "Kannada",
  native_name: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1",
  rtl: false
};
var KannadaIndia = {
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u0CAD\u0CBE\u0CB0\u0CA4"
  },
  id: LocaleCode.KannadaIndia,
  language: {
    code: LanguageCode.Kannada,
    name: "Kannada",
    native: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1"
  },
  name: "Kannada (India)",
  native_name: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1 (\u0CAD\u0CBE\u0CB0\u0CA4)",
  rtl: false
};
var Kazakh = {
  id: LocaleCode.Kazakh,
  language: {
    code: LanguageCode.Kazakh,
    name: "Kazakh",
    native: "\u049A\u0430\u0437\u0430\u049B \u0442\u0456\u043B\u0456"
  },
  name: "Kazakh",
  native_name: "\u049A\u0430\u0437\u0430\u049B \u0442\u0456\u043B\u0456",
  rtl: false
};
var KazakhKazakhstan = {
  country: {
    code: CountryCode.Kazakhstan,
    name: "Kazakhstan",
    native: "\u049A\u0430\u0437\u0430\u049B\u0441\u0442\u0430\u043D"
  },
  id: LocaleCode.KazakhKazakhstan,
  language: {
    code: LanguageCode.Kazakh,
    name: "Kazakh",
    native: "\u049A\u0430\u0437\u0430\u049B \u0442\u0456\u043B\u0456"
  },
  name: "Kazakh (Kazakhstan)",
  native_name: "\u049A\u0430\u0437\u0430\u049B \u0442\u0456\u043B\u0456 (\u049A\u0430\u0437\u0430\u049B\u0441\u0442\u0430\u043D)",
  rtl: false
};
var Khmer = {
  id: LocaleCode.Khmer,
  language: {
    code: LanguageCode.Khmer,
    name: "Khmer",
    native: "\u1797\u17B6\u179F\u17B6\u1781\u17D2\u1798\u17C2\u179A"
  },
  name: "Khmer",
  native_name: "\u1797\u17B6\u179F\u17B6\u1781\u17D2\u1798\u17C2\u179A",
  rtl: false
};
var KhmerCambodia = {
  country: {
    code: CountryCode.Cambodia,
    name: "Cambodia",
    native: "\u1780\u1798\u17D2\u1796\u17BB\u1787\u17B6"
  },
  id: LocaleCode.KhmerCambodia,
  language: {
    code: LanguageCode.Khmer,
    name: "Khmer",
    native: "\u1797\u17B6\u179F\u17B6\u1781\u17D2\u1798\u17C2\u179A"
  },
  name: "Khmer (Cambodia)",
  native_name: "\u1797\u17B6\u179F\u17B6\u1781\u17D2\u1798\u17C2\u179A (\u1780\u1798\u17D2\u1796\u17BB\u1787\u17B6)",
  rtl: false
};
var Konkani = {
  id: LocaleCode.Konkani,
  language: {
    code: LanguageCode.Konkani,
    name: "Konkani",
    native: "\u0915\u094B\u0902\u0915\u0923\u0940"
  },
  name: "Konkani",
  native_name: "\u0915\u094B\u0902\u0915\u0923\u0940",
  rtl: false
};
var KonkaniIndia = {
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u092D\u093E\u0930\u0924"
  },
  id: LocaleCode.KonkaniIndia,
  language: {
    code: LanguageCode.Konkani,
    name: "Konkani",
    native: "\u0915\u094B\u0902\u0915\u0923\u0940"
  },
  name: "Konkani (India)",
  native_name: "\u0915\u094B\u0902\u0915\u0923\u0940 (\u092D\u093E\u0930\u0924)",
  rtl: false
};
var Korean = {
  id: LocaleCode.Korean,
  language: {
    code: LanguageCode.Korean,
    name: "Korean",
    native: "\uD55C\uAD6D\uC5B4"
  },
  name: "Korean",
  native_name: "\uD55C\uAD6D\uC5B4",
  rtl: false
};
var KoreanSouthKorea = {
  country: {
    code: CountryCode.SouthKorea,
    name: "South Korea",
    native: "\uB300\uD55C\uBBFC\uAD6D"
  },
  id: LocaleCode.KoreanSouthKorea,
  language: {
    code: LanguageCode.Korean,
    name: "Korean",
    native: "\uD55C\uAD6D\uC5B4"
  },
  name: "Korean (South Korea)",
  native_name: "\uD55C\uAD6D\uC5B4 (\uB300\uD55C\uBBFC\uAD6D)",
  rtl: false
};
var Kurdish = {
  id: LocaleCode.Kurdish,
  language: {
    code: LanguageCode.Kurdish,
    name: "Kurdish",
    native: "Kurd\xEE"
  },
  name: "Kurdish",
  native_name: "Kurd\xEE",
  rtl: false
};
var KurdishIraq = {
  country: {
    code: CountryCode.Iraq,
    name: "Iraq",
    native: "\u0627\u0644\u0639\u0631\u0627\u0642"
  },
  id: LocaleCode.KurdishIraq,
  language: {
    code: LanguageCode.Kurdish,
    name: "Kurdish",
    native: "Kurd\xEE"
  },
  name: "Kurdish (Iraq)",
  native_name: "Kurd\xEE (\u0627\u0644\u0639\u0631\u0627\u0642)",
  rtl: false
};
var KurdishTurkey = {
  country: {
    code: CountryCode.Turkey,
    name: "Turkey",
    native: "T\xFCrkiye"
  },
  id: LocaleCode.KurdishTurkey,
  language: {
    code: LanguageCode.Kurdish,
    name: "Kurdish",
    native: "Kurd\xEE"
  },
  name: "Kurdish (Turkey)",
  native_name: "Kurd\xEE (T\xFCrkiye)",
  rtl: false
};
var Kyrgyz = {
  id: LocaleCode.Kyrgyz,
  language: {
    code: LanguageCode.Kyrgyz,
    name: "Kyrgyz",
    native: "\u041A\u044B\u0440\u0433\u044B\u0437\u0447\u0430"
  },
  name: "Kyrgyz",
  native_name: "\u041A\u044B\u0440\u0433\u044B\u0437\u0447\u0430",
  rtl: false
};
var KyrgyzKyrgyzstan = {
  country: {
    code: CountryCode.Kyrgyzstan,
    name: "Kyrgyzstan",
    native: "\u041A\u044B\u0440\u0433\u044B\u0437\u0441\u0442\u0430\u043D"
  },
  id: LocaleCode.KyrgyzKyrgyzstan,
  language: {
    code: LanguageCode.Kyrgyz,
    name: "Kyrgyz",
    native: "\u041A\u044B\u0440\u0433\u044B\u0437\u0447\u0430"
  },
  name: "Kyrgyz (Kyrgyzstan)",
  native_name: "\u041A\u044B\u0440\u0433\u044B\u0437\u0447\u0430 (\u041A\u044B\u0440\u0433\u044B\u0437\u0441\u0442\u0430\u043D)",
  rtl: false
};
var Lao = {
  id: LocaleCode.Lao,
  language: {
    code: LanguageCode.Lao,
    name: "Lao",
    native: "\u0EA5\u0EB2\u0EA7"
  },
  name: "Lao",
  native_name: "\u0EA5\u0EB2\u0EA7",
  rtl: false
};
var LaoLaos = {
  country: {
    code: CountryCode.Laos,
    name: "Laos",
    native: "\u0EAA.\u0E9B.\u0E9B\u0EB0\u0E8A\u0EB2\u0E97\u0EB4\u0E9B\u0EB0\u0EC4\u0E95"
  },
  id: LocaleCode.LaoLaos,
  language: {
    code: LanguageCode.Lao,
    name: "Lao",
    native: "\u0EA5\u0EB2\u0EA7"
  },
  name: "Lao (Laos)",
  native_name: "\u0EA5\u0EB2\u0EA7 (\u0EAA.\u0E9B.\u0E9B\u0EB0\u0E8A\u0EB2\u0E97\u0EB4\u0E9B\u0EB0\u0EC4\u0E95)",
  rtl: false
};
var Latvian = {
  id: LocaleCode.Latvian,
  language: {
    code: LanguageCode.Latvian,
    name: "Latvian",
    native: "Latvie\u0161u"
  },
  name: "Latvian",
  native_name: "Latvie\u0161u",
  rtl: false
};
var LatvianLatvia = {
  country: {
    code: CountryCode.Latvia,
    name: "Latvia",
    native: "Latvija"
  },
  id: LocaleCode.LatvianLatvia,
  language: {
    code: LanguageCode.Latvian,
    name: "Latvian",
    native: "Latvie\u0161u"
  },
  name: "Latvian (Latvia)",
  native_name: "Latvie\u0161u (Latvija)",
  rtl: false
};
var Lithuanian = {
  id: LocaleCode.Lithuanian,
  language: {
    code: LanguageCode.Lithuanian,
    name: "Lithuanian",
    native: "Lietuvi\u0173"
  },
  name: "Lithuanian",
  native_name: "Lietuvi\u0173",
  rtl: false
};
var LithuanianLithuania = {
  country: {
    code: CountryCode.Lithuania,
    name: "Lithuania",
    native: "Lietuva"
  },
  id: LocaleCode.LithuanianLithuania,
  language: {
    code: LanguageCode.Lithuanian,
    name: "Lithuanian",
    native: "Lietuvi\u0173"
  },
  name: "Lithuanian (Lithuania)",
  native_name: "Lietuvi\u0173 (Lietuva)",
  rtl: false
};
var Luxembourgish = {
  id: LocaleCode.Luxembourgish,
  language: {
    code: LanguageCode.Luxembourgish,
    name: "Luxembourgish",
    native: "L\xEBtzebuergesch"
  },
  name: "Luxembourgish",
  native_name: "L\xEBtzebuergesch",
  rtl: false
};
var LuxembourgishBelgium = {
  country: {
    code: CountryCode.Belgium,
    name: "Belgium",
    native: "Belgi\xEB"
  },
  id: LocaleCode.LuxembourgishBelgium,
  language: {
    code: LanguageCode.Luxembourgish,
    name: "Luxembourgish",
    native: "L\xEBtzebuergesch"
  },
  name: "Luxembourgish (Belgium)",
  native_name: "L\xEBtzebuergesch (Belgi\xEB)",
  rtl: false
};
var LuxembourgishLuxembourg = {
  country: {
    code: CountryCode.Luxembourg,
    name: "Luxembourg",
    native: "Luxembourg"
  },
  id: LocaleCode.LuxembourgishLuxembourg,
  language: {
    code: LanguageCode.Luxembourgish,
    name: "Luxembourgish",
    native: "L\xEBtzebuergesch"
  },
  name: "Luxembourgish (Luxembourg)",
  native_name: "L\xEBtzebuergesch (Luxembourg)",
  rtl: false
};
var Macedonian = {
  id: LocaleCode.Macedonian,
  language: {
    code: LanguageCode.Macedonian,
    name: "Macedonian",
    native: "\u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0441\u043A\u0438"
  },
  name: "Macedonian",
  native_name: "\u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0441\u043A\u0438",
  rtl: false
};
var MacedonianNorthMacedonia = {
  country: {
    code: CountryCode.NorthMacedonia,
    name: "Macedonia",
    native: "\u0421\u0435\u0432\u0435\u0440\u043D\u0430 \u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0438\u0458\u0430"
  },
  id: LocaleCode.MacedonianNorthMacedonia,
  language: {
    code: LanguageCode.Macedonian,
    name: "Macedonian",
    native: "\u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0441\u043A\u0438"
  },
  name: "Macedonian (North Macedonia)",
  native_name: "\u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0441\u043A\u0438 (\u0421\u0435\u0432\u0435\u0440\u043D\u0430 \u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0438\u0458\u0430)",
  rtl: false
};
var Malay = {
  id: LocaleCode.Malay,
  language: {
    code: LanguageCode.Malay,
    name: "Malay",
    native: "Bahasa Melayu"
  },
  name: "Malay",
  native_name: "Bahasa Melayu",
  rtl: false
};
var MalayBrunei = {
  country: {
    code: CountryCode.Brunei,
    name: "Brunei",
    native: "Negara Brunei Darussalam"
  },
  id: LocaleCode.MalayBrunei,
  language: {
    code: LanguageCode.Malay,
    name: "Malay",
    native: "Bahasa Melayu"
  },
  name: "Malay (Brunei)",
  native_name: "Bahasa Melayu (Negara Brunei Darussalam)",
  rtl: false
};
var MalayMalaysia = {
  country: {
    code: CountryCode.Malaysia,
    name: "Malaysia",
    native: "Malaysia"
  },
  id: LocaleCode.MalayMalaysia,
  language: {
    code: LanguageCode.Malay,
    name: "Malay",
    native: "Bahasa Melayu"
  },
  name: "Malay (Malaysia)",
  native_name: "Bahasa Melayu (Malaysia)",
  rtl: false
};
var MalaySingapore = {
  country: {
    code: CountryCode.Singapore,
    name: "Singapore",
    native: "Singapore"
  },
  id: LocaleCode.MalaySingapore,
  language: {
    code: LanguageCode.Malay,
    name: "Malay",
    native: "Bahasa Melayu"
  },
  name: "Malay (Singapore)",
  native_name: "Bahasa Melayu (Singapore)",
  rtl: false
};
var MalayIndia = {
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u092D\u093E\u0930\u0924"
  },
  id: LocaleCode.MalayIndia,
  language: {
    code: LanguageCode.Malay,
    name: "Malay",
    native: "Bahasa Melayu"
  },
  name: "Malay (India)",
  native_name: "Bahasa Melayu (\u092D\u093E\u0930\u0924)",
  rtl: false
};
var Maltese = {
  id: LocaleCode.Maltese,
  language: {
    code: LanguageCode.Maltese,
    name: "Maltese",
    native: "Malti"
  },
  name: "Maltese",
  native_name: "Malti",
  rtl: false
};
var MalteseMalta = {
  country: {
    code: CountryCode.Malta,
    name: "Malta",
    native: "Malta"
  },
  id: LocaleCode.MalteseMalta,
  language: {
    code: LanguageCode.Maltese,
    name: "Maltese",
    native: "Malti"
  },
  name: "Maltese (Malta)",
  native_name: "Malti (Malta)",
  rtl: false
};
var Maori = {
  id: LocaleCode.Maori,
  language: {
    code: LanguageCode.Maori,
    name: "Maori",
    native: "M\u0101ori"
  },
  name: "Maori",
  native_name: "M\u0101ori",
  rtl: false
};
var MaoriNewZealand = {
  country: {
    code: CountryCode.NewZealand,
    name: "New Zealand",
    native: "New Zealand"
  },
  id: LocaleCode.MaoriNewZealand,
  language: {
    code: LanguageCode.Maori,
    name: "Maori",
    native: "M\u0101ori"
  },
  name: "Maori (New Zealand)",
  native_name: "M\u0101ori (New Zealand)",
  rtl: false
};
var Marathi = {
  id: LocaleCode.Marathi,
  language: {
    code: LanguageCode.Marathi,
    name: "Marathi",
    native: "\u092E\u0930\u093E\u0920\u0940"
  },
  name: "Marathi",
  native_name: "\u092E\u0930\u093E\u0920\u0940",
  rtl: false
};
var MarathiIndia = {
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u092D\u093E\u0930\u0924"
  },
  id: LocaleCode.MarathiIndia,
  language: {
    code: LanguageCode.Marathi,
    name: "Marathi",
    native: "\u092E\u0930\u093E\u0920\u0940"
  },
  name: "Marathi (India)",
  native_name: "\u092E\u0930\u093E\u0920\u0940 (\u092D\u093E\u0930\u0924)",
  rtl: false
};
var Mongolian = {
  id: LocaleCode.Mongolian,
  language: {
    code: LanguageCode.Mongolian,
    name: "Mongolian",
    native: "\u041C\u043E\u043D\u0433\u043E\u043B"
  },
  name: "Mongolian",
  native_name: "\u041C\u043E\u043D\u0433\u043E\u043B",
  rtl: false
};
var MongolianMongolia = {
  country: {
    code: CountryCode.Mongolia,
    name: "Mongolia",
    native: "\u041C\u043E\u043D\u0433\u043E\u043B \u0443\u043B\u0441"
  },
  id: LocaleCode.MongolianMongolia,
  language: {
    code: LanguageCode.Mongolian,
    name: "Mongolian",
    native: "\u041C\u043E\u043D\u0433\u043E\u043B"
  },
  name: "Mongolian (Mongolia)",
  native_name: "\u041C\u043E\u043D\u0433\u043E\u043B (\u041C\u043E\u043D\u0433\u043E\u043B \u0443\u043B\u0441)",
  rtl: false
};
var Montenegrin = {
  id: LocaleCode.Montenegrin,
  language: {
    code: LanguageCode.Montenegrin,
    name: "Montenegrin",
    native: "\u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430\u043A"
  },
  name: "Montenegrin",
  native_name: "\u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430\u043A",
  rtl: false
};
var MontenegrinMontenegro = {
  country: {
    code: CountryCode.Montenegro,
    name: "Montenegro",
    native: "\u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430\u043A"
  },
  id: LocaleCode.MontenegrinMontenegro,
  language: {
    code: LanguageCode.Montenegrin,
    name: "Montenegrin",
    native: "\u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430\u043A"
  },
  name: "Montenegrin (Montenegro)",
  native_name: "\u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430\u043A (\u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430\u043A)",
  rtl: false
};
var Nepali = {
  id: LocaleCode.Nepali,
  language: {
    code: LanguageCode.Nepali,
    name: "Nepali",
    native: "\u0928\u0947\u092A\u093E\u0932\u0940"
  },
  name: "Nepali",
  native_name: "\u0928\u0947\u092A\u093E\u0932\u0940",
  rtl: false
};
var NepaliNepal = {
  country: {
    code: CountryCode.Nepal,
    name: "Nepal",
    native: "\u0928\u0947\u092A\u093E\u0932"
  },
  id: LocaleCode.NepaliNepal,
  language: {
    code: LanguageCode.Nepali,
    name: "Nepali",
    native: "\u0928\u0947\u092A\u093E\u0932\u0940"
  },
  name: "Nepali (Nepal)",
  native_name: "\u0928\u0947\u092A\u093E\u0932\u0940 (\u0928\u0947\u092A\u093E\u0932)",
  rtl: false
};
var NorthernSotho = {
  id: LocaleCode.NorthernSotho,
  language: {
    code: LanguageCode.NorthernSotho,
    name: "Northern Sotho",
    native: "Sesotho sa Leboa"
  },
  name: "Northern Sotho",
  native_name: "Sesotho sa Leboa",
  rtl: false
};
var NorthernSothoSouthAfrica = {
  country: {
    code: CountryCode.SouthAfrica,
    name: "South Africa",
    native: "South Africa"
  },
  id: LocaleCode.NorthernSothoSouthAfrica,
  language: {
    code: LanguageCode.NorthernSotho,
    name: "Northern Sotho",
    native: "Sesotho sa Leboa"
  },
  name: "Northern Sotho (South Africa)",
  native_name: "Sesotho sa Leboa (South Africa)",
  rtl: false
};
var Norwegian = {
  id: LocaleCode.Norwegian,
  language: {
    code: LanguageCode.Norwegian,
    name: "Norwegian",
    native: "Norsk"
  },
  name: "Norwegian",
  native_name: "Norsk",
  rtl: false
};
var NorwegianBokmalNorway = {
  country: {
    code: CountryCode.Norway,
    name: "Norway",
    native: "Norge"
  },
  id: LocaleCode.NorwegianBokmalNorway,
  language: {
    code: LanguageCode.NorwegianBokmal,
    name: "Norwegian",
    native: "Norsk"
  },
  name: "Norwegian (Bokmal)",
  native_name: "Norsk (Bokm\xE5l)",
  rtl: false
};
var NorwegianNynorskNorway = {
  country: {
    code: CountryCode.Norway,
    name: "Norway",
    native: "Norge"
  },
  id: LocaleCode.NorwegianNynorskNorway,
  language: {
    code: LanguageCode.NorwegianNynorsk,
    name: "Norwegian",
    native: "Norsk"
  },
  name: "Norwegian (Nynorsk)",
  native_name: "Norsk (Nynorsk)",
  rtl: false
};
var Oriya = {
  id: LocaleCode.Oriya,
  language: {
    code: LanguageCode.Oriya,
    name: "Oriya",
    native: "\u0B13\u0B21\u0B3C\u0B3F\u0B06"
  },
  name: "Oriya",
  native_name: "\u0B13\u0B21\u0B3C\u0B3F\u0B06",
  rtl: false
};
var OriyaIndia = {
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE"
  },
  id: LocaleCode.OriyaIndia,
  language: {
    code: LanguageCode.Oriya,
    name: "Oriya",
    native: "\u0B13\u0B21\u0B3C\u0B3F\u0B06"
  },
  name: "Oriya (India)",
  native_name: "\u0B13\u0B21\u0B3C\u0B3F\u0B06 (\u0B2D\u0B3E\u0B30\u0B24)",
  rtl: false
};
var Pashto = {
  id: LocaleCode.Pashto,
  language: {
    code: LanguageCode.Pashto,
    name: "Pashto",
    native: "\u067E\u069A\u062A\u0648"
  },
  name: "Pashto",
  native_name: "\u067E\u069A\u062A\u0648",
  rtl: true
};
var PashtoAfghanistan = {
  country: {
    code: CountryCode.Afghanistan,
    name: "Afghanistan",
    native: "\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646"
  },
  id: LocaleCode.PashtoAfghanistan,
  language: {
    code: LanguageCode.Pashto,
    name: "Pashto",
    native: "\u067E\u069A\u062A\u0648"
  },
  name: "Pashto (Afghanistan)",
  native_name: "\u067E\u069A\u062A\u0648 (\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646)",
  rtl: true
};
var Persian = {
  id: LocaleCode.Persian,
  language: {
    code: LanguageCode.Persian,
    name: "Persian",
    native: "\u0641\u0627\u0631\u0633\u06CC"
  },
  name: "Persian",
  native_name: "\u0641\u0627\u0631\u0633\u06CC",
  rtl: true
};
var PersianIran = {
  country: {
    code: CountryCode.Iran,
    name: "Iran",
    native: "\u0627\u06CC\u0631\u0627\u0646"
  },
  id: LocaleCode.PersianIran,
  language: {
    code: LanguageCode.Persian,
    name: "Persian",
    native: "\u0641\u0627\u0631\u0633\u06CC"
  },
  name: "Persian (Iran)",
  native_name: "\u0641\u0627\u0631\u0633\u06CC (\u0627\u06CC\u0631\u0627\u0646)",
  rtl: true
};
var Polish = {
  id: LocaleCode.Polish,
  language: {
    code: LanguageCode.Polish,
    name: "Polish",
    native: "Polski"
  },
  name: "Polish",
  native_name: "Polski",
  rtl: false
};
var PolishPoland = {
  country: {
    code: CountryCode.Poland,
    name: "Poland",
    native: "Polska"
  },
  id: LocaleCode.PolishPoland,
  language: {
    code: LanguageCode.Polish,
    name: "Polish",
    native: "Polski"
  },
  name: "Polish (Poland)",
  native_name: "Polski (Polska)",
  rtl: false
};
var Portuguese = {
  id: LocaleCode.Portuguese,
  language: {
    code: LanguageCode.Portuguese,
    name: "Portuguese",
    native: "Portugu\xEAs"
  },
  name: "Portuguese",
  native_name: "Portugu\xEAs",
  rtl: false
};
var PortugueseBrazil = {
  country: {
    code: CountryCode.Brazil,
    name: "Brazil",
    native: "Brasil"
  },
  id: LocaleCode.PortugueseBrazil,
  language: {
    code: LanguageCode.Portuguese,
    name: "Portuguese",
    native: "Portugu\xEAs"
  },
  name: "Portuguese (Brazil)",
  native_name: "Portugu\xEAs (Brasil)",
  rtl: false
};
var PortuguesePortugal = {
  country: {
    code: CountryCode.Portugal,
    name: "Portugal",
    native: "Portugal"
  },
  id: LocaleCode.PortuguesePortugal,
  language: {
    code: LanguageCode.Portuguese,
    name: "Portuguese",
    native: "Portugu\xEAs"
  },
  name: "Portuguese (Portugal)",
  native_name: "Portugu\xEAs (Portugal)",
  rtl: false
};
var Punjabi = {
  id: LocaleCode.Punjabi,
  language: {
    code: LanguageCode.Punjabi,
    name: "Punjabi",
    native: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40"
  },
  name: "Punjabi",
  native_name: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40",
  rtl: true
};
var PunjabiPakistan = {
  country: {
    code: CountryCode.Pakistan,
    name: "Pakistan",
    native: "\u067E\u0627\u06A9\u0633\u062A\u0627\u0646"
  },
  id: LocaleCode.PunjabiPakistan,
  language: {
    code: LanguageCode.Punjabi,
    name: "Punjabi",
    native: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40"
  },
  name: "Punjabi (Pakistan)",
  native_name: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40 (\u067E\u0627\u06A9\u0633\u062A\u0627\u0646)",
  rtl: true
};
var PunjabiIndia = {
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u0A2D\u0A3E\u0A30\u0A24"
  },
  id: LocaleCode.PunjabiIndia,
  language: {
    code: LanguageCode.Punjabi,
    name: "Punjabi",
    native: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40"
  },
  name: "Punjabi (India)",
  native_name: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40 (\u0A2D\u0A3E\u0A30\u0A24)",
  rtl: true
};
var Quechua = {
  id: LocaleCode.Quechua,
  language: {
    code: LanguageCode.Quechua,
    name: "Quechua",
    native: "Runa Simi"
  },
  name: "Quechua",
  native_name: "Runa Simi",
  rtl: false
};
var QuechuaBolivia = {
  country: {
    code: CountryCode.Bolivia,
    name: "Bolivia",
    native: "Bolivia"
  },
  id: LocaleCode.QuechuaBolivia,
  language: {
    code: LanguageCode.Quechua,
    name: "Quechua",
    native: "Runa Simi"
  },
  name: "Quechua (Bolivia)",
  native_name: "Runa Simi (Bolivia)",
  rtl: false
};
var QuechuaEcuador = {
  country: {
    code: CountryCode.Ecuador,
    name: "Ecuador",
    native: "Ecuador"
  },
  id: LocaleCode.QuechuaEcuador,
  language: {
    code: LanguageCode.Quechua,
    name: "Quechua",
    native: "Runa Simi"
  },
  name: "Quechua (Ecuador)",
  native_name: "Runa Simi (Ecuador)",
  rtl: false
};
var QuechuaPeru = {
  country: {
    code: CountryCode.Peru,
    name: "Peru",
    native: "Per\xFA"
  },
  id: LocaleCode.QuechuaPeru,
  language: {
    code: LanguageCode.Quechua,
    name: "Quechua",
    native: "Runa Simi"
  },
  name: "Quechua (Peru)",
  native_name: "Runa Simi (Per\xFA)",
  rtl: false
};
var Romanian = {
  id: LocaleCode.Romanian,
  language: {
    code: LanguageCode.Romanian,
    name: "Romanian",
    native: "Rom\xE2n\u0103"
  },
  name: "Romanian",
  native_name: "Rom\xE2n\u0103",
  rtl: false
};
var RomanianRomania = {
  country: {
    code: CountryCode.Romania,
    name: "Romania",
    native: "Rom\xE2nia"
  },
  id: LocaleCode.RomanianRomania,
  language: {
    code: LanguageCode.Romanian,
    name: "Romanian",
    native: "Rom\xE2n\u0103"
  },
  name: "Romanian (Romania)",
  native_name: "Rom\xE2n\u0103 (Rom\xE2nia)",
  rtl: false
};
var Russian = {
  id: LocaleCode.Russian,
  language: {
    code: LanguageCode.Russian,
    name: "Russian",
    native: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"
  },
  name: "Russian",
  native_name: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439",
  rtl: false
};
var RussianRussia = {
  country: {
    code: CountryCode.RussianFederation,
    name: "Russian Federation",
    native: "\u0420\u043E\u0441\u0441\u0438\u044F"
  },
  id: LocaleCode.RussianRussia,
  language: {
    code: LanguageCode.Russian,
    name: "Russian",
    native: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"
  },
  name: "Russian (Russia)",
  native_name: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439 (\u0420\u043E\u0441\u0441\u0438\u044F)",
  rtl: false
};
var RussianUkraine = {
  country: {
    code: CountryCode.Ukraine,
    name: "Ukraine",
    native: "\u0423\u043A\u0440\u0430\u0457\u043D\u0430"
  },
  id: LocaleCode.RussianUkraine,
  language: {
    code: LanguageCode.Russian,
    name: "Russian",
    native: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"
  },
  name: "Russian (Ukraine)",
  native_name: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439 (\u0423\u043A\u0440\u0430\u0457\u043D\u0430)",
  rtl: false
};
var RussianKazakhstan = {
  country: {
    code: CountryCode.Kazakhstan,
    name: "Kazakhstan",
    native: "\u049A\u0430\u0437\u0430\u049B\u0441\u0442\u0430\u043D"
  },
  id: LocaleCode.RussianKazakhstan,
  language: {
    code: LanguageCode.Russian,
    name: "Russian",
    native: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"
  },
  name: "Russian (Kazakhstan)",
  native_name: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439 (\u049A\u0430\u0437\u0430\u049B\u0441\u0442\u0430\u043D)",
  rtl: false
};
var RussianKyrgyzstan = {
  country: {
    code: CountryCode.Kyrgyzstan,
    name: "Kyrgyzstan",
    native: "\u041A\u044B\u0440\u0433\u044B\u0437\u0447\u0430"
  },
  id: LocaleCode.RussianKyrgyzstan,
  language: {
    code: LanguageCode.Russian,
    name: "Russian",
    native: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"
  },
  name: "Russian (Kyrgyzstan)",
  native_name: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439 (\u041A\u044B\u0440\u0433\u044B\u0437\u0447\u0430)",
  rtl: false
};
var Sanskrit = {
  id: LocaleCode.Sanskrit,
  language: {
    code: LanguageCode.Sanskrit,
    name: "Sanskrit",
    native: "\u0938\u0902\u0938\u094D\u0915\u0943\u0924\u092E\u094D"
  },
  name: "Sanskrit",
  native_name: "\u0938\u0902\u0938\u094D\u0915\u0943\u0924\u092E\u094D",
  rtl: false
};
var SanskritIndia = {
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u092D\u093E\u0930\u0924"
  },
  id: LocaleCode.SanskritIndia,
  language: {
    code: LanguageCode.Sanskrit,
    name: "Sanskrit",
    native: "\u0938\u0902\u0938\u094D\u0915\u0943\u0924\u092E\u094D"
  },
  name: "Sanskrit (India)",
  native_name: "\u0938\u0902\u0938\u094D\u0915\u0943\u0924\u092E\u094D (\u092D\u093E\u0930\u0924)",
  rtl: false
};
var Sami = {
  id: LocaleCode.Sami,
  language: {
    code: LanguageCode.Sami,
    name: "Sami",
    native: "S\xE1megiella"
  },
  name: "Sami",
  native_name: "S\xE1megiella",
  rtl: false
};
var SamiFinland = {
  country: {
    code: CountryCode.Finland,
    name: "Finland",
    native: "Suomi"
  },
  id: LocaleCode.SamiFinland,
  language: {
    code: LanguageCode.Sami,
    name: "Sami",
    native: "S\xE1megiella"
  },
  name: "Sami (Finland)",
  native_name: "S\xE1megiella (Suomi)",
  rtl: false
};
var SamiNorway = {
  country: {
    code: CountryCode.Norway,
    name: "Norway",
    native: "Norge"
  },
  id: LocaleCode.SamiNorway,
  language: {
    code: LanguageCode.Sami,
    name: "Sami",
    native: "S\xE1megiella"
  },
  name: "Sami (Norway)",
  native_name: "S\xE1megiella (Norge)",
  rtl: false
};
var SamiSweden = {
  country: {
    code: CountryCode.Sweden,
    name: "Sweden",
    native: "Sverige"
  },
  id: LocaleCode.SamiSweden,
  language: {
    code: LanguageCode.Sami,
    name: "Sami",
    native: "S\xE1megiella"
  },
  name: "Sami (Sweden)",
  native_name: "S\xE1megiella (Sverige)",
  rtl: false
};
var Samoan = {
  id: LocaleCode.Samoan,
  language: {
    code: LanguageCode.Samoan,
    name: "Samoan",
    native: "Gagana fa\u2019a S\u0101moa"
  },
  name: "Samoan",
  native_name: "Gagana fa\u2019a S\u0101moa",
  rtl: false
};
var SamoanSamoa = {
  country: {
    code: CountryCode.Samoa,
    name: "Samoa",
    native: "Samoa"
  },
  id: LocaleCode.SamoanSamoa,
  language: {
    code: LanguageCode.Samoan,
    name: "Samoan",
    native: "Gagana fa\u2019a S\u0101moa"
  },
  name: "Samoan (Samoa)",
  native_name: "Gagana fa\u2019a S\u0101moa (Samoa)",
  rtl: false
};
var Serbian = {
  id: LocaleCode.Serbian,
  language: {
    code: LanguageCode.Serbian,
    name: "Serbian (Latin)",
    native: "Srpski (Latinica)"
  },
  name: "Serbian (Latin)",
  native_name: "Srpski (Latinica)",
  rtl: false
};
var SerbianBosniaAndHerzegovina = {
  country: {
    code: CountryCode.BosniaAndHerzegovina,
    name: "Bosnia and Herzegovina",
    native: "Bosna i Hercegovina"
  },
  id: LocaleCode.SerbianBosniaAndHerzegovina,
  language: {
    code: LanguageCode.Serbian,
    name: "Serbian (Latin)",
    native: "Srpski (Latinica)"
  },
  name: "Serbian (Latin) (Bosnia and Herzegovina)",
  native_name: "Srpski (Latinica) (Bosna i Hercegovina)",
  rtl: false
};
var SerbianSerbiaAndMontenegro = {
  country: {
    code: CountryCode.SerbiaAndMontenegro,
    name: "Serbia and Montenegro",
    native: "Srbija i Crna Gora"
  },
  id: LocaleCode.SerbianSerbiaAndMontenegro,
  language: {
    code: LanguageCode.Serbian,
    name: "Serbian (Latin)",
    native: "Srpski (Latinica)"
  },
  name: "Serbian (Latin) (Serbia and Montenegro)",
  native_name: "Srpski (Latinica) (Srbija i Crna Gora)",
  rtl: false
};
var SerbianCyrillic = {
  id: LocaleCode.SerbianCyrillic,
  language: {
    code: LanguageCode.SerbianCyrillic,
    name: "Serbian",
    native: "\u0421\u0440\u043F\u0441\u043A\u0438"
  },
  name: "Serbian (Cyrillic)",
  native_name: "\u0421\u0440\u043F\u0441\u043A\u0438 (\u040B\u0438\u0440\u0438\u043B\u0438\u0446\u0430)",
  rtl: false
};
var SerbianCyrillicBosniaAndHerzegovina = {
  country: {
    code: CountryCode.BosniaAndHerzegovina,
    name: "Bosnia and Herzegovina",
    native: "\u0411\u043E\u0441\u043D\u0430 \u0438 \u0425\u0435\u0440\u0446\u0435\u0433\u043E\u0432\u0438\u043D\u0430"
  },
  id: LocaleCode.SerbianCyrillicBosniaAndHerzegovina,
  language: {
    code: LanguageCode.SerbianCyrillic,
    name: "Serbian",
    native: "\u0421\u0440\u043F\u0441\u043A\u0438"
  },
  name: "Serbian (Cyrillic, Bosnia and Herzegovina)",
  native_name: "\u0421\u0440\u043F\u0441\u043A\u0438 (\u040B\u0438\u0440\u0438\u043B\u0438\u0446\u0430, \u0411\u043E\u0441\u043D\u0430 \u0438 \u0425\u0435\u0440\u0446\u0435\u0433\u043E\u0432\u0438\u043D\u0430)",
  rtl: false
};
var SerbianCyrillicSerbiaAndMontenegro = {
  country: {
    code: CountryCode.SerbiaAndMontenegro,
    name: "Serbia and Montenegro",
    native: "\u0421\u0440\u0431\u0438\u0458\u0430 \u0438 \u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430"
  },
  id: LocaleCode.SerbianCyrillicSerbiaAndMontenegro,
  language: {
    code: LanguageCode.SerbianCyrillic,
    name: "Serbian",
    native: "\u0421\u0440\u043F\u0441\u043A\u0438"
  },
  name: "Serbian (Cyrillic, Serbia and Montenegro)",
  native_name: "\u0421\u0440\u043F\u0441\u043A\u0438 (\u040B\u0438\u0440\u0438\u043B\u0438\u0446\u0430, \u0421\u0440\u0431\u0438\u0458\u0430 \u0438 \u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430)",
  rtl: false
};
var Slovak = {
  id: LocaleCode.Slovak,
  language: {
    code: LanguageCode.Slovak,
    name: "Slovak",
    native: "Sloven\u010Dina"
  },
  name: "Slovak",
  native_name: "Sloven\u010Dina",
  rtl: false
};
var SlovakSlovakia = {
  country: {
    code: CountryCode.Slovakia,
    name: "Slovakia",
    native: "Slovensko"
  },
  id: LocaleCode.SlovakSlovakia,
  language: {
    code: LanguageCode.Slovak,
    name: "Slovak",
    native: "Sloven\u010Dina"
  },
  name: "Slovak (Slovakia)",
  native_name: "Sloven\u010Dina (Slovensko)",
  rtl: false
};
var Slovenian = {
  id: LocaleCode.Slovenian,
  language: {
    code: LanguageCode.Slovenian,
    name: "Slovenian",
    native: "Sloven\u0161\u010Dina"
  },
  name: "Slovenian",
  native_name: "Sloven\u0161\u010Dina",
  rtl: false
};
var SlovenianSlovenia = {
  country: {
    code: CountryCode.Slovenia,
    name: "Slovenia",
    native: "Slovenija"
  },
  id: LocaleCode.SlovenianSlovenia,
  language: {
    code: LanguageCode.Slovenian,
    name: "Slovenian",
    native: "Sloven\u0161\u010Dina"
  },
  name: "Slovenian (Slovenia)",
  native_name: "Sloven\u0161\u010Dina (Slovenija)",
  rtl: false
};
var Somali = {
  id: LocaleCode.Somali,
  language: {
    code: LanguageCode.Somali,
    name: "Somali",
    native: "Soomaaliga"
  },
  name: "Somali",
  native_name: "Soomaaliga",
  rtl: true
};
var SomaliSomalia = {
  country: {
    code: CountryCode.Somalia,
    name: "Somalia",
    native: "Soomaaliya"
  },
  id: LocaleCode.SomaliSomalia,
  language: {
    code: LanguageCode.Somali,
    name: "Somali",
    native: "Soomaaliga"
  },
  name: "Somali (Somalia)",
  native_name: "Soomaaliga (Soomaaliya)",
  rtl: true
};
var Spanish = {
  id: LocaleCode.Spanish,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish",
  native_name: "Espa\xF1ol",
  rtl: false
};
var SpanishArgentina = {
  country: {
    code: CountryCode.Argentina,
    name: "Argentina",
    native: "Argentina"
  },
  id: LocaleCode.SpanishArgentina,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Argentina)",
  native_name: "Espa\xF1ol (Argentina)",
  rtl: false
};
var SpanishBolivia = {
  country: {
    code: CountryCode.Bolivia,
    name: "Bolivia",
    native: "Bolivia"
  },
  id: LocaleCode.SpanishBolivia,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Bolivia)",
  native_name: "Espa\xF1ol (Bolivia)",
  rtl: false
};
var SpanishChile = {
  country: {
    code: CountryCode.Chile,
    name: "Chile",
    native: "Chile"
  },
  id: LocaleCode.SpanishChile,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Chile)",
  native_name: "Espa\xF1ol (Chile)",
  rtl: false
};
var SpanishColombia = {
  country: {
    code: CountryCode.Colombia,
    name: "Colombia",
    native: "Colombia"
  },
  id: LocaleCode.SpanishColombia,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Colombia)",
  native_name: "Espa\xF1ol (Colombia)",
  rtl: false
};
var SpanishCostaRica = {
  country: {
    code: CountryCode.CostaRica,
    name: "Costa Rica",
    native: "Costa Rica"
  },
  id: LocaleCode.SpanishCostaRica,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Costa Rica)",
  native_name: "Espa\xF1ol (Costa Rica)",
  rtl: false
};
var SpanishCuba = {
  country: {
    code: CountryCode.Cuba,
    name: "Cuba",
    native: "Cuba"
  },
  id: LocaleCode.SpanishCuba,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Cuba)",
  native_name: "Espa\xF1ol (Cuba)",
  rtl: false
};
var SpanishDominicanRepublic = {
  country: {
    code: CountryCode.DominicanRepublic,
    name: "Dominican Republic",
    native: "Rep\xFAblica Dominicana"
  },
  id: LocaleCode.SpanishDominicanRepublic,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Dominican Republic)",
  native_name: "Espa\xF1ol (Rep\xFAblica Dominicana)",
  rtl: false
};
var SpanishEcuador = {
  country: {
    code: CountryCode.Ecuador,
    name: "Ecuador",
    native: "Ecuador"
  },
  id: LocaleCode.SpanishEcuador,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Ecuador)",
  native_name: "Espa\xF1ol (Ecuador)",
  rtl: false
};
var SpanishElSalvador = {
  country: {
    code: CountryCode.ElSalvador,
    name: "El Salvador",
    native: "El Salvador"
  },
  id: LocaleCode.SpanishElSalvador,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (El Salvador)",
  native_name: "Espa\xF1ol (El Salvador)",
  rtl: false
};
var SpanishEquatorialGuinea = {
  country: {
    code: CountryCode.EquatorialGuinea,
    name: "Equatorial Guinea",
    native: "Guinea Ecuatorial"
  },
  id: LocaleCode.SpanishEquatorialGuinea,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Equatorial Guinea)",
  native_name: "Espa\xF1ol (Guinea Ecuatorial)",
  rtl: false
};
var SpanishGuatemala = {
  country: {
    code: CountryCode.Guatemala,
    name: "Guatemala",
    native: "Guatemala"
  },
  id: LocaleCode.SpanishGuatemala,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Guatemala)",
  native_name: "Espa\xF1ol (Guatemala)",
  rtl: false
};
var SpanishHonduras = {
  country: {
    code: CountryCode.Honduras,
    name: "Honduras",
    native: "Honduras"
  },
  id: LocaleCode.SpanishHonduras,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Honduras)",
  native_name: "Espa\xF1ol (Honduras)",
  rtl: false
};
var SpanishMexico = {
  country: {
    code: CountryCode.Mexico,
    name: "Mexico",
    native: "M\xE9xico"
  },
  id: LocaleCode.SpanishMexico,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Mexico)",
  native_name: "Espa\xF1ol (M\xE9xico)",
  rtl: false
};
var SpanishNicaragua = {
  country: {
    code: CountryCode.Nicaragua,
    name: "Nicaragua",
    native: "Nicaragua"
  },
  id: LocaleCode.SpanishNicaragua,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Nicaragua)",
  native_name: "Espa\xF1ol (Nicaragua)",
  rtl: false
};
var SpanishPanama = {
  country: {
    code: CountryCode.Panama,
    name: "Panama",
    native: "Panam\xE1"
  },
  id: LocaleCode.SpanishPanama,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Panama)",
  native_name: "Espa\xF1ol (Panam\xE1)",
  rtl: false
};
var SpanishParaguay = {
  country: {
    code: CountryCode.Paraguay,
    name: "Paraguay",
    native: "Paraguay"
  },
  id: LocaleCode.SpanishParaguay,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Paraguay)",
  native_name: "Espa\xF1ol (Paraguay)",
  rtl: false
};
var SpanishPeru = {
  country: {
    code: CountryCode.Peru,
    name: "Peru",
    native: "Per\xFA"
  },
  id: LocaleCode.SpanishPeru,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Peru)",
  native_name: "Espa\xF1ol (Per\xFA)",
  rtl: false
};
var SpanishPuertoRico = {
  country: {
    code: CountryCode.PuertoRico,
    name: "Puerto Rico",
    native: "Puerto Rico"
  },
  id: LocaleCode.SpanishPuertoRico,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Puerto Rico)",
  native_name: "Espa\xF1ol (Puerto Rico)",
  rtl: false
};
var SpanishUruguay = {
  country: {
    code: CountryCode.Uruguay,
    name: "Uruguay",
    native: "Uruguay"
  },
  id: LocaleCode.SpanishUruguay,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Uruguay)",
  native_name: "Espa\xF1ol (Uruguay)",
  rtl: false
};
var SpanishVenezuela = {
  country: {
    code: CountryCode.Venezuela,
    name: "Venezuela",
    native: "Venezuela"
  },
  id: LocaleCode.SpanishVenezuela,
  language: {
    code: LanguageCode.Spanish,
    name: "Spanish",
    native: "Espa\xF1ol"
  },
  name: "Spanish (Venezuela)",
  native_name: "Espa\xF1ol (Venezuela)",
  rtl: false
};
var SutuSouthAfrica = {
  country: {
    code: CountryCode.SouthAfrica,
    name: "South Africa",
    native: "South Africa"
  },
  id: LocaleCode.SutuSouthAfrica,
  language: {
    code: LanguageCode.Sutu,
    name: "Sutu",
    native: "Sesotho"
  },
  name: "Sutu (South Africa)",
  native_name: "Sesotho (Afrika Borwa)",
  rtl: false
};
var Swahili = {
  id: LocaleCode.Swahili,
  language: {
    code: LanguageCode.Swahili,
    name: "Swahili",
    native: "Kiswahili"
  },
  name: "Swahili",
  native_name: "Kiswahili",
  rtl: false
};
var SwahiliKenya = {
  country: {
    code: CountryCode.Kenya,
    name: "Kenya",
    native: "Kenya"
  },
  id: LocaleCode.SwahiliKenya,
  language: {
    code: LanguageCode.Swahili,
    name: "Swahili",
    native: "Kiswahili"
  },
  name: "Swahili (Kenya)",
  native_name: "Kiswahili (Kenya)",
  rtl: false
};
var Swedish = {
  id: LocaleCode.Swedish,
  language: {
    code: LanguageCode.Swedish,
    name: "Swedish",
    native: "Svenska"
  },
  name: "Swedish",
  native_name: "Svenska",
  rtl: false
};
var SwedishFinland = {
  country: {
    code: CountryCode.Finland,
    name: "Finland",
    native: "Suomi"
  },
  id: LocaleCode.SwedishFinland,
  language: {
    code: LanguageCode.Swedish,
    name: "Swedish",
    native: "Svenska"
  },
  name: "Swedish (Finland)",
  native_name: "Svenska (Finland)",
  rtl: false
};
var SwedishSweden = {
  country: {
    code: CountryCode.Sweden,
    name: "Sweden",
    native: "Sverige"
  },
  id: LocaleCode.SwedishSweden,
  language: {
    code: LanguageCode.Swedish,
    name: "Swedish",
    native: "Svenska"
  },
  name: "Swedish (Sweden)",
  native_name: "Svenska (Sverige)",
  rtl: false
};
var Syriac = {
  id: LocaleCode.Syriac,
  language: {
    code: LanguageCode.Syriac,
    name: "Syriac",
    native: "\u0723\u0718\u072A\u071D\u071D\u0710"
  },
  name: "Syriac",
  native_name: "\u0723\u0718\u072A\u071D\u071D\u0710",
  rtl: true
};
var SyriacSyria = {
  country: {
    code: CountryCode.Syria,
    name: "Syria",
    native: "\u0633\u0648\u0631\u064A\u0627"
  },
  id: LocaleCode.SyriacSyria,
  language: {
    code: LanguageCode.Syriac,
    name: "Syriac",
    native: "\u0723\u0718\u072A\u071D\u071D\u0710"
  },
  name: "Syriac (Syria)",
  native_name: "\u0723\u0718\u072A\u071D\u071D\u0710 (\u0633\u0648\u0631\u064A\u0627)",
  rtl: true
};
var Tajik = {
  id: LocaleCode.Tajik,
  language: {
    code: LanguageCode.Tajik,
    name: "Tajik",
    native: "\u0422\u043E\u04B7\u0438\u043A\u04E3"
  },
  name: "Tajik",
  native_name: "\u0422\u043E\u04B7\u0438\u043A\u04E3",
  rtl: false
};
var TajikTajikistan = {
  country: {
    code: CountryCode.Tajikistan,
    name: "Tajikistan",
    native: "\u0422\u043E\u04B7\u0438\u043A\u0438\u0441\u0442\u043E\u043D"
  },
  id: LocaleCode.TajikTajikistan,
  language: {
    code: LanguageCode.Tajik,
    name: "Tajik",
    native: "\u0422\u043E\u04B7\u0438\u043A\u04E3"
  },
  name: "Tajik (Tajikistan)",
  native_name: "\u0422\u043E\u04B7\u0438\u043A\u04E3 (\u0422\u043E\u04B7\u0438\u043A\u0438\u0441\u0442\u043E\u043D)",
  rtl: false
};
var Tagalog = {
  id: LocaleCode.Tagalog,
  language: {
    code: LanguageCode.Tagalog,
    name: "Tagalog",
    native: "Tagalog"
  },
  name: "Tagalog",
  native_name: "Tagalog",
  rtl: false
};
var TagalogPhilippines = {
  country: {
    code: CountryCode.Philippines,
    name: "Philippines",
    native: "Pilipinas"
  },
  id: LocaleCode.TagalogPhilippines,
  language: {
    code: LanguageCode.Tagalog,
    name: "Tagalog",
    native: "Tagalog"
  },
  name: "Tagalog (Philippines)",
  native_name: "Tagalog (Pilipinas)",
  rtl: false
};
var Tamil = {
  id: LocaleCode.Tamil,
  language: {
    code: LanguageCode.Tamil,
    name: "Tamil",
    native: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD"
  },
  name: "Tamil",
  native_name: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD",
  rtl: false
};
var TamilIndia = {
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE"
  },
  id: LocaleCode.TamilIndia,
  language: {
    code: LanguageCode.Tamil,
    name: "Tamil",
    native: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD"
  },
  name: "Tamil (India)",
  native_name: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD (\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE)",
  rtl: false
};
var Telugu = {
  id: LocaleCode.Telugu,
  language: {
    code: LanguageCode.Telugu,
    name: "Telugu",
    native: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41"
  },
  name: "Telugu",
  native_name: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41",
  rtl: false
};
var TeluguIndia = {
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u0C2D\u0C3E\u0C30\u0C24\u0C26\u0C47\u0C36\u0C02"
  },
  id: LocaleCode.TeluguIndia,
  language: {
    code: LanguageCode.Telugu,
    name: "Telugu",
    native: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41"
  },
  name: "Telugu (India)",
  native_name: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41 (\u0C2D\u0C3E\u0C30\u0C24\u0C26\u0C47\u0C36\u0C02)",
  rtl: false
};
var Thai = {
  id: LocaleCode.Thai,
  language: {
    code: LanguageCode.Thai,
    name: "Thai",
    native: "\u0E44\u0E17\u0E22"
  },
  name: "Thai",
  native_name: "\u0E44\u0E17\u0E22",
  rtl: false
};
var ThaiThailand = {
  country: {
    code: CountryCode.Thailand,
    name: "Thailand",
    native: "\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28\u0E44\u0E17\u0E22"
  },
  id: LocaleCode.ThaiThailand,
  language: {
    code: LanguageCode.Thai,
    name: "Thai",
    native: "\u0E44\u0E17\u0E22"
  },
  name: "Thai (Thailand)",
  native_name: "\u0E44\u0E17\u0E22 (\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28\u0E44\u0E17\u0E22)",
  rtl: false
};
var Tibetan = {
  id: LocaleCode.Tibetan,
  language: {
    code: LanguageCode.Tibetan,
    name: "Tibetan",
    native: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42"
  },
  name: "Tibetan",
  native_name: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42",
  rtl: false
};
var TibetanChina = {
  country: {
    code: CountryCode.China,
    name: "China",
    native: "\u4E2D\u56FD"
  },
  id: LocaleCode.TibetanChina,
  language: {
    code: LanguageCode.Tibetan,
    name: "Tibetan",
    native: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42"
  },
  name: "Tibetan (China)",
  native_name: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42 (\u0F62\u0F92\u0FB1\u0F0B\u0F53\u0F42)",
  rtl: false
};
var TibetanBhutan = {
  country: {
    code: CountryCode.Bhutan,
    name: "Bhutan",
    native: "\u0F60\u0F56\u0FB2\u0F74\u0F42\u0F0B\u0F61\u0F74\u0F63\u0F0B\u0F66\u0FA4\u0FB1\u0F72\u0F0B\u0F63\u0F7A\u0F53\u0F4C\u0F0D"
  },
  id: LocaleCode.TibetanBhutan,
  language: {
    code: LanguageCode.Tibetan,
    name: "Tibetan",
    native: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42"
  },
  name: "Tibetan (Bhutan)",
  native_name: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42 (\u0F60\u0F56\u0FB2\u0F74\u0F42\u0F0B\u0F61\u0F74\u0F63\u0F0B\u0F66\u0FA4\u0FB1\u0F72\u0F0B\u0F63\u0F7A\u0F53\u0F4C\u0F0D)",
  rtl: false
};
var TibetanIndia = {
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE"
  },
  id: LocaleCode.TibetanIndia,
  language: {
    code: LanguageCode.Tibetan,
    name: "Tibetan",
    native: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42"
  },
  name: "Tibetan (India)",
  native_name: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42 (\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE)",
  rtl: false
};
var Tsonga = {
  id: LocaleCode.Tsonga,
  language: {
    code: LanguageCode.Tsonga,
    name: "Tsonga",
    native: "Xitsonga"
  },
  name: "Tsonga",
  native_name: "Xitsonga",
  rtl: false
};
var Tswana = {
  id: LocaleCode.Tswana,
  language: {
    code: LanguageCode.Tswana,
    name: "Tswana",
    native: "Setswana"
  },
  name: "Tswana",
  native_name: "Setswana",
  rtl: false
};
var TswanaSouthAfrica = {
  country: {
    code: CountryCode.SouthAfrica,
    name: "South Africa",
    native: "South Africa"
  },
  id: LocaleCode.TswanaSouthAfrica,
  language: {
    code: LanguageCode.Tswana,
    name: "Tswana",
    native: "Setswana"
  },
  name: "Tswana (South Africa)",
  native_name: "Setswana (South Africa)",
  rtl: false
};
var Turkish = {
  id: LocaleCode.Turkish,
  language: {
    code: LanguageCode.Turkish,
    name: "Turkish",
    native: "T\xFCrk\xE7e"
  },
  name: "Turkish",
  native_name: "T\xFCrk\xE7e",
  rtl: false
};
var TurkishTurkey = {
  country: {
    code: CountryCode.Turkey,
    name: "Turkey",
    native: "T\xFCrkiye"
  },
  id: LocaleCode.TurkishTurkey,
  language: {
    code: LanguageCode.Turkish,
    name: "Turkish",
    native: "T\xFCrk\xE7e"
  },
  name: "Turkish (Turkey)",
  native_name: "T\xFCrk\xE7e (T\xFCrkiye)",
  rtl: false
};
var Ukrainian = {
  id: LocaleCode.Ukrainian,
  language: {
    code: LanguageCode.Ukrainian,
    name: "Ukrainian",
    native: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430"
  },
  name: "Ukrainian",
  native_name: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430",
  rtl: false
};
var UkrainianUkraine = {
  country: {
    code: CountryCode.Ukraine,
    name: "Ukraine",
    native: "\u0423\u043A\u0440\u0430\u0457\u043D\u0430"
  },
  id: LocaleCode.UkrainianUkraine,
  language: {
    code: LanguageCode.Ukrainian,
    name: "Ukrainian",
    native: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430"
  },
  name: "Ukrainian (Ukraine)",
  native_name: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430 (\u0423\u043A\u0440\u0430\u0457\u043D\u0430)",
  rtl: false
};
var Urdu = {
  id: LocaleCode.Urdu,
  language: {
    code: LanguageCode.Urdu,
    name: "Urdu",
    native: "\u0627\u0631\u062F\u0648"
  },
  name: "Urdu",
  native_name: "\u0627\u0631\u062F\u0648",
  rtl: true
};
var UrduAfghanistan = {
  country: {
    code: CountryCode.Afghanistan,
    name: "Afghanistan",
    native: "\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646"
  },
  id: LocaleCode.UrduAfghanistan,
  language: {
    code: LanguageCode.Urdu,
    name: "Urdu",
    native: "\u0627\u0631\u062F\u0648"
  },
  name: "Urdu (Afghanistan)",
  native_name: "\u0627\u0631\u062F\u0648 (\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646)",
  rtl: true
};
var UrduIndia = {
  country: {
    code: CountryCode.India,
    name: "India",
    native: "\u092D\u093E\u0930\u0924"
  },
  id: LocaleCode.UrduIndia,
  language: {
    code: LanguageCode.Urdu,
    name: "Urdu",
    native: "\u0627\u0631\u062F\u0648"
  },
  name: "Urdu (India)",
  native_name: "\u0627\u0631\u062F\u0648 (\u092D\u093E\u0930\u0924)",
  rtl: true
};
var UrduPakistan = {
  country: {
    code: CountryCode.Pakistan,
    name: "Pakistan",
    native: "\u067E\u0627\u06A9\u0633\u062A\u0627\u0646"
  },
  id: LocaleCode.UrduPakistan,
  language: {
    code: LanguageCode.Urdu,
    name: "Urdu",
    native: "\u0627\u0631\u062F\u0648"
  },
  name: "Urdu (Pakistan)",
  native_name: "\u0627\u0631\u062F\u0648 (\u067E\u0627\u06A9\u0633\u062A\u0627\u0646)",
  rtl: true
};
var UzbekLatin = {
  id: LocaleCode.Uzbek,
  language: {
    code: LanguageCode.Uzbek,
    name: "Uzbek",
    native: "O\u02BBzbekcha"
  },
  name: "Uzbek",
  native_name: "O\u02BBzbekcha",
  rtl: false
};
var UzbekUzbekistan = {
  country: {
    code: CountryCode.Uzbekistan,
    name: "Uzbekistan",
    native: "O\u02BBzbekiston"
  },
  id: LocaleCode.UzbekUzbekistan,
  language: {
    code: LanguageCode.Uzbek,
    name: "Uzbek",
    native: "O\u02BBzbekcha"
  },
  name: "Uzbek (Latin, Uzbekistan)",
  native_name: "O\u02BBzbekcha (O\u02BBzbekiston)",
  rtl: false
};
var UzbekCyrillic = {
  country: {
    code: CountryCode.Uzbekistan,
    name: "Uzbekistan",
    native: "\u040E\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u043E\u043D"
  },
  id: LocaleCode.UzbekCyrillic,
  language: {
    code: LanguageCode.Uzbek,
    name: "Uzbek",
    native: "\u040E\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u043E\u043D"
  },
  name: "Uzbek (Cyrillic)",
  native_name: "\u040E\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u043E\u043D (\u040E\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u043E\u043D)",
  rtl: false
};
var Vietnamese = {
  id: LocaleCode.Vietnamese,
  language: {
    code: LanguageCode.Vietnamese,
    name: "Vietnamese",
    native: "Ti\u1EBFng Vi\u1EC7t"
  },
  name: "Vietnamese",
  native_name: "Ti\u1EBFng Vi\u1EC7t",
  rtl: false
};
var VietnameseVietnam = {
  country: {
    code: CountryCode.Vietnam,
    name: "Vietnam",
    native: "Vi\u1EC7t Nam"
  },
  id: LocaleCode.VietnameseVietnam,
  language: {
    code: LanguageCode.Vietnamese,
    name: "Vietnamese",
    native: "Ti\u1EBFng Vi\u1EC7t"
  },
  name: "Vietnamese (Vietnam)",
  native_name: "Ti\u1EBFng Vi\u1EC7t (Vi\u1EC7t Nam)",
  rtl: false
};
var Welsh = {
  id: LocaleCode.Welsh,
  language: {
    code: LanguageCode.Welsh,
    name: "Welsh",
    native: "Cymraeg"
  },
  name: "Welsh",
  native_name: "Cymraeg",
  rtl: false
};
var WelshUnitedKingdom = {
  country: {
    code: CountryCode.UnitedKingdom,
    name: "United Kingdom",
    native: "United Kingdom"
  },
  id: LocaleCode.WelshUnitedKingdom,
  language: {
    code: LanguageCode.Welsh,
    name: "Welsh",
    native: "Cymraeg"
  },
  name: "Welsh (United Kingdom)",
  native_name: "Cymraeg (United Kingdom)",
  rtl: false
};
var Xhosa = {
  id: LocaleCode.Xhosa,
  language: {
    code: LanguageCode.Xhosa,
    name: "Xhosa",
    native: "isiXhosa"
  },
  name: "Xhosa",
  native_name: "isiXhosa",
  rtl: false
};
var XhosaSouthAfrica = {
  country: {
    code: CountryCode.SouthAfrica,
    name: "South Africa",
    native: "South Africa"
  },
  id: LocaleCode.XhosaSouthAfrica,
  language: {
    code: LanguageCode.Xhosa,
    name: "Xhosa",
    native: "isiXhosa"
  },
  name: "Xhosa (South Africa)",
  native_name: "isiXhosa (South Africa)",
  rtl: false
};
var Yiddish = {
  id: LocaleCode.Yiddish,
  language: {
    code: LanguageCode.Yiddish,
    name: "Yiddish",
    native: "\u05D9\u05D9\u05B4\u05D3\u05D9\u05E9"
  },
  name: "Yiddish",
  native_name: "\u05D9\u05D9\u05B4\u05D3\u05D9\u05E9",
  rtl: false
};
var Yoruba = {
  id: LocaleCode.Yoruba,
  language: {
    code: LanguageCode.Yoruba,
    name: "Yoruba",
    native: "Yor\xF9b\xE1"
  },
  name: "Yoruba",
  native_name: "Yor\xF9b\xE1",
  rtl: false
};
var YorubaNigeria = {
  country: {
    code: CountryCode.Nigeria,
    name: "Nigeria",
    native: "Nigeria"
  },
  id: LocaleCode.YorubaNigeria,
  language: {
    code: LanguageCode.Yoruba,
    name: "Yoruba",
    native: "Yor\xF9b\xE1"
  },
  name: "Yoruba (Nigeria)",
  native_name: "Yor\xF9b\xE1 (Nigeria)",
  rtl: false
};
var Zulu = {
  id: LocaleCode.Zulu,
  language: {
    code: LanguageCode.Zulu,
    name: "Zulu",
    native: "isiZulu"
  },
  name: "Zulu",
  native_name: "isiZulu",
  rtl: false
};
var ZuluSouthAfrica = {
  country: {
    code: CountryCode.SouthAfrica,
    name: "South Africa",
    native: "South Africa"
  },
  id: LocaleCode.ZuluSouthAfrica,
  language: {
    code: LanguageCode.Zulu,
    name: "Zulu",
    native: "isiZulu"
  },
  name: "Zulu (South Africa)",
  native_name: "isiZulu (South Africa)",
  rtl: false
};

// ../types/dist/i18n/time/regions.js
var AfricaAbidjan = {
  id: TimezoneRegions.AfricaAbidjan,
  name: "Africa/Abidjan",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
};
var AfricaAccra = {
  id: TimezoneRegions.AfricaAccra,
  name: "Africa/Accra",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
};
var AfricaAddisAbaba = {
  id: TimezoneRegions.AfricaAddisAbaba,
  name: "Africa/Addis_Ababa",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EastAfricaTime
};
var AfricaAlgiers = {
  id: TimezoneRegions.AfricaAlgiers,
  name: "Africa/Algiers",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var AfricaAsmara = {
  id: TimezoneRegions.AfricaAsmara,
  name: "Africa/Asmara",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EastAfricaTime
};
var AfricaBamako = {
  id: TimezoneRegions.AfricaBamako,
  name: "Africa/Bamako",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
};
var AfricaBangui = {
  id: TimezoneRegions.AfricaBangui,
  name: "Africa/Bangui",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
};
var AfricaBanjul = {
  id: TimezoneRegions.AfricaBanjul,
  name: "Africa/Banjul",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
};
var AfricaBissau = {
  id: TimezoneRegions.AfricaBissau,
  name: "Africa/Bissau",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
};
var AfricaBlantyre = {
  id: TimezoneRegions.AfricaBlantyre,
  name: "Africa/Blantyre",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.CentralAfricaTime
};
var AfricaBrazzaville = {
  id: TimezoneRegions.AfricaBrazzaville,
  name: "Africa/Brazzaville",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
};
var AfricaBujumbura = {
  id: TimezoneRegions.AfricaBujumbura,
  name: "Africa/Bujumbura",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.CentralAfricaTime
};
var AfricaCairo = {
  id: TimezoneRegions.AfricaCairo,
  name: "Africa/Cairo",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
};
var AfricaCasablanca = {
  id: TimezoneRegions.AfricaCasablanca,
  name: "Africa/Casablanca",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WesternEuropeanTime
};
var AfricaCeuta = {
  id: TimezoneRegions.AfricaCeuta,
  name: "Africa/Ceuta",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var AfricaConakry = {
  id: TimezoneRegions.AfricaConakry,
  name: "Africa/Conakry",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
};
var AfricaDakar = {
  id: TimezoneRegions.AfricaDakar,
  name: "Africa/Dakar",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
};
var AfricaDarEsSalaam = {
  id: TimezoneRegions.AfricaDarEsSalaam,
  name: "Africa/Dar_es_Salaam",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EastAfricaTime
};
var AfricaDjibouti = {
  id: TimezoneRegions.AfricaDjibouti,
  name: "Africa/Djibouti",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EastAfricaTime
};
var AfricaDouala = {
  id: TimezoneRegions.AfricaDouala,
  name: "Africa/Douala",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
};
var AfricaElAaiun = {
  id: TimezoneRegions.AfricaElAaiun,
  name: "Africa/El_Aaiun",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
};
var AfricaFreetown = {
  id: TimezoneRegions.AfricaFreetown,
  name: "Africa/Freetown",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
};
var AfricaGaborone = {
  id: TimezoneRegions.AfricaGaborone,
  name: "Africa/Gaborone",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.CentralAfricaTime
};
var AfricaHarare = {
  id: TimezoneRegions.AfricaHarare,
  name: "Africa/Harare",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.CentralAfricaTime
};
var AfricaJohannesburg = {
  id: TimezoneRegions.AfricaJohannesburg,
  name: "Africa/Johannesburg",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.SouthAfricanStandardTime
};
var AfricaJuba = {
  id: TimezoneRegions.AfricaJuba,
  name: "Africa/Juba",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EastAfricaTime
};
var AfricaKampala = {
  id: TimezoneRegions.AfricaKampala,
  name: "Africa/Kampala",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EastAfricaTime
};
var AfricaKhartoum = {
  id: TimezoneRegions.AfricaKhartoum,
  name: "Africa/Khartoum",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EastAfricaTime
};
var AfricaKigali = {
  id: TimezoneRegions.AfricaKigali,
  name: "Africa/Kigali",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.CentralAfricaTime
};
var AfricaKinshasa = {
  id: TimezoneRegions.AfricaKinshasa,
  name: "Africa/Kinshasa",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
};
var AfricaLagos = {
  id: TimezoneRegions.AfricaLagos,
  name: "Africa/Lagos",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
};
var AfricaLibreville = {
  id: TimezoneRegions.AfricaLibreville,
  name: "Africa/Libreville",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
};
var AfricaLome = {
  id: TimezoneRegions.AfricaLome,
  name: "Africa/Lome",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
};
var AfricaLuanda = {
  id: TimezoneRegions.AfricaLuanda,
  name: "Africa/Luanda",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
};
var AfricaLubumbashi = {
  id: TimezoneRegions.AfricaLubumbashi,
  name: "Africa/Lubumbashi",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.CentralAfricaTime
};
var AfricaLusaka = {
  id: TimezoneRegions.AfricaLusaka,
  name: "Africa/Lusaka",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.CentralAfricaTime
};
var AfricaMalabo = {
  id: TimezoneRegions.AfricaMalabo,
  name: "Africa/Malabo",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
};
var AfricaMaputo = {
  id: TimezoneRegions.AfricaMaputo,
  name: "Africa/Maputo",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.CentralAfricaTime
};
var AfricaMaseru = {
  id: TimezoneRegions.AfricaMaseru,
  name: "Africa/Maseru",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.SouthAfricanStandardTime
};
var AfricaMbabane = {
  id: TimezoneRegions.AfricaMbabane,
  name: "Africa/Mbabane",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.SouthAfricanStandardTime
};
var AfricaMogadishu = {
  id: TimezoneRegions.AfricaMogadishu,
  name: "Africa/Mogadishu",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EastAfricaTime
};
var AfricaMonrovia = {
  id: TimezoneRegions.AfricaMonrovia,
  name: "Africa/Monrovia",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
};
var AfricaNairobi = {
  id: TimezoneRegions.AfricaNairobi,
  name: "Africa/Nairobi",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EastAfricaTime
};
var AfricaNdjamena = {
  id: TimezoneRegions.AfricaNdjamena,
  name: "Africa/Ndjamena",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
};
var AfricaNiamey = {
  id: TimezoneRegions.AfricaNiamey,
  name: "Africa/Niamey",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
};
var AfricaNouakchott = {
  id: TimezoneRegions.AfricaNouakchott,
  name: "Africa/Nouakchott",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.GreenwichMeanTime
};
var AfricaOuagadougou = {
  id: TimezoneRegions.AfricaOuagadougou,
  name: "Africa/Ouagadougou",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
};
var AfricaPortoNovo = {
  id: TimezoneRegions.AfricaPortoNovo,
  name: "Africa/Porto-Novo",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.WestAfricaTime
};
var AfricaSaoTome = {
  id: TimezoneRegions.AfricaSaoTome,
  name: "Africa/SaoTome",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
};
var AfricaTripoli = {
  id: TimezoneRegions.AfricaTripoli,
  name: "Africa/Tripoli",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
};
var AfricaTunis = {
  id: TimezoneRegions.AfricaTunis,
  name: "Africa/Tunis",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
};
var AfricaWindhoek = {
  id: TimezoneRegions.AfricaWindhoek,
  name: "Africa/Windhoek",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.WestAfricaTime
};
var AmericaAdak = {
  id: TimezoneRegions.AmericaAdak,
  name: "America/Adak",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.HawaiiAleutianStandardTime
};
var AmericaAnchorage = {
  id: TimezoneRegions.AmericaAnchorage,
  name: "America/Anchorage",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.AlaskaStandardTime
};
var AmericaAnguilla = {
  id: TimezoneRegions.AmericaAnguilla,
  name: "America/Anguilla",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaAntigua = {
  id: TimezoneRegions.AmericaAntigua,
  name: "America/Antigua",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaAraguaina = {
  id: TimezoneRegions.AmericaAraguaina,
  name: "America/Araguaina",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.BrasiliaTime
};
var AmericaArgentinaBuenosAires = {
  id: TimezoneRegions.AmericaArgentinaBuenosAires,
  name: "America/Argentina/Buenos_Aires",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
};
var AmericaArgentinaCatamarca = {
  id: TimezoneRegions.AmericaArgentinaCatamarca,
  name: "America/Argentina/Catamarca",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
};
var AmericaArgentinaCordoba = {
  id: TimezoneRegions.AmericaArgentinaCordoba,
  name: "America/Argentina/Cordoba",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
};
var AmericaArgentinaJujuy = {
  id: TimezoneRegions.AmericaArgentinaJujuy,
  name: "America/Argentina/Jujuy",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
};
var AmericaArgentinaLaRioja = {
  id: TimezoneRegions.AmericaArgentinaLaRioja,
  name: "America/Argentina/La_Rioja",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
};
var AmericaArgentinaMendoza = {
  id: TimezoneRegions.AmericaArgentinaMendoza,
  name: "America/Argentina/Mendoza",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
};
var AmericaArgentinaRioGallegos = {
  id: TimezoneRegions.AmericaArgentinaRioGallegos,
  name: "America/Argentina/Rio_Gallegos",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
};
var AmericaArgentinaSalta = {
  id: TimezoneRegions.AmericaArgentinaSalta,
  name: "America/Argentina/Salta",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
};
var AmericaArgentinaSanJuan = {
  id: TimezoneRegions.AmericaArgentinaSanJuan,
  name: "America/Argentina/San_Juan",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
};
var AmericaArgentinaSanLuis = {
  id: TimezoneRegions.AmericaArgentinaSanLuis,
  name: "America/Argentina/San_Luis",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
};
var AmericaArgentinaTucuman = {
  id: TimezoneRegions.AmericaArgentinaTucuman,
  name: "America/Argentina/Tucuman",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
};
var AmericaArgentinaUshuaia = {
  id: TimezoneRegions.AmericaArgentinaUshuaia,
  name: "America/Argentina/Ushuaia",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
};
var AmericaAruba = {
  id: TimezoneRegions.AmericaAruba,
  name: "America/Aruba",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaAsuncion = {
  id: TimezoneRegions.AmericaAsuncion,
  name: "America/Asuncion",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.ParaguayTime
};
var AmericaAtikokan = {
  id: TimezoneRegions.AmericaAtikokan,
  name: "America/Atikokan",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.EasternStandardTime
};
var AmericaAtka = {
  id: TimezoneRegions.AmericaAtka,
  name: "America/Atka",
  offset: TimezoneOffset.UTC_MINUS_10,
  timezone: Timezones.HawaiiAleutianStandardTime
};
var AmericaBahia = {
  id: TimezoneRegions.AmericaBahia,
  name: "America/Bahia",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.BrasiliaTime
};
var AmericaBahiaBanderas = {
  id: TimezoneRegions.AmericaBahiaBanderas,
  name: "America/Bahia_Banderas",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AmericaBarbados = {
  id: TimezoneRegions.AmericaBarbados,
  name: "America/Barbados",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaBelem = {
  id: TimezoneRegions.AmericaBelem,
  name: "America/Belem",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.BrasiliaTime
};
var AmericaBelize = {
  id: TimezoneRegions.AmericaBelize,
  name: "America/Belize",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AmericaBlancSablon = {
  id: TimezoneRegions.AmericaBlancSablon,
  name: "America/Blanc-Sablon",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaBoaVista = {
  id: TimezoneRegions.AmericaBoaVista,
  name: "America/Boa_Vista",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AmazonTime
};
var AmericaBogota = {
  id: TimezoneRegions.AmericaBogota,
  name: "America/Bogota",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.ColombiaTime
};
var AmericaBoise = {
  id: TimezoneRegions.AmericaBoise,
  name: "America/Boise",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
};
var AmericaCambridgeBay = {
  id: TimezoneRegions.AmericaCambridgeBay,
  name: "America/Cambridge_Bay",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
};
var AmericaCampoGrande = {
  id: TimezoneRegions.AmericaCampoGrande,
  name: "America/Campo_Grande",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AmazonTime
};
var AmericaCancun = {
  id: TimezoneRegions.AmericaCancun,
  name: "America/Cancun",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
};
var AmericaCaracas = {
  id: TimezoneRegions.AmericaCaracas,
  name: "America/Caracas",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.VenezuelaStandardTime
};
var AmericaCayenne = {
  id: TimezoneRegions.AmericaCayenne,
  name: "America/Cayenne",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.FrenchGuianaTime
};
var AmericaCayman = {
  id: TimezoneRegions.AmericaCayman,
  name: "America/Cayman",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaChicago = {
  id: TimezoneRegions.AmericaChicago,
  name: "America/Chicago",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AmericaChihuahua = {
  id: TimezoneRegions.AmericaChihuahua,
  name: "America/Chihuahua",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
};
var AmericaCoralHarbour = {
  id: TimezoneRegions.AmericaCoralHarbour,
  name: "America/Coral_Harbour",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
};
var AmericaCordoba = {
  id: TimezoneRegions.AmericaCordoba,
  name: "America/Cordoba",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ArgentinaTime
};
var AmericaCostaRica = {
  id: TimezoneRegions.AmericaCostaRica,
  name: "America/Costa_Rica",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AmericaCreston = {
  id: TimezoneRegions.AmericaCreston,
  name: "America/Creston",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
};
var AmericaCuiaba = {
  id: TimezoneRegions.AmericaCuiaba,
  name: "America/Cuiaba",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AmazonTime
};
var AmericaCuracao = {
  id: TimezoneRegions.AmericaCuracao,
  name: "America/Curacao",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaDanmarkshavn = {
  id: TimezoneRegions.AmericaDanmarkshavn,
  name: "America/Danmarkshavn",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.GreenwichMeanTime
};
var AmericaDawson = {
  id: TimezoneRegions.AmericaDawson,
  name: "America/Dawson",
  offset: TimezoneOffset.UTC_MINUS_8,
  timezone: Timezones.PacificStandardTime
};
var AmericaDawsonCreek = {
  id: TimezoneRegions.AmericaDawsonCreek,
  name: "America/Dawson_Creek",
  offset: TimezoneOffset.UTC_MINUS_8,
  timezone: Timezones.PacificStandardTime
};
var AmericaDenver = {
  id: TimezoneRegions.AmericaDenver,
  name: "America/Denver",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
};
var AmericaDetroit = {
  id: TimezoneRegions.AmericaDetroit,
  name: "America/Detroit",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
};
var AmericaDominica = {
  id: TimezoneRegions.AmericaDominica,
  name: "America/Dominica",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaEdmonton = {
  id: TimezoneRegions.AmericaEdmonton,
  name: "America/Edmonton",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
};
var AmericaEirunepe = {
  id: TimezoneRegions.AmericaEirunepe,
  name: "America/Eirunepe",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.AcreTime
};
var AmericaElSalvador = {
  id: TimezoneRegions.AmericaElSalvador,
  name: "America/El_Salvador",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AmericaFortaleza = {
  id: TimezoneRegions.AmericaFortaleza,
  name: "America/Fortaleza",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.BrasiliaTime
};
var AmericaGlaceBay = {
  id: TimezoneRegions.AmericaGlaceBay,
  name: "America/Glace_Bay",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaGodthab = {
  id: TimezoneRegions.AmericaGodthab,
  name: "America/Godthab",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.WestGreenlandTime
};
var AmericaGooseBay = {
  id: TimezoneRegions.AmericaGooseBay,
  name: "America/Goose_Bay",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaGrandTurk = {
  id: TimezoneRegions.AmericaGrandTurk,
  name: "America/Grand_Turk",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaGrenada = {
  id: TimezoneRegions.AmericaGrenada,
  name: "America/Grenada",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaGuadeloupe = {
  id: TimezoneRegions.AmericaGuadeloupe,
  name: "America/Guadeloupe",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaGuatemala = {
  id: TimezoneRegions.AmericaGuatemala,
  name: "America/Guatemala",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AmericaGuayaquil = {
  id: TimezoneRegions.AmericaGuayaquil,
  name: "America/Guayaquil",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EcuadorTime
};
var AmericaGuyana = {
  id: TimezoneRegions.AmericaGuyana,
  name: "America/Guyana",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaHalifax = {
  id: TimezoneRegions.AmericaHalifax,
  name: "America/Halifax",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaHavana = {
  id: TimezoneRegions.AmericaHavana,
  name: "America/Havana",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.CubaStandardTime
};
var AmericaHermosillo = {
  id: TimezoneRegions.AmericaHermosillo,
  name: "America/Hermosillo",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
};
var AmericaIndianaIndianapolis = {
  id: TimezoneRegions.AmericaIndianaIndianapolis,
  name: "America/Indiana/Indianapolis",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
};
var AmericaIndianaKnox = {
  id: TimezoneRegions.AmericaIndianaKnox,
  name: "America/Indiana/Knox",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AmericaIndianaMarengo = {
  id: TimezoneRegions.AmericaIndianaMarengo,
  name: "America/Indiana/Marengo",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
};
var AmericaIndianaPetersburg = {
  id: TimezoneRegions.AmericaIndianaPetersburg,
  name: "America/Indiana/Petersburg",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
};
var AmericaIndianaTellCity = {
  id: TimezoneRegions.AmericaIndianaTellCity,
  name: "America/Indiana/Tell_City",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AmericaIndianaVevay = {
  id: TimezoneRegions.AmericaIndianaVevay,
  name: "America/Indiana/Vevay",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
};
var AmericaIndianaVincennes = {
  id: TimezoneRegions.AmericaIndianaVincennes,
  name: "America/Indiana/Vincennes",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
};
var AmericaIndianaWinamac = {
  id: TimezoneRegions.AmericaIndianaWinamac,
  name: "America/Indiana/Winamac",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
};
var AmericaInuvik = {
  id: TimezoneRegions.AmericaInuvik,
  name: "America/Inuvik",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
};
var AmericaIqaluit = {
  id: TimezoneRegions.AmericaIqaluit,
  name: "America/Iqaluit",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.EasternStandardTime
};
var AmericaJamaica = {
  id: TimezoneRegions.AmericaJamaica,
  name: "America/Jamaica",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaJuneau = {
  id: TimezoneRegions.AmericaJuneau,
  name: "America/Juneau",
  offset: TimezoneOffset.UTC_MINUS_9,
  timezone: Timezones.AlaskaStandardTime
};
var AmericaKentuckyLouisville = {
  id: TimezoneRegions.AmericaKentuckyLouisville,
  name: "America/Kentucky/Louisville",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
};
var AmericaKentuckyMonticello = {
  id: TimezoneRegions.AmericaKentuckyMonticello,
  name: "America/Kentucky/Monticello",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
};
var AmericaKralendijk = {
  id: TimezoneRegions.AmericaKralendijk,
  name: "America/Kralendijk",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaLaPaz = {
  id: TimezoneRegions.AmericaLaPaz,
  name: "America/La_Paz",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.BoliviaTime
};
var AmericaLima = {
  id: TimezoneRegions.AmericaLima,
  name: "America/Lima",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.PeruTime
};
var AmericaLosAngeles = {
  id: TimezoneRegions.AmericaLosAngeles,
  name: "America/Los_Angeles",
  offset: TimezoneOffset.UTC_MINUS_8,
  timezone: Timezones.PacificStandardTime
};
var AmericaLouisville = {
  id: TimezoneRegions.AmericaLouisville,
  name: "America/Louisville",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
};
var AmericaLowerPrinces = {
  id: TimezoneRegions.AmericaLowerPrinces,
  name: "America/Lower_Princes",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaMaceio = {
  id: TimezoneRegions.AmericaMaceio,
  name: "America/Maceio",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.BrasiliaTime
};
var AmericaManagua = {
  id: TimezoneRegions.AmericaManagua,
  name: "America/Managua",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AmericaManaus = {
  id: TimezoneRegions.AmericaManaus,
  name: "America/Manaus",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AmazonTime
};
var AmericaMarigot = {
  id: TimezoneRegions.AmericaMarigot,
  name: "America/Marigot",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaMartinique = {
  id: TimezoneRegions.AmericaMartinique,
  name: "America/Martinique",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaMatamoros = {
  id: TimezoneRegions.AmericaMatamoros,
  name: "America/Matamoros",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AmericaMazatlan = {
  id: TimezoneRegions.AmericaMazatlan,
  name: "America/Mazatlan",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
};
var AmericaMenominee = {
  id: TimezoneRegions.AmericaMenominee,
  name: "America/Menominee",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.CentralStandardTime
};
var AmericaMerida = {
  id: TimezoneRegions.AmericaMerida,
  name: "America/Merida",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AmericaMetlakatla = {
  id: TimezoneRegions.AmericaMetlakatla,
  name: "America/Metlakatla",
  offset: TimezoneOffset.UTC_MINUS_9,
  timezone: Timezones.AlaskaStandardTime
};
var AmericaMexicoCity = {
  id: TimezoneRegions.AmericaMexicoCity,
  name: "America/Mexico_City",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AmericaMiquelon = {
  id: TimezoneRegions.AmericaMiquelon,
  name: "America/Miquelon",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.SaintPierreAndMiquelonStandardTime
};
var AmericaMoncton = {
  id: TimezoneRegions.AmericaMoncton,
  name: "America/Moncton",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaMonterrey = {
  id: TimezoneRegions.AmericaMonterrey,
  name: "America/Monterrey",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AmericaMontevideo = {
  id: TimezoneRegions.AmericaMontevideo,
  name: "America/Montevideo",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.UruguayStandardTime
};
var AmericaMontreal = {
  id: TimezoneRegions.AmericaMontreal,
  name: "America/Montreal",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
};
var AmericaMontserrat = {
  id: TimezoneRegions.AmericaMontserrat,
  name: "America/Montserrat",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaNassau = {
  id: TimezoneRegions.AmericaNassau,
  name: "America/Nassau",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
};
var AmericaNewYork = {
  id: TimezoneRegions.AmericaNewYork,
  name: "America/New_York",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
};
var AmericaNipigon = {
  id: TimezoneRegions.AmericaNipigon,
  name: "America/Nipigon",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
};
var AmericaNome = {
  id: TimezoneRegions.AmericaNome,
  name: "America/Nome",
  offset: TimezoneOffset.UTC_MINUS_9,
  timezone: Timezones.AlaskaStandardTime
};
var AmericaNoronha = {
  id: TimezoneRegions.AmericaNoronha,
  name: "America/Noronha",
  offset: TimezoneOffset.UTC_MINUS_2,
  timezone: Timezones.FernandoDeNoronhaTime
};
var AmericaNorthDakotaBeulah = {
  id: TimezoneRegions.AmericaNorthDakotaBeulah,
  name: "America/North_Dakota/Beulah",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AmericaNorthDakotaCenter = {
  id: TimezoneRegions.AmericaNorthDakotaCenter,
  name: "America/North_Dakota/Center",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AmericaNorthDakotaNewSalem = {
  id: TimezoneRegions.AmericaNorthDakotaNewSalem,
  name: "America/North_Dakota/New_Salem",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AmericaOjinaga = {
  id: TimezoneRegions.AmericaOjinaga,
  name: "America/Ojinaga",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
};
var AmericaPanama = {
  id: TimezoneRegions.AmericaPanama,
  name: "America/Panama",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
};
var AmericaPangnirtung = {
  id: TimezoneRegions.AmericaPangnirtung,
  name: "America/Pangnirtung",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
};
var AmericaParamaribo = {
  id: TimezoneRegions.AmericaParamaribo,
  name: "America/Paramaribo",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.SurinameTime
};
var AmericaPhoenix = {
  id: TimezoneRegions.AmericaPhoenix,
  name: "America/Phoenix",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
};
var AmericaPortAuPrince = {
  id: TimezoneRegions.AmericaPortAuPrince,
  name: "America/Port-au-Prince",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
};
var AmericaPortOfSpain = {
  id: TimezoneRegions.AmericaPortOfSpain,
  name: "America/Port_of_Spain",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaPortoVelho = {
  id: TimezoneRegions.AmericaPortoVelho,
  name: "America/Porto_Velho",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AmazonTime
};
var AmericaPuertoRico = {
  id: TimezoneRegions.AmericaPuertoRico,
  name: "America/Puerto_Rico",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaRainyRiver = {
  id: TimezoneRegions.AmericaRainyRiver,
  name: "America/Rainy_River",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AmericaRankinInlet = {
  id: TimezoneRegions.AmericaRankinInlet,
  name: "America/Rankin_Inlet",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AmericaRecife = {
  id: TimezoneRegions.AmericaRecife,
  name: "America/Recife",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.BrasiliaTime
};
var AmericaRegina = {
  id: TimezoneRegions.AmericaRegina,
  name: "America/Regina",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AmericaResolute = {
  id: TimezoneRegions.AmericaResolute,
  name: "America/Resolute",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AmericaRioBranco = {
  id: TimezoneRegions.AmericaRioBranco,
  name: "America/Rio_Branco",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.AcreTime
};
var AmericaSantaIsabel = {
  id: TimezoneRegions.AmericaSantaIsabel,
  name: "America/Santa_Isabel",
  offset: TimezoneOffset.UTC_MINUS_8,
  timezone: Timezones.PacificStandardTime
};
var AmericaSantarem = {
  id: TimezoneRegions.AmericaSantarem,
  name: "America/Santarem",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.BrasiliaTime
};
var AmericaSantiago = {
  id: TimezoneRegions.AmericaSantiago,
  name: "America/Santiago",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.ChileStandardTime
};
var AmericaSantoDomingo = {
  id: TimezoneRegions.AmericaSantoDomingo,
  name: "America/Santo_Domingo",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaSaoPaulo = {
  id: TimezoneRegions.AmericaSaoPaulo,
  name: "America/Sao_Paulo",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.BrasiliaTime
};
var AmericaScoresbysund = {
  id: TimezoneRegions.AmericaScoresbysund,
  name: "America/Scoresbysund",
  offset: TimezoneOffset.UTC_MINUS_1,
  timezone: Timezones.EasternGreenlandTime
};
var AmericaShiprock = {
  id: TimezoneRegions.AmericaShiprock,
  name: "America/Shiprock",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.MountainStandardTime
};
var AmericaSitka = {
  id: TimezoneRegions.AmericaSitka,
  name: "America/Sitka",
  offset: TimezoneOffset.UTC_MINUS_9,
  timezone: Timezones.AlaskaStandardTime
};
var AmericaStBarthelemy = {
  id: TimezoneRegions.AmericaStBarthelemy,
  name: "America/St_Barthelemy",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaStJohns = {
  id: TimezoneRegions.AmericaStJohns,
  name: "America/St_Johns",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.NewfoundlandStandardTime
};
var AmericaStKitts = {
  id: TimezoneRegions.AmericaStKitts,
  name: "America/St_Kitts",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaStLucia = {
  id: TimezoneRegions.AmericaStLucia,
  name: "America/St_Lucia",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaStThomas = {
  id: TimezoneRegions.AmericaStThomas,
  name: "America/St_Thomas",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaStVincent = {
  id: TimezoneRegions.AmericaStVincent,
  name: "America/St_Vincent",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaSwiftCurrent = {
  id: TimezoneRegions.AmericaSwiftCurrent,
  name: "America/Swift_Current",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AmericaTegucigalpa = {
  id: TimezoneRegions.AmericaTegucigalpa,
  name: "America/Tegucigalpa",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AmericaThule = {
  id: TimezoneRegions.AmericaThule,
  name: "America/Thule",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaThunderBay = {
  id: TimezoneRegions.AmericaThunderBay,
  name: "America/Thunder_Bay",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.EasternStandardTime
};
var AmericaTijuana = {
  id: TimezoneRegions.AmericaTijuana,
  name: "America/Tijuana",
  offset: TimezoneOffset.UTC_MINUS_8,
  timezone: Timezones.PacificStandardTime
};
var AmericaToronto = {
  id: TimezoneRegions.AmericaToronto,
  name: "America/Toronto",
  offset: TimezoneOffset.UTC_MINUS_5,
  timezone: Timezones.EasternStandardTime
};
var AmericaTortola = {
  id: TimezoneRegions.AmericaTortola,
  name: "America/Tortola",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
};
var AmericaVancouver = {
  id: TimezoneRegions.AmericaVancouver,
  name: "America/Vancouver",
  offset: TimezoneOffset.UTC_MINUS_8,
  timezone: Timezones.PacificStandardTime
};
var AmericaWhitehorse = {
  id: TimezoneRegions.AmericaWhitehorse,
  name: "America/Whitehorse",
  offset: TimezoneOffset.UTC_MINUS_8,
  timezone: Timezones.PacificStandardTime
};
var AmericaWinnipeg = {
  id: TimezoneRegions.AmericaWinnipeg,
  name: "America/Winnipeg",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AmericaYakutat = {
  id: TimezoneRegions.AmericaYakutat,
  name: "America/Yakutat",
  offset: TimezoneOffset.UTC_MINUS_9,
  timezone: Timezones.AlaskaStandardTime
};
var AmericaYellowknife = {
  id: TimezoneRegions.AmericaYellowknife,
  name: "America/Yellowknife",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.MountainStandardTime
};
var AntarcticaCasey = {
  id: TimezoneRegions.AntarcticaCasey,
  name: "Antarctica/Casey",
  offset: TimezoneOffset.UTC_MINUS_8,
  timezone: Timezones.WesternStandardTime
};
var AntarcticaDavis = {
  id: TimezoneRegions.AntarcticaDavis,
  name: "Antarctica/Davis",
  offset: TimezoneOffset.UTC_MINUS_7,
  timezone: Timezones.NewfoundlandStandardTime
};
var AntarcticaDumontDUrville = {
  id: TimezoneRegions.AntarcticaDumontDUrville,
  name: "Antarctica/DumontDUrville",
  offset: TimezoneOffset.UTC_MINUS_10,
  timezone: Timezones.CentralStandardTime
};
var AntarcticaMacquarie = {
  id: TimezoneRegions.AntarcticaMacquarie,
  name: "Antarctica/Macquarie",
  offset: TimezoneOffset.UTC_MINUS_11,
  timezone: Timezones.CentralStandardTime
};
var AntarcticaMawson = {
  id: TimezoneRegions.AntarcticaMawson,
  name: "Antarctica/Mawson",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var AntarcticaMcMurdo = {
  id: TimezoneRegions.AntarcticaMcMurdo,
  name: "Antarctica/McMurdo",
  offset: TimezoneOffset.UTC_MINUS_12,
  timezone: Timezones.NewZealandStandardTime
};
var AntarcticaPalmer = {
  id: TimezoneRegions.AntarcticaPalmer,
  name: "Antarctica/Palmer",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.ChathamStandardTime
};
var AntarcticaRothera = {
  id: TimezoneRegions.AntarcticaRothera,
  name: "Antarctica/Rothera",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.RotheraResearchStationTime
};
var AntarcticaSyowa = {
  id: TimezoneRegions.AntarcticaSyowa,
  name: "Antarctica/Syowa",
  offset: TimezoneOffset.UTC_MINUS_3,
  timezone: Timezones.ShowaStationTime
};
var AntarcticaTroll = {
  id: TimezoneRegions.AntarcticaTroll,
  name: "Antarctica/Troll",
  offset: TimezoneOffset.UTC_MINUS_2,
  timezone: Timezones.CentralStandardTime
};
var AntarcticaVostok = {
  id: TimezoneRegions.AntarcticaVostok,
  name: "Antarctica/Vostok",
  offset: TimezoneOffset.UTC_MINUS_6,
  timezone: Timezones.CentralStandardTime
};
var ArcticLongyearbyen = {
  id: TimezoneRegions.ArcticLongyearbyen,
  name: "Arctic/Longyearbyen",
  offset: TimezoneOffset.UTC_MINUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var AsiaAden = {
  id: TimezoneRegions.AsiaAden,
  name: "Asia/Aden",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.ArabiaStandardTime
};
var AsiaAlmaty = {
  id: TimezoneRegions.AsiaAlmaty,
  name: "Asia/Almaty",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.AlmaAtaTime
};
var AsiaAmman = {
  id: TimezoneRegions.AsiaAmman,
  name: "Asia/Amman",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
};
var AsiaAnadyr = {
  id: TimezoneRegions.AsiaAnadyr,
  name: "Asia/Anadyr",
  offset: TimezoneOffset.UTC_PLUS_12,
  timezone: Timezones.NewCaledoniaTime
};
var AsiaAqtau = {
  id: TimezoneRegions.AsiaAqtau,
  name: "Asia/Aqtau",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.AqtobeTime
};
var AsiaAqtobe = {
  id: TimezoneRegions.AsiaAqtobe,
  name: "Asia/Aqtobe",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.AqtobeTime
};
var AsiaAshgabat = {
  id: TimezoneRegions.AsiaAshgabat,
  name: "Asia/Ashgabat",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.TurkmenistanTime
};
var AsiaBaghdad = {
  id: TimezoneRegions.AsiaBaghdad,
  name: "Asia/Baghdad",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.ArabiaStandardTime
};
var AsiaBahrain = {
  id: TimezoneRegions.AsiaBahrain,
  name: "Asia/Bahrain",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.ArabiaStandardTime
};
var AsiaBaku = {
  id: TimezoneRegions.AsiaBaku,
  name: "Asia/Baku",
  offset: TimezoneOffset.UTC_PLUS_4,
  timezone: Timezones.AzerbaijanTime
};
var AsiaBangkok = {
  id: TimezoneRegions.AsiaBangkok,
  name: "Asia/Bangkok",
  offset: TimezoneOffset.UTC_PLUS_7,
  timezone: Timezones.IndochinaTime
};
var AsiaBarnaul = {
  id: TimezoneRegions.AsiaBarnaul,
  name: "Asia/Barnaul",
  offset: TimezoneOffset.UTC_PLUS_7,
  timezone: Timezones.KrasnoyarskTime
};
var AsiaBeirut = {
  id: TimezoneRegions.AsiaBeirut,
  name: "Asia/Beirut",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
};
var AsiaBishkek = {
  id: TimezoneRegions.AsiaBishkek,
  name: "Asia/Bishkek",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.KyrgyzstanTime
};
var AsiaBrunei = {
  id: TimezoneRegions.AsiaBrunei,
  name: "Asia/Brunei",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.BruneiTime
};
var AsiaChita = {
  id: TimezoneRegions.AsiaChita,
  name: "Asia/Chita",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.YakutskTime
};
var AsiaChoibalsan = {
  id: TimezoneRegions.AsiaChoibalsan,
  name: "Asia/Choibalsan",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.ChoibalsanStandardTime
};
var AsiaColombo = {
  id: TimezoneRegions.AsiaColombo,
  name: "Asia/Colombo",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.IndianStandardTime
};
var AsiaDamascus = {
  id: TimezoneRegions.AsiaDamascus,
  name: "Asia/Damascus",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
};
var AsiaDhaka = {
  id: TimezoneRegions.AsiaDhaka,
  name: "Asia/Dhaka",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.BangladeshStandardTime
};
var AsiaDili = {
  id: TimezoneRegions.AsiaDili,
  name: "Asia/Dili",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.JapanStandardTime
};
var AsiaDubai = {
  id: TimezoneRegions.AsiaDubai,
  name: "Asia/Dubai",
  offset: TimezoneOffset.UTC_PLUS_4,
  timezone: Timezones.GulfStandardTime
};
var AsiaDushanbe = {
  id: TimezoneRegions.AsiaDushanbe,
  name: "Asia/Dushanbe",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.TajikistanTime
};
var AsiaFamagusta = {
  id: TimezoneRegions.AsiaFamagusta,
  name: "Asia/Famagusta",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
};
var AsiaGaza = {
  id: TimezoneRegions.AsiaGaza,
  name: "Asia/Gaza",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
};
var AsiaHebron = {
  id: TimezoneRegions.AsiaHebron,
  name: "Asia/Hebron",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
};
var AsiaHoChiMinh = {
  id: TimezoneRegions.AsiaHoChiMinh,
  name: "Asia/Ho_Chi_Minh",
  offset: TimezoneOffset.UTC_PLUS_7,
  timezone: Timezones.IndochinaTime
};
var AsiaHongKong = {
  id: TimezoneRegions.AsiaHongKong,
  name: "Asia/Hong_Kong",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.HongKongTime
};
var AsiaHovd = {
  id: TimezoneRegions.AsiaHovd,
  name: "Asia/Hovd",
  offset: TimezoneOffset.UTC_PLUS_7,
  timezone: Timezones.HovdTime
};
var AsiaIrkutsk = {
  id: TimezoneRegions.AsiaIrkutsk,
  name: "Asia/Irkutsk",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.IrkutskTime
};
var AsiaJakarta = {
  id: TimezoneRegions.AsiaJakarta,
  name: "Asia/Jakarta",
  offset: TimezoneOffset.UTC_PLUS_7,
  timezone: Timezones.WesternIndonesianTime
};
var AsiaJayapura = {
  id: TimezoneRegions.AsiaJayapura,
  name: "Asia/Jayapura",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.JapanStandardTime
};
var AsiaJerusalem = {
  id: TimezoneRegions.AsiaJerusalem,
  name: "Asia/Jerusalem",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
};
var AsiaKabul = {
  id: TimezoneRegions.AsiaKabul,
  name: "Asia/Kabul",
  offset: TimezoneOffset.UTC_PLUS_4,
  timezone: Timezones.AfghanistanTime
};
var AsiaKamchatka = {
  id: TimezoneRegions.AsiaKamchatka,
  name: "Asia/Kamchatka",
  offset: TimezoneOffset.UTC_PLUS_12,
  timezone: Timezones.KamchatkaTime
};
var AsiaKarachi = {
  id: TimezoneRegions.AsiaKarachi,
  name: "Asia/Karachi",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.PakistanStandardTime
};
var AsiaKathmandu = {
  id: TimezoneRegions.AsiaKathmandu,
  name: "Asia/Kathmandu",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.NepalTime
};
var AsiaKhandyga = {
  id: TimezoneRegions.AsiaKhandyga,
  name: "Asia/Khandyga",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.YakutskTime
};
var AsiaKolkata = {
  id: TimezoneRegions.AsiaKolkata,
  name: "Asia/Kolkata",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.IndianStandardTime
};
var AsiaKrasnoyarsk = {
  id: TimezoneRegions.AsiaKrasnoyarsk,
  name: "Asia/Krasnoyarsk",
  offset: TimezoneOffset.UTC_PLUS_7,
  timezone: Timezones.KrasnoyarskTime
};
var AsiaKualaLumpur = {
  id: TimezoneRegions.AsiaKualaLumpur,
  name: "Asia/Kuala_Lumpur",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.MalaysiaStandardTime
};
var AsiaKuching = {
  id: TimezoneRegions.AsiaKuching,
  name: "Asia/Kuching",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.MalaysiaStandardTime
};
var AsiaKuwait = {
  id: TimezoneRegions.AsiaKuwait,
  name: "Asia/Kuwait",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.ArabiaStandardTime
};
var AsiaMacau = {
  id: TimezoneRegions.AsiaMacau,
  name: "Asia/Macau",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.ChinaStandardTime
};
var AsiaMagadan = {
  id: TimezoneRegions.AsiaMagadan,
  name: "Asia/Magadan",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.MagadanTime
};
var AsiaMakassar = {
  id: TimezoneRegions.AsiaMakassar,
  name: "Asia/Makassar",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.MalaysiaTime
};
var AsiaManila = {
  id: TimezoneRegions.AsiaManila,
  name: "Asia/Manila",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.PhilippineTime
};
var AsiaMuscat = {
  id: TimezoneRegions.AsiaMuscat,
  name: "Asia/Muscat",
  offset: TimezoneOffset.UTC_PLUS_4,
  timezone: Timezones.GulfStandardTime
};
var AsiaNovokuznetsk = {
  id: TimezoneRegions.AsiaNovokuznetsk,
  name: "Asia/Novokuznetsk",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.NovosibirskTime
};
var AsiaNovosibirsk = {
  id: TimezoneRegions.AsiaNovosibirsk,
  name: "Asia/Novosibirsk",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.NovosibirskTime
};
var AsiaOmsk = {
  id: TimezoneRegions.AsiaOmsk,
  name: "Asia/Omsk",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.OmskTime
};
var AsiaOral = {
  id: TimezoneRegions.AsiaOral,
  name: "Asia/Oral",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.OralTime
};
var AsiaPhnomPenh = {
  id: TimezoneRegions.AsiaPhnomPenh,
  name: "Asia/Phnom_Penh",
  offset: TimezoneOffset.UTC_PLUS_7,
  timezone: Timezones.IndochinaTime
};
var AsiaPontianak = {
  id: TimezoneRegions.AsiaPontianak,
  name: "Asia/Pontianak",
  offset: TimezoneOffset.UTC_PLUS_7,
  timezone: Timezones.WesternIndonesianTime
};
var AsiaPyongyang = {
  id: TimezoneRegions.AsiaPyongyang,
  name: "Asia/Pyongyang",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.KoreaStandardTime
};
var AsiaQatar = {
  id: TimezoneRegions.AsiaQatar,
  name: "Asia/Qatar",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.ArabiaStandardTime
};
var AsiaQyzylorda = {
  id: TimezoneRegions.AsiaQyzylorda,
  name: "Asia/Qyzylorda",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.WestKazakhstanTime
};
var AsiaRangoon = {
  id: TimezoneRegions.AsiaRangoon,
  name: "Asia/Rangoon",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.MyanmarStandardTime
};
var AsiaRiyadh = {
  id: TimezoneRegions.AsiaRiyadh,
  name: "Asia/Riyadh",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.ArabiaStandardTime
};
var AsiaSakhalin = {
  id: TimezoneRegions.AsiaSakhalin,
  name: "Asia/Sakhalin",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.SakhalinIslandTime
};
var AsiaSamarkand = {
  id: TimezoneRegions.AsiaSamarkand,
  name: "Asia/Samarkand",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.UzbekistanTime
};
var AsiaSeoul = {
  id: TimezoneRegions.AsiaSeoul,
  name: "Asia/Seoul",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.KoreaStandardTime
};
var AsiaShanghai = {
  id: TimezoneRegions.AsiaShanghai,
  name: "Asia/Shanghai",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.ChinaStandardTime
};
var AsiaSingapore = {
  id: TimezoneRegions.AsiaSingapore,
  name: "Asia/Singapore",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.SingaporeStandardTime
};
var AsiaSrednekolymsk = {
  id: TimezoneRegions.AsiaSrednekolymsk,
  name: "Asia/Srednekolymsk",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.SrednekolymskTime
};
var AsiaTaipei = {
  id: TimezoneRegions.AsiaTaipei,
  name: "Asia/Taipei",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.ChinaStandardTime
};
var AsiaTashkent = {
  id: TimezoneRegions.AsiaTashkent,
  name: "Asia/Tashkent",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.UzbekistanTime
};
var AsiaTbilisi = {
  id: TimezoneRegions.AsiaTbilisi,
  name: "Asia/Tbilisi",
  offset: TimezoneOffset.UTC_PLUS_4,
  timezone: Timezones.GeorgiaStandardTime
};
var AsiaTehran = {
  id: TimezoneRegions.AsiaTehran,
  name: "Asia/Tehran",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.IranStandardTime
};
var AsiaThimphu = {
  id: TimezoneRegions.AsiaThimphu,
  name: "Asia/Thimphu",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.BhutanTime
};
var AsiaTokyo = {
  id: TimezoneRegions.AsiaTokyo,
  name: "Asia/Tokyo",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.JapanStandardTime
};
var AsiaTomsk = {
  id: TimezoneRegions.AsiaTomsk,
  name: "Asia/Tomsk",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.KrasnoyarskTime
};
var AsiaUlaanbaatar = {
  id: TimezoneRegions.AsiaUlaanbaatar,
  name: "Asia/Ulaanbaatar",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.UlaanbaatarStandardTime
};
var AsiaUrumqi = {
  id: TimezoneRegions.AsiaUrumqi,
  name: "Asia/Urumqi",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.ChinaStandardTime
};
var AsiaUstNera = {
  id: TimezoneRegions.AsiaUstNera,
  name: "Asia/Ust-Nera",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.VladivostokTime
};
var AsiaVientiane = {
  id: TimezoneRegions.AsiaVientiane,
  name: "Asia/Vientiane",
  offset: TimezoneOffset.UTC_PLUS_7,
  timezone: Timezones.IndochinaTime
};
var AsiaVladivostok = {
  id: TimezoneRegions.AsiaVladivostok,
  name: "Asia/Vladivostok",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.VladivostokTime
};
var AsiaYakutsk = {
  id: TimezoneRegions.AsiaYakutsk,
  name: "Asia/Yakutsk",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.YakutskTime
};
var AsiaYekaterinburg = {
  id: TimezoneRegions.AsiaYekaterinburg,
  name: "Asia/Yekaterinburg",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.YekaterinburgTime
};
var AsiaYerevan = {
  id: TimezoneRegions.AsiaYerevan,
  name: "Asia/Yerevan",
  offset: TimezoneOffset.UTC_PLUS_4,
  timezone: Timezones.ArmeniaTime
};
var AtlanticAzores = {
  id: TimezoneRegions.AtlanticAzores,
  name: "Atlantic/Azores",
  offset: TimezoneOffset.UTC_MINUS_1,
  timezone: Timezones.AzoresStandardTime
};
var AtlanticBermuda = {
  id: TimezoneRegions.AtlanticBermuda,
  name: "Atlantic/Bermuda",
  offset: TimezoneOffset.UTC_MINUS_4,
  timezone: Timezones.AtlanticStandardTime
};
var AtlanticCanary = {
  id: TimezoneRegions.AtlanticCanary,
  name: "Atlantic/Canary",
  offset: TimezoneOffset.UTC_MINUS_1,
  timezone: Timezones.WesternEuropeanTime
};
var AtlanticCapeVerde = {
  id: TimezoneRegions.AtlanticCapeVerde,
  name: "Atlantic/Cape_Verde",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CapeVerdeTime
};
var AtlanticFaroe = {
  id: TimezoneRegions.AtlanticFaroe,
  name: "Atlantic/Faroe",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.GreenwichMeanTime
};
var AtlanticMadeira = {
  id: TimezoneRegions.AtlanticMadeira,
  name: "Atlantic/Madeira",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.WesternEuropeanTime
};
var AtlanticReykjavik = {
  id: TimezoneRegions.AtlanticReykjavik,
  name: "Atlantic/Reykjavik",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.GreenwichMeanTime
};
var AtlanticSouthGeorgia = {
  id: TimezoneRegions.AtlanticSouthGeorgia,
  name: "Atlantic/South_Georgia",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.CoordinatedUniversalTime
};
var AtlanticStHelena = {
  id: TimezoneRegions.AtlanticStHelena,
  name: "Atlantic/St_Helena",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.GreenwichMeanTime
};
var AtlanticStanley = {
  id: TimezoneRegions.AtlanticStanley,
  name: "Atlantic/Stanley",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.FalklandIslandsTime
};
var AustraliaAdelaide = {
  id: TimezoneRegions.AustraliaAdelaide,
  name: "Australia/Adelaide",
  offset: TimezoneOffset.UTC_PLUS_9_30,
  timezone: Timezones.AustralianCentralStandardTime
};
var AustraliaBrisbane = {
  id: TimezoneRegions.AustraliaBrisbane,
  name: "Australia/Brisbane",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.AustralianEasternStandardTime
};
var AustraliaBrokenHill = {
  id: TimezoneRegions.AustraliaBrokenHill,
  name: "Australia/Broken_Hill",
  offset: TimezoneOffset.UTC_PLUS_9_30,
  timezone: Timezones.AustralianCentralStandardTime
};
var AustraliaCanberra = {
  id: TimezoneRegions.AustraliaCanberra,
  name: "Australia/Canberra",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.AustralianEasternStandardTime
};
var AustraliaCurrie = {
  id: TimezoneRegions.AustraliaCurrie,
  name: "Australia/Currie",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.AustralianEasternStandardTime
};
var AustraliaDarwin = {
  id: TimezoneRegions.AustraliaDarwin,
  name: "Australia/Darwin",
  offset: TimezoneOffset.UTC_PLUS_9_30,
  timezone: Timezones.AustralianCentralStandardTime
};
var AustraliaEucla = {
  id: TimezoneRegions.AustraliaEucla,
  name: "Australia/Eucla",
  offset: TimezoneOffset.UTC_PLUS_8_45,
  timezone: Timezones.AustralianCentralWesternStandardTime
};
var AustraliaHobart = {
  id: TimezoneRegions.AustraliaHobart,
  name: "Australia/Hobart",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.AustralianEasternStandardTime
};
var AustraliaLindeman = {
  id: TimezoneRegions.AustraliaLindeman,
  name: "Australia/Lindeman",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.AustralianEasternStandardTime
};
var AustraliaLordHowe = {
  id: TimezoneRegions.AustraliaLordHowe,
  name: "Australia/Lord_Howe",
  offset: TimezoneOffset.UTC_PLUS_10_30,
  timezone: Timezones.LordHoweStandardTime
};
var AustraliaMelbourne = {
  id: TimezoneRegions.AustraliaMelbourne,
  name: "Australia/Melbourne",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.AustralianEasternStandardTime
};
var AustraliaPerth = {
  id: TimezoneRegions.AustraliaPerth,
  name: "Australia/Perth",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.AustralianWesternStandardTime
};
var AustraliaSydney = {
  id: TimezoneRegions.AustraliaSydney,
  name: "Australia/Sydney",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.AustralianEasternStandardTime
};
var EuropeAmsterdam = {
  id: TimezoneRegions.EuropeAmsterdam,
  name: "Europe/Amsterdam",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeAndorra = {
  id: TimezoneRegions.EuropeAndorra,
  name: "Europe/Andorra",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeAthens = {
  id: TimezoneRegions.EuropeAthens,
  name: "Europe/Athens",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
};
var EuropeBelgrade = {
  id: TimezoneRegions.EuropeBelgrade,
  name: "Europe/Belgrade",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeBerlin = {
  id: TimezoneRegions.EuropeBerlin,
  name: "Europe/Berlin",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeBratislava = {
  id: TimezoneRegions.EuropeBratislava,
  name: "Europe/Bratislava",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeBrussels = {
  id: TimezoneRegions.EuropeBrussels,
  name: "Europe/Brussels",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeBucharest = {
  id: TimezoneRegions.EuropeBucharest,
  name: "Europe/Bucharest",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
};
var EuropeBudapest = {
  id: TimezoneRegions.EuropeBudapest,
  name: "Europe/Budapest",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeBusingen = {
  id: TimezoneRegions.EuropeBusingen,
  name: "Europe/Busingen",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeChisinau = {
  id: TimezoneRegions.EuropeChisinau,
  name: "Europe/Chisinau",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
};
var EuropeCopenhagen = {
  id: TimezoneRegions.EuropeCopenhagen,
  name: "Europe/Copenhagen",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeDublin = {
  id: TimezoneRegions.EuropeDublin,
  name: "Europe/Dublin",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.GreenwichMeanTime
};
var EuropeGibraltar = {
  id: TimezoneRegions.EuropeGibraltar,
  name: "Europe/Gibraltar",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeGuernsey = {
  id: TimezoneRegions.EuropeGuernsey,
  name: "Europe/Guernsey",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeHelsinki = {
  id: TimezoneRegions.EuropeHelsinki,
  name: "Europe/Helsinki",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
};
var EuropeIsleOfMan = {
  id: TimezoneRegions.EuropeIsleOfMan,
  name: "Europe/Isle_of_Man",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.GreenwichMeanTime
};
var EuropeIstanbul = {
  id: TimezoneRegions.EuropeIstanbul,
  name: "Europe/Istanbul",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EasternEuropeanTime
};
var EuropeJersey = {
  id: TimezoneRegions.EuropeJersey,
  name: "Europe/Jersey",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeKaliningrad = {
  id: TimezoneRegions.EuropeKaliningrad,
  name: "Europe/Kaliningrad",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
};
var EuropeKiev = {
  id: TimezoneRegions.EuropeKiev,
  name: "Europe/Kiev",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
};
var EuropeLisbon = {
  id: TimezoneRegions.EuropeLisbon,
  name: "Europe/Lisbon",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.GreenwichMeanTime
};
var EuropeLjubljana = {
  id: TimezoneRegions.EuropeLjubljana,
  name: "Europe/Ljubljana",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeLondon = {
  id: TimezoneRegions.EuropeLondon,
  name: "Europe/London",
  offset: TimezoneOffset.UTC_0,
  timezone: Timezones.GreenwichMeanTime
};
var EuropeLuxembourg = {
  id: TimezoneRegions.EuropeLuxembourg,
  name: "Europe/Luxembourg",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeMadrid = {
  id: TimezoneRegions.EuropeMadrid,
  name: "Europe/Madrid",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeMalta = {
  id: TimezoneRegions.EuropeMalta,
  name: "Europe/Malta",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeMariehamn = {
  id: TimezoneRegions.EuropeMariehamn,
  name: "Europe/Mariehamn",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
};
var EuropeMinsk = {
  id: TimezoneRegions.EuropeMinsk,
  name: "Europe/Minsk",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EasternEuropeanTime
};
var EuropeMonaco = {
  id: TimezoneRegions.EuropeMonaco,
  name: "Europe/Monaco",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeMoscow = {
  id: TimezoneRegions.EuropeMoscow,
  name: "Europe/Moscow",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EasternEuropeanTime
};
var EuropeOslo = {
  id: TimezoneRegions.EuropeOslo,
  name: "Europe/Oslo",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeParis = {
  id: TimezoneRegions.EuropeParis,
  name: "Europe/Paris",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropePodgorica = {
  id: TimezoneRegions.EuropePodgorica,
  name: "Europe/Podgorica",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropePrague = {
  id: TimezoneRegions.EuropePrague,
  name: "Europe/Prague",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeRiga = {
  id: TimezoneRegions.EuropeRiga,
  name: "Europe/Riga",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
};
var EuropeRome = {
  id: TimezoneRegions.EuropeRome,
  name: "Europe/Rome",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeSamara = {
  id: TimezoneRegions.EuropeSamara,
  name: "Europe/Samara",
  offset: TimezoneOffset.UTC_PLUS_4,
  timezone: Timezones.EasternEuropeanTime
};
var EuropeSanMarino = {
  id: TimezoneRegions.EuropeSanMarino,
  name: "Europe/San_Marino",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeSarajevo = {
  id: TimezoneRegions.EuropeSarajevo,
  name: "Europe/Sarajevo",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeSimferopol = {
  id: TimezoneRegions.EuropeSimferopol,
  name: "Europe/Simferopol",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EasternEuropeanTime
};
var EuropeSkopje = {
  id: TimezoneRegions.EuropeSkopje,
  name: "Europe/Skopje",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeSofia = {
  id: TimezoneRegions.EuropeSofia,
  name: "Europe/Sofia",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
};
var EuropeStockholm = {
  id: TimezoneRegions.EuropeStockholm,
  name: "Europe/Stockholm",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeTallinn = {
  id: TimezoneRegions.EuropeTallinn,
  name: "Europe/Tallinn",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
};
var EuropeTirane = {
  id: TimezoneRegions.EuropeTirane,
  name: "Europe/Tirane",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeUzhgorod = {
  id: TimezoneRegions.EuropeUzhgorod,
  name: "Europe/Uzhgorod",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
};
var EuropeVaduz = {
  id: TimezoneRegions.EuropeVaduz,
  name: "Europe/Vaduz",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeVatican = {
  id: TimezoneRegions.EuropeVatican,
  name: "Europe/Vatican",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeVienna = {
  id: TimezoneRegions.EuropeVienna,
  name: "Europe/Vienna",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeVilnius = {
  id: TimezoneRegions.EuropeVilnius,
  name: "Europe/Vilnius",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
};
var EuropeVolgograd = {
  id: TimezoneRegions.EuropeVolgograd,
  name: "Europe/Volgograd",
  offset: TimezoneOffset.UTC_PLUS_4,
  timezone: Timezones.EasternEuropeanTime
};
var EuropeWarsaw = {
  id: TimezoneRegions.EuropeWarsaw,
  name: "Europe/Warsaw",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeZagreb = {
  id: TimezoneRegions.EuropeZagreb,
  name: "Europe/Zagreb",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var EuropeZaporozhye = {
  id: TimezoneRegions.EuropeZaporozhye,
  name: "Europe/Zaporozhye",
  offset: TimezoneOffset.UTC_PLUS_2,
  timezone: Timezones.EasternEuropeanTime
};
var EuropeZurich = {
  id: TimezoneRegions.EuropeZurich,
  name: "Europe/Zurich",
  offset: TimezoneOffset.UTC_PLUS_1,
  timezone: Timezones.CentralEuropeanTime
};
var IndianAntananarivo = {
  id: TimezoneRegions.IndianAntananarivo,
  name: "Indian/Antananarivo",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EastAfricaTime
};
var IndianChagos = {
  id: TimezoneRegions.IndianChagos,
  name: "Indian/Chagos",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.IndianOceanTime
};
var IndianChristmas = {
  id: TimezoneRegions.IndianChristmas,
  name: "Indian/Christmas",
  offset: TimezoneOffset.UTC_PLUS_7,
  timezone: Timezones.ChristmasIslandTime
};
var IndianCocos = {
  id: TimezoneRegions.IndianCocos,
  name: "Indian/Cocos",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.CocosIslandsTime
};
var IndianComoro = {
  id: TimezoneRegions.IndianComoro,
  name: "Indian/Comoro",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EastAfricaTime
};
var IndianKerguelen = {
  id: TimezoneRegions.IndianKerguelen,
  name: "Indian/Kerguelen",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.FrenchSouthernAndAntarcticTime
};
var IndianMahe = {
  id: TimezoneRegions.IndianMahe,
  name: "Indian/Mahe",
  offset: TimezoneOffset.UTC_PLUS_4,
  timezone: Timezones.SeychellesTime
};
var IndianMaldives = {
  id: TimezoneRegions.IndianMaldives,
  name: "Indian/Maldives",
  offset: TimezoneOffset.UTC_PLUS_5,
  timezone: Timezones.MaldivesTime
};
var IndianMauritius = {
  id: TimezoneRegions.IndianMauritius,
  name: "Indian/Mauritius",
  offset: TimezoneOffset.UTC_PLUS_4,
  timezone: Timezones.MauritiusTime
};
var IndianMayotte = {
  id: TimezoneRegions.IndianMayotte,
  name: "Indian/Mayotte",
  offset: TimezoneOffset.UTC_PLUS_3,
  timezone: Timezones.EastAfricaTime
};
var IndianReunion = {
  id: TimezoneRegions.IndianReunion,
  name: "Indian/Reunion",
  offset: TimezoneOffset.UTC_PLUS_4,
  timezone: Timezones.ReunionTime
};
var PacificApia = {
  id: TimezoneRegions.PacificApia,
  name: "Pacific/Apia",
  offset: TimezoneOffset.UTC_PLUS_13,
  timezone: Timezones.SamoaStandardTime
};
var PacificAuckland = {
  id: TimezoneRegions.PacificAuckland,
  name: "Pacific/Auckland",
  offset: TimezoneOffset.UTC_PLUS_13,
  timezone: Timezones.NewZealandStandardTime
};
var PacificChatham = {
  id: TimezoneRegions.PacificChatham,
  name: "Pacific/Chatham",
  offset: TimezoneOffset.UTC_PLUS_13,
  timezone: Timezones.ChathamStandardTime
};
var PacificEaster = {
  id: TimezoneRegions.PacificEaster,
  name: "Pacific/Easter",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.EasterIslandStandardTime
};
var PacificEfate = {
  id: TimezoneRegions.PacificEfate,
  name: "Pacific/Efate",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.VanuatuTime
};
var PacificEnderbury = {
  id: TimezoneRegions.PacificEnderbury,
  name: "Pacific/Enderbury",
  offset: TimezoneOffset.UTC_PLUS_13,
  timezone: Timezones.TongaTime
};
var PacificFakaofo = {
  id: TimezoneRegions.PacificFakaofo,
  name: "Pacific/Fakaofo",
  offset: TimezoneOffset.UTC_PLUS_13,
  timezone: Timezones.TongaTime
};
var PacificFiji = {
  id: TimezoneRegions.PacificFiji,
  name: "Pacific/Fiji",
  offset: TimezoneOffset.UTC_PLUS_12,
  timezone: Timezones.FijiTime
};
var PacificFunafuti = {
  id: TimezoneRegions.PacificFunafuti,
  name: "Pacific/Funafuti",
  offset: TimezoneOffset.UTC_PLUS_12,
  timezone: Timezones.TuvaluTime
};
var PacificGalapagos = {
  id: TimezoneRegions.PacificGalapagos,
  name: "Pacific/Galapagos",
  offset: TimezoneOffset.UTC_PLUS_6,
  timezone: Timezones.GalapagosTime
};
var PacificGambier = {
  id: TimezoneRegions.PacificGambier,
  name: "Pacific/Gambier",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.GambierIslandTime
};
var PacificGuadalcanal = {
  id: TimezoneRegions.PacificGuadalcanal,
  name: "Pacific/Guadalcanal",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.SolomonIslandsTime
};
var PacificGuam = {
  id: TimezoneRegions.PacificGuam,
  name: "Pacific/Guam",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.ChamorroStandardTime
};
var PacificHonolulu = {
  id: TimezoneRegions.PacificHonolulu,
  name: "Pacific/Honolulu",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.HawaiiAleutianStandardTime
};
var PacificJohnston = {
  id: TimezoneRegions.PacificJohnston,
  name: "Pacific/Johnston",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.HawaiiAleutianStandardTime
};
var PacificKiritimati = {
  id: TimezoneRegions.PacificKiritimati,
  name: "Pacific/Kiritimati",
  offset: TimezoneOffset.UTC_PLUS_14,
  timezone: Timezones.LineIslandsTime
};
var PacificKosrae = {
  id: TimezoneRegions.PacificKosrae,
  name: "Pacific/Kosrae",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.KosraeTime
};
var PacificKwajalein = {
  id: TimezoneRegions.PacificKwajalein,
  name: "Pacific/Kwajalein",
  offset: TimezoneOffset.UTC_PLUS_12,
  timezone: Timezones.MarshallIslandsTime
};
var PacificMajuro = {
  id: TimezoneRegions.PacificMajuro,
  name: "Pacific/Majuro",
  offset: TimezoneOffset.UTC_PLUS_12,
  timezone: Timezones.MarshallIslandsTime
};
var PacificMarquesas = {
  id: TimezoneRegions.PacificMarquesas,
  name: "Pacific/Marquesas",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.MarquesasIslandsTime
};
var PacificMidway = {
  id: TimezoneRegions.PacificMidway,
  name: "Pacific/Midway",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.SamoaStandardTime
};
var PacificNauru = {
  id: TimezoneRegions.PacificNauru,
  name: "Pacific/Nauru",
  offset: TimezoneOffset.UTC_PLUS_12,
  timezone: Timezones.NauruTime
};
var PacificNiue = {
  id: TimezoneRegions.PacificNiue,
  name: "Pacific/Niue",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.NiueTime
};
var PacificNorfolk = {
  id: TimezoneRegions.PacificNorfolk,
  name: "Pacific/Norfolk",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.NorfolkIslandTime
};
var PacificNoumea = {
  id: TimezoneRegions.PacificNoumea,
  name: "Pacific/Noumea",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.NewCaledoniaTime
};
var PacificPagoPago = {
  id: TimezoneRegions.PacificPagoPago,
  name: "Pacific/Pago_Pago",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.SamoaStandardTime
};
var PacificPalau = {
  id: TimezoneRegions.PacificPalau,
  name: "Pacific/Palau",
  offset: TimezoneOffset.UTC_PLUS_9,
  timezone: Timezones.PalauTime
};
var PacificPitcairn = {
  id: TimezoneRegions.PacificPitcairn,
  name: "Pacific/Pitcairn",
  offset: TimezoneOffset.UTC_PLUS_8,
  timezone: Timezones.PitcairnTime
};
var PacificPonape = {
  id: TimezoneRegions.PacificPonape,
  name: "Pacific/Ponape",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.PohnpeiStandardTime
};
var PacificPortMoresby = {
  id: TimezoneRegions.PacificPortMoresby,
  name: "Pacific/Port_Moresby",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.PapuaNewGuineaTime
};
var PacificRarotonga = {
  id: TimezoneRegions.PacificRarotonga,
  name: "Pacific/Rarotonga",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.CookIslandTime
};
var PacificSaipan = {
  id: TimezoneRegions.PacificSaipan,
  name: "Pacific/Saipan",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.ChamorroStandardTime
};
var PacificTahiti = {
  id: TimezoneRegions.PacificTahiti,
  name: "Pacific/Tahiti",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.TahitiTime
};
var PacificTarawa = {
  id: TimezoneRegions.PacificTarawa,
  name: "Pacific/Tarawa",
  offset: TimezoneOffset.UTC_PLUS_12,
  timezone: Timezones.GilbertIslandTime
};
var PacificTongatapu = {
  id: TimezoneRegions.PacificTongatapu,
  name: "Pacific/Tongatapu",
  offset: TimezoneOffset.UTC_PLUS_13,
  timezone: Timezones.TongaTime
};
var PacificChuuk = {
  id: TimezoneRegions.PacificChuuk,
  name: "Pacific/Chuuk",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.ChuukTime
};
var PacificPohnpei = {
  id: TimezoneRegions.PacificPohnpei,
  name: "Pacific/Pohnpei",
  offset: TimezoneOffset.UTC_PLUS_11,
  timezone: Timezones.PohnpeiStandardTime
};
var PacificYap = {
  id: TimezoneRegions.PacificYap,
  name: "Pacific/Yap",
  offset: TimezoneOffset.UTC_PLUS_10,
  timezone: Timezones.ChuukTime
};

// src/commands/models/build/outputs/sequelize.ts
import path5 from "path";
import fs5 from "fs-extra";

// src/commands/models/build/types.ts
function getTypescriptTypeFromPrimitive(type) {
  switch (type) {
    case Primitives.Boolean:
      return "boolean";
    case Primitives.DayOfMonth:
      return "number";
    case Primitives.Weekday:
      return "string";
    case Primitives.Float:
      return "number";
    case Primitives.CurrencyCode:
      return "string";
    case Primitives.DateTime:
      return "Date";
    case Primitives.Image:
      return "Image[]";
    case Primitives.JSON:
      return "Record<string, any>";
    case Primitives.LongText:
      return "string";
    case Primitives.Markdown:
      return "string";
    case Primitives.Menu:
      return "Menu";
    case Primitives.Month:
      return "number";
    case Primitives.Number:
      return "number";
    case Primitives.Tags:
      return "string[]";
    case Primitives.String:
      return "string";
    case Primitives.UUID:
      return "string";
    default:
      return "unknown";
  }
}

// src/commands/models/build/outputs/types.ts
var import_pluralize = __toESM(require_pluralize(), 1);
import path4 from "path";
import fs4 from "fs-extra";
var snakeToPascal = (str) => {
  return str.split("/").map((snake) => snake.split("_").map((substr) => substr.charAt(0).toUpperCase() + substr.slice(1)).join("")).join("/");
};
function getPrimitiveImports(fields) {
  let imports = "import { ";
  Object.values(fields).forEach((f) => {
    switch (f.type) {
      case Primitives.Image:
        if (!imports.includes(" Image,")) {
          imports += "Image, ";
        }
        break;
      case Primitives.Menu:
        if (!imports.includes(" Menu,")) {
          imports += "Menu, ";
        }
        break;
      default:
        break;
    }
  });
  imports += "} from '@srclaunch/types';";
  return imports;
}
function constructModelTypeFromModel(model) {
  let fieldStrs = Object.entries(model.fields).map(([fieldName, field]) => {
    return `
${fieldName}${field.required ? "" : "?"}: ${field.type === Primitives.Menu ? model.name + (0, import_pluralize.default)(snakeToPascal(fieldName)) : getTypescriptTypeFromPrimitive(field.type)}${field.required ? ";" : " | null;"}`;
  }).join("");
  let str = getPrimitiveImports(model.fields) + "\n";
  Object.entries(model.fields).forEach(([fieldName, field]) => {
    let enumStr = "";
    if (field.type === Primitives.Menu && field.menu) {
      enumStr += `export enum ${model.name + (0, import_pluralize.default)(snakeToPascal(fieldName))} {`;
      const regex = /[^A-Za-z0-9]/g;
      for (const item of field.menu) {
        if (item.label) {
          enumStr += `
  ${snakeToPascal(item.label).replace(/ /g, "").replace(/0/g, "Zero").replace(/1/g, "One").replace(/2/g, "Two").replace(/3/g, "Three").replace(/4/g, "Four").replace(/5/g, "Five").replace(/6/g, "Six").replace(/7/g, "Seven").replace(/8/g, "Eight").replace(/9/g, "Nine").replace(regex, "")} = "${item.value}",`;
        }
      }
      enumStr += "};\n\n";
    }
    str += `
${enumStr}`;
  });
  str += `export type ${model.name} = {
    id?: string;${fieldStrs}
  };`;
  return str;
}
function getModelExports(model) {
  let str = `export { ${model.name} } from './${model.name}';
`;
  let enumStr = "";
  Object.entries(model.fields).forEach(([fieldName, field]) => {
    if (field.type === Primitives.Menu && field.menu) {
      enumStr += model.name + (0, import_pluralize.default)(snakeToPascal(fieldName)) + ",";
    }
  });
  if (enumStr.length > 0) {
    str += `export {${enumStr}} from './${model.name}.js';
`;
  }
  return str;
}
async function buildModelTypes({ path: projectPath }) {
  try {
    const APPLAB_DIRECTORY = ".applab";
    const MODELS_BUILD_PATH = path4.join(path4.resolve(), APPLAB_DIRECTORY, "dependencies/models/dist/index.js");
    const BUILD_PATH = path4.join(path4.resolve(), APPLAB_DIRECTORY, `${projectPath}/src`);
    const DIST_PATH = path4.join(path4.resolve(), APPLAB_DIRECTORY, `${projectPath}/dist`);
    const TYPES_DIR_PATH = path4.join(path4.resolve(), "types");
    await fs4.emptyDir(BUILD_PATH);
    await fs4.emptyDir(DIST_PATH);
    const files = await fs4.readdir(TYPES_DIR_PATH);
    for (const file of files) {
      const fileContents = await fs4.readFile(path4.join(TYPES_DIR_PATH, file), "utf8");
      console.info(`Copying ${file} type`);
      await fs4.writeFile(path4.join(BUILD_PATH, file), fileContents, "utf8");
    }
    const Models = await import(MODELS_BUILD_PATH);
    let exportStr = "";
    for (const model of [...Object.entries(Models)]) {
      const modelName = model[1].name;
      const types = constructModelTypeFromModel(model[1]);
      const fileName = `${modelName}.ts`;
      const filePath = path4.join(BUILD_PATH, fileName);
      await fs4.writeFile(filePath, types, "utf8");
      exportStr += getModelExports(model[1]);
    }
    await fs4.writeFile(path4.join(BUILD_PATH, "index.ts"), exportStr, "utf8");
    console.info("Finished building model types");
  } catch (err) {
    console.error("err", err);
  }
}

// src/commands/models/build/outputs/sequelize.ts
function getSequelizeTypeFromPrimitive(type) {
  switch (type) {
    case Primitives.Boolean:
      return "DataTypes.BOOLEAN";
    case Primitives.DayOfMonth:
      return "DataTypes.INTEGER";
    case Primitives.Weekday:
      return "DataTypes.STRING";
    case Primitives.Float:
      return "DataTypes.FLOAT";
    case Primitives.CurrencyCode:
      return "DataTypes.STRING";
    case Primitives.DateTime:
      return "DataTypes.DATE";
    case Primitives.Image:
      return "DataTypes.JSONB";
    case Primitives.JSON:
      return "DataTypes.JSONB";
    case Primitives.LongText:
      return "DataTypes.STRING";
    case Primitives.Markdown:
      return "DataTypes.TEXT";
    case Primitives.Menu:
      return "DataTypes.ENUM";
    case Primitives.Month:
      return "DataTypes.INTEGER";
    case Primitives.Number:
      return "DataTypes.INTEGER";
    case Primitives.Tags:
      return "DataTypes.ARRAY(DataTypes.STRING)";
    case Primitives.String:
      return "DataTypes.STRING";
    case Primitives.UUID:
      return "DataTypes.UUID";
    default:
      return "DataTypes.STRING";
  }
}
function constructSequelizeModelClassStr(model) {
  const typePropertiesStr = constructTypePropsFromFields(model.fields, true);
  const classPropertiesStr = constructSequelizeClassPropsWithTypes(model);
  return `export type ${model.name}Attributes = {
  ${typePropertiesStr}
};

export type ${model.name}CreationAttributes = Optional<${model.name}Attributes, 'id'>;
export class ${model.name} extends Model<
  ${model.name}Attributes,
  ${model.name}CreationAttributes
> implements ${model.name}Attributes {
${classPropertiesStr}
}
`;
}
function constructTypePropsFromFields(fields, sequelize = false) {
  let fieldsStr = ` id: string;
  `;
  for (const field of [...Object.entries(fields)].sort((a, b) => a[0].localeCompare(b[0]))) {
    fieldsStr += `  ${field[0]}${field[1].required ? "" : "?"}: ${getTypescriptTypeFromPrimitive(field[1].type)} ${field[1].required ? "" : "| null"};
`;
  }
  return fieldsStr;
}
function constructSequelizeClassPropsWithTypes(model) {
  let fieldsStr = ` public readonly id!: string;

  public static associate: (models: Record<string, ModelStatic<Model>>) => void;
`;
  for (const field of [...Object.entries(model.fields)].sort((a, b) => a[0].localeCompare(b[0]))) {
    fieldsStr += `  public ${field[0]}!: ${getTypescriptTypeFromPrimitive(field[1].type)}${!field[1].required ? " | null" : ""};
`;
  }
  return fieldsStr;
}
function constructSequelizeFieldStr(fieldName, field) {
  const fieldType = getSequelizeTypeFromPrimitive(field.type);
  if (fieldName) {
    return `
  ${fieldName}: {
        allowNull: ${field?.required ? "false" : "true"},
        type: ${fieldType === "DataTypes.ENUM" && field.menu ? `DataTypes.ENUM(${field.menu.map((i) => `'${i.value}'`).join(",")})` : fieldType}
      },`;
  }
  return "";
}
function getSequelizeFieldsStr(fields) {
  let fieldsStr = ` id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },`;
  for (const field of [...Object.entries(fields)].sort((a, b) => a[0].localeCompare(b[0]))) {
    fieldsStr += constructSequelizeFieldStr(field[0], field[1]);
  }
  return fieldsStr;
}
function constructSequelizeModelRelationships(modelName, relationships) {
  if (relationships) {
    const { belongsTo, hasOne, hasMany } = relationships;
    let belongsToStr = "";
    if (Array.isArray(belongsTo) && belongsTo.length > 0) {
      belongsTo.forEach((model) => {
        belongsToStr += `
          if (${model}) ${modelName}.belongsTo(${model});`;
      });
    }
    let hasOneStr = "";
    if (Array.isArray(hasOne) && hasOne.length > 0) {
      hasOne.forEach((model) => {
        hasOneStr += `     
        if (${model}) ${modelName}.hasOne(${model});`;
      });
    }
    let hasManyStr = "";
    if (Array.isArray(hasMany) && hasMany.length > 0) {
      hasMany.forEach((model) => {
        hasManyStr += `
        if (${model}) ${modelName}.hasMany(${model});`;
      });
    }
    return belongsToStr + hasOneStr + hasManyStr;
  }
  return "";
}
function constructSequelizeModelDependencies(modelName, relationships) {
  if (!relationships) {
    return [];
  }
  const { belongsTo, hasOne, hasMany } = relationships;
  return [
    .../* @__PURE__ */ new Set([
      ...belongsTo && belongsTo.length ? belongsTo : [],
      ...hasOne && hasOne.length ? hasOne : [],
      ...hasMany && hasMany.length ? hasMany : []
    ])
  ];
}
function constructSequelizeModelFromModel(model) {
  const classStr = constructSequelizeModelClassStr(model);
  const fieldsStr = getSequelizeFieldsStr(model.fields);
  const dependentModels = constructSequelizeModelDependencies(model.name, model.relationships);
  let modelImports = "";
  dependentModels.forEach((m) => {
    modelImports += `import { ${m} as ${m}Type } from './${m}';
`;
  });
  const dependentModelsStr = Array.isArray(dependentModels) && dependentModels.length > 0 ? `${dependentModels.filter((m) => m !== model.name).join(", ")},` : "";
  return `import { DataTypes, Sequelize, Model, ModelStatic, Optional } from 'sequelize';


  ${getPrimitiveImports(model.fields)}
  
${classStr}

export default (sequelize: Sequelize) => {
    ${model.name}.init(
      {${fieldsStr}},
      {
        createdAt: 'created_date',
        indexes: [{ fields: ['id'], unique: true }],
        modelName: '${model.name}',
        sequelize,
        updatedAt: 'updated_date',
      },
    );
  
  ${dependentModels.length === 0 ? "" : `  ${model.name}.associate =  ({ ${dependentModelsStr} }: Record<string, ModelStatic<Model>>) => {${constructSequelizeModelRelationships(model.name, model.relationships)}
    };`}
  
    return ${model.name};
  };`;
}
async function buildSequelizeModels({
  path: projectPath
}) {
  try {
    const APPLAB_DIRECTORY = ".applab";
    const MODELS_BUILD_PATH = path5.join(path5.resolve(), APPLAB_DIRECTORY, "dependencies/models/dist/index.js");
    const BUILD_PATH = path5.join(path5.resolve(), APPLAB_DIRECTORY, `${projectPath}/src`);
    const DIST_PATH = path5.join(path5.resolve(), APPLAB_DIRECTORY, `${projectPath}/dist`);
    await fs5.emptyDir(BUILD_PATH);
    await fs5.emptyDir(DIST_PATH);
    const Models = await import(MODELS_BUILD_PATH);
    for (const model of [...Object.entries(Models)]) {
      const modelName = model[1].name;
      const sequelizeModel = constructSequelizeModelFromModel(model[1]);
      const fileName = `${modelName}.ts`;
      const filePath = path5.join(BUILD_PATH, fileName);
      await fs5.writeFile(filePath, sequelizeModel, "utf8");
    }
    const indexFileContent = constructModelExportIndexScript(Object.keys(Models).map((modelName) => modelName), "sequelize");
    await fs5.writeFile(path5.join(BUILD_PATH, "index.ts"), indexFileContent, "utf8");
    console.info("Finished building Sequelize models");
  } catch (err) {
    console.error(err);
  }
}

// src/commands/models/build/outputs/redux.ts
var import_pluralize2 = __toESM(require_pluralize(), 1);
import path6 from "path";
import fs6 from "fs-extra";
function constructReduxReducersIndexScript(models) {
  const imports = models.map((name) => {
    const pluralizedCamel = (0, import_pluralize2.default)(name[0]?.toLowerCase() + name.slice(1));
    return `import ${pluralizedCamel} from './${pluralizedCamel}.js';`;
  }).join("\n");
  const exports = models.map((name) => {
    const pluralizedCamel = (0, import_pluralize2.default)(name[0]?.toLowerCase() + name.slice(1));
    return `export { 
        create${name}, 
        create${(0, import_pluralize2.default)(name)}, 
        delete${name}, 
        delete${(0, import_pluralize2.default)(name)}, 
        get${name}, 
        get${(0, import_pluralize2.default)(name)}, 
        update${name},
        update${(0, import_pluralize2.default)(name)},
        ${name}Selectors, 
      } from './${pluralizedCamel}.js';`;
  }).join("\n");
  return `${imports}
export default {
  ${models.map((name) => (0, import_pluralize2.default)(name[0]?.toLowerCase() + name.slice(1))).join(",\n  ")},
};

${exports}
`;
}
function getModelSlice({
  httpClientProjectName,
  modelName,
  typesProjectName
}) {
  const lowercase = modelName.toLowerCase();
  const lowercasePlural = (0, import_pluralize2.default)(modelName.toLowerCase());
  const pluralCamel = (0, import_pluralize2.default)(modelName?.[0]?.toLowerCase() + modelName.slice(1));
  const capitalizedPlural = (0, import_pluralize2.default)(modelName);
  const singularCamel = modelName?.[0]?.toLowerCase() + modelName.slice(1);
  const pluralizedCamel = (0, import_pluralize2.default)(modelName[0]?.toLowerCase() + modelName.slice(1));
  return `import { ${modelName} } from '${typesProjectName}';
  import * as httpClient from '${httpClientProjectName}';
  
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Exception, ExceptionObject } from '@srclaunch/exceptions';
import { AppDispatch, AppThunk, RootState } from '@srclaunch/web-application-state';
import { Condition, ISO8601String } from '@srclaunch/types';

const adapter = createEntityAdapter<${modelName}>();

export const ${modelName}Selectors = adapter.getSelectors<RootState>(
  (state: RootState) => state.${pluralCamel},
);

type ${modelName}State = {
  action: {
    create${modelName}: {
      error?: ExceptionObject;
      inProgress: boolean;
      lastUpdated?: ISO8601String;
    },
    create${capitalizedPlural}: {
      error?: ExceptionObject;
      inProgress: boolean;
      lastUpdated?: ISO8601String;
    },
    delete${modelName}: {
      error?: ExceptionObject;
      inProgress: boolean;
      lastUpdated?: ISO8601String;
    },
    delete${capitalizedPlural}: {
      error?: ExceptionObject;
      inProgress: boolean;
      lastUpdated?: ISO8601String;
    },
    get${modelName}: {
      error?: ExceptionObject;
      inProgress: boolean;
      lastUpdated?: ISO8601String;
    },
    get${capitalizedPlural}: {
      error?: ExceptionObject;
      inProgress: boolean;
      lastUpdated?: ISO8601String;
    },
    update${modelName}: {
      error?: ExceptionObject;
      inProgress: boolean;
      lastUpdated?: ISO8601String;
    },
    update${capitalizedPlural}: {
      error?: ExceptionObject;
      inProgress: boolean;
      lastUpdated?: ISO8601String;
    },
  },
  inProgress?: boolean;
  lastUpdated?: ISO8601String;
};

const initialState = {
  action: {
    create${modelName}: {
      inProgress: false,
    },
    create${capitalizedPlural}: {
      inProgress: false,
    },
    delete${modelName}: {
      inProgress: false,
    },
    delete${capitalizedPlural}: {
      inProgress: false,
    },
    get${modelName}: {
      inProgress: false,
    },
    get${capitalizedPlural}: {
      inProgress: false,
    },
    update${modelName}: {
      inProgress: false,
    },
    update${capitalizedPlural}: {
      inProgress: false,
    },
  },
  inProgress: false,
}

const slice = createSlice({
  initialState: adapter.getInitialState<${modelName}State>(initialState),
  name: '${pluralCamel}',
  reducers: {
    add${modelName}: (state, action) => {
      adapter.upsertOne(state, action.payload);

      state.lastUpdated = new Date().toISOString();
    },
    add${capitalizedPlural}: (state, action) => {
      adapter.upsertMany(state, action.payload);

      state.lastUpdated = new Date().toISOString();
    },

    remove${modelName}: (state, action) => {
      adapter.removeOne(state, action.payload);

      state.lastUpdated = new Date().toISOString();
    },
    remove${capitalizedPlural}: (state, action) => {
      adapter.removeMany(state, action.payload);

      state.lastUpdated = new Date().toISOString();
    },

    update${modelName}: (state, action) => {
      console.log('action.payload', action.payload);
      adapter.updateOne(state, action);

      state.lastUpdated = new Date().toISOString();
    },
    update${capitalizedPlural}: (state, action) => {
      adapter.updateMany(state, action.payload);

      state.lastUpdated = new Date().toISOString();
    },
    setActionError: (state, action: PayloadAction<{
      type: |
        'create${modelName}' | 'create${capitalizedPlural}' |
        'delete${modelName}' | 'delete${capitalizedPlural}' |
        'get${modelName}' | 'get${capitalizedPlural}' |
        'update${modelName}' | 'update${capitalizedPlural}';
      error: ExceptionObject;
    }>) => {
      const { type, error } = action.payload;

      state.action[type].error = error;
      state.lastUpdated = new Date().toISOString();
    },
    setActionInProgress: (state, action: PayloadAction<{
      type: |
        'create${modelName}' | 'create${capitalizedPlural}' |
        'delete${modelName}' | 'delete${capitalizedPlural}' |
        'get${modelName}' | 'get${capitalizedPlural}' |
        'update${modelName}' | 'update${capitalizedPlural}';
      inProgress: boolean;
    }>) => {
      const { type, inProgress } = action.payload;

      state.inProgress = inProgress;
      state.action[type].inProgress = inProgress;
      state.lastUpdated = new Date().toISOString();
    },
  },
});

export const create${modelName} = (${singularCamel}: ${modelName}): AppThunk =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(slice.actions.setActionInProgress({
        type: 'create${modelName}',
        inProgress: true,
      }));
  
      const response = await httpClient.default.create${modelName}(${singularCamel});
  
      dispatch(slice.actions.add${modelName}(response?.body));
  
      dispatch(slice.actions.setActionInProgress({
        type: 'create${modelName}',
        inProgress: false,
      }));
    } catch (err: any) {
      const exception = new Exception('Error creating ${modelName}', { cause: err });
      
      dispatch(slice.actions.setActionError({
        type: 'create${modelName}',
        error: exception.toJSON(),
      }));

      dispatch(slice.actions.setActionInProgress({
        type: 'create${modelName}',
        inProgress: false,
      }));
    }
  };

export const create${capitalizedPlural} = (${pluralizedCamel}: ${modelName}[]): AppThunk =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(slice.actions.setActionInProgress({
        type: 'create${capitalizedPlural}',
        inProgress: true,
      }));

      const response = await httpClient.default.create${capitalizedPlural}(${pluralizedCamel});
      
      dispatch(slice.actions.add${capitalizedPlural}(response?.body));

      dispatch(slice.actions.setActionInProgress({
        type: 'create${capitalizedPlural}',
        inProgress: false,
      }));
    } catch (err: any) {
      const exception = new Exception('Error creating ${capitalizedPlural}', { cause: err });

      dispatch(slice.actions.setActionError({
        type: 'create${capitalizedPlural}',
        error: exception.toJSON(),
      }));

      dispatch(slice.actions.setActionInProgress({
        type: 'create${capitalizedPlural}',
        inProgress: false,
      }));
    }
  };

export const delete${modelName} = (${singularCamel}: ${modelName}['id']): AppThunk =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(slice.actions.setActionInProgress({
        type: 'delete${modelName}',
        inProgress: true,
      }));
  
      const response = await httpClient.default.delete${modelName}(${singularCamel});
      
      dispatch(slice.actions.remove${modelName}(${singularCamel}));
  
      dispatch(slice.actions.setActionInProgress({
        type: 'delete${modelName}',
        inProgress: false,
      }));
    } catch (err: any) {
      const exception = new Exception('Error deleting ${modelName}', { cause: err });

      dispatch(slice.actions.setActionError({
        type: 'delete${modelName}',
        error: exception.toJSON(),
      }));

      dispatch(slice.actions.setActionInProgress({
        type: 'delete${modelName}',
        inProgress: false,
      }));
    }
  };

export const delete${capitalizedPlural} = (${pluralizedCamel}: ${modelName}['id'][]): AppThunk =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(slice.actions.setActionInProgress({
        type: 'delete${capitalizedPlural}',
        inProgress: true,
      }));
  
      const response = await httpClient.default.delete${capitalizedPlural}(${pluralizedCamel});
  
      dispatch(slice.actions.remove${capitalizedPlural}(response?.body));
  
      dispatch(slice.actions.setActionInProgress({
        type: 'delete${capitalizedPlural}',
        inProgress: false,
      }));
    } catch (err: any) {
      const exception = new Exception('Error deleting ${capitalizedPlural}', { cause: err });

      dispatch(slice.actions.setActionError({
        type: 'delete${capitalizedPlural}',
        error: exception.toJSON(),
      }));

      dispatch(slice.actions.setActionInProgress({
        type: 'delete${capitalizedPlural}',
        inProgress: false,
      }));
    }
  };

export const get${modelName} = (${singularCamel}: ${modelName}['id']): AppThunk => 
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(slice.actions.setActionInProgress({
        type: 'get${modelName}',
        inProgress: true,
      }));
  
      const response = await httpClient.default.get${modelName}(${singularCamel});
  
      if (response?.body) {
        dispatch(slice.actions.add${modelName}(response?.body));
      }
  
      dispatch(slice.actions.setActionInProgress({
        type: 'get${modelName}',
        inProgress: false,
      }));
    } catch (err: any) {
      const exception = new Exception('Error getting ${modelName}', { cause: err });

      dispatch(slice.actions.setActionError({
        type: 'get${modelName}',
        error: exception.toJSON(),
      }));

      dispatch(slice.actions.setActionInProgress({
        type: 'get${modelName}',
        inProgress: false,
      }));
    }
  };

export const get${capitalizedPlural} = ({
  conditions = [],
  filters = {},
  limit = 100,
  offset = 0
}: { 
  conditions?: Condition[],
  filters?: Record<string, string>,
  limit?: number;
  offset?: number
}): AppThunk =>  async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    dispatch(slice.actions.setActionInProgress({
      type: 'get${capitalizedPlural}',
      inProgress: true,
    }));

    const response = await httpClient.default.get${capitalizedPlural}({
      conditions,
      filters,
      limit,
      offset
    });

    dispatch(slice.actions.add${capitalizedPlural}(response?.body));

    dispatch(slice.actions.setActionInProgress({
      type: 'get${capitalizedPlural}',
      inProgress: false,
    }));
  } catch (err: any) {
    const exception = new Exception('Error getting ${capitalizedPlural}', { cause: err });

    dispatch(slice.actions.setActionError({
      type: 'get${capitalizedPlural}',
      error: exception.toJSON(),
    }));

    dispatch(slice.actions.setActionInProgress({
      type: 'get${capitalizedPlural}',
      inProgress: false,
    }));
  }
};


export const update${modelName} = (${singularCamel}: ${modelName}): AppThunk =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(slice.actions.setActionInProgress({
        type: 'update${modelName}',
        inProgress: true,
      }));
  
      const response = await httpClient.default.update${modelName}(${singularCamel}.id, ${singularCamel});
  
      if (response?.body) {
        dispatch(slice.actions.update${modelName}({ id: ${singularCamel}.id, changes: response.body }));
    
        dispatch(slice.actions.setActionInProgress({
          type: 'update${modelName}',
          inProgress: false,
        }));
      }
    } catch (err: any) {
      const exception = new Exception('Error updating ${modelName}', { cause: err });

      dispatch(slice.actions.setActionError({
        type: 'update${modelName}',
        error: exception.toJSON(),
      }));
  
      dispatch(slice.actions.setActionInProgress({
        type: 'update${modelName}',
        inProgress: false,
      }));
    }
  };
  

export const update${capitalizedPlural} = (${pluralizedCamel}: ${modelName}[]): AppThunk =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(slice.actions.setActionInProgress({
        type: 'update${capitalizedPlural}',
        inProgress: true,
      }));
  
      const response = await httpClient.default.update${capitalizedPlural}(${pluralizedCamel});
      
      dispatch(slice.actions.update${capitalizedPlural}(response?.body));
  
      dispatch(slice.actions.setActionInProgress({
        type: 'update${capitalizedPlural}',
        inProgress: false,
      }));
    } catch (err: any) {
      const exception = new Exception('Error updating ${capitalizedPlural}', { cause: err });

      dispatch(slice.actions.setActionError({
        type: 'update${capitalizedPlural}',
        error: exception.toJSON(),
      }));
  
      dispatch(slice.actions.setActionInProgress({
        type: 'update${capitalizedPlural}',
        inProgress: false,
      }));
    }
  };


export default slice.reducer;
  `;
}
async function buildReduxSlices({
  httpClientProjectName,
  projectPath,
  typesProjectName
}) {
  try {
    const APPLAB_DIRECTORY = ".applab";
    const MODELS_PATH = path6.join(path6.resolve(), APPLAB_DIRECTORY, "dependencies/models/src");
    const BUILD_PATH = path6.join(path6.resolve(), APPLAB_DIRECTORY, `${projectPath}/src`);
    const DIST_PATH = path6.join(path6.resolve(), APPLAB_DIRECTORY, `${projectPath}/dist`);
    await fs6.emptyDir(BUILD_PATH);
    await fs6.emptyDir(DIST_PATH);
    const files = await fs6.readdir(MODELS_PATH);
    for (const file of files) {
      if (file !== "index.ts") {
        const name = (0, import_pluralize2.default)(file[0]?.toLowerCase() + file.slice(1).replace(".ts", ""));
        const reduxSlice = getModelSlice({
          modelName: file.replace(".ts", ""),
          httpClientProjectName,
          typesProjectName
        });
        await fs6.writeFile(path6.join(BUILD_PATH, `${name}.ts`), reduxSlice, "utf8");
      }
    }
    const indexFileContent = constructReduxReducersIndexScript(files.filter((f) => f !== "index.ts").map((file) => (0, import_pluralize2.default)(file).replace(".ts", "")));
    await fs6.writeFile(path6.join(BUILD_PATH, "index.ts"), indexFileContent, "utf8");
    console.info("Finished building Redux state");
  } catch (err) {
    console.error(err);
  }
}

// src/commands/models/build/outputs/http-client.ts
var import_pluralize3 = __toESM(require_pluralize(), 1);
var import_change_case = __toESM(require_dist15(), 1);
import path7 from "path";
import fs7 from "fs-extra";
function constructHttpClientIndexScript({
  environments,
  models
}) {
  let imports = `import { HttpClient } from '@srclaunch/http-client';
import { Environment } from '@srclaunch/types';
import { getEnvironment } from '@srclaunch/web-environment';
`;
  models.forEach((name) => {
    imports += `import ${name.toLowerCase()}Endpoints from './${name}Endpoints';
`;
  });
  return `${imports}

const environment: Environment = getEnvironment();

const hosts = {
  dev: '${environments.dev.protocol}://${environments.dev.host}${environments.dev.port !== 80 ? `:${environments.dev.port.toString()}` : ""}',
  test: '${environments.test.protocol}://${environments.test.host}${environments.test.port !== 80 ? `:${environments.test.port.toString()}` : ""}',
  prod: '${environments.prod.protocol}://${environments.prod.host}${environments.prod.port !== 80 ? `:${environments.prod.port.toString()}` : ""}',
}

export const httpClient = HttpClient({
  basePath: 'core-api',
  // @ts-ignore
  host: hosts[environment.id],
  headers: {
    Accept: 'application/json',

    'Content-Type': 'application/json',
    // headers: { 'X-Requested-With': 'XMLHttpRequest' },
  },
  options: {
    retries: 2,
    retryCondition: err => !err.response,
    retryDelay: 5000,
  },
  preAuthResourceIncludes: '/auth',
  responseType: 'json',
  withCredentials: true,
});

export default {
  ${models.map((name) => {
    return `...${name}Endpoints
`;
  })}
};`;
}
function getHttpClientEndpoints({
  modelName,
  typesProjectName
}) {
  const lowercase = modelName.toLowerCase();
  const lowercasePlural = (0, import_pluralize3.default)(modelName.toLowerCase());
  const capitalizedPlural = (0, import_pluralize3.default)(modelName);
  const urlParam = (0, import_change_case.paramCase)((0, import_pluralize3.default)(modelName));
  return `import { Condition, HttpResponse } from '@srclaunch/types';
  import { stringify } from 'query-string';
  import { httpClient } from './index';
  import { ${modelName} } from '${typesProjectName}';

  function getFormData(props: object) {
    try {
      const formData = new FormData();
      const keys =  Object.keys(props);
     
      for (const key of keys) {
        // @ts-ignore
        const value = props[key];
        if (Array.isArray(value) && value.length > 0) {
          for (let i = 0; i < value.length; i++) {
            const item = value[i];
            console.log('item', item);
            
            if ('size' in item) {
              if (item) formData.append(\`\${key}[\${i}]\`, item);
            } else {
              if (item) formData.append(\`\${key}[\${i}]\`, JSON.stringify(item));
            }
          }
        } else {
          if (value) formData.append(key, value);
        }
      }
    
      return formData;
    } catch (err: any) {
      console.error(err);
    }
 }

  export default {
    create${modelName}: (props: ${modelName}): Promise<HttpResponse<${modelName}> | void> => {
      const formData = getFormData(props);
      return httpClient.post('/${urlParam}', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    create${capitalizedPlural}: ({
      ...props
    }: ${modelName}[]): Promise<HttpResponse<${modelName}> | void> =>
      httpClient.post('/${urlParam}', props),
    delete${modelName}: (id: ${modelName}['id']): Promise<HttpResponse<void> | void> =>
      httpClient.delete(\`/${urlParam}/\${id}\`),
    delete${capitalizedPlural}: (ids: ${modelName}['id'][]): Promise<HttpResponse<void> | void> =>
      httpClient.delete(\`/${urlParam}/\${ids.join(',')}\`),
    get${modelName}: (id: ${modelName}['id']): Promise<HttpResponse<${modelName}> | void> =>
      httpClient.get(\`/${urlParam}/\${id}\`),
    get${capitalizedPlural}: ({
      conditions,
      filters,
      limit,
      offset
    }: {
      conditions?: Condition[],
      filters?: Record<string, string>,
      limit?: number;
      offset?: number
    }): Promise<HttpResponse<${modelName}> | void> => 
      httpClient.get(\`/${urlParam}?\${filters ? stringify(filters) : ''}limit=\${limit}&offset=\${offset}\`),
    update${modelName}: (
      id: ${modelName}['id'],
      props: ${modelName},
    ): Promise<HttpResponse<${modelName}> | void> => {
      const formData = getFormData(props);
      return httpClient.put(\`/${urlParam}/\${id}\`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    update${capitalizedPlural}: (
      {
        ...props
      }: ${modelName}[],
    ): Promise<HttpResponse<${modelName}> | void> =>
      httpClient.put(\`/${urlParam}\`, props),
  };  
  `;
}
async function buildHttpClient({
  httpClientProjectName,
  modelsPath,
  path: projectPath,
  typesProjectName
}) {
  try {
    const APPLAB_CONFIG_PATH = path7.join(path7.resolve(), "./.applab/config.json");
    const APPLAB_CONFIG = await JSON.parse(await fs7.readFile(APPLAB_CONFIG_PATH, "utf8"));
    const APPLAB_DIRECTORY = ".applab";
    const MODELS_PATH = path7.join(path7.resolve(), APPLAB_DIRECTORY, `${modelsPath}/src`);
    const BUILD_PATH = path7.join(path7.resolve(), APPLAB_DIRECTORY, `${projectPath}/src`);
    const DIST_PATH = path7.join(path7.resolve(), APPLAB_DIRECTORY, `${projectPath}/dist`);
    await fs7.emptyDir(BUILD_PATH);
    await fs7.emptyDir(DIST_PATH);
    const files = await fs7.readdir(MODELS_PATH);
    for (const file of files) {
      if (file !== "index.ts") {
        const name = `${file.toLowerCase().replace(".ts", "")}Endpoints.ts`;
        const modelHttpClientEndpoints = getHttpClientEndpoints({
          modelName: file.replace(".ts", ""),
          httpClientProjectName,
          typesProjectName
        });
        await fs7.writeFile(path7.join(BUILD_PATH, name), modelHttpClientEndpoints, "utf8");
      }
    }
    const indexFileContent = constructHttpClientIndexScript({
      models: files.filter((f) => f !== "index.ts").map((file) => (0, import_pluralize3.default)(file.toLowerCase()).replace(".ts", "")),
      environments: APPLAB_CONFIG["core-api"].environments
    });
    await fs7.writeFile(path7.join(BUILD_PATH, "index.ts"), indexFileContent, "utf8");
    console.info("Finished building HTTP client");
  } catch (err) {
    console.error(err);
  }
}

// src/lib/build/index.ts
import { build as buildCommand } from "esbuild";
import ts from "typescript";
import fs8 from "fs-extra";
import path8 from "path";
async function build({
  buildDir = "dist",
  buildFile = "index.js",
  buildPath = "",
  buildTypes = false,
  bundle = false,
  bundleCSS = false,
  codeSplitting = false,
  color = true,
  define: define2 = {},
  excludeLibs = [],
  format = "esm",
  inputScripts = ["src/index.ts"],
  minify = true,
  platform = "browser",
  showWarnings = false,
  sourceMap = true,
  target = "es6",
  treeShaking = false
}) {
  try {
    console.info(`Compiling and bundling JS to ${format.toLocaleUpperCase()} format...`);
    const config = {
      bundle,
      color,
      define: define2,
      entryPoints: inputScripts.map((script) => buildPath ? `${buildPath ? `${buildPath}/` : ""}${script}` : `${script}`),
      external: excludeLibs,
      format,
      minify,
      outdir: codeSplitting ? `${buildPath ? `${buildPath}/` : ""}${buildDir}` : inputScripts.length > 1 ? `${buildPath ? `${buildPath}/` : ""}${buildDir}` : void 0,
      outfile: codeSplitting ? void 0 : inputScripts.length === 1 ? `${buildPath ? `${buildPath}/` : ""}${buildDir}/${buildFile}` : void 0,
      platform,
      sourcemap: sourceMap,
      splitting: codeSplitting,
      target,
      treeShaking
    };
    const result = await buildCommand(config);
    if (result.warnings && showWarnings) {
      result.warnings.forEach((warning) => {
        console.warn(warning.text);
      });
    }
    if (result.errors) {
      result.errors.forEach((error) => {
        console.error(error.text);
      });
    }
    if (buildTypes) {
      console.info("Compiling types... ");
      const tsConfig = await JSON.parse(fs8.readFileSync(path8.join(path8.resolve(), buildPath, "tsconfig.json"), "utf8"));
      const { options } = ts.parseJsonConfigFileContent(tsConfig, ts.sys, path8.join(path8.resolve(), buildPath));
      const buildFiles = (await fs8.readdir(path8.join(path8.resolve(), buildPath, "src"))).filter((f) => f.endsWith(".ts")).map((file) => {
        return path8.join(path8.resolve(), buildPath, "src", file);
      });
      const program = ts.createProgram(buildFiles, options);
      const emitResult = program.emit();
      let allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
      allDiagnostics.forEach((diagnostic) => {
        if (diagnostic.file) {
          let { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
          let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
          console.info(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        } else {
          console.info(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
}

// src/commands/models/build/index.ts
async function buildModels() {
  const config = await JSON.parse(await fs9.readFile(path9.join(path9.resolve(), path9.join("./.applab/config.json")), "utf8"));
  await cleanModels();
  await copyStubModels();
  await buildAppLabModels({ path: config.dependencies.models.path });
  await build({
    buildPath: `.applab/${config.dependencies.models.path}`,
    buildTypes: true,
    bundle: true,
    format: "esm",
    inputScripts: ["src/index.ts"],
    platform: "browser"
  });
  await buildModelTypes({ path: config.dependencies.types.path });
  await build({
    buildPath: `.applab/${config.dependencies.types.path}`,
    buildTypes: true,
    bundle: true,
    format: "esm",
    inputScripts: ["src/index.ts"],
    platform: "browser"
  });
  await buildSequelizeModels({ path: config.dependencies["sequelize-models"].path });
  await build({
    buildPath: `.applab/${config.dependencies["sequelize-models"].path}`,
    buildTypes: true,
    bundle: true,
    excludeLibs: ["sequelize"],
    format: "esm",
    inputScripts: ["src/index.ts"],
    platform: "node"
  });
  await buildHttpClient({ httpClientProjectName: config.dependencies["http-client"].repo, path: config.dependencies["http-client"].path, modelsPath: config.dependencies.models.path, typesProjectName: config.dependencies.types.repo });
  await build({
    buildPath: `.applab/${config.dependencies["http-client"].path}`,
    buildTypes: true,
    bundle: true,
    format: "esm",
    inputScripts: ["src/index.ts"],
    platform: "browser"
  });
  await buildReduxSlices({
    httpClientProjectName: config.dependencies["http-client"].repo,
    projectPath: config.dependencies["redux-state"].path,
    typesProjectName: config.dependencies["types"].repo
  });
  await build({
    buildPath: `.applab/${config.dependencies["redux-state"].path}`,
    buildTypes: true,
    bundle: true,
    format: "esm",
    inputScripts: ["src/index.ts"],
    platform: "browser"
  });
}

// src/commands/models/list.ts
import fs10 from "fs-extra";
import path10 from "path";
async function listModels() {
  const modelsPath = path10.join("models");
  const files = fs10.readdirSync(modelsPath).filter((file) => {
    return file.slice(-3) === ".ts" && file.split(".ts")[0] !== "index";
  });
  console.info(files.map((file) => file.split(".ts")[0]).toString());
}

// src/commands/models/index.ts
async function handleModelCommands(command) {
  await ensureCwdIsApplabProject();
  switch (command) {
    case "clean":
      await cleanModels();
      break;
    case "build":
      await buildModels();
      break;
    case "help":
      console.info("Available model commands are: build, list");
      break;
    case "list":
      await listModels();
      break;
    default:
      console.error("Unknown model command");
      cli.showHelp();
      break;
  }
}

// src/commands/build/index.ts
import path11 from "path";
import fs11 from "fs-extra";
async function handleBuildCommand(config) {
  if (Array.isArray(config)) {
    let buildDirs = [];
    for (const buildConfig of config) {
      if (!buildDirs.includes(buildConfig.buildDir)) {
        if (buildConfig.emptyBuildDir) {
          await fs11.emptyDir(path11.join(path11.resolve(), buildConfig.buildDir ?? "dist"));
        }
        buildDirs = [...buildDirs, buildConfig.buildDir];
      }
      await build(buildConfig);
    }
  } else {
    if (config.emptyBuildDir) {
      await fs11.emptyDir(path11.join(path11.resolve(), config.buildDir ?? "dist"));
    }
    await build(config);
  }
}

// src/lib/cli.ts
async function ensureCwdIsApplabProject() {
  const projectConfigFilePath = path12.join("./.applab/config.json");
  const isCwdProjectLevel = Boolean(await fs12.stat(projectConfigFilePath));
  if (!isCwdProjectLevel) {
    throw new Error("Please run this command from the AppLab project directory.");
  }
}
async function run({
  cliVersion,
  command,
  flags
}) {
  try {
    switch (command[0]) {
      case "build":
        const config = await fs12.readFile(path12.join(path12.resolve(), "applab.config.json"), "utf8");
        if (!config) {
          console.error('Missing config file "applab.config.json"');
        } else {
          try {
            const buildConfig = JSON.parse(config).build;
            await handleBuildCommand(buildConfig);
          } catch (err) {
            console.error('Error in config file "applab.config.json": ', err);
          }
        }
        break;
      case "models":
        await handleModelCommands(command[1]);
        break;
      case "dev":
        console.log("why hi here?");
        break;
      case "help":
        showHelp();
        break;
      default:
        console.error("Unknown command");
        cli.showHelp();
        break;
    }
  } catch (err) {
    console.log("err", err);
  }
}

// src/index.ts
var helpMessage = `
Usage
  $ applab <command>

Commands
  build-models - Build models into Sequelize models, Typescript definitions and JSON
  data - Commands related to building shared data types and models
  dev - Start Web/mobile apps in development mode.
  create-project - Create a new AppLab project repository
  release - Collect changes, bump and tag version, and deploy
  text - Runs tests
  update - Update SrcLaunch and AppLab dependencies

To get help for a specific command type help after the command name, for example:
  $ applab dev help
`;
var cli = meow(helpMessage, {
  flags: {},
  importMeta: import.meta
});
updateNotifier({ pkg: cli.pkg }).notify();
run({
  cliVersion: cli.pkg.version,
  command: cli.input,
  flags: cli.flags
});
export {
  cli,
  helpMessage
};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
//# sourceMappingURL=index.es.js.map
