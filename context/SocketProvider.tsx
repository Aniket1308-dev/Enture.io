"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { socket } from "@/lib/socket";

interface ConsumptionData {
  value: number;
  unit: string;
  timestamp: number;
}

interface ParameterPoint {
  time: string;
  value: number;
}

interface SocketContextValue {
  isConnected: boolean;
  consumption: ConsumptionData | null;
  parameterTrend: ParameterPoint[];
}

const SocketContext = createContext<SocketContextValue>({
  isConnected: false,
  consumption: null,
  parameterTrend: [],
});

export function SocketProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [consumption, setConsumption] = useState<ConsumptionData | null>(null);
  const [parameterTrend, setParameterTrend] = useState<ParameterPoint[]>([]);

  useEffect(() => {
    socket.connect();

    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }
    function onConsumptionUpdate(data: ConsumptionData) {
      setConsumption(data);
    }
    function onParameterTrend(data: ParameterPoint[]) {
      setParameterTrend(data);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("consumption:update", onConsumptionUpdate);
    socket.on("parameter:trend", onParameterTrend);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("consumption:update", onConsumptionUpdate);
      socket.off("parameter:trend", onParameterTrend);
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ isConnected, consumption, parameterTrend }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocketData() {
  return useContext(SocketContext);
}