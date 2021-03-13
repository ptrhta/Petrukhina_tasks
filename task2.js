'use strict'
 
 const arrayDiff = (a, b)=> {
 	return a.filter(number => {
 		return !b.find(numb => numb ==  number)
 	})
 }

console.log(arrayDiff([1,2],[1]))
console.log(arrayDiff([1,2,2,2,3],[2]))
console.log(arrayDiff([1,2,2,2,3],[2, 9, 99, -1]))

const alphabetPosition = str => {
	return [...str].map(letter => parseInt(letter, 36) - 9).filter(code => code >= 0).join(' ');
}

console.log(alphabetPosition("The sunset sets at twelve o' clock."))

const squareEveryDigit = num => {
	return [...String(num)].map(i => i*i).join('')
}

console.log(squareEveryDigit(9119))
console.log(squareEveryDigit(323))
console.log(squareEveryDigit(101))
