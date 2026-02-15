
import type { Parent, Data } from "unist";
import type { PhrasingContent, BlockContent } from "mdast";
// これは使っていないが、将来、markdown機能を拡張する際に必要になる可能性があるため、定義を残しておく
export interface ContainerNode extends Parent {
    type: "container";
    data?: Data & {
        hName?: string;
        hProperties?: Record<string, unknown>;
    };
    children: Array<BlockContent | PhrasingContent>;
}
declare module "mdast" {
    interface RootContentMap {
        container: import("./container-node").ContainerNode;
    }
}