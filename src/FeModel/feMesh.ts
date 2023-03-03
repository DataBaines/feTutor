
//package pack1;
import {FeNode} from './feNode'
import {FeElement} from './feElement'
import { Initialise2dArray } from '../grid2d';
import { IBoundaryParams, IFe3LinkbarState, IFe3SelElement } from '../Interfaces/IState';

export class FeMesh {
    
	//Class variables
	public static MAXNODES: number = 10;
    public static MAXLOOPS: number = 20;
    public nodes = [] ;	//err3 = new double[];//	w=new FeNode[101];	//Start at node[1] need 101
    public nodeBR: FeNode;
    public nodeBL: FeNode;
    public nodeTR: FeNode;
    public nodeTL: FeNode;	//Corner nodes
    private nodeXPerimeter = []; //err1 = new double[];// = newFeNode[2*(MAXNODES-2)];	//Perimeter nodes excluding corners
    private nodeYPerimeter = []; //err2 = new double[];// = newFeNode[2*(MAXNODES-2)];	//Perimeter nodes
    public  nodes2D: FeNode[][] = []; // 2D Array. = newFeNode[MAXNODES + 1][MAXNODES + 1];	//Start at nodetemp[0][0],[vert][hor]
    public  element: FeElement[] = []; //: Array<FeElement> = []; // = new Element[200];	//Start at element[1]
//    public  element = []; // = new Element[200];	//Start at element[1]
	private matrix: number[][] = []; // 2D Array.= new double[MAXNODES * MAXNODES][MAXNODES * MAXNODES]; //Start at matrix[0][0]
	//Array for logging the progress of Gauss Seidel converge for each iteration
	public tgauss: number[][] = []; // 2D Array.= new double[MAXNODES * MAXNODES][MAXLOOPS]; 
	private height: number;
	private width: number;
	private widthRatio: number;
	private elementQty: number;
	private nodeQty: number;
    private verNodes: number;
    private horNodes: number;
    private stage: number;
    private countX: number;
    private countY: number;
    private selectedElement: number;
    private selectedNode: number;
	// flag to determine if the nodes are numbered Up or across.
	private numUp: boolean;
	//boundary conditions
	private lef0: number; private lef1: number; private lef2: number;
	private rig0: number; private rig1: number; private rig2: number;
	private bot0: number; private bot1: number; private bot2: number;
    private top0: number; private top1: number; private top2: number;
	private gaussSuccess = 0;
	
    public constructor(w: number, h: number)
	{
		console.log("New FeMesh!")
		this.height = h;
		this.width = w;
		this.init2DArrays()
		this.initVars()
        this.createCornerNodes();
	}
	
	private initVars(){
		this.selectedElement = -1
		this.selectedNode = -1
		this.countX = 0
		this.countY = 0
	}

	private init2DArrays(){
		let i: number
		
		//this.nodes2D = new Array(FeMesh.MAXNODES + 1)
		this.nodes2D = [];
		this.nodes2D.length = FeMesh.MAXNODES + 1
		console.log(`nodes:` + this.nodes2D.length )
		for (i = 0; i < this.nodes2D.length; i++) {
			//this.nodes2D[i] = new Array(FeMesh.MAXNODES + 1);  //Start at nodetemp[0][0],[vert][hor]
			this.nodes2D[i] = []
			this.nodes2D[i].length = FeMesh.MAXNODES + 1
		}

		//this.matrix = new Array(FeMesh.MAXNODES * FeMesh.MAXNODES)
		this.matrix = Array(FeMesh.MAXNODES * FeMesh.MAXNODES)
		for (i = 0; i < this.matrix.length; i++) {
			this.matrix[i] = Array(FeMesh.MAXNODES * FeMesh.MAXNODES);  //Start at matrix[0][0]
		}

		this.tgauss = Array(FeMesh.MAXNODES * FeMesh.MAXNODES)
		for (i = 0; i < this.tgauss.length; i++) {
			this.tgauss[i] = Array(FeMesh.MAXLOOPS);  
		}
		
		this.element = Array(FeMesh.MAXNODES * FeMesh.MAXNODES * 2);
	}

