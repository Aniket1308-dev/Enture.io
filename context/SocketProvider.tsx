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

interface EmsSummaryData {
  efficiency: number;
  uptime: number;
  activeAlerts: number;
}

interface DeviceRow {
  name: string;
  type: string;
  status: string;
  value: string;
}

interface SocketContextValue {
  isConnected: boolean;
  consumption: ConsumptionData | null;
  parameterTrend: ParameterPoint[];
  emsSummary: EmsSummaryData | null;  
  devicesTable: DeviceRow[];  
}

const SocketContext = createContext<SocketContextValue>({
  isConnected: false,
  consumption: null,
  parameterTrend: [],
  emsSummary: null,  
  devicesTable: [],    
});

export function SocketProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [consumption, setConsumption] = useState<ConsumptionData | null>(null);
  const [parameterTrend, setParameterTrend] = useState<ParameterPoint[]>([]);
  const [emsSummary, setEmsSummary] = useState<EmsSummaryData | null>(null);  
  const [devicesTable, setDevicesTable] = useState<DeviceRow[]>([]);  

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
    function onEmsSummary(data: EmsSummaryData) {
      setEmsSummary(data);
    }
    function onDevicesTable(data: DeviceRow[]) {
      setDevicesTable(data);
    }


    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("consumption:update", onConsumptionUpdate);
    socket.on("parameter:trend", onParameterTrend);
    socket.on("ems:summary", onEmsSummary); 
    socket.on("devices:table", onDevicesTable);       

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("consumption:update", onConsumptionUpdate);
      socket.off("parameter:trend", onParameterTrend);
      socket.off("ems:summary", onEmsSummary); 
      socket.off("devices:table", onDevicesTable);           
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ isConnected, consumption, parameterTrend, emsSummary, devicesTable }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocketData() {
  return useContext(SocketContext);
}