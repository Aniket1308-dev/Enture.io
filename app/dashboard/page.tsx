// app/dashboard/page.tsx
import { ConsumptionWidget } from "@/components/ConsumptionWidget";

const mockViews = [
  { id: 1, name: "EMS View", type: "table" },
  { id: 2, name: "Table view", type: "table" },
  { id: 3, name: "Test Table view", type: "table" },
  { id: 4, name: "Kannadhasan Test Widget", type: "grid" },
  { id: 5, name: "Diagram View", type: "diagram" },
  { id: 6, name: "SLD Diagram view", type: "diagram" },
];

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Views</h1>
      <div className="flex gap-2 border-b pb-2 mb-4">
        {mockViews.map((v) => (
          <button key={v.id} className="px-3 py-1.5 text-sm rounded-md hover:bg-muted">
            {v.name}
          </button>
        ))}
      </div>
        <div className="mt-6">
           <ConsumptionWidget />
        </div>      
      {/* selected view content goes here later */}
    </div>
  );
}