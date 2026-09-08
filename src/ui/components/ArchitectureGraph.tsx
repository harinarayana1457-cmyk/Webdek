import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  Info,
  Server,
  Layout,
  Database,
  Sparkles,
  Code2,
  Box,
  Zap
} from 'lucide-react';
import { ArchitectureGraph as IArchitectureGraph, GraphNode } from '../../engine/types';

interface ArchitectureGraphProps {
  graph: IArchitectureGraph;
  onSelectNode?: (node: GraphNode) => void;
}

export const ArchitectureGraph: React.FC<ArchitectureGraphProps> = ({ graph, onSelectNode }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(graph.nodes[0]?.id || null);
  const [filterLayer, setFilterLayer] = useState<string>('all');

  const selectedNode = graph.nodes.find((n) => n.id === selectedNodeId);

  const getNodeIcon = (type: GraphNode['type']) => {
    switch (type) {
      case 'entry':
      case 'route':
        return <Layout className="w-4 h-4 text-amber-400" />;
      case 'ui':
        return <Box className="w-4 h-4 text-sky-400" />;
      case 'service':
        return <Server className="w-4 h-4 text-emerald-400" />;
      case 'data':
        return <Database className="w-4 h-4 text-purple-400" />;
      case 'ai':
        return <Sparkles className="w-4 h-4 text-rose-400" />;
      case 'state':
        return <Layers className="w-4 h-4 text-cyan-400" />;
      default:
        return <Code2 className="w-4 h-4 text-slate-400" />;
    }
  };

  const getNodeTheme = (type: GraphNode['type'], isSelected: boolean) => {
    if (isSelected) {
      return {
        card: 'border-sky-400 bg-[#101b33] ring-2 ring-sky-500/40 shadow-xl shadow-sky-500/15',
        badge: 'bg-sky-500/20 text-sky-300 border-sky-500/40'
      };
    }
    switch (type) {
      case 'entry':
      case 'route':
        return {
          card: 'border-amber-500/30 bg-[#181308]/60 hover:border-amber-400/60',
          badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30'
        };
      case 'ui':
        return {
          card: 'border-sky-500/30 bg-[#09152a]/60 hover:border-sky-400/60',
          badge: 'bg-sky-500/15 text-sky-300 border-sky-500/30'
        };
      case 'service':
        return {
          card: 'border-emerald-500/30 bg-[#081813]/60 hover:border-emerald-400/60',
          badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
        };
      case 'data':
        return {
          card: 'border-purple-500/30 bg-[#160c24]/60 hover:border-purple-400/60',
          badge: 'bg-purple-500/15 text-purple-300 border-purple-500/30'
        };
      case 'ai':
        return {
          card: 'border-rose-500/30 bg-[#210915]/60 hover:border-rose-400/60',
          badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30'
        };
      case 'state':
        return {
          card: 'border-cyan-500/30 bg-[#091a24]/60 hover:border-cyan-400/60',
          badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
        };
      default:
        return {
          card: 'border-white/[0.08] bg-[#0d1424]/60 hover:border-white/[0.2]',
          badge: 'bg-slate-800 text-slate-300 border-slate-700'
        };
    }
  };

  // Unique layers
  const allLayers = Array.from(new Set(graph.nodes.map((n) => n.layer)));

  const filteredNodes = filterLayer === 'all'
    ? graph.nodes
    : graph.nodes.filter((n) => n.layer === filterLayer);

  // Group nodes by layers
  const layerGroups = filteredNodes.reduce<Record<string, GraphNode[]>>((acc, node) => {
    acc[node.layer] = acc[node.layer] || [];
    acc[node.layer].push(node);
    return acc;
  }, {});

  return (
    <div className="p-4 lg:p-6 space-y-4 max-w-[1700px] mx-auto">
      {/* Controls & Legend Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#0d1424]/80 p-3.5 rounded-xl border border-white/[0.08] shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center">
            <Layers className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white tracking-tight">Interactive Architecture Map</h3>
            <p className="text-[11px] text-slate-400">Click any module to trace incoming & outgoing data pipelines</p>
          </div>
        </div>

        {/* Layer Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => setFilterLayer('all')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
              filterLayer === 'all'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'bg-white/[0.04] text-slate-400 hover:text-white'
            }`}
          >
            All Layers ({graph.nodes.length})
          </button>
          {allLayers.map((layer) => (
            <button
              key={layer}
              onClick={() => setFilterLayer(layer)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
                filterLayer === layer
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white'
              }`}
            >
              {layer}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Canvas + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Visual Layered Nodes Column */}
        <div className="lg:col-span-8 bg-[#070b16] p-5 rounded-2xl border border-white/[0.08] relative overflow-hidden shadow-inner min-h-[500px] cyber-grid">
          {/* Subtle glow background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-sky-500/5 blur-[120px] pointer-events-none" />

          <div className="space-y-6 relative z-10">
            {Object.entries(layerGroups).map(([layerName, nodes]) => (
              <div key={layerName} className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] uppercase tracking-wider font-mono font-bold text-sky-400/90 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    {layerName} Layer
                  </span>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-white/[0.08] to-transparent" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {nodes.map((node) => {
                    const isSelected = selectedNodeId === node.id;
                    const theme = getNodeTheme(node.type, isSelected);

                    return (
                      <div
                        key={node.id}
                        onClick={() => {
                          setSelectedNodeId(node.id);
                          if (onSelectNode) onSelectNode(node);
                        }}
                        className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer text-left backdrop-blur-sm group ${theme.card}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="p-1 rounded-md bg-white/[0.06]">
                              {getNodeIcon(node.type)}
                            </div>
                            <h4 className="text-xs font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                              {node.label}
                            </h4>
                          </div>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${theme.badge}`}>
                            {node.filesCount} {node.filesCount === 1 ? 'file' : 'files'}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                          {node.description}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {node.tech.map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.05] text-slate-300 border border-white/[0.07]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Connection Cables & Edges Section */}
          <div className="mt-8 pt-4 border-t border-white/[0.08] space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-slate-400 font-bold tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Active Module Connections ({graph.edges.length})
              </span>
              <span className="text-[10px] font-mono text-slate-500">Directed Runtime Calls</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {graph.edges.map((edge) => (
                <div
                  key={edge.id}
                  className="flex items-center gap-2 text-[11px] font-mono px-3 py-1.5 rounded-lg bg-[#0e1628]/90 border border-white/[0.08] text-slate-300 shadow-sm hover:border-sky-500/40 transition-colors"
                >
                  <span className="text-sky-400 font-semibold">{edge.from}</span>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <span className="text-emerald-400 font-semibold">{edge.to}</span>
                  <span className="text-[10px] text-slate-400 ml-1">({edge.label})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Node Details Side Card */}
        <div className="lg:col-span-4 bg-[#0c1222] p-5 rounded-2xl border border-white/[0.08] shadow-lg flex flex-col justify-between">
          {selectedNode ? (
            <div className="space-y-5">
              <div className="border-b border-white/[0.08] pb-3.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase font-mono font-bold text-sky-400 tracking-wider">
                    {selectedNode.layer} Layer
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08]">
                    ID: {selectedNode.id}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20">
                    {getNodeIcon(selectedNode.type)}
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">{selectedNode.label}</h3>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 font-mono">
                  Module Responsibility
                </span>
                <p className="text-xs text-slate-300 leading-relaxed bg-[#070b16] p-3 rounded-xl border border-white/[0.06]">
                  {selectedNode.description}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
                  Technology Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-300 border border-sky-500/20 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
                  Connected Data Edges
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {graph.edges
                    .filter((e) => e.from === selectedNode.id || e.to === selectedNode.id)
                    .map((edge) => (
                      <div
                        key={edge.id}
                        className="text-[11px] font-mono p-2.5 rounded-lg bg-[#070b16] border border-white/[0.06] flex items-center justify-between text-slate-300 hover:border-white/[0.12] transition-colors"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className={edge.from === selectedNode.id ? 'text-sky-400 font-semibold' : 'text-slate-400'}>
                            {edge.from}
                          </span>
                          <ArrowRight className="w-3 h-3 text-slate-500" />
                          <span className={edge.to === selectedNode.id ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
                            {edge.to}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">{edge.label}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 text-slate-500 my-auto">
              <Info className="w-8 h-8 mb-2 text-slate-600" />
              <p className="text-xs">Select any node on the architecture map to inspect its connections.</p>
            </div>
          )}

          <div className="mt-5 pt-3 border-t border-white/[0.08] text-[11px] text-slate-500 font-mono flex items-center justify-between">
            <span>ProjectLens Architecture Engine</span>
            <span>{graph.nodes.length} Nodes • {graph.edges.length} Edges</span>
          </div>
        </div>
      </div>
    </div>
  );
};
