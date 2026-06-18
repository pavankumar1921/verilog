import { useEffect, useRef } from "react";

interface Props {
  vcdUrl: string | null;
}

export default function SurferViewer({ vcdUrl }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!vcdUrl || !iframeRef.current) return;

    const iframe = iframeRef.current;
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout>;

    const sendLoadCommand = () => {
      if (attempts >= 10) return;
      attempts++;
      try {
        iframe.contentWindow?.postMessage(
          { command: "LoadUrl", url: vcdUrl },
          "*"
        );
      } catch {
        // iframe not ready, retry
      }
      timer = setTimeout(sendLoadCommand, 1000);
    };

    const onLoad = () => {
      setTimeout(sendLoadCommand, 2000);
    };

    iframe.addEventListener("load", onLoad);

    return () => {
      iframe.removeEventListener("load", onLoad);
      clearTimeout(timer);
    };
  }, [vcdUrl]);

  if (!vcdUrl) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#888" }}>
        No VCD generated yet. Run a simulation first.
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      title="Surfer Waveform Viewer"
      src="/surfer/index.html"
      style={{ width: "100%", height: "80vh", border: "none" }}
    />
  );
}
