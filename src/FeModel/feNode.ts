
export class FeNode {
    private posX: number;
    private posY: number;
    private num: number;
    private valu: number;
    private hasValue: boolean;
    private row: number;
    private column: number;
	private isBoundaryH: boolean;
	private isBoundaryV: boolean;


    constructor (x: number, y: number, isBoundV: boolean, isBoundH: boolean,) {
		this.posX = x;
		this.posY = y;
		this.hasValue = false;
		this.isBoundaryH = isBoundH;
		this.isBoundaryV = isBoundV;
		this.presetValue();
    }
    
    setValue(v: number)
	{
		this.valu = v;
		this.hasValue = true;
	}

	presetValue()
	{
		this.valu = 0; //from-1
		this.hasValue = false;
	}

	setId(n: number)
	{
		this.num = n;
	}

	getId()
	{
		return this.num;
	}

	getValue()
	{
		return this.valu;
	}

	getX()
	{
		return this.posX;
	}

	getY()
	{
		return this.posY;
	}

	setPos(x: number, y: number)
	{
		this.posX = x;
		this.posY = y;
	}

	getColumn() 
	{
		return this.column;
	}

	getRow() 
	{
		return this.row;
	}
	
	setColRow(column: number, row: number) 
	{
		this.column = column;
		this.row = row;
	}

	hasVal()
	{
		return this.hasValue;
	}

    public getThreeObject () {
		return {
			point1: {x: this.posX,	y: this.posY},
			val: this.valu,
			isBoundaryV: this.isBoundaryV,
			isBoundaryH: this.isBoundaryH,
			id: this.num,
			selected: false
		}
    }
    
    getRemCharging () {
    let remCharging = 20 // Evaluated after doing a few complex computations!
    return remCharging
    }
}
    