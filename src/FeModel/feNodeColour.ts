
//import { Color } from "three";



export class FeNodeColour {

	constructor() {
		// TODO Auto-generated constructor stub
	}

	 
	/**
	 * Return a colour on the scale red to blue with a value and it's 2 boundaries passed
	 * Hue scale:
	 * 0.0=red
	 * 0.1=orange
	 * 0.2=yellow
	 * 0.3=green
	 * 0.5=light blue
	 * 0.6=blue
	 * 0.8=purple
	 */	


	public static getTrafficlightColor(value: number, max: number, min:  number)
	{
		let x: number = (value / (max - min));
		let hue: number = 0.5 - (x / 2); //limit to 0->0.5 red to blue then invert by subtract from 0.5
        //let encCol: number = Color.HSBtoRGB(hue, 1.000, 1.000);
        // let RED: Color = "#FF0000";
	    // let newColour: Color = RED;
	    return "#FF0000"; // red
	}
	


}