import { remark } from "remark";
import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root, Element, RootContent, ElementContent } from "hast";

import remarkRehype from "remark-rehype";
import rehypeExternalLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";

export async function convertMarkdownToHtml(markdownString: string): Promise<string> {
    const processedContent = await remark()
        .use(remarkRehype) // Markdown → HTML AST に変換
        .use(rehypeExternalLinks, {
            target: "_blank",
            rel: ["nofollow", "noopener", "noreferrer"]
        })
        .use(rehyperh3Decorate) // h3をデコレート
        .use(rehyperImageWithCaption) // 画像にキャプションを追加
        .use(rehypeStringify) // HTML AST → HTML文字列に変換
        .process(markdownString);

    return processedContent.toString();
}
export async function convertMarkdownToHtmlWithSectionize(markdownString: string): Promise<string> {
    const processedContent = await remark()
        .use(remarkRehype) // Markdown → HTML AST に変換
        .use(rehypeExternalLinks, {
            target: "_blank",
            rel: ["nofollow", "noopener", "noreferrer"]
        })
        .use(rehyperh3Decorate) // h3をデコレート
        .use(rehyperImageWithCaption) // 画像にキャプションを追加
        .use(rehypeSectionize) // セクション分割
        .use(rehypeStringify) // HTML AST → HTML文字列に変換
        .process(markdownString);

    return processedContent.toString();
}
const rehyperh3Decorate: Plugin<[], Root> = () => {
    return (tree) => {
        visit(tree, 'element', (node) => {
            if (node.tagName !== 'h3') return;
            
            node.properties = {
                ...node.properties,
                className: ["my-2", "p-1", "border-l-4", "border-primary", "pl-2"]
            };
        })
    }
}
const rehyperImageWithCaption: Plugin<[], Root> = () => {
    return (tree) => {
        visit(tree, 'element', (node, index, parent) => {
            if (!parent || typeof index !== 'number') return;
            if (node.tagName !== 'img') return

            const alt = (node.properties?.alt as string) || '';

            const wrapper: Element = {
                type: "element", 
                tagName: "div",
                properties: {className: ["max-w-3/4", " mx-auto","not-prose", "my-4", "p-4", "bg-white", "shadow-sm", "rounded-md"]},
                children: [
                    {
                        type: "element",
                        tagName: "img",
                        properties: {
                            ...node.properties,
                            className: ["mb-0"]
                        },
                        children: []
                    },
                    alt ? {
                        type: "element",
                        tagName: "p",
                        properties: {className: ["mt-1 mb-0 text-center"]},
                        children: [{type: "text", value: alt}]
                    } : {type: "text", value: ""}
                ]
            }
            parent.children[index] = wrapper;
        })
    }
}
let sectionIndex = 0;

const rehypeSectionize: Plugin<[], Root> = () => {
    return (tree) => {
        const newChildren: RootContent[] = [];
        let currentSectionChildren: ElementContent[] = [];

        const pushSection = () => {
            const isEven = sectionIndex % 2 === 0; // 偶数なら true

            const bgClass = isEven ? "bg-gray-50" : "bg-blue-50";

            newChildren.push({
                type: "element",
                tagName: "section",
                properties: {
                    className: [
                        "w-screen",
                        "relative",
                        "left-1/2",
                        "right-1/2",
                        "ml-[-50vw]",
                        "mr-[-50vw]",
                        bgClass,
                    ],
                },
                children: [
                    {
                        type: "element",
                        tagName: "div",
                        properties: {
                            className: ["max-w-4xl", "mx-auto", "px-4", "py-1"],
                        },
                        children: currentSectionChildren,
                    },
                ],
            });

            sectionIndex++;
        };

        for (const node of tree.children) {
            if (node.type === "element" && node.tagName === "hr") {
                if (currentSectionChildren.length > 0) {
                    pushSection();
                    currentSectionChildren = [];
                }
            } else {
                if (node.type !== "doctype") {
                    currentSectionChildren.push(node);
                }
            }
        }

        // 最後に残った section を追加
        if (currentSectionChildren.length > 0) {
            pushSection();
        }

        tree.children = newChildren;
    };
};