	private createCornerNodes()
	{
		//set coordinates for each corner node
		this.nodeBL = new FeNode(0, 0, true, true);
		this.nodeBR = new FeNode(this.width, 0, true, true);
		this.nodeTL = new FeNode(0, this.height, true, true);
		this.nodeTR = new FeNode(this.width, this.height, true, true);
		this.stage = 1;
		this.horNodes=2;
		this.verNodes=2;
		this.sortXPerimeterNodes();
		this.sortYPerimeterNodes();
		this.assign1D(); //Added 28/12/21
	}

	generateMesh()
	{		

		this.sortXPerimeterNodes();
		this.sortYPerimeterNodes();
		this.calcElementQty();
		this.calcNodeQty();

		//Calculate width/height proportions of the mesh for display purposes
		this.widthRatio = this.width / this.height;

		this.createInnerNodes();
		
		// Always number the nodes across the shortest number of nodes to improve the band
		// of the global stiffness matrix.
		if(this.verNodes < this.horNodes) 
        this.numUp = true;
		else 
        this.numUp = false;

		this.assign1D();
		this.createElements();
		this.globalStiffness();
		this.stage = 2;
		this.selectedNode = 1;
	}

	public calcElementQty()
	{
		this.elementQty = (this.verNodes-1) * (this.horNodes-1) * 2;
	}

	public calcNodeQty()
	{
		this.nodeQty = this.verNodes * this.horNodes;
	}

	public createMultiplePerimeterNodes(xqty: number, yqty: number)
	{
		// Total number of sections on each axis 
		if(this.stage != 1 || xqty >= FeMesh.MAXNODES || yqty >= FeMesh.MAXNODES) {
			return;
		}
		
		const xsectionSize = this.width / xqty 
		const ysectionSize = this.height / yqty

		console.log("Multiple:" + xqty + " y section:" + ysectionSize)
		
		for (let i = 1; i < xqty; i++) {
			this.createPerimeterNodes("x", i * xsectionSize)
		}

		for (let j = 1; j < yqty; j++) {
			this.createPerimeterNodes("y", j * ysectionSize)
		}		
	}
	
	public createPerimeterNodes(axis: string, pos: number)
	{
		if (axis == 'x' && this.horNodes < FeMesh.MAXNODES) 
		{
			this.nodeXPerimeter[this.countX] = new FeNode(pos,0, false, true);
			this.countX++;
			this.nodeXPerimeter[this.countX] = new FeNode(pos, this.height, false, true);
			this.countX++;
			this.horNodes++;
		}
		if (axis == 'y' && this.verNodes < FeMesh.MAXNODES) 
		{
			this.nodeYPerimeter[this.countY] = new FeNode(0, pos, true, false);
			this.countY++;
			this.nodeYPerimeter[this.countY] = new FeNode(this.width, pos, true, false);			
			this.countY++;
			this.verNodes++;
		}
		this.sortXPerimeterNodes() //Added 08/04/20
		this.sortYPerimeterNodes()
		this.assign1D(); //Added 28/12/21
	}
	
	private sortXPerimeterNodes()
	{
        let lowVal: number;
        let prev: number = 0;
		let p: number = 0;
		let found: boolean;

		//Sort the perimeter nodes from the order they were clicked and created to
		//put them in a 2D array 
		for(let i: number=1; i < this.horNodes-1; i++) // first and last are corners, so ignore
		{
			lowVal = this.width;
			found = false;
			for(let j: number =0; j < this.countX; j=j+2) //Created in pairs
			{
				if( this.nodeXPerimeter[j].getX()<lowVal && this.nodeXPerimeter[j].getX()>prev)
				{
					lowVal = this.nodeXPerimeter[j].getX();
					p = j;
					found = true;
				}
			}
			if(found)
			{
				prev = this.nodeXPerimeter[p].getX();
				//Starts at [0][0], [v][h]
				this.nodes2D[0][i] = this.nodeXPerimeter[p];
				this.nodes2D[this.verNodes-1][i] = this.nodeXPerimeter[p+1];
			}
		}
		this.nodes2D[0][0] = this.nodeBL;
		this.nodes2D[this.verNodes-1][0] = this.nodeTL;
		this.nodes2D[0][this.horNodes-1] = this.nodeBR;
		this.nodes2D[this.verNodes-1][this.horNodes-1] = this.nodeTR;
	}
	
