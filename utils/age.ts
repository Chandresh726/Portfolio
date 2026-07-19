const BIRTH_TIME = Date.UTC(2002, 4, 8);
const MILLISECONDS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;

export function calculateAgeYears(now = Date.now()) {
	return ((now - BIRTH_TIME) / MILLISECONDS_PER_YEAR).toFixed(8);
}
