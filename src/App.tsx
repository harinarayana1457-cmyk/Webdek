import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './ui/components/Navbar';
import { OverviewBar } from './ui/components/OverviewBar';
import { ArchitectureGraph } from './ui/components/ArchitectureGraph';
import { WhyThisStackDrawer } from './ui/components/WhyThisStackDrawer';
import { AIContextInspector } from './ui/components/AIContextInspector';
import { DirectoryExplorer } from './ui/components/DirectoryExplorer';
import { ExportModal } from './ui/components/ExportModal';
import { getPresetFileSystem } from './ui/presets/sampleProjects';
import { BrowserDirectoryAdapter, WorkspaceScanner } from './engine/scanner';
import { ArchitectureClassifier } from './engine/architecture';
import { ProjectAnalysisResult, GraphNode } from './engine/types';
import { isVsCodeWebview, subscribeToHost, postToHost } from './vscode-webview';
import { Loader2 } from 'lucide-react';

export function App() {
  const [currentPresetId, setCurrentPresetId] = useState<string>('nextjs-ai-store');
  const [activeTab, setActiveTab] = useState<'graph' | 'stack' | 'ai' | 'files'>('graph');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ProjectAnalysisResult | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [, setSelectedNode] = useState<GraphNode | null>(null);
  const [customAdapter, setCustomAdapter] = useState<BrowserDirectoryAdapter | null>(null);

  // Core analysis runner
  const analyzeWorkspace = useCallback(async (presetId: string, customFs?: BrowserDirectoryAdapter) => {
    setIsScanning(true);
    try {
      const fs = customFs || getPresetFileSystem(presetId);
      const scanner = new WorkspaceScanner(fs);
      const scanData = await scanner.scan();

      const classifier = new ArchitectureClassifier(scanData);
      const result = classifier.classify();

      setAnalysisResult(result);
    } catch (err) {
      console.error('Analysis failed:', err);
    } finally {
      setIsScanning(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    analyzeWorkspace(currentPresetId);

    // Notify host IDE if in webview
    if (isVsCodeWebview()) {
      postToHost({ type: 'READY' });
    }

    // Subscribe to host events
    const unsubscribe = subscribeToHost((event) => {
      const msg = event.data;
      if (msg && msg.type === 'WORKSPACE_FILES') {
        // Handle incoming files from VS Code extension host
        console.log('Received workspace files from host:', msg.payload);
      }
    });

    return () => unsubscribe();
  }, [analyzeWorkspace]);

  const handleSelectPreset = (presetId: string) => {
    setCurrentPresetId(presetId);
    setCustomAdapter(null);
    analyzeWorkspace(presetId);
  };

  const handleOpenLocalFolder = async () => {
    try {
      const adapter = await BrowserDirectoryAdapter.fromPicker();
      setCustomAdapter(adapter);
      setCurrentPresetId('custom');
      analyzeWorkspace('custom', adapter);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        alert(
          'Failed opening folder: ' +
            (err.message || 'Make sure your browser supports the File System Access API.')
        );
      }
    }
  };

  const handleRefresh = () => {
    analyzeWorkspace(currentPresetId, customAdapter || undefined);
  };

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Top Navbar */}
      <Navbar
        currentPresetId={currentPresetId}
        onSelectPreset={handleSelectPreset}
        onOpenLocalFolder={handleOpenLocalFolder}
        onRefresh={handleRefresh}
        onExport={() => setIsExportOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isScanning={isScanning}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 flex flex-col">
        {isScanning && !analysisResult ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-slate-400">
            <Loader2 className="w-8 h-8 text-sky-400 animate-spin mb-3" />
            <p className="text-sm font-mono">Scanning AST manifests & classifying architecture...</p>
          </div>
        ) : analysisResult ? (
          <>
            {/* Top Overview Bar */}
            <OverviewBar data={analysisResult} />

            {/* Tab Panels */}
            <div className="flex-1">
              {activeTab === 'graph' && (
                <ArchitectureGraph
                  graph={analysisResult.graph}
                  onSelectNode={(node) => setSelectedNode(node)}
                />
              )}

              {activeTab === 'stack' && (
                <WhyThisStackDrawer
                  dependencies={analysisResult.dependencies}
                  searchQuery={searchQuery}
                />
              )}

              {activeTab === 'ai' && (
                <AIContextInspector aiConfig={analysisResult.aiConfig} />
              )}

              {activeTab === 'files' && (
                <DirectoryExplorer
                  layers={analysisResult.architecture.layers}
                  allFiles={analysisResult.architecture.layers.flatMap((l) => l.filePaths)}
                />
              )}
            </div>
          </>
        ) : null}
      </main>

      {/* Export Report Modal */}
      {analysisResult && (
        <ExportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          data={analysisResult}
        />
      )}
    </div>
  );
}
export default App;
