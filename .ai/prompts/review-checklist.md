# Checklist de revisión de código

<!-- Criterios de validación para PRs y revisión por IA. -->

## General
- [ ] Código compila / tests pasan
- [ ] Sin secretos ni datos sensibles en código
- [ ] Cambios alineados con `architecture.md` y `business-rules.md`

## Frontend
- [ ] Estados de loading y error manejados
- [ ] Accesibilidad básica (labels, contraste, foco)
- [ ] Sin dependencias innecesarias

## Integraciones
- [ ] Clientes en `packages/integration-clients`
- [ ] Reintentos y timeouts configurados
- [ ] Documentación actualizada en `api-integrations.md`


