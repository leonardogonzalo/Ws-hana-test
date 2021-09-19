module.exports = {
  PORT: 80,
  SECURE: false,
  AUTH:
  {
    enable: true,
    provider: "https:\\10.12.6.217:8084",
    signatureToken: "",
    secretSignatureToken: "",
    keyToken: "AKIAIAGA5VV23TFLS5VA",
    algorithm: "HS256",
    BASIC:
    {
      name: "AKIAIYETSRUJDVPUJMVQ",
      pass: "63tSNMOUqQ2wAH16KWL/nfzOu/qWpkpz9TFm21Ti",
    }
  },
  DB :
  {
    HANA:
    {
        "host": "10.14.101.61",
        "port": 30015,
        "env": "PROD",
        "stage": "PROD",
        "name": "test",
        "user": "BDI_INTEGRACION",
        "password": "Welcome1",
        "maxPoolSize": 50,
        "minPoolSize": 30,
        "idleTimeoutMillis": 60000,
        "refreshIdle": false,
        "timeOut": 180000
    },
    ORACLE:
    {
        "poolMax": 10,
        "poolMin": 3,
        "poolIncrement": 1,
        "poolTimeout": 4,
        "connections":
        [
          { "enable": false, "codPais": "PER", "user": "SSICC_PE_ES", "pass": "PWDQASSSICCPEES", "host": "10.14.142.81", "port": "1544", "service": "siccpee", "schema": "ssicc_pe_es" },
          { "enable": true, "codPais": "CRI", "user": "usu_ods_cr_lb", "pass": "belcorp", "host": "10.14.202.44", "port": "2751", "service": "sicccrl", "schema": "ssicc_cr_lb" },
          { "enable": false, "codPais": "CHL", "user": "USU_ODS_CL_ES", "pass": "belcorp", "host": "pelnx1487", "port": "1563", "service": "SICCCLE", "schema": "ssicc_cl_es" }
        ]
    }
  },
  LOG:
  {
    "application": "cae",
    "api": "http://10.12.6.217:8089/",
    "enable": true,
    "detail": true,
    "level": "debug",
    "compress": false,
    "progress": false,
    "localContingency": false,
    "localPath": "./logs/"
  }
}
