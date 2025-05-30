# Pogoda‑App – zadanie 2.

| Wymaganie                      | Realizacja                                                                                |
| ------------------------------ | ----------------------------------------------------------------------------------------- |
| Obraz multi‑arch amd64 + arm64 | `docker/setup-qemu-action` + `docker/setup-buildx-action` + `docker/build-push-action@v5` |
| Cache warstw w Docker Hub      | `cache-from` / `cache-to` → `docker.io/nikodemxppp/pogoda-app-cache`, tryb `max`          |
| Test CVE (blokada CRITICAL)    | Trivy (`severity: CRITICAL`, `exit-code: 1`)                                          |
|                                |                                                                                           |

## Jak działa pipeline (`.github/workflows/docker-image.yml`)

1. Push do gałęzi `main` startuje workflow.
2. Buildx buduje obraz tylko dla amd64 (`load: true`) i skanuje go Trivy.
3. Jeśli brak luk CRITICAL -> buduje manifest amd64 + arm64 i pushuje do GHCR.

## Tagowanie

* **Obraz:** stały tag `latest`.
* **Cache:** Buildx zapisuje warstwy jako `docker.io/nikodemxppp/pogoda-app-cache:<sha256>`.

---

Pierwszy udany run pomija jedno zagrożenie HIGH które jest wykrywane w przypadku gdy w docker-image.yml reaguje na severity: CRITICAL,HIGH .