	private sortYPerimeterNodes()
	{
        let lowVal: number;
        let prev: number = 0;
		let p: number = 0;
		let found: boolean;

		for(let i:number=1; i<this.verNodes-1; i++)
		{
			lowVal = this.height;
			found = false;
			for(let j:number = 0; j < this.countY; j=j+2)
			{
				if( this.nodeYPerimeter[j].getY()<lowVal && this.nodeYPerimeter[j].getY()>prev)
				{
					lowVal = this.nodeYPerimeter[j].getY();
					p = j;
					found = true;
				}
			}
			if(found)
			{
				prev = this.nodeYPerimeter[p].getY();
				//Starts at [0][0], [v][h]
				this.nodes2D[i][0] = this.nodeYPerimeter[p];
				this.nodes2D[i][this.horNodes-1] = this.nodeYPerimeter[p+1];
			}
		}
	}
	
	private createInnerNodes()
	{
        let x: number;
        let y: number;
        let i: number;
        let j: number;

		for(i=1; i < this.verNodes-1; i++)
		{
			for(j=1; j < this.horNodes-1; j++)
			{
				//set coordinates for the central nodes
				x = this.nodes2D[0][j].getX();
				y = this.nodes2D[i][0].getY();
				this.nodes2D[i][j]= new FeNode(x, y, false, false);				
			}
		}	
	}
	
	private assign1D()
	{
		// Assign the 1D node array to the 2D array and give them numbers
		// Start with node 1
        let i: number;
        let j: number;        
        let count: number = 1;
		//console.log(`vertical:${this.verNodes} horizontal:${this.horNodes}`);

		if(!this.numUp)
		{
			for(i=0; i < this.verNodes; i++)
			{
				for(j=0; j < this.horNodes; j++)
				{
					//set single index node array up
					// Number across from BL
					this.nodes[count] = this.nodes2D[i][j];
					this.nodes[count].setId(count);
					//console.log(`numleft - assign1D. - i:${i} j:${j} count:${count}`);
					this.nodes2D[i][j].setColRow(j,i);
					count++;
				}
			}
		}
		else
		{
			for(i=0; i < this.horNodes; i++)
			{
				for(j=0; j < this.verNodes; j++)
				{
					//set single index node array up
					// Number up from BL
					this.nodes[count] = this.nodes2D[j][i];
					this.nodes[count].setId(count);
					//console.log(`numup - assign1D. - i:${i} j:${j} count:${count}`);
					this.nodes2D[j][i].setColRow(i,j);
					count++;
				}
			}
		}
	}

	private createElements()
	{
		let elNo: number;

		//CCW round the element with the rightangle being node2 (middle one). Referenced from BL corner
		for(let i: number = 0; i < this.verNodes-1; i++)
		{
			for(let j:number = 0; j < this.horNodes-1; j++)
			{
				elNo = (i*2*(this.horNodes-1))+(j*2)+1;
				this.element[elNo] = new FeElement(elNo, this.nodes2D[i][j], this.nodes2D[i][j+1], this.nodes2D[i+1][j+1]);
				this.element[elNo+1] = new FeElement(elNo + 1, this.nodes2D[i+1][j+1], this.nodes2D[i+1][j], this.nodes2D[i][j]);
			}
		}
	}

