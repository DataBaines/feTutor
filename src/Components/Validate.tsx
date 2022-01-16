/*
* To be used for decimal fields in a form
* 
*/
export const onlyDecimal = value => {
  value = value
    .replace(/[^0-9.]/g, '') // Remove all chars except numbers and .

  // Create an array with sections split by .
  const sections = value.split('.')

  // Remove any leading 0s apart from single 0
  if (sections[0] !== '0' && sections[0] !== '00') {
    sections[0] = sections[0].replace(/^0+/, '')
  } else {
    sections[0] = '0'
  }

  // If numbers exist after first .
  if (sections[1]) {
    // Join first two sections and truncate end section to length 2
    return sections[0] + '.' + sections[1].slice(0, 2)
  // If original value had a decimal place at the end, add it back
  } else if (value.indexOf('.') !== -1) {
    return sections[0] + '.'
  // Otherwise, return only section
  } else {
    return sections[0]
  }
}

/*
* To be used for decimal fields in a form
* parse={(value) => parseDecimal(value)}
*/
export const parseDecimal = value => {
	if(value === '0')
    	return 0 
    else
     		return !parseFloat(value) || !Number(value)  || value.endsWith('.') ? value : parseFloat(value);
};

export const requiredNumber = value => ((value === 0 || value) ? undefined : "Required");
export const required = value => ((value === 0 || value) ? undefined : "Required");

export const mustBeNumber = value => (isNaN(value) ? "Must be a number" : undefined);

export const minValue = min => value =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

export const maxValue = max => value =>
  isNaN(value) || value <= max ? undefined : `Should be less than ${max}`;
  
export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

interface IformErrors {
    username: string,
    email: string,
    age: string
}

const validate = values => {
    // IMPORTANT: values is an Immutable.Map here!
    const errors: IformErrors = {username: '', email: '', age: ''}
    if (!values.get('username')) {
      errors.username = 'Required'
    } else if (values.get('username').length > 15) {
      errors.username = 'Must be 15 characters or less'
    }
    if (!values.get('email')) {
      errors.email = 'Required'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))
    ) {
      errors.email = 'Invalid email address'
    }
    if (!values.get('age')) {
      errors.age = 'Required'
    } else if (isNaN(Number(values.get('age')))) {
      errors.age = 'Must be a number'
    } else if (Number(values.get('age')) < 18) {
      errors.age = 'Sorry, you must be at least 18 years old'
    }
    return errors
}
  
  export default validate