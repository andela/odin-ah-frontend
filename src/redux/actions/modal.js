export const SHOW_MODAL = 'SHOW_MODAL';

/**
 *
 * @param show
 * @param { {Component: Component, props: object} } content
 * @return {{type: string, show: *, content: object}}
 */
export const modal = (show, content = {}) => ({
  type: SHOW_MODAL,
  show,
  content,
});

export const dismissModal = () => dispatch => dispatch(modal(false));

export const openModal = content => dispatch => dispatch(modal(true, content));