	public resetInnerNodeValues()
	{
		for(let i: number = 1; i<this.verNodes-1; i++)
		{
			for(let j: number = 1; j < this.horNodes-1; j++)
			{
				this.nodes2D[i][j].presetValue();
			}
		}
	}
	
	public moveInnerNode(nodeID: number, x: number, y:number) {
		console.log(`femesh.moveInnerNode new: ${nodeID}, x: ${x}  y: ${y}`)
		console.log(`femesh.moveInnerNode old x: ${this.nodes[nodeID].getX()},  y: ${this.nodes[nodeID].getY()}`)
		this.nodes[nodeID].setPos(x, y)
		this.globalStiffness()
	}

	/* Create the global stiffness matrix */
	public globalStiffness()
	{
		// Create the global stiffness matrix
		let node1: FeNode;
		let node2: FeNode;
		let node3: FeNode;
        let n1Ind: number;
        let n2Ind: number;
        let n3Ind: number;
        let i: number;
        let j: number;
        let n: number = this.getNodeQty();
        let sum: number = 0;

		//Clear the matrix values
		for(i=0;i<n;i++)
		{
			for(j=0;j<n;j++)
			{  
					this.matrix[i][j]=0;
			}
		}
		for(i=0; i<this.elementQty; i++)
		{
			this.element[i+1].calcStiffness();
			sum = sum + this.element[i+1].getArea();
//			System.out.println("Summed area= " + sum);
			node1 = this.nodes[this.element[i+1].getN1No()];
			node2 = this.nodes[this.element[i+1].getN2No()];
			node3 = this.nodes[this.element[i+1].getN3No()];
			n1Ind = node1.getId()-1;
			n2Ind = node2.getId()-1;
			n3Ind = node3.getId()-1;
			// Accumulate the stiffness matrices of each element into the global
			this.matrix[n1Ind][n1Ind] += this.element[i+1].stiffnessMatrix[0][0];
			this.matrix[n1Ind][n2Ind] += this.element[i+1].stiffnessMatrix[0][1];
			this.matrix[n1Ind][n3Ind] += this.element[i+1].stiffnessMatrix[0][2];
			this.matrix[n2Ind][n1Ind] += this.element[i+1].stiffnessMatrix[1][0];
			this.matrix[n2Ind][n2Ind] += this.element[i+1].stiffnessMatrix[1][1];
			this.matrix[n2Ind][n3Ind] += this.element[i+1].stiffnessMatrix[1][2];
			this.matrix[n3Ind][n1Ind] += this.element[i+1].stiffnessMatrix[2][0];
			this.matrix[n3Ind][n2Ind] += this.element[i+1].stiffnessMatrix[2][1];
			this.matrix[n3Ind][n3Ind] += this.element[i+1].stiffnessMatrix[2][2];
		}
	}

	/**
	 * Find the max or min node value
	 * @param isMax
	 * @return
	 */
	public getMaxMinNodeValue(isMax: boolean)
	{
        let i: number;
        let j: number;
        let x: number = 0;
        let max: number = -999999;
        let min: number = 999999;

		for(i=0; i<this.verNodes; i++)
		{
			for(j=0; j<this.horNodes; j++)
			{
				x = this.nodes2D[i][j].getValue();

				if(x > max)	max = x;

				if(x < min)	min = x;
			}
		}			
		
		if(isMax)
			return max;
		
		return min;
	}
	
	getElQty = () => this.elementQty
	// {
	// 	return this.elementQty;
	// }

	getNodeQty()
	{
		return this.nodeQty;
	}

	getHNodes()
	{
		return this.horNodes;
	}

	getVNodes()
	{
		return this.verNodes;
	}

	getRatio()
	{
		return this.widthRatio;
	}

	getHeight()
	{
		return this.height;
	}

	getWidth()
	{
		return this.width;
	}
	
	getStage()
	{
		return this.stage;
	}

	// getPerNodeX(i: number, n: number)
	// {
	// 	if(i <= this.countX)
	// 	{
	// 		n = this.nodeXPerimeter[i];
	// 	}
	// }

