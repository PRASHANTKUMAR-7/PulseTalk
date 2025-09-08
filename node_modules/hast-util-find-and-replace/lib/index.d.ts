/**
 * Find patterns in a tree and replace them.
 *
 * The algorithm searches the tree in *preorder* for complete values in `Text`
 * nodes.
 * Partial matches are not supported.
 *
 * @param {Nodes} tree
 *   Tree to change.
 * @param {FindAndReplaceList | FindAndReplaceTuple} list
 *   One or more find-and-replace pairs.
 * @param {Readonly<Options> | null | undefined} [options]
 *   Configuration (when `find` is not `Find`).
 * @returns {undefined}
 *   Nothing.
 */
export function findAndReplace(tree: Nodes, list: FindAndReplaceList | FindAndReplaceTuple, options?: Readonly<Options> | null | undefined): undefined;
/**
 * Default tag names to ignore.
 *
 * The defaults are `math`, `script`, `style`, `svg`, and `title`.
 *
 * @type {Array<string>}
 */
export const defaultIgnore: Array<string>;
export type Nodes = import('hast').Nodes;
export type Parents = import('hast').Parents;
export type Root = import('hast').Root;
export type RootContent = import('hast').RootContent;
export type Text = import('hast').Text;
export type Test = import('hast-util-is-element').Test;
export type VisitorResult = import('unist-util-visit-parents').VisitorResult;
/**
 * Pattern to find.
 *
 * Strings are escaped and then turned into global expressions.
 */
export type Find = RegExp | string;
/**
 * Several find and replaces, in array form.
 */
export type FindAndReplaceList = Array<[Find, Replace?]>;
/**
 * Find and replace in tuple form.
 */
export type FindAndReplaceTuple = [Find, Replace?];
/**
 * Info on the match.
 */
export type RegExpMatchObject = {
    /**
     *   The index of the search at which the result was found.
     */
    index: number;
    /**
     *   A copy of the search string in the text node.
     */
    input: string;
    /**
     *   All ancestors of the text node, where the last node is the text itself.
     */
    stack: [...Array<Parents>, Text];
};
/**
 * Thing to replace with.
 */
export type Replace = ReplaceFunction | string | null | undefined;
/**
 * Callback called when a search matches.
 */
export type ReplaceFunction = (...parameters: any[]) => Array<RootContent> | RootContent | string | false | null | undefined;
/**
 * Normalized find and replace.
 */
export type Pair = [RegExp, ReplaceFunction];
/**
 * All find and replaced.
 */
export type Pairs = Array<[RegExp, ReplaceFunction]>;
/**
 * Configuration.
 */
export type Options = {
    /**
     * Test for which elements to ignore (optional).
     */
    ignore?: Test | null | undefined;
};
