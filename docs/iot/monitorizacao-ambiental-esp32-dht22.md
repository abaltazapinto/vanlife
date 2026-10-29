# Monitorização ambiental da Hyundai H100 — ESP32 + DHT22

Estado: **planeado para a carrinha** (29-10-2026). O protótipo académico COMCS PL6 já demonstrou MQTT/TLS e dashboard Node-RED com temperatura e humidade, mas o hardware definitivo da carrinha ainda não foi montado.

## Objetivo
Medir temperatura e humidade no interior da carrinha quando o utilizador estiver presente e ativar o hotspot do telemóvel. Consultar as medições num dashboard no telemóvel ou em casa.

## Material necessário

| Item | Estado | Notas |
| --- | --- | --- |
| ESP32 próprio | Já disponível | Confirmar modelo, alimentação e GPIO antes de ligar |
| **Sensor DHT22 / AM2302** | **Comprar — recomendado** | Mede temperatura e humidade; geralmente mais preciso que DHT11; procurar módulo com 3 pinos para facilitar a montagem |
| Cabos Dupont | Verificar | Compatíveis com ESP32 e módulo |
| Cabo USB e fonte 5 V USB | Verificar | Alimentação estável para ESP32; evitar descarregar bateria da carrinha |
| Caixa de proteção ventilada | Recomendado | Proteger a eletrónica sem bloquear circulação de ar no sensor |
| Resistência 4,7–10 kΩ | Condicional | Pull-up DATA–3,3 V se DHT22 simples de 4 pinos; módulos de 3 pinos frequentemente já a incluem |
| Ecrã OLED I²C 0,96″ | Opcional, futuro | Visualização local sem telemóvel ou rede |

**Recomendação de compra:** DHT22/AM2302 em **módulo de 3 pinos compatível com 3,3 V**. Confirmar pinagem VCC/DATA/GND do fabricante antes de ligar. O DHT22 é adequado para protótipo; para medições mais estáveis/precisas no futuro, considerar SHT31 ou BME280.

## Arquitetura

```text
Carrinha:
DHT22 -> ESP32 -> Wi-Fi hotspot telemóvel -> Internet
                                            |
                                            v
                                 EMQX Cloud (MQTT/TLS)
                                            |
                                            v
Casa: Raspberry Pi 5 -> Node-RED + Dashboard
                                            |
                                  Tailscale (acesso privado)
                                            |
                                    Telemóvel / PC
```

O ESP32 comunica diretamente com o EMQX Cloud. **Tailscale é usado para chegar ao Node-RED no Raspberry Pi**, não no ESP32.

## Tópicos MQTT existentes (protótipo COMCS PL6)

- `comcs/pl6/temperature`
- `comcs/pl6/humidity`
- `comcs/pl6/heatindex`

Para a carrinha, **recomenda-se namespace próprio**, por exemplo `van/h100/temperature`, `van/h100/humidity` e `van/h100/status`, sem alterar os tópicos da aula. Configurar autenticação e ACL no broker, TLS com validação do certificado e client ID único.

## Estado verificado em 29-10-2026

- Protótipo ESP32-S3 com DHT11 da aula publica temperatura e humidade via EMQX Cloud (porta 8883/TLS).
- Node-RED no Ubuntu subscreve `comcs/pl6/#` e recebe dados.
- Dashboard 2 apresenta **temperatura e humidade** no PC e no telemóvel via endereço local `http://<IP-do-Ubuntu>:1880/dashboard/page1`.
- Exemplo observado: **22,6 °C e 48%**.
- Raspberry Pi 5 tem Docker 26.1.5 e Docker Compose 2.26.1; acesso ao daemon requer `sudo`.
- **Migração Node-RED para Raspberry Pi 5 ainda não executada**; confirmar portas e preservar o Nextcloud.

## Próximos passos

1. Comprar DHT22/AM2302 (preferir módulo 3 pinos, 3,3 V).
2. Confirmar o modelo exato do ESP32 próprio e a pinagem do sensor.
3. Montar e testar sensor localmente; calibrar/verificar leituras.
4. Preparar firmware com Wi-Fi hotspot, reconexão automática, MQTT/TLS e tópicos `van/h100/*`. Nunca publicar passwords, `secrets.h` ou tokens no Git.
5. Verificar `sudo docker ps` no Raspberry Pi 5 e instalar Node-RED em container separado, com volume persistente e política de reinício; não interferir com Nextcloud.
6. Exportar/importar o flow do Ubuntu para o Pi, reconfigurar credenciais e validar dashboard via Tailscale.
7. Adicionar estado online/offline e indicação da idade da última leitura. Sem hotspot, não há dados novos; histórico requer armazenamento específico.
8. Testar alimentação e instalação segura na carrinha; evitar sensor junto a saídas de ar, sol direto ou superfícies quentes.

## Segurança

- O dashboard do Node-RED não deve ser exposto diretamente à Internet. Usar Tailscale e proteger o editor com autenticação.
- Usar HTTPS/TLS validado na ligação MQTT.
- A ligação por hotspot só estará ativa quando o telemóvel disponibilizar Internet; não prometer monitorização contínua sem conectividade.
