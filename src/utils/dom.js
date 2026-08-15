// Tiny DOM helpers so page scripts stay readable.

export const $ = (selector, scope = document) => scope.querySelector(selector)
export const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)]

/** Render an array of items into a container using a render function. */
export function mountList(container, items, renderFn) {
  if (!container) return
  container.innerHTML = items.map(renderFn).join('')
}

/** Format an ISO date string as "12 Sep 2026". */
export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
