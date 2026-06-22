export default function createSVGNode(type, attributes = {}) {
  const svgNS = "http://www.w3.org/2000/svg";

  const svgElement = document.createElementNS(svgNS, type);
  for (const [key, value] of Object.entries(attributes)) {
    svgElement.setAttribute(key, value);
  }
  return svgElement;
}
