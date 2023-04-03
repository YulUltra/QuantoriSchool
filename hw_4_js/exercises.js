/**
 * Exercise 1
 *
 * Write a function that returns odd array values.
 * [1,2,3,4] => [1,3]
 */

const getOddValues = (numbers) => {
  let odds = []
  for (const number of numbers) {
    if (number % 2 != 0) {
      odds.push(number)
    }
  }
  return odds
}

/**
 * Exercise 2
 *
 * Write a function that returns the smallest value of an array
 * [4,2,10,27] => 2
 */

const getSmallestValue = (numbers) => {
  let min = numbers[0]
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < min) {
      min = numbers[i]
    }
  }
  return min
}

/**
 * Exercise 3
 *
 * Write a function that returns the biggest value of an array
 * [5,22,9,43] => 43
 */

const getBiggestValue = (numbers) => {
  let max = numbers[0]
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i]
    }
  }
  return max
}

/**
 * Exercise 4
 *
 * Write a function that takes an array of strings as input
 * and returns only those shorter than 20 characters
 *
 *[
 * 'I am a short string',
 * 'I seem to be short too',
 * 'And I am a long string'
 *] => [
 * 'I am a short string',
 * 'And I am a long string'
 *]
 *
 * Use: filter
 */
const getShorterStrings = (strings, characters = 20) => {
  return strings.filter(string => string.length < characters)
}

/**
 * Exercise 5
 *
 * Write a function that takes the following data as input:
 *
 *[
 * { name: 'shark', likes: 'ocean' },
 * { name: 'turtle', likes: 'pond' },
 * { name: 'otter', likes: 'fish biscuits' }
 *]
 *
 * And returns an array of strings:
 *
 * [ 'shark likes ocean', 'turtle likes pond', 'otter likes fish biscuits' ]
 *
 * Use: map
 */

const getComputedStrings = (fish) => {
  return fish.map(({ name, likes }) => name + ' likes ' + likes)
}

/**
 * Exercise 6
 *
 * Write a function that takes 2 objects as input and returns 1 with
 * common properties. If properties have the same keys use the latter.
 *
 * [{ name: 'Alice' }, { age: 11 }] => { name: 'Alice', age: 11 }
 *
 * We use: ...
 */

const mergeObjects = (objects) => {
  return { ...objects[0], ...objects[1] }
}

/**
 * Exercise 7
 *
 * Write a function that returns the smallest value of an array
 * [5,200,-5,41] => -5
 *
 * Use: operator ... and Math.min
 */

const getSmallestValue2 = (numbers) => {
  return Math.min(...numbers)
}

/**
  * Exercise 8
  *
  * Write a function that returns odd array values.
  * [77,2,30,51] => [77,51]
  *
  * Use: reduce

  */

const getOddValues2 = (numbers) => {
  return numbers.reduce((odds, current) => current % 2 != 0 ? odds.concat(current) : odds, [])
}

/**
 * Exercise 9
 *
 * Write a function that accepts data from the basket as input in the following form:
 *
 *[
 * {price: 10, count: 2},
 * {price: 100, count: 1},
 * {price: 2, count: 5},
 * {price: 15, count: 6},
 *]
 * where price is the price of the item and count is the quantity.
 *
 * The function should return the total price for this order.
 *
 * Use: reduce
 */

const calculateTotal = (products) => {
  return products.reduce((total, current) => total + current.price * current.count, 0)
}

/**
 * Exercise 10
 *
 * Implement a function that has an array of numbers as input and an array of unique values as output
 * [1, 2, 2, 4, 5, 5] => [1, 2, 4, 5]
 *
 * Use: reduce and indexOf
 */

const getUniqueValues = (numbers) => {
  return numbers.reduce(
    (uniques, current) => uniques.indexOf(current) < 0 ? uniques.concat(current) : uniques,
    []
  )
}

/**
 * Exercise 11
 *
 * Implement a function whose input is a numeric code of an error, the output is a string with a message
 * 500 => Server Error
 * 401 => Authorization failed
 * 402 => Server Error
 * 403 => Access denied
 * 404 => Not found
 *
 * Use: switch case or object like a map structure
 */

const getErrorMessage = (code) => {
  switch (code) {
    case 500:
      return 'Server Error'
    case 401:
      return 'Authorization failed'
    case 402:
      return 'Server Error'
    case 403:
      return 'Access denied'
    case 404:
      return 'Not found'
    default:
      return 'Wrong status code'
  }
}

/**
 * Exercise 12
 *
 * Write a function that returns the 2 smallest values of an array
 * [4,3,2,1] => [1,2]
 *
 * Use: .sort()
 */

const get2SmallestValues = (numbers) => {
  return numbers.sort().slice(0, 2)
}

/**
 * Exercise 13
 *
 * Implement a function, at the input of which an object of the following form:
 * {
 * firstName: 'Peter',
 * secondName: 'Vasiliev',
 * patronymic: 'Ivanovich'
 *}
 * output line with the message 'Name: Petr Ivanovich Vasiliev'
 */

const getFullName = (user) => {
  return 'Name: ' + user.firstName + ' ' + user.patronymic + ' ' + user.secondName
}

