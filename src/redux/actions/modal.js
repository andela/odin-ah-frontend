export const SHOW_MODAL = 'SHOW_MODAL';

/**
 *
 * @param show
 * @param { {Component: Component, props: object} } content
 * @return {{type: string, show: *, content: object}}
 */
export function modal(show, content = {}) {
  return {
    type: SHOW_MODAL,
    show,
    content,
  };
}
