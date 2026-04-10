const lineNumbers = Array.from({ length: 16 }, (_, index) => index + 1);

export function CodeEditorPreview() {
  return (
    <div className="w-full max-w-3xl overflow-hidden border border-border-primary bg-bg-input">
      <div className="flex h-10 items-center border-b border-border-primary px-4">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#EF4444]" />
          <span className="size-3 rounded-full bg-[#F59E0B]" />
          <span className="size-3 rounded-full bg-[#10B981]" />
        </div>
      </div>

      <div className="flex h-90">
        <div className="flex w-12 flex-col items-end gap-2 border-r border-border-primary bg-bg-surface px-3 py-4">
          {lineNumbers.map((lineNumber) => (
            <span
              className="font-mono text-xs text-text-tertiary"
              key={lineNumber}
            >
              {lineNumber}
            </span>
          ))}
        </div>

        <div className="flex-1 space-y-2 p-4 font-mono text-xs">
          <p>
            <span className="text-syn-keyword">function</span>
            <span className="text-syn-operator"> </span>
            <span className="text-syn-function">calculateTotal</span>
            <span className="text-syn-operator">(</span>
            <span className="text-syn-variable">items</span>
            <span className="text-syn-operator">) {"{"}</span>
          </p>

          <p>
            <span className="text-syn-operator"> </span>
            <span className="text-syn-keyword">var</span>
            <span className="text-syn-operator"> </span>
            <span className="text-syn-variable">total</span>
            <span className="text-syn-operator"> = </span>
            <span className="text-syn-function">0</span>
            <span className="text-syn-operator">;</span>
          </p>

          <p>
            <span className="text-syn-operator">
              {" "}
              for (var i = 0; i &lt; items.length; i++) {"{"}
            </span>
          </p>

          <p>
            <span className="text-syn-operator">
              {" "}
              total = total + items[i].price;
            </span>
          </p>

          <p>
            <span className="text-syn-operator"> {"}"}</span>
          </p>

          <p>
            <span className="text-syn-operator"> </span>
          </p>

          <p>
            <span className="text-syn-operator">
              {" "}
              if (total &gt; 100) {"{"}
            </span>
          </p>

          <p>
            <span className="text-syn-operator"> console.log(</span>
            <span className="text-syn-function">"discount applied"</span>
            <span className="text-syn-operator">);</span>
          </p>

          <p>
            <span className="text-syn-operator"> total = total * 0.9;</span>
          </p>

          <p>
            <span className="text-syn-operator"> {"}"}</span>
          </p>

          <p>
            <span className="text-syn-operator"> </span>
          </p>

          <p>
            <span className="text-text-tertiary">
              {" // TODO: handle tax calculation"}
            </span>
          </p>

          <p>
            <span className="text-text-tertiary">
              {" // TODO: handle currency conversion"}
            </span>
          </p>

          <p>
            <span className="text-syn-operator"> </span>
          </p>

          <p>
            <span className="text-syn-operator"> return total;</span>
          </p>

          <p>
            <span className="text-syn-operator">{"}"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
