

function circle(centerX, centerY, size, shapeColor) {
    return `<circle cx="${centerX}" cy="${centerY}" r="${size / 2}" fill="${shapeColor}" />`;
  }
  
  function square(centerX, centerY, size, shapeColor) {
    return `<rect x="${centerX - size / 2}" y="${centerY - size / 2}" width="${size}" height="${size}" fill="${shapeColor}" />`;
  }
  
  function triangle(centerX, centerY, size, shapeColor) {
    return `<polygon points="${centerX},${centerY - size / 2} ${centerX - size / 2},${centerY + size / 2} ${centerX + size / 2},${centerY + size / 2}" fill="${shapeColor}" />`;
  }
  
  module.exports = { circle, square, triangle };
  