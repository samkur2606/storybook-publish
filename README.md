# Mein Bücherregal — Published PWA

This **public repository contains only the static application files** used for the permanently hosted bookshelf PWA. Source development happens in the private `samkur2606/storybook-library` repository. The books, catalog, and original release ZIPs remain in the separate private `samkur2606/storybook-books` repository.

**App website:** https://samkur2606.github.io/storybook-app/

The app's visible interface and the books are in German. GitHub documentation and deployment commits are in English.

## Deployment

GitHub Pages serves `main` from the repository root. The private source repository's `.github/workflows/publish-storybook-app.yml` copies only the explicitly approved PWA files here. Initial deployment is already present; automatic publishing requires the `STORYBOOK_APP_PUBLISH_TOKEN` Actions secret in the private source repository, scoped exclusively to this public repository with Contents write permission.

Never commit any personal access token, full book ZIP, or private catalog to this repository. Family members enter their own read-only books access token locally in the app.