	getPerNodeX(i: number)
	{
		return this.nodeXPerimeter[i];
	}

	getPerNodeY(i: number)
	{
		return this.nodeYPerimeter[i];
	}
	
	getCountX()
	{
		return this.countX;
	}
	
	getCountY()
	{
		return this.countY;
	}

	getSelEl()
	{
		return this.selectedElement;
	}

	/**
	 * Get the node number of the selected node (1 to max)
	 * @param i
	 */
	getSelNode()
	{
		return this.selectedNode;
	}

	/**
	 * Returns the last column (zero based) to settle on a value from the Gauss Seidel iterations
	 *
	 * @return {number} last settling column.
	 */
	private getGaussPlateau() {

		let row: number
		let col: number
		let thisVal: string
		let prevVal: string
		let maxIter = 1

		for(row=0; row < this.nodeQty; row++) {

			for(col=maxIter; col < FeMesh.MAXLOOPS; col++) {
				if(!this.tgauss[row][col]){ break } //No more data

				thisVal = this.tgauss[row][col].toPrecision(3)
				prevVal = this.tgauss[row][col-1].toPrecision(3)

				if(thisVal === prevVal){
					maxIter = col
					break
				}

			}

			const node=row + 1
			console.log("Gauss Plateau after node:"+ node +" is:" + maxIter)
		}

		return maxIter
	}

	private getThreeGaussHead(lastCol: number){
		let rowData = []
		let i: number

		for(i=1; i <= lastCol; i++) {
			rowData.push({
				id: i,
				value: i})
		}

		return {
			tl: "Iterations",
			headers: rowData,
		}
	}

	private getThreeGaussRow(ind: number, lastCol: number){
		let rowData = []
		let i: number
		let nodeNo: number =  ind + 1

		for(i=0; i < lastCol; i++) {
			rowData.push({
				id: i, 
				value: this.tgauss[ind][i]})
		}

		return {
			label: "N:"+ nodeNo,
			data: rowData
		}
	}

	private buildThreeGaussObject() {
		let rows = []
		let i: number
		const lastSettlingGauss = this.getGaussPlateau()

		for(i=0; i<this.nodeQty; i++) {
			rows.push(this.getThreeGaussRow(i, lastSettlingGauss))
		}

		return{
			head: this.getThreeGaussHead(lastSettlingGauss), 
			rows: rows,
		}
	}

	public GetThreeGauss(){
		switch (this.stage) {
			case 1:
			case 2:
				return {}
				break;
			case 3:
				return this.gaussSuccess > 0 ? this.buildThreeGaussObject() : {}
				break;
			default:
				break;
		}
	}

	private getThreeGlobalStiffnessHead(){
		let rowData = []
		let i: number

		for(i=1; i<=this.nodeQty; i++) {
			rowData.push({
				id: i,
				value: "N:"+ i})
		}
		return {
			tl: "Nodes",
			headers: rowData,
		}
	}

	private getThreeGlobalStiffnessRow(ind: number){
		let rowData = []
		let i: number
		let nodeNo: number =  ind + 1

		for(i=0; i<this.nodeQty; i++) {
			rowData.push({
				id: i, 
				value: this.matrix[ind][i]})
		}

		return {
			label: "N:"+ nodeNo,
			data: rowData
		}
	}

	private buildThreeGlobalStiffnessObject() {
		let rows = []
		let i: number

		for(i=0; i<this.nodeQty; i++) {
			rows.push(this.getThreeGlobalStiffnessRow(i))
		}

		return{
			head: this.getThreeGlobalStiffnessHead(), 
			rows: rows,
		}
	}

	public GetThreeGlobalStiffness(){
		switch (this.stage) {
			case 1:
			case 2:
				return {}
				break;
			case 3:
				return this.buildThreeGlobalStiffnessObject()
				break;
			default:
				break;
		}
	}

