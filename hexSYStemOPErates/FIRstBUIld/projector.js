/* hexSYStemOPErates - SVG Projector (Layer 3)
 * Pure projection: field_state → SVG
 * No decisions, no optimization, no state mutation
 */

const svgProjector = {
  
  // Convert axial coordinates to cartesian
  hexToCartesian(q, r, radius) {
    return {
      x: radius * (3/2 * q),
      y: radius * (Math.sqrt(3) * (r + q/2))
    };
  },
  
  // Clear previous projection
  clear(svg) {
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
  },
  
  // Project nodes
  projectNodes(svg, nodes, radius) {
    nodes.forEach(node => {
      const pos = this.hexToCartesian(node.q, node.r, radius);
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", pos.x + 200); // Center offset
      circle.setAttribute("cy", pos.y + 200); // Center offset
      circle.setAttribute("r", 4);
      circle.classList.add("node");
      circle.setAttribute("data-id", node.id);
      svg.appendChild(circle);
    });
  },
  
  // Project relations
  projectRelations(svg, nodes, relations, radius) {
    const nodePositions = {};
    
    // Build position lookup
    nodes.forEach(node => {
      const pos = this.hexToCartesian(node.q, node.r, radius);
      nodePositions[node.id] = {
        x: pos.x + 200,
        y: pos.y + 200
      };
    });
    
    // Project relations structurally
    relations.forEach(rel => {
      const a = nodePositions[rel.a];
      const b = nodePositions[rel.b];
      
      // Existentiële validatie - niet keuze
      if (!a || !b) return;
      this.createRelationLine(svg, a, b, rel.visibility);
    });
  },
  
  // Create relation line (extracted for structural clarity)
  createRelationLine(svg, a, b, visibility) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", a.x);
    line.setAttribute("y1", a.y);
    line.setAttribute("x2", b.x);
    line.setAttribute("y2", b.y);
    line.classList.add("link", visibility);
    svg.appendChild(line);
  },
  
  // Main render function: projection only
  render(svg, projection, radius = 60) {
    const validProjection = projection && projection.nodes;
    
    validProjection && this.clear(svg);
    validProjection && this.projectNodes(svg, projection.nodes, radius);
    validProjection && this.projectRelations(svg, projection.nodes, projection.relations, radius);
  }
  
};

/* ========== NO INTERACTIVITY ========== */
// UI is mirror, not hand
// No click handlers
// No state mutation
// No feedback loops