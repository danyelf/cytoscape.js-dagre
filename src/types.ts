import { AnimatedLayoutOptions, BaseLayoutOptions, BoundingBox12, BoundingBoxWH, EdgeSingular, NodeSingular, Position, Singular } from "cytoscape";

export enum RankDir {
    TOP_BOTTOM = 'TB',
    LEFT_RIGHT = 'LR'
}

export enum RankNodeAlignment {
    UP_LEFT = 'UL',
    UP_RIGHT = 'UR',
    DOWN_LEFT = 'DL',
    DOWN_RIGHT = 'DR'
}

type SortFunction<T extends Singular> = (a: T, b: T) => number


export type DagreOptions = BaseLayoutOptions | AnimatedLayoutOptions | {

    // dagre algo options, uses default value on undefined
    nodeSep?: number, // the separation between adjacent nodes in the same rank
    edgeSep?: number, // the separation between adjacent edges in the same rank
    rankSep?: number, // the separation between adjacent nodes in the same rank
    rankDir?: RankDir, // 'TB' for top to bottom flow, 'LR' for left to right,
    align?: RankNodeAlignment,  // alignment for rank nodes. Can be 'UL', 'UR', 'DL', or 'DR', where U = up, D = down, L = left, and R = right
    acyclicer?: 'greedy' | undefined, // If set to 'greedy', uses a greedy heuristic for finding a feedback arc set for a graph.
    // A feedback arc set is a set of edges that can be removed to make a graph acyclic.
    ranker?: 'network-simplex' | 'tight-tree' | 'longest-path', // Type of algorithm to assigns a rank to each node in the input graph.
    // Possible values: network-simplex, tight-tree or longest-path
    minLen?: (e: EdgeSingular) => number, // number of ranks to keep between the source and target of the edge
    edgeWeight?: (e: EdgeSingular) => number, // higher weight edges are generally made shorter and straighter than lower weight edges

    // general layout options
    fit?: boolean, // whether to fit to viewport
    padding?: number, // fit padding
    spacingFactor?: number, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
    nodeDimensionsIncludeLabels?: boolean, // whether labels should be included in determining the space used by a node
    boundingBox?: undefined | BoundingBox12 | BoundingBoxWH, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    transform: (node: NodeSingular, pos: Position) => Position, // a function that applies a transform to the final node position
    sort?: SortFunction<Singular>, // a sorting function to order the nodes and edges; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
    // because cytoscape dagre creates a directed graph, and directed graphs use the node order as a tie breaker when
    // defining the topology of a graph, this sort function can help ensure the correct order of the nodes/edges.
    // this feature is most useful when adding and removing the same nodes and edges multiple times in a graph.
};

