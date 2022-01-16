
//Numeric
export const isaNumber = value => isNaN(parseFloat(value)) ? 'Must be a number' : undefined
export const minValue = min => value => value && value < min ? `Must be at least ${min}` : undefined
export const minValue18 = minValue(18)
export const tooOld = value => value && value > 65 ? 'You might be too old for this' : undefined

//Strings
export const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
export const maxLength15 = maxLength(15)


//email
export const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined
export const aol = value => value && /.+@aol\.com/.test(value) ? 'Really? You still use AOL for your email?' : undefined

export const required = value => value ? undefined : 'Required'

//const isaNumber = value => isNaN(parseFloat(value)) ? 'Must be a number' : undefined

// const isbNumber = value => {
//     let v = value 
//     if(v){ 
//         let z = isNaN(parseFloat(value)) 
//         return z ? 'Must be a number' : undefined
//     }
//     return 'v Invalid'
// }