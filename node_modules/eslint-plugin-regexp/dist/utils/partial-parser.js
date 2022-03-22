"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialParser = void 0;
const refa_1 = require("refa");
function assertNever(value) {
    throw new Error(`Invalid value: ${value}`);
}
class Context {
    constructor(alternative) {
        this.alternative = alternative;
        const ancestors = new Set();
        for (let n = alternative; n; n = n.parent) {
            ancestors.add(n);
        }
        this.ancestors = ancestors;
    }
}
class PartialParser {
    constructor(parser, options = {}) {
        this.nativeCache = new WeakMap();
        this.parser = parser;
        this.options = options;
    }
    parse(node, alternative) {
        switch (node.type) {
            case "Pattern":
                return {
                    type: "Expression",
                    alternatives: this.parseAlternatives(node.alternatives, new Context(alternative)),
                };
            case "Alternative":
                return {
                    type: "Expression",
                    alternatives: [
                        this.parseAlternative(node, new Context(alternative)),
                    ],
                };
            default:
                return {
                    type: "Expression",
                    alternatives: [
                        {
                            type: "Concatenation",
                            elements: [
                                this.parseElement(node, new Context(alternative)),
                            ],
                        },
                    ],
                };
        }
    }
    parseAlternatives(alternatives, context) {
        const ancestor = alternatives.find((a) => context.ancestors.has(a));
        if (ancestor) {
            return [this.parseAlternative(ancestor, context)];
        }
        const result = [];
        for (const a of alternatives) {
            result.push(...this.parser.parseElement(a, this.options).expression
                .alternatives);
        }
        return result;
    }
    parseAlternative(alternative, context) {
        return {
            type: "Concatenation",
            elements: alternative.elements.map((e) => this.parseElement(e, context)),
        };
    }
    parseElement(element, context) {
        if (!context.ancestors.has(element)) {
            return this.nativeParseElement(element);
        }
        switch (element.type) {
            case "Assertion":
            case "Backreference":
            case "Character":
            case "CharacterSet":
                return this.nativeParseElement(element);
            case "CharacterClass":
                return this.parseCharacterClass(element, context);
            case "Group":
            case "CapturingGroup":
                return {
                    type: "Alternation",
                    alternatives: this.parseAlternatives(element.alternatives, context),
                };
            case "Quantifier": {
                const alternatives = element.element.type === "Group" ||
                    element.element.type === "CapturingGroup"
                    ? this.parseAlternatives(element.element.alternatives, context)
                    : [
                        {
                            type: "Concatenation",
                            elements: [
                                this.parseElement(element.element, context),
                            ],
                        },
                    ];
                return {
                    type: "Quantifier",
                    min: element.min,
                    max: element.max,
                    lazy: !element.greedy,
                    alternatives,
                };
            }
            default:
                throw assertNever(element);
        }
    }
    parseCharacterClass(cc, context) {
        if (cc.negate ||
            !context.ancestors.has(cc) ||
            context.alternative.type === "Alternative") {
            return this.nativeParseElement(cc);
        }
        if (context.alternative.type === "CharacterClassRange") {
            const range = {
                min: context.alternative.min.value,
                max: context.alternative.max.value,
            };
            return {
                type: "CharacterClass",
                characters: refa_1.JS.createCharSet([range], this.parser.ast.flags),
            };
        }
        return this.nativeParseElement(context.alternative);
    }
    nativeParseElement(element) {
        let cached = this.nativeCache.get(element);
        if (!cached) {
            cached = this.nativeParseElementUncached(element);
            this.nativeCache.set(element, cached);
        }
        return cached;
    }
    nativeParseElementUncached(element) {
        const { expression } = this.parser.parseElement(element, this.options);
        if (expression.alternatives.length === 1) {
            const elements = expression.alternatives[0].elements;
            if (elements.length === 1) {
                return elements[0];
            }
        }
        return {
            type: "Alternation",
            alternatives: expression.alternatives,
        };
    }
}
exports.PartialParser = PartialParser;