	public getThreeNodes(){
		switch (this.stage) {
			case 1:
				return this.getThreePerimeterNodes()
				break;
			case 2:
			case 3:
				return this.getThreeFilledNodes()
				break;
			default:
				break;
		}
	}

	public getThreeElements(){
		let allElements = []
		let elq = this.getElQty()

		for (let i = 1; i < elq + 1; i++) {
			const elem = this.element[i];
			//elem.setId(count++)
			allElements.push(this.element[i].getThreeElementObject())
		}

		return allElements
	}

	public getThreeLinkbars(){
		
		switch (this.stage) {
			case 1:
				return this.getThreePerimeterLinkbars()
				break;
			case 2:
			case 3:
				return this.getThreeFilledLinkbars()
				break;		
			default:
				break;
		}
	}

	public getThreeElementStiffness(elementID: number): IFe3SelElement{
		const element = this.element[elementID]

		switch (this.stage) {
			case 1:
				return {}
				break;
			case 2:
			case 3:
				return element.getThreeElementStiffness()
				break;		
			default:
				break;
		}
	}

	private getThreePerimeterNodes(){
		let allnodes = []
		let count = 0
		// this.nodeBL.setId(count++)
		allnodes.push(this.nodeBL.getThreeObject())
		// this.nodeBR.setId(count++)
		allnodes.push(this.nodeBR.getThreeObject())
		// this.nodeTR.setId(count++)
		allnodes.push(this.nodeTR.getThreeObject())
		// this.nodeTL.setId(count++)
		allnodes.push(this.nodeTL.getThreeObject())	

		for (let i = 0; i < this.countX; i++) {
			const node = this.nodeXPerimeter[i];
			// node.setId(count++)
			allnodes.push(node.getThreeObject())
		}

		for (let i = 0; i < this.countY; i++) {
			const node = this.nodeYPerimeter[i];
			// node.setId(count++)
			allnodes.push(node.getThreeObject())
		}

		//console.log("nodes:" + allnodes)
		return allnodes
	}

	private getThreeFilledNodes(){
		let allnodes = []
		let count = 0
		let i, j

		for(i=0; i < this.verNodes; i++)
		{
			for(j=0; j < this.horNodes; j++)
			{
				const node = this.nodes2D[i][j];
				// node.setId(count++)
				allnodes.push(node.getThreeObject())	
			}
		}

		return allnodes
	}

	private getThreePerimeterLinkbars()	{
        let i: number;
		let allLinkbars = []
		let node1: FeNode
		let node2: FeNode
		let json: object

		for(i=0; i < this.verNodes-1; i++)
		{
			//LHS
			node1 = this.nodes2D[i][0]
			node2 = this.nodes2D[i+1][0]
			json = this.buildThreeLinkbarObject(node1, node2, true, false)
			allLinkbars.push(json)	

			//RHS
			node1 = this.nodes2D[i][this.horNodes-1]
			node2 = this.nodes2D[i+1][this.horNodes-1]
			json = this.buildThreeLinkbarObject(node1, node2, true, false)
			allLinkbars.push(json)	
		}	

		for(i=0; i < this.horNodes-1; i++)
		{
			//Bottom
			node1 = this.nodes2D[0][i]
			node2 = this.nodes2D[0][i+1]
			json = this.buildThreeLinkbarObject(node1, node2, false, true)
			allLinkbars.push(json)	

			//Top
			node1 = this.nodes2D[this.verNodes-1][i]
			node2 = this.nodes2D[this.verNodes-1][i+1]
			json = this.buildThreeLinkbarObject(node1, node2, false, true)
			allLinkbars.push(json)	
		}	

		return allLinkbars
	}

	private isHorBoundary(horIndex: number) {
		return (horIndex === 0 || horIndex === this.horNodes - 1)
	}

	private isVerBoundary(horIndex: number) {
		return (horIndex === 0 || horIndex === this.horNodes - 1)
	}
	
