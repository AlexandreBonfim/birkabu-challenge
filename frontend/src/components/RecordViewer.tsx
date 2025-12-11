type Props = {
  editedRawText: string;
  onRawTextChange: (value: string) => void;
  onStructuredChange: (value: string) => void;
  parsedStructured: Record<string, unknown> | null;
  structuredDraft: string;
};

export function RecordViewer({
  editedRawText,
  onRawTextChange,
  onStructuredChange,
  parsedStructured,
  structuredDraft,
}: Props) {
  return (
    <div className="panel grid">
      <div>
        <h2>2) Extracted text</h2>
        <textarea
          className="text-area"
          placeholder="Extracted raw text will appear here after processing."
          value={editedRawText}
          onChange={(e) => onRawTextChange(e.target.value)}
        />
      </div>
      <div>
        <h2>3) Structured data (editable)</h2>
        <textarea
          className="json-box"
          value={structuredDraft}
          onChange={(e) => onStructuredChange(e.target.value)}
          spellCheck={false}
        />
        {!parsedStructured && (
          <div className="error">
            JSON is invalid — fix formatting to keep editing.
          </div>
        )}
      </div>
    </div>
  );
}
