# Component conventions

Shared UI lives here as flat `Component.jsx` + `Component.module.css` pairs
(no per-component folders). CSS Modules draw on the design tokens defined in
`app/globals.css` (`--space-*`, `--radius-*`, `--text-*`, `--shadow-*`,
semantic color tokens) — reuse an existing token before adding a new custom
property; only add one if a value repeats across 2+ components and isn't
already covered by the scale.

Every component in this directory should be represented in
`app/style-guide/page.js` with its representative variants. When you add a
new component, add a `<Section>` for it there too.

## Prop API

Reusable primitives (Button, InputField, HomeCard, StatTile, etc.) accept:

```jsx
export default function Thing({ ...ownProps, className = "", ...rest }) {
  return (
    <div className={`${styles.root} ${className}`} {...rest}>
```

- `className = ""` is appended after the component's own `styles[...]`
  classes on the single outermost element the component renders.
- `...rest` spreads onto that same outermost element, last, so callers can
  attach `data-*`/`aria-*`/event handlers/etc. without a dedicated prop.

Defaults are destructured inline in the function signature — no
`defaultProps`, no PropTypes (none exist in this repo, don't introduce them).

### Exceptions

- **Wrapper components that already forward `...rest` to an inner control**
  (`FormField` → `InputField`, `FormDropdown` → `Dropdown`) keep `...rest`
  pointed at the inner control, since that's its real job (forwarding native
  attrs like `name`/`type`/`required`). `className` styles the wrapper only.
- **Page-level compositions with no single meaningful root** (`ContactForm`,
  which has a success-state branch and a form-state branch) are exempt from
  the convention entirely — don't force it.
- Multi-element components with their own internally-managed interactive
  children (`Dropdown`'s trigger/option buttons) only get `className`/`...rest`
  on their outermost wrapper, never on the internal elements that manage
  their own `onClick`/`type`/ARIA state.

## Adding a new component

1. Follow the prop API above (or note here if it needs an exception, and why).
2. Add a `<Section title="...">` for it in `app/style-guide/page.js` showing
   its representative variants.
3. If it introduces a new visual pattern or token, note it in this file.
