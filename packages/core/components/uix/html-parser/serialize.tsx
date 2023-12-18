import escapeHtml from 'escape-html';
import { Text } from 'slate';

export const serialize = (node: any) => {
    if (Text.isText(node)) {
        let string = escapeHtml(node.text)
        if ((node as any).bold) {
            string = `<strong>${string}</strong>`
        }
        return string
    }

    const children = node.children.map(n => serialize(n)).join('');

    switch (node.type) {
        case 'paragraph':
            return `<p>${children}</p>`
        case 'link':
            return `<a href="${escapeHtml(node.url)}">${children}</a>`
        case 'block-quote':
            return `<blockquote>${children}</blockquote>`
        case 'bulleted-list':
            return `<ul>${children}</ul>`
        case 'heading-one':
            return `<h1>${children}</h1>`
        case 'heading-two':
            return `<h2>${children}</h2>`
        case 'list-item':
            return `<li>${children}</li>`
        case 'numbered-list':
            return `<ol>${children}</ol>`
        default:
            return children
    }
}
