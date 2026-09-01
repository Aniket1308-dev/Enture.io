"use client";

import { WidgetCard } from "@/components/ui/WidgetCard";
import { useSocketData } from "@/context/SocketProvider";

const mockDevices = [
  { name: "Meter 01", type: "Energy", status: "Active", value: "4,281 kWh" },
  { name: "Meter 02", type: "Energy", status: "Active", value: "2,110 kWh" },
  { name: "Sensor A1", type: "Temperature", status: "Active", value: "24.5 °C" },
  { name: "Sensor B2", type: "Humidity", status: "Idle", value: "48 %" },
  { name: "Inverter 01", type: "Solar", status: "Active", value: "3.2 kW" },
  { name: "Inverter 02", type: "Solar", status: "Offline", value: "—" },
];


const statusStyles: Record<string, string> = {
  Active: "text-green-600 bg-green-50",
  Idle: "text-yellow-600 bg-yellow-50",
  Offline: "text-red-600 bg-red-50",
};

export function TableViewWidget() {
  const { devicesTable } = useSocketData();

  const devices = devicesTable.length > 0 ? devicesTable : mockDevices;  

  return (
    <WidgetCard title="Devices" dotColor="bg-primary" span={2}>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-muted-foreground uppercase tracking-wide border-b border-border/60">
            <th className="pb-2 font-medium">Device</th>
            <th className="pb-2 font-medium">Type</th>
            <th className="pb-2 font-medium">Status</th>
            <th className="pb-2 font-medium text-right">Value</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.name} className="border-b border-border/40 last:border-0">
              <td className="py-2.5 text-foreground">{device.name}</td>
              <td className="py-2.5 text-muted-foreground">{device.type}</td>
              <td className="py-2.5">
                <span
                  className={`px-2 py-0.5 rounded-md text-xs font-medium ${statusStyles[device.status]}`}
                >
                  {device.status}
                </span>
              </td>
              <td className="py-2.5 text-right text-foreground">{device.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </WidgetCard>
  );
}