import { visit } from 'unist-util-visit';
const visitor = (node) => {
    if (node.type !== 'html')
        return;
    node.type = 'text';
};
const transform = (tree) => {
    visit(tree, visitor);
};
export const htmlToTextPlugin = () => transform;
