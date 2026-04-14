# Design System Document

## 1. Creative North Star: "The Urban Architect"
This design system moves beyond the "delivery app" trope to become a sophisticated digital concierge. We reject the cluttered, high-intensity patterns of traditional logistics platforms in favor of **The Urban Architect**—a philosophy rooted in structural clarity, intentional asymmetry, and "breathable" luxury. 

We don't just move items; we provide peace of mind. By utilizing high-contrast editorial typography and a "No-Line" architectural philosophy, we transform a utility into a premium service. The experience should feel like a high-end physical hotel lobby: quiet, organized, and effortlessly efficient.

---

## 2. Color & Atmospheric Depth
Our palette is a study in tonal precision. We lead with a commanding primary blue and support it with a sophisticated hierarchy of "Whites" and "Off-Whites" to create depth without the noise of structural lines.

### The Color Palette (Material Design Tokens)
*   **Primary Focus:** `primary` (#0037b0) for brand authority; `primary_container` (#1D4ED8) for interactive vibrancy.
*   **Surface Neutrals:** `surface` (#f7f9fb) is our canvas. Use `surface_container_lowest` (#ffffff) for elevated content.
*   **Functional Accents:** `tertiary` (#7f2500) is used sparingly for urgent notifications or high-energy actions, providing a sophisticated warmth against the cool blues.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section content. 
Structural separation is achieved through background shifts. For example, a `surface_container_low` card sitting atop a `surface` background provides all the definition a user needs. High-end design is felt, not outlined.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the "Nested Elevation" technique:
1.  **Base:** `surface` (#f7f9fb)
2.  **Section:** `surface_container_low` (#f2f4f6)
3.  **Active Card:** `surface_container_lowest` (#ffffff)

### Signature Textures & Glassmorphism
To break the "template" feel, use **Glassmorphism** for floating elements (like a navigation bar or a "Quick Action" fab). Use a semi-transparent `surface` color with a `backdrop-filter: blur(20px)`. This allows the vibrant city maps and photography to bleed through, softening the interface.

---

## 3. Typography: Editorial Authority
We use **Plus Jakarta Sans** not just for legibility, but as a brand statement. The typeface's geometric clarity mimics modern architectural signage.

*   **Display (LG/MD/SM):** Use for hero moments (e.g., "Your package is 2 minutes away"). Tighten letter-spacing by -2% for a more "custom" feel.
*   **Headline (LG/MD/SM):** Use for section headers. These should be bold and unapologetic.
*   **Body (LG/MD):** Reserved for core information. Always use `on_surface_variant` (#434655) to reduce eye strain and provide a softer, premium contrast.
*   **Label (MD/SM):** Used for micro-copy and status tags. Use `on_primary_fixed_variant` (#0039b5) to make labels feel like deliberate stamps of quality.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are often "dirty." In this design system, we use light and tone to imply height.

*   **The Layering Principle:** Depth is achieved by stacking `surface-container` tiers. A `surface_container_highest` element naturally feels closer to the user than a `surface` element.
*   **Ambient Shadows:** If a shadow is required for a floating CTA, use a "Tinted Ambient" shadow:
    *   *Blur:* 40px | *Opacity:* 6% | *Color:* Derived from `on_surface` (#191c1e).
*   **The Ghost Border:** If accessibility requires a container boundary, use the `outline_variant` (#c4c5d7) at **15% opacity**. It should be a suggestion of a line, not a barrier.

---

## 5. Components

### Buttons
*   **Primary:** High-gloss. Use a subtle gradient from `primary` (#0037b0) to `primary_container` (#1D4ED8). Radius: `md` (0.75rem).
*   **Secondary:** Ghost style. No background, `outline_variant` ghost border, with `primary` text.
*   **Tertiary:** Text only with `label-md` styling.

### Cards & Lists
*   **Zero-Divider Policy:** Never use a horizontal line to separate list items. Use **Vertical White Space** (16px or 24px) or subtle alternating background shifts between `surface_container_low` and `surface`.
*   **Concierge Cards:** Use `xl` (1.5rem) roundedness for main dashboard cards to evoke a friendly, modern feel.

### Input Fields
*   **Architectural Style:** Soft background (`surface_container_high`) with no border. Upon focus, transition to a `primary` "Ghost Border" (20% opacity) and a slight tonal lift.

### New Component: The "Status Orb"
Instead of a standard "Delivering" text tag, use a pulsing `primary_fixed` (#dce1ff) orb next to the text. This adds motion and life to the "efficiency" aspect of the system.

---

## 6. Do's and Don'ts

### Do
*   **Do** embrace asymmetry. Allow a "Display" headline to hang over the edge of a card to create visual interest.
*   **Do** use massive amounts of white space. If you think there is enough space, add 8px more.
*   **Do** use `surface_tint` for interactive icons to ensure they feel connected to the brand.

### Don't
*   **Don't** use pure black (#000000). Use `on_surface` (#191c1e) for all "black" text to maintain the premium navy undertone.
*   **Don't** use sharp 90-degree corners. Even the smallest chip should have at least a `sm` (0.25rem) radius to feel approachable.
*   **Don't** use standard "drop shadows." If an element doesn't look elevated through color alone, re-evaluate the layout hierarchy.

---

**Director's Note:** This design system is about the *omission* of the unnecessary. Every pixel must earn its place. When in doubt, remove a line and add a margin.