/**
 * Exercise 14
 *
 * Implement a function that takes 2 arguments as input: an array of numbers and a multiplier,
 * a returns an array of the original array, each element of which has been multiplied by a factor:
 *
 * [1,2,3,4], 5 => [5,10,15,20]
 *
 * Use: map
 */

const multiplyTo = (numbers, multiplier) => {
  return numbers.map(n => n * multiplier)
}

/**
 * Exercise 15
 *
 * Implement a function that takes 2 arguments as input: an array and a franchise,
 * and returns a string with the names of the heroes separated by a comma:
 *
 *[
 * {name: "Batman", franchise: "DC"},
 * {name: "Ironman", franchise: "Marvel"},
 * {name: "Thor", franchise: "Marvel"},
 * {name: â€œSupermanâ€, franchise: â€œDCâ€}
 *],
 * Marvel
 * => Ironman, Thor
 *
 * Use: filter, map, join
 */

const getCharacterNames = (characters, franchise) => {
  return characters
    .filter(c => c.franchise == franchise)
    .map(c => c.name)
    .join(', ')
}

// ----==== Advanced exercises (8 items) ====----
/**
 * Exercise 16
 *
 * Write a function that returns an array of the smallest row values of a two-dimensional array
 *[
 * [10,1,300,4],
 * [20,2,300,400],
 * [30,3,300,4],
 * [40,4,300,4],
 *]
 * => [1,2,3,4]
 */

const getSmallestRow = (numbers) => {
  return numbers.reduce((acc, current) => acc.concat([Math.min(...current)]), [])
}

/**
 * Exercise 17
 *
 * Write a function that returns an array of the smallest column values of a two-dimensional array
 *[
 * [1,2,3,4],
 * [1,2,3,4],
 * [1,2,30,4],
 * [1,2,3,40],
 *]
 * => [1,2,3,4]
 *
 * Here I used solution of previous problem, but for transposed matrix
 */

const getSmallestColumn = (numbers) => {
  return numbers[0]
    .map((_, columnNumber) => numbers.map(row => row[columnNumber]))
    .reduce((acc, next) => acc.concat([Math.min(...next)]), [])
}

/**
 * Exercise 18
 *
 * Write a function that returns the 2 biggest value of an array
 * [4,3,2,1] => [4,3]
 */

const get2BiggestValues = (numbers) => {
  const reducer = ([biggest1, biggest2], n) => {
    if (biggest1 < n) {
      biggest2 = biggest1
      biggest1 = n
    } else if (biggest2 < n) {
      biggest2 = n
    }
    return [biggest1, biggest2]
  }

  return numbers.slice(2).reduce(reducer, [numbers[0], numbers[1]])
}

/**
 * Exercise 19
 *
 * Write a function that returns the number of vowels in a string in English
 * ( a, e, i, o, u ).
 *
 * 'Return the number (count) of vowels in the given string.' => 15
 */

const getNumberOfVowels = (string) => {
  return string.match(/[aeiou]/gi).length
}

/**
 * Exercise 20
 *
 * Write a function that returns an array of two strings where the first element
 * is the original string with uppercase even letters, and the second
 * with capital odd.
 * 'abcdef' => ['AbCdEf', 'aBcDeF']
 */

const getCapitalizedStrings = (string) => {
  const mapper = (char, idx) => (idx % 2 != 0 ? char.toLowerCase() : char.toUpperCase())
  const chars = string.split('')

  const evenCharsCapital = chars.map(mapper).join('')
  const oddCharsCapital = chars.map((char, idx) => mapper(char, idx + 1)).join('')

  return [evenCharsCapital, oddCharsCapital]
}

/**
 * Exercise 21
 *
 * Write a function that satisfies the following conditions:
 *
 * the function takes a string S, consisting of N letters of the English alphabet in lowercase [a-z]
 * the function returns a string that does not contain three identical letters in a row
 * the function removes the minimum number of letters from the string S
 *
 * Examples:
 * S = "eedaaad", the function returns "eedaad". One "a" has been removed.
 * S = "xxxtxxx", the function returns "xxtxx". The same letters can occur more than three times in a string, but not in a row.
 * S = "uuuuxaaaaxuuu", the function returns "uuxaaxuu".
 *
 * Assumptions:
 * N is an integer in the range [1..200,000]
 * S consists only of lowercase letters [a-z]
 */

const getCorrectString = (string) => {
  return string.replace(/(.)(?=\1\1)/g, '')
}

/**
 * Exercise 22
 *
 * Implement a flatten function that takes an array of arbitrary nesting arrays as input
 * and returns an array of all their elements without nesting.
 * [1, 2, [3, 4], 5, [[6, 7], 8], 9] => [1, 2, 3, 4, 5, 6, 7, 8, 9]
 *
 * or we can just use flat(2) method here instead of
 */

const getFlattenedArray = (numbers) => {
  const reducer = (flattenedArray, obj) => flattenedArray.concat(flatten(obj))
  const flatten = obj => Array.isArray(obj) ? obj.reduce(reducer, []) : obj
  return numbers.reduce(reducer, [])
}

/**
 * Exercise 23
 *
 * Implement a function that has an array of numbers as input and an array of not unique values as output.
 *
 * [1, 2, 2, 4, 5, 5] => [2, 5]
 */

const getNotUniqueValues = (numbers) => {
  return numbers.filter((n, idx) => numbers.indexOf(n) != idx)
}
