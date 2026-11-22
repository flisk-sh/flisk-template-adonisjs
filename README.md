# create-adonisjs

**Stack:** a real `create-adonisjs` app (slim starter kit, no database)

**Notes:** scaffolder runs at build time; `HOST=0.0.0.0`, port from `PORT`

Flisk bring-your-own template. The container contract is in [docs/byo.md](https://github.com/flisk-sh/flisk/blob/main/docs/byo.md).

## Check it

CI runs two checks on every pull request: `verify` builds the image, runs it with `PORT=4000` and expects HTTP 200 on `/`;
`e2e` registers it in a throwaway Flisk project, runs `flisk up`, and expects HTTP 200 through Traefik. To build it yourself:

```bash
docker build -t template . && docker run --rm -e PORT=4000 -p 4000:4000 template
```

The Dockerfile pins the scaffolder at `npm create adonisjs@3.4.0`. To bump it, check the current release with `npm view create-adonisjs version`, update that one version and run the build above. CI rejects any `@latest` in the Dockerfile.

## Use it in a Flisk project

This repo already includes a [`service.json`](service.json) that registers the resource as `adonis-app`, so Flisk picks it up automatically when this folder is inside a Flisk project.

```bash
# from the folder that contains this template
flisk up
```

To add a second copy of this template in the same Flisk project, register it under a different resource name:

```bash
flisk resource adonis-app-copy --type bring-your-own --stack shop --dockerfile ./Dockerfile --yes
```

Use a resource name that is unique across Flisk projects sharing one Docker daemon.
