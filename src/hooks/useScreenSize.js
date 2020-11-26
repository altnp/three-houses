import { useMediaQuery } from 'react-responsive';

export const SCREENSIZE = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 3,
};

function useScreenSize() {
  const isDesktop = useMediaQuery({ query: '(min-width: 1200px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' }) && !isDesktop;
  const isMobile = !(isDesktop || isTablet);

  // eslint-disable-next-line no-nested-ternary
  return isMobile ? SCREENSIZE.MOBILE : isTablet ? SCREENSIZE.TABLET : SCREENSIZE.DESKTOP;
}

export default useScreenSize;
