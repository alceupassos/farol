
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveContainer } from 'recharts';
import { useEffect, useRef } from 'react';

interface Node {
  id: string;
  label: string;
  category?: string;
  description?: string;
}

interface Edge {
  source: string;
  target: string;
  label?: string;
  type?: 'solid' | 'dashed';
}

interface ConceptualMapProps {
  title: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
}

const ConceptualMap: React.FC<ConceptualMapProps> = ({
  title,
  description,
  nodes,
  edges
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // If this were a real implementation, here we would:
    // 1. Initialize a graph visualization library like D3.js or cytoscape.js
    // 2. Create the nodes and edges based on the provided data
    // 3. Apply styling, interactivity, etc.
    
    // But for our demonstrative purposes, we'll create a simple visualization with HTML/CSS
    
    const container = document.createElement('div');
    container.className = 'flex flex-wrap items-center justify-center relative p-4';
    
    // First we'll create node elements
    const nodeElements: Record<string, HTMLDivElement> = {};
    
    const categories = Array.from(
      new Set(nodes.filter(n => n.category).map(n => n.category))
    );
    
    const categoryColors: Record<string, string> = {
      gene: 'bg-blue-100 border-blue-400 dark:bg-blue-900 dark:border-blue-600',
      disease: 'bg-red-100 border-red-400 dark:bg-red-900 dark:border-red-600',
      symptom: 'bg-yellow-100 border-yellow-400 dark:bg-yellow-900 dark:border-yellow-600',
      protein: 'bg-green-100 border-green-400 dark:bg-green-900 dark:border-green-600',
      pathway: 'bg-purple-100 border-purple-400 dark:bg-purple-900 dark:border-purple-600',
      default: 'bg-gray-100 border-gray-400 dark:bg-gray-800 dark:border-gray-600'
    };
    
    // Create a container for the legend
    const legend = document.createElement('div');
    legend.className = 'flex items-center justify-center gap-4 mb-4 flex-wrap';
    
    categories.forEach(category => {
      if (!category) return;
      const item = document.createElement('div');
      item.className = 'flex items-center gap-2';
      
      const colorBox = document.createElement('div');
      colorBox.className = `w-4 h-4 rounded-sm ${categoryColors[category as string] || categoryColors.default}`;
      
      const label = document.createElement('span');
      label.className = 'text-xs';
      label.textContent = category;
      
      item.appendChild(colorBox);
      item.appendChild(label);
      legend.appendChild(item);
    });
    
    // Create layout grid
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-3 gap-6 mt-6 w-full';
    
    // Create node elements
    nodes.forEach(node => {
      const nodeEl = document.createElement('div');
      const categoryClass = node.category ? 
        categoryColors[node.category] || categoryColors.default :
        categoryColors.default;
      
      nodeEl.className = `node p-4 rounded-lg border-2 ${categoryClass} shadow-sm text-center`;
      nodeEl.id = `node-${node.id}`;
      
      // Add node content
      const titleEl = document.createElement('div');
      titleEl.className = 'font-semibold';
      titleEl.textContent = node.label;
      
      nodeEl.appendChild(titleEl);
      
      if (node.description) {
        const descEl = document.createElement('div');
        descEl.className = 'text-xs mt-1 text-gray-500 dark:text-gray-400';
        descEl.textContent = node.description;
        nodeEl.appendChild(descEl);
      }
      
      nodeElements[node.id] = nodeEl;
      grid.appendChild(nodeEl);
    });
    
    container.appendChild(legend);
    container.appendChild(grid);
    
    // Now for connections, we'll add text indicators because actual lines would require a canvas or SVG
    const connectionsContainer = document.createElement('div');
    connectionsContainer.className = 'mt-6 space-y-2 border-t pt-4';
    
    const connectionsTitle = document.createElement('h4');
    connectionsTitle.className = 'text-sm font-semibold mb-2';
    connectionsTitle.textContent = 'Conexões:';
    connectionsContainer.appendChild(connectionsTitle);
    
    edges.forEach((edge, idx) => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      
      if (sourceNode && targetNode) {
        const connectionEl = document.createElement('div');
        connectionEl.className = 'text-xs flex items-center';
        
        const sourceEl = document.createElement('span');
        sourceEl.className = 'font-medium';
        sourceEl.textContent = sourceNode.label;
        
        const arrowEl = document.createElement('span');
        arrowEl.className = 'mx-2';
        arrowEl.innerHTML = edge.type === 'dashed' ? '- - - >' : '―――>';
        
        const labelEl = document.createElement('span');
        labelEl.className = 'text-gray-500 dark:text-gray-400 mx-1';
        labelEl.textContent = edge.label || '';
        
        const targetEl = document.createElement('span');
        targetEl.className = 'font-medium';
        targetEl.textContent = targetNode.label;
        
        connectionEl.appendChild(sourceEl);
        if (edge.label) {
          connectionEl.appendChild(labelEl);
        }
        connectionEl.appendChild(arrowEl);
        connectionEl.appendChild(targetEl);
        
        connectionsContainer.appendChild(connectionEl);
      }
    });
    
    container.appendChild(connectionsContainer);
    
    // Add disclaimer
    const disclaimer = document.createElement('div');
    disclaimer.className = 'text-xs text-center text-gray-500 dark:text-gray-400 mt-4';
    disclaimer.textContent = '* Esta visualização é simplificada. Um mapa conceitual completo usaria uma biblioteca de grafos interativos.';
    container.appendChild(disclaimer);
    
    // Clear and append to the container
    canvasRef.current.innerHTML = '';
    canvasRef.current.appendChild(container);
    
    return () => {
      if (canvasRef.current) {
        canvasRef.current.innerHTML = '';
      }
    };
  }, [nodes, edges]);

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="h-[500px] overflow-auto">
          <div ref={canvasRef} className="w-full h-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ConceptualMap;
