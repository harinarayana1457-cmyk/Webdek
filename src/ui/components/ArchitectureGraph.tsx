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
  Box
} from 'lucide-react';
import { ArchitectureGraph as IArchitectureGraph, GraphNode } from '../../engine/types';

interface ArchitectureGraphProps {
  graph: IArchitectureGraph;
  onSelectNode?: (node: GraphNode) => void;
}

export const ArchitectureGraph: React.FC<ArchitectureGraphProps> = ({ graph, onSelectNode }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(graph.nodes[0]?.id || null);

  const selectedNode = graph.nodes.find(n => n.id === selectedNodeId);

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

  const getNodeColorClass = (type: GraphNode['type'], isSelected: boolean) => {
    if (isSelected) {
      return 'border-sky-400 bg-sky-950/40 ring-2 ring-sky-500/50 shadow-lg shadow-sky-500/10';
    }
    switch (type) {
      case 'entry':
      case 'route':
        return 'border-amber-500/40 bg-amber-950/20 hover:border-amber-400';
      case 'ui':
        return 'border-sky-500/40 bg-sky-950/20 hover:border-sky-400';
      case 'service':
        return 'border-emerald-500/40 bg-emerald-950/20 hover:border-emerald-400';
      case 'data':
        return 'border-purple-500/40 bg-purple-950/20 hover:border-purple-400';
      case 'ai':
        return 'border-rose-500/40 bg-rose-950/20 hover:border-rose-400';
      case 'state':
        return 'border-cyan-500/40 bg-cyan-950/20 hover:border-cyan-400';
      default:
        return 'border-slate-700 bg-slate-900/60 hover:border-slate-500';
    }
  };

  // Group nodes by layers
  const layerGroups = graph.nodes.reduce<Record<string, GraphNode[]>>((acc, node) => {
    acc[node.layer] = acc[node.layer] || [];
    acc[node.layer].push(node);
    return acc;
  }, {});

  return (
    <div className="p-4 space-y-4">
      {/* Controls & Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-900/60 p-3 rounded-lg border border-slate-800">
        <div className="flex items-center gap-2 text-slate-300 font-medium">
          <Layers className="w-4 h-4 text-sky-400" />
          <span>Interactive Component & Architecture Flow Map</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Entry / Route</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            <span>UI Component</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span>State Store</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>Service / Action</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span>AI Inference</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
            <span>Persistence DB</span>
          </div>
        </div>
      </div>

      {/* Main Graph Grid / Flow Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Visual Layered Nodes Column */}
        <div className="lg:col-span-8 bg-[#0a0f1d] p-5 rounded-xl border border-slate-800 relative overflow-hidden shadow-inner min-h-[440px]">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />

          <div className="space-y-6 relative z-10">
            {Object.entries(layerGroups).map(([layerName, nodes]) => (
              <div key={layerName} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wider font-mono font-semibold text-slate-400">
                    {layerName} Layer
                  </span>
                  <div className="flex-1 h-[1px] bg-slate-800/80" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {nodes.map((node) => {
                    const isSelected = selectedNodeId === node.id;
                    return (
                      <div
                        key={node.id}
                        onClick={() => {
                          setSelectedNodeId(node.id);
                          if (onSelectNode) onSelectNode(node);
                        }}
                        className={`p-3.5 rounded-lg border transition-all duration-200 cursor-pointer text-left ${getNodeColorClass(
                          node.type,
                          isSelected
                        )}`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            {getNodeIcon(node.type)}
                            <h4 className="text-xs font-semibold text-white tracking-tight">{node.label}</h4>
                          </div>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300">
                            {node.filesCount} {node.filesCount === 1 ? 'file' : 'files'}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-2.5">
                          {node.description}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {node.tech.map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700/50"
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

          {/* Connection Edges Bar */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2">
            <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block">
              Active Module Connections & Data Edges
            </span>
            <div className="flex flex-wrap gap-2">
              {graph.edges.map((edge) => (
                <div
                  key={edge.id}
                  className="flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300"
                >
                  <span className="text-sky-400 font-medium">{edge.from}</span>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <span className="text-emerald-400 font-medium">{edge.to}</span>
                  <span className="text-[10px] text-slate-400 ml-1">({edge.label})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Node Details Side Card */}
        <div className="lg:col-span-4 bg-[#0d1424] p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          {selectedNode ? (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-mono font-semibold text-sky-400">
                    {selectedNode.layer} Layer Inspector
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800">
                    ID: {selectedNode.id}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {getNodeIcon(selectedNode.type)}
                  <h3 className="text-base font-bold text-white tracking-tight">{selectedNode.label}</h3>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-1 font-mono">
                  Functional Role
                </span>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/70 p-2.5 rounded-lg border border-slate-800/80">
                  {selectedNode.description}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-1.5 font-mono">
                  Technology Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-1.5 font-mono">
                  Incoming & Outgoing Edges
                </span>
                <div className="space-y-1.5">
                  {graph.edges
                    .filter((e) => e.from === selectedNode.id || e.to === selectedNode.id)
                    .map((edge) => (
                      <div
                        key={edge.id}
                        className="text-[11px] font-mono p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between text-slate-300"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className={edge.from === selectedNode.id ? 'text-sky-400' : 'text-slate-400'}>
                            {edge.from}
                          </span>
                          <ArrowRight className="w-3 h-3 text-slate-500" />
                          <span className={edge.to === selectedNode.id ? 'text-emerald-400' : 'text-slate-400'}>
                            {edge.to}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500">{edge.label}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <Info className="w-8 h-8 mb-2 text-slate-600" />
              <p className="text-xs">Click any node on the architecture map to inspect its module connections and dependencies.</p>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono flex items-center justify-between">
            <span>ProjectLens AST Engine</span>
            <span>Total Nodes: {graph.nodes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
