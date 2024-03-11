const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const prompts = [
    {
        type: 'input',
        name: 'acronym',
        message: 'Enter up to three characters to include in the logo:',
        validate: input => input.length > 0 && input.length <= 3 ? true : 'Please enter between 1 and 3 characters'
    },

{
    type: 'input',
    name: 'textColor',
    message: 'Enter the color of the text (color name or hexidecimal number):',
},
{
    type: 'list',
    name: 'shape',
    message: 'Choose a shape for the logo:',
    choices: ['circle', 'square', 'triangle']
},
{
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the color of the shape (color name or hexidecimal number):',
},
];

async function generateLogo() {
    try {
        const answers = await inquirer.prompt(prompts);
        const svgContent = generateSvgContent(answers);
        fs.writeFileSync(path.join(__dirname, 'logo.svg'), svgContent, 'utf-8');
        console.log('logo.svg has been created');
    } catch (error) {
        console.error('Error creating logo:', error);
    }
}

function generateSvgContent({ text, textColor, shape, shapeColor }) {
    let shapeSVG = '';
    const centerX = 150, centerY = 100, size = 50;
    switch(shape) {
        case 'circle':
            shapeSVG = `<circle cx="${centerX}" cy="${centerY}" r="${size / 2}" fill="${shapeColor}" />`;
            break;
            case 'square':
                shapeSVG = `<rect x="${centerX - size / 2}" y="${centerY - size / 2}" width="${size}" height="${size}" fill="${shapeColor}" />`;
                break;
                case 'triangle':
                    shapeSVG = `<polygon points="${centerX},${centerY - size / 2} ${centerX - size / 2},${centerY + size / 2} ${centerX + size / 2},${centerY + size / 2}" fill="${shapeColor}" />`;
                    break;
    }
    return `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        ${shapeSVG}
        <text x="${centerX}" y="${centerY + 80}" fill="${textColor}" text-anchor="middle" font-size="20">${text}</text>
    </svg>
  `;
}

generateLogo();