// components/ConsumptionWidget.tsx
export function ConsumptionWidget() {
  return (
    <div className="border rounded-lg p-4 w-full bg-card">
      <div className="flex items-center gap-2 mb-4">
        <span className="h-2 w-2 rounded-full bg-primary" />
        <h3 className="font-semibold">Consumption</h3>
      </div>
      <div className="h-px bg-primary/30 w-8" />
    </div>
  );
}