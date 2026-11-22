# Mein Bücherregal — Published PWA

This **public repository contains only the static application files** used for the permanently hosted bookshelf PWA. Source development happens in the private `samkur2606/storybook-app` repository. The books, catalog, and original release ZIPs remain in the separate private `samkur2606/storybook-books` repository.

**App website:** https://samkur2606.github.io/storybook-publish/

The app's visible interface and the books are in German. GitHub documentation and deployment commits are in English.

## Deployment

GitHub Pages serves `main` from the repository root. The private source repository's `.github/workflows/publish-storybook-app.yml` copies only the explicitly approved PWA files here. Initial deployment is already present; automatic publishing requires the `STORYBOOK_APP_PUBLISH_TOKEN` Actions secret in the private source repository, scoped exclusively to this public repository with Contents write permission.

Never commit any personal access token, full book ZIP, or private catalog to this repository. Family members enter their own read-only books access token locally in the app.

## Production and Test deployment

- **Production:** `/` — stable installed Android PWA from the approved `storybook-app/main` branch.
- **Test:** `/test/` — latest manually deployed/current feature-branch app until automatic publishing credentials are configured; Test is not a second installable PWA.
- The app's Production/Test mode switch is being developed in `storybook-app` PR for issue #34. Until that PR is reviewed and merged, the live Production app does not offer this switch. Test can be opened directly at https://samkur2606.github.io/storybook-publish/test/.
- Once configured, the private app repository's workflow publishes `main` to the Production root and the single active feature branch to `test/`. A fine-grained repository secret named `STORYBOOK_APP_PUBLISH_TOKEN` is required in the private source repository, limited to Contents: Read and write for this public repository.
- Recovery URL for a broken Test view, after the mode switch goes live: https://samkur2606.github.io/storybook-publish/?mode=production.
- The two paths share a web origin; separate storage/database and service-worker cache namespaces reduce accidental interference but are not a strict security boundary.
