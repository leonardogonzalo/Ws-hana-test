import http from "k6/http";
import { check, fail } from "k6";

const URL = "http://10.12.6.217";
const SERVICE_TIMEOUT = "120s";
const SUCCESS = 200;
const TIMEOUT = 500000;

export let options = {
  vus: 150,
  //iterations: 20
  duration: "2.5m"
};

export default function() {
  let requests = {
    //GetPeriodo: { method: "GET", url: `${URL}:9500` },
    GETPERIODO: {
      method: "GET",
      url: `${URL}:9500/CO/0/201818`,
      params: { timeout: SERVICE_TIMEOUT }
    }
  };
  let responses = http.batch(requests);

  check(responses["GETPERIODO"], {
    "PERIODO => status was 200": r => r.status === SUCCESS,
    "PERIODO => transaction time OK": r => r.timings.duration < TIMEOUT
  }) || fail("PERIODO status code was *not* 200");
}