	private getThreeFilledLinkbars()	{
        let i: number, j: number;
		let allLinkbars = []
		let node1: FeNode, node2: FeNode
		let json: IFe3LinkbarState

		for(i=0; i < this.horNodes; i++)
		{
			for(j=0; j < this.verNodes; j++)
			{
				node1 = this.nodes2D[j][i]

				//right
				if(i < this.horNodes -1){
					node2 = this.nodes2D[j][i+1]
					json = this.buildThreeLinkbarObject(node1, node2, false, this.isHorBoundary(j))
					allLinkbars.push(json)	
				}

				//above
				if(j < this.verNodes -1){
					node2 = this.nodes2D[j+1][i]
					json = this.buildThreeLinkbarObject(node1, node2, this.isVerBoundary(i), false)
					allLinkbars.push(json)	
				}

				//right/above diagonal
				if(i < this.horNodes -1 && j < this.verNodes -1){
					node2 = this.nodes2D[j+1][i+1]
					json = this.buildThreeLinkbarObject(node1, node2, false, false)
					allLinkbars.push(json)	
				}
			}
		}	

		return allLinkbars
	}

	private buildThreeLinkbarObject(n1: FeNode, n2: FeNode, isBV, isBH) {
		return{
			node1ID: n1.getId(),
			node2ID: n2.getId(),
			point1: {x: n1.getX(),	y: n1.getY()},
			point2: {x: n2.getX(),	y: n2.getY()},
			value1: n1.getValue(),
			value2: n2.getValue(),
			isBoundaryV: isBV,
			isBoundaryH: isBH
		}
	}

	setSelEl(i: number) {this.selectedElement = i;}

	/**
	 * Set the node number of the selected node (1 to max)
	 * @param i
	 */
	setSelNode(i: number)
	{
		this.selectedNode = i;
	}

	perimeterValuesEntered()
	{
        let i: number;
        let j: number;
        let ok: boolean;

		// Check Left, right, bottom, top perimeters
		for(i=0; i < this.verNodes; i++)
		{
			if(!this.nodes2D[i][0].hasVal()) 
				ok=false;
			if(!this.nodes2D[i][this.horNodes].hasVal()) 
				ok=false;
		}	
		for(j=0; j < this.horNodes; j++)
		{
			if(!this.nodes2D[0][j].hasVal()) 
				ok=false;
			if(!this.nodes2D[this.verNodes][j].hasVal()) 
				ok=false;
		}
		return ok;
	}

	onVerticalPerimeter(num: number)
	{
		let flag: boolean = false;

		if(this.numUp)
		{
			if(num<=this.verNodes || num>(this.verNodes*(this.horNodes-1)))
				flag=true;
		}
		else
		{
            
			if(num % this.horNodes ==0 || num % this.horNodes ==1)
				flag=true;
		}
		return flag;
	}

	onHorizontalPerimeter(num: number)
	{
        let flag: boolean = false;

		if(this.numUp)
		{
			if(num % this.verNodes ==0 || num % this.verNodes ==1)
				flag=true;
		}
		else
		{
			if(num <= this.horNodes || num > (this.horNodes*(this.verNodes-1)))
				flag=true;
		}
		return flag;
	}

	public setBoundary(b: IBoundaryParams)
	{
		//set the boundary condition for the four edges
		this.top0 = b.topax2; this.top1 = b.topbx; this.top2 = b.topc;
		this.rig0 = b.rhax2; this.rig1 = b.rhbx; this.rig2 = b.rhc;
		this.bot0 = b.botax2; this.bot1 = b.botbx; this.bot2 = b.botc;
		this.lef0 = b.lhax2; this.lef1 = b.lhbx; this.lef2 = b.lhc;
		this.evalBoundary();
		this.resetInnerNodeValues();
		this.gaussSuccess = this.gaussSeidel();
		console.log ("GaussSuccess:" + this.gaussSuccess)
		this.stage=3;
	}

