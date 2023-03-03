// export interface ItrialState {
//     readonly ht: number,
//     readonly wi: number
// }
export enum enumControlColumnElement {
    ThreeControls,
    HWCreate,
    Instructions,
    ElementStiffness,
    NodeControl,
    Algebra,
    Console
}

export interface IButtonState{
    readonly visible: boolean,
}

export interface IToggleState{
    readonly visible: boolean,
    readonly on: boolean,
}

export interface IButtonBarState{
    // readonly gauss: IToggleState,
    // readonly globalStiffness: IToggleState,
    // readonly mesh: IToggleState,
    readonly help: IButtonState,
    readonly generate: IButtonState,
    readonly moveNodeMode: IToggleState,
    readonly centreSectionContent: string,
    readonly mesh3D: IToggleState
}

export interface IImmutabelState{
    readonly account: object
}

export interface IKeyValuePair{
    readonly id: number,
    readonly value: string,
}

export interface IKeyNumberPair{
    readonly id: number,
    readonly value: number,
}

export interface IFe3GSHead{
    readonly tl: string,
    readonly headers: IKeyValuePair[],
}

export interface IFe3GSRow{
    readonly label: string,
    readonly data: IKeyNumberPair[],
}

export interface IFe3GlobalStiffness{
    readonly head: IFe3GSHead,
    readonly rows: IFe3GSRow[],
}

export interface IFe3Gauss{
    readonly head: IFe3GSHead,
    readonly rows: IFe3GSRow[],
}

export interface IFe3MeshState{
    readonly nodes: IFe3NodeState[],
    readonly linkBars: IFe3LinkbarState[],
    readonly elements: IFe3ElementState[],
    readonly globalStiffness: IFe3GlobalStiffness,
    readonly gauss: IFe3Gauss,
    readonly height: number,
    readonly width: number,
    readonly stage: number,
    readonly flags: IFe3Flags
}

export interface IFe3Flags{
    readonly canGenerateMesh: boolean,
    readonly canShowGauss: boolean,
    readonly canShowGlobal: boolean,
    readonly canSubmitAlgebra: boolean,
    readonly canShowMoveNode: boolean,
    readonly canShowMesh3D: boolean
}

export interface IModelFlags{
    readonly newModelPending: boolean
}

export interface IFe3SelNode{
    readonly nodeID: number
}

export interface IFe3SelElement2{
    readonly elementID: number,
    readonly stiffnessMatrix: {
        node1:{nodenumber: number, n1: number, n2: number, n3:number},
        node2:{nodenumber: number, n1: number, n2: number, n3:number},
        node3:{nodenumber: number, n1: number, n2: number, n3:number},
    },
}

//Added Partial to allow an empty object
export interface IFe3SelElement extends Partial<IFe3SelElement2> {}

export interface IFe3LinkbarState{
    readonly node1ID: number,
    readonly node2ID: number,
    //readonly selected: boolean,
    readonly point1: I2Point,
    readonly point2: I2Point,
    readonly value1: number,
    readonly value2: number,
    readonly isBoundaryV: boolean,
    readonly isBoundaryH: boolean,
    //readonly val: number
}

export interface IFe3ElementState{
    readonly id: number,
    readonly node1ID: number,
    readonly node2ID: number,
    readonly node3ID: number,
    //readonly selected: boolean,
    readonly point1: I2Point,
    readonly point2: I2Point,
    readonly point3: I2Point,
    readonly value1: number,
    readonly value2: number,
    readonly value3: number,
}

export interface IFe3NodeState{
    readonly id: number,
    readonly val: number,
    readonly selected: boolean,
    readonly isBoundaryV: boolean,
    readonly isBoundaryH: boolean,
    readonly point1: I2Point
}

export interface IOpenHelp{
    readonly isOpen: boolean,
    readonly width: number
}

export interface ICollapsible{
    readonly visible: boolean,
    readonly height: number,
    readonly id: enumControlColumnElement
}

export interface IInstructions{
    readonly wrapper: ICollapsible,
    readonly content: IInstructionContent
}

export interface IBoundaryParams{
    readonly topax2: number,
    readonly topbx: number,
    readonly topc: number,
    readonly rhax2: number,
    readonly rhbx: number,
    readonly rhc: number,
    readonly botax2: number,
    readonly botbx: number,
    readonly botc: number,
    readonly lhax2: number,
    readonly lhbx: number,
    readonly lhc: number,
}



export interface IInstructionContent{
    readonly text: string
}

export interface IBoundary{
    readonly wrapper: ICollapsible,
    readonly content: IBoundaryContent
}

export interface IBoundaryContent{
    readonly text: string
}

export interface INodeControl{
    readonly wrapper: ICollapsible,
    readonly content: INodeControlContent
}

export interface INodeControlContent{
    readonly text: string
}

export interface IElementStiffness{
    readonly wrapper: ICollapsible,
    readonly content: IElementStiffnessContent
}

export interface IElementStiffnessContent{
    readonly text: string
}

export interface IConsoleDisplay{
    readonly wrapper: ICollapsible,
    readonly content: IConsoleContent
}

export interface IConsoleContent{
    readonly text: string
}

export interface IThreeControl{
    readonly wrapper: ICollapsible,
    readonly content: IThreeControlContent
}

export interface IThreeControlContent{
    readonly renderScale: number,
    readonly linkbarRadius: number,
    readonly nodeRadius: number,
    readonly elementDepth: number,
    readonly nodeColour: string,
    readonly nodeColourSelected: string,
    readonly nodeColourMoveable: string,
    readonly elementColour: string,
    readonly elementColourSelected: string,
    readonly linkbarColour: string
}

export interface IHWCreate{
    readonly wrapper: ICollapsible
}

export interface IControlColumn{
    readonly openControl: enumControlColumnElement
}

export interface IAppState {
//    readonly trialstate: ItrialState,
//    readonly hwState: IhwState,
    readonly fe3Mesh: IFe3MeshState,
    readonly modelFlags: IModelFlags,
    readonly selNode: IFe3SelNode,
    readonly selElement: IFe3SelElement,
    readonly buttons: IButtonBarState,
    readonly form,
    readonly algebraForm: IBoundaryParams,
    readonly instructions: IInstructions,
    readonly boundary: IBoundary,
    readonly nodeControl: INodeControl,
    readonly elementStiffness: IElementStiffness,
    readonly consoleDisplay: IConsoleDisplay,
    readonly threeControl: IThreeControl,
    readonly hwCreate: IHWCreate,
    readonly controlColumn: IControlColumn,
    readonly openHelp: IOpenHelp,
}

export interface I3Point{
    x: number;
    y: number;
    z: number;
}

export interface I2Point{
    x: number,
    y: number
}

export interface IThreeCube{
    id: number,
    point: I3Point
}