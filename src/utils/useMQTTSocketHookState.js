import { useEffect, useState } from "react";
import * as mqtt from "mqtt/dist/mqtt";
import * as GlobalFixture from "@globalFixture";

function useMQTTSocketHookState() {
  const [client, setClient] = useState();
  const [connectionStatus, setConnectStatus] = useState("");
  const [payload, setPayload] = useState({});
  const [isSub, setIsSub] = useState(false);

  const mqttConnect = (host, mqttOption) => {
    setConnectStatus(GlobalFixture.API_FIXTURE_CONTENTS.MQTT_STATUS_CONNECTING);
    setClient(mqtt.connect(host, mqttOption));
  };

  useEffect(() => {
    if (client) {
      client.on(GlobalFixture.API_FIXTURE_CONTENTS.MQTT_ON_CONNECT, () => {
        setConnectStatus(
          GlobalFixture.API_FIXTURE_CONTENTS.MQTT_STATUS_CONNECTED
        );
      });
      client.on(GlobalFixture.API_FIXTURE_CONTENTS.MQTT_ON_ERROR, err => {
        console.error("Connection error: ", err);
        client.end();
      });
      client.on(
        GlobalFixture.API_FIXTURE_CONTENTS.MQTT_ON_MESSAGE,
        (topic, message) => {
          const payload = { topic, message: JSON.parse(message.toString()) };
          setPayload(payload);
        }
      );
      client.on(GlobalFixture.API_FIXTURE_CONTENTS.MQTT_ON_RECONNECT, () => {
        setConnectStatus(
          GlobalFixture.API_FIXTURE_CONTENTS.MQTT_STATUS_RECONNECTING
        );
      });
    }
    return () => {
     mqttDisconnect()
    }
  }, [client]);

  const mqttSub = subscription => {
    if (client) {
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, error => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        setIsSub(true);
      });
    }
  };

  const mqttUnSub = subscription => {
    if (client) {
      const { topic } = subscription;
      client.unsubscribe(topic, error => {
        if (error) {
          console.log("Unsubscribe error", error);
          return;
        }
        setIsSub(false);
      });
    }
  };

  const mqttPublish = context => {
    if (client) {
      const { topic, qos, payload } = context;
      client.publish(topic, payload, { qos }, error => {
        if (error) {
          console.log("Publish error: ", error);
        }
      });
    }
  };

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        setConnectStatus(
          GlobalFixture.API_FIXTURE_CONTENTS.MQTT_STATUS_CONNECT
        );
        setClient(null)
      });
    }
  };

  return {
    client,
    connectionStatus,
    mqttConnect,
    mqttDisconnect,
    mqttSub,
    mqttUnSub,
    mqttPublish,
    payload,
  };
}
export { useMQTTSocketHookState };
export default useMQTTSocketHookState;
