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
  Zap,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { ArchitectureGraph as IArchitectureGraph, GraphNode } from '../../engine/types';

interface ArchitectureGraphProps {
  graph: IArchitectureGraph;
  onSelectNode?: (node: GraphNode) => void;
}

export const ArchitectureGraph: React.FC<ArchitectureGraphProps> = ({ graph, onSelectNode }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(graph.nodes[0]?.id || null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [filterLayer, setFilterLayer] = useState<string>('all');

  const selectedNode = graph.nodes.find((n) => n.id === selectedNodeId);

  // Icon mapping
  const getNodeIcon = (type: GraphNode['type']) => {
    switch (type) {
      case 'entry':
      case 'route':
        return <Layout className="w-4 h-4 text-amber-400" />;
      case 'ui':
        return <Box className="w-4 h-4 text-cyan-400" />;
      case 'service':
        return <Server className="w-4 h-4 text-emerald-400" />;
      case 'data':
        return <Database className="w-4 h-4 text-purple-400" />;
      case 'ai':
        return <Sparkles className="w-4 h-4 text-rose-400" />;
      case 'state':
        return <Layers className="w-4 h-4 text-indigo-400" />;
      default:
        return <Code2 className="w-4 h-4 text-slate-400" />;
    }
  };

  const allLayers = Array.from(new Set(graph.nodes.map((n) => n.layer)));

  // Layer grouping
  const layerGroups = graph.nodes.reduce<Record<string, GraphNode[]>>((acc, node) => {
    acc[node.layer] = acc[node.layer] || [];
    acc[node.layer].push(node);
    return acc;
  }, {});

  // Identify connected edges to the selected or hovered node
  const activeFocusId = hoveredNodeId || selectedNodeId;
  const isEdgeHighlighted = (from: string, to: string) => {
    if (!activeFocusId) return false;
    return from === activeFocusId || to === activeFocusId;
  };

  return (
    <div className="p-4 lg:p-8 space-y-5 max-w-[1780px] mx-auto">
      {/* Top Controls & Viewport Tools */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#070c1a]/90 p-4 rounded-2xl border border-white/[0.08] shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center shadow-glow-cyan">
            <Layers className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-white tracking-tight">Interactive Architecture Flow Canvas</h3>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
                Live Trace Active
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Select any node to trace caller and callee pipelines with reactive energy flow</p>
          </div>
        </div>

        {/* Viewport Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Layer Filter */}
          <div className="flex items-center gap-1 bg-[#050917] p-1 rounded-xl border border-white/[0.08]">
            <button
              onClick={() => setFilterLayer('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterLayer === 'all'
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Layers
            </button>
            {allLayers.map((layer) => (
              <button
                key={layer}
                onClick={() => setFilterLayer(layer)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterLayer === layer
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {layer}
              </button>
            ))}
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-[#050917] p-1 rounded-xl border border-white/[0.08]">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-slate-300 px-1.5 font-bold">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
              title="Reset Zoom"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Graph Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Node Pipeline Viewport Canvas */}
        <div className="lg:col-span-8 bg-[#040814] rounded-3xl border border-white/[0.1] relative overflow-hidden shadow-2xl min-h-[580px] p-6 lg:p-8 dot-grid flex flex-col justify-between">
          {/* Ambient Lighting */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Scaled Flow Graph Content */}
          <div
            className="space-y-8 relative z-10 transition-transform duration-300 origin-top-left"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {Object.entries(layerGroups).map(([layerName, nodes]) => {
              if (filterLayer !== 'all' && filterLayer !== layerName) return null;

              return (
                <div key={layerName} className="space-y-3">
                  {/* Layer Bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-glow-cyan" />
                      <span className="text-xs uppercase font-mono font-bold tracking-widest text-cyan-300">
                        {layerName} Layer
                      </span>
                    </div>
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-500/20 via-white/[0.08] to-transparent" />
                    <span className="text-[10px] font-mono text-slate-500">
                      {nodes.length} {nodes.length === 1 ? 'module' : 'modules'}
                    </span>
                  </div>

                  {/* Modules in this layer */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {nodes.map((node) => {
                      const isSelected = selectedNodeId === node.id;
                      const isConnected = activeFocusId
                        ? graph.edges.some(
                            (e) =>
                              (e.from === activeFocusId && e.to === node.id) ||
                              (e.to === activeFocusId && e.from === node.id) ||
                              node.id === activeFocusId
                          )
                        : true;

                      return (
                        <div
                          key={node.id}
                          onClick={() => {
                            setSelectedNodeId(node.id);
                            if (onSelectNode) onSelectNode(node);
                          }}
                          onMouseEnter={() => setHoveredNodeId(node.id)}
                          onMouseLeave={() => setHoveredNodeId(null)}
                          className={`relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-xl group select-none ${
                            isSelected
                              ? 'bg-[#0f1b38] border-cyan-400 ring-2 ring-cyan-500/40 shadow-glow-cyan scale-[1.02]'
                              : isConnected
                              ? 'bg-[#080e22]/90 border-white/[0.1] hover:border-cyan-500/40 hover:bg-[#0c1532]'
                              : 'bg-[#060a18]/60 border-white/[0.04] opacity-40 hover:opacity-100'
                          }`}
                        >
                          {/* Connection Ports (Left & Right) */}
                          <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#030712] border-2 border-cyan-400 group-hover:scale-125 transition-transform" />
                          <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#030712] border-2 border-emerald-400 group-hover:scale-125 transition-transform" />

                          {/* Node Header */}
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <div className="flex items-center gap-2.5">
                              <div className="p-2 rounded-xl bg-white/[0.06] border border-white/[0.08] group-hover:border-cyan-500/30 transition-colors">
                                {getNodeIcon(node.type)}
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                                  {node.label}
                                </h4>
                                <span className="text-[10px] font-mono text-slate-500 block">
                                  ID: {node.id}
                                </span>
                              </div>
                            </div>

                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                              {node.filesCount} {node.filesCount === 1 ? 'file' : 'files'}
                            </span>
                          </div>

                          {/* Node Description */}
                          <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed mb-3.5">
                            {node.description}
                          </p>

                          {/* Tech Pills */}
                          <div className="flex flex-wrap gap-1.5">
                            {node.tech.map((t, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#040713] text-slate-300 border border-white/[0.06]"
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
              );
            })}
          </div>

          {/* Bottom Active Cable Connections Matrix */}
          <div className="mt-8 pt-4 border-t border-white/[0.08] relative z-10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Live Architecture Connections ({graph.edges.length} Active Wires)
              </span>
              <span className="text-[10px] font-mono text-slate-500">Flow Direction: Source ➔ Target</span>
            </div>

            <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto pr-1">
              {graph.edges.map((edge) => {
                const highlighted = isEdgeHighlighted(edge.from, edge.to);

                return (
                  <div
                    key={edge.id}
                    className={`flex items-center gap-2 text-[11px] font-mono px-3 py-1.5 rounded-xl transition-all duration-300 ${
                      highlighted
                        ? 'bg-cyan-500/20 text-white border border-cyan-400 shadow-glow-cyan'
                        : 'bg-[#060c1d] text-slate-400 border border-white/[0.08] hover:border-white/[0.2]'
                    }`}
                  >
                    <span className="font-bold text-cyan-300">{edge.from}</span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                    <span className="font-bold text-emerald-300">{edge.to}</span>
                    <span className="text-[10px] text-slate-400 opacity-80">({edge.label})</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Module Detail Inspector Card */}
        <div className="lg:col-span-4 bg-gradient-to-b from-[#091124] to-[#050916] p-6 rounded-3xl border border-white/[0.1] shadow-2xl flex flex-col justify-between">
          {selectedNode ? (
            <div className="space-y-5">
              {/* Header */}
              <div className="border-b border-white/[0.08] pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-cyan-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-glow-cyan" />
                    {selectedNode.layer} Layer Module
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08]">
                    ID: {selectedNode.id}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30">
                    {getNodeIcon(selectedNode.type)}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white tracking-tight">{selectedNode.label}</h3>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {selectedNode.filesCount} associated source files
                    </span>
                  </div>
                </div>
              </div>

              {/* Functional Role */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
                  Module Responsibility & Architectural Scope
                </span>
                <p className="text-xs text-slate-200 leading-relaxed bg-[#040814] p-3.5 rounded-2xl border border-white/[0.06]">
                  {selectedNode.description}
                </p>
              </div>

              {/* Technology Stack Tags */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
                  Assigned Technology Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono font-semibold px-3 py-1 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Inbound & Outbound Data Pipes */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
                  Connected Directed Pipelines
                </span>
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {graph.edges
                    .filter((e) => e.from === selectedNode.id || e.to === selectedNode.id)
                    .map((edge) => {
                      const isOutbound = edge.from === selectedNode.id;
                      return (
                        <div
                          key={edge.id}
                          className="text-[11px] font-mono p-3 rounded-xl bg-[#040814] border border-white/[0.06] flex items-center justify-between text-slate-300"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                isOutbound ? 'bg-cyan-500/20 text-cyan-300' : 'bg-emerald-500/20 text-emerald-300'
                              }`}
                            >
                              {isOutbound ? 'OUT' : 'IN'}
                            </span>
                            <span className={edge.from === selectedNode.id ? 'text-cyan-400 font-bold' : 'text-slate-400'}>
                              {edge.from}
                            </span>
                            <ArrowRight className="w-3 h-3 text-slate-500" />
                            <span className={edge.to === selectedNode.id ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                              {edge.to}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400">{edge.label}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 text-slate-500 my-auto">
              <Info className="w-8 h-8 mb-2 text-slate-600" />
              <p className="text-xs">Click any module on the canvas to inspect its architecture properties.</p>
            </div>
          )}

          {/* Card Footer */}
          <div className="mt-6 pt-3.5 border-t border-white/[0.08] text-[11px] text-slate-500 font-mono flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              AST Graph Validated
            </span>
            <span>{graph.nodes.length} Nodes • {graph.edges.length} Edges</span>
          </div>
        </div>
      </div>
    </div>
  );
};
