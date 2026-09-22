# DEMU2

An immersive companion to Thor Fabian Pettersen’s *Infinite Regress and the Possibility of New Energy*.

The site includes a rotatable dual-torus conceptual illustration, five interactive argument panels, a 25-chapter index, the complete 246-page PDF reader, and a PDF download. Footer page numbers in the thesis return to its table of contents.

The manuscript and cover are the author-provided project assets. The illustrated model and site descriptions present the author's philosophical proposals. No scientific validation or university endorsement is claimed.

## Development

The project uses the Sites Vinext starter with React, TypeScript, and the installed Radix/Shadcn primitives. Keep the existing pnpm lockfile. Site publishing is handled through the registered Sites project.

## Interaction checks

The opening canvas responds to pointer dragging, arrow keys, animation speed, pause/play, and reset. The argument uses keyboard-accessible tabs. The dialog reader provides chapter navigation, previous/next controls, download, a separate PDF view, and keyboard dismissal.

Two optional WebMCP tools expose the same argument and chapter actions when the browser supports document.modelContext. This capability was unavailable in the preview browser; WebMCP validation could not be performed there. The visible controls do not depend on it.
