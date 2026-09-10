# Website TODO

## Rules
- Run `npm run lint` and `npm run build` after each completed item
- Commit after each item with a clear message (e.g. `git commit -m "Add pricing page"`)
- After completing each item and commiting the change run /compact 
- Check off items below as you finish them
- Match existing code style — don't introduce new libraries without asking
- If a task is ambiguous, make a reasonable choice and note what you assumed at the bottom of this file under "Assumptions"

---

## Pages

- [ ] Use /add-project to creat a project page using this deck for information https://www.figma.com/deck/re5bpDAGGFcl750PryT3s9
    - The name of the project is "AYZ.AI" 

## Fixes

- [ ] Fix mobile nav overflow on screens <400px
  - Likely a flex-wrap issue in `header.jsx`
  - Test on iPhone SE width (375px) specifically

- [ ] Broken footer links
  - "Privacy Policy" and "Terms" both 404
  - Point to `/legal/privacy` and `/legal/terms` (create stub pages if they don't exist)

## Style / Content Updates

- [ ] Update hero section copy on homepage
  - New headline: "Build Faster, Ship Sooner"
  - Keep existing CTA button and layout, just swap text

- [ ] Swap brand color from `#1E40AF` to `#0F172A` site-wide
  - Check `tailwind.config.js` / theme file first — should be a single source of truth
  - Don't hardcode hex values in individual components

---

## Assumptions
*(Claude: log anything you had to decide on your own here, so I can review)*