	/***************************
	 * Use the Boundary condition formula to set the boundary values
	 */
	private evalBoundary()
	{
        let x: number;
	    let y: number;
        let res: number;
        
		for(let i: number = 0; i<this.verNodes; i++)
		{
			// left side
			y = this.nodes2D[i][0].getY();
			res = this.evalPoint(y, this.lef0, this.lef1, this.lef2);
			this.nodes2D[i][0].setValue(res);
			
			// right side
			y = this.nodes2D[i][this.horNodes-1].getY();
			res = this.evalPoint(y, this.rig0, this.rig1, this.rig2);
			this.nodes2D[i][this.horNodes-1].setValue(res);
		}
		for(let j: number = 1; j < this.horNodes-1; j++)
		{
			// bottom side
			x = this.nodes2D[0][j].getX();
			res = this.evalPoint(x, this.bot0, this.bot1, this.bot2);
			this.nodes2D[0][j].setValue(res);
			
			// top side
			x = this.nodes2D[this.verNodes-1][j].getX();
			res = this.evalPoint(x, this.top0, this.top1, this.top2);
			this.nodes2D[this.verNodes-1][j].setValue(res);
		}
	}

	evalPoint(val: number, cons: number, pwr1: number, pwr2: number)
	{
		return (val * val * pwr2) + (val * pwr1) + cons;
	}

	gaussSeidel()
	{ 
		let s: number = 0;
		let x: number[] = new Array(FeMesh.MAXNODES * FeMesh.MAXNODES); // = new double[100];
		let i: number = 0;
		let j: number = 0;
		let k: number = 12;
		let n: number = 0;
		let loop: number = 0;

		n = this.getNodeQty();

		//check for a strong banding (diagnonal dominance) 
		//of the global stiffness matrix		
		for(i=0; i<n; i++)
		{
			//Check that the central band [i][i] is not < the sum of
			// the rest of the row
			for(j=0; j<n; j++)
			{  
				if(i!=j)
				{  
					s+=Math.abs(this.matrix[i][j]);
				}
			}
//			System.out.println(" mat=" + Math.abs(matrix[i][i]) + " s " + s);
			if(Math.abs(this.matrix[i][i]) < (s*0.75))
				k=0;
			s=0;
        }
		//Will not converge
		if(k!=12)
		{  
			return 0;
		}
		// Will converge and solve
		if(k==12)
		{  
			for(i=0; i<n; i++)
			{
				x[i]=0;
				if(this.nodes[i+1].hasVal())
				{
					x[i] = this.nodes[i+1].getValue();
				}
			}
			do
			{
				for(i=0; i<n; i++)
				{	
					if(!this.nodes[i+1].hasVal())
					{
						x[i]=0;  //Laplace equation
                    	for(j=0; j<n; j++)
						{
							if(i!=j)
							{
								if(this.nodes[j+1].hasVal())
								{
									x[i]-=(this.matrix[i][j] * this.nodes[j+1].getValue());
								}
								else
								{
									x[i]-=(this.matrix[i][j] * x[j]);									
								}
							}
						}
						x[i]=x[i] / this.matrix[i][i];
					}
				}
				for(i=0; i<n; i++)
				{
					this.tgauss[i][loop]= x[i];
				}
				loop++;
        	}while(loop < FeMesh.MAXLOOPS);
        }
        for(i=0;i<n;i++)	
            this.nodes[i+1].setValue(x[i]);

		return 1;
	}
/*
*   GAUSS-SEIDEL ITERATAIVE TECHNIQUE ALGORITHM 7.2
*
*   To solve Ax = b given an initial approximation x(0).
*
*   INPUT:   the number of equations and unknowns n; the entries
*            A(I,J), 1<=I, J<=n, of the matrix A; the entries
*            B(I), 1<=I<=n, of the inhomogeneous term b; the
*            entries XO(I), 1<=I<=n, of x(0); tolerance TOL;
*            maximum number of iterations N.
*
*    OUTPUT: the approximate solution X(1),...,X(n) or a message
*            that the number of iterations was exceeded.
*/


}
