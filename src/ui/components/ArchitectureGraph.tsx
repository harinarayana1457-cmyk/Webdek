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
  CheckCircle2,
  Flag
} from 'lucide-react';
import { ArchitectureGraph as IArchitectureGraph, GraphNode } from '../../engine/types';

interface ArchitectureGraphProps {
  graph: IArchitectureGraph;
  searchQuery?: string;
  onSelectNode?: (node: GraphNode) => void;
}

export const ArchitectureGraph: React.FC<ArchitectureGraphProps> = ({
  graph,
  searchQuery = '',
  onSelectNode
}) => {
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
        return <Layout className="w-4 h-4 text-[#ffd100]" />;
      case 'ui':
        return <Box className="w-4 h-4 text-[#00a3ff]" />;
      case 'service':
        return <Server className="w-4 h-4 text-[#10b981]" />;
      case 'data':
        return <Database className="w-4 h-4 text-[#a855f7]" />;
      case 'ai':
        return <Sparkles className="w-4 h-4 text-[#e00034]" />;
      case 'state':
        return <Layers className="w-4 h-4 text-[#ffd100]" />;
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

  const q = searchQuery.toLowerCase().trim();

  return (
    <div className="p-4 lg:p-8 space-y-5 max-w-[1780px] mx-auto">
      {/* Circuit Telemetry Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#081b3a] p-4 rounded-2xl border border-white/[0.1] shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#e00034] to-[#ffd100] p-[1.5px] shadow-rb-red">
            <div className="w-full h-full bg-[#051329] rounded-[9px] flex items-center justify-center">
              <Flag className="w-5 h-5 text-[#ffd100]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-white tracking-tight italic">
                RACE CIRCUIT ARCHITECTURE CANVAS
              </h3>
              <span className="rb-racing-badge text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#e00034] text-white font-extrabold shadow-sm">
                <span>SECTOR TELEMETRY</span>
              </span>
              {q && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#ffd100]/20 text-[#ffd100] border border-[#ffd100]/30 font-bold">
                  Track Filter: "{q}"
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400">Select any component module to trace power and data telemetry lines across sectors</p>
          </div>
        </div>

        {/* Viewport Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Layer Filter */}
          <div className="flex items-center gap-1 bg-[#051329] p-1.5 rounded-xl border border-white/[0.08]">
            <button
              onClick={() => setFilterLayer('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterLayer === 'all'
                  ? 'bg-[#e00034] text-white shadow-rb-red'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              All Sectors
            </button>
            {allLayers.map((layer) => (
              <button
                key={layer}
                onClick={() => setFilterLayer(layer)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterLayer === layer
                    ? 'bg-[#e00034] text-white shadow-rb-red'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {layer}
              </button>
            ))}
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-[#051329] p-1.5 rounded-xl border border-white/[0.08]">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-[#ffd100] px-1.5 font-black">
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
        <div className="lg:col-span-8 bg-[#040e1f] rounded-3xl border border-white/[0.1] relative overflow-hidden shadow-2xl min-h-[580px] p-6 lg:p-8 circuit-grid flex flex-col justify-between">
          {/* Subtle Ambient Red Bull glow */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e00034]/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ffd100]/10 rounded-full blur-[140px] pointer-events-none" />

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
                      <span className="w-2.5 h-2.5 rounded-full bg-[#e00034] shadow-rb-red" />
                      <span className="text-xs uppercase font-mono font-black tracking-widest text-[#ffd100]">
                        Sector {layerName}
                      </span>
                    </div>
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-[#e00034]/40 via-white/[0.1] to-transparent" />
                    <span className="text-[10px] font-mono text-slate-400 font-bold">
                      {nodes.length} {nodes.length === 1 ? 'Component' : 'Components'}
                    </span>
                  </div>

                  {/* Modules in this layer */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {nodes.map((node) => {
                      const isSelected = selectedNodeId === node.id;
                      const isMatchingSearch = !q || node.label.toLowerCase().includes(q) || node.description.toLowerCase().includes(q) || node.tech.some(t => t.toLowerCase().includes(q));
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
                          className={`relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer select-none rb-widget ${
                            isSelected
                              ? '!border-[#e00034] ring-2 ring-[#e00034]/50 shadow-rb-red scale-[1.02] !bg-[#0b1d3d]'
                              : isMatchingSearch && isConnected
                              ? 'hover:border-[#ffd100]'
                              : 'opacity-40 hover:opacity-100'
                          }`}
                        >
                          {/* Connection Ports */}
                          <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#ffd100] border-2 border-[#051329] shadow-sm" />
                          <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#e00034] border-2 border-[#051329] shadow-rb-red" />

                          {/* Node Header */}
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <div className="flex items-center gap-2.5">
                              <div className="p-2 rounded-xl bg-black/40 border border-white/[0.08]">
                                {getNodeIcon(node.type)}
                              </div>
                              <div>
                                <h4 className="text-xs font-extrabold text-white tracking-tight">
                                  {node.label}
                                </h4>
                                <span className="text-[10px] font-mono text-[#ffd100] block font-bold">
                                  CHASSIS ID: {node.id}
                                </span>
                              </div>
                            </div>

                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.08] text-slate-300 border border-white/[0.1] font-bold">
                              {node.filesCount} {node.filesCount === 1 ? 'part' : 'parts'}
                            </span>
                          </div>

                          {/* Node Description */}
                          <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed mb-3.5 font-medium">
                            {node.description}
                          </p>

                          {/* Tech Pills */}
                          <div className="flex flex-wrap gap-1.5">
                            {node.tech.map((t, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#030914] text-slate-200 border border-white/[0.08] font-bold"
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

          {/* Bottom Circuit Active Telemetry Wires */}
          <div className="mt-8 pt-4 border-t border-white/[0.08] relative z-10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-extrabold flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#ffd100]" />
                Circuit Telemetry Lines ({graph.edges.length} Power Feeds)
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-bold">Telemetry Path: Inbound ➔ Outbound</span>
            </div>

            <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto pr-1">
              {graph.edges.map((edge) => {
                const highlighted = isEdgeHighlighted(edge.from, edge.to);

                return (
                  <div
                    key={edge.id}
                    className={`flex items-center gap-2 text-[11px] font-mono px-3 py-1.5 rounded-xl transition-all duration-300 shadow-sm ${
                      highlighted
                        ? 'bg-[#e00034] text-white border border-[#ff003c] font-black shadow-rb-red'
                        : 'bg-[#06142a] text-slate-300 border border-white/[0.1] hover:border-[#ffd100]'
                    }`}
                  >
                    <span className={highlighted ? 'text-white' : 'font-extrabold text-[#ffd100]'}>
                      {edge.from}
                    </span>
                    <ArrowRight className={`w-3 h-3 ${highlighted ? 'text-white' : 'text-[#e00034]'}`} />
                    <span className={highlighted ? 'text-white' : 'font-extrabold text-white'}>
                      {edge.to}
                    </span>
                    <span className={`text-[10px] ${highlighted ? 'text-white/80' : 'text-slate-400'}`}>
                      ({edge.label})
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Component Spec Sheet Inspector */}
        <div className="lg:col-span-4 rb-widget p-6 rounded-3xl flex flex-col justify-between shadow-2xl">
          {selectedNode ? (
            <div className="space-y-5">
              {/* Header */}
              <div className="border-b border-white/[0.08] pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-mono font-black tracking-widest text-[#ffd100] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#e00034] shadow-rb-red" />
                    Sector: {selectedNode.layer}
                  </span>
                  <span className="text-[10px] font-mono text-slate-300 px-2.5 py-0.5 rounded-full bg-black/40 border border-white/[0.1]">
                    ID: {selectedNode.id}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#e00034]/20 border border-[#e00034]/40 text-[#ffd100] shadow-rb-red">
                    {getNodeIcon(selectedNode.type)}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white tracking-tight italic">{selectedNode.label}</h3>
                    <span className="text-[11px] text-slate-400 font-mono font-bold">
                      {selectedNode.filesCount} associated components
                    </span>
                  </div>
                </div>
              </div>

              {/* Functional Role */}
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 font-mono">
                  Component Role & Power Output
                </span>
                <p className="text-xs text-slate-200 leading-relaxed bg-[#040e1f] p-4 rounded-2xl border border-white/[0.08] font-medium">
                  {selectedNode.description}
                </p>
              </div>

              {/* Technology Stack Tags */}
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 font-mono">
                  Assigned Power Unit Specs
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono font-extrabold px-3 py-1 rounded-xl bg-[#06142a] text-[#ffd100] border border-[#ffd100]/30 shadow-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Connected Telemetry Feeds */}
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 font-mono">
                  Connected Sector Feeds
                </span>
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {graph.edges
                    .filter((e) => e.from === selectedNode.id || e.to === selectedNode.id)
                    .map((edge) => {
                      const isOutbound = edge.from === selectedNode.id;
                      return (
                        <div
                          key={edge.id}
                          className="text-[11px] font-mono p-3 rounded-xl bg-[#040e1f] border border-white/[0.08] flex items-center justify-between text-slate-200"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                                isOutbound ? 'bg-[#e00034] text-white' : 'bg-[#ffd100] text-black'
                              }`}
                            >
                              {isOutbound ? 'OUT' : 'IN'}
                            </span>
                            <span className={edge.from === selectedNode.id ? 'text-[#ffd100] font-black' : 'text-slate-300'}>
                              {edge.from}
                            </span>
                            <ArrowRight className="w-3 h-3 text-slate-500" />
                            <span className={edge.to === selectedNode.id ? 'text-[#ffd100] font-black' : 'text-slate-300'}>
                              {edge.to}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold">{edge.label}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 text-slate-400 my-auto">
              <Info className="w-8 h-8 mb-2 text-[#ffd100]" />
              <p className="text-xs">Click any component on the circuit to inspect its telemetry specs.</p>
            </div>
          )}

          {/* Card Footer */}
          <div className="mt-6 pt-3.5 border-t border-white/[0.08] text-[11px] text-slate-400 font-mono flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[#ffd100] font-black">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#ffd100]" />
              Telemetry Synchronized
            </span>
            <span>{graph.nodes.length} Nodes • {graph.edges.length} Wires</span>
          </div>
        </div>
      </div>
    </div>
  );
};
