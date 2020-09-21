import { IS_OPEN, IS_MOBILE, CLOSE_MENU } from '../constants/sideMenu'

export const isOpen = () => ({
  type: IS_OPEN
});

export const isMobile = () => ({
  type: IS_MOBILE
})

export const closeSideMenu = () => ({
  type: CLOSE_MENU
})