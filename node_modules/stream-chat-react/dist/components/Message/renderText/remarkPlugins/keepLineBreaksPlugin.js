import { visit } from 'unist-util-visit';
import { u } from 'unist-builder';
const visitor = (node, index, parent) => {
    if (!(index && parent && node.position))
        return;
    const prevSibling = parent.children.at(index - 1);
    if (!prevSibling?.position)
        return;
    if (node.position.start.line === prevSibling.position.start.line)
        return;
    const ownStartLine = node.position.start.line;
    const prevEndLine = prevSibling.position.end.line;
    // the -1 is adjustment for the single line break into which multiple line breaks are converted
    const countTruncatedLineBreaks = ownStartLine - prevEndLine - 1;
    if (countTruncatedLineBreaks < 1)
        return;
    const lineBreaks = Array.from({ length: countTruncatedLineBreaks }, () => u('break', { tagName: 'br' }));
    parent.children = [
        ...parent.children.slice(0, index),
        ...lineBreaks,
        ...parent.children.slice(index),
    ];
    return;
};
const transform = (tree) => {
    visit(tree, visitor);
};
export const keepLineBreaksPlugin = () => transform;
