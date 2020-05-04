/**
 * @async
 * @param {Object} event
 * @param {String} event.string - to convert
 * @param {Integer} [event.alg=1] - algo version, 1 float output (default) ou 2 string output
 * @returns {Promise<Float|String>} - Float if algo 1 or String it algo 2
 */
exports.handler = async function handler(event) {
	let retVal = (event.algo || 1) == 1 ? mathieu(event.string) : remi(event.string);
	retVal = parseFloat(retVal);

	if (retVal && event.unit && retVal < event.unit) retVal = retVal * event.unit;

	return parseFloat(retVal);
}

function mathieu(string) {
	if (!string) return null;

	const match = string.match(/[^0-9]*([0-9]*)[^0-9]*([0-9]*)/);
	if (!match) return null;

	let matchArray;
	matchArray = [match[1], match[2]];
	matchArray = matchArray.filter(i => i);

	if (!matchArray.length) return null;
	if (matchArray.length === 1) matchArray.push('0');

	return parseFloat(matchArray.join('.'));
}

function remi(text) {
	if (!text) return null;

	const parsed = text.replace(/[^\d]*(\d+)([^\d]+(\d+).*)?/gi, '$1 $3');
	const exploded = parsed.split(' ').filter((a) => a);

	if (!exploded.length) {
			return null;
	}

	let retVal = null;

	if (exploded.length === 1) {
			retVal =  parseInt(exploded[0]).toFixed(2);
	} else if (isNaN(parseInt(exploded[1]))) {
			retVal = parseInt(exploded[0]).toFixed(2);
	} else {
			retVal = parseFloat(exploded[0] + '.' + exploded[1]).toFixed(2);
	}

	return (isNaN(retVal)) ? null : retVal;
}
/*
const dataset = [
	'je fais 1,5',
	'1 metre 4',
	'1.43 metres',
	'je dois fait dans les 1m30',
	'130',
	'1.30',
	'asdf 1 m 30',
	'1m30',
	'130cm',
	'2m',
	'entre 1m60 et 1m65',
	'je ne suis pas valide du tout',
	''
];

dataset.forEach(val => {
	console.log(val, this.handler({string: val, unit:100}), this.handler({algo: 2, string: val}));
})
*/
