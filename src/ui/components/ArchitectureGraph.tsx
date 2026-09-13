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
import { animate, spring, stagger } from 'animejs';
import { useAnimeScope } from '../hooks/useAnimeScope';
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

  // Anime.js scope for circuit animations
  const { root } = useAnimeScope(() => {
    // 1. Staggered node deployment
    animate('.circuit-node', {
      opacity: [0, 1],
      scale: [0.9, 1],
      translateY: [12, 0],
      duration: 500,
      delay: stagger(35, { from: 'first' }),
      ease: spring({ bounce: 0.35 })
    });

    // 2. Wire edge feeds entrance
    animate('.circuit-edge-badge', {
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 350,
      delay: stagger(20, { start: 150 }),
      ease: 'out(3)'
    });
  }, [graph.nodes.length, filterLayer, zoomLevel]);

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNodeId(node.id);
    if (onSelectNode) onSelectNode(node);

    // Trigger spring shockwave bounce on clicked node
    animate(`#node-${node.id}`, {
      scale: [1, 1.05, 1],
      duration: 350,
      ease: spring({ bounce: 0.45 })
    });
  };

  // Icon mapping
  const getNodeIcon = (type: GraphNode['type']) => {
    switch (type) {
      case 'entry':
      case 'route':
        return <Layout className="w-4 h-4 text-indigo-400" />;
      case 'ui':
        return <Box className="w-4 h-4 text-sky-400" />;
      case 'service':
        return <Server className="w-4 h-4 text-emerald-400" />;
      case 'data':
        return <Database className="w-4 h-4 text-purple-400" />;
      case 'ai':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'state':
        return <Layers className="w-4 h-4 text-teal-400" />;
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
    <div ref={root} className="p-4 lg:p-8 space-y-5 max-w-[1780px] mx-auto">
      {/* Circuit Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#0c1427]/90 p-4 rounded-2xl border border-slate-700/60 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-sm">
            <Layers className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-tight">
                Interactive Architecture Diagram
              </h3>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 font-bold">
                SYSTEM BLUEPRINT
              </span>
              {q && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                  Filter: "{q}"
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400">Click any component to trace its data dependencies and layer connections</p>
          </div>
        </div>

        {/* Viewport Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Layer Filter */}
          <div className="flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setFilterLayer('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterLayer === 'all'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'text-slate-300 hover:text-white'
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
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {layer}
              </button>
            ))}
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-indigo-300 px-1.5 font-bold">
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
        <div className="lg:col-span-8 bg-[#090f1d] rounded-3xl border border-slate-800/80 relative overflow-hidden shadow-2xl min-h-[580px] p-6 lg:p-8 circuit-grid flex flex-col justify-between">
          {/* Subtle Ambient glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

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
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50" />
                      <span className="text-xs uppercase font-mono font-bold tracking-wider text-indigo-300">
                        {layerName} Layer
                      </span>
                    </div>
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-indigo-500/30 via-slate-700/30 to-transparent" />
                    <span className="text-[10px] font-mono text-slate-400 font-medium">
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
                          id={`node-${node.id}`}
                          onClick={() => handleNodeClick(node)}
                          onMouseEnter={() => setHoveredNodeId(node.id)}
                          onMouseLeave={() => setHoveredNodeId(null)}
                          className={`circuit-node relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer select-none bg-[#0e172a]/90 backdrop-blur-md shadow-lg ${
                            isSelected
                              ? '!border-indigo-500 ring-2 ring-indigo-500/30 shadow-indigo-500/20 scale-[1.02] !bg-[#131d38]'
                              : isMatchingSearch && isConnected
                              ? 'border-slate-800 hover:border-slate-600 hover:shadow-xl'
                              : 'border-slate-850 opacity-40 hover:opacity-100'
                          }`}
                        >
                          {/* Connection Ports */}
                          <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 border-2 border-[#090f1d] shadow-sm" />
                          <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-500 border-2 border-[#090f1d] shadow-sm" />

                          {/* Node Header */}
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <div className="flex items-center gap-2.5">
                              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                                {getNodeIcon(node.type)}
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-white tracking-tight">
                                  {node.label}
                                </h4>
                                <span className="text-[10px] font-mono text-slate-400 block font-medium">
                                  ID: {node.id}
                                </span>
                              </div>
                            </div>

                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08] font-medium">
                              {node.filesCount} {node.filesCount === 1 ? 'file' : 'files'}
                            </span>
                          </div>

                          {/* Node Description */}
                          <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed mb-3.5 font-normal">
                            {node.description}
                          </p>

                          {/* Tech Pills */}
                          <div className="flex flex-wrap gap-1.5">
                            {node.tech.map((t, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800 font-medium"
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

          {/* Bottom Component Data Connections */}
          <div className="mt-8 pt-4 border-t border-slate-800/80 relative z-10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                Component Data Connections ({graph.edges.length} Active Links)
              </span>
              <span className="text-[10px] font-mono text-slate-400">Direction: Inbound ➔ Outbound</span>
            </div>

            <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto pr-1">
              {graph.edges.map((edge) => {
                const highlighted = isEdgeHighlighted(edge.from, edge.to);

                return (
                  <div
                    key={edge.id}
                    className={`circuit-edge-badge flex items-center gap-2 text-[11px] font-mono px-3 py-1.5 rounded-xl transition-all duration-200 shadow-sm ${
                      highlighted
                        ? 'bg-indigo-600 text-white border border-indigo-400 font-bold shadow-md shadow-indigo-500/25'
                        : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <span className={highlighted ? 'text-white' : 'font-semibold text-indigo-300'}>
                      {edge.from}
                    </span>
                    <ArrowRight className={`w-3 h-3 ${highlighted ? 'text-white' : 'text-slate-500'}`} />
                    <span className={highlighted ? 'text-white' : 'font-semibold text-slate-200'}>
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
        <div className="lg:col-span-4 bg-[#0c1427]/90 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between shadow-2xl backdrop-blur-md">
          {selectedNode ? (
            <div className="space-y-5">
              {/* Header */}
              <div className="border-b border-slate-800 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-indigo-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-sm" />
                    Layer: {selectedNode.layer}
                  </span>
                  <span className="text-[10px] font-mono text-slate-300 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800">
                    ID: {selectedNode.id}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 shadow-sm">
                    {getNodeIcon(selectedNode.type)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">{selectedNode.label}</h3>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {selectedNode.filesCount} associated components
                    </span>
                  </div>
                </div>
              </div>

              {/* Functional Role */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
                  Component Role & Purpose
                </span>
                <p className="text-xs text-slate-200 leading-relaxed bg-[#090f1d] p-4 rounded-2xl border border-slate-800/80 font-normal">
                  {selectedNode.description}
                </p>
              </div>

              {/* Technology Stack Tags */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
                  Assigned Technologies & Packages
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono font-semibold px-3 py-1 rounded-xl bg-slate-900 text-indigo-300 border border-indigo-500/25 shadow-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Connected Telemetry Feeds */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
                  Connected Layer Links
                </span>
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {graph.edges
                    .filter((e) => e.from === selectedNode.id || e.to === selectedNode.id)
                    .map((edge) => {
                      const isOutbound = edge.from === selectedNode.id;
                      return (
                        <div
                          key={edge.id}
                          className="text-[11px] font-mono p-3 rounded-xl bg-[#090f1d] border border-slate-800/80 flex items-center justify-between text-slate-200"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                                isOutbound ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              {isOutbound ? 'OUT' : 'IN'}
                            </span>
                            <span className={edge.from === selectedNode.id ? 'text-indigo-300 font-bold' : 'text-slate-300'}>
                              {edge.from}
                            </span>
                            <ArrowRight className="w-3 h-3 text-slate-500" />
                            <span className={edge.to === selectedNode.id ? 'text-indigo-300 font-bold' : 'text-slate-300'}>
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
            <div className="flex flex-col items-center justify-center text-center p-8 text-slate-400 my-auto">
              <Info className="w-8 h-8 mb-2 text-indigo-400" />
              <p className="text-xs">Click any component in the diagram to inspect its technical details.</p>
            </div>
          )}

          {/* Card Footer */}
          <div className="mt-6 pt-3.5 border-t border-slate-800 text-[11px] text-slate-400 font-mono flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Architecture Verified
            </span>
            <span>{graph.nodes.length} Components • {graph.edges.length} Links</span>
          </div>
        </div>
      </div>
    </div>
  );
};
