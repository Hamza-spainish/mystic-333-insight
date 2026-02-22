const AdPlaceholder = ({ slot = "sidebar" }: { slot?: string }) => (
  <div className="bg-muted/50 border border-dashed border-border rounded-lg p-4 text-center my-6">
    <p className="text-xs text-muted-foreground">Advertisement</p>
    <div className="h-[250px] flex items-center justify-center">
      <p className="text-xs text-muted-foreground/50">Ad Space — {slot}</p>
    </div>
  </div>
);

export default AdPlaceholder;
