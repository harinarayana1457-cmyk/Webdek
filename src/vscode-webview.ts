/**
 * VS Code & Antigravity Webview Bridge
 * Provides type-safe communication between the embedded UI and the host IDE extension.
 */

declare function acquireVsCodeApi(): {
  postMessage(message: any): void;
  getState(): any;
  setState(state: any): void;
};

let vsCodeApi: any = null;

try {
  if (typeof acquireVsCodeApi === 'function') {
    vsCodeApi = acquireVsCodeApi();
  }
} catch {
  // Running outside VS Code webview (e.g. standalone browser or Antigravity browser panel)
  vsCodeApi = null;
}

export function isVsCodeWebview(): boolean {
  return vsCodeApi !== null;
}

export function postToHost(message: { type: string; payload?: any }) {
  if (vsCodeApi) {
    vsCodeApi.postMessage(message);
  } else if (typeof window !== 'undefined' && window.parent) {
    window.parent.postMessage(message, '*');
  }
}

export function subscribeToHost(handler: (event: MessageEvent) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('message', handler);
  return () => window.removeEventListener('message', handler);
}
