# York

## Deployment

### GHCR Package

This repository publishes a production image to GitHub Container Registry as `ghcr.io/elpdev/york`.

The publish workflow lives at `.github/workflows/publish-ghcr.yml` and runs on:

- pushes to `main`
- version tags matching `v*`
- manual runs from the Actions tab

To let your deploy target pull from GHCR, create a GitHub personal access token with package read access and store it as `KAMAL_REGISTRY_PASSWORD` in your deploy secrets.

Example login check:

```bash
echo "$KAMAL_REGISTRY_PASSWORD" | docker login ghcr.io -u elpdev --password-stdin
docker pull ghcr.io/elpdev/york:latest
```
