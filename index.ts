let anyTypeVariable;
anyTypeVariable = 10;
anyTypeVariable = '';


let declaredVariableWithNumberType: number;
declaredVariableWithNumberType = 10;
// declaredVariableWithNumberType = ''; => Error: Assigned expression type "" is not assignable to type number

let myArrVariable: number[];
myArrVariable = [];
myArrVariable.push(1);

const userVasya: { id: string; firstName: string; middleName: string; aka: string; } = {id: 'a10', firstName: 'Василий', middleName: 'Алибабаевич'};
userVasya.aka = 'Алибаба';