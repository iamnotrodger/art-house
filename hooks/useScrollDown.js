import { useEffect, useState } from 'react';

const useScrollDown = (threshold = 30) => {
	const [isScrollingDown, setIsScrollingDown] = useState(false);

	useEffect(() => {
		let lastScrollY = window.pageYOffset;
		let ticking = false;

		const updateScrollDir = () => {
			const scrollY = window.pageYOffset;

			if (Math.abs(scrollY - lastScrollY) < threshold) {
				ticking = false;
				return;
			}
			setIsScrollingDown(scrollY > lastScrollY ? true : false);
			lastScrollY = scrollY > 0 ? scrollY : 0;
			ticking = false;
		};

		const onScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(updateScrollDir);
				ticking = true;
			}
		};

		window.addEventListener('scroll', onScroll);

		return () => window.removeEventListener('scroll', onScroll);
	}, [isScrollingDown, threshold]);

	return isScrollingDown;
};

export default useScrollDown;
