
export class Grid2d<T> {

    private datatype: string; 
	//The 3 nodes that make up a triangular element
	private dim1: number;
	private dim2: number;
    
    
    public constructor(size1: number, size2: number)
	{
		//number = n;
		this.dim1 = size1;
		this.dim2 = size2;
	}


}

export function Initialise2dArray<T>(array: T[][], par1: number, par2: number, value: T){
    for (let index = 0; index < par1; index++) 
    {
        for (let index = 0; index < par2; index++) {
            array[par1][par2] = value; 
        }
    }
}

export function InitialiseArray<T>(array: T[], par1: number, value: T){
    for (let index = 0; index < par1; index++) {
        array[par1] = value; 
    }
}