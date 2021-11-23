export const size = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	'2xl': 1536,
	'3xl': 1680,
};

const breakpoints = {
	sm: `(min-width: ${size.sm}px)`,
	md: `(min-width: ${size.md}px)`,
	lg: `(min-width: ${size.lg}px)`,
	xl: `(min-width: ${size.xl}px)`,
	'2xl': `(min-width: ${size['2xl']}px)`,
	'3xl': `(min-width: ${size['3xl']}px)`,
};

export default breakpoints;
